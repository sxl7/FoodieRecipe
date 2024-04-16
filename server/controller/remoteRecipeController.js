const axios = require("axios");
const apiKey = process.env.API_KEY;

const randomRecipes = async (req, res) => {
    if(!apiKey){
        throw new Error('API Key not found');
    }
    try {
        const number = '5'
        const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${number}`);


        console.log(response.data)

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from Spoonacular API:", error.message);
        res
        .status(500)
        .json({ error: "Failed to fetch data from Spoonacular API" });
    }
};

module.exports = {
    randomRecipes,
};
