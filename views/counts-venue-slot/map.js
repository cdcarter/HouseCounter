function(doc) {
  if(doc.type=="show") {
    for(var i = 0, _len = doc.shows.length;i<_len;i++) {
      emit([doc.venue,doc.shows[i].slot],[doc.shows[i].count,doc.name,doc._id])
    }
  }
}