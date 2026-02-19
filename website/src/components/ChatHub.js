'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function ChatHub() {
    const [targets, setTargets] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const socketRef = useRef();

    useEffect(() => {
        const userStr = localStorage.getItem('userInfo');
        if (userStr) {
            setCurrentUser(JSON.parse(userStr));
        }

        const fetchTargets = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const { data } = await axios.get('http://localhost:5002/api/messages/targets', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTargets(data);
            } catch (err) {
                console.error("Failed to fetch chat targets", err);
            }
        };
        fetchTargets();

        // Socket setup
        socketRef.current = io('http://localhost:5002');
        if (userStr) {
            const user = JSON.parse(userStr);
            socketRef.current.emit('join', user._id);
        }

        socketRef.current.on('message', (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => socketRef.current.disconnect();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            const fetchConversation = async () => {
                try {
                    const token = localStorage.getItem('adminToken');
                    const { data } = await axios.get(`http://localhost:5002/api/messages/${selectedUser._id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setMessages(data);
                } catch (err) {
                    console.error("Failed to fetch conversation", err);
                }
            };
            fetchConversation();
        }
    }, [selectedUser]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage || !selectedUser) return;

        try {
            const token = localStorage.getItem('adminToken');
            const { data } = await axios.post('http://localhost:5002/api/messages', {
                recipientId: selectedUser._id,
                content: newMessage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(prev => [...prev, data]);
            setNewMessage('');
        } catch (err) {
            alert('Failed to send message');
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden h-[600px]">
            {/* Sidebar Targets */}
            <div className="xl:col-span-1 border-r border-slate-50 overflow-y-auto">
                <div className="p-6 border-b border-slate-50 bg-slate-50/50 font-bold text-slate-800">
                    Active Conversations
                </div>
                <div className="divide-y divide-slate-50">
                    {targets.map(user => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`w-full p-4 flex items-center space-x-3 hover:bg-slate-50 transition-all ${selectedUser?._id === user._id ? 'bg-orange-50/50' : ''}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                                {user.name?.[0]}
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-slate-800">{user.name}</div>
                                <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{user.role}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="xl:col-span-3 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white z-10">
                            <div>
                                <h3 className="font-bold text-slate-800">{selectedUser.name}</h3>
                                <p className="text-xs text-emerald-500 flex items-center font-medium">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50/30">
                            {messages.map((msg, i) => {
                                const isMe = msg.sender === currentUser?._id;
                                return (
                                    <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm text-sm ${isMe ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-50 flex space-x-4">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                placeholder="Type your message here..."
                                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-orange-500 outline-none"
                            />
                            <button type="submit" className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">
                                Send
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        <p className="mt-4 font-bold">Select a teacher or parent to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}
