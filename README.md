# Autonomous Software Engineering course site

This is a small, static Eleventy site for the Monsoon 2026 Autonomous Software Engineering course. It deploys to GitHub Pages through the workflow in `.github/workflows/deploy-pages.yml`.

## Edit the course content

- `src/_data/course.js` contains the course facts, outcomes, units, assessment, and references.
- `src/index.njk` is the landing page.
- `src/syllabus.njk`, `src/project.njk`, `src/resources.njk`, and `src/policies.njk` are the supporting pages.
- `src/assets/site.css` contains the complete visual system. It uses system fonts only.

## Add lecture notes in Markdown

Copy [the lecture template](content-templates/lecture.md) into `src/lectures/`, rename it (for example, `01-foundations.md`), and replace the front matter and body with your note. Every non-draft Markdown file in that folder becomes a standalone lecture page and is listed automatically at `/lectures/`.

Use `draft: true` in the front matter to keep a work-in-progress out of the published index.

Install Eleventy with `npm install`, then run:

```sh
npm run dev
```

Build the deployable site into `_site/` with `npm run build`.

## Carbon budget

The site intentionally ships no client-side JavaScript, web fonts, trackers, embeds, or third-party requests. It includes two compressed course-team photos; treat every new asset as a design decision. Keep the homepage under 150 KB and CSS under 20 KB. `npm run check` builds the site and checks for accessibility basics, external requests, script payloads, and a small transfer budget.

The proposal has not specified a course code, lecture calendar, office hours, or a final policy. Those are left as editable placeholders rather than invented here.
