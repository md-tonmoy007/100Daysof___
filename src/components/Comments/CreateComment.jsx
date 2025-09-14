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
      <div className="bg-twitter-surface border border-twitter-border rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-twitter-primary rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-twitter-text">Add a Comment</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              id="comment"
              placeholder="Share your thoughts on this post..."
              value={content}
              rows={4}
              onChange={handleContentChange}
              className="w-full p-4 bg-twitter-backgroundSecondary border-2 border-twitter-border rounded-xl text-twitter-text placeholder-twitter-textSecondary focus:outline-none focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary transition-all duration-200 resize-none"
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-twitter-textSecondary">
                {content.length}/500 characters
              </span>
              {content.trim().length > 0 && (
                <span className="text-xs text-twitter-success flex items-center gap-1">
                  ✓ Ready to post
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-twitter-error/10 border border-twitter-error/20 rounded-xl p-3 flex items-center gap-2">
              <span className="text-twitter-error">⚠️</span>
              <span className="text-twitter-error text-sm font-medium">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-twitter-success/10 border border-twitter-success/20 rounded-xl p-3 flex items-center gap-2">
              <span className="text-twitter-success">✅</span>
              <span className="text-twitter-success text-sm font-medium">{success}</span>
            </div>
          )}
          
          <div className="flex gap-3">
            <button 
              type="submit" 
              disabled={isSubmitting || !content.trim()}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                isSubmitting || !content.trim()
                  ? 'bg-twitter-border text-twitter-textSecondary cursor-not-allowed'
                  : 'bg-twitter-primary text-white hover:bg-twitter-primary/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-twitter-textSecondary border-t-twitter-text rounded-full animate-spin"></div>
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
              className="px-6 py-3 bg-twitter-backgroundSecondary border-2 border-twitter-border text-twitter-textSecondary rounded-xl font-semibold hover:bg-twitter-surface transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🗑️ Clear
            </button>
          </div>
        </form>
      </div>
    );
  }

export default CreateComment