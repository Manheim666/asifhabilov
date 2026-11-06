# Asif Habilov — portfolio (Next.js)

A static Next.js site about computer vision work. The hero lets you drag a confidence cut-off over a real wheat model's output. It exports to plain HTML in `out/` and is hosted on GitHub Pages.

No model runs in the browser. Detections are computed once by the scripts below and shipped as JSON, then drawn as SVG over clean images.

```
data/content.js          all text, projects, numbers, links (edit this)
data/wheat.json          wheat detections behind the hero slider
data/bee.json            bee and flower tracks for the clean clip, with visit logic applied
components/Nav.jsx       floating nav, current section, dark and light switch
components/Hero.jsx      name, cut-off slider, field photo with pointer read-out
components/Ticker.jsx    moving row of headline scores, each opens its project
components/Work.jsx      number tabs, seven strips, opens the panel from the URL hash
components/ProjectPanel.jsx  the project overlay (loaded only when a project opens)
components/BeeVisits.jsx video with live track overlay and visit counter
components/Confusion.jsx interactive confusion matrix
components/Interactive.jsx  tile light, Baku clock, GPA count, copy email
components/Tools.jsx     tool names; pointing at one lists the projects that used it
components/Sections.jsx  about, path, contact, footer
styles/site.css          colours for both themes and type scale (top of file), layout
app/layout.js            fonts (Saira, Inter), saved-theme script, page title, social preview
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
- **Colours:** the variables at the top of `styles/site.css`, including `--band` for the contact section. Dark is on `:root`; light appears twice, for the system setting and for the switch, so change both. Each project's own colour is `accents` in `data/content.js`.
- **Link to one project:** add its id to the address, for example `/asifhabilov/#work/wheat`.

## Build and test
```bash
NEXT_PUBLIC_BASE_PATH=/asifhabilov npm run build   # writes the static site to out/
```
Serve `out/` under `/asifhabilov/` to test it. Asset paths break at the bare root when built with that base path.

## Deploy
The repository is `Manheim666/asifhabilov`. `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `master`, so merging to `master` puts the site live at https://manheim666.github.io/asifhabilov/.

## Motion and accessibility
- With "reduce motion" on, the slider starts at the shipped cut-off, the ticker stops and scrolls by hand, the bee video stays paused, numbers appear without counting, and smooth scrolling is off.
- Without JavaScript the page still shows everything except the project panels, which need it. A plain list of code links takes their place.
- The slider, field buttons, strips and confusion matrix all work from the keyboard. In a panel, Esc closes, the left and right arrows change project, and focus returns to the strip. The browser Back button closes it too.
- The theme follows the system until someone uses the switch; the choice is saved in `localStorage` as `theme:v1`.

## Privacy
The page shows only your email, GitHub and city. Your phone number, ID documents and certificate scans are not published.
