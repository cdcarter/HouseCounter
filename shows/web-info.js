function(doc,req) {
  var ddoc = this;
  
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var calc = require("views/lib/showmath").init(ddoc);
  
  doc.avgs = calc.avg(doc);
  doc.guess = calc.guess(doc,doc.avgs);
  
  for (var i=0, _len = doc.shows.length; i<_len; i++) {
    doc.shows[i].time = ddoc.data.slots[doc.shows[i].slot]
  }
    
  if (doc.avgs.perfd==0) {
    doc.avgs.perfd = "None";
    doc.avgs.avg = "None";
    doc.avgs.latest = "None";
  }
    
  doc.action = path.rewrite(doc._id)
  doc.list = path.rewrite()
  
  return mustache.to_html(ddoc.templates.webinfo,doc)
}