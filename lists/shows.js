function(head,req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var row;
  
  start({'headers': {'Content-Type':"text/html"}});
  
  send("<!doctype html><html><head><title>HouseCounter Web</title></head><body><h1>Shows</h1>")
  
  send("<a href='"+path.rewrite("slots")+"'>Slot Reports</a>")
  
  send("<table><tr><th>ID</th><th>Name</th><th>Venue</th><th>Latest Size</th><th>Average Size</th><th>Prediction</th><th>Box</th><th>Usher</th><th>Side</th></tr>")
  
  while(row=getRow()) {
    var doc = row.value;
    doc.venue = row.key;
    doc.link = path.rewrite(doc.id)
    doc.avgs.avg = doc.avgs.avg.toFixed(2)
    doc.prediction = doc.prediction.toFixed(2)
    if (doc.avgs.perfd==0) {
      doc.avgs.perfd = "None";
      doc.avgs.avg = "None";
      doc.avgs.latest = "None";
    }
    send(mustache.to_html(ddoc.templates.listline,doc))
  }
  
  send("</table></body></html>")
}