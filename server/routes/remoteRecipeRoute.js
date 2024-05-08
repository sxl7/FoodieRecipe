const express = require("express");
const router = express.Router();
const remoteRecipeController = require("../controller/remoteRecipeController");

router.get("/breakfast", remoteRecipeController.getRandomRecipes);
router.get("/search", remoteRecipeController.searchRecipes);

module.exports = router;
