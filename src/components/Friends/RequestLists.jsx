import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Friends from './Friends'

function RequestLists() {
    const [id, setId] = useState("")
    const [friends, setFriends] = useState([]) 
    const [sent, setSent] = useState([])
    const [requests, setRequests] = useState([])
    const [tab, setTab] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    function handleTab(num) {
        console.log("tab no:", num)
        setTab(num);
    }

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8000/api/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        })
        .then(res => {
            console.log(res.data)  
            setId(res.data.user.id) 
        })
        .catch(err => {
            console.error(err)
            setError("Failed to load user information");
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        if (id) {  // Only run the effect if id is not empty
            axios.get(`http://localhost:8000/api/friends/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
            .then(res => {
                console.log('Friend Data:', res.data);
                setFriends(res.data.friends)
                setSent(res.data.sent_requests)
                setRequests(res.data.requests)
                setLoading(false);
            }).catch(err => {
                console.error(err)
                setError("Failed to load friends data");
                setLoading(false);
            })
        }
    }, [id])  // Dependency array includes id

    const getCurrentData = () => {
        switch(tab) {
            case 1: return friends;
            case 2: return requests;
            case 3: return sent;
            default: return [];
        }
    }

    const getCurrentTitle = () => {
        switch(tab) {
            case 1: return "Your Friends";
            case 2: return "Friend Requests";
            case 3: return "Sent Requests";
            default: return "";
        }
    }

    const getCurrentEmptyMessage = () => {
        switch(tab) {
            case 1: return { emoji: "👥", title: "No Friends Yet", message: "Start connecting with people to build your network!" };
            case 2: return { emoji: "📬", title: "No Requests", message: "No pending friend requests at the moment." };
            case 3: return { emoji: "📤", title: "No Sent Requests", message: "You haven't sent any friend requests yet." };
            default: return { emoji: "🤔", title: "Nothing Here", message: "Select a tab to view content." };
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-twitter-background p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Loading Header */}
                    <div className="bg-twitter-surface border border-twitter-border rounded-3xl p-8 mb-8 animate-pulse">
                        <div className="flex gap-6">
                            <div className="h-12 bg-twitter-border rounded-2xl w-32"></div>
                            <div className="h-12 bg-twitter-border rounded-2xl w-32"></div>
                            <div className="h-12 bg-twitter-border rounded-2xl w-32"></div>
                        </div>
                    </div>
                    
                    {/* Loading Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-twitter-surface border border-twitter-border rounded-2xl p-8 animate-pulse">
                                <div className="flex justify-center mb-6">
                                    <div className="w-24 h-24 bg-twitter-border rounded-full"></div>
                                </div>
                                <div className="text-center space-y-3">
                                    <div className="h-6 bg-twitter-border rounded w-3/4 mx-auto"></div>
                                    <div className="h-4 bg-twitter-border rounded w-1/2 mx-auto"></div>
                                    <div className="h-4 bg-twitter-border rounded w-2/3 mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-twitter-background p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-20">
                        <div className="bg-twitter-error/10 border border-twitter-error/20 rounded-3xl p-12 max-w-md mx-auto">
                            <div className="text-twitter-error text-6xl mb-6">😞</div>
                            <h3 className="text-2xl font-bold text-twitter-error mb-4">Something went wrong</h3>
                            <p className="text-twitter-error mb-6">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="bg-twitter-error text-white px-6 py-3 rounded-full font-medium hover:bg-twitter-error/90 transition-all duration-200 shadow-lg"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentData = getCurrentData();
    const emptyState = getCurrentEmptyMessage();

    return (
        <div className="min-h-screen bg-twitter-background p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with Tabs */}
                <div className="bg-twitter-surface border border-twitter-border rounded-3xl shadow-xl p-8 mb-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-twitter-text mb-2">
                            Friends & Connections
                        </h1>
                        <p className="text-twitter-textSecondary text-lg">Manage your social network</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        <button 
                            onClick={() => handleTab(1)} 
                            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                                tab === 1 
                                    ? 'bg-twitter-primary text-white shadow-lg scale-105' 
                                    : 'bg-twitter-backgroundSecondary border border-twitter-border text-twitter-textSecondary hover:bg-twitter-surface hover:scale-105'
                            }`}
                        >
                            👥 Friends ({friends.length})
                        </button>
                        <button 
                            onClick={() => handleTab(2)} 
                            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                                tab === 2 
                                    ? 'bg-twitter-primary text-white shadow-lg scale-105' 
                                    : 'bg-twitter-backgroundSecondary border border-twitter-border text-twitter-textSecondary hover:bg-twitter-surface hover:scale-105'
                            }`}
                        >
                            📬 Requests ({requests.length})
                        </button>
                        <button 
                            onClick={() => handleTab(3)} 
                            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                                tab === 3 
                                    ? 'bg-twitter-primary text-white shadow-lg scale-105' 
                                    : 'bg-twitter-backgroundSecondary border border-twitter-border text-twitter-textSecondary hover:bg-twitter-surface hover:scale-105'
                            }`}
                        >
                            📤 Sent ({sent.length})
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-twitter-surface border border-twitter-border rounded-3xl shadow-xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-3 h-3 bg-twitter-primary rounded-full animate-pulse"></div>
                        <h2 className="text-2xl font-semibold text-twitter-text">{getCurrentTitle()}</h2>
                        <div className="ml-auto">
                            <span className="text-sm text-twitter-textSecondary bg-twitter-border px-3 py-1 rounded-full">
                                {currentData.length} {currentData.length === 1 ? 'person' : 'people'}
                            </span>
                        </div>
                    </div>

                    {currentData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentData.map((item, index) => (
                                <div 
                                    key={item.id}
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        animation: 'fadeInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    <Friends friend={item} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-8xl mb-6">{emptyState.emoji}</div>
                            <h3 className="text-2xl font-bold text-twitter-text mb-4">{emptyState.title}</h3>
                            <p className="text-twitter-textSecondary mb-8 max-w-md mx-auto">{emptyState.message}</p>
                            <div className="w-20 h-1 bg-twitter-primary rounded-full mx-auto"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating decoration elements */}
            <div className="fixed top-20 left-10 w-20 h-20 bg-twitter-primary/10 rounded-full animate-pulse"></div>
            <div className="fixed top-40 right-16 w-16 h-16 bg-twitter-primary/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="fixed bottom-32 left-20 w-12 h-12 bg-twitter-primary/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
    )
}

export default RequestLists
