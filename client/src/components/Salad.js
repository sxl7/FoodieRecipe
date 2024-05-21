import React from "react";
import { useEffect, useState } from "react";
import { getRandomRecipe, saveFavoriteRecipe, getFavoriteRecipe,deleteFavoriteRecipe} from "../utils/Utils";
import useAuth from "../utils/useAuth";
import Detail from "./Detail";
import '../style/Recipe.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useToast } from "../utils/ToastSetUp";


function Salad() {
  const { auth } = useAuth();
  const{notifySuccess,notifyError} = useToast()


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
      const recipes = await getRandomRecipe(tags)
      const favoriteRecipes = await getFavoriteRecipe(auth?.id);

      if (favoriteRecipes?.length > 0) {
        const fRecipes = favoriteRecipes.map((obj) => obj.recipe);
        setFavorites(fRecipes);
      }

      setData((prevData) => {
        if (!prevData) {
          return recipes;
        } 
        else if(!recipes){
          return
        }
        else {
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
      <div style={{textAlign: "center" }}>
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
        <div style={{paddingBottom: "20px"}}><button className = 'moreRecpieButton' onClick={handleMoreRecipe}>More recipes</button></div>
      </div>
    </>
  );
}

export default Salad;
