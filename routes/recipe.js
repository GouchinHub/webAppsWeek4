var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Recipes = require("../models/recipes.js")
const fs = require("fs");

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
  res.json({
    name: req.params.food,
    instructions: ["heat", "eat"],
    ingridients: ["flour", "meat"]
   });
});

router.get('/new_recipe/:food', function(req, res, next) {
  var items = recipes.filter(item => {return item.name === req.params.food})
  res.json(items[0]);
});


/* POST recipes. */
router.post('/', function(req, res, next) {
  Recipes.findOne({ name: req.body.name}, (err, name) => {
    if(err) return next(err);
    if(!name) {
      new Recipes({
        name: req.body.name,
        instructions: req.body.instructions,
        ingridients: req.body.ingridients
      }).save((err) => {
        if(err) return next(err);
        return res.send(req.body);
      })
    } else {
      return res.status(403).send("allready has the recipe")    }
  })

});

module.exports = router;
