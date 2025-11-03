# AltSource Redirector

A tiny, dependency‑free static helper page for launching AltStore Sources (or AltSources) in your preferred sideloading app. Paste or pass an AltSource URL and quickly open it in SideStore, AltStore Classic, Feather, or LiveContainer — or deep‑link straight into an app using a single `r` parameter. Caution: This project is unfinished and the link format is subject to change without notice. This note will be changed when it is finished.

Live page: https://celloserenity.github.io/altsource/

---

## What it does

- Generates “Open in …” buttons for:
  - SideStore
  - AltStore Classic
  - Feather
  - LiveContainer
- Supports one‑tap deep linking via `r` (redirect) parameter.
- Provides convenient actions:
  - Copy Source URL
  - View Source Data (opens the feed URL in a new tab)
- Mobile‑friendly UI with safe‑area insets (great on iOS).
- Zero build step, zero external dependencies — just static HTML + JS.

>[!CAUTION]
>AltSource URLs including question marks (?) or ampersands (&) may encounter issues. I'll look into fixing it if it actually poses a problem for anyone.

---

## How it works

- If no query params are provided, you’ll see a simple form where you can paste a source URL.
- If `?url=…` is present, the page immediately renders buttons that will open that source in supported apps.
- Clicking a button navigates to `?r=…` where `redirect.js` immediately redirects the browser to the app’s custom scheme.
- If `?r=…` is present, the redirect happens immediately.

Files:
- `index.html` — UI, query‑param handling, and link generation.
- `redirect.js` — minimal redirect helper (based on [intradeus/http-protocol-redirector](https://github.com/intradeus/http-protocol-redirector)); reads `r` and calls `window.location.replace(r)`.

---

## Query parameters

- `url` (string, optional)
  - The source/feed URL (http/https). Leading/trailing spaces are trimmed.
  - If the scheme is omitted, `https://` is automatically prefixed.
  - Example values:  
    - `https://apps.altstore.io/`  
    - `apps.altstore.io` (becomes `https://apps.altstore.io`)
- `exclude` (string, optional)
  - Comma‑separated list of buttons to hide. Valid keys:
    - `sidestore`, `altstore`, `feather`, `livecontainer`
  - Example: `exclude=altstore,feather`
- `r` (string, optional)
  - A full URL (often a custom scheme) to redirect to immediately.
  - Used by the generated “Open in …” buttons and can be used directly for deep links.

---

## Examples

Using the hosted page at https://celloserenity.github.io/altsource:

- Render buttons for a source feed:
  - `https://celloserenity.github.io/altsource/?url=https://example.com/source.json`
- Render buttons, hide specific targets:
  - `https://celloserenity.github.io/altsource/?url=https://example.com/source.json&exclude=altstore,feather`
- Direct deep link to SideStore (immediate redirect):
  - `https://celloserenity.github.io/altsource/?r=sidestore://source?url=https://example.com/source.json`
- Direct deep link to AltStore Classic:
  - `https://celloserenity.github.io/altsource/?r=altstore-classic://source?url=https://example.com/source.json`
- Direct deep link to Feather:
  - `https://celloserenity.github.io/altsource/?r=feather://source/https://example.com/source.json`
- Direct deep link to LiveContainer:
  - `https://celloserenity.github.io/altsource/?r=livecontainer://source?url=https://example.com/source.json`

Note: The app schemes above are constructed exactly as this tool generates them.

---

## Security notes

- This page intentionally implements an “open redirect” behavior via `?r=…` so you can deep‑link into custom app schemes. Only share links from sources you trust.
- There is no tracking, analytics, or external requests in this repo. Clipboard access is user‑initiated (Paste/Copy buttons) and subject to browser permissions.

---

## Acknowledgments

- AltStore, SideStore, Feather, and LiveContainer are trademarks of their respective owners. This project is unaffiliated and simply provides convenience links.

---

## License

Licensed under the GNU Affero General Public License v3.0 (AGPL‑3.0).
