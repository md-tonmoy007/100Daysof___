import React from 'react'
import { Link } from 'react-router-dom'

function Friends(friend) {
    console.log("friend:", friend)
  return (
    <div>
        <Link to={`/profile/${friend.friend.id}`}>
          <div className="bg-white m-3 rounded-lg p-10 text-gray-900 w-[80%]">
          <img
          src={friend.avatar?`http://localhost:8000${friend.friend.avatar}`:friend.friend.get_avatar} alt=""
          className="w-[100px] h-[100px] mb-10 rounded-full object-cover"/>
          <h1> name : {friend.friend.name} </h1>
          <p> email: {friend.friend.email} </p>
                </div>
        </Link>
    </div>
  )
}

export default Friends