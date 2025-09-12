import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../utils/isAuthenticated';

import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [userDetail, setUserDetail] = useState([]);
  const [query, setQuery] = useState("");


  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(query)
  };

  const handleSearch = async (e) => {
     e.preventDefault();
     
     // Trim whitespace and check if query is empty
     const trimmedQuery = query.trim();
     
     if (!trimmedQuery) {
       // Don't search if query is empty or only whitespace
       return;
     }
     
     window.location.href = `/search/${encodeURIComponent(trimmedQuery)}`
    }

  useEffect(()=>{
    axios.get("http://localhost:8000/api/me",{
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // "Content-Type": 
       },
      }
  ).then
  (res=>{
      console.log(res.data)  
      setUserDetail(res.data.user);
      setId(res.data.user.id) 
      setName(res.data.user.name[0])
  })
  .catch(err=>{
      console.error(err)
  })
  }, [])

    
    const location = useLocation();
    const navigate = useNavigate();
    function pathMatchRoute(route) {
      if (route === location.pathname) {
        console.log(location.pathname)
        console.log(true)
        return true;
      }
    }
    return (
        <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 border-b border-white/30 shadow-lg backdrop-blur-sm sticky top-0 z-40">
        <header className="flex justify-between items-center px-6 max-w-6xl mx-auto py-4">
          <div>
            <span
              className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight cursor-pointer select-none hover:scale-105 transition-transform"
              onClick={() => navigate("/")}
            >
              #100DaysOf__
            </span>
          </div>
          
          <div>
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search users, posts..."
                onChange={handleChange}
                className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/30 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-64"
              />
              <button 
                type='submit' 
                disabled={!query.trim()}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
                  query.trim() 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Search
              </button>
            </form>
          </div>
          
          <div>
            <ul className="flex items-center space-x-8">
              <li
                className={`cursor-pointer py-2 px-4 text-sm font-semibold rounded-full transition-all duration-200 ${
                  pathMatchRoute("/") 
                    ? "bg-white/70 text-purple-700 shadow-md backdrop-blur-sm" 
                    : "text-gray-600 hover:text-purple-600 hover:bg-white/30"
                }`}
                onClick={() => navigate("/")}
              >
                🏠 Home
              </li>
              <li
                className={`cursor-pointer py-2 px-4 text-sm font-semibold rounded-full transition-all duration-200 ${
                  pathMatchRoute("/friends") 
                    ? "bg-white/70 text-purple-700 shadow-md backdrop-blur-sm" 
                    : "text-gray-600 hover:text-purple-600 hover:bg-white/30"
                }`}
                onClick={() => navigate("/friends")}
              >
                👥 Friends
              </li>
              
              {
                id !== "" ?
                <li
                  className={`cursor-pointer p-1 rounded-full transition-all duration-200 ${
                    pathMatchRoute(`/profile/${id}`) 
                      ? "ring-2 ring-purple-500 shadow-lg" 
                      : "hover:ring-2 hover:ring-purple-300"
                  }`}
                  onClick={() => navigate(`/profile/${id}`)}
                >
                  <img 
                    src={userDetail.avatar ? `http://localhost:8000${userDetail.avatar}` : userDetail.get_avatar} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </li>
                :
                <li
                  className={`cursor-pointer py-2 px-4 text-sm font-semibold rounded-full transition-all duration-200 ${
                    pathMatchRoute("/signin") 
                      ? "bg-white/70 text-purple-700 shadow-md backdrop-blur-sm" 
                      : "text-gray-600 hover:text-purple-600 hover:bg-white/30"
                  }`}
                  onClick={() => navigate("/signin")}
                >
                  🔐 Sign In
                </li>
              }
            </ul>
        </div>
        
    </header>
    </div>
    );
};

export default Navigation;
