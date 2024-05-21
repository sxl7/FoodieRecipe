const mongoose = require("mongoose");


const favoriteSchema = new mongoose.Schema({
  userId : String,
  recipeUid: String,
  recipe :{},
},{ timestamps: true });


module.exports = mongoose.model("favoriteRecipes", favoriteSchema);
