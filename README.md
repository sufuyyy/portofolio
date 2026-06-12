# UI Designer Portfolio

A minimal, editorial, dark-theme portfolio built with **Next.js 14 (App Router)**
and **Tailwind CSS**. All content lives in **MDX files** — there is no database.

- **Home** (`/`) — hero + selected works grid
- **About** (`/about`) — bio + work experience table
- **Work detail** (`/works/[slug]`) — individual project page rendered from MDX

## Tech stack

| Purpose            | Library                              |
| ------------------ | ------------------------------------ |
| Framework          | Next.js 14 (App Router)              |
| Styling            | Tailwind CSS + `@tailwindcss/typography` |
| MDX rendering      | `next-mdx-remote` (RSC)              |
| Frontmatter parser | `gray-matter`                        |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Project layout

```
content/
  about.mdx                 # site identity, bio, links, experience (frontmatter only)
  works/
    design-system.mdx       # one file per project; filename = URL slug
    onboarding-page-flow.mdx
    website-design-cmsmart.mdx
public/
  images/projects/<slug>/   # images for each project, folder name matches the slug
components/
  ProjectImage.tsx          # MDX component: full-width image + optional caption
  ProjectImageGroup.tsx     # MDX component: two images side-by-side (50/50)
  mdx-components.tsx         # registers the components for all .mdx files
lib/
  content.ts                # reads + parses the MDX content
```

---

## 1. Adding a new project

1. **Create the MDX file.** Add `content/works/<your-slug>.mdx`. The filename
   (without `.mdx`) becomes the URL: `content/works/my-project.mdx` →
   `/works/my-project`.

2. **Add the frontmatter** at the top of the file:

   ```mdx
   ---
   title: "My Project"
   role: "UI Designer"
   year: "2024"
   order: 0                 # optional — lower numbers appear first on the home grid
   summary: "A one or two sentence description used on the card and detail header."
   cover: "/images/projects/my-project/cover.svg"
   ---
   ```

3. **Create the image folder** at `public/images/projects/my-project/` (the
   folder name must match the slug) and drop your images in. Reference them from
   the MDX body with a path starting at `/images/...`.

4. **Write the body** below the frontmatter using Markdown and the custom
   components (see section 3).

That's it — the project appears automatically on the home grid (sorted by
`order`, then year) and gets its own page. No code changes or imports needed.

## 2. Editing existing content

- **Bio, name, role, social links, experience table** → edit the frontmatter in
  `content/about.mdx`. The experience table is the `experience:` list; add or
  remove `company` / `years` / `position` entries there.
- **A project's title, summary, year, cover, or body** → edit that project's
  file in `content/works/`.

Changes hot-reload in `npm run dev`; for production, redeploy (see section 4).

## 3. Using `ProjectImage` and `ProjectImageGroup` in MDX

Both components are registered globally in `components/mdx-components.tsx`, so you
can use them **directly inside any `.mdx` file with no import**.

### `ProjectImage` — full-width image with optional caption

```mdx
<ProjectImage
  src="/images/projects/my-project/hero.jpg"
  alt="Describe the image"
  caption="An optional caption shown below the image."
/>
```

- Renders full-width with rounded corners and vertical margin.
- Omit `caption` to show just the image.

### `ProjectImageGroup` — two images side-by-side (50/50)

```mdx
<ProjectImageGroup>
  <ProjectImage src="/images/projects/my-project/a.jpg" alt="Left" />
  <ProjectImage src="/images/projects/my-project/b.jpg" alt="Right" />
</ProjectImageGroup>
```

- Two columns on desktop, stacked vertically on mobile.
- Do **not** put a `caption` on images inside a group — captions are only for
  standalone `ProjectImage` use.

## 4. Deploying to Vercel (free tier)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** and import the repo.
3. Vercel auto-detects Next.js — no configuration needed. Click **Deploy**.
4. Every push to the default branch redeploys automatically. To publish content
   changes, commit your edited MDX files (and any new images) and push.

> Tip: you can also deploy from the CLI with `npx vercel` (preview) and
> `npx vercel --prod` (production).
