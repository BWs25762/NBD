var map_func = function (){
  let cards = this.credit
  for (const card of cards) {
    var key = card.currency
    var amount = card.balance
    emit(key, amount)  
  }
}
var reduce_func = function (key, amount){
  return Array.sum(amount)
}
db.people.mapReduce(map_func, reduce_func,{ out: "results" });
printjson(db.results.find({},{"_id":1, "amount": "$value"}))
