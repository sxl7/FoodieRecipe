import React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios"
import Detail from './Detail';
import '../style/Recipe.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
function MainCourse() {
  const tags = "main course"
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recipes/maincourse?tags=${tags}&number=${number}`);
      console.log(response.data.recipes);

      setData(response.data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleNumerofResult = async(e) =>{
    if(parseInt(number)>15){
      setNumber("9")
    }
    fetchRecipes()
    e.preventDefault()
  }

  const limitingResults = (e) =>{
    const resultsNumber = e.target.value >15 ? "" : e.target.value
    setNumber(resultsNumber)
  }
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

  return (
    <>
    <div style={{marginTop: '90px',textAlign:'center'}}>
    <form onSubmit={handleNumerofResult}>
        <input
          type="number"
          value={number}
          onChange={limitingResults}
          placeholder="Enter number of results"
        />
        <button type="submit">Generate</button>
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
          data.map((recipes) => {
            const isFavorite = favorites.some(fav => fav.id === recipes.id);
            return (
              <div key={recipes.id} className="recipe-item">
                <p>{recipes.title}</p>
                <img src={recipes.image} alt={recipes.title}></img>
                <p>
                  {/*<a  href={recipes?.spoonacularSourceUrl}>*/}
                  <button className="detail-button" onClick={() => openDetail(recipes)}>
                    Detail
                  </button>
                  <i
                        className={`fa-heart ${isFavorite ? 'fas' : 'far'}`}
                        onClick={() => toggleFavorite(recipes)}
                        style={{ cursor: 'pointer', marginLeft: '10px', color: isFavorite ? 'red' : 'black' }}
                      ></i>
                </p>
{/*                 <div dangerouslySetInnerHTML={{ __html: recipes.instructions}}>
                </div> */}
              </div>
            );
          })}
          </div>
        )}
      </div>
    </>

  );
}

export default MainCourse;