function(doc,req) {
  var resp =  {
    "headers" : {
      "Content-Type" : "application/xml"
    },
    "body" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n <Response><Sms>Got it, comrade!</Sms></Response>"
  };
  
  doc.count = Number(req.form.Body.split(" ")[1]);
  
  return [doc,resp];
}