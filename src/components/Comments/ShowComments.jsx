import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Comments from './Comments';

function ShowComments(post) {
    console.log("this is the comment", post.post.comments)
    
    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-white/20 backdrop-blur-sm px-6 py-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Comments ({post.post.comments.length})
                        </h3>
                    </div>
                    {post.post.comments.length > 0 && (
                        <div className="text-xs text-gray-500 bg-gray-100/60 px-3 py-1 rounded-full">
                            💬 Join the conversation
                        </div>
                    )}
                </div>
            </div>

            {/* Comments List */}
            <div className="p-6">
                {post.post.comments.length > 0 ? (
                    <div className="space-y-4">
                        {post.post.comments.map((comment, index) => (
                            <div 
                                key={comment.id}
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    animation: 'fadeInUp 0.4s ease-out forwards'
                                }}
                            >
                                <Comments key={comment.id} comment={comment}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">💭</div>
                        <h4 className="text-xl font-semibold text-gray-700 mb-2">No comments yet</h4>
                        <p className="text-gray-500 mb-6">Be the first to share your thoughts on this post!</p>
                        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
                    </div>
                )}
            </div>

            {/* Footer with engagement stats */}
            {post.post.comments.length > 0 && (
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 border-t border-white/20">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                        <span>
                            {post.post.comments.length === 1 
                                ? "1 person joined the conversation" 
                                : `${post.post.comments.length} people joined the conversation`
                            }
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowComments