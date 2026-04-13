# Playground

A personal PWA launcher hosted on GitHub Pages.

## File structure

```
/
├── index.html              ← Dashboard
├── apps.json               ← Ordered list of subapp folder names
├── shell.css               ← Shared top-bar styles (auto-loaded by shell.js)
├── shell.js                ← Injects the back-to-dashboard bar
│
├── camera/
│   ├── index.html
│   ├── icon.png            ← App icon shown on the dashboard tile
│   └── app.json
│
├── notes/
│   ├── index.html
│   ├── icon.png
│   └── app.json
│
└── your-new-app/
    ├── index.html
    ├── icon.png            ← Recommended: 512×512 px, square, PNG or JPG or SVG
    └── app.json
```

## Adding a new subapp

### 1. Create the folder and its files

```
your-new-app/
├── index.html
├── icon.png      ← Square image, 512×512 px recommended
└── app.json
```

### 2. app.json

```json
{
  "name": "My App",
  "icon": "icon.png",
  "color": "#e76f51",
  "description": "One-line description shown on the tile"
}
```

- `icon` — filename of the icon image inside the same folder (PNG, JPG, or SVG).
  If the file is missing, the dashboard automatically falls back to the app's first letter.
- `color` — hex accent color used for the tile glow on the dashboard.
- `description` — optional subtitle shown below the app name on the tile.

### 3. Add the shell bar to index.html

```html
<!-- In <head> — bar pushes content down (standard apps) -->
<script src="../shell.js"></script>

<!-- For full-bleed apps where the bar floats over the content (e.g. camera) -->
<script src="../shell.js" data-float></script>
```

The bar reads `app.json` automatically for the title. Override it if needed:

```html
<script src="../shell.js" data-title="Custom Title"></script>
```

### 4. Register the folder in apps.json

```json
["camera", "notes", "your-new-app"]
```

Tiles appear in this order on the dashboard.

## Icon guidelines

| Property | Recommendation |
|---|---|
| Size | 512 × 512 px |
| Format | PNG (transparency supported), JPG, or SVG |
| Shape | Square — the dashboard clips it to a rounded rectangle automatically |
| Filename | Anything; reference it in `app.json` → `"icon"` |

If `icon` is omitted from `app.json` or the image fails to load, the dashboard shows the app's first letter as a fallback.
