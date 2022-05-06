const pipeline = [
  {
  $match: {
    "nationality": "Poland",
    "sex": "Female"
  }},
  {
    $unwind: "$credit"
  },
  {
    $group: {
      _id: "$credit.currency",
      "mean": {
        $avg: "$credit.balance"
      },
      "total": {
        $sum: "$credit.balance"
      }
    }
  }
]
printjson(db.people.aggregate(pipeline));