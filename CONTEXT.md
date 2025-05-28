# Medium Place - Astro Blog

## Build/Dev Commands

- `npx astro dev` - Start development server
- `npx astro build` - Build for production
- `npx astro preview` - Preview production build
- `npx astro check` - Type check and lint
- `npx prettier --write .` - Format code

## Tech Stack

- Astro 5.8.0 with TypeScript (strict mode)
- TailwindCSS 4.x with Catppuccin theme
- MDX for content
- No test framework configured

## Code Style

- **Formatting**: Tabs (not spaces), 140 char line width, Prettier with Astro/Tailwind plugins
- **Imports**: Use `~/` alias for src imports (e.g., `~/components/`, `~/layouts/`)
- **Types**: Export interfaces in frontmatter, use optional props with `?`
- **Naming**: PascalCase for components, camelCase for variables
- **Astro**: Frontmatter with `---`, slots for layout composition
- **CSS**: TailwindCSS with `ctp-` prefixed Catppuccin colors
- **Content**: Zod schemas for content collections, draft boolean for posts
