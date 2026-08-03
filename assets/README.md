# Asset Directory & Architecture Guidelines

Welcome to the organized asset architecture for **Prasanna Devi Portfolio**.

---

## Folder Structure

```
assets/
├── model/
│   ├── studio/          # Gray backdrop studio shoots (model-studio-01 .. 07)
│   ├── editorial/       # Concept & creative editorial gown shoots (model-editorial-01)
│   ├── fashion/         # Runway gowns, couture, red carpet looks (model-fashion-01 .. 02)
│   ├── portraits/       # Soft natural headshots & portrait closeups (model-portrait-01 .. 02)
│   ├── traditional/     # Kanchipuram silk saree, temple heritage shoots (model-traditional-01 .. 05)
│   ├── outdoor/         # Field shoots, rooftop urban streetwear (model-outdoor-01 .. 12)
│   ├── closeups/        # Product detail, jewellery closeups (model-closeup-01 .. 02)
│   ├── events/          # Runway shows, backstage fashion walks (model-event-01 .. 02)
│   └── gallery/         # Auto-rendered gallery items
├── bharatanatyam/
│   ├── performances/    # Stage & mudra performance photography
│   ├── portraits/       # Classical costume portraiture
│   ├── costumes/        # Temple jewelry & costume details
│   └── gallery/         # Dance gallery items
├── common/
│   ├── icons/           # Brand icons (Nataraja bronze statue PNG/JPG)
│   ├── backgrounds/     # Background textures (Temple doors background)
│   ├── reference/       # Campaign reference images
│   └── logos/           # Vector & image branding
├── hero/                # Hero banner imagery
├── originals/           # Raw DSLR (JPEG) & HEIC source files
└── video/               # Behind-the-scenes video footage (MP4)
```

---

## Naming Convention

All web-served image files follow strict kebab-case naming:

`{category}-{subcategory}-{index}.{ext}`

### Examples:
- `model-studio-01.webp`
- `model-traditional-02.webp`
- `model-outdoor-05.jpeg`
- `common-icon-nataraja-lg.png`

---

## Image Registry Integration

Images are never hardcoded inside components. All image metadata is stored in `js/imageRegistry.js`:

```javascript
import { imageRegistry } from './imageRegistry.js';

// Access studio images
const studioPhotos = imageRegistry.model.studio;
```

---

## How to Add New Assets

1. Save the web-optimized file into the appropriate category folder (e.g. `assets/model/studio/model-studio-08.webp`).
2. Add an entry to `js/imageRegistry.js` with metadata (title, category, tags, priority).
3. The gallery will automatically include the new image — no component changes required!
