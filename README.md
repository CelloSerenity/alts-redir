# Repository has been moved to [here.](https://github.com/stikstore/altdirect)

# <img src="/assets/png/Logo_Blue.png?raw=true" alt="AltDirect" height="25"> AltDirect

[![pages-build-deployment](https://github.com/CelloSerenity/altdirect/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/CelloSerenity/altdirect/actions/workflows/pages/pages-build-deployment)

A tiny, dependency‑free static helper page for launching AltStore Sources (AltSources) in your preferred sideloading app. Paste or pass an AltSource feed URL and quickly open it in SideStore, AltStore Classic, Feather, or LiveContainer.

Live page: https://celloserenity.github.io/altdirect/

---
> [!NOTE]
> To distribute notarized AltStore sources (i.e. AltStore PAL sources), utilize `https://api.altstore.io/source/example.com?app=com.developer.myapp` instead of this tool.

## What it does

- Generates “Open in …” buttons for:
  - SideStore
  - AltStore Classic
  - StikStore
  - LiveContainer (currently, only nightly)
  - Feather

- Supports one‑tap deep linking via the `r` (redirect target) parameter together with the `url` parameter.
- Provides convenient actions:
  - Copy Source URL
  - View Source Data (opens the source URL in a new tab)
- Mobile‑friendly UI.

> [!CAUTION]
> AltSource URLs including ampersands (&) may encounter issues due to how URLs are handled by some clients and how the site constructs redirect links. If this causes problems in practice, it may be addressed in a future update.

---

## How it works

- If no query parameters are provided, you’ll see a simple form where you can enter a source URL (with Paste and Go actions).
- If `?url=…` is present, the page renders “Open in …”, "Copy…" and "View…" redirector buttons, excluding redirects defined by the `&exclude=…` parameter. Clicking a button updates the URL to include `r=<target>` while preserving your `url` and `exclude`.
- If both `?url=…` and `&r=…` are present, `redirect.js` immediately redirects the browser to the app’s custom scheme based on `r`.

Files:
- `index.html` — UI, query‑param handling, and link generation.
- `redirect.js` — minimal redirect helper that reads `r` and `url`, maps `r` to an app scheme, and performs `window.location.replace(...)`.
- `assets` folder — contains pngs and svgs for the logo, as well as "Add AltSource" and "Download .ipa" buttons.

---

## Usage

### Creating Your Link
Create your link using the query parameters below. These parameters are stable and will not be changed in a way that requires updates to your links.

#### Query Parameters
- `?url` (string, optional)
  - The source/feed URL (http/https). Leading/trailing spaces are trimmed (including `%20`) and, if the scheme is omitted, `https://` is automatically prefixed.
  - Example values:
    - `https://apps.altstore.io/`
    - `apps.altstore.io` (becomes `https://apps.altstore.io`)
- `&exclude` (string, optional)
  - Comma‑separated list of buttons to hide. Valid keys:
    - `sidestore`, `altstore`, `stikstore`, `livecontainer`, `feather`
  - Example: `&exclude=altstore,feather`
- `&r` (string, optional)
  - Valid keys matches `exclude`. Only one entry.
  - Example: `r=sidestore`
  - Must be used with `url` present. When present, the page immediately redirects using these mappings:
    - `sidestore` → `sidestore://source?url=<url>`
    - `altstore` → `altstore-classic://source?url=<url>`
    - `stikstore` → `stikstore://add-source?url=<url>`
    - `livecontainer` → `livecontainer://source?url=<url>`
    - `feather` → `feather://source/<url>`
    

### Image Embedding

Create a link using the parameters outlined above and insert it into the following code snippet (replace the example URL with your source). If you wish, you can also embed a direct download link to an .ipa (replace `https://example.com/app.ipa` with your link) for image consistency:

```html
<!-- you can set the alighnment here to left/center/right -->
<h1 align="left">
<a href="https://celloserenity.github.io/altdirect/?url=https://example.com/source.json"><img src="https://github.com/CelloSerenity/altdirect/blob/main/assets/png/AltSource_Blue.png?raw=true" target="_blank" width="200">
</a>
<a href="https://example.com/app.ipa"><img src="https://github.com/CelloSerenity/altdirect/blob/main/assets/png/Download_Blue.png?raw=true" target="_blank" width="200">
</a>
</h1>
```

Together, they appear as:

<h1 align="left">
<a href="https://celloserenity.github.io/altdirect/?url=https://example.com/source.json" target="_blank"><img src="https://github.com/CelloSerenity/altdirect/blob/main/assets/png/AltSource_Blue.png?raw=true" width="200">
</a>
<a href="https://example.com/app.ipa" target="_blank"><img src="https://github.com/CelloSerenity/altdirect/blob/main/assets/png/Download_Blue.png?raw=true" width="200">
</a>
</h1>

Pretty nice, huh?

>[!NOTE]
>The URL format and asset links should never be modified in a way that breaks site functionality or requires action on your end. In addition, I don't see github.io being deprecated anytime soon, so the hosted page is expected to remain available.

---

## Examples

Using the hosted page at https://celloserenity.github.io/altdirect:

- Display redirectors for an AltStore Source:
  - `https://celloserenity.github.io/altdirect/?url=https://example.com/source.json`
- Hide certain app redirector:
  - `https://celloserenity.github.io/altdirect/?url=https://example.com/source.json&exclude=altstore,feather`
- Direct deep link to SideStore (automatic redirect):
  - `https://celloserenity.github.io/altdirect/?url=https://example.com/source.json&r=sidestore`
- All three:
  - `https://celloserenity.github.io/altdirect/?url=https://example.com/source.json&r=sidestore&exclude=feather,livecontainer`

---

## Security and privacy

- This page intentionally implements an “open redirect”-style flow via `r` + `url` so you can deep‑link into custom app schemes. Only open links from sources you trust. I am not liable for any misuse or adverse effects resulting from following links provided by others.
- There is no tracking, analytics, or external requests in this repo (besides the url redirect to your sideloader). Clipboard access is user‑initiated (Paste/Copy buttons) and subject to browser permissions.

---

## Acknowledgments

- [AltStore](https://altstore.io), [SideStore](https://sidestore.io), StikStore, [LiveContainer](https://livecontainer.github.io/), and [Feather](https://github.com/khcrysalis/Feather) are trademarks of their respective owners. This project is (as of yet) unaffiliated and simply provides convenience links.
- [Stephen](https://github.com/StephenDev0) for new UI.
- [Transistor](https://github.com/transistor-exe) for the logo and link assets.
- [Intradeus](https://github.com/intradeus), whose [redirector](https://github.com/intradeus/http-protocol-redirector) the project is based on.
- [Riley Testut](https://github.com/rileytestut) for the AltStore diamond and invention of AltSources.
- [Meshal](https://github.com/Meshal-GIT) for the catchy name.

---

## License

Licensed under the GNU Affero General Public License v3.0 (AGPL‑3.0).
