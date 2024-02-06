import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log(localStorage.getItem('token'))
      try {
        const response = await axios.get('http://localhost:8000/api/me/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
      const response = await axios.post(
          'http://localhost:8000/api/logout/',
          { refresh: localStorage.getItem('refreshToken') }
      );
      if (response.status === 205) {
          // Clear tokens from local storage or state
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          // Redirect to login or homepage
          window.location.href = '/signin'; // Redirect to login page
      }
  } catch (error) {
      console.error('Logout failed:', error);
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
