import React from "react";
import { useState, useEffect } from "react";
import "../style/salad.css";

function SearchDetail({ selectedRecipe, onClose, stripHtmlTags }) {
  const [viewDetail, setViewDetail] = useState(true);
  const [instructs, setInstructs] = useState([]);

  const closeDetail = () => {
    setViewDetail(false);
    onClose();
  };

  useEffect(() => {
    setInstructs(selectedRecipe.analyzedInstructions[0].steps);
  }, [selectedRecipe]);

  return (
    <>
      {viewDetail && selectedRecipe && (
        <div className="Detail" style={{ width: "60%", height: "80%" }}>
          <button className="detail-button" style={{position: 'absolute', top: '1px', right:'30px'}} onClick={closeDetail}>
            Close
          </button>
          <div className="DetailContent">
            <h2 style={{ paddingBottom: "20px" }}>{selectedRecipe.title}</h2>
            <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>
              Ingredients:
            </h3>
            <ul>
              {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                <li className="IngredientItem" key={index}>
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient.name}
                  />
                  <p>{ingredient.original}</p>
                </li>
              ))}
            </ul>
            <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>
              Instructions:
            </h3>
            {/* <p style={{ lineHeight: '25px' }}>{stripHtmlTags(selectedRecipe.instructions)}</p> */}
            <ol>
              {instructs ? (
                instructs.map((step, index) => <li key={index}>{step.step}</li>)
              ) : (
                <a href={selectedRecipe.spoonacularSourceUrl}>Link</a>
              )}
            </ol>

            <h3 style={{ textAlign: "center", paddingBottom: "20px" }}>
              Summary:
            </h3>
            <p style={{ lineHeight: "25px" }}>
              {stripHtmlTags(selectedRecipe.summary)}
            </p>
            <br />
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
}

export default SearchDetail;
