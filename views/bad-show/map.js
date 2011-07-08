function(doc) {
  if(doc.shows.length != 5) {
    emit(doc._id,null)
  }
}