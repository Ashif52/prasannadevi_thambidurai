document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    if (typeof gsap === 'undefined') return;

    const panelLeft = document.getElementById('panel-left');
    const btnPortfolio = document.getElementById('btn-enter-portfolio');

    // 1. Entrance Animation
    gsap.fromTo('.gateway__brand', 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );

    if (panelLeft) {
        gsap.fromTo(panelLeft,
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: 'power2.out' }
        );
    }

    gsap.fromTo('.gateway__content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );

    // 2. Cinematic Zoom Exit Transition
    function transitionExit(clickedPanel, targetUrl) {
        // Disable interactions
        clickedPanel.style.pointerEvents = 'none';

        const tl = gsap.timeline({
            onComplete: () => {
                window.location.href = targetUrl;
            }
        });

        // Fade out header
        tl.to('.gateway__header', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, 0);
        tl.to(clickedPanel.querySelector('.gateway__content'), { opacity: 0, y: 30, duration: 0.6, ease: 'power3.in' }, 0);

        // Zoom background image
        tl.to(clickedPanel.querySelector('.gateway__bg-img'), {
            scale: 1.15,
            filter: 'grayscale(0%) brightness(0.8) contrast(110%)',
            duration: 1.8,
            ease: 'power3.inOut'
        }, 0.2);

        tl.to(clickedPanel.querySelector('.gateway__overlay'), {
            opacity: 0.3,
            duration: 1.2,
            ease: 'power3.inOut'
        }, 0.2);

        // Full curtain screen blackout at the very end
        const blackOut = document.createElement('div');
        blackOut.style.position = 'fixed';
        blackOut.style.inset = '0';
        blackOut.style.backgroundColor = '#000';
        blackOut.style.opacity = '0';
        blackOut.style.zIndex = '99999';
        document.body.appendChild(blackOut);

        tl.to(blackOut, { opacity: 1, duration: 0.5, ease: 'power2.in' }, 1.3);
    }

    // Bind Button Click
    if (btnPortfolio && panelLeft) {
        btnPortfolio.addEventListener('click', (e) => {
            e.preventDefault();
            transitionExit(panelLeft, 'portfolio.html');
        });
    }
});
