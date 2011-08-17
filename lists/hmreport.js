function(head,req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var row;
  var data = {rows: []};
  
  start({'headers': {'Content-Type':"text/html"}});
    
  while(row=getRow()) { 
    var zz = {};
    zz.venue = row.key[0]
    zz.slot = row.key[1]
    zz.count = row.value[0]
    zz.name = row.value[1]
    zz.id = row.value[2]
    data.rows.push(zz)
  };
  
  data.venue = data.rows[0].venue
    
  send(mustache.to_html(ddoc.templates.hmreport,data))
}