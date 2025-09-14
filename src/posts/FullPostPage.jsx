import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentDots, FaArrowLeft } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CreateComment from '../components/Comments/CreateComment';
import Post from './Post';

function FullPostPage() {
    const [post, setPost] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // const [postUser , setPostUser] = ([]);
    const data = []

    // const [accessToken, setAccessToken] = useState("")

    const { postId } = useParams();
    const navigate = useNavigate();
    
    function handleLike(){
        axios.post(`http://127.0.0.1:8000/api/posts/${post.id}/like/`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }).then((res)=>{
          setMessage(res)
        })
      }
    
    
    useEffect(()=>{
        setLoading(true);
        axios.get(`http://localhost:8000/api/posts/post/${postId}`,
         
            {headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },}
        )
        .then(res=>{
            console.log(res.data)
            const post = res.data.post
            console.log("post", post)
            setPost(post)
            const postUser = post.created_by
            // let post_user = post.created_by
            console.log("here is the user", postUser)
            // console.log("here is the user (20", post_user)
            // setAccessToken(localStorage.getItem('accessToken'))
            setLoading(false);
        }).catch(err=>{
            console.error(err)
            setError("Failed to load post. Please try again.");
            setLoading(false);
        })
    },[postId])

    if (loading) {
        return (
            <div className="min-h-screen bg-twitter-background">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    {/* Loading Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-twitter-border rounded-full"></div>
                        <div className="h-6 bg-twitter-border rounded w-32"></div>
                    </div>
                    
                    {/* Loading Post */}
                    <div className="bg-twitter-surface border border-twitter-border rounded-3xl p-8 mb-8">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-twitter-border rounded-full"></div>
                            <div className="space-y-2">
                                <div className="h-5 bg-twitter-border rounded w-40"></div>
                                <div className="h-4 bg-twitter-border rounded w-24"></div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="h-4 bg-twitter-border rounded w-full"></div>
                            <div className="h-4 bg-twitter-border rounded w-3/4"></div>
                            <div className="h-4 bg-twitter-border rounded w-1/2"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 bg-twitter-border rounded-full w-24"></div>
                            <div className="h-10 bg-twitter-border rounded-full w-24"></div>
                        </div>
                    </div>
                    
                    {/* Loading Comment Form */}
                    <div className="bg-twitter-surface border border-twitter-border rounded-3xl p-8">
                        <div className="h-6 bg-twitter-border rounded w-32 mb-4"></div>
                        <div className="h-24 bg-twitter-border rounded-xl mb-4"></div>
                        <div className="h-10 bg-twitter-border rounded-full w-32"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-twitter-background">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="text-center py-20">
                        <div className="bg-twitter-surface border border-twitter-border rounded-3xl p-12 max-w-md mx-auto">
                            <div className="text-red-500 text-6xl mb-6">😞</div>
                            <h3 className="text-2xl font-bold text-red-400 mb-4">Post Not Found</h3>
                            <p className="text-twitter-textSecondary mb-6">{error}</p>
                            <div className="flex gap-3 justify-center">
                                <button 
                                    onClick={() => navigate(-1)} 
                                    className="bg-twitter-border hover:bg-twitter-border/80 text-twitter-text px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-lg"
                                >
                                    Go Back
                                </button>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-lg"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

  return (
    <div className="min-h-screen bg-twitter-background">
      {/* Header */}
      <div className="bg-twitter-surface border-b border-twitter-border shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-twitter-backgroundSecondary border border-twitter-border rounded-full text-twitter-text hover:bg-twitter-border/50 transition-all duration-200"
            >
              <FaArrowLeft className="text-sm" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-twitter-primary rounded-full"></div>
              <h1 className="text-xl font-bold text-twitter-text">Post Details</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Post Section */}
          <div className="bg-twitter-surface rounded-3xl border border-twitter-border shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-twitter-primary rounded-full"></div>
                <h2 className="text-lg font-semibold text-twitter-text">Featured Post</h2>
              </div>
              <Post key={post.id} id={post.id}/>
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-twitter-surface rounded-3xl border border-twitter-border shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-twitter-text">Join the Conversation</h2>
                <div className="ml-auto">
                  <span className="text-sm text-twitter-textSecondary bg-twitter-backgroundSecondary px-3 py-1 rounded-full">
                    💬 Share your thoughts
                  </span>
                </div>
              </div>
              <CreateComment postId={postId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPostPage