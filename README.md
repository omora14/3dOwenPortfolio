# dev3d-portfolio

A personal 3D portfolio built with Next.js, React Three Fiber, GSAP, and a retro Windows-style desktop UI.

This project is mainly for me, but it is public so people can explore the work, the interaction design, and the implementation choices.

---

## Table of Contents

- [What This Is](#what-this-is)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Helpful Scripts](#helpful-scripts)
- [Deployment Notes](#deployment-notes)
- [Known Tradeoffs](#known-tradeoffs)
- [Contact](#contact)

---

## What This Is

`dev3d-portfolio` is my interactive developer portfolio:

- A 3D retro computer scene as the entry experience
- Scroll-driven camera movement using GSAP
- A handoff from 3D into a fullscreen 2D "Owen95" desktop
- Draggable/minimizable Win95-style windows for portfolio content
- EN/ES language toggle
- Contact form via EmailJS

The goal is to feel playful and nostalgic while still being readable and practical for recruiters, collaborators, and other developers.

---

## Tech Stack

- `Next.js` (App Router)
- `React` + `TypeScript`
- `three`, `@react-three/fiber`, `@react-three/drei`
- `GSAP` + `ScrollTrigger`
- `react95`
- `styled-components`
- `@emailjs/browser`

---

## Features

- 3D intro scene with atmospheric lighting and postprocessing
- Smooth camera dolly tied to page scroll
- Fullscreen desktop handoff near end-of-scroll
- Desktop OS interactions:
  - Start menu
  - Taskbar with language toggle + exit control
  - Multiple windows (About, Experience, Projects, Resume, Terminal, Contact, etc.)
  - Minimize/restore behaviors
- Lightweight i18n (`en` / `es`)
- Contact form with validation and resilient EmailJS handling
- Mobile-specific UX improvements and onboarding loader

---

## Run Locally

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a local `.env` file in the project root (see keys below).

### 3) Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

These are optional depending on what you want enabled:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_TWO_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Notes:

- Contact form works best when at least one EmailJS template path is correctly configured.
- Google Analytics is only injected when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is present.

---

## Project Structure

```txt
src/
  app/
  components/
    CameraRig.tsx
    Computer.tsx
    FullscreenOS.tsx
    PortfolioOS.tsx
    Scene.tsx
    ScreenOverlay.tsx
    RetroOS/
      Desktop.tsx
      Taskbar.tsx
      StartMenu.tsx
      windows/
  data/
    portfolio.ts
    localizedPortfolio.ts
  i18n/
    LocaleProvider.tsx
    messages/
scripts/
  verify-scroll.mjs
  snapshot-final.mjs
  calibrate-screen.mjs
```

---

## Helpful Scripts

- `npm run dev` — run local development server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — lint checks
- `npm run verify:scroll` — Puppeteer smoke test for scroll/camera behavior

---

## Deployment Notes

- Deploys cleanly on modern Node environments compatible with Next 14.
- If mobile feels slow on first load, that is expected while 3D assets initialize; there is a visual loader to make this explicit.
- Ensure `public/computer.glb` and required public assets are present in the deployment output.

---

## Known Tradeoffs

- This is intentionally design-heavy and animation-first, so older mobile devices may take longer to initialize.
- The project favors visual character over strict minimalism.
- Some behaviors are tuned specifically for this scene/model and are not generic drop-in patterns.

---

## Contact

If you're visiting from GitHub and want to chat, use the in-app contact window/form or reach me through the links in the portfolio UI.

