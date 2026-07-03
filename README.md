# Xai — Intelligence Workspace

A single-page, high-fidelity interactive product experience built for the
RacoAI frontend challenge. It visually narrates how **Xai** turns raw data
into structured intelligence, actionable insight, and AI automations.

**Live demo:** _add your Vercel/Netlify URL here after deploying_
**Figma:** _add your public Figma link here_
**Walkthrough video:** _add your Google Drive / YouTube link here_

---

## 1. Project overview & technical approach

The page is built as four narrative sections stacked on a single route
(`src/app/page.tsx`), each owning one part of the "raw data → structure →
insight → automation" story:

| Section | What it shows | File |
|---|---|---|
| Hero | A WebGL particle field that morphs from a chaotic cloud into a structured grid, driven by scroll position and cursor position | `src/components/hero/` |
| Interactive Insight Flow | A GSAP `ScrollTrigger`-pinned horizontal track walking through **Ingest → Analyze → Generate**, with hand-drawn SVG line-paths that draw themselves in sync with scroll | `src/components/insight-flow/` |
| Intelligence Dashboard Preview | A mock product UI (sidebar, tabs, KPI cards, line/bar charts, data table) with Framer Motion entrance and tab-switch choreography | `src/components/dashboard/` |
| Signature Interaction | A second 3D scene: ~190 data-point "records" that scatter or snap into four labeled clusters on demand — the deliberate "wow moment" | `src/components/signature/` |

Design tokens (color, type, spacing rhythm) live in `src/app/globals.css` and
are consumed as Tailwind v4 theme variables, so every component pulls from
one source of truth instead of hard-coded values.

## 2. Technology stack

- **Next.js 16** (App Router, TypeScript, Turbopack build)
- **Tailwind CSS v4** for layout/utility styling and the design-token theme
- **Framer Motion** for UI choreography — page-load reveals, tab transitions,
  scroll-triggered entrances (`whileInView`), and the animated SVG/line charts
- **GSAP + ScrollTrigger** for the pinned, scrubbed horizontal Insight Flow
  timeline and its synchronized SVG path-drawing
- **Three.js via React Three Fiber** for both WebGL scenes (hero particle
  field and the signature cluster interaction)
- **lucide-react** for iconography, **clsx** for conditional classes

No backend or database is used — all dashboard data is static/mock data, as
permitted by the brief.

## 3. Run it locally

Requirements: Node.js 18.18+ (Node 20 LTS recommended) and npm.

```bash
# 1. Unzip the project, then from inside the folder:
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# http://localhost:3000
```

To build and run a production bundle:

```bash
npm run build
npm start
```

> **Note on fonts:** the project uses `next/font/google` (Space Grotesk,
> Inter, JetBrains Mono), which fetches font files at build time. This
> requires normal internet access on first build — the same as any Next.js
> project using Google Fonts — and works out of the box on Vercel/Netlify.

## 4. Deploying

The project has no environment variables and no backend, so it deploys
as-is:

- **Vercel:** import the GitHub repo → framework preset "Next.js" is
  auto-detected → deploy.
- **Netlify:** import the repo → build command `npm run build`, publish
  directory handled automatically by the Next.js runtime plugin.

## 5. Key animation & interaction decisions

- **Scroll drives meaning, not just motion.** In the hero, scroll progress is
  read once via `framer-motion`'s `useScroll`/`useTransform` and pushed into a
  plain `ref` (not React state), so the 2,600-point particle field can be
  re-lerped every frame inside R3F's `useFrame` without triggering React
  re-renders — keeping the "data becoming structure" morph smooth at 60fps.
- **The Insight Flow is pinned and scrubbed, not auto-playing**, so the pace
  of "Ingest → Analyze → Generate" is entirely in the visitor's hands; GSAP's
  `containerAnimation` links each panel's SVG line-draw and copy reveal to
  the same scrub timeline as the horizontal pin.
- **The dashboard favors restraint over decoration.** Entrance animation is a
  single coordinated `whileInView` stagger; the only continuous motion is the
  tab-switch pill, animated with a spring `layoutId` so it always slides
  rather than teleports.
- **The signature interaction is reversible and explicit.** Rather than an
  autoplaying flourish, "Organize into clusters" is a real, labeled action —
  it's the one moment on the page designed to be *played with*, echoing the
  product idea that Xai finds structure in data on your terms.
- **Reduced motion is respected** globally (`prefers-reduced-motion`), and
  every animated section still reads correctly with motion disabled.

## 6. Project structure

```
src/
  app/
    layout.tsx        Fonts, metadata, root shell
    globals.css        Design tokens (color/type) + Tailwind v4 theme
    page.tsx            Section composition
  components/
    Nav.tsx
    Footer.tsx
    hero/
      Hero.tsx          Scroll wiring, copy, layout
      DataField.tsx      R3F particle field (raw cloud <-> grid)
    insight-flow/
      InsightFlow.tsx   GSAP ScrollTrigger pinned horizontal track
    dashboard/
      DashboardPreview.tsx  Mock product UI, charts, table, tabs
    signature/
      SignatureSection.tsx  Section chrome/copy
      SignatureCluster.tsx  R3F node-cluster interaction
  lib/
    utils.ts            cn() class helper
```

## 7. Deliverables checklist (per brief)

- [x] Single-page interactive product experience (this repo)
- [x] Hero with scroll/cursor-reactive 3D centerpiece
- [x] Interactive Insight Flow (3 stages, scroll-driven, micro-interactions)
- [x] Intelligence Dashboard preview (sidebar, tabs, charts, table)
- [x] Signature "wow moment" interaction (data clustering)
- [x] README with overview, stack, run instructions, animation notes
- [ ] Public Figma file link — add before submitting
- [ ] Live deployment URL — add before submitting
- [ ] Walkthrough video link — add before submitting
