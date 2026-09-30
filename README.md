# LBS Alumni Personal Introduction

A browser-only React app for members of the **Lagos Business School Alumni Association (LBSAA)**. Members enter their details and upload a portrait, and the app designs a 1600 × 900 introduction banner that they can download as a PNG or share.

**Connect | Support | Grow**: *Once a LBS, Always a LBS*

## Features

- **Landing page** with a live sample banner and a switcher for the three styles.
- **Generator** with the form on one side and a live preview on the other. The form has sections for personal information, LBS journey, contact, photo and customization.
- **Three templates** (Executive, Modern, Minimal), all built from HTML/CSS/SVG so text stays sharp.
- **Automatic layout.** Long names shrink to fit. Job titles split on `|` into two lines. Long emails and URLs get a full row. If a text block is too tall for its slot, it scales down evenly so nothing overlaps.
- **Photo handling.** Accepts JPG, PNG or WEBP up to 3 MB. The photo is downscaled in the browser, fitted with `object-fit: cover`, and has a vertical framing slider.
- **Generation sequence** that renders the PNG ahead of time, so Download and Share respond immediately.
- **Export** of exactly 1600 × 900 PNG using `html-to-image`. It captures a hidden full-size copy of the banner, so no UI is included.
- **Share** through the Web Share API with the PNG attached. If the browser can't share, the app copies a share message and offers a download.
- **Copy Profile** copies the profile as plain text.
- **Validation** shows friendly messages inline. Generate stays blocked until the required fields and the photo are in.
- **Persistence.** Form fields are saved in `localStorage` and the photo in `sessionStorage`. Nothing is sent to a server.
- **Responsive and accessible.** Tested from 320 px to 1920 px with no page overflow. Includes labelled fields, keyboard support, focus states and ARIA.

## LBSAA logo

The official LBSAA emblem, with the wordmark cropped off, is stored as two transparent PNGs:

- `public/brand/lbsaa-emblem-navy.png` for light backgrounds
- `public/brand/lbsaa-emblem-white.png` for navy backgrounds

Every screen and the exported PNG load them through `LOGO_SRC` in `src/config/brand.ts`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

It uses hash routing (`#/`, `#/create`), so the `dist/` folder works on any static host (Netlify, Vercel, GitHub Pages, S3) without extra setup.

## Tech

React 19 · TypeScript · Vite · Tailwind CSS v4 · lucide-react · html-to-image · self-hosted Manrope and Inter fonts (via Fontsource, so they embed in exports).

## Structure

```
src/
  components/
    Header, Footer, Hero, Logo, IntroductionForm, Field, PhotoUploader,
    TemplateSelector, VisibilityToggles, BannerCanvas, BannerPreview,
    ExportControls, GeneratingOverlay, ConfirmDialog, Toast
    banner/     bannerModel, AutoFit, ProfilePhoto, PersonalDetails, SocialLinks, Decor, icons
    templates/  ExecutiveTemplate, ModernTemplate, MinimalTemplate
  pages/        Home, Generator
  hooks/        useBannerState (persistence), useHashRoute
  data/         sampleData
  utils/        exportBanner, validation, image, profileText
  config/       brand (logo + brand tokens)
```
