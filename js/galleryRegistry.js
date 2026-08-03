/**
 * Gallery Registry Component
 * Dynamically populates and filters gallery components directly from imageRegistry.
 */

(function() {
    'use strict';

    class GalleryRegistryComponent {
        constructor(options = {}) {
            this.containerId = options.containerId || 'portfolio-grid';
            this.registryKey = options.registryKey || 'model';
            this.container = document.getElementById(this.containerId);
            this.filterContainer = document.querySelector(options.filterSelector || '.portfolio__filters');
            this.init();
        }

        init() {
            if (!this.container || typeof window.imageRegistry === 'undefined') return;

            // Optional auto-render from registry
            if (this.container.getAttribute('data-auto-render') === 'true') {
                this.renderFromRegistry('all');
            }

            this.bindEvents();
        }

        getAllItems() {
            const registry = window.imageRegistry[this.registryKey];
            if (!registry) return [];

            let items = [];
            Object.keys(registry).forEach(subcat => {
                if (Array.isArray(registry[subcat])) {
                    items = items.concat(registry[subcat]);
                }
            });
            return items.sort((a, b) => b.priority - a.priority);
        }

        getItemsByCategory(category) {
            const allItems = this.getAllItems();
            if (category === 'all') return allItems;
            return allItems.filter(item => 
                item.subcategory.toLowerCase() === category.toLowerCase() ||
                (item.tags && item.tags.includes(category.toLowerCase()))
            );
        }

        renderFromRegistry(filterCategory = 'all') {
            const items = this.getItemsByCategory(filterCategory);
            this.container.innerHTML = '';

            items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'portfolio__item';
                itemEl.setAttribute('data-category', item.subcategory.toLowerCase());
                itemEl.innerHTML = `
                    <a href="${item.path}" class="portfolio__item-inner glightbox" data-gallery="portfolio" data-description="${item.category} — ${item.title}">
                        <img src="${item.path}" alt="${item.title}" class="portfolio__item-img img-lazy" loading="lazy" decoding="async">
                        <div class="portfolio__item-overlay">
                            <span class="portfolio__item-category">${item.subcategory}</span>
                            <h3 class="portfolio__item-title">${item.title}</h3>
                        </div>
                    </a>
                `;
                this.container.appendChild(itemEl);
            });

            // Re-init lightbox if available
            if (typeof GLightbox !== 'undefined') {
                GLightbox({ selector: '.portfolio__item .glightbox' });
            }
        }

        bindEvents() {
            if (!this.filterContainer) return;
            const filters = this.filterContainer.querySelectorAll('[data-filter]');

            filters.forEach(filter => {
                filter.addEventListener('click', () => {
                    const category = filter.getAttribute('data-filter');
                    
                    filters.forEach(f => {
                        f.classList.remove('portfolio__filter--active');
                        f.setAttribute('aria-selected', 'false');
                    });
                    filter.classList.add('portfolio__filter--active');
                    filter.setAttribute('aria-selected', 'true');

                    if (this.container.getAttribute('data-auto-render') === 'true') {
                        this.renderFromRegistry(category);
                    }
                });
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.galleryRegistry = new GalleryRegistryComponent();
    });

})();
