import React from "react";
import { useEffect, useState } from "react";
import Detail from "./Detail";
import "../style/Recipe.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import useAuth from "../utils/useAuth";
import { getFavoriteRecipe, deleteFavoriteRecipe } from "../utils/Utils";
import { useToast } from "../utils/ToastSetUp";

function Favorite() {
  const { auth } = useAuth();
  const [data, setData] = useState();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { notifyWarning, notifySuccess, notifyError } = useToast();

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

  const handleDeletion = async (recipeId) => {
    await deleteFavoriteRecipe(auth?.id, recipeId).then((res) => {
      if (res?.status) {
        setData(data.filter((recipeObj) => recipeObj.recipe.id !== recipeId));
        notifySuccess(res?.data);
      } else {
        if (res?.response?.status === 404) {
          notifyError(res?.response?.data);
        } else {
          notifyError(res?.message);
        }
      }
    });
  };

  useEffect(() => {
    const getRecipe = async () => {
      const objectData = await getFavoriteRecipe(auth?.id);
      if (objectData?.length > 0) {
        setData(objectData);
      } else {
        notifyWarning("Your don't have any favorite recipes");
      }
    };
    getRecipe();
  }, [auth?.id, notifyWarning]);

  return (
    <>
      <div className="recipe-grid">
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
              data.map((obj) => {
                return (
                  <div key={obj._id} className="recipe-item">
                    <p>{obj.recipe.title}</p>
                    <img src={obj.recipe.image} alt={obj.recipe.title}></img>
                    <p>
                      <button
                        className="detail-button"
                        onClick={() => openDetail(obj.recipe)}
                      >
                        Detail
                      </button>
                    </p>
                    <button onClick={() => handleDeletion(obj.recipe.id)}>
                      Remove
                    </button>
                  </div>
                );
              })}
          </div>
        )}
        </div>
    </>
  );
}

export default Favorite;
