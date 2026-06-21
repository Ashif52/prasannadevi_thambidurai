/* ============================================
   GALLERY — Portfolio Filtering & GLightbox
   ============================================ */

(function() {
    'use strict';

    const filters = document.querySelectorAll('.portfolio__filter');
    const items = document.querySelectorAll('.portfolio__item');
    const grid = document.getElementById('portfolio-grid');

    /* ---- Category Filtering ---- */
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.dataset.filter;

            /* Update active state */
            filters.forEach(f => {
                f.classList.remove('portfolio__filter--active');
                f.setAttribute('aria-selected', 'false');
            });
            filter.classList.add('portfolio__filter--active');
            filter.setAttribute('aria-selected', 'true');

            /* Filter items with animation */
            items.forEach(item => {
                const itemCategory = item.dataset.category;
                const shouldShow = category === 'all' || itemCategory === category;

                if (shouldShow) {
                    item.style.display = '';
                    item.removeAttribute('data-animate');
                    /* Animate in with GSAP if available */
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(item,
                            { opacity: 0, y: 30, scale: 0.95 },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.6,
                                ease: 'power3.out',
                                onComplete: () => {
                                    item.style.opacity = '';
                                    item.style.transform = '';
                                }
                            }
                        );
                    } else {
                        item.style.opacity = '1';
                        item.style.transform = 'none';
                    }
                } else {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(item, {
                            opacity: 0,
                            scale: 0.95,
                            duration: 0.3,
                            ease: 'power2.in',
                            onComplete: () => {
                                item.style.display = 'none';
                            }
                        });
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    /* ---- GLightbox Initialization ---- */
    function initLightbox() {
        if (typeof GLightbox === 'undefined') return;

        /* Portfolio lightbox */
        GLightbox({
            selector: '.portfolio__item .glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            openEffect: 'fade',
            closeEffect: 'fade',
            cssEffects: {
                fade: { in: 'fadeIn', out: 'fadeOut' }
            },
            skin: 'clean',
            svg: {
                close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
                next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 18 15 12 9 6"/></svg>',
                prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6"/></svg>'
            }
        });

        /* Instagram lightbox */
        GLightbox({
            selector: '.instagram__item .glightbox',
            touchNavigation: true,
            loop: true,
            openEffect: 'fade',
            closeEffect: 'fade',
            skin: 'clean'
        });
    }

    /* ---- Lazy Image Loading with Shimmer ---- */
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.addEventListener('load', () => {
                            img.style.opacity = '1';
                            img.parentElement.classList.remove('shimmer');
                        });
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px'
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /* Initialize */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initLightbox();
            initLazyLoading();
        });
    } else {
        initLightbox();
        initLazyLoading();
    }

})();
