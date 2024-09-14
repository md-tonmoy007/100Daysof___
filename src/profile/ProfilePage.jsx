import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();
  const [userposts, setUserposts] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [myProfile, setMyProfile] = useState(false);
  const [status, setStatus] = useState([]);
  // const [postID, setPostID] = useState("");

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/logout/", {
        refresh: localStorage.getItem("refreshToken"),
      });
      if (response.status === 205) {
        // Clear tokens from local storage or state
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Redirect to login or homepage
        window.location.href = "/signin"; // Redirect to login page
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };



  const handleFriendRequest = async (resp) => {
    setStatus(status); // Set the status to be used in the API request

    try {
        const response = await axios.post(
          `http://localhost:8000/api/friends/profile/${userId}/${resp}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // const data = await response.json();
        // setMessage(data.message);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // setMessage('An error occurred');
    }
    window.location.reload();
};


  const handleSendRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/friends/${userId}/request/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch {
      console.error("error");
    }
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUserDetail(res.data.user);
        setUserposts(res.data.posts);
        setMyProfile(res.data.my_profile);
        setStatus(res.data.status);
      })
      .catch((err) => console.error(err.message));
  }, [userId]);
  console.log(userDetail);
  console.log(userposts);
  console.log("status", status);

  function onDelete(post) {
    axios
      .delete(`http://localhost:8000/api/posts/${post.id}/delete/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(window.location.reload())
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="w-[70%] p-10 pb-40 ml-[15%] flex items-center justify-center bg-white text-gray-900">
      <div className="">
        <div className="mb-3">
          <img
            src={
              userDetail.avatar
                ? `http://localhost:8000${userDetail.avatar}`
                : userDetail.get_avatar
            }
            alt=""
            className="w-[300px] h-[300px] rounded-full object-cover"
          />
          <h1> name : {userDetail.name} </h1>
          <p> email: {userDetail.email} </p>
        </div>
        {myProfile && (
          <div className="flex gap-10">
            <button
              onClick={logout}
              className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
            >
              Log out
            </button>
            <Link to="/profile/edit">
              <button
                href="/profile/edit"
                className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
              >
                edit profile
              </button>
            </Link>
          </div>
        )}

        {!myProfile && status === "Add friend" ? (
          <Link>
            <button
              onClick={handleSendRequest}
              className="text-white w-[80%] focus:ring-4 font-medium m-3 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
              href="/edit/profile"
            >
              {status}
            </button>
          </Link>
        ) : !myProfile && status === "Accept request" ? (
          <div>
            

            <button
              onClick={() => handleFriendRequest('accepted')}
              className="text-white w-[80%] focus:ring-4 font-medium m-3 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
              href="/edit/profile"
            >
              <Link> Accept </Link>
            </button>

            <button
              onClick={() => handleFriendRequest('rejected')}
              className="text-white w-[80%] focus:ring-4 font-medium m-3 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800"
            >
              Reject
            </button>
          </div>
        ) : !myProfile && status === "Request sent" ? (
          <div>
            <button
              className="text-white w-[80%] focus:ring-4 font-medium m-3 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-900"
              href="/edit/profile"
            >
              <Link> {status} </Link>
            </button>
          </div>
        ) : (
          !myProfile && status === "Friends" ? (
            <div>
            <button
              className="text-white w-[80%] focus:ring-4 font-medium m-3 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-900"
              href="/edit/profile"
            >
              friends
            </button>
          </div>
          ): "loading"
        )}

        <div className="mt-3">
          {userposts.map((post) => (
            <div
              key={post.id}
              className="grid grid-cols-1 border mb-3 py-2 px-1"
            >
              <div className="flex justify-between border-b border-slate-400 p-3">
                {myProfile && (
                  <button onClick={() => onDelete(post)}>Delete</button>
                )}
                <p className="text-xs">{post.created_at_formatted}</p>
              </div>
              <div className="p-3 text-sm">
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
