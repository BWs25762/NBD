const pipeline = [
  {
  $group: {
    _id: "$sex",
    "mean_height": {
      $avg: "$height"
    },
    "mean_weight": {
      $avg: "$weight"
    }
  }}
]
printjson(db.people.aggregate(pipeline));
