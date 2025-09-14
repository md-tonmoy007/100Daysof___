import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Comments from './Comments';

function ShowComments(post) {
    console.log("this is the comment", post.post.comments)
    
    return (
        <div className="bg-twitter-surface border border-twitter-border rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-twitter-backgroundSecondary px-6 py-4 border-b border-twitter-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-twitter-primary rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-semibold text-twitter-text">
                            Comments ({post.post.comments.length})
                        </h3>
                    </div>
                    {post.post.comments.length > 0 && (
                        <div className="text-xs text-twitter-textSecondary bg-twitter-border px-3 py-1 rounded-full">
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
                        <h4 className="text-xl font-semibold text-twitter-text mb-2">No comments yet</h4>
                        <p className="text-twitter-textSecondary mb-6">Be the first to share your thoughts on this post!</p>
                        <div className="w-16 h-1 bg-twitter-primary rounded-full mx-auto"></div>
                    </div>
                )}
            </div>

            {/* Footer with engagement stats */}
            {post.post.comments.length > 0 && (
                <div className="bg-twitter-backgroundSecondary px-6 py-3 border-t border-twitter-border">
                    <div className="flex items-center justify-center gap-2 text-sm text-twitter-textSecondary">
                        <span className="w-1.5 h-1.5 bg-twitter-primary rounded-full animate-pulse"></span>
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