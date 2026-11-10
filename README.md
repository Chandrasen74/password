# password

Prank password-protected secret page, rebuilt as a React + Vite app with [coss ui](https://github.com/cosscom/ui) components and an animated [GradientASCII](https://reactbits.dev/) background.

**Git repo:** https://github.com/Chandrasen74/password.git

## About

A prank "password protected" page — type `password` to get in, pick a grade, and the background shifts between yellow (grade 9) and red (grade 10) with an animated ASCII gradient. Built as a React + Vite single page, deployed to GitHub Pages from `docs/`, with commits SSH-signed so they show as Verified.

## Live site

[https://chandrasen74.github.io/password/](https://chandrasen74.github.io/password/)

Hosted on GitHub Pages from the `docs/` folder on `main`.

## What it does

- Enter password `password` to pass the gate (with a few joke responses).
- Pick a grade — grade 9 theme turns the background yellow, grade 10 turns it red. The whole page (mesh blobs, ASCII gradient, and text colors) fades between themes.
- "Copy" buttons swap email/password as a prank.
- Escape closes the tab.

## Stack

- React 19, TypeScript, Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- [coss ui](https://github.com/cosscom/ui) components on `@base-ui/react`: Button, Input, Card, Alert, Field
- [GradientASCII](https://reactbits.dev/) — WebGL2 animated ASCII gradient background
- `lucide-react` icons

## Local development

```bash
npm install
npm run dev      # localhost:5173
npm run build    # outputs to docs/ (base "./", ready for GitHub Pages)
npm run preview  # serve the build locally
```

## Repository structure

```
docs/            # built site (served by GitHub Pages)
src/
  App.tsx        # app shell + views + grade themes
  components/
    GradientASCII.jsx   # animated background component
    ui/          # coss ui component copies
  index.css      # Tailwind v4 + theme tokens + mesh background
index.html
package.json
vite.config.ts
tsconfig.json
```

## Commit signing

Commits are SSH-signed and show as **Verified** on GitHub.
