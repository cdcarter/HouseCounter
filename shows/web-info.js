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
    doc.shows[i].idx = i
    
    doc.shows[i].time = ddoc.slots[doc.shows[i].slot]
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
  doc.list = path.rewrite()
  
  return mustache.to_html(ddoc.templates.webinfo,doc)
}