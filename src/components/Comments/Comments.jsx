import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Comments(comment) {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${comment.comment}/comment_show/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // "Content-Type":
        },
      })
      .then((res) => {
        console.log(res.data.created_by);
        setComments(res.data);
        setUser(res.data.created_by);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [comment.comment]);
  return (
    <div>
      <div className="flex border-b rounded-xl border-slate-400 py-2 px-1">
        <Link to={`/profile/${user.id}`} className="flex-col gap-2">
          <img
            src={
              user.avatar
                ? `http://localhost:8000${user.avatar}`
                : user.get_avatar
            }
            alt=""
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <span className="text-xs  pr-5">{user.name}</span>
        </Link>
        <div className="ml-8 self-center w-full rounded-lg bg-gray-300 flex justify-start">
  <p className="px-4 py-2">{comments.body}</p>
</div>
      </div>
    </div>
  );
}

export default Comments;
