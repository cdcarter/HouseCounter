function(doc,req) {  
  var mustache = require('vendor/couchapp/lib/mustache');
  var path = require("vendor/couchapp/lib/path").init(req);
  var ddoc = this;  
  
  for(var i = 0, _len = doc.shows.length; i < _len; i++){
    var count = req.form["show"+i];
    if (count != "" && count != " "){
      doc.shows[i].count = Number(count);
    } else {
      doc.shows[i].count = null;
    }
  }
  
  var resp = {'headers': {"Content-Type":"text/html"}};
  
  resp.body = mustache.to_html(ddoc.templates.redirect, {'link': path.rewrite(req.id)})
  
  return [doc,resp];
}