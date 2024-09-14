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
     window.location.href = `/search/${query}`
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
        <div className="bg-white border-b border-slate-600 shadow-sm sticky top-0 z-40 mb-[50px]">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
          <div>
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="logo"
              className="h-5 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <div>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search"
                onChange={handleChange}
                className="m-3 border text-black bg-gray-300 border-gray-500 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input type='submit' value='search' className="bg-slate-500 px-4 py-1 rounded-lg"/>
            </form>
          </div>
          <div>
            <ul className="flex space-x-10">
              <li
                style={pathMatchRoute("/")?{borderBottom: "5px red solid", color: "black"}: {borderBottom: "transparent"}}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoute("/") && "text-white border-b-red-500"
                }`}
                onClick={() => navigate("/")}
              >
                Homies
              </li>
              <li
                style={pathMatchRoute("/friends")?{borderBottom: "5px red solid", color:"black"}: {borderBottom: "transparent"}}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent`}
                onClick={() => navigate("/friends")}
              >
                friends
              </li>
              
              {
                id !== ""?
                <li
              style={pathMatchRoute(`/profile/${id}`)?{borderBottom: "5px red solid", color:"white"}: {borderBottom: "transparent"}}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                ${pathMatchRoute("/signin") && "text-white border-b-red-500"}`}
                onClick={() => navigate(`/profile/${id}`)}
              >
                <img 
      src={userDetail.avatar?`http://localhost:8000${userDetail.avatar}`:userDetail.get_avatar} alt="" 
      className="w-[40px] h-[40px] rounded-full object-cover"/>
              </li>
              :
              <li
              style={pathMatchRoute("/signin")?{borderBottom: "5px red solid", color:"white"}: {borderBottom: "transparent"}}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                ${pathMatchRoute("/signin") && "text-white border-b-red-500"}`}
                onClick={() => navigate("/signin")}
              >
                signin
              </li>
              }
            </ul>
        </div>
        
    </header>
    </div>
    );
};

export default Navigation;
