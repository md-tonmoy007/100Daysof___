import axios from 'axios';
import React, { useState } from 'react'

function CreateComment(postId) {
    const [content, setContent] = useState('');
    // const [attachment, setAttachment] = useState(null);
    console.log("postid:", postId.postId)
  
  
    const handleContentChange = (e) => {
      setContent(e.target.value);
    };
  
    // const handleAttachmentChange = (e) => {
    //   setAttachment(e.target.files[0]);
    // };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('body', content);
      // formData.append('attachment', attachment);
  
      try {
        const response = await axios.post(`http://localhost:8000/api/posts/${postId.postId}/comment/`, formData, {
          headers: {
             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        window.location.reload();
      } catch (error) {
        console.error('Error creating post:', error);
      }
    };
  
    return (
      <div className='bg-white mb-3 p-4 text-black'>
        <form onSubmit={handleSubmit}>
  
          <div className='grid grid-cols-1 gap-4'>
            <input
              id="comment"
              placeholder='Comment'
              value={content}
              rows={5}
              cols={10}
              onChange={handleContentChange}
              className='text-black border border-gray-300 rounded-md p-2'
            ></input>
          </div>
          {/* <div>
            <label htmlFor="attachment">Attachment:</label>
            <input
              type="file"
              id="attachment"
              accept="image/*" 
              onChange={handleAttachmentChange}
            />
          </div> */}
          <div className='flex w-full justify-center'>
            <button type="submit" className='border m-3 px-3 py-1 text-white bg-blue-700 '>
              comment
            </button>
          </div>
        </form>
        {/* Display attachment preview if available */}
        {/* {attachment && (
          <div>
            <h3>Attachment Preview:</h3>
            <img src={URL.createObjectURL(attachment)} alt="Attachment Preview" />
          </div>
        )} */}
      </div>
    );
  }

export default CreateComment