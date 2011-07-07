function(doc,req) {
  var url;
  
  var path = require("vendor/couchapp/lib/path").init(req);
  
  var tokens = req.form.Body.split(" ");
  
  var handler = {
    "info": path.show("info",tokens[1]),
    "undo": path.update("undo",tokens[1]),
    //"hot": path.list("hot","hot"),
    //"sellouts": path.list("sellouts","sellouts"),
    "no-match": path.update("sms",tokens[0])
  };
  
  var verb = tokens[0];
  
  if (typeof handler[verb] !== "undefined" && handler[verb] !== null){
    url = handler[verb];
  } else {
    url = handler["no-match"];
  }
  
  return [null,"<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Redirect>"+url+"</Redirect></Response>"]
}