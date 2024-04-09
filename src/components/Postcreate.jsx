import React, { useState } from 'react';
import axios from 'axios';

function Postcreate() {
  const [content, setContent] = useState('');
  // const [attachment, setAttachment] = useState(null);



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
      const response = await axios.post('http://localhost:8000/api/posts/create/', formData, {
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
    <div className=''>
      <h2 className='flex w-full justify-center text-3xl'>Create Post</h2>
      <form onSubmit={handleSubmit}>

        <div className='grid grid-cols-1 gap-4'>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            rows={10}
            cols={20}
            onChange={handleContentChange}
            className='text-black'
          ></textarea>
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
          <button type="submit" className='border m-3 px-3 py-1 bg-slate-700 '>
            Submit
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

export default Postcreate;
