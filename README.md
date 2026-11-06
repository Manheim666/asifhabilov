# Asif Habilov — portfolio (Next.js)

A static Next.js site about computer vision work. The hero lets you drag a confidence cut-off over a real wheat model's output. It exports to plain HTML in `out/` and is hosted on GitHub Pages.

No model runs in the browser. Detections are computed once by the scripts below and shipped as JSON, then drawn as SVG over clean images.

```
data/content.js          all text, projects, numbers, links (edit this)
data/wheat.json          wheat detections behind the hero slider
data/bee.json            bee and flower tracks for the clean clip, with visit logic applied
components/Hero.jsx      name, cut-off slider, field photo
components/Work.jsx      the seven projects
components/BeeVisits.jsx video with live track overlay and visit counter
components/Confusion.jsx interactive cassava confusion matrix
components/Sections.jsx  nav, about, path, skills, contact, footer
styles/site.css          colours (top of file), type, layout
app/layout.js            fonts, page title, social preview
public/assets/           images (WebP) and video
scripts/                 export_detections.py, export_bee_tracks.py, bee_visits.py
.github/workflows/deploy.yml  builds and deploys on every push to master
```

## Run and edit
```bash
cd ~/Desktop/Asif_Portfolio
npm install          # first time only
npm run dev          # http://localhost:3000, live reload
```
- **Change text or numbers:** edit `data/content.js`. Keep every metric tied to a repository you can show.
- **Add a project:** add an object to `projects` and put a WebP image (around 1600 px wide) in `public/assets/img/`.
- **Colours:** the `:root` variables in `styles/site.css`.

## Build and test
```bash
NEXT_PUBLIC_BASE_PATH=/asifhabilov npm run build   # writes the static site to out/
```
Serve `out/` under `/asifhabilov/` to test it. Asset paths break at the bare root when built with that base path.

## Deploy
The repository is `Manheim666/asifhabilov`. `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `master`, so merging to `master` puts the site live at https://manheim666.github.io/asifhabilov/.

## Motion and accessibility
- With "reduce motion" on, the slider starts at the shipped cut-off, the bee video stays paused, and smooth scrolling is off.
- Without JavaScript, all content is still rendered (the HTML is static).
- The slider, field buttons and confusion matrix all work from the keyboard.

## Privacy
The page shows only your email, GitHub and city. Your phone number, ID documents and certificate scans are not published.
