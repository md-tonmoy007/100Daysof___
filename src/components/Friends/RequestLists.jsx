import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Friends from './Friends'

function RequestLists() {
    const [id, setId] = useState("")
    const [friends, setFriends] = useState([]) 
    const [sent, setSent] = useState([])
    const [requests, setRequests] = useState([])
    const [tab, setTab] = useState(1)

    function handleTab(num) {
        console.log("tab no:", num)
        setTab(num);
    }

    useEffect(() => {
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
                console.log('Sent Requests:', res.data);
                setFriends(res.data.friends)
                setSent(res.data.sent_requests)
                setRequests(res.data.requests)
            }).catch(err => {
                console.error(err)
            })
        }
    }, [id])  // Dependency array includes id

    return (
        <div>
            <div className='bg-white text-gray-900 mx-5 rounded-xl'>
                <div className='flex gap-10 text-4xl ml-1 p-10'>
                    <button onClick={() => handleTab(1)} className={tab === 1 ? 'bg-blue-800 p-3 text-white rounded-xl' : ""}>
                        Friends
                    </button>
                    <button onClick={() => handleTab(2)} className={tab === 2 ? 'bg-blue-800 p-3 text-white rounded-xl' : ""}>
                        Requests
                    </button>
                    <button onClick={() => handleTab(3)} className={tab === 3 ? 'bg-blue-800 p-3 text-white rounded-xl' : ""}>
                        Sent
                    </button>
                </div>
            </div>
            <div className='w-[80%] ml-[10%] grid grid-cols-2'>
                {tab === 1 && friends.map((friend) => (
                    <div key={friend.id}>
                        <Friends friend={friend} />
                    </div>
                ))}
                {tab === 2 && requests.map((request) => (
                    <div key={request.id}>
                        <Friends friend={request} />
                    </div>
                ))}
                {tab === 3 && sent.map((sent) => (
                    <div key={sent.id}>
                        <Friends friend={sent} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RequestLists
