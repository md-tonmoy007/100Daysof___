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
        <div className='ml-[15%]'>
            <h1 className='font-bold border-b-2 w-[70%]'>Profiles</h1>
            <div className='grid grid-cols-2'>
                
                {result.users.length === 0 ? 'No users found': result.users.map((friend) => (
                        <div key={friend.id} className='w-[80%]'>
                            <Friends friend={friend} />
                        </div>
                    ))}
            </div>

            <h1 className='font-bold border-b-2 w-[70%]'>Posts</h1>
            <div className='grid grid-cols-2 p-3'>
                
                {result.posts.length === 0 ? 'No posts found': result.posts.map((post) => (
                        <div key={post.id} className='w-[80%]'>
                            <Post id={post.id} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default SearchResult;
