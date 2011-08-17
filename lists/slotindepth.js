function(head,req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var row;
  var data = {rows: []};
  
  start({'headers': {'Content-Type':"text/html"}});
    
  while(row=getRow()) {
    var zz = {};
    zz.slot = row.key[0];
    zz.venue = row.key[1];
    zz.count = row.value;
    zz.id = row.id;
    zz.link = path.rewrite(zz.id)
    data.rows.push(zz);
  };
  
  data.slotreport = path.rewrite("slots");
  data.showlist = path.rewrite("")
  data.time = ddoc.data.slots[data.rows[0].slot];
  data.slot = data.rows[0].slot;
    
  send(mustache.to_html(ddoc.templates.slotindepth,data))
}