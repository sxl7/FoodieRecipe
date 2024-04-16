import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function BackEndTesting() {
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

/*   useEffect(() => {
    fetchRecipes();
  }, []); */

  return (
    <div>
      <button onClick={fetchRecipes}>fetch random recipes</button>
      {
        data && (data.map((recipes) => {
            return(
            <div key={recipes.id}>
                <p>{recipes.title}</p>
                <img src={recipes.image} alt={recipes.title}></img>
            </div>
        )}))}

    </div>
  );
}

export default BackEndTesting;
