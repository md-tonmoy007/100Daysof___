import React, { useState } from 'react';
import axios from 'axios';

function CreateComment({ postId }) {
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/posts/${postId}/comment/`, { body }, {
        headers: {
           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log('Comment created:', response.data);
      // You can add further logic here, such as updating the UI to display the newly created comment
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your comment here..."
        required
        className='text-black'
      />
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CreateComment;
