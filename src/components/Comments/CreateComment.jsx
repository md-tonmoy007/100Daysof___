import axios from 'axios';
import React, { useState } from 'react'

function CreateComment(postId) {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // const [attachment, setAttachment] = useState(null);
    console.log("postid:", postId.postId)
  
  
    const handleContentChange = (e) => {
      setContent(e.target.value);
      if (error) setError(''); // Clear error when user starts typing
    };
  
    // const handleAttachmentChange = (e) => {
    //   setAttachment(e.target.files[0]);
    // };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Validate content
      if (!content.trim()) {
        setError('Please enter a comment before submitting.');
        return;
      }

      if (content.trim().length < 1) {
        setError('Comment must be at least 1 character long.');
        return;
      }

      setIsSubmitting(true);
      setError('');
  
      const formData = new FormData();
      formData.append('body', content.trim());
      // formData.append('attachment', attachment);
  
      try {
        const response = await axios.post(`http://localhost:8000/api/posts/${postId.postId}/comment/`, formData, {
          headers: {
             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccess('Comment posted successfully!');
        setContent('');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error('Error creating comment:', error);
        setError('Failed to post comment. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-gray-800">Add a Comment</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              id="comment"
              placeholder="Share your thoughts on this post..."
              value={content}
              rows={4}
              onChange={handleContentChange}
              className="w-full p-4 bg-white/50 backdrop-blur-sm border-2 border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {content.length}/500 characters
              </span>
              {content.trim().length > 0 && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  ✓ Ready to post
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-100/80 backdrop-blur-sm border border-red-200 rounded-xl p-3 flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              <span className="text-red-700 text-sm font-medium">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-100/80 backdrop-blur-sm border border-green-200 rounded-xl p-3 flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span className="text-green-700 text-sm font-medium">{success}</span>
            </div>
          )}
          
          <div className="flex gap-3">
            <button 
              type="submit" 
              disabled={isSubmitting || !content.trim()}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                isSubmitting || !content.trim()
                  ? 'bg-gray-300/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Posting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  💬 Post Comment
                </span>
              )}
            </button>
            
            <button 
              type="button"
              onClick={() => {
                setContent('');
                setError('');
                setSuccess('');
              }}
              disabled={isSubmitting}
              className="px-6 py-3 bg-white/50 backdrop-blur-sm border-2 border-white/30 text-gray-700 rounded-xl font-semibold hover:bg-white/70 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🗑️ Clear
            </button>
          </div>
        </form>
      </div>
    );
  }

export default CreateComment