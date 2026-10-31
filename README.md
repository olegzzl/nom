# Neo Orbital Meditation

A standalone, responsive RU/EN version of the Neo Orbital Meditation website. It uses plain HTML, CSS and JavaScript and has no Wabi SDK or build-step dependency.

## Pages

- `index.html` - the main page: the practice, the mantra, benefits, about Oleg, approach and contact.
- `meditations.html` - eleven guided practice descriptions (microcosmic orbit, metta, mudhita, shamatha, vipassana, chakras, spinal breathing, shambhavi mudra and three mindfulness practices), each with its own illustration in `assets/meditations/`.

Both pages share `styles.css` and the RU/EN language switch. Navigation is rendered by `script.js` on the main page and by `meditations.js` on the meditations page.

## Preview locally

Open `index.html` in a modern browser. The hero artwork is included in `assets/`, so the page does not need an internet connection for its main image. The language choice is saved in the browser when local storage is available.

## Publish with GitHub Pages

The site files are in the repository root. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub Pages will show the public site address when deployment finishes. No site has been published by this upload alone.

Contact: `olegzzl@zohomail.eu`
