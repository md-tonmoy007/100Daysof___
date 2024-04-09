import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Post from '../posts/Post';
import CreateComment from './Post/CreateComment';

const Postlist = () => {
    

    const [posts, setPosts] = useState([]);
    const [accessToken, setAccessToken] = useState("")
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/posts/`)
        .then(res=>{
            console.log(res.data)
            setPosts(res.data)
            setAccessToken(localStorage.getItem('accessToken'))
        }).catch(err=>{
            console.error(err)
        })
    },[])
  return (
    <div>
        <div>
            {posts.map((post) => (
                <div>
                    <Post key={post.id} post={post} accessToken={accessToken}/>
                    <CreateComment postId={post.id}/>
                </div>
            ))}
        </div>
    </div>
    
  )
}

export default Postlist