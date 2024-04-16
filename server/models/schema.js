//set up schma model a Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, lowercase: true /*unique: true */ },
  preference: { type: String, lowercase: true },
  createDate: { type: Date, default: Date.now },
});

const ownRecipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  ingredients: [{ type: String }],
  instructions: { type: String },
  prepTime: { type: Number },
  cookTime: { type: Number },
  servings: { type: Number },
  imageUrl: { type: String },
});

const favoriteSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  ingredients: [{ type: String }],
  instructions: { type: String },
  prepTime: { type: Number },
  cookTime: { type: Number },
  servings: { type: Number },
  imageUrl: { type: String },
});

const UserModel = mongoose.model("usersinfos", UserSchema);
const OwnRecipeModel = mongoose.model("recipes", ownRecipeSchema);
const FavoriteRecipeModel = mongoose.model("favoriteRecipes", favoriteSchema);

const mySchemas = {
  UserModel: UserModel,
  OwnRecipeModel: OwnRecipeModel,
  FavoriteRecipeModel: FavoriteRecipeModel,
};

module.exports = mySchemas;
