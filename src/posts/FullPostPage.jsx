import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import CreateComment from '../components/Comments/CreateComment';
import Post from './Post';

function FullPostPage() {
    const [post, setPost] = useState([]);
    const [message, setMessage] = useState("");
    // const [postUser , setPostUser] = ([]);
    const data = []

    // const [accessToken, setAccessToken] = useState("")

    const { postId } = useParams();
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
        }).catch(err=>{
            console.error(err)
        })
    },[postId])
  return (
    <div>
      <div>
        <Post key={post.id} id={post.id}/>
      </div>

        <div>
          <CreateComment postId={postId}/>
        </div>

    </div>
  )
}

export default FullPostPage