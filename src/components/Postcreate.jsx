import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setBody(e.target.value);
    console.log(body)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the token from local storage
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/posts/create/', 
        { body },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setMessage('Post created successfully!');
      setBody('');
    } catch (error) {
      console.error(error);
      setMessage('Error creating post.');
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            What's on your mind?
          </label>
          <textarea
            value={body}
            onChange={handleChange}
            className="w-full p-4 border-2 border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm placeholder-gray-500"
            rows="4"
            placeholder="Share your thoughts, ideas, or experiences..."
          />
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            📝 Publish Post
          </button>
          <button
            type="button"
            onClick={() => setBody('')}
            className="px-6 py-3 bg-white/50 backdrop-blur-sm border-2 border-white/30 text-gray-700 rounded-xl font-semibold hover:bg-white/70 transition-all duration-200"
          >
            🗑️ Clear
          </button>
        </div>
      </form>
      
      {message && (
        <div className={`mt-6 p-4 rounded-xl text-center font-medium backdrop-blur-sm ${
          message.includes('successfully') 
            ? 'bg-green-100/80 text-green-700 border border-green-200/50' 
            : 'bg-red-100/80 text-red-700 border border-red-200/50'
        }`}>
          {message.includes('successfully') ? '✅ ' : '❌ '}
          {message}
        </div>
      )}
    </div>
  );
};

export default PostCreate;
