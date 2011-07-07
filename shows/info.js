function(doc,req) {
  var data = "Show: " + doc.name + " - " + doc.count;
  return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n <Response><Sms>"+data+"</Sms></Response>"
}