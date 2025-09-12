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
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    {/* Loading Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
                    </div>
                    
                    {/* Loading Post */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 animate-pulse mb-8">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                            <div className="space-y-2">
                                <div className="h-5 bg-gray-300 rounded w-40"></div>
                                <div className="h-4 bg-gray-300 rounded w-24"></div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 bg-gray-300 rounded-full w-24"></div>
                            <div className="h-10 bg-gray-300 rounded-full w-24"></div>
                        </div>
                    </div>
                    
                    {/* Loading Comment Form */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 animate-pulse">
                        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
                        <div className="h-24 bg-gray-300 rounded-xl mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded-full w-32"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="text-center py-20">
                        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-3xl p-12 max-w-md mx-auto">
                            <div className="text-red-500 text-6xl mb-6">😞</div>
                            <h3 className="text-2xl font-bold text-red-800 mb-4">Post Not Found</h3>
                            <p className="text-red-600 mb-6">{error}</p>
                            <div className="flex gap-3 justify-center">
                                <button 
                                    onClick={() => navigate(-1)} 
                                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg"
                                >
                                    Go Back
                                </button>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/30 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-full text-gray-700 hover:bg-white/70 transition-all duration-200 hover:scale-105"
            >
              <FaArrowLeft className="text-sm" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <h1 className="text-xl font-bold text-gray-800">Post Details</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Post Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/30 shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <h2 className="text-lg font-semibold text-gray-800">Featured Post</h2>
              </div>
              <Post key={post.id} id={post.id}/>
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/30 shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className="text-lg font-semibold text-gray-800">Join the Conversation</h2>
                <div className="ml-auto">
                  <span className="text-sm text-gray-500 bg-gray-100/60 px-3 py-1 rounded-full">
                    💬 Share your thoughts
                  </span>
                </div>
              </div>
              <CreateComment postId={postId}/>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decoration elements */}
      <div className="fixed top-32 left-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="fixed top-60 right-16 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="fixed bottom-40 left-20 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="fixed bottom-60 right-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
    </div>
  )
}

export default FullPostPage