# Courses Menu

A small monorepo containing the customer-facing courses menu and the Sanity Studio used to manage its content.

## Repository structure

```text
.
|-- courses-menu/  # Vite + React frontend
|-- studio/        # Sanity Studio and content schemas
|-- .github/       # Continuous-integration checks
`-- package.json   # Convenience commands for both apps
```

The two apps keep separate dependencies and lockfiles. They live in one repository because frontend work and content-model changes belong to the same product and often need to be reviewed together. They can still be developed and deployed independently.

## Local development

Install both apps from the repository root:

```sh
npm run install:all
```

Run the frontend and Studio in separate terminals:

```sh
npm run dev:web
npm run dev:studio
```

## Checks

```sh
npm run lint
npm run build
```

## Deployment

- Deploy `courses-menu/` to the frontend host as a Vite application.
- Deploy `studio/` independently with `npm run deploy --prefix studio`, or connect that directory to a supported Studio hosting workflow.
- Keep tokens and local environment values out of Git. Commit an `.env.example` if environment variables are added later.
