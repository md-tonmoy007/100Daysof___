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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Post Body
            </label>
            <textarea
              value={body}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Write your post here..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PostCreate;
