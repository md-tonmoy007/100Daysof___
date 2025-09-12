import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function SentLists() {
  const [sentRequests, setSentRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [id, setId] = useState("")

  useEffect(() => {
    // First get the user ID
    axios.get("http://localhost:8000/api/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    })
    .then(res => {
      setId(res.data.user.id)
    })
    .catch(err => {
      console.error(err)
      setError("Failed to load user information")
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (id) {
      // Then get the sent requests
      axios.get(`http://localhost:8000/api/friends/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      })
      .then(res => {
        setSentRequests(res.data.sent_requests)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError("Failed to load sent requests")
        setLoading(false)
      })
    }
  }, [id])

  const handleCancelRequest = async (requestId) => {
    try {
      await axios.delete(`http://localhost:8000/api/friends/cancel/${requestId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      })
      // Remove the cancelled request from the list
      setSentRequests(prev => prev.filter(request => request.id !== requestId))
    } catch (err) {
      console.error('Error cancelling request:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-3xl p-12 max-w-md mx-auto">
              <div className="text-red-500 text-6xl mb-6">😞</div>
              <h3 className="text-2xl font-bold text-red-800 mb-4">Something went wrong</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              Sent Friend Requests
            </h1>
            <p className="text-gray-600 text-lg">Manage your pending friend requests</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-semibold text-gray-800">Pending Requests</h2>
            <div className="ml-auto">
              <span className="text-sm text-gray-500 bg-gray-100/60 px-3 py-1 rounded-full">
                {sentRequests.length} {sentRequests.length === 1 ? 'request' : 'requests'}
              </span>
            </div>
          </div>

          {sentRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sentRequests.map((request, index) => (
                <div 
                  key={request.id}
                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Profile Image */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img
                        src={request.avatar ? `http://localhost:8000${request.avatar}` : request.get_avatar} 
                        alt={request.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-white/50 shadow-md group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-400 rounded-full border-2 border-white shadow-sm">
                        <span className="text-xs text-white flex items-center justify-center h-full">⏳</span>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="text-center space-y-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
                      {request.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      @{request.name?.toLowerCase().replace(/\s+/g, '')}
                    </p>
                    <p className="text-xs text-gray-500 bg-orange-100/50 px-2 py-1 rounded-full inline-block">
                      📤 Request Sent
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Link to={`/profile/${request.id}`}>
                      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105">
                        👤 View Profile
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleCancelRequest(request.id)}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 hover:scale-105"
                    >
                      ❌ Cancel Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">📤</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No Sent Requests</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                You haven't sent any friend requests yet. Start connecting with people to expand your network!
              </p>
              <Link to="/search">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  🔍 Find Friends
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Floating decoration elements */}
      <div className="fixed top-20 left-10 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="fixed top-40 right-16 w-12 h-12 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="fixed bottom-32 left-20 w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  )
}

export default SentLists