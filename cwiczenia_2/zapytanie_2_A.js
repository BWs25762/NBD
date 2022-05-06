const pipeline =[
  {
    $unwind: "$credit"
  },
  {
    $group: {
      _id: "$credit.currency",
      "amount": {
        $sum: "$credit.balance"
      }
    }
  }
]
config.set("displayBatchSize", 10000)
printjson(db.people.aggregate(pipeline))
