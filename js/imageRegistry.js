/**
 * Image Registry — Prasanna Devi Portfolio Assets Architecture
 * Scalable data structure for asset management, categorization, and metadata.
 */

export const imageRegistry = {
    model: {
        studio: [
            {
                id: "model_studio_01",
                title: "Dark Glamour Editorial",
                category: "Model",
                subcategory: "Studio",
                path: "assets/model/studio/model-studio-01.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["Hero", "Gallery", "Milestones"],
                priority: 5,
                tags: ["studio", "black-dress", "gold-glitter", "editorial"]
            },
            {
                id: "model_studio_02",
                title: "Clean Studio Headshot",
                category: "Model",
                subcategory: "Studio",
                path: "assets/model/studio/model-studio-02.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gateway", "Hero", "Milestones"],
                priority: 5,
                tags: ["studio", "white-top", "direct-gaze", "clean"]
            },
            {
                id: "model_studio_03",
                title: "Casual Full Body Pose",
                category: "Model",
                subcategory: "Studio",
                path: "assets/model/studio/model-studio-03.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Video Cards"],
                priority: 4,
                tags: ["studio", "casual", "full-body", "khaki-pants"]
            },
            {
                id: "model_studio_04",
                title: "Expressive Crop Top Shoot",
                category: "Model",
                subcategory: "Studio",
                path: "assets/model/studio/model-studio-04.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Milestones"],
                priority: 4,
                tags: ["studio", "expressive", "crop-top", "moody"]
            },
            {
                id: "model_studio_05",
                title: "Red Chair Studio Pose I",
                category: "Model",
                subcategory: "Studio",
                path: "assets/model/studio/model-studio-05.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery", "Video Cards", "Instagram"],
                priority: 4,
                tags: ["studio", "red-chair", "seated", "fashion"]
            },
            {
                id: "model_studio_06",
                title: "Red Chair Studio Pose II",
                category: "Model",
                subcategory: "Studio",
                path: "assets/model/studio/model-studio-06.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Video Cards", "Instagram"],
                priority: 4,
                tags: ["studio", "red-chair", "seated", "watch"]
            },
            {
                id: "model_studio_07",
                title: "Red Chair Confident Pose",
                category: "Model",
                subcategory: "Studio",
                path: "assets/model/studio/model-studio-07.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Video Cards", "Instagram"],
                priority: 4,
                tags: ["studio", "red-chair", "seated", "confident"]
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
                usedIn: ["Gallery", "Bharatanatyam BG"],
                priority: 5,
                tags: ["editorial", "emerald-necklace", "gold-gown", "high-fashion"]
            }
        ],
        fashion: [
            {
                id: "model_fashion_01",
                title: "Sequin Gown Studio Concept",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/model-fashion-01.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Milestones"],
                priority: 5,
                tags: ["fashion", "sequin-gown", "macrame", "glamour"]
            },
            {
                id: "model_fashion_02",
                title: "Red & Dark Couture Walk",
                category: "Model",
                subcategory: "Fashion",
                path: "assets/model/fashion/model-fashion-02.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 3,
                tags: ["fashion", "red-gown", "dramatic", "couture"]
            }
        ],
        portraits: [
            {
                id: "model_portrait_01",
                title: "Soft Natural Studio Portrait",
                category: "Model",
                subcategory: "Portraits",
                path: "assets/model/portraits/model-portrait-01.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["About"],
                priority: 5,
                tags: ["portrait", "soft-smile", "natural", "gold-belt"]
            },
            {
                id: "model_portrait_02",
                title: "Black Saree Temple Jhumka Closeup",
                category: "Model",
                subcategory: "Portraits",
                path: "assets/model/portraits/model-portrait-02.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Instagram"],
                priority: 4,
                tags: ["portrait", "black-saree", "jhumka", "traditional-closeup"]
            }
        ],
        traditional: [
            {
                id: "model_traditional_01",
                title: "Temple Statue Silk Saree",
                category: "Model",
                subcategory: "Traditional",
                path: "assets/model/traditional/model-traditional-01.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Campaign Cards"],
                priority: 5,
                tags: ["traditional", "silk-saree", "temple-statue", "heritage"]
            },
            {
                id: "model_traditional_02",
                title: "Regal Gold Jewellery Shoot",
                category: "Model",
                subcategory: "Traditional",
                path: "assets/model/traditional/model-traditional-02.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["Model Card", "Gallery", "Milestones", "Comp Card"],
                priority: 5,
                tags: ["traditional", "gold-jewellery", "maang-tikka", "regal"]
            },
            {
                id: "model_traditional_03",
                title: "Sunflower Hair Batik Saree",
                category: "Model",
                subcategory: "Traditional",
                path: "assets/model/traditional/model-traditional-03.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["traditional", "batik-saree", "sunflower", "outdoor-night"]
            },
            {
                id: "model_traditional_04",
                title: "Kanchipuram Silk Steps Shoot",
                category: "Model",
                subcategory: "Traditional",
                path: "assets/model/traditional/model-traditional-04.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery", "Instagram"],
                priority: 5,
                tags: ["traditional", "kanchipuram-saree", "temple-steps", "heavy-jewellery"]
            },
            {
                id: "model_traditional_05",
                title: "Waterfront Black Saree Portrait",
                category: "Model",
                subcategory: "Traditional",
                path: "assets/model/traditional/model-traditional-05.webp",
                orientation: "portrait",
                featured: false,
                usedIn: [],
                priority: 4,
                tags: ["traditional", "black-saree", "waterfront", "outdoor"]
            }
        ],
        outdoor: [
            {
                id: "model_outdoor_01",
                title: "Field Vest & Stool Editorial",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-01.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["outdoor", "field", "brown-vest", "stool"]
            },
            {
                id: "model_outdoor_02",
                title: "Field Vintage Camera Prop",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-02.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["outdoor", "field", "camera-prop", "vintage"]
            },
            {
                id: "model_outdoor_03",
                title: "Rooftop Railing Lean Streetwear",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-03.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["outdoor", "rooftop", "streetwear", "urban"]
            },
            {
                id: "model_outdoor_04",
                title: "Rooftop Red Blazer Overhead",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-04.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery"],
                priority: 5,
                tags: ["outdoor", "rooftop", "red-blazer", "urban-chic"]
            },
            {
                id: "model_outdoor_05",
                title: "Rooftop Blazer Standing Pose",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-05.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery"],
                priority: 5,
                tags: ["outdoor", "rooftop", "red-blazer", "urban"]
            },
            {
                id: "model_outdoor_06",
                title: "Rooftop Low Angle Crouching",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-06.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["outdoor", "rooftop", "crouch", "urban"]
            },
            {
                id: "model_outdoor_07",
                title: "Rooftop Ledge Cityscape",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-07.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery"],
                priority: 5,
                tags: ["outdoor", "rooftop", "cityscape", "skyline"]
            },
            {
                id: "model_outdoor_08",
                title: "Rooftop Kneeling Sky Frame",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-08.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["outdoor", "rooftop", "sky", "kneeling"]
            },
            {
                id: "model_outdoor_09",
                title: "Rooftop Blazer Shoulders Draped",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-09.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["outdoor", "rooftop", "fashion", "full-body"]
            },
            {
                id: "model_outdoor_10",
                title: "Rooftop Ledge Relaxed Seated",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-10.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery"],
                priority: 5,
                tags: ["outdoor", "rooftop", "seated", "cityscape"]
            },
            {
                id: "model_outdoor_11",
                title: "Concrete Ledge Contemplative Pose",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-11.jpeg",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 4,
                tags: ["outdoor", "rooftop", "contemplative", "sky"]
            },
            {
                id: "model_outdoor_12",
                title: "Rooftop Edge Wide Editorial",
                category: "Model",
                subcategory: "Outdoor",
                path: "assets/model/outdoor/model-outdoor-12.jpeg",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery"],
                priority: 5,
                tags: ["outdoor", "rooftop", "editorial", "wide"]
            }
        ],
        closeups: [
            {
                id: "model_closeup_01",
                title: "Beauty Bokeh Jewellery Closeup",
                category: "Model",
                subcategory: "Closeups",
                path: "assets/model/closeups/model-closeup-01.webp",
                orientation: "portrait",
                featured: true,
                usedIn: ["Gallery"],
                priority: 5,
                tags: ["closeup", "beauty", "bokeh", "necklace"]
            },
            {
                id: "model_closeup_02",
                title: "Diamond Bracelet Hand Closeup",
                category: "Model",
                subcategory: "Closeups",
                path: "assets/model/closeups/model-closeup-02.webp",
                orientation: "landscape",
                featured: false,
                usedIn: ["Campaign Cards"],
                priority: 3,
                tags: ["closeup", "bracelet", "jewellery", "detail"]
            }
        ],
        events: [
            {
                id: "model_event_01",
                title: "Runway Backstage Red Dress",
                category: "Model",
                subcategory: "Events",
                path: "assets/model/events/model-event-01.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 3,
                tags: ["event", "backstage", "runway", "red-gown"]
            },
            {
                id: "model_event_02",
                title: "Fashion Show Event Floor",
                category: "Model",
                subcategory: "Events",
                path: "assets/model/events/model-event-02.webp",
                orientation: "portrait",
                featured: false,
                usedIn: ["Gallery"],
                priority: 3,
                tags: ["event", "fashion-show", "runway", "crowd"]
            }
        ]
    },
    bharatanatyam: {
        performances: [],
        portraits: [],
        costumes: [],
        gallery: []
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
        ]
    }
};

// Global window attachment for non-module HTML scripts
if (typeof window !== 'undefined') {
    window.imageRegistry = imageRegistry;
}
