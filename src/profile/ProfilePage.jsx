import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProfilePage() {
  // Cancel friend request handler
  const handleCancelRequest = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8000/api/friends/${userId}/cancel/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Cancel request failed", error);
    }
  };
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

// ...existing code...

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-start py-12">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 mt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex flex-col items-center w-full md:w-1/3">
              <div className="relative">
                <img
                  src={userDetail.avatar ? `http://localhost:8000${userDetail.avatar}` : userDetail.get_avatar}
                  alt="avatar"
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-300 shadow-lg"
                />
                <span className="absolute bottom-2 right-2 bg-green-400 w-5 h-5 rounded-full border-2 border-white"></span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{userDetail.name}</h2>
              <p className="text-gray-500">{userDetail.email}</p>
              <div className="mt-4 w-full flex flex-col gap-2">
                {myProfile ? (
                  <>
                    <button
                      onClick={logout}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow"
                    >
                      Log out
                    </button>
                    <Link to="/profile/edit">
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow">
                        Edit Profile
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    {status === "add friend" && (
                      <button
                        onClick={handleSendRequest}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow"
                      >
                        Add Friend
                      </button>
                    )}
                    {status === "Accept request" && (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleFriendRequest('accepted')}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow"
                        >
                          Accept Request
                        </button>
                        <button
                          onClick={() => handleFriendRequest('rejected')}
                          className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-lg shadow"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {status === "Request sent" && (
                      <div className="flex flex-col gap-2">
                        <button
                          className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg shadow cursor-not-allowed"
                          disabled
                        >
                          Request Sent
                        </button>
                        <button
                          onClick={handleCancelRequest}
                          className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-lg shadow"
                        >
                          Cancel Request
                        </button>
                      </div>
                    )}
// ...existing code...
                    {status === "Friends" && (
                      <button
                        className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg shadow cursor-default"
                        disabled
                      >
                        Friends
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Posts</h3>
              <div className="space-y-4">
                {userposts.length === 0 ? (
                  <div className="text-gray-400 text-center">No posts yet.</div>
                ) : (
                  userposts.map((post) => (
                    <Link key={post.id} to={`/posts/details/${post.id}`} className="block group">
                      <div
                        className="bg-gray-50 rounded-xl shadow p-4 border border-gray-200 relative group-hover:bg-blue-50 transition"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400">{post.created_at_formatted}</span>
                          {myProfile && (
                            <button
                              onClick={e => { e.preventDefault(); onDelete(post); }}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="text-gray-700 text-sm line-clamp-3 group-hover:underline">
                          {post.body}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProfilePage;
