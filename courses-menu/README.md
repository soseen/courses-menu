# Courses Menu

The public Vite + React menu reads published menu documents from Sanity and renders only visible
categories and courses. Bootstrap provides the responsive layout and components, with the shared
design-system palette applied through Sass.

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

## Cloudflare Pages

Create a Pages project with the GitHub repository and these build settings:

- Production branch: `main`
- Root directory: `courses-menu`
- Build command: `npm run build`
- Build output directory: `dist`
- Build system: version 3

Set the following production and preview environment variables in Pages:

```env
VITE_SANITY_PROJECT_ID=am93ag8m
VITE_SANITY_DATASET=production
```

After the first deployment, add its exact `https://<project>.pages.dev` origin to the Sanity
project's CORS origins. A token is not required because the app only reads published content.
