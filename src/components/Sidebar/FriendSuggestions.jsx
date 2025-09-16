import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FriendSuggestions() {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestedFriends();
  }, []);

  const fetchSuggestedFriends = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/account/suggested-friends/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestedFriends(data.results || data);
      }
    } catch (error) {
      console.error('Error fetching suggested friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendFriendRequest = async (userId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/account/friends/${userId}/request/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the friend's status to show request sent
        setSuggestedFriends(prev => 
          prev.map(friend => 
            friend.id === userId 
              ? { ...friend, request_sent: true }
              : friend
          )
        );
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-12 w-12 bg-twitter-border rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-twitter-border rounded mb-1"></div>
                <div className="h-3 bg-twitter-border rounded w-2/3"></div>
              </div>
            </div>
            <div className="h-8 bg-twitter-border rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (suggestedFriends.length === 0) {
    return (
      <div className="text-twitter-textSecondary text-sm text-center py-4">
        No friend suggestions available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestedFriends.slice(0, 4).map((friend) => (
        <div key={friend.id} className="border border-twitter-border rounded-lg p-4 hover:bg-twitter-hover transition-colors">
          <div className="flex items-start space-x-3 mb-3">
            <Link to={`/profile/${friend.id}`}>
              {friend.avatar ? (
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold hover:opacity-80 transition-opacity">
                  {friend.name.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <Link 
                to={`/profile/${friend.id}`}
                className="block hover:text-twitter-primary transition-colors"
              >
                <h4 className="text-twitter-text font-semibold text-sm truncate">
                  {friend.name}
                </h4>
              </Link>
              <p className="text-twitter-textSecondary text-xs mt-1">
                @{friend.email.split('@')[0]}
              </p>
              {friend.mutual_friends > 0 && (
                <p className="text-twitter-textSecondary text-xs mt-1">
                  {friend.mutual_friends} mutual friends
                </p>
              )}
              {friend.common_threads > 0 && (
                <p className="text-twitter-textSecondary text-xs">
                  {friend.common_threads} common threads
                </p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            {friend.request_sent ? (
              <button
                disabled
                className="flex-1 bg-twitter-border text-twitter-textSecondary text-xs font-medium py-2 px-3 rounded-lg cursor-not-allowed"
              >
                Request Sent
              </button>
            ) : (
              <button
                onClick={() => handleSendFriendRequest(friend.id)}
                className="flex-1 bg-twitter-primary hover:bg-twitter-primaryHover text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors"
              >
                Add Friend
              </button>
            )}
            <Link
              to={`/profile/${friend.id}`}
              className="flex-1 border border-twitter-border hover:border-twitter-primary text-twitter-text hover:text-twitter-primary text-xs font-medium py-2 px-3 rounded-lg transition-colors text-center"
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
      
      <Link
        to="/discover/people"
        className="block text-twitter-primary hover:text-twitter-primaryHover text-sm font-medium text-center py-3 hover:bg-twitter-hover rounded-lg transition-colors"
      >
        Discover more people →
      </Link>
    </div>
  );
}

export default FriendSuggestions;
