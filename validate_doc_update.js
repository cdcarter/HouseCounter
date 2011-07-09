function (newDoc,savedDoc,userCtx) {
  var _ = require("vendor/underscore");
  if (newDoc.type=="show") {
    var unsorted = _.clone(newDoc.shows)
    var sorted = newDoc.shows.sort(function(x,y){return x.slot-y.slot})
    if (!_.isEqual(sorted,unsorted)) {
      throw {forbidden: "Not sorted"};
    }
  }
}