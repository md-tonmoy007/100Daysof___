import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ThreadCard from "../components/Thread/ThreadCard";

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
  const [userThreads, setUserThreads] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [myProfile, setMyProfile] = useState(false);
  const [status, setStatus] = useState([]);

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
        setUserThreads(res.data.user_threads);
        setMyProfile(res.data.my_profile);
        setStatus(res.data.status);
      })
      .catch((err) => console.error(err.message));
  }, [userId]);
  console.log(userDetail);
  console.log(userThreads);
  console.log("status", status);

  function onDelete(userThread) {
    // Since we're dealing with threads now, we might want to handle this differently
    // For now, let's disable deletion or redirect to a different endpoint
    console.log("Thread deletion not implemented", userThread);
  }

// ...existing code...

    return (
      <div className="min-h-screen bg-twitter-background py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Information Row */}
          <div className="bg-twitter-surface border border-twitter-border rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={userDetail.avatar ? `http://localhost:8000${userDetail.avatar}` : userDetail.get_avatar}
                    alt="avatar"
                    className="w-40 h-40 rounded-full object-cover border-4 border-twitter-border shadow-lg"
                  />
                  <span className="absolute bottom-2 right-2 bg-twitter-success w-5 h-5 rounded-full border-2 border-twitter-surface"></span>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-twitter-text">{userDetail.name}</h2>
                <p className="text-twitter-textSecondary">{userDetail.email}</p>
              </div>
              
              <div className="flex-1 w-full">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-twitter-backgroundSecondary border border-twitter-border rounded-xl">
                    <div className="text-2xl font-bold text-twitter-text">{userThreads.length}</div>
                    <div className="text-sm text-twitter-textSecondary">Projects</div>
                  </div>
                  <div className="text-center p-4 bg-twitter-backgroundSecondary border border-twitter-border rounded-xl">
                    <div className="text-2xl font-bold text-twitter-text">
                      {userThreads.filter(thread => thread.is_completed).length}
                    </div>
                    <div className="text-sm text-twitter-textSecondary">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-twitter-backgroundSecondary border border-twitter-border rounded-xl">
                    <div className="text-2xl font-bold text-twitter-text">
                      {userThreads.reduce((total, thread) => total + thread.posts_count, 0)}
                    </div>
                    <div className="text-sm text-twitter-textSecondary">Total Posts</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  {myProfile ? (
                    <>
                      <button
                        onClick={logout}
                        className="w-full bg-twitter-error hover:bg-twitter-error/90 text-white font-semibold py-2 rounded-lg shadow"
                      >
                        Log out
                      </button>
                      <Link to="/profile/edit">
                        <button className="w-full bg-twitter-primary hover:bg-twitter-primary/90 text-white font-semibold py-2 rounded-lg shadow">
                          Edit Profile
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {status === "add friend" && (
                        <button
                          onClick={handleSendRequest}
                          className="w-full bg-twitter-primary hover:bg-twitter-primary/90 text-white font-semibold py-2 rounded-lg shadow"
                        >
                          Add Friend
                        </button>
                      )}
                      {status === "Accept request" && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleFriendRequest('accepted')}
                            className="w-full bg-twitter-success hover:bg-twitter-success/90 text-white font-semibold py-2 rounded-lg shadow"
                          >
                            Accept Request
                          </button>
                          <button
                            onClick={() => handleFriendRequest('rejected')}
                            className="w-full bg-twitter-error hover:bg-twitter-error/90 text-white font-semibold py-2 rounded-lg shadow"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {status === "Request sent" && (
                        <div className="flex flex-col gap-2">
                          <button
                            className="w-full bg-twitter-border text-twitter-textSecondary font-semibold py-2 rounded-lg shadow cursor-not-allowed"
                            disabled
                          >
                            Request Sent
                          </button>
                          <button
                            onClick={handleCancelRequest}
                            className="w-full bg-twitter-error hover:bg-twitter-error/90 text-white font-semibold py-2 rounded-lg shadow"
                          >
                            Cancel Request
                          </button>
                        </div>
                      )}
                      {status === "Friends" && (
                        <button
                          className="w-full bg-twitter-success text-white font-semibold py-2 rounded-lg shadow cursor-default"
                          disabled
                        >
                          Friends
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid Row */}
          <div className="bg-twitter-surface border border-twitter-border rounded-3xl shadow-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-twitter-text flex items-center gap-3">
                <div className="w-3 h-3 bg-twitter-primary rounded-full"></div>
                Projects
              </h3>
              <div className="text-sm text-twitter-textSecondary bg-twitter-border px-3 py-1 rounded-full">
                {userThreads.length} {userThreads.length === 1 ? 'project' : 'projects'}
              </div>
            </div>

            {userThreads.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚀</div>
                <h4 className="text-xl font-semibold text-twitter-text mb-2">No Projects Yet</h4>
                <p className="text-twitter-textSecondary mb-6">
                  {myProfile 
                    ? "Start your first 100-day challenge!" 
                    : "This user hasn't started any projects yet."
                  }
                </p>
                {myProfile && (
                  <Link to="/posts/create">
                    <button className="bg-twitter-primary hover:bg-twitter-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                      🎯 Start a Project
                    </button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userThreads.map((userThread, index) => (
                  <div
                    key={userThread.id}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInUp 0.4s ease-out forwards'
                    }}
                  >
                    <ThreadCard userThread={userThread} isMyProfile={myProfile} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default ProfilePage;
