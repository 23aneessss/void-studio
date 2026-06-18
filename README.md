# VOID Studio

A dark luxury creative-agency website — built with **Next.js (App Router)**, **Three.js / React Three Fiber**, **GSAP ScrollTrigger**, **Framer Motion**, **Lenis** smooth scroll, **SplitType** and **Tailwind CSS**.

All hero/ambient visuals are AI-generated via the **Higgsfield** pipeline.



---



## Stack & techniques

| Area | Implementation |
| --- | --- |
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS + design tokens (`#080808` / `#C9A84C` / `#F5F5F0`) |
| Smooth scroll | Lenis, wired into the GSAP ticker + ScrollTrigger |
| Scroll animation | GSAP ScrollTrigger — clip-path reveals, line-masked text, pinning |
| Text splitting | SplitType (lines / words / chars) |
| WebGL | React Three Fiber — custom GLSL fbm-distortion backdrop + gold particle field |
| Micro-interaction | Framer Motion magnetic buttons, custom magnetic cursor, mobile menu |
| Texture | Animated SVG film-grain overlay |

### Sections
1. **Hero** — WebGL distortion + Higgsfield video + grain, load-triggered headline reveal, magnetic cursor
2. **Marquee** — infinite scroll with scroll-velocity skew
3. **Work** — editorial project rows, cursor-following video preview (desktop) / inline video (mobile), scroll reveals
4. **About** — split screen: count-up stats + Higgsfield ambient video with clip reveal + parallax
5. **Services** — horizontal scroll with GSAP pinning + progress bar
6. **Contact** — fullscreen hover-distortion headline (SVG displacement filter)

---



## Generated assets (Higgsfield)

Generated within a 10-credit free-plan budget and committed to `/public` so the site is fully self-hosted (the source CloudFront URLs are recorded in [`lib/assets.ts`](lib/assets.ts) for provenance).

| Asset | Model | Prompt |
| --- | --- | --- |
| `public/videos/hero.mp4` | `veo3_1_lite` | dark luxury abstract cinematic background, gold particles |
| `public/videos/about.mp4` | `veo3_1_lite` | abstract dark fluid motion, ink in water, b&w |
| `public/img/poster.png` + `og.webp` | `nano_banana_pro` | dark luxury abstract poster, gold liquid metal |


The three Work-card previews reuse the two master clips with distinct CSS color grades
(see `grade` in [`lib/data.ts`](lib/data.ts)). To use dedicated clips, top up Higgsfield
credits, generate three more videos, drop them in `public/videos`, and repoint the `video`
fields.



---



## Fonts

The brand fonts are **Editorial New** (serif) + **Neue Montreal** (sans), which are commercial
(PangramPangram). For an out-of-the-box deploy they are substituted with closely matched open
fonts via `next/font`:



- `Fraunces` → Editorial New
- `Space Grotesk` → Neue Montreal


To use the real fonts, drop the `.woff2` files in `public/fonts` and swap the `next/font/google`
calls in `app/layout.tsx` for `next/font/local` — the CSS variables (`--font-serif` /
`--font-sans`) stay the same.



---


## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Deploy

Zero-config on **Vercel** (or any Node host). The repo is already production-ready: static
prerender, self-hosted media, SEO/OG metadata, reduced-motion support and mobile responsiveness.
