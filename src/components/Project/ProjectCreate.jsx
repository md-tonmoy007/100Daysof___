import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Postcreate() {
  const [content, setContent] = useState('');
  const [selectedThread, setSelectedThread] = useState('');
  const [dayNumber, setDayNumber] = useState('');
  const [threads, setThreads] = useState([]);
  const [userThreads, setUserThreads] = useState([]);
  const [availableThreads, setAvailableThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showJoinThread, setShowJoinThread] = useState(false);
  const [newThreadTopic, setNewThreadTopic] = useState('');
  const [newThreadDescription, setNewThreadDescription] = useState('');
  const [postType, setPostType] = useState('regular'); // 'regular', 'existing-thread', 'new-thread'
  const [joiningThreadId, setJoiningThreadId] = useState(null); // Track which thread is being joined

  useEffect(() => {
    fetchThreads();
    fetchUserThreads();
  }, []);

  useEffect(() => {
    // Filter available threads (not joined by user)
    if (threads.length && userThreads.length) {
      const joinedThreadIds = userThreads.map(ut => ut.thread.id);
      const available = threads.filter(t => !joinedThreadIds.includes(t.id));
      setAvailableThreads(available);
      setFilteredThreads(available);
    } else if (threads.length && userThreads.length === 0) {
      setAvailableThreads(threads);
      setFilteredThreads(threads);
    }
  }, [threads, userThreads]);

  useEffect(() => {
    // Filter threads based on search query
    if (searchQuery.trim() === '') {
      setFilteredThreads(availableThreads);
    } else {
      const filtered = availableThreads.filter(thread =>
        thread.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (thread.description && thread.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredThreads(filtered);
    }
  }, [searchQuery, availableThreads]);

  const fetchThreads = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts/threads/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setThreads(response.data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  const fetchUserThreads = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts/threads/my/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUserThreads(response.data);
    } catch (error) {
      console.error('Error fetching user threads:', error);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleThreadChange = (e) => {
    setSelectedThread(e.target.value);
    // Auto-suggest next day for selected thread
    if (e.target.value) {
      const userThread = userThreads.find(ut => ut.id === e.target.value);
      if (userThread) {
        setDayNumber(userThread.current_day + 1);
      }
    } else {
      setDayNumber('');
    }
  };

  const handlePostTypeChange = (type) => {
    setPostType(type);
    setSelectedThread('');
    setDayNumber('');
  };

  const joinExistingThread = async (threadId) => {
    try {
      setJoiningThreadId(threadId); // Set loading state
      
      const response = await axios.post('http://localhost:8000/api/posts/threads/join/', {
        thread_id: threadId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json',
        },
      });
      
      // Refresh user threads and wait for the update
      await fetchUserThreads();
      await fetchThreads(); // Also refresh all threads to update participant counts
      
      // Set the newly joined thread as selected and switch to existing thread mode
      const updatedUserThreadsResponse = await axios.get('http://localhost:8000/api/posts/threads/my/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      
      const newUserThread = updatedUserThreadsResponse.data.find(ut => ut.thread.id === threadId);
      if (newUserThread) {
        setPostType('existing-thread');
        setSelectedThread(newUserThread.id);
        setDayNumber(1); // Start from day 1
        setShowJoinThread(false);
        
        // Show success message
        alert('Successfully joined the thread! You can now create your first post.');
      }
      
      return true;
    } catch (error) {
      console.error('Error joining thread:', error);
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert('Error joining thread. Please try again.');
      }
      return false;
    } finally {
      setJoiningThreadId(null); // Clear loading state
    }
  };

  const createNewThread = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/posts/threads/create/', {
        topic: newThreadTopic,
        description: newThreadDescription
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json',
        },
      });
      
      // Join the newly created thread
      await axios.post('http://localhost:8000/api/posts/threads/join/', {
        thread_id: response.data.id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json',
        },
      });
      
      // Refresh threads and user threads
      await fetchThreads();
      await fetchUserThreads();
      
      return response.data;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let threadId = null;
      let userThreadId = null;
      
      if (postType === 'new-thread') {
        if (!newThreadTopic.trim()) {
          alert('Please enter a thread topic');
          return;
        }
        
        // Create new thread first
        const newThread = await createNewThread();
        threadId = newThread.id;
        
        // Get the user thread that was just created
        const updatedUserThreads = await axios.get('http://localhost:8000/api/posts/threads/my/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        
        const newUserThread = updatedUserThreads.data.find(ut => ut.thread.id === threadId);
        userThreadId = newUserThread?.id;
        
      } else if (postType === 'existing-thread') {
        if (!selectedThread) {
          alert('Please select a thread');
          return;
        }
        userThreadId = selectedThread;
        const userThread = userThreads.find(ut => ut.id === selectedThread);
        threadId = userThread?.thread.id;
      }

      // Prepare post data
      const postData = {
        body: content,
      };

      if (threadId && userThreadId && dayNumber) {
        postData.thread = threadId;
        postData.user_thread = userThreadId;
        postData.day_number = parseInt(dayNumber);
      }

      // Create the post
      await axios.post('http://localhost:8000/api/posts/post_create/', postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json',
        },
      });

      // Reset form
      setContent('');
      setSelectedThread('');
      setDayNumber('');
      setNewThreadTopic('');
      setNewThreadDescription('');
      
      window.location.reload();
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert('Error creating post. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-twitter-background text-twitter-text p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-twitter-primary mb-4">
            Create Your Post
          </h1>
          <p className="text-lg text-twitter-textSecondary">Share your thoughts or continue your 100-day challenge journey</p>
        </div>

        {/* Main Card */}
        <div className="bg-twitter-surface rounded-3xl border border-twitter-border shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Post Type Selection */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-twitter-text mb-6 flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Choose Your Post Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => handlePostTypeChange('regular')}
                  className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                    postType === 'regular'
                      ? 'border-twitter-primary bg-twitter-backgroundSecondary shadow-lg'
                      : 'border-twitter-border bg-twitter-surface hover:border-twitter-primary/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 transition-transform">📝</div>
                    <h4 className="font-bold text-lg text-twitter-text mb-2">Regular Post</h4>
                    <p className="text-sm text-twitter-textSecondary">Share your thoughts, ideas, or daily updates</p>
                  </div>
                </div>
                
                <div
                  onClick={() => handlePostTypeChange('existing-thread')}
                  className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                    postType === 'existing-thread'
                      ? 'border-twitter-primary bg-twitter-backgroundSecondary shadow-lg'
                      : 'border-twitter-border bg-twitter-surface hover:border-twitter-primary/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 transition-transform">🧵</div>
                    <h4 className="font-bold text-lg text-twitter-text mb-2">Join Thread</h4>
                    <p className="text-sm text-twitter-textSecondary">Continue your 100-day challenge journey</p>
                  </div>
                </div>
                
                <div
                  onClick={() => handlePostTypeChange('new-thread')}
                  className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                    postType === 'new-thread'
                      ? 'border-twitter-primary bg-twitter-backgroundSecondary shadow-lg'
                      : 'border-twitter-border bg-twitter-surface hover:border-twitter-primary/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 transition-transform">✨</div>
                    <h4 className="font-bold text-lg text-twitter-text mb-2">New Thread</h4>
                    <p className="text-sm text-twitter-textSecondary">Start a fresh 100-day challenge</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thread Selection (for existing threads) */}
            {postType === 'existing-thread' && (
              <div className="bg-twitter-backgroundSecondary rounded-2xl p-6 mb-8 border border-twitter-border">
                <h3 className="text-xl font-semibold text-twitter-primary mb-6 flex items-center">
                  <span className="text-xl mr-3">🎯</span>
                  Select Your Thread
                </h3>
                
                {/* User's Joined Threads */}
                {userThreads.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-twitter-text mb-3">Your Active Threads:</label>
                    <select
                      value={selectedThread}
                      onChange={handleThreadChange}
                      className="w-full p-4 bg-twitter-surface border border-twitter-border rounded-xl text-twitter-text focus:outline-none focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary transition-all"
                    >
                      <option value="" className="bg-twitter-surface">Choose a thread...</option>
                      {userThreads.map((userThread) => (
                        <option key={userThread.id} value={userThread.id} className="bg-twitter-surface">
                          {userThread.thread.display_name} - Day {userThread.current_day}/100 ({userThread.progress_percentage.toFixed(1)}%)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Join New Thread Section */}
                <div className="border-t border-twitter-border pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-twitter-text">Want to join a new thread?</h4>
                    <button
                      type="button"
                      onClick={() => setShowJoinThread(!showJoinThread)}
                      className="px-4 py-2 bg-twitter-primary/20 text-twitter-primary border border-twitter-primary/30 rounded-lg hover:bg-twitter-primary/30 transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>🔍</span>
                      <span>{showJoinThread ? 'Hide' : 'Browse Threads'}</span>
                    </button>
                  </div>

                  {showJoinThread && (
                    <div className="space-y-4">
                      {/* Search Bar */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search threads by topic, name, or description..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full p-4 pl-12 bg-twitter-surface border border-twitter-border rounded-xl text-twitter-text placeholder-twitter-textSecondary focus:outline-none focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary transition-all"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-twitter-textSecondary">
                          🔍
                        </div>
                      </div>

                      {/* Available Threads */}
                      {filteredThreads.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto space-y-3 bg-twitter-surface rounded-xl p-4">
                          {filteredThreads.map((thread) => (
                            <div key={thread.id} className="group p-4 bg-twitter-backgroundSecondary rounded-xl border border-twitter-border hover:border-twitter-primary/30 hover:bg-twitter-background transition-all duration-300">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h5 className="font-bold text-twitter-text text-lg mb-2 group-hover:text-twitter-primary transition-colors">
                                    {thread.display_name}
                                  </h5>
                                  <div className="flex items-center space-x-4 text-sm text-twitter-textSecondary mb-3">
                                    <span className="flex items-center space-x-1">
                                      <span>👥</span>
                                      <span>{thread.participants_count} participants</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <span>📝</span>
                                      <span>{thread.posts_count} posts</span>
                                    </span>
                                  </div>
                                  {thread.description && (
                                    <p className="text-twitter-textSecondary text-sm leading-relaxed">
                                      {thread.description}
                                    </p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => joinExistingThread(thread.id)}
                                  disabled={joiningThreadId === thread.id}
                                  className={`ml-4 px-4 py-2 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ${
                                    joiningThreadId === thread.id
                                      ? 'bg-twitter-border cursor-not-allowed'
                                      : 'bg-twitter-primary hover:bg-twitter-primary/90'
                                  }`}
                                >
                                  {joiningThreadId === thread.id ? 'Joining...' : 'Join Thread'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : availableThreads.length === 0 ? (
                        <div className="text-center py-8 text-twitter-textSecondary">
                          <span className="text-4xl mb-4 block">🎉</span>
                          <p>You've joined all available threads!</p>
                          <p className="text-sm mt-2">Create a new thread to start a fresh challenge.</p>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-twitter-textSecondary">
                          <span className="text-4xl mb-4 block">🔍</span>
                          <p>No threads found matching "{searchQuery}"</p>
                          <p className="text-sm mt-2">Try a different search term or create a new thread.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {userThreads.length === 0 && !showJoinThread && (
                  <div className="text-center py-6 text-twitter-primary bg-twitter-primary/10 rounded-xl border border-twitter-primary/20">
                    <span className="text-2xl mb-2 block">⚠️</span>
                    <p className="font-medium">You haven't joined any threads yet!</p>
                    <p className="text-sm mt-1">Browse available threads above or create a new one.</p>
                  </div>
                )}
              </div>
            )}

            {/* New Thread Creation */}
            {postType === 'new-thread' && (
              <div className="bg-twitter-backgroundSecondary rounded-2xl p-6 mb-8 border border-twitter-border">
                <h3 className="text-xl font-semibold text-twitter-primary mb-6 flex items-center">
                  <span className="text-xl mr-3">✨</span>
                  Create New Thread
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-twitter-text mb-3">
                      Thread Topic: <span className="text-twitter-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={newThreadTopic}
                      onChange={(e) => setNewThreadTopic(e.target.value)}
                      placeholder="e.g., Python, React, Machine Learning, Fitness, Reading..."
                      className="w-full p-4 bg-twitter-surface border border-twitter-border rounded-xl text-twitter-text placeholder-twitter-textSecondary focus:outline-none focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary transition-all"
                      required
                    />
                    <p className="text-xs text-twitter-textSecondary mt-2 flex items-center">
                      <span className="mr-2">💡</span>
                      This will become "100 Days of [Your Topic]"
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-twitter-text mb-3">
                      Description (Optional):
                    </label>
                    <textarea
                      value={newThreadDescription}
                      onChange={(e) => setNewThreadDescription(e.target.value)}
                      placeholder="Describe what this 100-day challenge is about, what participants will learn, goals, etc..."
                      rows={4}
                      className="w-full p-4 bg-twitter-surface border border-twitter-border rounded-xl text-twitter-text placeholder-twitter-textSecondary focus:outline-none focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary resize-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Day Number Input (for thread posts) */}
            {(postType === 'existing-thread' || postType === 'new-thread') && (
              <div className="bg-twitter-surface rounded-2xl p-6 mb-8 border border-twitter-border">
                <label className="block text-lg font-semibold text-twitter-text mb-4 flex items-center">
                  <span className="mr-3">📅</span>
                  Day Number: <span className="text-twitter-error ml-1">*</span>
                </label>
                <input
                  type="number"
                  value={dayNumber}
                  onChange={(e) => setDayNumber(e.target.value)}
                  min="1"
                  max="100"
                  placeholder="1-100"
                  className="w-full p-4 bg-twitter-backgroundSecondary border border-twitter-border rounded-xl text-twitter-text placeholder-twitter-textSecondary focus:outline-none focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary text-lg font-semibold transition-all"
                  required
                />
                <div className="mt-3 p-3 bg-twitter-primary/10 rounded-lg border border-twitter-primary/20">
                  <p className="text-sm text-twitter-primary flex items-start">
                    <span className="mr-2 mt-0.5">ℹ️</span>
                    <span>
                      {postType === 'new-thread' 
                        ? 'Starting a new thread? Day 1 is recommended to begin your journey!' 
                        : selectedThread && userThreads.find(ut => ut.id === selectedThread)
                          ? `Your current progress: Day ${userThreads.find(ut => ut.id === selectedThread)?.current_day}/100. Next day: ${(userThreads.find(ut => ut.id === selectedThread)?.current_day || 0) + 1}`
                          : 'Enter the day number for your 100-day challenge (1-100)'
                      }
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Post Content */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-twitter-text mb-4 flex items-center">
                <span className="mr-3">✍️</span>
                Content: <span className="text-twitter-error ml-1">*</span>
              </label>
              <textarea
                value={content}
                onChange={handleContentChange}
                rows={8}
                placeholder={
                  postType === 'regular' 
                    ? "What's on your mind? Share your thoughts, experiences, or insights..."
                    : postType === 'new-thread'
                      ? "Day 1: Starting my 100-day journey! Today I learned/worked on..."
                      : dayNumber 
                        ? `Day ${dayNumber}: Today I learned/worked on...`
                        : "Share your progress for today. What did you learn? What challenges did you face? What are you excited about?"
                }
                className="w-full p-6 bg-twitter-surface border border-twitter-border rounded-xl text-twitter-text placeholder-twitter-textSecondary focus:outline-none focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary resize-none transition-all text-lg leading-relaxed"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button 
                type="submit" 
                className="group px-12 py-4 bg-twitter-primary hover:bg-twitter-primary/90 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-twitter-primary/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-twitter-primary/50"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>{postType === 'new-thread' ? '🚀' : '📝'}</span>
                  <span>{postType === 'new-thread' ? 'Create Thread & Post' : 'Publish Post'}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Postcreate;