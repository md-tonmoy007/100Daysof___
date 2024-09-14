import React, { useEffect } from "react";
import Postcreate from "./components/Postcreate";
import Postlist from "./components/Postlist";
import { isAuthenticated } from "./utils/isAuthenticated";
import { redirect } from "react-router-dom";
import ProjectCreate from "./components/Project/ProjectCreate";

const MainPage = () => {
    useEffect(()=>{
      if(!isAuthenticated()){
        console.log("not authenticated")
        // window.location = "/signin"
      }
    }, [])
    
  return (
    
    <div className="w-[50%] ml-[25%]">
      <ProjectCreate/>
      <Postlist/>
    </div>

  );
};

export default MainPage;
