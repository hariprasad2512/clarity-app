# Clarity — Tasks with clarity

Landing site for [Clarity](https://github.com/hariprasad2512/clarity_flutter) — the open-source, local-first Apple Reminders alternative for macOS, Windows, Android, iOS and Linux.

Live site: https://hariprasad2512.github.io/clarity-app/

## Run locally

```bash
npm install
npm run dev      # → http://localhost:5173
```

Prod check:

```bash
npm run build
npm run preview  # → http://localhost:4173
npm run typecheck
```

## Deploy (GitHub Pages)

Pushes to `main` auto-deploy via `.github/workflows/deploy.yml` (vite build → GitHub Pages).

First-time setup: repo Settings → Pages → Source: **GitHub Actions**.

## Project structure

- `src/App.tsx` — landing page (hero, features, platforms, download, footer)
- `public/clarity_store_icon_512.png` — logo / favicon source
- `vite.config.ts` — `base: '/clarity-app/'` for Pages subpath
