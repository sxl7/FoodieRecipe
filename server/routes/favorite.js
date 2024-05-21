const express = require("express");
const router = express.Router();

const favoriteController = require("../controller/favoriteController");

router.post("/save-recipe", favoriteController.postFavorite);
router.get('/favoriteRecipe',favoriteController.getFavorite);
router.delete('/favoriteRecipe/:recipeUid',favoriteController.deleteRecipe)

module.exports = router;
