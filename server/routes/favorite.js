const express = require("express");
const router = express.Router();

const favoriteController = require("../controller/favoriteController");

router.post("/save-recipe", favoriteController.postFavorite);
router.get('/favoriteRecipes',favoriteController.getFavorite);
router.delete('/favoriteRecipes/:recipeUid',favoriteController.deleteRecipe)

module.exports = router;
