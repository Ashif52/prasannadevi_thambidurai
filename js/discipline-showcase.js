/**
 * PRASANNA DEVI — Haute Lookbook Theater & Discipline Showcase
 * Interactive, magazine-grade full-screen presentation for Selected Disciplines.
 */

(function() {
    'use strict';

    /* Discipline Datasets with High-Fashion Editorial Metadata */
    const DISCIPLINE_DATA = {
        commercial: {
            title: "Commercial Campaigns",
            subtitle: "Advertising · National Brands · Retail Storytelling",
            tag: "COMMERCIAL & BRAND ADVERTISING",
            items: [
                {
                    src: "assets/model/Commercial/Malabar gold and diamonds promotion.jpeg",
                    title: "Malabar Gold & Diamonds Campaign",
                    category: "Commercial Brand",
                    desc: "Lead campaign visual for Malabar Gold & Diamonds, showcasing luxury jewellery poise and high-profile brand presence.",
                    location: "Chennai / National Campaign"
                },
                {
                    src: "assets/model/Commercial/Malabar gold and diamonds promotion Stairs.jpeg",
                    title: "Malabar Gold Grand Stairs",
                    category: "Commercial Campaign",
                    desc: "Regal grand-staircase capture for Malabar Gold & Diamonds, blending heritage architecture with elegant bridal attire.",
                    location: "Palace Set, Chennai"
                },
                {
                    src: "assets/model/Commercial/Nimali- house of naidu hall promotion.jpeg",
                    title: "Nimali — House of Naidu Hall",
                    category: "Retail Couture Campaign",
                    desc: "Elegantly styled commercial campaign for Nimali (House of Naidu Hall), celebrating contemporary ethnic wear.",
                    location: "Naidu Hall Studios, Chennai"
                },
                {
                    src: "assets/model/Commercial/annachy app - by super saravana stores promotion.jpeg",
                    title: "Annachy App — Super Saravana Stores",
                    category: "Brand Ambassador",
                    desc: "High-reach commercial campaign for the Annachy App by Super Saravana Stores, delivering vibrant modern commercial appeal.",
                    location: "Super Saravana Studios"
                },
                {
                    src: "assets/model/Commercial/Maroon Saree at the Festive Market.png",
                    title: "Festive Market Brand Story",
                    category: "Festive Campaign",
                    desc: "Vibrant rich maroon saree campaign set in a festive cultural bazaar, radiating natural warmth and authentic cultural poise.",
                    location: "Heritage Market Set"
                }
            ]
        },
        fashion: {
            title: "Contemporary Fashion",
            subtitle: "Haute Couture · Streetwear Aesthetics · Experimental Silhouettes",
            tag: "HAUTE COUTURE & READY-TO-WEAR",
            items: [
                {
                    src: "assets/model/fashion/fashion-01.jpeg",
                    title: "Dark Glamour",
                    category: "Haute Couture",
                    desc: "High-glamour concept shoot blending structured textures, deep shadows, and avant-garde styling.",
                    location: "Fashion Studio, Chennai"
                },
                {
                    src: "assets/model/fashion/fashion-02.jpeg",
                    title: "Concept Silhouette",
                    category: "High Fashion",
                    desc: "Dramatic tonal styling highlighting bodily form, fluid fabric movement, and sculpted geometry.",
                    location: "Chennai, Tamil Nadu"
                },
                {
                    src: "assets/model/fashion/fashion-03.jpeg",
                    title: "Styling Session Look",
                    category: "Editorial Fashion",
                    desc: "Fashion forward studio concept exploring bold textures, dynamic body angles, and expressive composure.",
                    location: "Studio Production Day"
                },
                {
                    src: "assets/model/fashion/fashion-04.jpeg",
                    title: "Production Set Aura",
                    category: "Fashion Film Stills",
                    desc: "Behind-the-scenes aesthetic capturing poised presence amidst raw industrial lighting and production sets.",
                    location: "Production Stage"
                },
                {
                    src: "assets/model/fashion/fashion-05.jpeg",
                    title: "Urban Streetwear",
                    category: "Streetwear Forward",
                    desc: "Contemporary relaxed streetwear styling with high-fashion poise, celebrating raw youth culture.",
                    location: "Urban Locations, Chennai"
                },
                {
                    src: "assets/model/fashion/fashion-06.jpeg",
                    title: "Couture Monolith",
                    category: "Catwalk Ready",
                    desc: "Striking black monolithic couture form, creating a commanding architectural visual statement.",
                    location: "Runway Concept Studio"
                },
                {
                    src: "assets/model/fashion/fashion-07.jpeg",
                    title: "Sculptural Editorial Pose",
                    category: "Avant-Garde Pose",
                    desc: "Clean geometric body lines celebrating high-fashion pose discipline and physical control.",
                    location: "Editorial Set, Chennai"
                },
                {
                    src: "assets/model/fashion/fashion-08.jpeg",
                    title: "Tailored Full-Body Form",
                    category: "Wardrobe Showcase",
                    desc: "Full-length fashion study emphasizing proportionate silhouette, clean footwear lines, and regal carriage.",
                    location: "Fashion Studio, Chennai"
                }
            ]
        },
        editorial: {
            title: "High-Concept Editorial",
            subtitle: "Cinematic Narratives · Visual Storytelling · Expressive Artistry",
            tag: "EDITORIAL & VISUAL NARRATIVE",
            items: [
                {
                    src: "assets/model/editorial/editorial-02.jpeg",
                    title: "Grace in Every Frame",
                    category: "Editorial Cover Series",
                    desc: "Introspective fine-art portrait capturing nuanced emotion, timeless composure, and subtle lighting nuances.",
                    location: "Editorial Atelier, Chennai"
                },
                {
                    src: "assets/model/editorial/editorial-03.jpeg",
                    title: "Creative Direction Muse",
                    category: "Art Direction Concept",
                    desc: "Creative collaboration exploring cinematic storytelling, expressive facial drama, and ambient depth.",
                    location: "Creative Space, Chennai"
                },
                {
                    src: "assets/model/editorial/editorial-04.jpeg",
                    title: "Midnight Muse",
                    category: "Low-Key Narrative",
                    desc: "Atmospheric low-key lighting study accentuating graceful facial contours and evocative shadows.",
                    location: "Night Concept Shoot"
                },
                {
                    src: "assets/model/editorial/editorial-05.jpeg",
                    title: "Golden Hour Profile",
                    category: "Cultural Editorial",
                    desc: "Warm twilight glow illuminating traditional jhumka earrings and classical South Indian beauty.",
                    location: "Heritage Courtyard"
                },
                {
                    src: "assets/model/editorial/editorial-06.jpeg",
                    title: "Couture Intensity",
                    category: "High-Contrast Portrait",
                    desc: "Chiseled editorial gaze with razor-sharp lighting, commanding visual tension and gravitas.",
                    location: "Studio Stage, Chennai"
                },
                {
                    src: "assets/model/editorial/editorial-07.jpeg",
                    title: "Minimalist Studio Form",
                    category: "Pure Minimalism",
                    desc: "Stripped-back editorial frame focused purely on posture, balance, and the architecture of the human form.",
                    location: "Minimalist Studio"
                },
                {
                    src: "assets/model/editorial/jewellery-05.jpeg",
                    title: "Royal Ornaments & Silk",
                    category: "Heritage Narrative",
                    desc: "Luxurious traditional textile pairing with ornate gold ornaments, evoking royal South Indian heritage.",
                    location: "Heritage Palace Set"
                },
                {
                    src: "assets/model/editorial/jewellery-07.jpeg",
                    title: "Heritage South Indian Poise",
                    category: "Classical Muse",
                    desc: "Poetic stillness and cultural majesty, bridging Bharatanatyam heritage with high-fashion framing.",
                    location: "Temple Pavilion"
                }
            ]
        },
        jwellery: {
            title: "Heritage Fine Jewellery",
            subtitle: "Temple Gold · Royal Bridal Adornment · Gemstone Artistry",
            tag: "FINE JEWELLERY & BRIDAL ADORNMENT",
            items: [
                {
                    src: "assets/model/jwellery/jewellery-01.jpeg",
                    title: "MBJ Venkateswara Jewellers",
                    category: "Heritage Bridal Campaign",
                    desc: "Lead campaign visual for MBJ Venkateswara Jewellers, Krishnagiri. Showcasing traditional South Indian temple gold.",
                    location: "Krishnagiri / Chennai"
                },
                {
                    src: "assets/model/jwellery/jewellery-02.jpeg",
                    title: "Royal Crimson & Antique Gold",
                    category: "Heritage Collection",
                    desc: "Rich crimson silk saree paired with intricately stamped 22k antique gold necklace and ruby cabochons.",
                    location: "Heritage Campaign Shoot"
                },
                {
                    src: "assets/model/jwellery/jewellery-03.jpeg",
                    title: "Temple Heritage Bridal",
                    category: "Bridal Adornment",
                    desc: "Sacred South Indian bridal temple choker and multi-strand necklaces reflecting auspicious matrimonial tradition.",
                    location: "Bridal Suite, Chennai"
                },
                {
                    src: "assets/model/jwellery/jewellery-04.jpeg",
                    title: "Opulent Temple Gold",
                    category: "High Jewellery MUA",
                    desc: "High-definition bridal makeup artist look highlighting royal temple necklace, maang tikka, and hanging jhumkas.",
                    location: "MUA Masterclass Studio"
                },
                {
                    src: "assets/model/jwellery/jewellery-06.jpeg",
                    title: "Classic Pure Gold Detailing",
                    category: "Fine Jewellery Craft",
                    desc: "Intricate micro-carvings on 22-karat gold necklace set against luminous dewy skin tones.",
                    location: "Jewellery Studio, Chennai"
                },
                {
                    src: "assets/model/jwellery/jewellery-08.jpeg",
                    title: "Statement Rings & Hand Craft",
                    category: "Ornament Detail",
                    desc: "Close-up macro study of handcrafted gold rings, peacock motifs, and delicate henna finger detailing.",
                    location: "Detail Studio, Chennai"
                },
                {
                    src: "assets/model/jwellery/jewellery-09.jpeg",
                    title: "Royal Bridal Bangles",
                    category: "Bangle & Kada Suite",
                    desc: "Layered traditional temple kadas and gold bangles showcasing hand-chiseled South Indian craftsmanship.",
                    location: "Bridal Heritage Set"
                }
            ]
        },
        beauty: {
            title: "Beauty & Close-Up",
            subtitle: "Facial Presence · Dewy Skin · MUA Artistry · Expressive Eyes",
            tag: "BEAUTY, FACIAL PRESENCE & MUA",
            items: [
                {
                    src: "assets/model/hero.jpg",
                    title: "Intense Editorial Gaze",
                    category: "Facial Presence",
                    desc: "Striking natural close-up capturing deep dark-brown expressive eyes, sculpted brow line, and timeless Indian features.",
                    location: "Hero Portrait Session"
                },
                {
                    src: "assets/model/jwellery/jewellery-06.jpeg",
                    title: "Clean Natural Radiance",
                    category: "Dewy Glow",
                    desc: "Minimalist beauty capture celebrating radiant skin texture, natural lip tones, and delicate neck contours.",
                    location: "Natural Light Studio"
                },
                {
                    src: "assets/model/editorial/editorial-05.jpeg",
                    title: "Side Profile & Jhumka Detailing",
                    category: "Sculpted Profile",
                    desc: "Elegant side silhouette showcasing sculpted jawline, traditional jhumka earrings, and golden hour rim lighting.",
                    location: "Heritage Courtyard"
                },
                {
                    src: "assets/model/jwellery/jewellery-04.jpeg",
                    title: "Traditional Bridal MUA",
                    category: "Bridal Artistry",
                    desc: "Intricate South Indian bridal makeup artistry, perfectly balancing opulent traditional aesthetics with modern dewy finish.",
                    location: "MUA Masterclass Studio"
                },
                {
                    src: "assets/model/editorial/editorial-02.jpeg",
                    title: "Graceful Fine-Art Beauty",
                    category: "Expressive Emotion",
                    desc: "High-definition beauty portrait focusing on gentle natural expression, poise, and luminous complexion.",
                    location: "Editorial Atelier, Chennai"
                }
            ]
        },
        runway: {
            title: "Runway & Catwalk",
            subtitle: "Statement Walks · Catwalk Energy · Backstage Moments",
            tag: "RUNWAY, CATWALK & DESIGNER WALKS",
            items: [
                {
                    src: "assets/model/Runway/runway-01.png",
                    title: "Urban Streetwear Walk",
                    category: "Fashion Presentation",
                    desc: "High-energy runway stride showcasing contemporary urban streetwear, commanding paced walk, and fierce composure.",
                    location: "Fashion Showcase Stage"
                },
                {
                    src: "assets/model/Runway/runway-02.png",
                    title: "Backstage After Dark",
                    category: "Pre-Show Intensity",
                    desc: "Atmospheric backstage capture capturing the raw focus, anticipation, and attitude moments before the catwalk.",
                    location: "Backstage Lounge"
                },
                {
                    src: "assets/model/Runway/runway-03.jpeg",
                    title: "Designer Couture Catwalk",
                    category: "Runway Finale",
                    desc: "Statement runway poise delivering high-impact presence for designer collections and couture showcases.",
                    location: "Main Runway, Chennai"
                }
            ]
        }
    };

    /* Component State */
    let currentDiscipline = 'commercial';
    let currentIndex = 0;
    let isModalOpen = false;

    /* DOM Elements */
    let modalEl, backdropEl, closeBtn, prevBtn, nextBtn;
    let heroImg, categoryTitleEl, badgeEl, counterEl;
    let hudTag, hudTitle, hudDesc, zoomBtn, filmstripEl;
    let switcherBtns = [];

    function initShowcase() {
        modalEl = document.getElementById('lookbook-modal');
        if (!modalEl) return;

        backdropEl = document.getElementById('lookbook-modal-backdrop');
        closeBtn = document.getElementById('lookbook-modal-close');
        prevBtn = document.getElementById('lookbook-btn-prev');
        nextBtn = document.getElementById('lookbook-btn-next');
        heroImg = document.getElementById('lookbook-hero-img');
        categoryTitleEl = document.getElementById('lookbook-category-title');
        badgeEl = document.getElementById('lookbook-badge');
        counterEl = document.getElementById('lookbook-counter');
        hudTag = document.getElementById('lookbook-hud-tag');
        hudTitle = document.getElementById('lookbook-hud-title');
        hudDesc = document.getElementById('lookbook-hud-desc');
        zoomBtn = document.getElementById('lookbook-zoom-btn');
        filmstripEl = document.getElementById('lookbook-filmstrip');
        switcherBtns = document.querySelectorAll('.lookbook-switch-btn');

        /* Event Listeners */
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdropEl) backdropEl.addEventListener('click', closeModal);
        if (prevBtn) prevBtn.addEventListener('click', showPrevItem);
        if (nextBtn) nextBtn.addEventListener('click', showNextItem);

        /* Category Switcher Buttons inside the Theater */
        switcherBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.category;
                if (cat && DISCIPLINE_DATA[cat]) {
                    loadDiscipline(cat, 0);
                }
            });
        });

        /* Bind to Selected Disciplines Cards and Explore buttons */
        const disciplineCards = document.querySelectorAll('.work-category-card, [data-explore-discipline]');
        disciplineCards.forEach(card => {
            const trigger = (e) => {
                e.preventDefault();
                const category = card.dataset.category || card.dataset.exploreDiscipline || 'commercial';
                openModal(category);
            };

            card.addEventListener('click', trigger);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    trigger(e);
                }
            });
        });

        /* Keyboard Controls */
        document.addEventListener('keydown', (e) => {
            if (!isModalOpen) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') showPrevItem();
            if (e.key === 'ArrowRight') showNextItem();
        });

        /* Touch Swipe Support for Mobile */
        let touchStartX = 0;
        let touchEndX = 0;
        const stageEl = document.querySelector('.lookbook-modal__stage');
        if (stageEl) {
            stageEl.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            stageEl.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        function handleSwipe() {
            const swipeDiff = touchEndX - touchStartX;
            if (Math.abs(swipeDiff) > 50) {
                if (swipeDiff < 0) showNextItem();
                else showPrevItem();
            }
        }

        /* ====================================================
           MOUSE NAVIGATION SUITE (Click, Drag, Wheel, Cursor)
           ==================================================== */
        if (stageEl) {
            let isMouseDown = false;
            let startMouseX = 0;
            let currentMouseX = 0;
            let isDragging = false;
            let wheelCooldown = false;
            const viewerEl = document.querySelector('.lookbook-modal__viewer') || stageEl;

            // Update Directional Hover Cue & Custom Cursor
            stageEl.addEventListener('mousemove', (e) => {
                if (!isModalOpen) return;

                // If hovering buttons, let buttons handle their own hover
                if (e.target.closest('button, a, .lookbook-filmstrip, .lookbook-switch-btn')) {
                    stageEl.classList.remove('hover-prev', 'hover-next');
                    if (prevBtn) prevBtn.classList.remove('lookbook-nav-btn--hint');
                    if (nextBtn) nextBtn.classList.remove('lookbook-nav-btn--hint');
                    if (window.luxuryCursor) window.luxuryCursor.clearNav();
                    return;
                }

                if (isMouseDown) {
                    currentMouseX = e.clientX;
                    const dragDist = currentMouseX - startMouseX;
                    if (Math.abs(dragDist) > 6) {
                        isDragging = true;
                        viewerEl.classList.add('is-dragging');
                        if (heroImg) {
                            // Tactile drag physics translation
                            heroImg.style.transform = `translateX(${dragDist * 0.35}px) rotate(${dragDist * 0.012}deg)`;
                            heroImg.style.transition = 'none';
                        }
                        if (window.luxuryCursor) window.luxuryCursor.setDrag(true);
                    }
                    return;
                }

                // Normal movement across the stage
                const rect = stageEl.getBoundingClientRect();
                const relativeX = e.clientX - rect.left;
                const isLeftSide = relativeX < (rect.width * 0.5);

                if (isLeftSide) {
                    stageEl.classList.add('hover-prev');
                    stageEl.classList.remove('hover-next');
                    if (prevBtn) prevBtn.classList.add('lookbook-nav-btn--hint');
                    if (nextBtn) nextBtn.classList.remove('lookbook-nav-btn--hint');
                    if (window.luxuryCursor) window.luxuryCursor.setNav('← PREV');
                } else {
                    stageEl.classList.add('hover-next');
                    stageEl.classList.remove('hover-prev');
                    if (nextBtn) nextBtn.classList.add('lookbook-nav-btn--hint');
                    if (prevBtn) prevBtn.classList.remove('lookbook-nav-btn--hint');
                    if (window.luxuryCursor) window.luxuryCursor.setNav('NEXT →');
                }
            });

            stageEl.addEventListener('mouseleave', () => {
                stageEl.classList.remove('hover-prev', 'hover-next');
                if (prevBtn) prevBtn.classList.remove('lookbook-nav-btn--hint');
                if (nextBtn) nextBtn.classList.remove('lookbook-nav-btn--hint');
                if (window.luxuryCursor) {
                    window.luxuryCursor.clearNav();
                    window.luxuryCursor.setDrag(false);
                }
                if (isMouseDown) {
                    isMouseDown = false;
                    isDragging = false;
                    viewerEl.classList.remove('is-dragging');
                    if (heroImg) {
                        heroImg.style.transform = '';
                        heroImg.style.transition = 'transform 0.4s var(--ease-out-expo)';
                    }
                }
            });

            // Mouse Down (Start of Drag or Click)
            stageEl.addEventListener('mousedown', (e) => {
                if (!isModalOpen) return;
                // Ignore if clicked on buttons or links
                if (e.target.closest('button, a, .lookbook-filmstrip, .lookbook-switch-btn')) return;

                isMouseDown = true;
                isDragging = false;
                startMouseX = e.clientX;
                currentMouseX = e.clientX;
            });

            // Mouse Up (End of Drag or Click Action)
            window.addEventListener('mouseup', (e) => {
                if (!isModalOpen || !isMouseDown) return;

                const dragDist = currentMouseX - startMouseX;
                isMouseDown = false;
                viewerEl.classList.remove('is-dragging');

                if (heroImg) {
                    heroImg.style.transform = '';
                    heroImg.style.transition = 'transform 0.4s var(--ease-out-expo)';
                }

                if (window.luxuryCursor) window.luxuryCursor.setDrag(false);

                // If user dragged more than 35px, slide accordingly
                if (isDragging && Math.abs(dragDist) > 35) {
                    if (dragDist < 0) {
                        showNextItem();
                    } else {
                        showPrevItem();
                    }
                    isDragging = false;
                    return;
                }

                isDragging = false;

                // If it was a simple click on the stage (and within stageEl)
                if (stageEl.contains(e.target) && !e.target.closest('button, a, .lookbook-filmstrip, .lookbook-switch-btn')) {
                    const rect = stageEl.getBoundingClientRect();
                    const relativeX = e.clientX - rect.left;
                    if (relativeX < (rect.width * 0.5)) {
                        showPrevItem();
                    } else {
                        showNextItem();
                    }
                }
            });

            // Mouse Wheel Navigation (Scroll to next/prev image)
            stageEl.addEventListener('wheel', (e) => {
                if (!isModalOpen) return;
                // If scrolling inside HUD or filmstrip, don't hijack
                if (e.target.closest('#lookbook-hud')) return;
                if (e.target.closest('.lookbook-filmstrip')) {
                    if (filmstripEl) {
                        filmstripEl.scrollLeft += (e.deltaY || e.deltaX) * 0.9;
                        e.preventDefault();
                    }
                    return;
                }

                e.preventDefault();
                if (wheelCooldown) return;

                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (Math.abs(delta) > 18) {
                    wheelCooldown = true;
                    if (delta > 0) {
                        showNextItem();
                    } else {
                        showPrevItem();
                    }
                    setTimeout(() => { wheelCooldown = false; }, 360);
                }
            }, { passive: false });
        }

        // Filmstrip mouse horizontal wheel and drag
        if (filmstripEl) {
            let isFilmstripDown = false;
            let startFilmstripX = 0;
            let scrollStartLeft = 0;

            filmstripEl.addEventListener('mousedown', (e) => {
                isFilmstripDown = true;
                startFilmstripX = e.pageX - filmstripEl.offsetLeft;
                scrollStartLeft = filmstripEl.scrollLeft;
            });

            window.addEventListener('mouseup', () => {
                isFilmstripDown = false;
            });

            filmstripEl.addEventListener('mousemove', (e) => {
                if (!isFilmstripDown) return;
                e.preventDefault();
                const x = e.pageX - filmstripEl.offsetLeft;
                const walk = (x - startFilmstripX) * 1.5;
                filmstripEl.scrollLeft = scrollStartLeft - walk;
            });

            filmstripEl.addEventListener('wheel', (e) => {
                e.preventDefault();
                filmstripEl.scrollLeft += (e.deltaY || e.deltaX) * 0.8;
            }, { passive: false });
        }
    }

    function openModal(categoryKey) {
        if (!DISCIPLINE_DATA[categoryKey]) {
            categoryKey = 'commercial';
        }

        currentDiscipline = categoryKey;
        currentIndex = 0;
        isModalOpen = true;

        modalEl.classList.add('lookbook-modal--open');
        modalEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        loadDiscipline(currentDiscipline, 0);

        /* GSAP Entrance Animation */
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.lookbook-modal__container', 
                { opacity: 0, scale: 0.94, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );
            gsap.fromTo('.lookbook-modal__viewer',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: 'power3.out' }
            );
            gsap.fromTo('.lookbook-modal__hud',
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.6, delay: 0.25, ease: 'power3.out' }
            );
        }
    }

    function closeModal() {
        if (!isModalOpen) return;

        if (window.luxuryCursor) {
            window.luxuryCursor.clearNav();
            window.luxuryCursor.setDrag(false);
        }

        if (typeof gsap !== 'undefined') {
            gsap.to('.lookbook-modal__container', {
                opacity: 0,
                scale: 0.96,
                y: 20,
                duration: 0.35,
                ease: 'power2.in',
                onComplete: () => {
                    modalEl.classList.remove('lookbook-modal--open');
                    modalEl.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                    isModalOpen = false;
                }
            });
        } else {
            modalEl.classList.remove('lookbook-modal--open');
            modalEl.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            isModalOpen = false;
        }
    }

    function loadDiscipline(categoryKey, startIndex) {
        currentDiscipline = categoryKey;
        currentIndex = startIndex || 0;

        const data = DISCIPLINE_DATA[categoryKey];
        if (!data) return;

        /* Update Switcher Pills active state */
        switcherBtns.forEach(btn => {
            if (btn.dataset.category === categoryKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        /* Update Header Info */
        if (categoryTitleEl) categoryTitleEl.textContent = data.title;
        if (badgeEl) badgeEl.textContent = data.tag;

        /* Build Filmstrip Thumbnails */
        buildFilmstrip(data.items);

        /* Render Current Item */
        renderItem(currentIndex);
    }

    function buildFilmstrip(items) {
        if (!filmstripEl) return;
        filmstripEl.innerHTML = '';

        items.forEach((item, idx) => {
            const thumbBtn = document.createElement('button');
            thumbBtn.className = 'lookbook-thumb' + (idx === currentIndex ? ' lookbook-thumb--active' : '');
            thumbBtn.setAttribute('aria-label', `View look ${idx + 1}: ${item.title}`);

            const thumbImg = document.createElement('img');
            thumbImg.src = item.src;
            thumbImg.alt = item.title;
            thumbImg.loading = 'lazy';

            const thumbIndex = document.createElement('span');
            thumbIndex.className = 'lookbook-thumb__index';
            thumbIndex.textContent = String(idx + 1).padStart(2, '0');

            thumbBtn.appendChild(thumbImg);
            thumbBtn.appendChild(thumbIndex);

            thumbBtn.addEventListener('click', () => {
                renderItem(idx);
            });

            filmstripEl.appendChild(thumbBtn);
        });
    }

    function renderItem(index) {
        const data = DISCIPLINE_DATA[currentDiscipline];
        if (!data || !data.items || !data.items[index]) return;

        currentIndex = index;
        const item = data.items[currentIndex];

        /* Update Counter */
        if (counterEl) {
            counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(data.items.length).padStart(2, '0')}`;
        }

        /* Update Active Thumbnail in Filmstrip */
        if (filmstripEl) {
            const allThumbs = filmstripEl.querySelectorAll('.lookbook-thumb');
            allThumbs.forEach((thumb, idx) => {
                if (idx === currentIndex) {
                    thumb.classList.add('lookbook-thumb--active');
                    thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                } else {
                    thumb.classList.remove('lookbook-thumb--active');
                }
            });
        }

        /* Update HUD Data */
        if (hudTag) hudTag.textContent = `${item.category.toUpperCase()} · ${item.location}`;
        if (hudTitle) hudTitle.textContent = item.title;
        if (hudDesc) hudDesc.textContent = item.desc;
        if (zoomBtn) zoomBtn.href = item.src;

        /* Animate Image Transition with GSAP */
        if (heroImg) {
            if (typeof gsap !== 'undefined') {
                gsap.to(heroImg, {
                    opacity: 0.3,
                    scale: 0.98,
                    duration: 0.18,
                    ease: 'power2.in',
                    onComplete: () => {
                        heroImg.src = item.src;
                        heroImg.alt = `${item.title} — ${item.category}`;
                        gsap.fromTo(heroImg,
                            { opacity: 0.3, scale: 1.04 },
                            { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
                        );
                    }
                });

                /* HUD Stagger */
                gsap.fromTo('#lookbook-hud',
                    { opacity: 0.6, y: 10 },
                    { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
                );
            } else {
                heroImg.src = item.src;
                heroImg.alt = `${item.title} — ${item.category}`;
            }
        }
    }

    function showPrevItem() {
        const data = DISCIPLINE_DATA[currentDiscipline];
        if (!data || !data.items) return;
        const prevIndex = (currentIndex - 1 + data.items.length) % data.items.length;
        renderItem(prevIndex);
    }

    function showNextItem() {
        const data = DISCIPLINE_DATA[currentDiscipline];
        if (!data || !data.items) return;
        const nextIndex = (currentIndex + 1) % data.items.length;
        renderItem(nextIndex);
    }

    /* Expose globally for inline buttons or triggers */
    window.openDisciplineShowcase = openModal;

    /* Initialize when DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShowcase);
    } else {
        initShowcase();
    }
})();
