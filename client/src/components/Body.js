import React from "react";
import "../style/Body.css";

function Body() {
  return (
    <div className="container">
      <div className="content">
        <img className="image" src="/recipe.jpg" alt="" />
        <div className="context">
          <p>
            Welcome to FoodieRecipe, your go-to app for discovering, saving, and
            sharing delicious{" "}
          </p>
          <p>
            {" "}
            recipes from around the world. Whether you're a seasoned chef or a
            kitchen novice,{" "}
          </p>
          <p>
            {" "}
            FoodieRecipe is designed to inspire your culinary journey and make
            cooking a delightful
          </p>
          <p> experience.</p>
        </div>
        <img className="body" src="/image1.jpg" alt="" />
        <ul className="image-description">
          <li>Learn new recipes</li>
          <li>Write your own recipes</li>
          <li>Get cooking tips</li>
        </ul>
      </div>
    </div>
  );
}

export default Body;
