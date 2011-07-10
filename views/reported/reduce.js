function(keys,values,rereduce) {
  if (rereduce){
    ret = {"complete":0,"counted":0,"percent":0};
    for (var i=0,_len = values.length;i < _len; ++i) {
      ret.counted = values[i].counted + ret.counted;
      ret.complete = values[i].complete + ret.complete;
    }
    ret.percent = ret.complete/ret.counted;
    
    return ret;
  } else {
    ret = {"complete":0,"counted":values.length,"percent":0};
    for (var i =0, _len = values.length; i < _len; ++i) {
      if (values[i]){
        ++ret.complete;
      } 
    }
    ret.percent = ret.complete/ret.counted;
    
    return ret;
  }
}