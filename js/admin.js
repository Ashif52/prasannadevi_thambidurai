/* ============================================
   ADMIN — Shoot Manager Logic
   Pure Direct Access (No Auth Gate)
   Supports Video & Image File Uploads + IndexedDB & Server Storage
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       CONFIG
       ============================================ */
    const STORAGE_KEY = 'prasannadevi_shoots';

    const SOUTH_INDIA_STATES = [
        'Tamil Nadu', 'Kerala', 'Karnataka',
        'Andhra Pradesh', 'Telangana', 'Puducherry'
    ];

    // In-memory files pending upload during form edit
    let pendingVideoFile = null;
    let pendingThumbFile = null;
    let editingId = null;

    /* ============================================
       DATA ACCESS
       ============================================ */
    function getShoots() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to read shoots:', e);
            return [];
        }
    }

    function saveShoots(shoots) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(shoots));
        } catch (e) {
            console.error('Failed to save shoots to localStorage:', e);
            showToast('Local storage is full, but items may still be saved on server.');
        }
    }

    function generateId() {
        return 'shoot-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
    }

    /* ============================================
       INIT DATA
       Loads from server API or shoots.json if localStorage is empty
       ============================================ */
    async function initializeData() {
        const existing = getShoots();

        // First try to fetch from server API
        try {
            const res = await fetch('/api/shoots');
            if (res.ok) {
                const serverShoots = await res.json();
                if (Array.isArray(serverShoots) && serverShoots.length > 0) {
                    if (existing.length === 0) {
                        saveShoots(serverShoots);
                        return;
                    }
                }
            }
        } catch (e) {
            // Server not running, fallback to shoots.json
        }

        if (existing.length > 0) return;

        try {
            const response = await fetch('data/shoots.json');
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    saveShoots(data);
                }
            }
        } catch (e) {
            // No seed data
        }
    }

    /* ============================================
       FORMAT FILE SIZE
       ============================================ */
    function formatBytes(bytes) {
        if (!bytes || bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    /* ============================================
       RENDER SHOOTS LIST
       ============================================ */
    function renderShootsList() {
        const listEl = document.getElementById('shoots-list');
        if (!listEl) return;

        const shoots = getShoots();

        if (shoots.length === 0) {
            listEl.innerHTML = '<div class="admin__list-empty">No shoots yet. Click "Add New Shoot" to upload photos and videos.</div>';
            updateStats();
            return;
        }

        // Sort newest first
        const sorted = [...shoots].sort((a, b) => {
            return (b.createdAt || '').localeCompare(a.createdAt || '');
        });

        listEl.innerHTML = sorted.map(shoot => `
            <div class="shoot-card" data-id="${shoot.id}">
                <div class="shoot-card__status ${shoot.active ? 'shoot-card__status--active' : 'shoot-card__status--inactive'}" title="${shoot.active ? 'Active' : 'Inactive'}"></div>
                <div class="shoot-card__info">
                    <div class="shoot-card__title">${escapeHtml(shoot.title)}</div>
                    <div class="shoot-card__meta">
                        <span>📍 ${escapeHtml(shoot.city)}, ${escapeHtml(shoot.state)}</span>
                        <span>📐 ${Number(shoot.latitude).toFixed(4)}, ${Number(shoot.longitude).toFixed(4)}</span>
                        ${shoot.shootDate ? `<span>📅 ${shoot.shootDate}</span>` : ''}
                        ${shoot.videoUrl ? '<span>🎬 Video Ready</span>' : '<span style="opacity:0.4;">🎬 No Video</span>'}
                        ${shoot.thumbnailUrl ? '<span>🖼️ Photo Ready</span>' : ''}
                    </div>
                </div>
                <div class="shoot-card__actions">
                    <button class="admin__btn admin__btn--ghost admin__btn--sm" onclick="AdminApp.toggleActive('${shoot.id}')" title="${shoot.active ? 'Deactivate' : 'Activate'}">
                        ${shoot.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button class="admin__btn admin__btn--ghost admin__btn--sm" onclick="AdminApp.editShoot('${shoot.id}')" title="Edit">
                        Edit
                    </button>
                    <button class="admin__btn admin__btn--ghost admin__btn--sm" onclick="AdminApp.confirmDelete('${shoot.id}')" title="Delete" style="color: var(--admin-danger-hover);">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');

        updateStats();
    }

    /* ============================================
       UPDATE STATS
       ============================================ */
    function updateStats() {
        const shoots = getShoots();
        const active = shoots.filter(s => s.active);
        const states = new Set(active.map(s => s.state));

        const statTotal = document.getElementById('stat-total');
        const statActive = document.getElementById('stat-active');
        const statStates = document.getElementById('stat-states');

        if (statTotal) statTotal.textContent = shoots.length;
        if (statActive) statActive.textContent = active.length;
        if (statStates) statStates.textContent = states.size;
    }

    /* ============================================
       FORM MODAL
       ============================================ */
    async function openForm(shoot) {
        const modal = document.getElementById('shoot-form-modal');
        const titleEl = document.getElementById('form-modal-title');
        pendingVideoFile = null;
        pendingThumbFile = null;

        const videoFileNameEl = document.getElementById('form-videofile-name');
        const thumbFileNameEl = document.getElementById('form-thumbfile-name');
        const thumbPreviewWrap = document.getElementById('form-thumb-preview');
        const thumbPreviewImg = document.getElementById('form-thumb-preview-img');

        // Reset file inputs
        document.getElementById('form-videofile').value = '';
        document.getElementById('form-thumbfile').value = '';

        if (shoot) {
            editingId = shoot.id;
            titleEl.textContent = 'Edit Shoot';
            document.getElementById('form-id').value = shoot.id;
            document.getElementById('form-title').value = shoot.title || '';
            document.getElementById('form-state').value = shoot.state || '';
            document.getElementById('form-city').value = shoot.city || '';
            document.getElementById('form-latitude').value = shoot.latitude || '';
            document.getElementById('form-longitude').value = shoot.longitude || '';
            document.getElementById('form-description').value = shoot.description || '';
            document.getElementById('form-shootdate').value = shoot.shootDate || '';
            document.getElementById('form-videourl').value = shoot.videoUrl || '';
            document.getElementById('form-thumbnailurl').value = shoot.thumbnailUrl || '';
            document.getElementById('form-active').checked = shoot.active !== false;

            // Video status label
            if (shoot.videoUrl) {
                videoFileNameEl.textContent = shoot.videoUrl.startsWith('idb:') ? 'Existing local video attached' : shoot.videoUrl;
                videoFileNameEl.classList.add('has-file');
            } else {
                videoFileNameEl.textContent = 'No file chosen';
                videoFileNameEl.classList.remove('has-file');
            }

            // Thumbnail status label & preview
            if (shoot.thumbnailUrl) {
                thumbFileNameEl.textContent = shoot.thumbnailUrl.startsWith('idb:') ? 'Existing local image attached' : shoot.thumbnailUrl;
                thumbFileNameEl.classList.add('has-file');

                if (window.MediaStorage) {
                    const resolvedThumb = await window.MediaStorage.resolveMediaUrl(shoot.thumbnailUrl);
                    if (resolvedThumb) {
                        thumbPreviewImg.src = resolvedThumb;
                        thumbPreviewWrap.style.display = 'block';
                    } else {
                        thumbPreviewWrap.style.display = 'none';
                    }
                }
            } else {
                thumbFileNameEl.textContent = 'No file chosen';
                thumbFileNameEl.classList.remove('has-file');
                thumbPreviewWrap.style.display = 'none';
            }

        } else {
            editingId = null;
            titleEl.textContent = 'Add New Shoot';
            document.getElementById('shoot-form').reset();
            document.getElementById('form-active').checked = true;

            videoFileNameEl.textContent = 'No file chosen';
            videoFileNameEl.classList.remove('has-file');
            thumbFileNameEl.textContent = 'No file chosen';
            thumbFileNameEl.classList.remove('has-file');
            thumbPreviewWrap.style.display = 'none';
        }

        updateActiveLabel();
        modal.classList.add('is-active');
        document.getElementById('form-title').focus();
    }

    function closeForm() {
        const modal = document.getElementById('shoot-form-modal');
        modal.classList.remove('is-active');
        editingId = null;
        pendingVideoFile = null;
        pendingThumbFile = null;
    }

    function updateActiveLabel() {
        const checkbox = document.getElementById('form-active');
        const label = document.getElementById('form-active-label');
        if (checkbox && label) {
            label.textContent = checkbox.checked ? 'Active' : 'Inactive';
        }
    }

    /* ============================================
       FORM SUBMISSION
       ============================================ */
    async function handleFormSubmit(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('form-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving & Uploading…';

        try {
            const title = document.getElementById('form-title').value.trim();
            const state = document.getElementById('form-state').value;
            const city = document.getElementById('form-city').value.trim();
            const latitude = parseFloat(document.getElementById('form-latitude').value);
            const longitude = parseFloat(document.getElementById('form-longitude').value);
            const description = document.getElementById('form-description').value.trim();
            const shootDate = document.getElementById('form-shootdate').value;
            let videoUrl = document.getElementById('form-videourl').value.trim();
            let thumbnailUrl = document.getElementById('form-thumbnailurl').value.trim();
            const active = document.getElementById('form-active').checked;

            // Validate
            if (!title) { showToast('Shoot title is required.'); return; }
            if (!state) { showToast('State is required.'); return; }
            if (!city) { showToast('City is required.'); return; }
            if (isNaN(latitude) || latitude < 7 || latitude > 20) {
                showToast('Latitude must be between 7 and 20 for South India.');
                return;
            }
            if (isNaN(longitude) || longitude < 73 || longitude > 86) {
                showToast('Longitude must be between 73 and 86 for South India.');
                return;
            }

            const shootId = editingId || generateId();

            // 1. Process Video File Upload
            if (pendingVideoFile) {
                // Try uploading to backend server
                let serverVideoUrl = null;
                if (window.MediaStorage) {
                    serverVideoUrl = await window.MediaStorage.uploadToServer(pendingVideoFile, 'videos');
                    // Also store in IndexedDB as guarantee
                    await window.MediaStorage.saveMedia('video_' + shootId, pendingVideoFile);
                }

                if (serverVideoUrl) {
                    videoUrl = serverVideoUrl;
                } else {
                    videoUrl = 'idb:video_' + shootId;
                }
            }

            // 2. Process Thumbnail File Upload
            if (pendingThumbFile) {
                let serverThumbUrl = null;
                if (window.MediaStorage) {
                    serverThumbUrl = await window.MediaStorage.uploadToServer(pendingThumbFile, 'images');
                    await window.MediaStorage.saveMedia('thumb_' + shootId, pendingThumbFile);
                }

                if (serverThumbUrl) {
                    thumbnailUrl = serverThumbUrl;
                } else {
                    thumbnailUrl = 'idb:thumb_' + shootId;
                }
            }

            const shoots = getShoots();
            const shootObject = {
                id: shootId,
                title, state, city, latitude, longitude,
                description, thumbnailUrl, videoUrl,
                shootDate, active,
                updatedAt: new Date().toISOString()
            };

            if (editingId) {
                const idx = shoots.findIndex(s => s.id === editingId);
                if (idx !== -1) {
                    shootObject.createdAt = shoots[idx].createdAt || new Date().toISOString();
                    shoots[idx] = shootObject;
                }
                showToast('Shoot updated successfully!');
            } else {
                shootObject.createdAt = new Date().toISOString();
                shoots.push(shootObject);
                showToast('Shoot added! A blinking dot is now on the map.');
            }

            // Save to localStorage
            saveShoots(shoots);

            // Also try saving to server API
            try {
                await fetch('/api/shoots', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(shootObject)
                });
            } catch (err) {
                // local save already succeeded
            }

            closeForm();
            renderShootsList();

        } catch (err) {
            console.error('Error saving shoot:', err);
            showToast('Error saving shoot. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Save Shoot';
        }
    }

    /* ============================================
       TOGGLE ACTIVE
       ============================================ */
    async function toggleActive(id) {
        const shoots = getShoots();
        const shoot = shoots.find(s => s.id === id);
        if (shoot) {
            shoot.active = !shoot.active;
            shoot.updatedAt = new Date().toISOString();
            saveShoots(shoots);
            renderShootsList();

            // Sync with server if online
            try {
                await fetch('/api/shoots', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(shoot)
                });
            } catch (e) {}

            showToast(shoot.active ? 'Shoot activated — blinking dot is visible on map.' : 'Shoot deactivated — dot removed from map.');
        }
    }

    /* ============================================
       DELETE
       ============================================ */
    let deleteTargetId = null;

    function confirmDelete(id) {
        const shoots = getShoots();
        const shoot = shoots.find(s => s.id === id);
        if (!shoot) return;

        deleteTargetId = id;
        document.getElementById('delete-confirm-text').textContent =
            `Are you sure you want to delete "${shoot.title}"? This cannot be undone.`;
        document.getElementById('delete-confirm-modal').classList.add('is-active');
    }

    async function executeDelete() {
        if (!deleteTargetId) return;

        let shoots = getShoots();
        shoots = shoots.filter(s => s.id !== deleteTargetId);
        saveShoots(shoots);

        // Delete from IndexedDB if stored
        if (window.MediaStorage) {
            window.MediaStorage.deleteMedia('video_' + deleteTargetId);
            window.MediaStorage.deleteMedia('thumb_' + deleteTargetId);
        }

        // Delete from server API
        try {
            await fetch('/api/shoots/' + deleteTargetId, { method: 'DELETE' });
        } catch (e) {}

        deleteTargetId = null;
        document.getElementById('delete-confirm-modal').classList.remove('is-active');
        renderShootsList();
        showToast('Shoot deleted.');
    }

    function cancelDelete() {
        deleteTargetId = null;
        document.getElementById('delete-confirm-modal').classList.remove('is-active');
    }

    /* ============================================
       EXPORT / IMPORT
       ============================================ */
    function exportData() {
        const shoots = getShoots();
        const json = JSON.stringify(shoots, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prasannadevi-shoots-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Shoot locations exported.');
    }

    function importData(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (!Array.isArray(data)) {
                    showToast('Invalid format. Expected a JSON array.');
                    return;
                }
                saveShoots(data);
                renderShootsList();
                showToast(`Imported ${data.length} shoot(s).`);
            } catch (err) {
                showToast('Failed to parse JSON file.');
            }
        };
        reader.readAsText(file);
    }

    /* ============================================
       TOAST NOTIFICATION
       ============================================ */
    let toastTimeout = null;

    function showToast(message) {
        const toast = document.getElementById('admin-toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('is-visible');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('is-visible');
        }, 3500);
    }

    /* ============================================
       UTILS
       ============================================ */
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /* ============================================
       BIND EVENTS
       ============================================ */
    function bindEvents() {
        // Add shoot button
        const btnAdd = document.getElementById('btn-add-shoot');
        if (btnAdd) btnAdd.addEventListener('click', () => openForm(null));

        // Form
        const form = document.getElementById('shoot-form');
        if (form) form.addEventListener('submit', handleFormSubmit);

        const formCancel = document.getElementById('form-cancel');
        if (formCancel) formCancel.addEventListener('click', closeForm);

        const formModalClose = document.getElementById('form-modal-close');
        if (formModalClose) formModalClose.addEventListener('click', closeForm);

        const formBackdrop = document.getElementById('shoot-form-backdrop');
        if (formBackdrop) formBackdrop.addEventListener('click', closeForm);

        // File change: Video
        const videoInput = document.getElementById('form-videofile');
        const videoNameEl = document.getElementById('form-videofile-name');
        if (videoInput) {
            videoInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    pendingVideoFile = file;
                    videoNameEl.textContent = `${file.name} (${formatBytes(file.size)})`;
                    videoNameEl.classList.add('has-file');
                } else {
                    pendingVideoFile = null;
                    videoNameEl.textContent = 'No file chosen';
                    videoNameEl.classList.remove('has-file');
                }
            });
        }

        // File change: Thumbnail Photo
        const thumbInput = document.getElementById('form-thumbfile');
        const thumbNameEl = document.getElementById('form-thumbfile-name');
        const thumbPreviewWrap = document.getElementById('form-thumb-preview');
        const thumbPreviewImg = document.getElementById('form-thumb-preview-img');
        if (thumbInput) {
            thumbInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    pendingThumbFile = file;
                    thumbNameEl.textContent = `${file.name} (${formatBytes(file.size)})`;
                    thumbNameEl.classList.add('has-file');

                    // Show preview
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        thumbPreviewImg.src = ev.target.result;
                        thumbPreviewWrap.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                } else {
                    pendingThumbFile = null;
                    thumbNameEl.textContent = 'No file chosen';
                    thumbNameEl.classList.remove('has-file');
                    thumbPreviewWrap.style.display = 'none';
                }
            });
        }

        // Active toggle label
        const formActive = document.getElementById('form-active');
        if (formActive) formActive.addEventListener('change', updateActiveLabel);

        // Delete confirm
        const deleteConfirm = document.getElementById('delete-confirm');
        if (deleteConfirm) deleteConfirm.addEventListener('click', executeDelete);

        const deleteCancel = document.getElementById('delete-cancel');
        if (deleteCancel) deleteCancel.addEventListener('click', cancelDelete);

        const deleteBackdrop = document.getElementById('delete-confirm-backdrop');
        if (deleteBackdrop) deleteBackdrop.addEventListener('click', cancelDelete);

        // Export / Import
        const btnExport = document.getElementById('btn-export');
        if (btnExport) btnExport.addEventListener('click', exportData);

        const btnImport = document.getElementById('btn-import');
        if (btnImport) {
            btnImport.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    importData(e.target.files[0]);
                    e.target.value = '';
                }
            });
        }

        // ESC to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeForm();
                cancelDelete();
            }
        });
    }

    /* ============================================
       INITIALIZE
       ============================================ */
    async function init() {
        await initializeData();
        renderShootsList();
        bindEvents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ============================================
       PUBLIC API (for inline onclick handlers)
       ============================================ */
    window.AdminApp = {
        toggleActive: toggleActive,
        editShoot: function (id) {
            const shoots = getShoots();
            const shoot = shoots.find(s => s.id === id);
            if (shoot) openForm(shoot);
        },
        confirmDelete: confirmDelete
    };

})();
