const axios = require("axios");
const apiKey = process.env.API_KEY;

const getRandomRecipes = async (req, res) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  try {

    let apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`
    const {tags,number} = req.query
    if(tags){
      apiUrl += `&tags=${encodeURIComponent(tags)}`
    } 

    if(number){
      apiUrl += `&number=${encodeURIComponent(number)}`
    }else{
      apiUrl += `&number=9`
    }

    const response = await axios.get(apiUrl);

    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Spoonacular API:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch data from Spoonacular API" });
  }
};

const searchRecipes = async (req, res) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  try {
    let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
    const { searchTerm, cuisine } = req.query;
    if (searchTerm) {
      apiUrl += `&query=${encodeURIComponent(searchTerm)}`;
    }
    if (cuisine) {
      apiUrl += `&cuisine=${encodeURIComponent(cuisine)}`;
    }
    const response = await axios.get(apiUrl);

    console.log(response.data.results);

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching data from Spoonacular API:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch data from Spoonacular API" });
  }
};

const searchById = async(req, res) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  try {
    if(Id){
      const apiUrl = `https://api.spoonacular.com/recipes/${Id}?apiKey=${apiKey}`;
    }
    const response = await axios.get(apiUrl);

    console.log(response.data.results);

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching data from Spoonacular API:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch data from Spoonacular API" });
  }

}

module.exports = {
  getRandomRecipes,
  searchRecipes,
  searchById
};
