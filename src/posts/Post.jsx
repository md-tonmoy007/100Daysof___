import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import Comments from "../components/Comments/Comments";

// import CommentView from "../components/Post/CommentView";

const Post = ({ id }) => {
  const data = []

  
  // console.log("see the post: ", post)
  const [post, setPost] = useState([]);
  const [lc, setLc] = useState(0)
  const [message, setMessage] = useState(0)
  const [isLiking, setIsLiking] = useState(false)

  const location = useLocation();
  // const navigate = useNavigate();
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      console.log(location.pathname)
      console.log(true)
      return true;
    }
  }

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/posts/post/${id}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res=>{
        console.log(res.data)
        setPost(res.data)
        setLc(res.data.post.likes_count)
        console.log("likes count", lc)
    }).catch(err=>{
        console.error(err)
    })
},[id,lc])
    function handleLike(){
      if (isLiking) return; // Prevent multiple clicks
      setIsLiking(true);
      setLc(lc+1)
      axios.post(`http://127.0.0.1:8000/api/posts/${post.post?.id}/like/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then((res)=>{
        setMessage(res)
        setIsLiking(false);
      }).catch(err => {
        setLc(lc-1); // Revert on error
        setIsLiking(false);
        console.error('Like error:', err);
      })
    }

  return (
    <div className="bg-twitter-surface border border-twitter-border rounded-2xl shadow-lg hover:shadow-xl hover:border-twitter-primary/30 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-twitter-border">
        <Link to={`/profile/${post.post?.created_by?.id}`} className="flex items-center gap-4 group">
          <div className="relative">
            <img
              src={post.post?.created_by?.avatar ? `http://localhost:8000${post.post.created_by.avatar}` : post.post?.created_by?.get_avatar} 
              alt={post.post?.created_by?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-twitter-border shadow-md transition-transform duration-200" 
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-twitter-surface shadow-sm"></div>
          </div>
          <div>
            <h3 className="font-semibold text-twitter-text group-hover:text-twitter-primary transition-colors duration-200">
              {post.post?.created_by?.name}
            </h3>
            <p className="text-sm text-twitter-textSecondary">@{post.post?.created_by?.name?.toLowerCase().replace(/\s+/g, '')}</p>
          </div>
        </Link>
        
        <div className="text-right">
          <p className="text-xs text-twitter-textSecondary bg-twitter-backgroundSecondary px-3 py-1 rounded-full">
            {post.post?.created_at_formatted}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-twitter-text leading-relaxed text-base">
          {post.post?.body || (
            <div className="">
              <div className="h-4 bg-twitter-border rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-twitter-border rounded w-1/2"></div>
            </div>
          )}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-6 py-4 bg-twitter-backgroundSecondary border-t border-twitter-border">
        <button 
          onClick={handleLike} 
          disabled={isLiking}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            post.liked !== 0 
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
              : 'bg-twitter-border/50 text-twitter-textSecondary hover:bg-red-500/20 hover:text-red-400'
          } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''} shadow-sm`}
        >
          <span className={`text-xl transition-transform duration-200`}>
            {post.liked !== 0 ? <AiFillLike /> : <AiOutlineLike />}
          </span>
          <span className="font-medium text-sm">{post.post?.likes_count || 0}</span>
          <span className="text-xs">
            {post.post?.likes_count === 1 ? 'Like' : 'Likes'}
          </span>
        </button>

        <Link to={`/posts/details/${post.post?.id}`}>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-twitter-primary/20 text-twitter-primary hover:bg-twitter-primary/30 transition-all duration-200 shadow-sm">
            <FaRegCommentDots className="text-lg" />
            <span className="font-medium text-sm">{post.post?.comments?.length || 0}</span>
            <span className="text-xs">
              {post.post?.comments?.length === 1 ? 'Comment' : 'Comments'}
            </span>
          </button>
        </Link>
      </div>

      {/* Comments Section */}
      {post.post?.comments && post.post.comments.length > 0 && (
        <div className="bg-twitter-background">
          <div className="px-6 py-4">
            <h4 className="text-sm font-semibold text-twitter-text mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-twitter-primary rounded-full"></div>
              Recent Comments
            </h4>
            <div className="space-y-3">
              {pathMatchRoute("/")?
                (post.post?.comments?.slice(0, 2).map((comment) => (
                  <div key={comment.id} className="bg-twitter-surface rounded-xl p-3 border border-twitter-border">
                    {console.log("comment:", comment)}
                    <Comments key={comment.id} comment={comment} />
                  </div>
                ))): (post.post?.comments?.map((comment) => (
                  <div key={comment.id} className="bg-twitter-surface rounded-xl p-3 border border-twitter-border">
                    {console.log("comment:", comment)}
                    <Comments key={comment.id} comment={comment} />
                  </div>
                )))
              }
              
              {pathMatchRoute("/") && post.post?.comments?.length > 2 && (
                <Link to={`/posts/details/${post.post?.id}`}>
                  <div className="text-center py-2">
                    <button className="text-sm text-twitter-primary hover:text-twitter-primary/80 font-medium hover:underline transition-colors duration-200">
                      View all {post.post.comments.length} comments →
                    </button>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

