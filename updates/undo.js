function(doc,req) {  
  var message;
  
  if (doc === null) {
    message = "That's not a show, weirdo!"
  } else {
    var whoops = true;
    for(var i = doc.shows.length - 1; i >= 0; --i) {
      if(doc.shows[i].count != null) {
        doc.shows[i].count = null;
        message = "Done!";
        whoops = false;
        break;
      }
      if (whoops) {
        message = "No record to undo, man!";
      }
    }
  }

  var resp =  {
    "headers" : {
      "Content-Type" : "application/xml"
    },
    "body" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n <Response><Sms>"+message+"</Sms></Response>"
  };

  return [doc,resp];
}