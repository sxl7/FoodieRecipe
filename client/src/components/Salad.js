import React from "react";
import { useEffect, useState } from "react";
import { getRandomRecipe } from "../utils/Utils";
import useAuth from "../utils/useAuth";
import Detail from "./Detail";
import '../style/Recipe.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
function Salad() {
  const { auth } = useAuth();

  const tags = "salad";
  const [data, setData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);


  const handleMoreRecipe = async () => {
    const recipes = await getRandomRecipe(tags);
    console.log(recipes);
    setData((prevData) => {
      if (!prevData) {
        return recipes;
      } else {
        return [...prevData, ...recipes];
      }
    });
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
  const toggleFavorite = (recipes) => {
    // Check if the recipe is favorited
    if (favorites.some(fav => fav.id === recipes.id)) {
      // If it is already favorited, then remove it
      setFavorites(favorites.filter(fav => fav.id !== recipes.id));
    } else {
      //// If the recipe is not favorited, then add it
      setFavorites([...favorites, recipes]);
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      const recipes = await getRandomRecipe(tags);
      console.log(recipes);
      setData((prevData) => {
        if (!prevData) {
          return recipes;
        } else {
          return [...prevData, ...recipes];
        }
      });
    };

    if (auth?.id) {
      getRecipe();
    }
  }, [auth?.id]);

  return (
    <>
      <div style={{ marginTop: "90px", textAlign: "center" }}>
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
          data.map((recipes,i) => {
            const isFavorite = favorites.some(fav => fav.id === recipes.id);
            return (
              <div key={i} className="recipe-item">
                <p>{recipes.title}</p>
                <img src={recipes.image} alt={recipes.title}></img>
                <p>
                  <button className="detail-button" onClick={() => openDetail(recipes)}>Detail</button>
                  <i
                        className={`fa-heart ${isFavorite ? 'fas' : 'far'}`}
                        onClick={() => toggleFavorite(recipes)}
                        style={{ cursor: 'pointer', marginLeft: '10px', color: isFavorite ? 'red' : 'black' }}
                      ></i>
                </p>
              </div>
            );
          })}
          </div>
        )}
        <div><button className = 'moreRecpieButton' onClick={handleMoreRecipe}>More recipes</button></div>
      </div>
    </>
  );
}

export default Salad;
