import React, { useEffect } from "react";
import Postcreate from "./components/Postcreate";
import Postlist from "./components/Postlist";
import { isAuthenticated } from "./utils/isAuthenticated";
import { redirect } from "react-router-dom";
import ProjectCreate from "./components/Project/ProjectCreate";
import RecentThreads from "./components/Sidebar/RecentThreads";
import RecentFriends from "./components/Sidebar/RecentFriends";
import ThreadSuggestions from "./components/Sidebar/ThreadSuggestions";
import FriendSuggestions from "./components/Sidebar/FriendSuggestions";

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-twitter-text mb-2">
            Welcome to Your Feed
          </h1>
          <p className="text-twitter-textSecondary text-lg">Share your thoughts and connect with others</p>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="w-full pb-12 px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Recent Threads */}
            <div className="bg-twitter-surface rounded-2xl shadow-xl p-6 border border-twitter-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-twitter-text">Active Threads</h3>
              </div>
              <RecentThreads />
            </div>

            {/* Recent Friends */}
            <div className="bg-twitter-surface rounded-2xl shadow-xl p-6 border border-twitter-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-twitter-text">Recent Activity</h3>
              </div>
              <RecentFriends />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
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

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Thread Suggestions */}
            <div className="bg-twitter-surface rounded-2xl shadow-xl p-6 border border-twitter-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-twitter-text">Discover Threads</h3>
              </div>
              <ThreadSuggestions />
            </div>

            {/* Friend Suggestions */}
            <div className="bg-twitter-surface rounded-2xl shadow-xl p-6 border border-twitter-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-twitter-text">People to Follow</h3>
              </div>
              <FriendSuggestions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
