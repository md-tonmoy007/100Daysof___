import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecentFriends() {
  const [recentFriends, setRecentFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentFriends();
  }, []);

  const fetchRecentFriends = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/account/recent-friends/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecentFriends(data.results || data);
      }
    } catch (error) {
      console.error('Error fetching recent friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-twitter-border rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-twitter-border rounded mb-1"></div>
                <div className="h-3 bg-twitter-border rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recentFriends.length === 0) {
    return (
      <div className="text-twitter-textSecondary text-sm text-center py-4">
        No recent activity from friends
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentFriends.slice(0, 5).map((friend) => (
        <Link
          key={friend.id}
          to={`/profile/${friend.id}`}
          className="block hover:bg-twitter-hover p-3 rounded-lg transition-colors group"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              {friend.avatar ? (
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {friend.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-twitter-surface"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-twitter-text font-medium text-sm truncate group-hover:text-twitter-primary">
                {friend.name}
              </h4>
              <p className="text-twitter-textSecondary text-xs">
                Posted {formatTimeAgo(friend.last_post_date)}
              </p>
            </div>
          </div>
        </Link>
      ))}
      
      <Link
        to="/friends"
        className="block text-twitter-primary hover:text-twitter-primaryHover text-sm font-medium text-center py-2 hover:bg-twitter-hover rounded-lg transition-colors"
      >
        View all friends →
      </Link>
    </div>
  );
}

export default RecentFriends;
