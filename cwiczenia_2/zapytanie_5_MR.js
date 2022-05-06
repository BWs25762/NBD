var map_func = function (){
  let cards = this.credit
  if (
    this.nationality == "Poland" &&
    this.sex == "Female"
  ) {
    for (const card of cards){
      let key = card.currency
      let value = card.balance
      emit(key, value)  
    }
  }
}
var reduce_func = function (key, value){
  let mean = 0
  let count = 0
  for (const BMI of value){
    mean += BMI
    count ++
  }
  return {mean: mean/count, total: mean}
}
db.people.mapReduce(map_func, reduce_func,{ out: "results" });
printjson(db.results.find(
  {},
  {
    "_id":1,
    "mean":"$value.mean", 
    "total": "$value.total"
  }
))
