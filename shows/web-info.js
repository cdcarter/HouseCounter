function(doc,req) {
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var ddoc = this;
  
  doc.avg = 0;
  doc.perfd = 0;
  for(var i=0,_len=doc.shows.length; i < _len; ++i) {
    if (typeof doc.shows[i].count !== "undefined" && doc.shows[i].count !== null){
      doc.avg = doc.avg + doc.shows[i].count;
      doc.perfd = doc.perfd + 1
    }
    if (doc.shows[i].time[1] == 0) {
      doc.shows[i].time[1] = "00"
    }
    doc.shows[i].time = doc.shows[i].time.join(":")
    doc.shows[i].idx = i
    
    doc.shows[i].day = ddoc.days[doc.shows[i].day]
  }
  
  if (doc.perfd == 0){
    doc.avg = "None"
    doc.latest = "None"
    doc.perfd = "None"
  } else {
    doc.avg = doc.avg/doc.perfd
    doc.latest = doc.shows[doc.perfd-1].count
  }
    
  doc.action = path.rewrite(doc._id)
  
  return mustache.to_html(ddoc.templates.webinfo,doc)
}