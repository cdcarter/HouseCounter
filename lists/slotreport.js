function(head,req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var row;
  var data = {rows: []};
  
  start({'headers': {'Content-Type':"text/html"}});
    
  while(row=getRow()) {
    var zz = row.value
    zz.slot = row.key[0]
    zz.percent = zz.percent.toFixed(2)
    zz.link = path.rewrite("slots",zz.slot.toString())
    data.rows.push(zz)
  };
    
  send(mustache.to_html(ddoc.templates.slotreport,data))
}