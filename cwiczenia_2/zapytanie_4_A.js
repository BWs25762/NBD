const pipeline = [
  {
    $addFields: {
      "BMI": {$divide: ["$weight", {$pow : [{$multiply:["$height", 0.01]}, 2]}]}
    }
  },
  {
  $group: {
    _id: "$nationality",
    "min": {
      $min: "$BMI"
    },
    "mean": {
      $avg: "$BMI"
    },
    "max": {
      $max: "$BMI"
    }
  }}
]
printjson(db.people.aggregate(pipeline));