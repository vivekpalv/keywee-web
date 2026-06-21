"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { io, Socket } from "socket.io-client";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "https://backend.keywee.in/api/v1";
const SOCKET_URL = "https://backend.keywee.in";

// Types based on JSON schemas
interface ChatUser {
  _id: string; // roomId
  roomId: string;
  user: {
    _id: string;
    name?: string;
    mobile: string;
    roles: string[];
  };
  latestMessage: {
    _id: string;
    message: string;
    createdAt: string;
    isRead: boolean;
  };
}

interface Message {
  _id?: string;
  roomId: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Data States
  const [chatList, setChatList] = useState<ChatUser[]>([]);
  const [activeChat, setActiveChat] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");

  // UI States
  const [loadingList, setLoadingList] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- Initial Setup & Socket Connection ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      setCurrentUserId(decoded.id);
    } catch (err) {
      console.error("Invalid token");
    }

    // Initialize Socket
    const newSocket = io(SOCKET_URL, {
      auth: { token },
      query: { token }
    });

    newSocket.on("connect", () => console.log("Socket connected"));
    newSocket.on("connect_error", (err) => console.error("Socket error:", err));

    // Listen for incoming messages
    newSocket.on("receive_message", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);

      // Update latest message in sidebar
      setChatList((prevList) =>
        prevList.map(chat =>
          chat.roomId === newMessage.roomId
            ? { ...chat, latestMessage: { ...chat.latestMessage, message: newMessage.message, createdAt: new Date().toISOString() } }
            : chat
        )
      );
    });

    setSocket(newSocket);

    // Fetch Chat List
    const fetchChatUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/chat`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setChatList(data.users);
        }
      } catch (err) {
        console.error("Failed to fetch chat list", err);
      } finally {
        setLoadingList(false);
      }
    };

    fetchChatUsers();

    return () => {
      newSocket.disconnect();
    };
  }, [router]);

  // --- Handle Chat Selection ---
  const handleSelectChat = async (chat: ChatUser) => {
    setActiveChat(chat);
    setLoadingMessages(true);
    const token = localStorage.getItem("token");

    // Join socket room
    if (socket) {
      socket.emit("join_chat", { targetUserId: chat.user._id });
    }

    try {
      const res = await fetch(`${API_BASE_URL}/user/chat/${chat.roomId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.chats);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // --- Handle Sending Message ---
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat || !socket) return;

    const payload = {
      targetUserId: activeChat.user._id,
      message: messageInput.trim(),
    };

    // Emit message to server
    socket.emit("send_message", payload);
    setMessageInput("");
  };

  return (
    // Uses h-[100dvh] so mobile keyboards don't push the input out of view
    <div className="h-[100dvh] bg-background text-foreground font-sans p-0 sm:p-4 md:p-8 lg:p-12 transition-colors duration-300 flex flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 flex flex-col h-full">

        {/* Header - Hidden on mobile if viewing an active chat to save vertical space */}
        <div className={`justify-between items-center px-4 sm:px-0 pt-4 sm:pt-0 border-b border-zinc-200 dark:border-zinc-800 pb-4 md:pb-6 mb-0 sm:mb-4 md:mb-6 ${activeChat ? 'hidden md:flex' : 'flex'}`}>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Messages</h1>
          <Link href="/dashboard" className="text-xs font-bold border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm transition-colors">
            &larr; <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
        </div>

        {/* Chat Layout Container */}
        {/* Edge-to-edge on mobile (rounded-none, border-none), floated box on desktop */}
        <div className="flex-1 flex overflow-hidden border-none sm:border border-zinc-200 dark:border-zinc-800 rounded-none sm:rounded-2xl bg-white dark:bg-zinc-900 shadow-none sm:shadow-sm">

          {/* Sidebar (Chat List) - Hidden on mobile when a chat is active */}
          <div className={`${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 lg:w-1/4 border-r border-zinc-200 dark:border-zinc-800 flex-col`}>
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <h2 className="font-bold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Conversations</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loadingList ? (
                <div className="flex justify-center p-8"><LoadingSpinner className="w-6 h-6 text-zinc-500" /></div>
              ) : chatList.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-sm">No conversations yet.</div>
              ) : (
                chatList.map((chat) => (
                  <button
                    key={chat._id}
                    onClick={() => handleSelectChat(chat)}
                    className={`w-full text-left p-4 border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3 ${activeChat?._id === chat._id ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
                  >
                    {/* User Icon */}
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-lg shrink-0">
                      👤
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                        {chat.user.name || chat.user.mobile}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {chat.latestMessage?.message || "Started a conversation"}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Main Chat Area - Hidden on mobile when NO chat is active */}
          <div className={`${activeChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-zinc-50 dark:bg-[#121212]`}>
            {activeChat ? (
              <>
                {/* Active Chat Header */}
                <div className="p-3 sm:p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center shadow-sm z-10 shrink-0">
                  {/* Mobile Back Button */}
                  <button
                    type="button"
                    aria-label="Back to conversations list"
                    title="Back to conversations"
                    onClick={() => setActiveChat(null)}
                    className="md:hidden mr-2 sm:mr-3 p-2 -ml-1 sm:-ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-lg mr-3 shrink-0">👤</div>
                  <div className="truncate">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 truncate text-sm sm:text-base">{activeChat.user.name || activeChat.user.mobile}</h3>
                    <p className="text-[10px] sm:text-xs text-zinc-500 truncate">{activeChat.user.roles.join(', ')}</p>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
                  {loadingMessages ? (
                    <div className="flex h-full items-center justify-center"><LoadingSpinner className="w-8 h-8 text-zinc-500" /></div>
                  ) : messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-zinc-500 text-sm">Say hello to start the conversation!</div>
                  ) : (
                    messages.map((msg, index) => {
                      const isMe = msg.senderId === currentUserId;
                      return (
                        <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                          {/* 'break-words' and 'whitespace-pre-wrap' ensure long text doesn't overflow */}
                          <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2.5 md:px-5 md:py-3 text-[13px] sm:text-sm break-words whitespace-pre-wrap ${isMe ? 'bg-[#EAB308] text-white rounded-br-none' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-bl-none shadow-sm'}`}>
                            {msg.message}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} className="h-1" />
                </div>

                {/* Input Area */}
                <div className="p-3 md:p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-[#EAB308] dark:focus:border-yellow-500 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="bg-black dark:bg-white text-white dark:text-black rounded-xl px-4 md:px-6 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                    >
                      <span className="hidden sm:inline">Send</span>
                      {/* Paper airplane icon for mobile */}
                      <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 p-6 text-center">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                <p>Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}