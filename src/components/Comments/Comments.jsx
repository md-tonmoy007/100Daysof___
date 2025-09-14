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
        <div className="w-10 h-10 bg-twitter-border rounded-full"></div>
        <div className="flex-1">
          <div className="h-3 bg-twitter-border rounded w-20 mb-2"></div>
          <div className="h-4 bg-twitter-border rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-twitter-surface border border-twitter-border rounded-xl p-4 hover:bg-twitter-backgroundSecondary transition-all duration-200">
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
              className="w-10 h-10 rounded-full object-cover border-2 border-twitter-border shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-twitter-success rounded-full border border-twitter-surface shadow-sm"></div>
          </div>
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Link 
              to={`/profile/${user.id}`}
              className="font-semibold text-sm text-twitter-text hover:text-twitter-primary transition-colors duration-200"
            >
              {user.name}
            </Link>
            <span className="text-xs text-twitter-textSecondary">•</span>
            <span className="text-xs text-twitter-textSecondary">
              @{user.name?.toLowerCase().replace(/\s+/g, '')}
            </span>
          </div>
          
          <div className="bg-twitter-backgroundSecondary border border-twitter-border rounded-lg p-3">
            <p className="text-twitter-text text-sm leading-relaxed break-words">
              {comments.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
