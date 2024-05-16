import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [data, setData] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/recipes/search?searchTerm=${searchTerm}&cuisine=${searchCuisine}`
      );
      console.log(response.data.results);
      setData(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchCuisineChange = (event) => {
    setSearchCuisine(event.target.value);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleNumerofResult = async (e) => {
    fetchRecipes();
    e.preventDefault();
  };

  return (
    <div style={{ marginTop: "90px", textAlign: "center" }}>
      <form>
        <input
          style={{ margin: "3px" }}
          type="text"
          value={searchTerm}
          placeholder="Search by Term"
          autoComplete="off"
          onChange={handleSearchTermChange}
        />
        <input
          style={{ margin: "3px" }}
          type="text"
          value={searchCuisine}
          placeholder="Search by Cuisine"
          autoComplete="off"
          onChange={handleSearchCuisineChange}
        />
        <button type="submit" onClick={handleNumerofResult}>Search</button>
      </form>
      {data &&
        data.map((recipes) => {
          return (
            <div key={recipes.id}>
              <p>{recipes.title}</p>
              <img src={recipes.image} alt={recipes.title}></img>
              <p>
                {/*<a  href={recipes?.spoonacularSourceUrl}>*/}
                {/*                   <button  onClick={() => openDetail(recipes)}>
                    Detail
                  </button> */}
              </p>
              {/*                 <div dangerouslySetInnerHTML={{ __html: recipes.instructions}}>
                </div> */}
            </div>
          );
        })}
    </div>
  );
}

export default Search;
