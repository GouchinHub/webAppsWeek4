var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Categories = require("../models/category.js")
const fs = require("fs");

/* GET all categories. */
router.get('/', function(req, res, next) {
    Categories.find({}, (err, categories) => {
    if(err) return next(err);
    if(categories) {
        return res.json(categories);
    } else {
        return res.status(404).send("Not found");
    }
    })
});

router.post('/', function(req, res, next) {
    Categories.findOne({ name: req.body.name}, (err, name) => {
      if(err) return next(err);
      if(!name) {
        new Categories({
          name: req.body.name,
        }).save((err) => {
          if(err) return next(err);
          return res.send(req.body);
        })
      } else {
        return res.status(403).send("allready has the category")    }
    })
  
  });  

module.exports = router;