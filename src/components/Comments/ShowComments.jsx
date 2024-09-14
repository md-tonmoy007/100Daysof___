import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Comments from './Comments';

function ShowComments(post) {
    

    // const [posts, setPosts] = useState([]);
    // const [accessToken, setAccessToken] = useState("")
    console.log("this is the comment",post.post.comments)
    
    // useEffect(()=>{
    //     axios.get(`http://localhost:8000/api/posts/`)
    //     .then(res=>{
    //         console.log(res.data)
    //         setPosts(res.data)
    //         setAccessToken(localStorage.getItem('accessToken'))
    //     }).catch(err=>{
    //         console.error(err)
    //     })
    // },[])
  return (
    <div>
        <div className='bg-white  p-4 text-black'>
            {post.post.comments.map((comment) => (
                <div>
                    <Comments key={comment.id} comment={comment}/>
                </div>
            ))}
        </div>
    </div>
    
  )
}

export default ShowComments