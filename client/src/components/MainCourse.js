import React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios"
import Detail from './Detail';
//import '../style/style.css'
function MainCourse() {
  const tags = "main course"
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recipes/maincourse?tags=${tags}`);
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
                  <button onClick={() => openDetail(recipes)}>
                    Detail
                  </button>
                </p>
{/*                 <div dangerouslySetInnerHTML={{ __html: recipes.instructions}}>
                </div> */}
              </div>
            );
          })}
      </div>
      {selectedRecipe && (
        <Detail
          selectedRecipe={selectedRecipe}
          onClose={closeDetail}
          stripHtmlTags={stripHtmlTags}
        />
      )}
    </>

  );
}

export default MainCourse;