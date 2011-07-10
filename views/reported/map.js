function(doc) {
  if(doc.type=="show") {
    for(var i = 0, _len = doc.shows.length;i<_len;i++) {
      emit(doc.shows[i].slot,doc.shows[i].count)
    }
  }
}