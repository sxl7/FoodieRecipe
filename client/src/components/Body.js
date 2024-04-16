import React from "react";
import '../style/Body.css';
function Body() {
  return (
    <div className="container"> 
      <div className="content">
      <img className="image" src="/Recipe.jpg" alt=""/>
      <div className="context">
        <p>Welcome to FoodieRecipe, your go-to app for discovering, saving, and sharing delicious recipes from around the world. Whether you're a seasoned chef or a kitchen novice, FoodieRecipe is designed to inspire your culinary journey and make cooking a delightful experience.</p>
      </div>
    </div>
    </div>
  );
}

export default Body;
