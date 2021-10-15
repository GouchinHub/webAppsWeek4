const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let imagesSchema = new Schema({
    name: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer
});

module.exports = mongoose.model("images", imagesSchema)