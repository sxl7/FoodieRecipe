const recipeModal = require("../models/favoriteSchema");
require("dotenv").config();

const postFavorite = async (req, res) => {
  const { userId, recipe } = req.body;

  const NewRecipe = new recipeModal({
    userId,
    recipeUid: userId + recipe?.id,
    recipe,
  });

  try {
    await NewRecipe.save();
    res.status(201).send("Recipe saved successfully");
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).send("Error saving recipe, check your connection and favorite list");
  }
};

const getFavorite = async (req, res) => {
  const { userId } = req.body;

  try {
    const recipes = await recipeModal
      .find(userId)
      .sort({ createdAt: -1 })
      .select("recipe");
    if (!recipes.length) {
      return res.status(404).json("No recipes found");
    }
    res.status(200).json(recipes);
  } catch (e) {
    console.error("Error fetching recipes:", error);
    res.status(500).json("Error fetching recipes");
  }
};

const deleteRecipe = async (req, res) => {
  const { recipeUid } = req.params;

  try {
    const deletedRecipe = await recipeModal.deleteOne({ recipeUid });

    if (deletedRecipe.deletedCount === 0) {
      return res.status(404).send("Recipe not found");
    }
    res.status(200).send("Recipe deleted successfully");
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).send("Error deleting recipe");
  }
};

module.exports = {
  postFavorite,
  getFavorite,
  deleteRecipe,
};
