import React from "react";
import { useState } from "react";
import axios from "axios";
import Detail from "./Detail";
import "../style/Recipe.css";
import { useToast } from "../utils/ToastSetUp";
function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [data, setData] = useState([]);
  const [prvTerm, setPrvTerm] = useState("");
  const [prvCuisine, setPrvCuisine] = useState("");
  const [showMoreButton, setShowMoreButton] = useState(false)

  const { notifyWarning } = useToast();

  const fetchRecipes = async () => {
    if (searchTerm === "" && searchCuisine === "") {
      notifyWarning("no Search Term and Cuisine entered");
      setShowMoreButton(false)
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/recipes/search?searchTerm=${searchTerm}&cuisine=${searchCuisine}`
      );
      console.log(response.data.results);

      if (searchTerm === prvTerm && prvCuisine === searchCuisine) {
        setData((prevData) => [...prevData, ...response.data.results]);
        return;
      }
      setPrvTerm(searchTerm);
      setPrvCuisine(searchCuisine);
      setData(response?.data?.results);
      if(response?.data?.results.length >0){
        setShowMoreButton(true)
      }else{
        setShowMoreButton(false)
      }
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

  const handleNumerofResult = async (e) => {
    fetchRecipes();
    e.preventDefault();
  };

  const openDetail = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeDetail = () => {
    setSelectedRecipe(null);
  };

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    <>
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
          <button type="submit" onClick={handleNumerofResult}>
            Search
          </button>
        </form>
        {selectedRecipe && (
          <Detail
            selectedRecipe={selectedRecipe}
            onClose={closeDetail}
            stripHtmlTags={stripHtmlTags}
          />
        )}
        {!selectedRecipe && (
          <div className="recipe-grid">
            {data &&
              data.map((recipes, i) => {
                return (
                  <div key={i} className="recipe-item">
                    <p>{recipes.title}</p>
                    <img src={recipes.image} alt={recipes.title}></img>
                    <p>
                      <button
                        className="detail-button"
                        onClick={() => openDetail(recipes)}
                      >
                        Detail
                      </button>
                    </p>
                  </div>
                );
              })}
          </div>
        )}
        {showMoreButton && (<div><button className = 'moreRecpieButton' onClick={handleNumerofResult}>More recipes</button></div>)}
      </div>
    </>
  );
}

export default Search;
