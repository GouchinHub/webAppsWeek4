var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Recipes = require("../models/recipes.js")
const Categories = require("../models/category.js")

/* GET recipe by food. */
router.get('/:food', function(req, res, next) {
  Recipes.findOne({ name: req.params.food}, (err, recipes) => {
    if(err) return next(err);
    if(recipes) {
      return res.json(recipes);
    } else {
      return res.status(404).send(`Recipe: ${req.params.food} not found`);
    }
  })
});

/* GET all recipes */
router.get('/', function(req, res, next) {
  Recipes.find({}, (err, recipes) => {
    if(err) return next(err);
    if(recipes) {
      return res.json(recipes);
    } else {
      return res.status(404).send("Not found");
    }
  })
});

/* POST recipes. */
router.post('/', function(req, res, next) {
  Recipes.findOne({ name: req.body.name}, (err, name) => {
    if(err) return next(err);
    if(!name) {
      new Recipes({
        name: req.body.name,
        instructions: req.body.instructions,
        ingridients: req.body.ingridients,
        categories: req.body.categories
      }).save((err) => {
        if(err) return next(err);
        return res.send(req.body);
      })
    } else {
      return res.status(403).send("allready has the recipe")    }
  })

});

module.exports = router;
