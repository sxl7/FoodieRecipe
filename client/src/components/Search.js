import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCuisine, setSearchCuisine] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchCuisineChange = (event) => {
    setSearchCuisine(event.target.value);
  };

  return (
    <div  style={{marginTop: '80px', textAlign:'center'}}>
      <form>
        <input style={{margin:'3px'}}
          type="text"
          value={searchTerm}
          placeholder="Search by Term" 
          autoComplete="off"
          onChange={handleSearchTermChange}
        />
        <input style={{margin:'3px'}}
          type="text"
          value={searchCuisine}
          placeholder="Search by Cuisine" 
          autoComplete="off"
          onChange={handleSearchCuisineChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;