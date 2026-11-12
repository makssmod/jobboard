# JobBoard — Startup Job Board (theme 9)

Course «Web Technologies and Web Design», KPI. Author: Коваль Максим, group КН-42.

Pages: **Home** (`index.html`), **Jobs** (`list.html`), **Job details** (`details.html`), **Apply** (`form.html`).
Data: `jobs`, `companies`, `applications` — `api/db.json`.

## Quick start

```bash
npm install
npm run dev        # site on http://localhost:5173 + json-server on http://localhost:5174
npm run lint       # ESLint
npm run build      # lint + production build into docs/ (served by GitHub Pages)
npm run preview    # preview the build on http://localhost:4173
```

## Structure

```
api/
  db.json           # t9_jobs, t9_companies, t9_applications (json-server)
  routes.json       # /topic9/... routes
build/
  vite-plugin-ejs-pages.js   # renders pages through EJS (partials)
src/
  index.html  list.html  details.html  form.html
  partials/         # head, header, footer, job-card (EJS)
  assets/img/       # jpg + webp, 2–3 sizes each
  i18n/en.json      # dictionary for data-i18n keys
  js/               # ES modules (api, core, main)
docs/               # production build for GitHub Pages
eslint.config.js  .editorconfig  vite.config.js
```

## LR2 — HTML markup and semantics

- 4 pages from the LR1 Figma layouts, `lang="en"`, skip link, one `h1` per page, no skipped heading levels.
- Landmarks: `header`, `nav` (Main / Breadcrumb / Pagination / Footer), `main`, `section`, `article`, `aside`, `footer`.
- Navigation is a list of links; the active item has `aria-current="page"`.
- Responsive images: hero uses `picture` (art direction wide/narrow + webp with jpg fallback, `srcset` + `sizes`);
  company logo uses density `srcset` (1x/2x/3x). All `img` have `width` and `height`.
- Forms: every field has `label for`, `fieldset` + `legend`, `type`, `name`, `autocomplete`, validation attributes, hints via `aria-describedby`.
- BEM class names, no inline styles.
- **Extra:** shared header / footer / job card as EJS partials; schema.org `JobPosting` JSON-LD on the details page.
- **Bonus:** i18n-ready markup (`data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label`) with `src/i18n/en.json`.

Checked with W3C Nu Html Checker (no errors, no warnings), ESLint (no errors), keyboard Tab order.

## Notes

- `details.html?id=N` and `form.html?job=N` currently show job #1; in LR4 the page reads `id` and loads the job from json-server.
- The mobile bottom navigation from the mockup is the same `nav` restyled in LR3 (no duplicate markup).
- The Apply form posts to `applications`; in LR4 JavaScript intercepts the submit and sends it to `/topic9/applications`.
