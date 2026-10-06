/* ============================================
   SHOOT MODAL — Cinematic Video Lightbox
   Opens premium lightbox with video + info
   ============================================ */

(function () {
    'use strict';

    let modalEl = null;
    let isOpen = false;
    let currentShoot = null;

    /* ============================================
       ENSURE MODAL DOM
       ============================================ */
    function ensureModal() {
        if (modalEl) return modalEl;

        const existing = document.getElementById('shoot-modal');
        if (existing) {
            modalEl = existing;
        } else {
            modalEl = document.createElement('div');
            modalEl.className = 'shoot-modal';
            modalEl.id = 'shoot-modal';
            modalEl.setAttribute('role', 'dialog');
            modalEl.setAttribute('aria-modal', 'true');
            modalEl.setAttribute('aria-label', 'Shoot preview');

            modalEl.innerHTML = `
                <div class="shoot-modal__backdrop" id="shoot-modal-backdrop"></div>
                <div class="shoot-modal__content">
                    <button class="shoot-modal__close" id="shoot-modal-close" aria-label="Close shoot preview">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                    <div class="shoot-modal__video-wrap" id="shoot-modal-video-wrap"></div>
                    <div class="shoot-modal__info" id="shoot-modal-info">
                        <h3 class="shoot-modal__title" id="shoot-modal-title"></h3>
                        <div class="shoot-modal__location" id="shoot-modal-location">
                            <svg class="shoot-modal__location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span id="shoot-modal-location-text"></span>
                        </div>
                        <p class="shoot-modal__description" id="shoot-modal-description"></p>
                        <div class="shoot-modal__date" id="shoot-modal-date-wrap">
                            <svg class="shoot-modal__date-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span id="shoot-modal-date"></span>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modalEl);
        }

        // Bind close handlers
        const closeBtn = modalEl.querySelector('#shoot-modal-close');
        const backdrop = modalEl.querySelector('#shoot-modal-backdrop');

        if (closeBtn) closeBtn.onclick = close;
        if (backdrop) backdrop.onclick = close;

        return modalEl;
    }

    /* ============================================
       FORMAT DATE
       ============================================ */
    function formatDate(dateStr) {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    }

    /* ============================================
       RENDER VIDEO AREA
       ============================================ */
    async function renderVideoArea(videoWrap, shoot) {
        let actualThumb = shoot.thumbnailUrl || '';
        if (actualThumb && window.MediaStorage) {
            actualThumb = await window.MediaStorage.resolveMediaUrl(shoot.thumbnailUrl);
        }

        // If no video URL, show thumbnail photo or stylish placeholder
        if (!shoot.videoUrl || shoot.videoUrl.trim() === '') {
            if (actualThumb) {
                videoWrap.innerHTML = `
                    <div style="position:relative;width:100%;height:100%;">
                        <img src="${actualThumb}" alt="${shoot.title}" style="width:100%;height:100%;object-fit:cover;">
                        <div class="shoot-modal__no-video" style="background:linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);">
                            <span class="shoot-modal__no-video-text">Photo Campaign · Video Coming Soon</span>
                        </div>
                    </div>
                `;
            } else {
                videoWrap.innerHTML = `
                    <div class="shoot-modal__no-video">
                        <svg class="shoot-modal__no-video-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <polygon points="23 7 16 12 23 17 23 7"/>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                        </svg>
                        <span class="shoot-modal__no-video-text">Video coming soon</span>
                    </div>
                `;
            }
            return;
        }

        // Show loading state
        videoWrap.innerHTML = `
            <div class="shoot-modal__video-loading">
                <div class="shoot-map__loading-spinner"></div>
                <span class="shoot-modal__video-loading-text">Loading shoot…</span>
            </div>
        `;

        let actualUrl = shoot.videoUrl;
        if (window.MediaStorage) {
            actualUrl = await window.MediaStorage.resolveMediaUrl(shoot.videoUrl);
        }

        if (!actualUrl) {
            videoWrap.innerHTML = `
                <div class="shoot-modal__video-error">
                    <svg class="shoot-modal__video-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span class="shoot-modal__video-error-text">This shoot video is currently unavailable.</span>
                </div>
            `;
            return;
        }

        // Create video element
        const video = document.createElement('video');
        video.className = 'shoot-modal__video';
        video.controls = true;
        video.preload = 'auto';
        video.playsInline = true;
        if (actualThumb) video.poster = actualThumb;
        video.setAttribute('controlsList', 'nodownload');

        video.addEventListener('loadeddata', () => {
            const loading = videoWrap.querySelector('.shoot-modal__video-loading');
            if (loading) loading.remove();
            video.play().catch(() => {
                video.muted = true;
                video.play().catch(() => {});
            });
        });

        video.addEventListener('error', () => {
            videoWrap.innerHTML = `
                <div class="shoot-modal__video-error">
                    <svg class="shoot-modal__video-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span class="shoot-modal__video-error-text">Unable to play this video.</span>
                </div>
            `;
        });

        video.src = actualUrl;
        videoWrap.appendChild(video);
    }

    /* ============================================
       OPEN MODAL
       ============================================ */
    function open(shoot) {
        console.log('[ShootModal] Opening shoot:', shoot);
        if (!shoot) return;

        currentShoot = shoot;
        const modal = ensureModal();

        // Populate info
        const titleEl = modal.querySelector('#shoot-modal-title');
        const locationTextEl = modal.querySelector('#shoot-modal-location-text');
        const descEl = modal.querySelector('#shoot-modal-description');
        const dateEl = modal.querySelector('#shoot-modal-date');
        const dateWrap = modal.querySelector('#shoot-modal-date-wrap');
        const videoWrap = modal.querySelector('#shoot-modal-video-wrap');

        if (titleEl) titleEl.textContent = shoot.title || 'Untitled Shoot';
        if (locationTextEl) locationTextEl.textContent = `${shoot.city}, ${shoot.state}`;

        if (descEl) {
            if (shoot.description) {
                descEl.textContent = shoot.description;
                descEl.style.display = '';
            } else {
                descEl.style.display = 'none';
            }
        }

        if (dateWrap && dateEl) {
            if (shoot.shootDate) {
                dateEl.textContent = formatDate(shoot.shootDate);
                dateWrap.style.display = '';
            } else {
                dateWrap.style.display = 'none';
            }
        }

        // Render video
        if (videoWrap) {
            renderVideoArea(videoWrap, shoot);
        }

        // Show modal
        modal.classList.add('is-active');
        modal.style.display = 'flex';
        isOpen = true;

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Focus close button
        setTimeout(() => {
            const closeBtn = modal.querySelector('#shoot-modal-close');
            if (closeBtn) closeBtn.focus();
        }, 100);

        // Bind ESC key
        document.removeEventListener('keydown', handleEsc);
        document.addEventListener('keydown', handleEsc);

        // Aria
        modal.setAttribute('aria-hidden', 'false');
    }

    /* ============================================
       CLOSE MODAL
       ============================================ */
    function close() {
        if (!modalEl) return;

        // Stop any playing video
        const video = modalEl.querySelector('.shoot-modal__video');
        if (video) {
            video.pause();
            video.src = '';
        }

        // Hide modal
        modalEl.classList.remove('is-active');
        modalEl.style.display = 'none';
        isOpen = false;
        currentShoot = null;

        // Unlock body scroll
        document.body.style.overflow = '';

        // Unbind ESC key
        document.removeEventListener('keydown', handleEsc);

        // Aria
        modalEl.setAttribute('aria-hidden', 'true');

        // Clean video wrap
        const videoWrap = modalEl.querySelector('#shoot-modal-video-wrap');
        if (videoWrap) videoWrap.innerHTML = '';
    }

    /* ============================================
       ESC KEY HANDLER
       ============================================ */
    function handleEsc(e) {
        if (e.key === 'Escape') {
            close();
        }
    }

    /* ============================================
       PUBLIC API
       ============================================ */
    window.ShootModal = {
        open: open,
        close: close,
        isOpen: function () { return isOpen; }
    };

    // Pre-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureModal);
    } else {
        ensureModal();
    }

})();
