import React from 'react';
import { useState } from 'react';
import '../style/salad.css';

function Detail({ selectedRecipe, onClose, stripHtmlTags }) {
    const [viewDetail, setViewDetail] = useState(true);

    const closeDetail = () => {
        setViewDetail(false);
        onClose();
    };

    return (
        <>
            {viewDetail && selectedRecipe && (
                <div className="Detail" style={{ width: '80%',height:'80%' }}>
                    <button className="detail-button" style={{position: 'absolute', top: '1px', right:'30px'}} onClick={closeDetail}>Close</button>
                    <div className="DetailContent">
                        <h2 style={{ paddingBottom: '20px' }}>{selectedRecipe.title}</h2>
                        <h3 style={{textAlign:'center',paddingBottom: '10px'}}>Ingredients:</h3>
                        <ul>
                            {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                                <li className="IngredientItem" key={index}>
                                    <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt={ingredient.name} />
                                    <p>{ingredient.original}</p>
                                </li>
                            ))}
                        </ul>
                        <h3 style={{textAlign:'center',paddingBottom: '10px'}}>Instructions:</h3>
                        <p style={{ lineHeight: '25px' }}>{stripHtmlTags(selectedRecipe.instructions)}</p>
                        <h3 style={{textAlign:'center',paddingBottom: '20px'}}>Summary:</h3>
                        <p style={{ lineHeight: '25px' }}>{stripHtmlTags(selectedRecipe.summary)}</p>

                      
                    </div>
                </div>
            )}
        </>
    );
}

export default Detail;

