import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CommentView = ({commentID}) => {
    const [commentDetails, setCommentDetails] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/posts/${commentID}/comment_show/`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
        .then(res=>{
            setCommentDetails(res.data)
        }).catch(err=>{
            console.error(err)
        })
    },[commentDetails])

  return (
    <p>{commentDetails.body}</p>
  )
}

export default CommentView