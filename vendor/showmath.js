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
      
      doc.shows[i].time = ddoc.data.slots[doc.shows[i].slot]
    }
    
    if (doc.perfd == 0){
      doc.avg = "None"
      doc.latest = "None"
      doc.perfd = "None"
    } else {
      doc.avg = doc.avg/doc.perfd
      doc.latest = doc.shows[doc.perfd-1].count
    }
    
    return doc;
  }
  
  function guess(doc) {
    if(typeof doc.perfd === "undefined") {
      doc = avg(doc)
    }
    var venue = _.detect(ddoc.data.venues["by-name"],function(v){return v.name==doc.venue})
    var counts = _.detect(ddoc.data.venues.counts,function(v){return v.short==venue.short})
    
    var needs = {"side":counts["side-min"],"box":counts["box-min"],"usher":counts["ush-min"]}
    
    if(doc.perfd === "None" ) {
      return needs;
    }
    if(doc.avg >= (venue.capacity*0.4)) {
      needs = addVol(needs,counts);
    }
    if(doc.avg >= (venue.capacity*0.5)) {
      needs = addVol(needs,counts);
    }
    if(doc.avg >= (venue.capacity*0.6)) {
      needs = addVol(needs,counts);
    }
    if(doc.avg >= (venue.capacity*0.7)) {
      needs = addVol(needs,counts);
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