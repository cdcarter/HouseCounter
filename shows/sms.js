function(doc,req) {
  if (req.form.Body.split(" ")[0] === "info"){
    var url = "http://cdcarter.iriscouch.com/sms/_design/sms/_show/info/"+req.form.Body.split(" ")[1]
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Redirect>"+url+"</Redirect></Response>"
  } else {
    var url = "http://cdcarter.iriscouch.com/sms/_design/sms/_update/sms/" + req.form.Body.split(" ")[0]
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Redirect>"+url+"</Redirect></Response>"
  }
}