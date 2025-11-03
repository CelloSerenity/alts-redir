const sp = new URLSearchParams(window.location.search)
const r = (sp.get("r") || "").toLowerCase()
const sourceUrl = sp.get("url")
if (r && sourceUrl) {
  let target = ""
  if (r === "sidestore") target = "sidestore://source?url=" + sourceUrl
  else if (r === "altstore") target = "altstore-classic://source?url=" + sourceUrl
  else if (r === "feather") target = "feather://source/" + sourceUrl
  else if (r === "livecontainer") target = "livecontainer://source?url=" + sourceUrl
  if (target) window.location.replace(target)
}
