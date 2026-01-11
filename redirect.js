const sp = new URLSearchParams(window.location.search)
const r = (sp.get("r") || "").toLowerCase()
const sourceUrl = sp.get("url")

const schemes = {
  sidestore: s => "sidestore://source?url=" + s,
  altstore: s => "altstore-classic://source?url=" + s,
  stikstore: s => "stikstore://add-source?url=" + s,
  livecontainer: s => "livecontainer://source?url=" + s,
  feather: s => "feather://source/" + s
}

function resolveTarget(kind, s) {
  const fn = schemes[kind]
  return fn && s ? fn(s) : ""
}

const target = resolveTarget(r, sourceUrl)

function afterFirstPaint(fn) {
  const raf = window.requestAnimationFrame
  if (raf) {
    raf(() => raf(() => fn()))
  } else {
    setTimeout(fn, 100)
  }
}

function scheduleRedirect() {
  if (!target) return
  afterFirstPaint(() => {
    setTimeout(() => {
      window.location.replace(target)
    }, 60)
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", scheduleRedirect)
} else {
  scheduleRedirect()
}
