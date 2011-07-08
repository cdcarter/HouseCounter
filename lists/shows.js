function(head,req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var row;
  
  start({'headers': {'Content-Type':"text/html"}});
  
  send("<!doctype html><html><head><title>HouseCounter Web</title></head><body><h1>Shows</h1>")
  
  send("<table><tr><th>ID</th><th>Name</th><th>Venue</th><th>Latest Size</th><th>Average Size</th></tr>")
  
  while(row=getRow()) {
    var doc = row.value;
    doc.venue = row.key;
    doc.link = path.show("web-info",doc.id)
    send(mustache.to_html("<tr><td><a href={{link}}>{{id}}</a></td><td>{{name}}</td><td>{{venue}}</td><td>{{latest}}</td><td>{{avg}}</td></tr>",doc))
  }
  
  send("</table></body></html>")
}