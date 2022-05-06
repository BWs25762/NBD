var map_func = function (){
  var key = this.nationality
  var value = this.weight/((this.height/100)^2)
  emit(key, value)  
}
var reduce_func = function (key, value){
  let min = Number.MAX_SAFE_INTEGER 
  let mean = 0
  let max = 0
  let count = 0
  for (const BMI of value){
    min = (BMI<min)? BMI : min
    max = (BMI>max)? BMI : max
    mean += BMI
    count ++
  }
  return {min: min, mean: mean/count, max: max}
}
db.people.mapReduce(map_func, reduce_func,{ out: "results" });
printjson(db.results.find(
  {},
  {
    "_id":1,
    "min":"$value.min", 
    "mean":"$value.mean", 
    "max": "$value.max"
  }
))
