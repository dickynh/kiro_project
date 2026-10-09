# Vita Anggraeni — Portfolio

A modern, dark, futuristic personal portfolio for **Vita Anggraeni**, Full Stack AI Engineer.
Built with plain HTML, CSS, and vanilla JavaScript — no build step required.

## ✨ Features (so far)

- Animated gradient background with floating orbs and a subtle grid
- Glassmorphism cards and soft glowing accents
- Fixed navbar with scroll state, scroll-spy active links, and a mobile drawer
- Fullscreen hero with typewriter effect, floating particles, floating chips, and CTAs
- About section with professional bio, highlights, and animated statistic counters
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Fully responsive: mobile, tablet, desktop

## 📁 Structure

```
kiro_project/
├── index.html          # Single-page layout (navbar + hero + about)
├── readme.md
├── assets/             # Images / icons / resume
├── components/         # Component documentation & future partials
├── css/
│   ├── variables.css   # Design tokens (colors, spacing, type)
│   ├── base.css        # Reset, background, reveal utilities
│   ├── components.css   # Reusable primitives (buttons, glass, cards)
│   ├── navbar.css
│   ├── hero.css
│   ├── about.css
│   └── responsive.css  # Tablet & mobile breakpoints
├── js/
│   └── main.js         # Navbar, typewriter, particles, reveal, counters
└── pages/              # Reserved for future standalone pages
```

## 🚀 Run

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🎨 Theme

Dark modern developer portfolio — accent gradient from violet `#7c5cff` to cyan `#22d3ee`,
with a magenta highlight. Typography pairs **Sora** (headings) with **Space Grotesk** (body).

## 🧭 Build status

Built: **Navbar**, **Hero**, **About**.
Pending your confirmation: Skills, Projects, Experience, Testimonials, Contact, Footer.
