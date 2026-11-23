# Profile site

A personal profile and portfolio site built with HTML, CSS and JavaScript only, for
placement applications.

## Pages

| Page | File |
| --- | --- |
| About me | `index.html` |
| Technical interests | `interests.html` |
| Portfolio (quick-view pop-ups + links) | `portfolio.html` |
| Project details | `project-1.html`, `project-2.html`, `project-3.html` |
| Contact me (client-side form) | `contact.html` |

## Accessibility features (target: WCAG 2.2 level AA)

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and one `h1` per page
- Skip link to main content, visible keyboard focus on every control
- `aria-current="page"` on the active navigation link and breadcrumb
- Colour contrast of at least 4.5:1 for text and 3:1 for UI components
- Alt text on all meaningful images; decorative images use `alt=""`
- Pop-ups use the native `<dialog>` element: focus moves in, Esc closes, focus returns
- Form fields have visible labels, required fields are marked, errors are shown in text
  (not colour alone), linked with `aria-describedby`, and summarised at the top of the form
- Respects `prefers-reduced-motion`; layout reflows to 320px width without horizontal scrolling

## Running locally

Open `index.html` in a browser. No build step is needed.

## Publishing with GitHub Pages

1. Create an empty repository on GitHub.
2. `git remote add origin https://github.com/<username>/<repo>.git`
3. `git push -u origin main`
4. In the repository: **Settings → Pages → Deploy from a branch → main / (root)**.
