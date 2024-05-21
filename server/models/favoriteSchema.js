const mongoose = require("mongoose");


const favoriteSchema = new mongoose.Schema({
  userId : String,
  recipeUid: {type:String, unique: true },
  recipe :{},
},{ timestamps: true });


module.exports = mongoose.model("favoriteRecipes", favoriteSchema);
