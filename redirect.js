const sp = new URLSearchParams(window.location.search)
const r = (sp.get("r") || "").toLowerCase()
const sourceUrl = sp.get("url")

function resolveTarget(kind, s) {
  if (!kind || !s) return ""
  if (kind === "sidestore") return "sidestore://source?url=" + s
  if (kind === "altstore") return "altstore-classic://source?url=" + s
  if (kind === "feather") return "feather://source/" + s
  if (kind === "livecontainer") return "livecontainer://source?url=" + s
  return ""
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
