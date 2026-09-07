# Design system

`palette.ts` is the single source of truth for colors shared by the public menu and Sanity
Studio. Change a color there rather than in an app-specific stylesheet.

The four supplied brand colors keep their original names. `ink` and `action` are supporting
colors derived from the same muted green family: the supplied `dark` color does not have enough
contrast for small text or a white-on-color primary button, so these darker values cover those
accessible semantic roles.

- The Vite config turns the palette into Sass variables before compiling Bootstrap.
- The Sanity theme maps the same values to Studio's native theme API.

Bootstrap is intentionally scoped to the public React app. Sanity Studio already has its own
component system, so loading Bootstrap there would add CSS weight and risk style conflicts.
