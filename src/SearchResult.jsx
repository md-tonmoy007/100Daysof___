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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4 flex flex-col items-center">
                <div className="w-full max-w-5xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-200 pb-2">Profiles</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {result.users.length === 0 ? (
                            <div className="col-span-2 text-gray-400 text-center">No users found</div>
                        ) : (
                            result.users.map((friend) => (
                                <div key={friend.id} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
                                    <Friends friend={friend} />
                                </div>
                            ))
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-purple-200 pb-2">Posts</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {result.posts.length === 0 ? (
                            <div className="col-span-2 text-gray-400 text-center">No posts found</div>
                        ) : (
                            result.posts.map((post) => (
                                <div key={post.id} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
                                    <Post id={post.id} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
}

export default SearchResult;
