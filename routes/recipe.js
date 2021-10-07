var express = require('express');
var router = express.Router();
const fs = require("fs");

let recipes = exampleRecipe

fs.readFile("./data/recipes.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  recipes = JSON.parse(data);
})

/* GET recipes. */
router.get('/', function(req, res, next) {
  res.json(recipes);
});

/* GET recipe by food. */
router.get('/:food', function(req, res, next) {
  res.json({
    name: req.params.food,
    instructions: ["heat", "eat"],
    ingridients: ["flour", "meat"]
 });
});

/* POST recipes. */
router.post('/', function(req, res, next) {
  recipes.push(req.body)
  console.log("posting")
  fs.writeFile("./data/recipes.json", JSON.stringify(recipes), err => {
    if(err) {
      console.log(err)
      return
    }
  })
  res.send(req.body)
});

module.exports = router;
