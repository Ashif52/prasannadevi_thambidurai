/* ============================================
   SOUTH INDIA SHOOT MAP — High-Fidelity 3D Vector Map
   Accurate Mercator projection with 3D relief depth
   True administrative boundaries for TN, KL, KA, AP, TS, PY
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       MAP CONFIGURATION & BOUNDS
       ============================================ */
    const MAP_CONFIG = {
        // True geographic bounds of South India
        bounds: {
            minLat: 7.8,
            maxLat: 20.0,
            minLng: 73.8,
            maxLng: 85.0
        },
        viewBox: { width: 620, height: 720 },
        padding: 30,

        // Data files
        geoDataUrl: 'data/south-india.json',
        shootsDataUrl: 'data/shoots.json',

        // Accurate centroids for state typography labels
        stateLabels: {
            'Karnataka': { lat: 14.7, lng: 75.8, label: 'KARNATAKA' },
            'Kerala': { lat: 10.3, lng: 76.4, label: 'KERALA' },
            'Tamil Nadu': { lat: 11.2, lng: 78.4, label: 'TAMIL NADU' },
            'Telangana': { lat: 17.8, lng: 79.1, label: 'TELANGANA' },
            'Andhra Pradesh': { lat: 15.6, lng: 79.8, label: 'ANDHRA PRADESH' },
            'Puducherry': { lat: 11.93, lng: 79.83, label: 'PUDUCHERRY' }
        }
    };

    /* ============================================
       TRUE WEB MERCATOR PROJECTION
       Converts Latitude / Longitude to SVG coordinate space
       ============================================ */
    function mercatorY(lat) {
        const rad = lat * Math.PI / 180;
        return Math.log(Math.tan(Math.PI / 4 + rad / 2));
    }

    const yMin = mercatorY(MAP_CONFIG.bounds.minLat);
    const yMax = mercatorY(MAP_CONFIG.bounds.maxLat);

    function project(lat, lng) {
        const { bounds, viewBox, padding } = MAP_CONFIG;
        const drawW = viewBox.width - 2 * padding;
        const drawH = viewBox.height - 2 * padding;

        const x = padding + ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * drawW;
        const y = padding + ((yMax - mercatorY(lat)) / (yMax - yMin)) * drawH;

        return {
            x: Number(x.toFixed(1)),
            y: Number(y.toFixed(1))
        };
    }

    /* ============================================
       SVG HELPER
       ============================================ */
    function svgEl(tag, attrs) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        if (attrs) {
            Object.entries(attrs).forEach(([key, val]) => {
                el.setAttribute(key, val);
            });
        }
        return el;
    }

    /* ============================================
       CONVERT GEOJSON POLYGONS TO SVG PATH 'd'
       ============================================ */
    function geoJsonToSvgPath(geometry) {
        const multi = geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates];
        let pathD = '';

        multi.forEach(polygon => {
            polygon.forEach(ring => {
                ring.forEach(([lng, lat], i) => {
                    const { x, y } = project(lat, lng);
                    pathD += (i === 0 ? `M${x},${y}` : `L${x},${y}`);
                });
                pathD += 'Z ';
            });
        });

        return pathD.trim();
    }

    /* ============================================
       CREATE SVG DEFINITIONS (Gradients & 3D Shadow)
       ============================================ */
    function createDefs(svg) {
        const defs = svgEl('defs');

        // 1. Soft 3D drop shadow filter
        const filter = svgEl('filter', {
            id: 'map-depth-shadow',
            x: '-20%',
            y: '-20%',
            width: '160%',
            height: '160%'
        });

        const feDropShadow = svgEl('feDropShadow', {
            dx: '10',
            dy: '22',
            stdDeviation: '18',
            'flood-color': '#000000',
            'flood-opacity': '0.75'
        });
        filter.appendChild(feDropShadow);
        defs.appendChild(filter);

        // 2. Extruded Bevel Shadow
        const bevelFilter = svgEl('filter', {
            id: 'map-bevel-shadow',
            x: '-10%',
            y: '-10%',
            width: '140%',
            height: '140%'
        });
        const feBevel = svgEl('feDropShadow', {
            dx: '4',
            dy: '8',
            stdDeviation: '6',
            'flood-color': '#000000',
            'flood-opacity': '0.6'
        });
        bevelFilter.appendChild(feBevel);
        defs.appendChild(bevelFilter);

        // 3. Land Surface Subtle Gradient
        const surfaceGrad = svgEl('linearGradient', {
            id: 'map-surface-grad',
            x1: '0%',
            y1: '0%',
            x2: '100%',
            y2: '100%'
        });
        const stop1 = svgEl('stop', { offset: '0%', 'stop-color': '#211c18' });
        const stop2 = svgEl('stop', { offset: '100%', 'stop-color': '#161311' });
        surfaceGrad.appendChild(stop1);
        surfaceGrad.appendChild(stop2);
        defs.appendChild(surfaceGrad);

        // 4. Extrusion Base Color Gradient (3D Edge)
        const baseGrad = svgEl('linearGradient', {
            id: 'map-base-grad',
            x1: '0%',
            y1: '0%',
            x2: '100%',
            y2: '100%'
        });
        const bStop1 = svgEl('stop', { offset: '0%', 'stop-color': '#110d0b' });
        const bStop2 = svgEl('stop', { offset: '100%', 'stop-color': '#090706' });
        baseGrad.appendChild(bStop1);
        baseGrad.appendChild(bStop2);
        defs.appendChild(baseGrad);

        svg.appendChild(defs);
    }

    /* ============================================
       RENDER ACCURATE 3D MAP & STATE BOUNDARIES
       ============================================ */
    function renderStateBoundaries(svg, geoData) {
        // Collect combined path for 3D extrusion slab underneath
        let combinedD = '';
        geoData.features.forEach(f => {
            combinedD += ' ' + geoJsonToSvgPath(f.geometry);
        });

        // 1. LAYER 1: Deep 3D Drop Shadow & Extrusion Base
        const depthGroup = svgEl('g', {
            class: 'shoot-map__depth-layer',
            filter: 'url(#map-depth-shadow)'
        });

        // Multiple stepped extrusion outlines for smooth physical 3D thickness (like reference image)
        const extrusions = [
            { dx: 12, dy: 24, opacity: 0.9 },
            { dx: 9,  dy: 18, opacity: 0.95 },
            { dx: 6,  dy: 12, opacity: 1 },
            { dx: 3,  dy: 6,  opacity: 1 }
        ];

        extrusions.forEach(({ dx, dy, opacity }) => {
            const edgePath = svgEl('path', {
                d: combinedD,
                transform: `translate(${dx}, ${dy})`,
                fill: 'url(#map-base-grad)',
                stroke: '#0e0b09',
                'stroke-width': '1.5',
                opacity: opacity
            });
            depthGroup.appendChild(edgePath);
        });

        svg.appendChild(depthGroup);

        // 2. LAYER 2: Front Top Surface (Individual States with interactive highlight)
        const statesGroup = svgEl('g', { class: 'shoot-map__states' });

        geoData.features.forEach(feature => {
            const pathD = geoJsonToSvgPath(feature.geometry);
            const stateName = feature.properties.name;

            const path = svgEl('path', {
                d: pathD,
                class: 'shoot-map__state',
                'data-state': stateName,
                'aria-label': stateName,
                role: 'region'
            });

            // State mouse interactions
            path.addEventListener('mouseenter', () => {
                const label = svg.querySelector(`.shoot-map__state-label[data-state="${stateName}"]`);
                if (label) label.classList.add('is-active');
            });

            path.addEventListener('mouseleave', () => {
                const label = svg.querySelector(`.shoot-map__state-label[data-state="${stateName}"]`);
                if (label) label.classList.remove('is-active');
            });

            statesGroup.appendChild(path);
        });

        svg.appendChild(statesGroup);

        // 3. LAYER 3: Elegant State Labels
        const labelsGroup = svgEl('g', { class: 'shoot-map__labels' });

        Object.entries(MAP_CONFIG.stateLabels).forEach(([name, cfg]) => {
            const { x, y } = project(cfg.lat, cfg.lng);
            const text = svgEl('text', {
                x: x,
                y: y,
                class: 'shoot-map__state-label',
                'data-state': name
            });
            text.textContent = cfg.label;
            labelsGroup.appendChild(text);
        });

        svg.appendChild(labelsGroup);
    }

    /* ============================================
       RENDER SHOOT MARKERS (Pulsing Gold Dots)
       ============================================ */
    function renderShootMarkers(svg, shoots, onMarkerClick) {
        const markersGroup = svgEl('g', { class: 'shoot-map__markers' });

        shoots.forEach(shoot => {
            if (!shoot.active) return;

            const { x, y } = project(shoot.latitude, shoot.longitude);

            // Container group
            const marker = svgEl('g', {
                class: 'shoot-marker',
                'data-shoot-id': shoot.id,
                tabindex: '0',
                role: 'button',
                'aria-label': `${shoot.title} — ${shoot.city}, ${shoot.state}`
            });

            // 1. Ambient Glow
            const glow = svgEl('circle', {
                cx: x, cy: y, r: 8,
                class: 'shoot-marker__glow'
            });

            // 2. Pulse Ring 1
            const pulse1 = svgEl('circle', {
                cx: x, cy: y, r: 4,
                class: 'shoot-marker__pulse'
            });

            // 3. Pulse Ring 2 (delayed)
            const pulse2 = svgEl('circle', {
                cx: x, cy: y, r: 4,
                class: 'shoot-marker__pulse shoot-marker__pulse--delayed'
            });

            // 4. Luminous Core Dot
            const core = svgEl('circle', {
                cx: x, cy: y, r: 4,
                class: 'shoot-marker__core'
            });

            // 5. Large Invisible Hit Area (50px diameter) for effortless click/touch
            const hitArea = svgEl('circle', {
                cx: x, cy: y, r: 25,
                fill: 'transparent',
                class: 'shoot-marker__hit-area'
            });

            // 6. Floating Tooltip Tag
            const tooltipGroup = svgEl('g', {
                class: 'shoot-marker__tooltip',
                transform: `translate(${x}, ${y - 14})`
            });

            const tipText = svgEl('text', {
                x: 0,
                y: 0,
                class: 'shoot-marker__tooltip-text'
            });
            tipText.textContent = shoot.city;
            tooltipGroup.appendChild(tipText);

            // Assemble
            marker.appendChild(glow);
            marker.appendChild(pulse1);
            marker.appendChild(pulse2);
            marker.appendChild(core);
            marker.appendChild(hitArea);
            marker.appendChild(tooltipGroup);

            // Click Handler
            const triggerClick = (e) => {
                if (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                console.log('[ShootMap] Selected shoot:', shoot);
                onMarkerClick(shoot);
            };

            marker.addEventListener('click', triggerClick);
            hitArea.addEventListener('click', triggerClick);
            core.addEventListener('click', triggerClick);

            marker.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    triggerClick(e);
                }
            });

            markersGroup.appendChild(marker);
        });

        svg.appendChild(markersGroup);
    }

    /* ============================================
       FETCH DATA
       ============================================ */
    async function fetchJSON(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.status}`);
        }
        return response.json();
    }

    /* ============================================
       GET ACTIVE SHOOTS (Server API + localStorage + shoots.json)
       ============================================ */
    async function getActiveShoots() {
        let shoots = [];

        // 1. Try server API
        try {
            const res = await fetch('/api/shoots?active=true');
            if (res.ok) {
                const apiShoots = await res.json();
                if (Array.isArray(apiShoots) && apiShoots.length > 0) {
                    return apiShoots.filter(s => s.active);
                }
            }
        } catch (e) {
            // Server not reachable
        }

        // 2. Check localStorage (admin-managed data)
        const localData = localStorage.getItem('prasannadevi_shoots');
        if (localData) {
            try {
                shoots = JSON.parse(localData);
            } catch (e) {
                shoots = [];
            }
        }

        // 3. Fallback to shoots.json
        if (shoots.length === 0) {
            try {
                shoots = await fetchJSON(MAP_CONFIG.shootsDataUrl);
            } catch (e) {
                shoots = [];
            }
        }

        return shoots.filter(s => s.active);
    }

    /* ============================================
       INITIALIZE MAP
       ============================================ */
    async function initShootMap() {
        const mapSection = document.getElementById('shoot-map');
        if (!mapSection) return;

        const canvasContainer = mapSection.querySelector('.shoot-map__canvas');
        if (!canvasContainer) return;

        // Show loading spinner
        canvasContainer.innerHTML = `
            <div class="shoot-map__loading">
                <div class="shoot-map__loading-spinner"></div>
                <span class="shoot-map__loading-text">Loading map…</span>
            </div>
        `;

        try {
            const [geoData, activeShoots] = await Promise.all([
                fetchJSON(MAP_CONFIG.geoDataUrl),
                getActiveShoots()
            ]);

            // Clear container
            canvasContainer.innerHTML = '';

            // Create SVG
            const svg = svgEl('svg', {
                class: 'shoot-map__svg',
                viewBox: `0 0 ${MAP_CONFIG.viewBox.width} ${MAP_CONFIG.viewBox.height}`,
                'aria-label': 'Interactive South India Photoshoot Locations Map',
                role: 'img'
            });

            // Create gradients & 3D filters
            createDefs(svg);

            // Render 3D base + state boundaries
            renderStateBoundaries(svg, geoData);

            // Render shoot markers
            if (activeShoots.length > 0) {
                renderShootMarkers(svg, activeShoots, openShootModal);
            }

            canvasContainer.appendChild(svg);

            // Legend display
            const legend = mapSection.querySelector('.shoot-map__legend');
            if (legend) {
                legend.style.display = activeShoots.length > 0 ? 'flex' : 'none';
            }

            // GSAP entrance reveal if available
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(svg.querySelectorAll('.shoot-map__state'),
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: 'power3.out' }
                );

                gsap.fromTo(svg.querySelectorAll('.shoot-marker'),
                    { opacity: 0, scale: 0 },
                    { opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, delay: 0.6, ease: 'back.out(2)' }
                );

                gsap.fromTo(svg.querySelectorAll('.shoot-map__state-label'),
                    { opacity: 0 },
                    { opacity: 1, duration: 1, delay: 0.8, stagger: 0.06 }
                );
            }

        } catch (error) {
            console.error('Shoot map initialization failed:', error);
            canvasContainer.innerHTML = `
                <div class="shoot-map__error">
                    <span class="shoot-map__error-text">Unable to load shoot locations. Please refresh.</span>
                </div>
            `;
        }
    }

    /* ============================================
       MODAL DELEGATE
       ============================================ */
    function openShootModal(shoot) {
        if (window.ShootModal && typeof window.ShootModal.open === 'function') {
            window.ShootModal.open(shoot);
        } else {
            console.warn('ShootModal not loaded');
        }
    }

    /* ============================================
       BOOT
       ============================================ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShootMap);
    } else {
        initShootMap();
    }

    window.ShootMap = { init: initShootMap };

})();
