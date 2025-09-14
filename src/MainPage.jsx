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
  <div className="min-h-screen bg-twitter-background text-twitter-text">
      {/* Header Section */}
      <div className="pt-16 pb-6">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-twitter-text mb-2">
              Welcome to Your Feed
            </h1>
            <p className="text-twitter-textSecondary text-lg">Share your thoughts and connect with others</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid gap-8">
          {/* Project Create Section */}
          <div className="bg-twitter-surface rounded-2xl shadow-xl p-8 border border-twitter-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-twitter-primary rounded-full"></div>
              <h2 className="text-2xl font-semibold text-twitter-text">Create Something Amazing</h2>
            </div>
            <ProjectCreate/>
          </div>

          {/* Posts Section */}
          <div className="bg-twitter-surface rounded-2xl shadow-xl p-8 border border-twitter-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-twitter-primary rounded-full"></div>
              <h2 className="text-2xl font-semibold text-twitter-text">Latest Posts</h2>
            </div>
            <Postlist/>
          </div>
        </div>
      </div>

  {/* Simple clean Twitter-style layout */}
    </div>
  );
};

export default MainPage;
