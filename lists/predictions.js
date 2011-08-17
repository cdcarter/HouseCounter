function(head,req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var row;
  
  start({'headers': {'Content-Type':"text/html"}});
  
  send("<!doctype html><html><head><title>HouseCounter Web</title></head><body><h1>Predictions</h1>")
  
  send("<table><tr><th>Slot</th><th>Venue</th><th>Name</th><th>Prediction</th></tr>")
  
  while(row=getRow()) {
    var data = {};
    data.slot = ddoc.data.slots[row.key[0]];
    data.venue = row.key[1];
    data.title = row.key[2];
    data.prediction = row.value.toFixed(2)
    send(mustache.to_html("<tr><td>{{slot}}</td><td>{{venue}}</td><td>{{title}}</td><td>{{prediction}}</td></tr>",data))
  }
  
  send("</table></body></html>")
}