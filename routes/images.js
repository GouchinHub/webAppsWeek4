var express = require('express');
var router = express.Router();
const getStream = require('get-stream')
const mongoose = require("mongoose");
const Images = require("../models/images.js")
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/* POST images. */
router.post('/', upload.array('images', 10), async function(req, res, next) {
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
            return res.send(req.body);
          })
        } else {
          return res.status(403).send("allready has the image")    }
      })
  });
  
  module.exports = router;