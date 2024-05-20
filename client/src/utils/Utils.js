import axios from "axios";

export const getRandomRecipe = async (tags) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/recipes/random?tags=${tags}`
    );

    return response?.data?.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
  }
};
