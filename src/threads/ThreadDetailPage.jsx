import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function ThreadDetailPage() {
  const { threadId } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user_id');
  const [threadData, setThreadData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userThread, setUserThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredByUser, setFilteredByUser] = useState(false);

  useEffect(() => {
    fetchThreadDetails();
  }, [threadId, userId]);

  const fetchThreadDetails = async () => {
    try {
      const url = userId 
        ? `http://localhost:8000/api/posts/threads/${threadId}/?user_id=${userId}`
        : `http://localhost:8000/api/posts/threads/${threadId}/`;
        
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setThreadData(response.data.thread);
      setPosts(response.data.posts);
      setUserThread(response.data.user_thread);
      setFilteredByUser(response.data.filtered_by_user || false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching thread details:', error);
      setError('Failed to load thread details');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-twitter-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-twitter-surface border border-twitter-border rounded-3xl p-8 animate-pulse">
            <div className="h-8 bg-twitter-border rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-twitter-border rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-twitter-backgroundSecondary border border-twitter-border rounded-xl p-6">
                  <div className="h-4 bg-twitter-border rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-twitter-border rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-twitter-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="bg-twitter-error/10 border border-twitter-error/20 rounded-3xl p-12 max-w-md mx-auto">
              <div className="text-twitter-error text-6xl mb-6">😞</div>
              <h3 className="text-2xl font-bold text-twitter-error mb-4">Something went wrong</h3>
              <p className="text-twitter-error mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-twitter-error text-white px-6 py-3 rounded-full font-medium hover:bg-twitter-error/90 transition-all duration-200 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = userThread ? Math.min((userThread.current_day / 100) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-twitter-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-twitter-textSecondary hover:text-twitter-primary transition-colors duration-200"
          >
            <span>←</span>
            Back to Profile
          </button>
        </div>

        {/* Thread Header */}
        <div className="bg-twitter-surface border border-twitter-border rounded-3xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-twitter-text mb-2">
                {threadData?.display_name}
              </h1>
              {threadData?.description && (
                <p className="text-twitter-textSecondary text-lg">
                  {threadData.description}
                </p>
              )}
            </div>
            
            {userThread && (
              <div className="text-right">
                {userThread.is_completed ? (
                  <div className="bg-twitter-success text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <span>🏆</span>
                    Completed
                  </div>
                ) : userThread.is_active ? (
                  <div className="bg-twitter-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <span>🔥</span>
                    Active
                  </div>
                ) : (
                  <div className="bg-twitter-border text-twitter-textSecondary px-4 py-2 rounded-full text-sm font-medium">
                    Paused
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress Section */}
          {userThread && (
            <div className="border-t border-twitter-border pt-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-medium text-twitter-text">
                  Day {userThread.current_day} of 100
                </span>
                <span className="text-twitter-textSecondary">
                  {progressPercentage.toFixed(0)}% Complete
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-twitter-border rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-twitter-primary to-twitter-success h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-sm text-twitter-textSecondary">
                <span>Started {new Date(userThread.started_at).toLocaleDateString()}</span>
                <span>{userThread.posts_count} posts created</span>
              </div>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="bg-twitter-surface border border-twitter-border rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-twitter-primary rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-semibold text-twitter-text">
              {filteredByUser ? 'User Posts' : 'Thread Posts'}
            </h2>
            <div className="ml-auto flex items-center gap-2">
              {filteredByUser && (
                <Link 
                  to={`/threads/${threadId}`}
                  className="text-xs text-twitter-primary hover:text-twitter-primary/80 bg-twitter-primary/10 hover:bg-twitter-primary/20 px-3 py-1 rounded-full transition-colors duration-200 flex items-center gap-1"
                >
                  👥 View all posts
                </Link>
              )}
              {filteredByUser && (
                <span className="text-xs text-twitter-textSecondary bg-twitter-primary/10 text-twitter-primary px-2 py-1 rounded-full">
                  👤 Filtered by user
                </span>
              )}
              <span className="text-sm text-twitter-textSecondary bg-twitter-border px-3 py-1 rounded-full">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-4">
              {filteredByUser ? (
                <div className="mb-4 text-sm text-twitter-textSecondary bg-twitter-backgroundSecondary border border-twitter-border rounded-lg p-3">
                  👤 Showing posts by {posts[0]?.created_by?.name} only, sorted from Day 1 to the latest day
                </div>
              ) : (
                <div className="mb-4 text-sm text-twitter-textSecondary bg-twitter-backgroundSecondary border border-twitter-border rounded-lg p-3">
                  📅 Posts are sorted from Day 1 to the latest day
                </div>
              )}
              {posts.map((post, index) => (
                <Link 
                  key={post.id} 
                  to={`/posts/details/${post.id}`} 
                  className="block group"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animation: 'fadeInUp 0.4s ease-out forwards'
                  }}
                >
                  <div className="bg-twitter-backgroundSecondary border border-twitter-border rounded-xl p-6 hover:bg-twitter-surface transition-all duration-200 group-hover:shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.created_by.avatar ? `http://localhost:8000${post.created_by.avatar}` : post.created_by.get_avatar}
                          alt={post.created_by.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-twitter-border"
                        />
                        <div>
                          <h4 className="font-semibold text-twitter-text">
                            {post.created_by.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-twitter-textSecondary">
                            {post.day_number && (
                              <span className="bg-twitter-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                                Day {post.day_number}
                              </span>
                            )}
                            <span>{post.created_at_formatted} ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-twitter-text leading-relaxed group-hover:text-twitter-primary transition-colors duration-200 mb-4">
                      {post.body}
                    </div>

                    {/* Post stats */}
                    <div className="flex items-center gap-4 text-sm text-twitter-textSecondary border-t border-twitter-border pt-3">
                      <span className="flex items-center gap-1 hover:text-twitter-primary transition-colors">
                        💬 {post.comments_count} {post.comments_count === 1 ? 'comment' : 'comments'}
                      </span>
                      <span className="flex items-center gap-1 hover:text-twitter-error transition-colors">
                        ❤️ {post.likes_count} {post.likes_count === 1 ? 'like' : 'likes'}
                      </span>
                      <span className="ml-auto text-xs">
                        {new Date(post.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-twitter-text mb-4">No Posts Yet</h3>
              <p className="text-twitter-textSecondary mb-8 max-w-md mx-auto">
                This thread doesn't have any posts yet. Start your journey and create the first post!
              </p>
              <div className="w-20 h-1 bg-twitter-primary rounded-full mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThreadDetailPage;
