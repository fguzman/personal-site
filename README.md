# Personal Site (Vite + React + Tailwind)

A minimal personal site with a clean landing page and a Resume subview (`#resume`).

## Local dev
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Deploy on Vercel (no terminal required)
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → Import Git Repository.
3. Keep defaults, click Deploy.
4. Add your custom domain in Vercel and update DNS in Squarespace.

## Notes
- Edit content in `src/App.tsx` (`profile`, `projects`, `writings`, `resume`).
- Resume link uses `#resume` to render an in-app resume page. For a PDF, drop `resume.pdf` into `/public` and link to `/resume.pdf`.
