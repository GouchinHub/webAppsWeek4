const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipesSchema = new Schema({
    name: String,
    instructions: [String],
    ingridients: [String],
    categories: [ObjectId],
    images: [ObjectId]
});

module.exports = mongoose.model("Recipes", recipesSchema)