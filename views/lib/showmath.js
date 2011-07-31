exports.init = function() {
  
  function avg(doc) {
    var avgs = {"avg":0,"perfd":0,"highest":0}
    for(var i=0,_len=doc.shows.length; i < _len; ++i) {
      if (typeof doc.shows[i].count !== "undefined" && doc.shows[i].count !== null){
        avgs.avg = avgs.avg + doc.shows[i].count;
        avgs.perfd = avgs.perfd + 1
        if (doc.shows[i].count > avgs.highest) {
          avgs.highest = doc.shows[i].count;
        }
      }
    }
    
    if (avgs.perfd !== 0){
      avgs.avg = avgs.avg/avgs.perfd
      avgs.latest = doc.shows[avgs.perfd-1].count
    }
    
    return avgs;
  }
  
  function predict(doc) {
    var avgs = avg(doc);
    var prediction;
    var mult = 1.3;
    
    if (avgs.avg > (doc.capacity*0.9)){
      return doc.capacity;
    }

    if (avgs.perfd >=2) {
      if (doc.shows[avgs.perfd-1].count >= (doc.shows[avgs.perfd-2].count *1.25)) {
        mult = mult + 0.1;
      }
    }
    
    prediction = avgs.highest * mult;
    
    if (prediction > (doc.capacity*0.9)) {
      return doc.capacity;
    }
    return prediction;
  }
  
  function guess(doc,avgs) {
    if (avgs == null) {
      avgs = avg(doc);
    }
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
    "guess":guess,
    "predict":predict
  }
}