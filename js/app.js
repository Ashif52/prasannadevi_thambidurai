/* ============================================
   APP — Main Orchestrator
   Lenis, Three.js, Preloader, Splitting
   ============================================ */

(function() {
    'use strict';

    /* ============================================
       LENIS SMOOTH SCROLL
       ============================================ */
    function initLenis() {
        if (typeof Lenis === 'undefined') return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false
        });

        /* Store globally for other modules */
        window.lenis = lenis;

        /* Connect Lenis to GSAP ScrollTrigger */
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        } else {
            /* Fallback RAF loop */
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
    }

    /* ============================================
       SPLITTING.JS — Text Split
       ============================================ */
    function initSplitting() {
        if (typeof Splitting === 'undefined') return;

        Splitting({
            target: '[data-splitting]',
            by: 'chars'
        });
    }

    /* ============================================
       THREE.JS — Floating Particle Background
       ============================================ */
    function initThreeJS() {
        if (typeof THREE === 'undefined') return;

        const canvas = document.getElementById('three-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: false, /* Performance */
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); /* Cap for performance */

        /* Particle count based on device */
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 80 : 180;

        /* Create particles */
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 120;     /* x */
            positions[i + 1] = (Math.random() - 0.5) * 120; /* y */
            positions[i + 2] = (Math.random() - 0.5) * 80;  /* z */

            velocities[i] = (Math.random() - 0.5) * 0.02;
            velocities[i + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i + 2] = (Math.random() - 0.5) * 0.01;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        /* Create circular particle texture via canvas */
        function createParticleTexture() {
            const size = 64;
            const c = document.createElement('canvas');
            c.width = size;
            c.height = size;
            const ctx = c.getContext('2d');
            const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);
            return new THREE.CanvasTexture(c);
        }

        /* Gold-tinted particle material */
        const material = new THREE.PointsMaterial({
            color: 0xD6B47E,
            size: isMobile ? 2.5 : 3.5,
            map: createParticleTexture(),
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
            depthWrite: false
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        /* Subtle ambient lighting glow */
        const ambientLight = new THREE.AmbientLight(0xD6B47E, 0.1);
        scene.add(ambientLight);

        /* Mouse tracking for camera sway */
        let mouseX = 0, mouseY = 0;
        let targetMouseX = 0, targetMouseY = 0;

        document.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        /* Animation loop */
        let animationId;
        let time = 0;
        let isVisible = true;

        function animate() {
            animationId = requestAnimationFrame(animate);
            if (!isVisible) return;

            time += 0.005;

            /* Smooth mouse interpolation */
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            /* Camera sway */
            camera.position.x = mouseX * 3;
            camera.position.y = -mouseY * 3;
            camera.lookAt(scene.position);

            /* Animate particles */
            const pos = geometry.attributes.position.array;
            for (let i = 0; i < pos.length; i += 3) {
                pos[i] += velocities[i] + Math.sin(time + i) * 0.005;
                pos[i + 1] += velocities[i + 1] + Math.cos(time + i) * 0.005;
                pos[i + 2] += velocities[i + 2];

                /* Wrap particles */
                if (Math.abs(pos[i]) > 60) pos[i] *= -0.95;
                if (Math.abs(pos[i + 1]) > 60) pos[i + 1] *= -0.95;
                if (Math.abs(pos[i + 2]) > 40) pos[i + 2] *= -0.95;
            }
            geometry.attributes.position.needsUpdate = true;

            /* Gentle rotation */
            particles.rotation.y = time * 0.05;
            particles.rotation.x = Math.sin(time * 0.3) * 0.02;

            renderer.render(scene, camera);
        }

        animate();

        /* Visibility-based performance optimization */
        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
        });

        /* Resize handler */
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, 200);
        });
    }

    /* ============================================
       PRELOADER
       ============================================ */
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const progress = document.getElementById('preloader-progress');
        const counter = document.getElementById('preloader-counter');

        if (!preloader) return;

        /* Simulate loading progress */
        let currentProgress = 0;
        const targetProgress = 100;

        // Subtle monogram and title letter animations on start
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.preloader__name .char', 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'power3.out' }
            );
            gsap.fromTo('.preloader__monogram', 
                { scale: 0.85, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out' }
            );
        }

        function updateProgress() {
            if (currentProgress < targetProgress) {
                currentProgress += Math.random() * 3 + 1;
                if (currentProgress > targetProgress) currentProgress = targetProgress;

                if (progress) progress.style.width = currentProgress + '%';
                if (counter) counter.textContent = Math.round(currentProgress) + '%';

                if (currentProgress < targetProgress) {
                    requestAnimationFrame(updateProgress);
                } else {
                    /* Complete — hide preloader */
                    setTimeout(hidePreloader, 400);
                }
            }
        }

        function hidePreloader() {
            if (typeof gsap !== 'undefined') {
                const tl = gsap.timeline({
                    onComplete: () => {
                        preloader.style.display = 'none';
                        preloader.style.pointerEvents = 'none';
                        
                        const curtain = document.getElementById('preloader-curtain-accent');
                        if (curtain) {
                            curtain.style.display = 'none';
                            curtain.style.pointerEvents = 'none';
                        }
                        
                        document.body.style.overflow = '';
                    }
                });

                // 1. Slide preloader curtain up
                tl.to(preloader, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: 'power4.inOut'
                }, 0);

                // 2. Slide secondary rosewood curtain up slightly later
                const curtain = document.getElementById('preloader-curtain-accent');
                if (curtain) {
                    tl.to(curtain, {
                        yPercent: -100,
                        duration: 1.2,
                        ease: 'power4.inOut'
                    }, 0.15);
                }

                // 3. Trigger hero zoom-out and fade-in timeline
                tl.add(() => {
                    if (window._heroAnimation) {
                        window._heroAnimation();
                    }
                }, 0.6);

            } else {
                // Fallback reveal
                preloader.style.opacity = '0';
                const curtain = document.getElementById('preloader-curtain-accent');
                if (curtain) curtain.style.opacity = '0';

                setTimeout(() => {
                    preloader.style.display = 'none';
                    if (curtain) curtain.style.display = 'none';
                    document.body.style.overflow = '';
                }, 800);
            }
        }

        /* Prevent scrolling during preloader */
        document.body.style.overflow = 'hidden';

        /* Start progress animation */
        requestAnimationFrame(updateProgress);
    }

    /* ============================================
       HERO MOUSE PARALLAX
       ============================================ */
    function initHeroParallax() {
        const heroBg = document.getElementById('hero-bg');
        const heroContent = document.getElementById('hero-content');

        if (!heroBg) return;

        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function updateParallax() {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;

            if (heroBg) {
                heroBg.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`;
            }

            if (heroContent) {
                heroContent.style.transform = `translate(${currentX * -5}px, ${currentY * -5}px)`;
            }

            requestAnimationFrame(updateParallax);
        }

        /* Only on desktop */
        if (window.innerWidth > 768) {
            requestAnimationFrame(updateParallax);
        }
    }

    /* ============================================
       INITIALIZE EVERYTHING
       ============================================ */
    function init() {
        initSplitting();
        initLenis();
        initPreloader();
        initHeroParallax();

        /* Delay Three.js slightly for performance */
        setTimeout(initThreeJS, 500);
    }

    /* Start when DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
