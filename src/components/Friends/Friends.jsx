import React from 'react'
import { Link } from 'react-router-dom'

function Friends(friend) {
    console.log("friend:", friend)
  return (
    <div className="group">
        <Link to={`/profile/${friend.friend.id}`}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:bg-white/70">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={friend.avatar ? `http://localhost:8000${friend.friend.avatar}` : friend.friend.get_avatar} 
                  alt={friend.friend.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/50 shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-3">
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                {friend.friend.name}
              </h2>
              <p className="text-sm text-gray-500 bg-gray-100/50 px-3 py-1 rounded-full inline-block">
                @{friend.friend.name?.toLowerCase().replace(/\s+/g, '')}
              </p>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {friend.friend.email}
              </p>
            </div>

            {/* Action Indicator */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-700 text-sm font-medium">
                <span>👤</span>
                View Profile
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>
    </div>
  )
}

export default Friends