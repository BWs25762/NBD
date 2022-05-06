var map_func = function (){
  var key = this.job
  var value = key
  emit(key, value)  
}
var reduce_func = function (key, value){
  return null
}
db.people.mapReduce(map_func, reduce_func,{ out: "results" });
printjson(db.results.find({},{"_id":1}))
