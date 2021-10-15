var express = require('express');
var router = express.Router();
const getStream = require('get-stream')
const mongoose = require("mongoose");
const Images = require("../models/images.js")
const multer  = require('multer')
const path = require('path')

//set storage engine
const storage = multer.memoryStorage({
  destination: '../public/images/',
  filename: function(req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() +
      path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage
})

/* POST images. */
router.post('/', upload.array('images', 10), function(req, res, next) {
    Images.findOne({ name: req.files[0].originalname}, (err, name) => {
      if(err) return next(err);
      if(!name) {
        new Images({
          name: req.files[0].originalname,
          encoding: req.files[0].encoding,
          mimetype: req.files[0].mimetype,
          buffer: req.files[0].buffer
        }).save((err) => {
          if(err) return next(err);
        })
      } else {
        return res.status(403).send("allready has the image")    }
    });
    console.log("we still here?")
    console.log(__dirname)
    res.render(path.join(__dirname, '../public/index'), { msg: "success" }); 
  });
  
  module.exports = router;