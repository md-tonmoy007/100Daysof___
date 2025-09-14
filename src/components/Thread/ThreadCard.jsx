import React from 'react';
import { Link } from 'react-router-dom';

function ThreadCard({ userThread, isMyProfile }) {
  const progressPercentage = Math.min((userThread.current_day / 100) * 100, 100);
  
  return (
    <Link 
      to={`/threads/${userThread.thread.id}`} 
      className="block group h-full"
    >
      <div className="bg-twitter-backgroundSecondary border border-twitter-border rounded-xl shadow p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:bg-twitter-surface relative overflow-hidden h-full flex flex-col">
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {userThread.is_completed ? (
            <div className="bg-twitter-success text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span>🏆</span>
              Completed
            </div>
          ) : userThread.is_active ? (
            <div className="bg-twitter-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span>🔥</span>
              Active
            </div>
          ) : (
            <div className="bg-twitter-border text-twitter-textSecondary px-3 py-1 rounded-full text-xs font-medium">
              Paused
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="mb-4 flex-grow">
          <h3 className="text-lg font-bold text-twitter-text group-hover:text-twitter-primary transition-colors duration-200 mb-2 pr-20">
            {userThread.thread.display_name}
          </h3>
          {userThread.thread.description && (
            <p className="text-twitter-textSecondary text-sm line-clamp-2 mb-3">
              {userThread.thread.description}
            </p>
          )}
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-twitter-text">
              Day {userThread.current_day} of 100
            </span>
            <span className="text-sm text-twitter-textSecondary">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-twitter-border rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-twitter-primary to-twitter-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm mt-auto">
          <div className="flex items-center gap-3">
            <div className="text-twitter-textSecondary">
              <span className="text-twitter-text font-medium">{userThread.posts_count}</span> posts
            </div>
            <div className="text-twitter-textSecondary text-xs">
              {new Date(userThread.started_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
          
          <div className="flex items-center text-twitter-primary">
            <span className="text-xs">View →</span>
          </div>
        </div>

        {/* Completion Date */}
        {userThread.is_completed && userThread.completed_at && (
          <div className="mt-3 pt-3 border-t border-twitter-border">
            <div className="text-xs text-twitter-success flex items-center gap-1">
              <span>🎉</span>
              Completed {new Date(userThread.completed_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        )}

        {/* Hover effect decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-twitter-primary to-twitter-success opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
}

export default ThreadCard;
