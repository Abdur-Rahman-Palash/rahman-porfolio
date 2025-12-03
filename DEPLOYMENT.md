# Deployment Guide

This project is configured to deploy to both **GitHub Pages** and **Render.com**.

## GitHub Pages Deployment

### Setup (One-time)
1. Ensure your repository is public on GitHub.
2. Go to **Settings > Pages** in your GitHub repo.
3. Select "Deploy from a branch" and choose `main` branch, `/docs` folder.
4. Your site will be available at: `https://Abdur-Rahman-Palash.github.io/rahman-porfolio/`

### Deploy
```bash
npm run build:github
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

The `docs/` folder is automatically built with `base: '/rahman-porfolio/'` for the subpath.

---

## Render.com Deployment

### Setup (One-time)
1. Create an account at [render.com](https://render.com)
2. New Static Site > Connect GitHub Repo
3. Select `rahman-porfolio` repository
4. **Build Command**: (leave default or use) `npm install && DEPLOY_TARGET=render npm run build`
5. **Publish Directory**: `dist`
6. Click **Deploy**

Render will automatically pull the `render.yaml` configuration and deploy.

### Manual Deploy
If you want to redeploy manually:
```bash
npm run build:render
# Then push to trigger Render redeploy via GitHub
git add .
git commit -m "Deploy to Render.com"
git push origin main
```

Your site will be available at: `https://rahman-portfolio.onrender.com` (or custom domain)

---

## Environment-Specific Builds

- **GitHub Pages build**: `npm run build:github`
  - Output: `docs/`
  - Base path: `/rahman-porfolio/`
  - Router basename: `/rahman-porfolio`

- **Render.com build**: `npm run build:render`
  - Output: `dist/`
  - Base path: `/`
  - Router basename: `/`

- **Default build** (for dev/testing): `npm run build`
  - Uses `dist/` and root path `/`

---

## How It Works

The `vite.config.js` reads the `DEPLOY_TARGET` environment variable:

- If `DEPLOY_TARGET=github`, it builds to `docs/` with subpath `/rahman-porfolio/`
- If `DEPLOY_TARGET=render` (or not set), it builds to `dist/` with root path `/`

The `src/main.jsx` Router always reads from `window.location.pathname` to auto-detect the correct base path, ensuring routes work on both platforms.

---

## Troubleshooting

### GitHub Pages shows 404 errors
- Check that `base: '/rahman-porfolio/'` is in the Render build output (see `vite.config.js`)
- Ensure the `docs/` folder is committed and pushed to GitHub

### Render.com shows 404 on page refresh
- Verify `render.yaml` has the SPA rewrite rule:
  ```yaml
  routes:
    - path: /*
      destination: /index.html
      match: miss
  ```
- Check that `DEPLOY_TARGET=render` is used in the build command

### Router not working
- For GitHub Pages: Router should have `basename="/rahman-porfolio"`
- For Render.com: Router should have `basename="/"`
- Check `src/main.jsx` BrowserRouter configuration

---

## GitHub Actions (Optional Auto-Deploy)

Create `.github/workflows/deploy.yml` to auto-deploy on push:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build:github
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./docs
      - uses: actions/deploy-pages@v2
```

This auto-deploys to GitHub Pages whenever you push to `main`.

---

## Summary

| Platform | Build Command | Output | Base | URL |
|----------|---------------|--------|------|-----|
| GitHub Pages | `npm run build:github` | `docs/` | `/rahman-porfolio/` | `https://Abdur-Rahman-Palash.github.io/rahman-porfolio/` |
| Render.com | `npm run build:render` | `dist/` | `/` | `https://rahman-portfolio.onrender.com` |

**Both deployments are now fully configured and ready to use!** 🚀
