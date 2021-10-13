const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipesSchema = new Schema({
    name: String,
    instructions: [String],
    ingridients: [String]
});

module.exports = mongoose.model("Recipes", recipesSchema)