# The Cozm — Website

Static HTML/CSS/JS website for [The Cozm](https://www.thecozm.com) — Digital Acceleration of Global Mobility.

## Live Preview
**GitHub Pages:** https://saycozm.github.io/New-Cozm-Website/

---

## Project Structure

```
/
├── index.html          # Homepage
├── cozm-travel.html    # Cozm Travel product page
├── cozm-unity.html     # Cozm Unity product page
├── cozm-nemo.html      # Cozm Nemo (coming soon)
├── about.html          # About Us (story, team, mission)
├── why-us.html         # Why Us page
├── why-now.html        # Why Now page
├── case-studies.html   # Case Studies
├── insights.html       # Articles, News, Media
├── events.html         # Events page
├── styles.css          # Master stylesheet (all pages)
├── chatbot.js          # Floating chatbot widget
└── assets/             # Images, logos, illustrations
    ├── logo-transparent.png
    ├── globe-hero.png
    ├── Benjamin.jpg
    ├── Graham.jpeg
    ├── Paul_sq.png
    ├── Jennifer_sq.png
    └── ...
```

---

## Tech Stack
- Pure HTML5 / CSS3 / Vanilla JS — no frameworks, no build tools
- Google Fonts: Inter
- No external JS dependencies

## Brand
- Primary dark: `#181C31` (Dark Indigo)
- Accent: `#40AEBC` (Teal)
- Pastel section bg: `#EDF5FF`
- Body text: `#83849E`

## Notes for Engineers
- All pages share `styles.css` — CSS variables are defined in `:root`
- The chatbot widget is fully self-contained in `chatbot.js` (injected via `<script src="chatbot.js">` at bottom of each page)
- Nav is fixed-position; page heroes use `padding-top` to clear the nav bar
- Logo uses `filter: none !important` override (transparent PNG, no filter needed)
- Globe images use `mix-blend-mode: screen` on dark backgrounds
- Responsive breakpoints: 1024px (tablet), 768px (mobile)
- "Book a Demo" CTA currently links to `mailto:support@thecozm.com` — replace with actual demo booking URL
- `events.html` newsletter form and Cozm Nemo waitlist form use `onsubmit="return false;"` — wire up to backend
