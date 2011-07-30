exports.init = function() {
  
  function avg(doc) {
    var avgs = {"avg":0,"perfd":0}
    for(var i=0,_len=doc.shows.length; i < _len; ++i) {
      if (typeof doc.shows[i].count !== "undefined" && doc.shows[i].count !== null){
        avgs.avg = avgs.avg + doc.shows[i].count;
        avgs.perfd = avgs.perfd + 1
      }
    }
    
    if (avgs.perfd !== 0){
      avgs.avg = avgs.avg/avgs.perfd
      avgs.latest = doc.shows[avgs.perfd-1].count
    }
    
    return avgs;
  }
  
  function guess(doc,avgs) {
    var needs = {"side":doc["side-min"],"box":doc["box-min"],"usher":doc["ush-min"]}
    
    if(avgs.perfd === 0 ) {
      return needs;
    }
    if(avgs.avg >= (doc.capacity*0.4)) {
      needs = addVol(needs,doc);
    }
    if(avgs.avg >= (doc.capacity*0.5)) {
      needs = addVol(needs,doc);
    }
    if(avgs.avg >= (doc.capacity*0.6)) {
      needs = addVol(needs,doc);
    }
    if(avgs.avg >= (doc.capacity*0.7)) {
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