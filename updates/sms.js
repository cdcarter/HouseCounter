function(doc,req) {  
  var count = Number(req.form.Body.split(" ")[1]);
  
  var whoops = false;
  
  for(var i = 0, _len = doc.shows.length; i < _len; ++i) {
    if (doc.shows[i].count === null) {
      doc.shows[i].count = count;
      break;
    }
    if (i+1 === _len) {
      whoops = true;
    }
  }
  
  var message;
  
  if (whoops) {
    message = "That show doesn't have any more times to enter!";
  } else {
    message = "Got it, comrade!";
  }
  
  var resp =  {
    "headers" : {
      "Content-Type" : "application/xml"
    },
    "body" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n <Response><Sms>"+message+"</Sms></Response>"
  };
  
  return [doc,resp];
}