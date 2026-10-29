# Asif Habilov — portfolio (Next.js)

A static Next.js site with smooth scrolling (Lenis) and scroll-driven animation (GSAP + ScrollTrigger). It exports to plain HTML in `out/` and is hosted free on GitHub Pages.

```
data/content.js        ← ALL text, projects, numbers, links (edit this)
components/Sections.jsx  page sections (markup)
components/Motion.jsx    all animation: intro, hero, horizontal work scroller, counters, marquee, cursor
styles/globals.css       colours (top of file), type, layout
app/layout.js            fonts, page title, social preview
public/assets/           images (WebP) and the hero video (real Bee-A-Hero tracking output)
scripts/check.mjs        browser QA (errors, broken images/links, overflow, reduced motion)
.github/workflows/deploy.yml  builds and deploys on every push to main
```

## Run and edit
```bash
cd ~/Desktop/Asif_Portfolio
npm install          # first time only
npm run dev          # http://localhost:3000, live reload
```
- **Change text or numbers:** edit `data/content.js`. Keep every metric tied to a repository you can show.
- **Add a project:** add an object to `projects` and put a WebP image (around 1600 px wide) in `public/assets/img/`.
- **Add LinkedIn:** un-comment `linkedin` in `data/content.js`. It appears in Contact automatically.
- **Colours:** the `:root` variables in `styles/globals.css`.

## Build and test
```bash
npm run build                              # writes the static site to out/
(cd out && python3 -m http.server 4173)    # serve it
cd ~/Desktop/Asif_Career_Kit/.tools && cp ~/Desktop/Asif_Portfolio/scripts/check.mjs . && node check.mjs http://localhost:4173/
```
`check.mjs` loads the page at desktop, tablet, mobile and reduced-motion settings. It prints `All checks passed` when there are no console errors, failed requests, broken images, hidden content, horizontal overflow or dead links.

## Deploy (free)
1. Create a **public** GitHub repository named exactly `Manheim666.github.io`.
2. Push:
   ```bash
   git remote add origin https://github.com/Manheim666/Manheim666.github.io.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages → Source** and choose **GitHub Actions**. The included workflow builds and deploys automatically on every push.
4. The site goes live at `https://manheim666.github.io/`, and the Wildfire dashboard keeps working at `/Wildfire/`.

**Cost:** free. A custom domain is optional (about USD 10–15 a year). Add a `public/CNAME` file containing the domain, then set its DNS records as described in GitHub's "custom domain" docs.

## Motion and accessibility
- Visitors with "reduce motion" turned on get a static page: no intro, no smooth scroll, everything visible.
- Without JavaScript, all content is still rendered (the HTML is static).
- The bracket cursor only appears on mouse or trackpad devices.

## Privacy
The page shows only your email, GitHub and city. Your phone number, ID documents and certificate scans are not published.
