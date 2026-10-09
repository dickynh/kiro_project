# Components

Reusable UI building blocks for the portfolio. Each component is a self-contained
HTML partial paired with its scoped stylesheet in `/css`.

Current components (built):

| Component | Markup location | Styles |
|-----------|-----------------|--------|
| Navbar    | `index.html` → `[data-component="navbar"]` | `css/navbar.css` |
| Hero      | `index.html` → `[data-component="hero"]`   | `css/hero.css`   |
| About     | `index.html` → `[data-component="about"]`  | `css/about.css`  |

Shared primitives (`.btn`, `.glass`, `.section__head`, `.stat-card`, `.floating`)
live in `css/components.css` and are reused across sections.

> Sections are authored as marked-up partials inside `index.html` and tagged with
> `data-component` attributes so they can be lifted into separate files or a build
> step later without rework. More sections will be added after confirmation.
