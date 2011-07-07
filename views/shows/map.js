function(doc) {
  if (doc.type == "show") {
    avg = 0;
    perfd = 0;
    for(var i=0,_len=doc.shows.length; i < _len; ++i) {
      if (typeof doc.shows[i].count !== "undefined" && doc.shows[i].count !== null){
        avg = avg + doc.shows[i].count;
        perfd = perfd + 1
      }
    }
    
    if (perfd == 0){
      avg = "None"
      latest = "None"
      perfd = "None"
    } else {
      avg = avg/perfd
      latest = doc.shows[perfd-1].count
    }
    
    emit(doc.venue,{"name":doc.name, "avg": avg, "latest": latest, "perfd": perfd, "id": doc._id})
  }
}