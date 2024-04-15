import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

function App() {
  const [backendData, setBackendData] = useState([])


  useEffect(() => {
    axios.get('http://localhost:5000/api/userinfos')
      .then(response => {
        setBackendData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div>
      {
         backendData === null? ( 
          <p>Loading...</p>) : 
          backendData && backendData.length > 0 ? (
            backendData.map((data) => (
              <div>
                <p >email: {data.email}</p>
                <p >userName: {data.userName}</p>
                <p >password: {data.password}</p>
                <p >preference: {data.preference}</p>
                <p >createDate: {data.createDate}</p>
              </div>
            ))
        ) : (
            <p>No users found.</p>
        )
      
      }
    </div>
  )
}

export default App