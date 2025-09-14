import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Friends from './components/Friends/Friends';
import Post from './posts/Post';

function SearchResult() {
    const [result, setResult] = useState({ users: [], posts: [] }); // Initialize as an object with users and posts

    const { query } = useParams();

    useEffect(() => {
        axios.post('http://localhost:8000/api/search/', { query }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                // "Content-Type": 
            },
        }).then(res => {
            setResult(res.data); // Set the entire response object
            console.log("result", res.data); // Logging the response for debugging
        }).catch(err => {
            console.error("query", err);
        });
    }, [query]); // Use query as the dependency

        return (
            <div className="min-h-screen bg-twitter-background py-10 px-4 flex flex-col items-center">
                <div className="w-full max-w-5xl">
                    {/* Search Query Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-twitter-primary mb-2">Search Results</h1>
                        <p className="text-twitter-textSecondary">Results for: <span className="text-twitter-text font-semibold">"{query}"</span></p>
                    </div>

                    {/* Profiles Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-twitter-text mb-6 flex items-center border-b border-twitter-border pb-3">
                            <span className="mr-3">👥</span>
                            Profiles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {result.users.length === 0 ? (
                                <div className="col-span-2 text-center py-12">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <p className="text-twitter-textSecondary text-lg">No users found</p>
                                    <p className="text-twitter-textSecondary text-sm mt-2">Try searching with different keywords</p>
                                </div>
                            ) : (
                                result.users.map((friend) => (
                                    <div key={friend.id} className="bg-twitter-surface rounded-2xl border border-twitter-border shadow-lg p-6 flex items-center gap-4 hover:border-twitter-primary/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                        <Friends friend={friend} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Posts Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-twitter-text mb-6 flex items-center border-b border-twitter-border pb-3">
                            <span className="mr-3">📝</span>
                            Posts
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {result.posts.length === 0 ? (
                                <div className="col-span-2 text-center py-12">
                                    <div className="text-6xl mb-4">📄</div>
                                    <p className="text-twitter-textSecondary text-lg">No posts found</p>
                                    <p className="text-twitter-textSecondary text-sm mt-2">Try searching with different keywords</p>
                                </div>
                            ) : (
                                result.posts.map((post) => (
                                    <div key={post.id} className="bg-twitter-surface rounded-2xl border border-twitter-border shadow-lg p-6 hover:border-twitter-primary/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                        <Post id={post.id} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* No Results Found */}
                    {result.users.length === 0 && result.posts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-8xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold text-twitter-text mb-4">No results found</h3>
                            <p className="text-twitter-textSecondary mb-6">
                                We couldn't find anything matching "<span className="text-twitter-text font-semibold">{query}</span>"
                            </p>
                            <div className="bg-twitter-surface rounded-2xl border border-twitter-border p-6 max-w-md mx-auto">
                                <h4 className="font-semibold text-twitter-text mb-3">Try these suggestions:</h4>
                                <ul className="text-sm text-twitter-textSecondary space-y-2 text-left">
                                    <li>• Check your spelling</li>
                                    <li>• Try different keywords</li>
                                    <li>• Use more general terms</li>
                                    <li>• Search for usernames or hashtags</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default SearchResult;
