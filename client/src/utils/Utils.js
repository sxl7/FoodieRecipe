import axios from "axios";

export const getRandomRecipe = async (tags) => {
  try {
    const response = await axios.get(
      `https://foodie-recipe.vercel.app/recipes/random?tags=${tags}`
    );

    return response?.data?.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
  }
};

export const getFavoriteRecipe = async (userId) => {
  try {
    const response = await axios.get(
      `https://foodie-recipe.vercel.app/api/favoriteRecipes?userId=${userId}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
  }
};

export const saveFavoriteRecipe = async (userId, recipeObj) => {
  try {
    const response = await axios.post("https://foodie-recipe.vercel.app/api/save-recipe", {
      userId: userId,
      recipe: recipeObj,
    });
    return response;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const deleteFavoriteRecipe = async (userId, recipeId) => {
  const recipeUid = userId + recipeId
  try {
    const response = await axios.delete(
      `https://foodie-recipe.vercel.app/api/favoriteRecipes/${recipeUid}`);
    return response;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};
