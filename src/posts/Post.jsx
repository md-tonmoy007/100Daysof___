import axios from "axios";
import React, { useState } from "react";
import CommentView from "../components/Post/CommentView";

const Post = ({ post, accessToken }) => {
  const data = []
  const [message, setMessage] = useState(0)
    function handleLike(){
      axios.post(`http://127.0.0.1:8000/api/posts/${post.id}/like/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res)=>{
        setMessage(res)
      })
    }

  return (
    <div key={post.id} className="grid grid-cols-1 border mb-3 py-2 px-1">
      <div className="flex justify-between border-b border-slate-400 p-3">
        <h1>
          <a href={`/profile/${post.created_by.id}`}>{post.created_by.name}</a>
        </h1>
        <p className="text-xs">{post.created_at_formatted}</p>
      </div>
      <div className="p-3 text-sm">
        <p>{post.body}</p>
      </div>
      <hr />
      <div>
        <button onClick={handleLike}>Likes</button>: {post.likes_count}
      </div>
      <hr/>
      {post.comments.map((comment)=>(
        <div>
          <CommentView commentID={comment} />
        </div>
      ))}
    </div>
  );
};

export default Post;
