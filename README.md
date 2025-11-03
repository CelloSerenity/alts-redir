# AltDirect

A tiny, dependency‑free static helper page for launching AltStore Sources (AltSources) in your preferred sideloading app. Paste or pass an AltSource feed URL and quickly open it in SideStore, AltStore Classic, Feather, or LiveContainer.

Live page: https://celloserenity.github.io/altdirect/

---

## What it does

- Generates “Open in …” buttons for:
  - SideStore
  - AltStore Classic
  - Feather
  - LiveContainer
- Supports one‑tap deep linking via the `r` (redirect target) parameter together with the `url` parameter.
- Provides convenient actions:
  - Copy Source URL
  - View Source Data (opens the feed URL in a new tab)
- Mobile‑friendly UI.
- Zero build step, zero external dependencies — just static HTML + JS.

>[!CAUTION]
>AltSource URLs including question marks (?) or ampersands (&) may encounter issues. I’ll look into fixing it if it actually poses a problem for anyone.

---

## How it works

- If no query params are provided, you’ll see a simple form where you can paste a source URL (with Paste and Go actions).
- If `?url=…` is present, the page renders “Open in …” buttons. Clicking a button updates the URL to include `r=<target>` while preserving your `url` (and `exclude` if present).
- If both `?r=…` and `?url=…` are present, `redirect.js` immediately redirects the browser to the app’s custom scheme based on `r`.

Files:
- `index.html` — UI, query‑param handling, and link generation.
- `redirect.js` — minimal redirect helper that reads `r` and `url`, maps `r` to an app scheme, and performs `window.location.replace(...)`.

---

## Query parameters

- `url` (string, optional)
  - The source/feed URL (http/https). Leading/trailing spaces are trimmed (including `%20`) and, if the scheme is omitted, `https://` is automatically prefixed.
  - Example values:
    - `https://apps.altstore.io/`
    - `apps.altstore.io` (becomes `https://apps.altstore.io`)
- `exclude` (string, optional)
  - Comma‑separated list of buttons to hide. Valid keys:
    - `sidestore`, `altstore`, `feather`, `livecontainer`
  - Example: `exclude=altstore,feather`
- `r` (string, optional)
  - One of: `sidestore`, `altstore`, `feather`, `livecontainer`
  - Must be used together with `url`. When present, the page immediately redirects using these mappings:
    - `sidestore` → `sidestore://source?url=<url>`
    - `altstore` → `altstore-classic://source?url=<url>`
    - `feather` → `feather://source/<url>`
    - `livecontainer` → `livecontainer://source?url=<url>`

---

## Examples

Using the hosted page at https://celloserenity.github.io/altdirect:

- Render buttons for a source feed:
  - `https://celloserenity.github.io/altdirect/?url=https://example.com/source.json`
- Render buttons, hide specific targets:
  - `https://celloserenity.github.io/altdirect/?url=https://example.com/source.json&exclude=altstore,feather`
- Direct deep link to SideStore (immediate redirect):
  - `https://celloserenity.github.io/altdirect/?r=sidestore&url=https://example.com/source.json`
- Direct deep link to AltStore Classic:
  - `https://celloserenity.github.io/altdirect/?r=altstore&url=https://example.com/source.json`
- Direct deep link to Feather:
  - `https://celloserenity.github.io/altdirect/?r=feather&url=https://example.com/source.json`
- Direct deep link to LiveContainer:
  - `https://celloserenity.github.io/altdirect/?r=livecontainer&url=https://example.com/source.json`

Note: The app schemes above are constructed exactly as this tool generates them.

---

## Security notes

- This page intentionally implements an “open redirect”-style flow via `r` + `url` so you can deep‑link into custom app schemes. Only share links from sources you trust.
- There is no tracking, analytics, or external requests in this repo. Clipboard access is user‑initiated (Paste/Copy buttons) and subject to browser permissions.

---

## Acknowledgments

- AltStore, SideStore, Feather, and LiveContainer are trademarks of their respective owners. This project is unaffiliated and simply provides convenience links.
- [@Transistor](https://github.com/transistor-exe) for the logos
- [@Meshal](https://github.com/Meshal-GIT) for the catchy name ;)

---

## License

Licensed under the GNU Affero General Public License v3.0 (AGPL‑3.0).
