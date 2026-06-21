/* ============================================
   CURSOR — Custom Luxury Cursor System
   ============================================ */

(function() {
    'use strict';

    /* Skip on touch devices */
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cursor = document.getElementById('cursor');
    const cursorInner = document.getElementById('cursor-inner');
    const cursorOuter = document.getElementById('cursor-outer');
    const cursorLabel = document.getElementById('cursor-label');

    if (!cursor || !cursorInner || !cursorOuter) return;

    let mouseX = 0, mouseY = 0;
    let innerX = 0, innerY = 0;
    let outerX = 0, outerY = 0;
    let isHovering = false;
    let isGallery = false;

    /* Track mouse position */
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /* Smooth interpolation loop */
    function animateCursor() {
        /* Inner dot follows immediately */
        innerX += (mouseX - innerX) * 0.2;
        innerY += (mouseY - innerY) * 0.2;

        /* Outer ring follows with delay */
        outerX += (mouseX - outerX) * 0.12;
        outerY += (mouseY - outerY) * 0.12;

        cursorInner.style.transform = `translate(${innerX - 4}px, ${innerY - 4}px)`;
        cursorOuter.style.transform = `translate(${outerX - 20}px, ${outerY - 20}px)`;

        if (isHovering) {
            cursorOuter.style.transform = `translate(${outerX - 40}px, ${outerY - 40}px)`;
        }

        if (isGallery) {
            cursorOuter.style.transform = `translate(${outerX - 60}px, ${outerY - 60}px)`;
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    /* Interactive elements */
    function addHoverListeners() {
        /* Standard hover elements */
        const hoverElements = document.querySelectorAll(
            'a, button, .magnetic-wrap, .nav__link, .nav__brand, .portfolio__filter, .footer__social'
        );

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                isHovering = true;
                cursor.classList.add('cursor--hover');
            });

            el.addEventListener('mouseleave', () => {
                isHovering = false;
                cursor.classList.remove('cursor--hover');
            });
        });

        /* Gallery items — show "View" label */
        const galleryItems = document.querySelectorAll('.portfolio__item, .instagram__item');

        galleryItems.forEach(el => {
            el.addEventListener('mouseenter', () => {
                isGallery = true;
                cursor.classList.add('cursor--gallery');
                if (cursorLabel) cursorLabel.textContent = 'View';
            });

            el.addEventListener('mouseleave', () => {
                isGallery = false;
                cursor.classList.remove('cursor--gallery');
            });
        });

        /* Magnetic effect for buttons */
        const magneticElements = document.querySelectorAll('.magnetic-wrap');

        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    /* Initialize after DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addHoverListeners);
    } else {
        addHoverListeners();
    }

    /* Hide cursor when it leaves the window */
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

})();
