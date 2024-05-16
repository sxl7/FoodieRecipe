import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


function Breakfast() {
  const tags = "breakfast"
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recipes/breakfast?tags=${tags}`);
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
                  <a  href={recipes?.spoonacularSourceUrl}>
                    Detail
                  </a>
                </p>
{/*                 <div dangerouslySetInnerHTML={{ __html: recipes.instructions}}>
                </div> */}
              </div>
            );
          })}
      </div>
    </>

  );
}

export default Breakfast;