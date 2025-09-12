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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header Section */}
      <div className="pt-16 pb-6">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Welcome to Your Feed
            </h1>
            <p className="text-gray-600 text-lg">Share your thoughts and connect with others</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid gap-8">
          {/* Project Create Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-800">Create Something Amazing</h2>
            </div>
            <ProjectCreate/>
          </div>

          {/* Posts Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-800">Latest Posts</h2>
            </div>
            <Postlist/>
          </div>
        </div>
      </div>

      {/* Floating decoration elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="fixed top-40 right-16 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="fixed bottom-32 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="fixed bottom-40 right-10 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
    </div>
  );
};

export default MainPage;
