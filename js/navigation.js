/* ============================================
   NAVIGATION — Floating Glass Nav System
   ============================================ */

(function() {
    'use strict';

    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('[data-mobile-link]');
    const navLinks = document.querySelectorAll('.nav__link');

    let lastScrollY = 0;
    let ticking = false;
    let isMenuOpen = false;

    /* ---- Scroll-aware nav behavior ---- */
    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (!nav) return;

        /* Add glass background after scrolling */
        if (currentScrollY > 80) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        /* Hide/show on scroll direction (only after 400px) */
        if (currentScrollY > 400) {
            if (currentScrollY > lastScrollY + 5) {
                nav.classList.add('nav--hidden');
            } else if (currentScrollY < lastScrollY - 5) {
                nav.classList.remove('nav--hidden');
            }
        } else {
            nav.classList.remove('nav--hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    /* ---- Mobile Menu Toggle ---- */
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', toggleMenu);
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navToggle.classList.toggle('nav__toggle--active', isMenuOpen);
        mobileMenu.classList.toggle('mobile-menu--open', isMenuOpen);
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';

        /* Animate mobile links with stagger */
        if (isMenuOpen && typeof gsap !== 'undefined') {
            gsap.fromTo(
                '.mobile-menu__link',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power3.out',
                    delay: 0.2
                }
            );
        }
    }

    /* Close menu when clicking a link */
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    /* Close on escape key */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) toggleMenu();
    });

    /* ---- Active section highlighting ---- */
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(setActiveLink);
    }, { passive: true });

    /* ---- Smooth scroll for nav links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                /* Use Lenis if available, fallback to native */
                if (window.lenis) {
                    window.lenis.scrollTo(target, { offset: -60 });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

})();
