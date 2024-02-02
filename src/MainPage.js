import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/me/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/logout/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    
    

  };
  return (
    <div>
      {userData ? (
        <div>
            <h2>Welcome, {userData.name}!</h2>
            <p>Here is your email address - {userData.email}</p>
            <button onClick={logout}>Logout</button>
        </div> 
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MainPage;
