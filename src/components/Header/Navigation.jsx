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
  <div className="bg-twitter-background border-b border-twitter-border shadow-lg sticky top-0 z-40">
  <header className="flex justify-between items-center px-6 max-w-6xl mx-auto py-4">
          <div>
            <span
              className="text-3xl font-extrabold text-twitter-primary tracking-tight cursor-pointer select-none hover:scale-105 transition-transform"
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
                className="px-4 py-2 bg-twitter-surface border border-twitter-border rounded-full text-twitter-text placeholder-twitter-textSecondary focus:outline-none focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary transition-all w-64"
              />
              <button 
                type='submit' 
                disabled={!query.trim()}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
                  query.trim() 
                    ? 'bg-twitter-primary text-white hover:bg-twitter-primary/90' 
                    : 'bg-twitter-border text-twitter-textSecondary cursor-not-allowed'
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
                    ? "bg-twitter-surface text-twitter-primary shadow-md" 
                    : "text-twitter-textSecondary hover:text-twitter-primary hover:bg-twitter-surface/70"
                }`}
                onClick={() => navigate("/")}
              >
                🏠 Home
              </li>
              <li
                className={`cursor-pointer py-2 px-4 text-sm font-semibold rounded-full transition-all duration-200 ${
                  pathMatchRoute("/friends") 
                    ? "bg-twitter-surface text-twitter-primary shadow-md" 
                    : "text-twitter-textSecondary hover:text-twitter-primary hover:bg-twitter-surface/70"
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
                      ? "ring-2 ring-twitter-primary shadow-lg" 
                      : "hover:ring-2 hover:ring-twitter-primary/50"
                  }`}
                  onClick={() => navigate(`/profile/${id}`)}
                >
                  <img 
                    src={userDetail.avatar ? `http://localhost:8000${userDetail.avatar}` : userDetail.get_avatar} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-twitter-border shadow-md"
                  />
                </li>
                :
                <li
                  className={`cursor-pointer py-2 px-4 text-sm font-semibold rounded-full transition-all duration-200 ${
                    pathMatchRoute("/signin") 
                      ? "bg-twitter-surface text-twitter-primary shadow-md" 
                      : "text-twitter-textSecondary hover:text-twitter-primary hover:bg-twitter-surface/70"
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
