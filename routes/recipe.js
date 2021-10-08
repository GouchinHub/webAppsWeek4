var express = require('express');
var router = express.Router();
const fs = require("fs");

var instructions = ["heat", "eat"]
var ingredients = ["flour", "meat"]

var recipes = []

fs.readFile("./data/recipes.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  recipes = JSON.parse(data);
})

/* GET recipe by food. */
router.get('/:food', function(req, res, next) {
  var items = recipes.filter(item => {return item.name === req.params.food})
  res.json(items[0]);
});

/* POST recipes. */
router.post('/', function(req, res, next) {
  recipes.push(req.body)
  fs.writeFile("./data/recipes.json", JSON.stringify(recipes), err => {
    if (err) {
      console.log(err)
      return
    }
  })
  res.json(req.body)
});

module.exports = router;
