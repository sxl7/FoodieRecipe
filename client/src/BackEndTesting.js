import { useState } from "react";
import axios from "axios";

function BackEndTesting() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisine, setCuisine] = useState("");
  const searchRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search?searchTerm=${searchTerm}&cuisine=${cuisine}`
      );

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    }
  };

  const handleSearch = async (e) => {
    searchRecipes()
    e.preventDefault();
  }


  return (
    <div style={{textAlign:'center'}}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter recipe name..."
        />
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Enter Cuisine"
        />
        <button type="submit">Search</button>
      </form>
      {data &&
        data.map((recipes) => {
          return (
            <div key={recipes.id}>
              <p>{recipes.title}</p>
              <img src={recipes.image} alt={recipes.title}></img>
            </div>
          );
        })}
    </div>
  );
}

export default BackEndTesting;
