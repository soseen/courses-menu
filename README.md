# Courses Menu

A small monorepo containing the customer-facing courses menu and the Sanity Studio used to manage its content.

## Repository structure

```text
.
|-- courses-menu/  # Vite + React frontend
|-- studio/        # Sanity Studio and content schemas
|-- design-system/ # Shared color tokens used by both apps
|-- .github/       # Continuous-integration checks
`-- package.json   # Convenience commands for both apps
```

The two apps keep separate dependencies and lockfiles. They live in one repository because frontend work and content-model changes belong to the same product and often need to be reviewed together. They can still be developed and deployed independently.

The public app compiles a palette-customized Bootstrap build from Sass. Sanity Studio uses the
same palette through Sanity's native theme API; Bootstrap is not loaded into Studio. See
`design-system/README.md` for the token mappings and accessibility notes.

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

Copy each app's `.env.example` to `.env` before starting it. Both apps require the same Sanity
project ID, exposed as `VITE_SANITY_PROJECT_ID` in the frontend and
`SANITY_STUDIO_PROJECT_ID` in Studio. Studio additionally requires
`SANITY_DEPLOYMENT_APP_ID` for its hosted deployment configuration.

CI reads the shared project ID from the `SANITY_PROJECT_ID` GitHub repository variable and the
Studio app ID from `SANITY_DEPLOYMENT_APP_ID`.

The Studio's QR-code tool defaults to `https://courses-menu.pages.dev/`. Set
`SANITY_STUDIO_MENU_URL` to a different initial address if needed. Once an address is saved in the
Studio, it is shared with other Studio users through the `menuSettings` singleton.

## Checks

```sh
npm run lint
npm run build
```

## Menu QR code

The current print-ready QR image lives in `assets/courses-menu-qr-code.png`. It can be regenerated
for the current domain with `npm run generate:qr`, or for a replacement domain with:

```sh
npm run generate:qr -- https://new-domain.example/menu/
```

Studio users can also open **QR code** in the menu tool, update and save the public URL, check the
destination, and download the generated 1024 × 1024 PNG.

## Deployment

- Deploy `courses-menu/` to the frontend host as a Vite application.
- Deploy `studio/` independently with `npm run deploy --prefix studio`, or connect that directory to a supported Studio hosting workflow.
- Keep tokens and local environment values out of Git. Commit an `.env.example` if environment variables are added later.
