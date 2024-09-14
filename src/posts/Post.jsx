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
      setLc(lc+1)
      axios.post(`http://127.0.0.1:8000/api/posts/${post.post?.id}/like/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then((res)=>{
        setMessage(res)
      })
    }

  return (
    <div key={post.post?.id} className="grid grid-cols-1 border bg-white text-gray-900 py-3 px-1">
      
    <div className="flex justify-between border-b border-slate-400 p-3">
      <h1>
        <a href={`/profile/${post.post?.created_by?.id}`} className="flex gap-5">
          <img
            src={post.post?.created_by?.avatar ? `http://localhost:8000${post.post.created_by.avatar}` : post.post?.created_by?.get_avatar} 
            alt=""
            className="w-[40px] h-[40px] rounded-full object-cover" 
          />
          <span className="items-center">{post.post?.created_by?.name}</span>
        </a>
      </h1>
      <p className="text-xs">{post.post?.created_at_formatted}</p>
    </div>
  
    <div className="p-3 text-sm">
      <p>{post.post?.body || "loading"}</p>
    </div>
  
    <hr />
  
    <div className="flex w-full justify-between">
      
      
    
      <button onClick={handleLike} className="flex">
      <span className="text-2xl text-bl">
        {console.log("liked", post.liked)}
      {post.liked === 0? <AiOutlineLike />:<AiFillLike/>}
      </span>
      <span className="text-xl">{post.post?.likes_count}</span>
    </button>
    {/* <button onClick={handleLike} className="flex">
        <span className="text-2xl text-bl">
          <AiFillLike />
        </span>
        <span className="text-xl">{post.post?.likes_count}</span>
      </button> */}
    
  

  
      <Link to={`/posts/details/${post.post?.id}`}>
        <button className="text-xl">
          <FaRegCommentDots />
        </button>
      </Link>
    </div>
  
    <hr/>
  
     {pathMatchRoute("/")?
     (post.post?.comments?.slice(0, 2).map((comment) => (
      <div key={comment.id} className="text-xs">
        {console.log("comment:", comment)}
        {<Comments key={comment.id} comment={comment} />}
      </div>
    ))): (post.post?.comments?.map((comment) => (
      <div key={comment.id} className="text-xs">
        {console.log("comment:", comment)}
        {<Comments key={comment.id} comment={comment} />}
      </div>
    )))
  }

  </div>
  

  );
};


{/* <li
                style={pathMatchRoute("/")?{borderBottom: "5px red solid", color: "black"}: {borderBottom: "transparent"}}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoute("/") && "text-white border-b-red-500"
                }`}
                onClick={() => navigate("/")}
              >
                Homies
              </li> */}


export default Post;

