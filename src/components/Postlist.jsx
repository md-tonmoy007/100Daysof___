import React, { useEffect, useState, useCallback, useRef } from 'react'
import axios from 'axios';
import Post from '../posts/Post';
import CreateComment from './Comments/CreateComment';
import ShowComments from './Comments/ShowComments';
// import CreateComment from './Post/CreateComment';

const Postlist = () => {
    const [posts, setPosts] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const observerRef = useRef();
    const lastPostElementRef = useRef();

    const POSTS_PER_PAGE = 10;

    const loadPosts = useCallback(async (pageNum = 1, isInitial = false) => {
        try {
            if (isInitial) {
                setLoading(true);
                setError("");
            } else {
                setLoadingMore(true);
            }

            const response = await axios.get(`http://localhost:8000/api/posts/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                params: {
                    page: pageNum,
                    limit: POSTS_PER_PAGE
                }
            });

            console.log('Posts response:', response.data);
            
            // Handle different API response formats
            let newPosts = [];
            let totalCount = 0;
            
            if (Array.isArray(response.data)) {
                // If API returns array directly
                newPosts = response.data;
                setHasMore(newPosts.length === POSTS_PER_PAGE);
            } else if (response.data.results) {
                // If API returns paginated format
                newPosts = response.data.results;
                totalCount = response.data.count;
                setHasMore(response.data.next !== null);
            } else if (response.data.posts) {
                // If API returns posts in posts field
                newPosts = response.data.posts;
                totalCount = response.data.total || newPosts.length;
                setHasMore(pageNum * POSTS_PER_PAGE < totalCount);
            } else {
                newPosts = [];
                setHasMore(false);
            }

            if (isInitial) {
                setPosts(newPosts);
            } else {
                setPosts(prevPosts => [...prevPosts, ...newPosts]);
            }

            setAccessToken(localStorage.getItem('accessToken'));

            // If we got fewer posts than requested, we've reached the end
            if (newPosts.length < POSTS_PER_PAGE) {
                setHasMore(false);
            }

        } catch (err) {
            console.error('Error loading posts:', err);
            if (isInitial) {
                setError("Failed to load posts. Please try again.");
            } else {
                setError("Failed to load more posts.");
                // Revert page number on error
                setPage(prev => prev - 1);
            }
        } finally {
            if (isInitial) {
                setLoading(false);
            } else {
                setLoadingMore(false);
            }
        }
    }, []);

    // Intersection Observer callback
    const lastPostElementCallback = useCallback(node => {
        if (loading || loadingMore) return;
        if (observerRef.current) observerRef.current.disconnect();
        
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loadingMore) {
                console.log('Loading more posts...');
                setPage(prevPage => {
                    const nextPage = prevPage + 1;
                    loadPosts(nextPage, false);
                    return nextPage;
                });
            }
        }, {
            threshold: 0.1,
            rootMargin: '100px' // Start loading 100px before the element is visible
        });
        
        if (node) observerRef.current.observe(node);
    }, [loading, loadingMore, hasMore, loadPosts]);

    // Ref callback for the last post
    const setLastPostRef = useCallback((node) => {
        lastPostElementRef.current = node;
        lastPostElementCallback(node);
    }, [lastPostElementCallback]);

    // Initial load
    useEffect(() => {
        loadPosts(1, true);
    }, [loadPosts]);

    // Cleanup observer on unmount
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    // Manual load more function (fallback)
    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                loadPosts(nextPage, false);
                return nextPage;
            });
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                {/* Loading skeleton */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 animate-pulse">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-32"></div>
                                <div className="h-3 bg-gray-300 rounded w-24"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-white/30 max-w-md mx-auto">
                    <div className="text-6xl mb-6">📝</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">No Posts Yet</h3>
                    <p className="text-gray-600 mb-6">Be the first to share something amazing! Create your first post and start connecting with others.</p>
                    <button 
                        onClick={() => document.querySelector('textarea')?.focus()} 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Create Your First Post
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Posts count indicator */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-600">
                        {posts.length} {posts.length === 1 ? 'Post' : 'Posts'} Available
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    Live Feed
                </div>
            </div>

            {/* Posts list */}
            <div className="space-y-6">
                {posts.map((post, index) => {
                    const isLastPost = index === posts.length - 1;
                    return (
                        <div 
                            key={post.id}
                            ref={isLastPost ? setLastPostRef : null}
                            style={{
                                animationDelay: `${(index % POSTS_PER_PAGE) * 0.1}s`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            <Post key={post.id} id={post.id}/>
                        </div>
                    );
                })}
            </div>

            {/* Loading more indicator */}
            {loadingMore && (
                <div className="flex justify-center py-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                            <div className="text-gray-700 font-medium">Loading more amazing posts...</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Load more button (fallback) */}
            {!loadingMore && hasMore && posts.length > 0 && (
                <div className="text-center py-8">
                    <button 
                        onClick={handleLoadMore}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        📄 Load More Posts
                    </button>
                </div>
            )}

            {/* End of content indicator */}
            {!hasMore && posts.length > 0 && (
                <div className="text-center py-8">
                    <div className="inline-flex items-center gap-3 text-gray-500 text-sm bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <span>🎉 You've seen all posts! You're all caught up!</span>
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                </div>
            )}

            {/* Error state for loading more */}
            {error && !loading && posts.length > 0 && (
                <div className="text-center py-8">
                    <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
                        <div className="text-red-500 text-3xl mb-3">⚠️</div>
                        <h4 className="text-lg font-semibold text-red-800 mb-2">Couldn't load more posts</h4>
                        <p className="text-red-600 mb-4 text-sm">{error}</p>
                        <button 
                            onClick={handleLoadMore}
                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Postlist