# Step 01 — Next.js Skeleton

**Date completed:** 2026-04-26
**Time spent:** not provided
**Status:** Complete

## What was built

- Next.js 15.5.15 project scaffolded via `create-next-app` with App Router, TypeScript, Tailwind CSS v4, and ESLint
- TypeScript strict mode confirmed on (`"strict": true` in tsconfig.json)
- `src/` layout in place with `src/app/` as the root app directory
- `@/*` path alias configured pointing to `./src/*`
- Reference docs committed to `docs/` (rubric, prompts library, calibration delta)

## Files added/modified

- `.gitignore` — standard Next.js gitignore
- `README.md` — default create-next-app readme (placeholder)
- `package.json` — project manifest with Next 15, React 19, TypeScript 5, Tailwind 4, ESLint 9
- `package-lock.json` — lockfile
- `next.config.ts` — empty Next.js config (no custom options yet)
- `tsconfig.json` — strict TypeScript config with `@/*` path alias
- `eslint.config.mjs` — ESLint flat config via `eslint-config-next`
- `postcss.config.mjs` — PostCSS config for Tailwind v4
- `src/app/layout.tsx` — root layout component
- `src/app/page.tsx` — default homepage (create-next-app placeholder)
- `src/app/globals.css` — global styles with Tailwind base import
- `src/app/favicon.ico` — default favicon
- `public/*.svg` — default public assets (file, globe, next, vercel, window SVGs)
- `docs/01-celpip-speaking-rubric-reference-v1_2.md` — master rubric reference
- `docs/02-celpip-speaking-prompts-library-v1_0.md` — practice prompts for 8 task types
- `docs/03-celpip-calibration-delta-v1_0.md` — calibration findings (deferred until post-beta)
- `CLAUDE.md` — project build contract (pre-existing, restored after scaffolding)

## Dependencies added

- `next@15.5.15`
- `react@19.1.0`
- `react-dom@19.1.0`
- `typescript@5.9.3` (devDependency)
- `tailwindcss@4.2.4` (devDependency)
- `@tailwindcss/postcss@4.2.4` (devDependency)
- `eslint@9.39.4` (devDependency)
- `eslint-config-next@15.5.15` (devDependency)
- `@eslint/eslintrc@3.3.5` (devDependency)
- `@types/node@20.19.39` (devDependency)
- `@types/react@19.2.14` (devDependency)
- `@types/react-dom@19.2.3` (devDependency)

## Verification performed

- `ls -la` — confirmed all scaffold files present in repo root
- `git log --oneline -5` — confirmed single initial commit `47fc1f4 Initial commit from Create Next App`
- `git show --stat HEAD` — confirmed 26 files added in initial commit, 13 429 insertions
- `npm ls --depth=0` — confirmed all top-level dependencies resolved correctly
- `find src -type f` — confirmed `src/app/` contains `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`
- `tsconfig.json` inspected — `"strict": true` present

## Decisions made

- App Router (not Pages Router) — selected at scaffold time, consistent with CLAUDE.md stack decision
- Tailwind v4 (not v3) — installed by create-next-app@15 default; uses `@tailwindcss/postcss` instead of the v3 plugin pattern
- `src/` directory layout — selected at scaffold time, consistent with CLAUDE.md file organization conventions

## Open items / known issues

- `src/app/page.tsx` still contains the create-next-app placeholder page; will be replaced in Step 2
- `public/` SVG assets are scaffold defaults; may be pruned later
- `docs/research/` directory contains earlier working files not yet reviewed for consolidation

## Lessons learned this step

- `create-next-app@15` treats any pre-existing file in the target directory as a hard conflict and aborts; `CLAUDE.md` had to be moved out temporarily and restored after scaffolding completed.
- Port 3000 was held by a stale `next-server` process (PID 16986) left over from earlier scaffolding runs. `lsof -i` did not detect it on this system; `ss -tlnp` was reliable. Kill pattern that worked: `lsof -ti:3000 | xargs kill -9`.

## Next step

Step 2 of 9 — Basic UI shell (task picker, prompt display)
