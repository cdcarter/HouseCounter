function(doc,req) {
  doc = JSON.parse(req.body)
  doc.shows.sort(function(x,y) {
    return x.slot - y.slot;
  })
  return [doc,"ok"]
}