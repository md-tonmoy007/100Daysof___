import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();
  const [userposts, setUserposts] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [postID, setPostID] = useState("");
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/profile/${userId}`)
      .then((res) => {
        setUserDetail(res.data.user);
        setUserposts(res.data.posts);
      })
      .catch((err) => console.error(err.message));
  }, [userId]);
  console.log(userDetail);
  console.log(userposts);

  function onDelete(post){
    axios.delete(`http://localhost:8000/api/posts/${post.id}/delete/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then(
      window.location.reload()
    )
    .catch(err=>{
      console.error(err)
    })
  }
  return (
    <div className="ml-[10%] w-[80%]">
      <img 
      src={userDetail.avatar?`http://localhost:8000${userDetail.avatar}`:userDetail.get_avatar} alt="" 
      className="w-[300px] h-[300px] rounded-full object-cover"/>
      <h1> name : {userDetail.name} </h1>
      <p> email: {userDetail.email} </p>

      <div>
        {userposts.map((post) => (
          <div key={post.id} className="grid grid-cols-1 border mb-3 py-2 px-1">
            <div className="flex justify-between border-b border-slate-400 p-3">
                <button onClick={() => onDelete(post)}>
                  Delete
                </button>
              <p className="text-xs">{post.created_at_formatted}</p>
            </div>
            <div className="p-3 text-sm">
              <p>{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
