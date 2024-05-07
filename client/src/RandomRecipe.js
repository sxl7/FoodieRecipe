import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";

function RandomRecipeTesting() {
    const [data, setData] = useState([]);
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes");
        console.log(response.data.recipes);
        setData(response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };
  
    useEffect(() => {
      fetchRecipes();
    }, []);
  
    return (
      <div style={{textAlign:'center'}}>
        <button onClick={fetchRecipes}>fetch random recipes</button>
        {
          data && (data.map((recipes) => {
              return(
              <div key={recipes.id}>
                  <p>{recipes.title}</p>
                  <img src={recipes.image} alt={recipes.title}></img>
                  <p><a target="_blank" href={recipes?.spoonacularSourceUrl}>Detail</a></p>
              </div>
          )}))}
  
      </div>
    );
  }

export default RandomRecipeTesting
