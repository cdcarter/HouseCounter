function(doc,req) {
  var ddoc = this;
  
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var calc = require("vendor/showmath").init(ddoc);
  
  doc = calc.avg(doc);
  doc.guess = calc.guess(doc);
  
  if (doc.perfd==0) {
    doc.perfd = "None";
    doc.avg = "None";
    doc.latest = "None";
  }
    
  doc.action = path.rewrite(doc._id)
  doc.list = path.rewrite()
  
  return mustache.to_html(ddoc.templates.webinfo,doc)
}