import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecentThreads() {
  const [recentThreads, setRecentThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentThreads();
  }, []);

  const fetchRecentThreads = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/posts/recent-threads/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecentThreads(data.results || data);
      }
    } catch (error) {
      console.error('Error fetching recent threads:', error);
    } finally {
      setLoading(false);
    }
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
                <div className="h-3 bg-twitter-border rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recentThreads.length === 0) {
    return (
      <div className="text-twitter-textSecondary text-sm text-center py-4">
        No active threads yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentThreads.slice(0, 5).map((thread) => (
        <Link
          key={thread.id}
          to={`/threads/${thread.id}`}
          className="block hover:bg-twitter-hover p-3 rounded-lg transition-colors group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-twitter-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {thread.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-twitter-text font-medium text-sm truncate group-hover:text-twitter-primary">
                {thread.name}
              </h4>
              <p className="text-twitter-textSecondary text-xs">
                {thread.participants_count} participants • {thread.posts_count} posts
              </p>
            </div>
          </div>
        </Link>
      ))}
      
      <Link
        to="/threads"
        className="block text-twitter-primary hover:text-twitter-primaryHover text-sm font-medium text-center py-2 hover:bg-twitter-hover rounded-lg transition-colors"
      >
        View all threads →
      </Link>
    </div>
  );
}

export default RecentThreads;
