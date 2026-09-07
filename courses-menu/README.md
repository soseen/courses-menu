# Courses Menu

The public Vite + React menu reads published menu documents from Sanity and renders only visible
categories and courses. Bootstrap provides the responsive layout and components, with the shared
design-system palette applied through Sass.

## Deploying future versions

Cloudflare Pages watches the `main` branch. To publish a new code version:

1. Make and review the changes locally.
2. Commit the changes on `main`.
3. From the repository root, run `npm run deploy:web`.

The deployment command requires a clean `main` branch, runs the frontend lint and production build,
and pushes `main` to GitHub. Cloudflare then builds and publishes the pushed commit automatically.
It does not create a commit for you. A normal `git push origin main` also remains valid. Preview
deployments for non-production branches are disabled.

Changes to menus and courses in Sanity do not require a frontend deployment. Publish those changes
in Sanity Studio and the deployed app will fetch the updated content at runtime.

Production: <https://courses-menu.pages.dev>

The Cloudflare Pages project uses these build settings:

- Production branch: `main`
- Root directory: `courses-menu`
- Build command: `npm run build`
- Build output directory: `dist`
- Build system: version 3

The production and preview environments define:

```env
VITE_SANITY_PROJECT_ID=am93ag8m
VITE_SANITY_DATASET=production
```

The production origin is allowed in the Sanity project's CORS configuration. A token is not
required because the app only reads published content.

## Local development

Copy `.env.example` to `.env` and set the Sanity project values:

```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

Allow the local frontend origin in the Sanity project, then start Vite:

```sh
npx sanity cors add http://localhost:5173 --project <project-id>
npm run dev
```

Add each deployed frontend origin to Sanity CORS as part of deployment. The public app never needs
a Sanity token; the dataset must allow public reads.

## Checks

```sh
npm run lint
npm run build
```
