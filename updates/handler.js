function(doc,req) {
  var url;
  
  var handler = {
    "info": "http://cdcarter.iriscouch.com/sms/_design/sms/_show/info/"+req.form.Body.split(" ")[1],
    "hot": "http://cdcarter.iriscouch.com/sms/_design/sms/_list/hot/hot",
    "sellouts": "http://cdcarter.iriscouch.com/sms/_design/sms/_list/sellouts/sellouts",
    "no-match": "http://cdcarter.iriscouch.com/sms/_design/sms/_update/sms/" + req.form.Body.split(" ")[0]
  };
  
  var verb = req.form.Body.split(" ")[0];
  
  if (typeof handler[verb] !== "undefined" && handler[verb] !== null){
    url = handler[verb];
  } else {
    url = handler["no-match"];
  }
  
  return [null,"<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Redirect>"+url+"</Redirect></Response>"]
}