import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Post from '../posts/Post';
import CreateComment from './Comments/CreateComment';
import ShowComments from './Comments/ShowComments';
// import CreateComment from './Post/CreateComment';

const Postlist = () => {
    

    const [posts, setPosts] = useState([]);
    const [accessToken, setAccessToken] = useState("")
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/posts/`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
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
                <div className='py-3'>
                    <Post key={post.id} id={post.id}/>
                </div>
            ))}
        </div>
    </div>
    
  )
}

export default Postlist