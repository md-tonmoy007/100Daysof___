import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ThreadSuggestions() {
  const [suggestedThreads, setSuggestedThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestedThreads();
  }, []);

  const fetchSuggestedThreads = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/posts/suggested-threads/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestedThreads(data.results || data);
      }
    } catch (error) {
      console.error('Error fetching suggested threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinThread = async (threadId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/posts/threads/join/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thread_id: threadId }),
      });

      if (response.ok) {
        // Remove the joined thread from suggestions
        setSuggestedThreads(prev => prev.filter(thread => thread.id !== threadId));
      }
    } catch (error) {
      console.error('Error joining thread:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-12 w-12 bg-twitter-border rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 bg-twitter-border rounded mb-1"></div>
                <div className="h-3 bg-twitter-border rounded w-3/4"></div>
              </div>
            </div>
            <div className="h-8 bg-twitter-border rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (suggestedThreads.length === 0) {
    return (
      <div className="text-twitter-textSecondary text-sm text-center py-4">
        No thread suggestions available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestedThreads.slice(0, 4).map((thread) => (
        <div key={thread.id} className="border border-twitter-border rounded-lg p-4 hover:bg-twitter-hover transition-colors">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold">
              {thread.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-twitter-text font-semibold text-sm truncate">
                {thread.name}
              </h4>
              <p className="text-twitter-textSecondary text-xs mt-1 line-clamp-2">
                {thread.description || 'Join this thread to start your journey!'}
              </p>
              <div className="flex items-center mt-2 text-xs text-twitter-textSecondary">
                <span>{thread.participants_count} members</span>
                <span className="mx-1">•</span>
                <span>{thread.posts_count} posts</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleJoinThread(thread.id)}
              className="flex-1 bg-twitter-primary hover:bg-twitter-primaryHover text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Join Thread
            </button>
            <Link
              to={`/threads/${thread.id}`}
              className="flex-1 border border-twitter-border hover:border-twitter-primary text-twitter-text hover:text-twitter-primary text-xs font-medium py-2 px-3 rounded-lg transition-colors text-center"
            >
              Preview
            </Link>
          </div>
        </div>
      ))}
      
      <Link
        to="/threads/discover"
        className="block text-twitter-primary hover:text-twitter-primaryHover text-sm font-medium text-center py-3 hover:bg-twitter-hover rounded-lg transition-colors"
      >
        Discover more threads →
      </Link>
    </div>
  );
}

export default ThreadSuggestions;
