function(doc) {
  if (doc.type == "show") {
    var calc = require("views/lib/showmath").init()
    avgs = calc.avg(doc)
    guess = calc.guess(doc,avgs)
    
    emit(doc.venue,{"name":doc.name, "avg": avgs.avg, "latest": avgs.latest, "perfd": avgs.perfd, "id": doc._id,"guess":guess})
  }
}