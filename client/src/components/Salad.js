import React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios"
import "../style/salad.css";

function Salad() {
  const tags = "salad"
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);
  const [viewDetail, setViewDetail] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recipes/salad?tags=${tags}`);
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
    setViewDetail(true);
  };
 
 
  const closeDetail = () => {
    setViewDetail(false);
    setSelectedRecipe(null);
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
        {data &&
          data.map((recipes) => {
            return (
              <div key={recipes.id}>
                <p>{recipes.title}</p>
                <img src={recipes.image} alt={recipes.title}></img>
                <p>
                  {/*<a  href={recipes?.spoonacularSourceUrl}>*/}
                  <a href="#" onClick={() => openDetail(recipes)}>
                    Detail
                  </a>
                </p>
{/*                 <div dangerouslySetInnerHTML={{ __html: recipes.instructions}}>
                </div> */}
              </div>
            );
          })}
           {viewDetail && selectedRecipe && (
         <div className="Detail">
           <div className="DetailContent">
             <h2 style={{paddingBottom: '20px'}}>{selectedRecipe.title}</h2>
             <h3>Ingredients:</h3>
             <ul>
               {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                 <li className="IngredientItem" key={index}>
                   <p>{ingredient.original}</p>
                   <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt={ingredient.name} />
                 </li>
               ))}
             </ul>
             <h3>Instructions:</h3>
             <p style={{lineHeight:'25px'}}> {selectedRecipe.instructions}</p>
             <h3>Summary:</h3>
             <p style={{lineHeight:'25px'}}> {selectedRecipe.summary}</p>
            
             <button onClick={closeDetail}>Close</button>
           </div>
         </div>
       )}
      </div>
    </>

  );
}

export default Salad;