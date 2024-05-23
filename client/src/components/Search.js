import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Detail from "./Detail";
import "../style/Recipe.css";
import { useToast } from "../utils/ToastSetUp";
import { saveFavoriteRecipe, getFavoriteRecipe,deleteFavoriteRecipe} from "../utils/Utils";
import useAuth from "../utils/useAuth";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Search() {
  const { auth } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [data, setData] = useState([]);
  const [prvTerm, setPrvTerm] = useState("");
  const [prvCuisine, setPrvCuisine] = useState("");
  const [showMoreButton, setShowMoreButton] = useState(false)

  const [favorites, setFavorites] = useState([]);

  const { notifyWarning,notifySuccess,notifyError } = useToast();

  const fetchRecipes = async () => {
    if (searchTerm === "" && searchCuisine === "") {
      notifyWarning("no Search Term and Cuisine entered");
      setShowMoreButton(false)
      return;
    }
    try {
      const response = await axios.get(
        `https://foodie-recipe.vercel.app/recipes/search?searchTerm=${searchTerm}&cuisine=${searchCuisine}`
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

  const handleMoreRecipe = async (e) => {
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

  const toggleFavorite = async (recipes) => {
    // Check if the recipe is favorited
    if (favorites.some((fav) => fav.id === recipes.id)) {
      await deleteFavoriteRecipe(auth?.id, recipes.id).then((res) => {
        if (res?.status) {
          notifySuccess(res?.data);
        } else {
            notifyError(res?.message);
        }
      });
      setFavorites(favorites.filter((fav) => fav.id !== recipes.id));
    } else {
      await saveFavoriteRecipe(auth?.id, recipes).then((res)=>{
        if(res.status === 201){
          notifySuccess(`${res?.data}`)
        }else{
          notifyError(`${res?.response?.data}`)
        }
      })
      setFavorites([...favorites, recipes]);
    }
  };


  useEffect(() => {
    const getRecipe = async () => {
      const favoriteRecipes = await getFavoriteRecipe(auth?.id)
      if(favoriteRecipes?.length > 0){
        const fRecipes = favoriteRecipes.map(obj => obj.recipe)
        console.log(fRecipes)
        setFavorites(fRecipes)
      }}

    if (auth?.id) {
      getRecipe();
    }
  }, [auth?.id]);

  return (
    <>
      <div style={{textAlign: "center" }}>
        <form>
          <input
            style={{ margin: "5px", width: "350px", padding: "5px" }}
            type="text"
            value={searchTerm}
            placeholder="Search by Term"
            autoComplete="off"
            onChange={handleSearchTermChange}
          />
          <input
            style={{ margin: "3px", width: "350px", padding: "5px" }}
            type="text"
            value={searchCuisine}
            placeholder="Search by Cuisine"
            autoComplete="off"
            onChange={handleSearchCuisineChange}
          />
          <button type="submit" onClick={handleMoreRecipe}>
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
                const isFavorite = favorites.some(
                  (fav) => fav.id === recipes.id
                );
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
                      <i
                        className={`fa-heart ${isFavorite ? "fas" : "far"}`}
                        onClick={() => toggleFavorite(recipes)}
                        style={{
                          cursor: "pointer",
                          marginLeft: "10px",
                          color: isFavorite ? "red" : "black",
                        }}
                      ></i>
                    </p>
                  </div>
                );
              })}
          </div>
        )}
        {showMoreButton && (<div><button className = 'moreRecpieButton' onClick={handleMoreRecipe}>More recipes</button></div>)}
      </div>
    </>
  );
}

export default Search;
