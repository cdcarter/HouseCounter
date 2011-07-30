function(doc) {
  if (doc.type == "show") {
    var calc = require("views/lib/showmath").init()
    avgs = calc.avg(doc)
    guess = calc.guess(doc,avgs)
    
    if (avgs.perfd==0) {
      avgs.perfd = "None";
      avgs.avg = "None";
      avgs.latest = "None";
    }
    
    emit(doc.venue,{"name":doc.name, "avg": avgs.avg, "latest": avgs.latest, "perfd": avgs.perfd, "id": doc._id,"guess":guess})
  }
}