import React from 'react'
import { useEffect,useState } from 'react'

function App() {
  const [backendData, setBackendData] = useState([])


  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("/api"); // Fetch data from '/api' endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON from the response
        setBackendData(data); // Update the state with the fetched data
        // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state or retry logic here if needed
        
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <div>
      {
         backendData === null? ( 
          <p>Loading...</p>) : 
          backendData.users && backendData.users.length > 0 ? (
            backendData.users.map((user,i) => (
                <p key={i}>{user}</p>
            ))
        ) : (
            <p>No users found.</p>
        )
      
      }
    </div>
  )
}

export default App