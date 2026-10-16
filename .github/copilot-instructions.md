<!-- Purpose: guidance for AI coding agents working on this repository -->
# Copilot instructions for this repo

This repository is a small static portfolio site. The goal of these instructions is to get an AI coding agent productive quickly by describing the project's structure, conventions, and common change patterns.

- **Big picture**: single-page static site (no build system). All user-facing code is in the repo root:
  - `index.html` — page structure and section IDs used by navigation (`#home`, `#sobre`, `#skills`, `#projetos`, `#contato`).
  - `script.js` — UI behavior: hamburger menu, smooth scroll, IntersectionObserver animations, form submit placeholder, active nav link logic, counters, dark-mode init, debounce utility.
  - `styles.css` — theme variables (`:root`), layout grid, responsive rules at `768px` and `480px`, shared utility classes (`.container`, `.btn`).

- **Why this structure**: minimal, maintainable static portfolio. JS keeps progressive enhancement (animations and interactivity) without frameworks. CSS variables centralize theming.

- **Developer workflows (explicit commands)**:
  - No build step. Open `index.html` in a browser or run a local static server.
  - Quick local servers (from repository root):

    ```powershell
    # Python 3 (PowerShell)
    python -m http.server 8000

    # Node (if you prefer http-server)
    npx http-server -p 8000
    ```

  - Use the VS Code Live Server extension for live reload during editing.

- **Key selectors and integration points** (be conservative when renaming):
  - `#hamburger` and `.nav-links` — mobile navigation logic in `script.js`.
  - `.project-card`, `.skill-category`, `.stat-card` — animated by IntersectionObserver.
  - `.about-stats` — triggers animated counters.
  - `#contactForm` — currently prevents default and shows an alert; replace with an integration to a backend or service when adding real form handling.
  - Font Awesome is loaded via CDN in `index.html`; keep or replace consistently.

- **Patterns & conventions to follow when editing**:
  - Keep semantics and section `id`s used for navigation; nav logic relies on those ids.
  - Preserve CSS variable names in `:root` when changing them (e.g., `--primary-color`, `--dark-bg`) to avoid breaking style consistency.
  - Use existing utility classes (`.container`, `.btn`, `.project-link`) rather than adding many one-off styles.
  - Maintain accessibility: interactive elements are traditional `<a>` or `<button>`; keep focus styles and ensure forms have labels if you add inputs.

- **Debugging and testing tips**:
  - Use browser DevTools Console and Elements panel to debug JS and layout issues.
  - Inspect event listeners on `#hamburger` and `#contactForm` to ensure handlers remain bound.
  - For layout regressions, check the responsive media queries at `768px` and `480px`.

- **When adding features that require backend integration**:
  - Replace the `contactForm` submit handler in `script.js` with a fetch() POST to your API endpoint; avoid blocking the UI. Document any new env vars or endpoints in `README.md`.
  - If you add a build tool (Webpack, Vite, etc.), update these instructions and add a `package.json` with clear `dev`/`build` scripts.

- **Files to inspect for examples**:
  - `index.html` — canonical layout and nav usage.
  - `script.js` — example patterns: `IntersectionObserver`, `debounce`, `DOMContentLoaded` hooks.
  - `styles.css` — theming via variables and responsive breakpoints.

If anything above is unclear or you want the instructions expanded (e.g., CI/deploy steps, recommended linting, or how to integrate a backend), tell me which area to expand and I will iterate.
