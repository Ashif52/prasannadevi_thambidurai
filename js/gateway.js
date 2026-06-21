document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    if (typeof gsap === 'undefined') return;

    const panelLeft = document.getElementById('panel-left');
    const panelRight = document.getElementById('panel-right');
    const btnPortfolio = document.getElementById('btn-enter-portfolio');
    const btnDance = document.getElementById('btn-enter-dance');

    // 1. Entrance Animation
    gsap.fromTo('.gateway__brand', 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo([panelLeft, panelRight],
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out', stagger: 0.2 }
    );

    gsap.fromTo('.gateway__content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.15, delay: 0.5 }
    );

    // 2. Hover Interactions (Desktop Only)
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        // Left Panel Hover
        panelLeft.addEventListener('mouseenter', () => {
            gsap.to(panelLeft, { flex: 1.4, duration: 0.8, ease: 'power3.out' });
            gsap.to(panelRight, { flex: 0.7, duration: 0.8, ease: 'power3.out' });
            
            gsap.to(panelLeft.querySelector('.gateway__content'), { y: -10, duration: 0.5 });
            gsap.to(panelLeft.querySelector('.gateway__desc'), { opacity: 1, duration: 0.5 });
        });

        panelLeft.addEventListener('mouseleave', () => {
            gsap.to([panelLeft, panelRight], { flex: 1, duration: 0.8, ease: 'power3.out' });
            gsap.to(panelLeft.querySelector('.gateway__content'), { y: 0, duration: 0.5 });
        });

        // Right Panel Hover
        panelRight.addEventListener('mouseenter', () => {
            gsap.to(panelRight, { flex: 1.4, duration: 0.8, ease: 'power3.out' });
            gsap.to(panelLeft, { flex: 0.7, duration: 0.8, ease: 'power3.out' });
            
            gsap.to(panelRight.querySelector('.gateway__content'), { y: -10, duration: 0.5 });
            gsap.to(panelRight.querySelector('.gateway__desc'), { opacity: 1, duration: 0.5 });
        });

        panelRight.addEventListener('mouseleave', () => {
            gsap.to([panelLeft, panelRight], { flex: 1, duration: 0.8, ease: 'power3.out' });
            gsap.to(panelRight.querySelector('.gateway__content'), { y: 0, duration: 0.5 });
        });
    }

    // 3. Cinematic Zoom Exit Transitions
    function transitionExit(clickedPanel, otherPanel, targetUrl) {
        // Disable interactions
        panelLeft.style.pointerEvents = 'none';
        panelRight.style.pointerEvents = 'none';

        const tl = gsap.timeline({
            onComplete: () => {
                window.location.href = targetUrl;
            }
        });

        // Fade out header, other panel, and current panel text details
        tl.to('.gateway__header', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, 0);
        tl.to(otherPanel, { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.in' }, 0);
        tl.to(clickedPanel.querySelector('.gateway__content'), { opacity: 0, y: 30, duration: 0.6, ease: 'power3.in' }, 0);

        // Expand clicked panel to fill screen and zoom background image
        tl.to(clickedPanel, { 
            flex: 1,
            width: '100vw',
            duration: 1.2, 
            ease: 'power4.inOut' 
        }, 0.2);

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

        // Optional full curtain screen blackout at the very end
        const blackOut = document.createElement('div');
        blackOut.style.position = 'fixed';
        blackOut.style.inset = '0';
        blackOut.style.backgroundColor = '#000';
        blackOut.style.opacity = '0';
        blackOut.style.zIndex = '99999';
        document.body.appendChild(blackOut);

        tl.to(blackOut, { opacity: 1, duration: 0.5, ease: 'power2.in' }, 1.3);
    }

    // Bind Button Clicks
    if (btnPortfolio) {
        btnPortfolio.addEventListener('click', (e) => {
            e.preventDefault();
            transitionExit(panelLeft, panelRight, 'portfolio.html');
        });
    }

    if (btnDance) {
        btnDance.addEventListener('click', (e) => {
            e.preventDefault();
            transitionExit(panelRight, panelLeft, 'bharatanatyam.html');
        });
    }
});
