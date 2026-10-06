/**
 * Image Registry — Prasanna Devi Portfolio Assets Architecture
 * Scalable data structure for asset management, categorization, and metadata.
 */

export const imageRegistry = {
    model: {
        hero: [
            {
                id: "model_hero",
                title: "Hero Portrait",
                category: "Model",
                subcategory: "Hero",
                path: "assets/model/hero.jpg",
                pathWebp: "assets/model/hero.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["Hero", "OG Image", "Twitter Card"],
                priority: 5,
                tags: ["hero", "portrait", "featured"]
            }
        ],
        editorial: [
            {
                id: "model_editorial_01",
                title: "Emerald & Gold Sequin Gown",
                category: "Model",
                subcategory: "Editorial",
                path: "assets/model/editorial/model-editorial-01.webp",
                orientation: "landscape",
                featured: true,
                usedIn: ["Gallery", "Comp Card"],
                priority: 5,
                tags: ["editorial", "emerald-necklace", "gold-gown", "high-fashion"]
            },
            {
                id: "model_editorial_02",
                title: "Editorial Look II",
                category: "Model",
                subcategory: "Editorial",
                path: "assets/model/editorial/editorial-02.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["About", "Gallery"],
                priority: 5,
                tags: ["editorial", "portrait", "fashion"]
            },
            {
                id: "model_editorial_03",
                title: "Editorial Look III",
                category: "Model",
                subcategory: "Editorial",
                path: "assets/model/editorial/editorial-03.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Video Cards"],
                priority: 4,
                tags: ["editorial", "creative", "direction"]
            },
            {
                id: "model_editorial_04",
                title: "Editorial Look IV",
                category: "Model",
                subcategory: "Editorial",
                path: "assets/model/editorial/editorial-04.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["editorial", "concept", "fashion"]
            },
            {
                id: "model_editorial_05",
                title: "Editorial Look V",
                category: "Model",
                subcategory: "Editorial",
                path: "assets/model/editorial/editorial-05.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Instagram"],
                priority: 5,
                tags: ["editorial", "glamour", "portrait"]
            },
            {
                id: "model_editorial_06",
                title: "Editorial Look VI",
                category: "Model",
                subcategory: "Editorial",
                path: "assets/model/editorial/editorial-06.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Instagram"],
                priority: 4,
                tags: ["editorial", "couture", "portrait"]
            },
            {
                id: "model_editorial_07",
                title: "Editorial Look VII",
                category: "Model",
                subcategory: "Editorial",
                path: "assets/model/editorial/editorial-07.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["editorial", "styling", "creative"]
            }
        ],
        fashion: [
            {
                id: "model_fashion_01",
                title: "Fashion Look I",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/fashion-01.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Campaigns"],
                priority: 5,
                tags: ["fashion", "styling", "glamour"]
            },
            {
                id: "model_fashion_02",
                title: "Fashion Look II",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/fashion-02.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Video Cards"],
                priority: 5,
                tags: ["fashion", "concept", "shoot"]
            },
            {
                id: "model_fashion_03",
                title: "Fashion Look III",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/fashion-03.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Video Cards"],
                priority: 4,
                tags: ["fashion", "styling", "session"]
            },
            {
                id: "model_fashion_04",
                title: "Fashion Look IV",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/fashion-04.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Video Cards"],
                priority: 4,
                tags: ["fashion", "production", "set"]
            },
            {
                id: "model_fashion_05",
                title: "Fashion Look V",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/fashion-05.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Instagram"],
                priority: 4,
                tags: ["fashion", "urban", "streetwear"]
            },
            {
                id: "model_fashion_06",
                title: "Fashion Look VI",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/fashion-06.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Comp Card"],
                priority: 4,
                tags: ["fashion", "couture", "creative"]
            },
            {
                id: "model_fashion_07",
                title: "Fashion Look VII",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/fashion-07.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 3,
                tags: ["fashion", "editorial", "pose"]
            },
            {
                id: "model_fashion_08",
                title: "Fashion Look VIII",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/fashion-08.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 3,
                tags: ["fashion", "full-body", "styling"]
            }
        ],
        commercial: [
            {
                id: "model_commercial_01",
                title: "Malabar Gold & Diamonds Campaign",
                category: "Model",
                subcategory: "Commercial",
                path: "assets/model/Commercial/Malabar gold and diamonds promotion.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Campaigns"],
                priority: 5,
                tags: ["commercial", "campaign", "malabar", "jewellery"]
            },
            {
                id: "model_commercial_02",
                title: "Malabar Gold Grand Stairs",
                category: "Model",
                subcategory: "Commercial",
                path: "assets/model/Commercial/Malabar gold and diamonds promotion Stairs.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Video Cards"],
                priority: 5,
                tags: ["commercial", "stairs", "palace", "luxury"]
            },
            {
                id: "model_commercial_03",
                title: "Nimali — House of Naidu Hall",
                category: "Model",
                subcategory: "Commercial",
                path: "assets/model/Commercial/Nimali- house of naidu hall promotion.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Instagram"],
                priority: 5,
                tags: ["commercial", "nimali", "couture", "retail"]
            },
            {
                id: "model_commercial_04",
                title: "Annachy App Campaign",
                category: "Model",
                subcategory: "Commercial",
                path: "assets/model/Commercial/annachy app - by super saravana stores promotion.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["commercial", "annachy", "app", "super-saravana"]
            },
            {
                id: "model_commercial_05",
                title: "Festive Market Brand Story",
                category: "Model",
                subcategory: "Commercial",
                path: "assets/model/Commercial/Maroon Saree at the Festive Market.png",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["commercial", "festive", "saree", "culture"]
            }
        ],
        runway: [
            {
                id: "model_runway_01",
                title: "Runway Walk I",
                category: "Model",
                subcategory: "Runway",
                path: "assets/model/Runway/runway-01.png",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Video Cards"],
                priority: 5,
                tags: ["runway", "fashion-show", "couture"]
            },
            {
                id: "model_runway_02",
                title: "Runway Walk II",
                category: "Model",
                subcategory: "Runway",
                path: "assets/model/Runway/runway-02.png",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Instagram"],
                priority: 5,
                tags: ["runway", "fashion-week", "walk"]
            },
            {
                id: "model_runway_03",
                title: "Runway Walk III",
                category: "Model",
                subcategory: "Runway",
                path: "assets/model/Runway/runway-03.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["runway", "backstage", "event"]
            }
        ],
        jwellery: [
            {
                id: "model_jewellery_01",
                title: "Jewellery Campaign I",
                category: "Model",
                subcategory: "Jewellery",
                path: "assets/model/jwellery/jewellery-01.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Model Card", "Gallery"],
                priority: 5,
                tags: ["jewellery", "gold", "traditional", "heritage"]
            },
            {
                id: "model_jewellery_02",
                title: "Jewellery Campaign II",
                category: "Model",
                subcategory: "Jewellery",
                path: "assets/model/jwellery/jewellery-02.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Campaigns"],
                priority: 5,
                tags: ["jewellery", "necklace", "campaign", "regal"]
            },
            {
                id: "model_jewellery_03",
                title: "Jewellery Campaign III",
                category: "Model",
                subcategory: "Jewellery",
                path: "assets/model/jwellery/jewellery-03.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Instagram"],
                priority: 5,
                tags: ["jewellery", "bridal", "traditional"]
            },
            {
                id: "model_jewellery_04",
                title: "Jewellery Campaign IV",
                category: "Model",
                subcategory: "Jewellery",
                path: "assets/model/jwellery/jewellery-04.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Comp Card"],
                priority: 5,
                tags: ["jewellery", "portrait", "closeup"]
            },
            {
                id: "model_jewellery_05",
                title: "Jewellery Campaign V",
                category: "Model",
                subcategory: "Jewellery",
                path: "assets/model/jwellery/jewellery-05.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Comp Card"],
                priority: 4,
                tags: ["jewellery", "detail", "bracelet"]
            },
            {
                id: "model_jewellery_06",
                title: "Jewellery Campaign VI",
                category: "Model",
                subcategory: "Jewellery",
                path: "assets/model/jwellery/jewellery-06.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["jewellery", "necklace", "set"]
            },
            {
                id: "model_jewellery_07",
                title: "Jewellery Campaign VII",
                category: "Model",
                subcategory: "Jewellery",
                path: "assets/model/jwellery/jewellery-07.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["jewellery", "traditional", "ornament"]
            },
            {
                id: "model_jewellery_08",
                title: "Jewellery Campaign VIII",
                category: "Model",
                subcategory: "Jewellery",
                path: "assets/model/jwellery/jewellery-08.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 3,
                tags: ["jewellery", "ring", "detail"]
            },
            {
                id: "model_jewellery_09",
                title: "Jewellery Campaign IX",
                category: "Model",
                subcategory: "Jewellery",
                path: "assets/model/jwellery/jewellery-09.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 3,
                tags: ["jewellery", "bangle", "gold"]
            }
        ],
        marquee: [
            {
                id: "marquee_malabar",
                title: "Malabar Gold & Diamonds",
                category: "Brand",
                subcategory: "Marquee",
                path: "assets/model/marquee/malabar.png"
            },
            {
                id: "marquee_bellavita",
                title: "Bella Vita Luxury",
                category: "Brand",
                subcategory: "Marquee",
                path: "assets/model/marquee/bellavita.png"
            },
            {
                id: "marquee_z",
                title: "ZCULT",
                category: "Brand",
                subcategory: "Marquee",
                path: "assets/model/marquee/z.png"
            },
            {
                id: "marquee_m",
                title: "MBJ Venkateswara Jewellers",
                category: "Brand",
                subcategory: "Marquee",
                path: "assets/model/marquee/m.png"
            },
            {
                id: "marquee_n",
                title: "Brand Partner N",
                category: "Brand",
                subcategory: "Marquee",
                path: "assets/model/marquee/n.png"
            },
            {
                id: "marquee_a",
                title: "Brand Partner A",
                category: "Brand",
                subcategory: "Marquee",
                path: "assets/model/marquee/a.png"
            }
        ]
    },
    common: {
        icons: [
            {
                id: "common_icon_nataraja_sm",
                title: "Nataraja Bronze Statue Small",
                path: "assets/common/icons/common-icon-nataraja-sm.jpg"
            },
            {
                id: "common_icon_nataraja_lg",
                title: "Nataraja Bronze Statue Transparent PNG",
                path: "assets/common/icons/common-icon-nataraja-lg.png"
            }
        ],
        backgrounds: [
            {
                id: "common_bg_temple_doors",
                title: "Ancient Temple Doors Opening",
                path: "assets/common/backgrounds/common-bg-temple-doors.jpg"
            }
        ],
        reference: [
            {
                id: "common_ref_jewellery_hand",
                title: "Jewellery Hand Reference",
                path: "assets/common/reference/reference-jewellery-hand.jpeg"
            },
            {
                id: "common_ref_jewellery_shoot",
                title: "Jewellery Shoot Reference",
                path: "assets/common/reference/reference-jewellery-shoot.jpeg"
            }
        ]
    }
};

// Global window attachment for non-module HTML scripts
if (typeof window !== 'undefined') {
    window.imageRegistry = imageRegistry;
}
