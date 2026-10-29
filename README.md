# Asif Habilov — portfolio website

This is a static site made of plain HTML, CSS and a few lines of JavaScript. It has no build step and no dependencies, so it runs on any static host.

```
Asif_Portfolio/
├── index.html            all page content (edit text here)
├── 404.html              "page not found" page for GitHub Pages
├── .nojekyll             tells GitHub Pages to serve files as-is
├── assets/
│   ├── styles.css        colours (top of file), type, layout
│   ├── main.js           mobile menu + footer year
│   ├── favicon.svg
│   ├── fonts/            Schibsted Grotesk (SIL Open Font License, see OFL.txt)
│   └── img/              project images (WebP, real outputs from the repos)
└── scripts/check.mjs     automated QA (console errors, broken images/links, overflow, mobile menu)
```

## Run it locally

```bash
cd ~/Desktop/Asif_Portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Edit content

- **Text:** everything is in `index.html`. Each section is marked with a comment (`<!-- Selected projects -->` and so on).
- **Add a project:** copy one `<article class="project">…</article>` block, change the text and image, and keep the metrics to numbers your repository actually reports.
- **Images:** export as WebP around 1200–1600 px wide (`python3 -c "from PIL import Image; Image.open('in.png').save('out.webp', quality=80)"`), put them in `assets/img/`, and set real `width` / `height` and an `alt` text.
- **Colours:** the variables at the top of `assets/styles.css`. The dark-mode values are set twice: once in the `prefers-color-scheme` block and once in `[data-theme="dark"]`.
- **LinkedIn:** when you have a profile URL, un-comment the LinkedIn line in the Contact section.

## Test before publishing

```bash
cd ~/Desktop/Asif_Portfolio && python3 -m http.server 8000 &
cd ~/Desktop/Asif_Career_Kit/.tools          # Playwright is installed here
cp ~/Desktop/Asif_Portfolio/scripts/check.mjs . && node check.mjs http://localhost:8000/
```

It prints `All checks passed` when there are no console errors, failed requests, broken images, dead in-page anchors, horizontal scrolling, or broken external links, and when the mobile menu works. Screenshots are saved as `shot-*.png`.

## Deploy (free): GitHub Pages user site

Your Wildfire dashboard already lives at `https://manheim666.github.io/Wildfire/`. A **user site** repository named `Manheim666.github.io` serves the root address `https://manheim666.github.io/`, and it does **not** break `/Wildfire/`, because project sites keep working under their own paths.

1. Review the page locally first. Nothing has been pushed anywhere yet.
2. Create a **public** repository named exactly `Manheim666.github.io` on GitHub (no README).
3. Push:
   ```bash
   cd ~/Desktop/Asif_Portfolio
   git add -A && git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/Manheim666/Manheim666.github.io.git
   git push -u origin main
   ```
4. On GitHub, go to **Settings → Pages → Build and deployment → Source: Deploy from a branch**, then choose **Branch `main`, folder `/ (root)`**.
5. After 1–2 minutes, open `https://manheim666.github.io/`.

**Cost:** GitHub Pages is free for public repositories. The site uses no paid services.

## Optional custom domain

- A domain such as `asifhabilov.dev` or `.com` costs about USD 10–15 per year. Check the current price at a registrar like Cloudflare Registrar, Porkbun or Namecheap. This is optional, and the github.io address is fine for applications.
- To connect it: add a `CNAME` file containing the domain, create DNS `A` records pointing to GitHub's Pages IPs (listed in GitHub's documentation under "Managing a custom domain for your GitHub Pages site"), then tick **Enforce HTTPS**.

## Alternatives

Netlify and Cloudflare Pages are also free. Drag the folder onto their dashboard, or connect the GitHub repository.

## Maintenance

- After each new project or result, update its block, run the check script, then commit and push.
- Re-check the numbers whenever you retrain a model.
- Every 3 months, check that the external links still work (the check script does this).

## Privacy

The page shows only your email, GitHub and city. Your phone number, ID documents, transcripts and certificate scans are deliberately **not** published.
