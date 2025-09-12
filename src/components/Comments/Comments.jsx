import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Comments(comment) {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${comment.comment}/comment_show/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // "Content-Type":
        },
      })
      .then((res) => {
        console.log(res.data.created_by);
        setComments(res.data);
        setUser(res.data.created_by);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [comment.comment]);

  if (loading) {
    return (
      <div className="animate-pulse flex items-center gap-3 p-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/40 transition-all duration-200">
      <div className="flex items-start gap-3">
        <Link to={`/profile/${user.id}`} className="flex-shrink-0 group">
          <div className="relative">
            <img
              src={
                user.avatar
                  ? `http://localhost:8000${user.avatar}`
                  : user.get_avatar
              }
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/40 shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white shadow-sm"></div>
          </div>
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Link 
              to={`/profile/${user.id}`}
              className="font-semibold text-sm text-gray-800 hover:text-purple-600 transition-colors duration-200"
            >
              {user.name}
            </Link>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">
              @{user.name?.toLowerCase().replace(/\s+/g, '')}
            </span>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-white/30">
            <p className="text-gray-800 text-sm leading-relaxed break-words">
              {comments.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
