# Sujith Kumar — Personal profile

A responsive, single-page profile inspired by LILA’s dark green palette, generous typography, and scientific visual language. Original canvas artwork; no LILA assets are reused.

## Run locally

```sh
npm install
npm run dev
```

## Static deployment (no Node on the host)

The committed `docs/` folder is the complete production site: HTML, CSS, JavaScript, and images. It needs only static hosting; no Node runtime, backend, or package installation is required on the server.

### GitHub Pages

1. Push this repository, including `docs/`, to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the branch containing your commit and the **/docs** folder, then save.

A repository named `sujithsj.github.io` publishes at `https://sujithsj.github.io/`. Another repository publishes at `https://sujithsj.github.io/REPOSITORY/`. Relative asset URLs support either location.

For other static hosts, upload the **contents** of `docs/` to the web root. No build command is needed on the host.

### Update the site

Edit the source files, then rebuild locally and commit the updated output:

```sh
npm ci
npm run build
git add index.html src assets vite.config.js package.json package-lock.json docs
git commit -m "Update profile"
git push
```

Node is only a local build tool. The built site remains deployable without it. Treat `docs/` as generated output; make changes in the source files and rebuild.

### Preview the production files without Node

```sh
python3 -m http.server 8000 --directory docs
```

Open `http://localhost:8000`. Serve the site over HTTP/HTTPS rather than opening HTML with a `file://` URL.

## Content and customization

- `index.html`: biography, expertise, recommendations, contact details, and metadata.
- `src/style.css`: responsive layouts and visual theme.
- `src/main.js`: original particle sculpture, mobile navigation, email clipboard, and reduced-motion behavior.
- `assets/sujith.jpeg`: portrait from the previous profile.

Primary positioning and AI/life sciences content supplied directly by Sujith, with a Forward Deployed AI Engineer focus. Supporting content sources: https://sujithsj.github.io/myprofile/ and the publicly accessible portion of https://www.linkedin.com/in/sujith-kumar-sirisanagandla-76898841/. Recommendations are verbatim excerpts from the old profile. No unverified employment dates, projects, or achievements were added.

The site uses Google Fonts with system fallbacks. Email and LinkedIn links work without a backend. The copy-email button requires a secure context (HTTPS or localhost).
