exports.init = function(ddoc) {
  var _ = require("vendor/underscore")
  
  function avg(doc) {
    doc.avg = 0;
    doc.perfd = 0;
    for(var i=0,_len=doc.shows.length; i < _len; ++i) {
      if (typeof doc.shows[i].count !== "undefined" && doc.shows[i].count !== null){
        doc.avg = doc.avg + doc.shows[i].count;
        doc.perfd = doc.perfd + 1
      }
      doc.shows[i].idx = i
    }
    
    if (doc.perfd !== 0){
      doc.avg = doc.avg/doc.perfd
      doc.latest = doc.shows[doc.perfd-1].count
    }
    
    return doc;
  }
  
  function guess(doc) {
    if(typeof doc.perfd === "undefined") {
      doc = avg(doc)
    }    
    var needs = {"side":doc["side-min"],"box":doc["box-min"],"usher":doc["ush-min"]}
    
    if(doc.perfd === 0 ) {
      return needs;
    }
    if(doc.avg >= (doc.capacity*0.4)) {
      needs = addVol(needs,doc);
    }
    if(doc.avg >= (doc.capacity*0.5)) {
      needs = addVol(needs,doc);
    }
    if(doc.avg >= (doc.capacity*0.6)) {
      needs = addVol(needs,doc);
    }
    if(doc.avg >= (doc.capacity*0.7)) {
      needs = addVol(needs,doc);
    }
    return needs;
  }
  
  function addVol(current,counts) {
    if ((current["side"]===counts["side-max"])&&(current["box"]===counts["box-max"])&&(current["usher"]===counts["ush-max"])) {
      return current;
    }
    if (current["box"] !== counts["box-max"]) {
      current.box++;
      return current
    }
    if (current["side"] !== counts["side-max"]) {
      current.side++;
      return current
    }
    if (current["usher"] !== counts["ush-max"]) {
      current.ush++;
      return current
    }
  }
  
  return {
    "avg": avg,
    "guess":guess
  }
}