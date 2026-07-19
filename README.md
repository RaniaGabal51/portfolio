# Rania Gabal — Portfolio Website

A premium, glassmorphism-inspired personal portfolio built with plain HTML5, CSS3, vanilla JavaScript, and Tailwind CSS (via CDN).

## Structure

```
├── index.html          Main page — all sections live here
├── css/style.css        Design tokens, glass effects, animations
├── js/script.js         All interactivity (16 clearly commented modules)
└── assets/
    ├── Rania-Gabal-CV.pdf     Placeholder CV — replace with the real file
    └── images/                Placeholder SVGs — swap for real photos/screenshots
```

## Editing content

- **Profile photo**: replace `assets/images/profile.svg` with a real photo (keep the filename, or update the `src` in `index.html`).
- **Projects**: each `<article class="project-card">` in the Projects section carries `data-*` attributes (`data-title`, `data-description`, `data-tech`, `data-features`, `data-demo`, `data-code`, `data-category`) that feed both the card and the details modal — edit those attributes to update a project everywhere at once.
- **CV**: replace `assets/Rania-Gabal-CV.pdf` with your real resume, same filename.
- **Contact form**: currently validates client-side and shows a success message with no backend. To wire it to a real endpoint, open `js/script.js` → `initContactForm()` and fill in the `TODO` `fetch(...)` call.
- **Colors/fonts**: edit the CSS custom properties at the top of `css/style.css` (`:root` and `html.dark`), and the Google Fonts `<link>` + `tailwind.config` block in `index.html`.

## Features included

Sticky glass navbar with active-section highlight, mobile menu, dark/light mode (saved in `localStorage`), scroll progress bar, scroll-to-top button, loading screen, hero typing animation, animated counters, orbiting skill-chip hero motif, scroll-reveal animations, animated skill proficiency bars, project search + category filter + details modal, custom cursor (desktop only), and a validated contact form.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (root, or a `docs/` folder).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch", pick your branch and the folder containing `index.html`.
4. Save — GitHub will publish the site at `https://<username>.github.io/<repo-name>/`.

No build step is required — this is a static site.
