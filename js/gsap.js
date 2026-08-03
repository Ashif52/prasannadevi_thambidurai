/* ============================================
   GSAP — All ScrollTrigger Animations
   ============================================ */

(function() {
    'use strict';

    /* Wait for GSAP to be available */
    function initGSAP() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            setTimeout(initGSAP, 100);
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        /* Set initial hidden states via JS (moved from CSS for reliability).
           If GSAP doesn't load, elements stay visible by default. */
        gsap.set('[data-animate="fade-up"]', { opacity: 0, y: 60 });
        gsap.set('[data-animate="fade-in"]', { opacity: 0 });
        gsap.set('[data-animate="fade-scale"]', { opacity: 0, scale: 0.95 });
        gsap.set('[data-animate="reveal-left"]', { clipPath: 'inset(0 100% 0 0)' });
        gsap.set('[data-animate="reveal-right"]', { clipPath: 'inset(0 0 0 100%)' });
        gsap.set('[data-animate="reveal-up"]', { clipPath: 'inset(100% 0 0 0)' });
        gsap.set('[data-animate="reveal-down"]', { clipPath: 'inset(0 0 100% 0)' });

        /* ---- Hero Film Opening Sequence ---- */
        function heroAnimation() {
            const tl = gsap.timeline({ delay: 0.2 });

            /* Background image scale & zoom */
            tl.to('#hero-image', {
                scale: 1,
                duration: 2.5,
                ease: 'power2.out'
            }, 0);

            /* Subtitle fade up */
            tl.fromTo('.hero__subtitle',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                0.8
            );

            /* Title character reveal */
            const heroChars = document.querySelectorAll('#hero-title .char');
            if (heroChars.length > 0) {
                tl.to(heroChars, {
                    y: 0,
                    duration: 1.2,
                    stagger: 0.03,
                    ease: 'power3.out'
                }, 1);
            } else {
                /* Fallback if Splitting hasn't run */
                tl.fromTo('#hero-title',
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
                    1
                );
            }

            /* Tagline */
            tl.fromTo('.hero__tagline',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                1.6
            );

            /* CTA buttons */
            tl.fromTo('.hero__cta-group',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                1.9
            );

            /* Scroll indicator */
            tl.fromTo('#hero-scroll',
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: 'power2.out' },
                2.5
            );

            return tl;
        }

        /* Store hero timeline for preloader to trigger */
        window._heroAnimation = heroAnimation;

        /* ---- Hero Parallax on Scroll ---- */
        gsap.to('#hero-image', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        /* Hero content fade on scroll */
        gsap.to('#hero-content', {
            y: -100,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: '30% top',
                end: 'bottom top',
                scrub: 1
            }
        });

        /* ---- Generic Scroll Animations ---- */
        /* Fade up elements — exclude items with their own specific handlers */
        const excludeSelectors = '.portfolio__item, .campaign-card, .measurement-card, .measurement-card--ring, .measurement-card--pill, .testimonial-card, .instagram__item, .section-label, .booking__card';
        gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
            if (el.matches(excludeSelectors) || el.closest(excludeSelectors)) return;
            gsap.fromTo(el,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'top 60%',
                        toggleActions: 'play none none none'
                    },
                    onComplete: () => el.removeAttribute('data-animate')
                }
            );
        });

        /* Fade in elements */
        gsap.utils.toArray('[data-animate="fade-in"]').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        /* Fade scale elements */
        gsap.utils.toArray('[data-animate="fade-scale"]').forEach(el => {
            gsap.fromTo(el,
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        /* Image reveal animations */
        gsap.utils.toArray('.image-reveal').forEach(el => {
            gsap.fromTo(el,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.5,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 75%',
                        toggleActions: 'play none none none'
                    },
                    onComplete: () => {
                        el.classList.add('image-reveal--revealed');
                        el.removeAttribute('data-animate');
                        el.style.clipPath = 'none';
                    }
                }
            );
        });

        /* ---- About Section ---- */
        /* Parallax image */
        gsap.utils.toArray('.parallax-img').forEach(img => {
            gsap.to(img, {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: img.closest('.parallax-wrap'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });

        /* Counter animation */
        gsap.utils.toArray('.counter').forEach(counter => {
            const target = parseInt(counter.dataset.target);
            if (isNaN(target)) return;
            const suffix = counter.dataset.suffix || '';
            const isAboutStat = counter.classList.contains('about__stat-number');
            const obj = { val: 0 };

            gsap.to(obj, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                onUpdate: () => {
                    const rounded = Math.round(obj.val);
                    if (isAboutStat) {
                        counter.innerHTML = rounded + '<span style="font-size:0.8em; opacity:0.8; margin-left: 2px;">+</span>';
                    } else if (suffix.includes('kg')) {
                        counter.innerHTML = rounded + '<span style="font-size:0.5em; opacity:0.6; margin-left: 2px;"> kg</span>';
                    } else {
                        counter.textContent = rounded + suffix;
                    }
                }
            });
        });

        /* ---- Portfolio Stagger ---- */
        ScrollTrigger.batch('.portfolio__item', {
            start: 'top 85%',
            onEnter: (batch) => {
                gsap.fromTo(batch,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        onComplete: function() {
                            batch.forEach(el => {
                                el.removeAttribute('data-animate');
                                el.style.opacity = '';
                                el.style.transform = '';
                            });
                        }
                    }
                );
            },
            once: true
        });

        /* ---- Campaign Cards ---- */
        gsap.utils.toArray('.campaign-card').forEach((card, i) => {
            gsap.fromTo(card,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    delay: i * 0.15,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    onComplete: () => card.removeAttribute('data-animate')
                }
            );
        });

        /* ---- Video Showcase Horizontal Scroll ---- */
        const horizontalTrack = document.getElementById('horizontal-scroll');
        if (horizontalTrack) {
            const mm = gsap.matchMedia();
            mm.add("(min-width: 1024px)", () => {
                const videoCards = horizontalTrack.querySelectorAll('.video-card');
                if (videoCards.length > 0) {
                    const totalWidth = Array.from(videoCards).reduce((acc, card) => {
                        return acc + card.offsetWidth + 32; /* gap */
                    }, 0);

                    gsap.to(horizontalTrack, {
                        x: () => -(totalWidth - window.innerWidth + 100),
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#video-showcase',
                            start: 'top 20%',
                            end: () => `+=${totalWidth}`,
                            scrub: 1,
                            pin: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true
                        }
                    });
                }
            });
        }

        /* ---- Timeline Items ---- */
        gsap.utils.toArray('.timeline__item').forEach((item) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            tl.fromTo(item.querySelector('.timeline__year'),
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );

            tl.fromTo(item.querySelector('.timeline__content'),
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                0.2
            );

            tl.fromTo(item.querySelector('.timeline__dot'),
                { scale: 0 },
                { scale: 1, duration: 0.5, ease: 'back.out(2)' },
                0.3
            );
        });

        /* ---- Measurement Cards — New Premium Layout ---- */
        const measImgFrame = document.querySelector('.measurements__image-frame');
        if (measImgFrame) {
            gsap.fromTo(measImgFrame,
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    opacity: 1,
                    duration: 1.4,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: measImgFrame,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        /* Stat Cards — slide in with stagger */
        const statCards = gsap.utils.toArray('.mc-stat-card');
        if (statCards.length > 0) {
            gsap.fromTo(statCards,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.mc-body-grid',
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        /* Flourish animation */
        const flourish = document.querySelector('.mc-flourish');
        if (flourish) {
            gsap.fromTo(flourish,
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 0.6,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: flourish,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        /* Attribute Cards — slide in with stagger */
        const attrCards = gsap.utils.toArray('.mc-attr-card');
        if (attrCards.length > 0) {
            gsap.fromTo(attrCards,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.mc-attr-grid',
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        /* Unit Toggle Interactivity */
        const btnImperial = document.getElementById('unit-toggle-imperial');
        const btnMetric = document.getElementById('unit-toggle-metric');
        
        function switchUnits(unit) {
            if (unit === 'imperial') {
                btnImperial.classList.add('active');
                btnMetric.classList.remove('active');
            } else {
                btnMetric.classList.add('active');
                btnImperial.classList.remove('active');
            }
            
            // Update all elements with data-imperial attribute
            document.querySelectorAll('[data-imperial]').forEach((valEl) => {
                const text = valEl.getAttribute(`data-${unit}`);
                if (!text) return;
                gsap.to(valEl, {
                    opacity: 0,
                    y: -5,
                    duration: 0.2,
                    onComplete: () => {
                        valEl.innerHTML = text;
                        gsap.fromTo(valEl, { y: 5, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 });
                    }
                });
            });
        }
        
        if (btnImperial && btnMetric) {
            btnImperial.addEventListener('click', () => switchUnits('imperial'));
            btnMetric.addEventListener('click', () => switchUnits('metric'));
        }

        /* Comp Card Modal Interactivity */
        const modal = document.getElementById('comp-card-modal');
        const openBtn = document.getElementById('view-comp-card-btn');
        const closeBtn = document.getElementById('comp-card-close-btn');
        const backdrop = document.getElementById('comp-card-modal-backdrop');
        const printBtn = document.getElementById('comp-card-print-btn');
        
        function openModal() {
            if (!modal) return;
            modal.classList.add('active');
            if (window.lenis) {
                window.lenis.stop();
            }
            document.body.style.overflow = 'hidden';
            
            gsap.fromTo('.modal__container',
                { scale: 0.9, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' }
            );
        }
        
        function closeModal() {
            if (!modal) return;
            gsap.to('.modal__container', {
                scale: 0.9,
                opacity: 0,
                y: 30,
                duration: 0.4,
                ease: 'power3.in',
                onComplete: () => {
                    modal.classList.remove('active');
                    if (window.lenis) {
                        window.lenis.start();
                    }
                    document.body.style.overflow = '';
                }
            });
        }
        
        if (openBtn) openBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }

        /* ---- Cinematic Testimonial Slider ---- */
        const testimonialSection = document.querySelector('.testimonials');
        if (testimonialSection) {
            const split = testimonialSection.querySelector('.testimonials__split');
            
            // Scroll trigger for the split section entry
            if (split) {
                gsap.fromTo(split,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: split,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        onComplete: () => split.removeAttribute('data-animate')
                    }
                );
            }

            const slides = testimonialSection.querySelectorAll('.testimonials__quote-item');
            const images = testimonialSection.querySelectorAll('.testimonials__image-item');
            const prevBtn = testimonialSection.querySelector('.testimonials__btn--prev');
            const nextBtn = testimonialSection.querySelector('.testimonials__btn--next');
            const progressLine = testimonialSection.querySelector('.testimonials__progress-line');
            const currentNum = testimonialSection.querySelector('.testimonials__progress-current');
            
            let currentIndex = 0;
            const totalSlides = slides.length;
            let isAnimating = false;

            // Initialize progress bar
            if (progressLine) {
                progressLine.style.width = `${(1 / totalSlides) * 100}%`;
            }

            function goToSlide(index) {
                if (isAnimating || index === currentIndex) return;
                isAnimating = true;

                const prevSlide = slides[currentIndex];
                const activeSlide = slides[index];
                const prevImage = images[currentIndex];
                const activeImage = images[index];

                // Update text indicators
                if (currentNum) {
                    currentNum.textContent = String(index + 1).padStart(2, '0');
                }
                if (progressLine) {
                    progressLine.style.width = `${((index + 1) / totalSlides) * 100}%`;
                }

                // Animation Timeline
                const tl = gsap.timeline({
                    onComplete: () => {
                        // Cleanup states
                        prevSlide.classList.remove('active');
                        prevImage.classList.remove('active');
                        activeSlide.classList.add('active');
                        activeImage.classList.add('active');
                        
                        // Reset properties for subsequent animations
                        gsap.set([prevSlide, activeSlide, prevImage, activeImage], { clearProps: 'all' });
                        
                        currentIndex = index;
                        isAnimating = false;
                    }
                });

                // 1. Text transition out
                tl.to(prevSlide, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: 'power3.in'
                }, 0);

                // 2. Image transition out/in
                tl.to(prevImage, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.6,
                    ease: 'power3.inOut'
                }, 0);

                // Set up active states immediately for in-transition
                gsap.set(activeSlide, { opacity: 0, y: 20, visibility: 'visible' });
                gsap.set(activeImage, { opacity: 0, scale: 1.1, visibility: 'visible' });

                // 3. Text transition in
                tl.to(activeSlide, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                }, 0.3);

                // 4. Image transition in
                tl.to(activeImage, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                }, 0.2);
            }

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    const targetIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                    goToSlide(targetIndex);
                });

                nextBtn.addEventListener('click', () => {
                    const targetIndex = (currentIndex + 1) % totalSlides;
                    goToSlide(targetIndex);
                });
            }

            // Autoplay loop
            let autoplayTimer = setInterval(() => {
                const targetIndex = (currentIndex + 1) % totalSlides;
                goToSlide(targetIndex);
            }, 7000);

            // Pause/resume autoplay on interaction
            function resetAutoplay() {
                clearInterval(autoplayTimer);
                autoplayTimer = setInterval(() => {
                    const targetIndex = (currentIndex + 1) % totalSlides;
                    goToSlide(targetIndex);
                }, 7000);
            }

            if (prevBtn) prevBtn.addEventListener('click', resetAutoplay);
            if (nextBtn) nextBtn.addEventListener('click', resetAutoplay);
        }

        /* ---- Instagram Grid Stagger ---- */
        const instagramSection = document.querySelector('.instagram');
        if (instagramSection) {
            const grid = instagramSection.querySelector('.instagram__grid');
            const items = instagramSection.querySelectorAll('.instagram__item');
            const footer = instagramSection.querySelector('.instagram__footer');
            
            if (grid && items.length > 0) {
                gsap.fromTo(items,
                    { y: 50, opacity: 0, scale: 0.96 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        stagger: 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: grid,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        onComplete: () => {
                            items.forEach(el => el.removeAttribute('data-animate'));
                        }
                    }
                );
            }
            
            if (footer) {
                gsap.fromTo(footer,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: footer,
                            start: 'top 92%',
                            toggleActions: 'play none none none'
                        },
                        onComplete: () => footer.removeAttribute('data-animate')
                    }
                );
            }
        }

        /* ---- Instagram Posts Modal Interactivity ---- */
        const instagramPosts = [
            {
                id: 0,
                img: "25.webp",
                caption: "A cinematic capture from Chennai Fashion Week. Embodying structure, motion, and raw emotion in front of the lens. Styling that speaks volumes.",
                date: "June 12, 2026",
                link: "https://www.instagram.com/prasannadevi_thambidurai/"
            },
            {
                id: 1,
                img: "6.webp",
                caption: "Regal tones and intricate details. Commercial shoot for the upcoming festive edit. Classic elegance never fades.",
                date: "June 05, 2026",
                link: "https://www.instagram.com/prasannadevi_thambidurai/"
            },
            {
                id: 2,
                img: "7.webp",
                caption: "Studio editorial experiments. Working with shadows and texture to highlight structure. Captured by Chennai's finest.",
                date: "May 28, 2026",
                link: "https://www.instagram.com/prasannadevi_thambidurai/"
            },
            {
                id: 3,
                img: "16.webp",
                caption: "Regal presence for the luxury jewelry edit. Translating traditional craftsmanship into modern silhouettes. A true dream campaign.",
                date: "May 19, 2026",
                link: "https://www.instagram.com/prasannadevi_thambidurai/"
            },
            {
                id: 4,
                img: "8.webp",
                caption: "Close-up portrait beauty study. Highlighting skin textures, bone structure, and minimal edit aesthetics.",
                date: "May 10, 2026",
                link: "https://www.instagram.com/prasannadevi_thambidurai/"
            },
            {
                id: 5,
                img: "3.webp",
                caption: "Runway couture showcase. Opening the show in gold-threaded textures and classic drapes. An unforgettable evening.",
                date: "April 25, 2026",
                link: "https://www.instagram.com/prasannadevi_thambidurai/"
            }
        ];

        const instaModal = document.getElementById('insta-modal');
        const instaModalImg = document.getElementById('insta-modal-img');
        const instaModalCaption = document.getElementById('insta-modal-caption');
        const instaModalDate = document.getElementById('insta-modal-date');
        const instaModalLink = document.getElementById('insta-modal-link');
        const instaCloseBtn = document.getElementById('insta-modal-close-btn');
        const instaBackdrop = document.getElementById('insta-modal-backdrop');

        function openInstaModal(postId) {
            if (!instaModal) return;
            const post = instagramPosts.find(p => p.id === parseInt(postId));
            if (!post) return;

            // Inject values
            if (instaModalImg) instaModalImg.src = post.img;
            if (instaModalCaption) instaModalCaption.textContent = post.caption;
            if (instaModalDate) instaModalDate.textContent = post.date;
            if (instaModalLink) instaModalLink.href = post.link;

            // Show modal
            instaModal.classList.add('active');
            if (window.lenis) {
                window.lenis.stop();
            }
            document.body.style.overflow = 'hidden';

            gsap.fromTo('#insta-modal .modal__container',
                { scale: 0.9, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' }
            );
        }

        function closeInstaModal() {
            if (!instaModal) return;
            gsap.to('#insta-modal .modal__container', {
                scale: 0.9,
                opacity: 0,
                y: 30,
                duration: 0.4,
                ease: 'power3.in',
                onComplete: () => {
                    instaModal.classList.remove('active');
                    if (window.lenis) {
                        window.lenis.start();
                    }
                    document.body.style.overflow = '';
                    if (instaModalImg) instaModalImg.src = ''; // reset src
                }
            });
        }

        // Attach event listeners to Instagram Grid items
        document.querySelectorAll('.instagram__item-inner[data-insta-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const postId = btn.getAttribute('data-insta-id');
                openInstaModal(postId);
            });
        });

        if (instaCloseBtn) instaCloseBtn.addEventListener('click', closeInstaModal);
        if (instaBackdrop) instaBackdrop.addEventListener('click', closeInstaModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && instaModal && instaModal.classList.contains('active')) {
                closeInstaModal();
            }
        });

        /* ---- Booking Section ---- */
        const bookingCard = document.querySelector('.booking__card');
        if (bookingCard) {
            gsap.fromTo(bookingCard,
                { x: 60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: bookingCard,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    onComplete: () => bookingCard.removeAttribute('data-animate')
                }
            );
        }

        /* ---- Footer Name Parallax ---- */
        gsap.fromTo('.footer__name',
            { yPercent: 20 },
            {
                yPercent: -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 1
                }
            }
        );

        /* ---- Gradient Orb Parallax ---- */
        gsap.utils.toArray('.gradient-orb').forEach(orb => {
            gsap.to(orb, {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: orb.closest('section') || orb.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                }
            });
        });

        /* ---- Section Labels ---- */
        gsap.utils.toArray('.section-label').forEach(label => {
            gsap.fromTo(label,
                { x: -30, y: 60, opacity: 0 },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: label,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    onComplete: () => {
                        label.removeAttribute('data-animate');
                        gsap.set(label, { clearProps: 'transform' });
                    }
                }
            );
        });

        /* ---- Marquee Speed Control ---- */
        const marqueeTrack = document.querySelector('.marquee__track');
        if (marqueeTrack) {
            gsap.to(marqueeTrack, {
                xPercent: -50,
                repeat: -1,
                duration: 25,
                ease: 'linear'
            });

            /* Override CSS animation */
            marqueeTrack.style.animation = 'none';
        }

        /* Refresh ScrollTrigger after all images load */
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    }

    /* Initialize */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGSAP);
    } else {
        initGSAP();
    }

})();
