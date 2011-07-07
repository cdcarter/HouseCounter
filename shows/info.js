function(doc,req) {
  if (doc == null) {
    var data = "Show not found, dude!"
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n <Response><Sms>"+data+"</Sms></Response>"
  } else {
    var mustache = require("vendor/couchapp/lib/mustache");
    
    var template = "Show: {{name}} @ {{venue}}-Avg:{{avg}},Latest:{{latest}}"
    
    doc.avg = 0;
    doc.perfd = 0;
    for(var i=0,_len=doc.shows.length; i < _len; ++i) {
      if (typeof doc.shows[i].count !== "undefined" && doc.shows[i].count !== null){
        doc.avg = doc.avg + doc.shows[i].count;
        doc.perfd = doc.perfd + 1
      }
    }
    
    doc.avg = doc.avg/doc.perfd
    
    doc.latest = doc.shows[doc.shows.length-1].count
    
    var data = mustache.to_html(template,doc)
    
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n <Response><Sms>"+data+"</Sms></Response>"
  }
}