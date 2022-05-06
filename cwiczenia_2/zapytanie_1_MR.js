var map_func = function (){
  var key = this.sex
  var value = {height: this.height, weight: this.weight}
  emit(key, value)
}
var reduce_func = function (key, value){
  let height = 0
  let weight = 0
  let count = 0
  for (val of value){
    height += val.height
    weight += val.weight
    count ++
  }
  return {height: height/count,weight: weight/count}
}
db.people.mapReduce(map_func, reduce_func,{ out: "results" });
printjson(db.results.find())
