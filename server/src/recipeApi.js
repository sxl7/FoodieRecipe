const apiKey = process.env.API_KEY

const searchRecipes = async (searchItem, page) =>{
    if(!apiKey){
        throw new Error("API Key not found");
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
        apiKey,
        queryParams:searchItem,
        number:"5",
        offest:(page * 5).toString
    }

    url.search = new URLSearchParams(queryParams).toString()
    try{
        const response = await fetch(url);
        const result = await response.json()
        return result;
    }catch(e){
        console.log(e.message)
    }

}

module.exports = {
    searchRecipes
};

