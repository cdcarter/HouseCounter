function(doc) {
  if (doc.type == "show") {
    var calc = require("views/lib/showmath").init()
    var prediction = calc.predict(doc);
    for (var i = 0, _len = doc.shows.length; i < _len; i++) {
      emit([doc.shows[i].slot,doc.venue,doc.name],prediction)
    }
  }
}