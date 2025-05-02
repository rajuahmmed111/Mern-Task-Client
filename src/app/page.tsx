"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Paperclip,
  Smile,
  Send,
  Mic,
  ChevronRight,
  Phone,
  Video,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ChatApp() {
  const [message, setMessage] = useState("")
//   const [showLeftSidebar, setShowLeftSidebar] = useState(true)
  const [showRightSidebar, setShowRightSidebar] = useState(false)
  const [activeMobileView, setActiveMobileView] = useState<"list" | "chat" | "info">("list")

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
//   const isTablet = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    // Reset mobile view when screen size changes
    if (!isMobile) {
      setActiveMobileView("chat")
    } else {
      setActiveMobileView("list")
    }
  }, [isMobile])

  useEffect(() => {
    // Scroll to bottom of chat when component mounts
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // In a real app, you would send the message to your backend
      setMessage("")

      // Scroll to bottom after sending message
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }
  }

  const handleChatSelect = () => {
    if (isMobile) {
      setActiveMobileView("chat")
    }
  }

  const handleBackToList = () => {
    if (isMobile) {
      setActiveMobileView("list")
    }
  }

  const handleShowInfo = () => {
    if (isMobile) {
      setActiveMobileView("info")
    } else {
      setShowRightSidebar(!showRightSidebar)
    }
  }

  const handleBackToChat = () => {
    if (isMobile) {
      setActiveMobileView("chat")
    }
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      {(!isMobile || activeMobileView === "list") && (
        <div className={`${isMobile ? "w-full" : "w-80"} border-r flex flex-col`}>
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4L10 12V20L14 16V12L20 4H4Z" fill="#7C3AED" />
                </svg>
              </div>
              <h1 className="text-xl font-bold">Chat</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search people or messages..."
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm"
              />
            </div>
          </div>

          <div className="p-4 border-b">
            <h2 className="font-medium mb-3">Online</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {["Benkaii", "Jason", "Kyedae", "Aleck", "Alfie"].map((name, index) => (
                <div key={index} className="flex flex-col items-center flex-shrink-0">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=${name.charAt(0)}`}
                        alt={name}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-xs mt-1">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <h2 className="font-medium p-4 pb-2">Messages</h2>
            {[
              { name: "Jason Susanto", message: "Image Sent", time: "9:45 AM", online: true },
              { name: "JJ Jingga", message: "Nice clutch vs Fnatic 🔥", time: "9:40 AM", online: false, unread: 2 },
              { name: "Benkaii", message: "Sent u in GRP", time: "Yesterday", online: true },
              { name: "Asterisk", message: "Yea let's play 5 stacks", time: "Yesterday", online: true },
              { name: "Aleck", message: "COME SCRIM HERE!!!", time: "Yesterday", online: true, unread: 2 },
              { name: "Tyson", message: "Thanks, let's meet at Cha...", time: "Yesterday", online: true },
              { name: "Kyedae", message: "W GAMING!!!", time: "Yesterday", online: true },
              {
                name: "PAPER REX",
                message: "GG BRO, 2nd place is great L...",
                time: "Yesterday",
                online: false,
                unread: 12,
              },
              { name: "Nats", message: "", time: "04 Jan 2022", online: false },
            ].map((chat, index) => (
              <div
                key={index}
                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${chat.name === "Jason Susanto" ? "bg-gray-50" : ""}`}
                onClick={handleChatSelect}
              >
                <div className="relative mr-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=40&width=40&text=${chat.name.charAt(0)}`}
                      alt={chat.name}
                      width={40}
                      height={40}
                    />
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex items-center">
                    {index < 7 && (
                      <svg
                        className="h-3 w-3 text-gray-400 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                  </div>
                </div>
                {chat.unread && (
                  <div className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex justify-around">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg
                className="h-6 w-6 text-purple-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 9H9V15H15V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 12H18L15 21L9 3L6 12H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      {(!isMobile || activeMobileView === "chat") && (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              {isMobile && (
                <button onClick={handleBackToList} className="mr-2">
                  <ArrowLeft className="h-5 w-5 text-gray-500" />
                </button>
              )}
              <div className="relative mr-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                  <Image src="/placeholder.svg?height=40&width=40&text=J" alt="Jason Susanto" width={40} height={40} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="font-medium">Jason Susanto</h2>
                <p className="text-xs text-gray-500">Typing...</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-gray-700 hidden sm:block">
                <Video className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 hidden sm:block">
                <Phone className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleShowInfo}>
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">Yesterday</span>
            </div>

            <div className="flex items-end">
              <div className="max-w-[75%] bg-gray-100 rounded-t-lg rounded-br-lg p-3">
                <p>Hahaha, lol 😂</p>
                <span className="text-xs text-gray-500 mt-1 block">09:27 PM</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">Today</span>
            </div>

            <div className="flex items-end">
              <div className="max-w-[75%] bg-gray-100 rounded-t-lg rounded-br-lg p-3">
                <p>Ron, when you&apos;ll book a plane ticket?</p>
                <span className="text-xs text-gray-500 mt-1 block">09:27 PM</span>
              </div>
            </div>

            <div className="flex items-end justify-end">
              <div className="max-w-[75%] bg-purple-600 text-white rounded-t-lg rounded-bl-lg p-3">
                <p>Maybe tomorrow</p>
                <span className="text-xs text-purple-200 mt-1 block">09:28 PM</span>
              </div>
            </div>

            <div className="flex items-end justify-end">
              <div className="max-w-[75%] bg-purple-600 text-white rounded-t-lg rounded-bl-lg p-3">
                <p>After we go back to SG</p>
                <span className="text-xs text-purple-200 mt-1 block">09:28 PM ✓</span>
              </div>
            </div>

            <div className="flex items-end">
              <div className="max-w-[75%] bg-gray-100 rounded-t-lg rounded-br-lg p-3">
                <div className="flex items-center gap-2">
                  <button className="bg-purple-600 text-white rounded-full p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12L19 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 h-8 rounded-lg flex items-center px-2">
                      <div className="flex-1">
                        <div className="w-full h-2 bg-gray-300 rounded-full">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">0:31</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">09:31 PM</span>
              </div>
            </div>

            <div className="flex items-end justify-end">
              <div className="max-w-[75%] bg-purple-600 text-white rounded-t-lg rounded-bl-lg p-3">
                <p>Son, I&apos;ve bought the tickets ✈️</p>
                <div className="mt-2">
                  <Image
                    src="/placeholder.svg?height=200&width=300&text=Passport+and+Tickets"
                    alt="Tickets"
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <span className="text-xs text-purple-200 mt-1 block">10:42 AM ✓</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-4 flex items-center gap-2">
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <Paperclip className="h-5 w-5" />
            </button>
            <button type="button" className="text-gray-500 hover:text-gray-700 hidden sm:block">
              <Smile className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 py-2 px-3 focus:outline-none"
            />
            <button type="button" className="text-gray-500 hover:text-gray-700 hidden sm:block">
              <Mic className="h-5 w-5" />
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700"
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {/* Right Sidebar */}
      {((!isMobile && showRightSidebar) || (isMobile && activeMobileView === "info")) && (
        <div className={`${isMobile ? "w-full" : "w-80"} border-l`}>
          <div className="p-4 border-b flex items-center justify-between">
            {isMobile && (
              <button onClick={handleBackToChat} className="mr-2">
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <h2 className="font-medium">Media</h2>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">38</span>
            </div>
            <button className="text-xs text-gray-500 flex items-center">
              View All <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=100&width=100&text=Image+${item}`}
                  alt={`Media ${item}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-medium">Link</h2>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">14</span>
            </div>
            <button className="text-xs text-gray-500 flex items-center">
              View All <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                    <Image src="/placeholder.svg?height=40&width=40&text=🌐" alt="Website" width={40} height={40} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 truncate">https://airbnb.com/</p>
                    <p className="text-sm font-medium truncate">Airbnb - Register...</p>
                  </div>
                </div>
              </div>
              <div className="border-t px-3 py-2 flex justify-between items-center">
                <button className="text-xs text-purple-600 font-medium">View Messages</button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                    <Image src="/placeholder.svg?height=40&width=40&text=🌐" alt="Website" width={40} height={40} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 truncate">https://visitsingapore.com/</p>
                    <p className="text-sm font-medium truncate">Visit Singapore - Explore...</p>
                  </div>
                </div>
              </div>
              <div className="border-t px-3 py-2 flex justify-between items-center">
                <button className="text-xs text-purple-600 font-medium">View Messages</button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-medium">Files</h2>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">10</span>
            </div>
            <button className="text-xs text-gray-500 flex items-center">
              View All <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
            {[
              { name: "Schedule VCT APAC.pdf", size: "450 KB", date: "27 Jan 2022", type: "pdf" },
              { name: "IMG_102.jpeg", size: "2.4 MB", date: "26 Jan 2022", type: "image" },
              { name: "IMG_117.jpeg", size: "3.5 MB", date: "31 Jan 2022", type: "image" },
              { name: "Video_02-24-22.mp4", size: "10.2 MB", date: "02 Feb 2022", type: "video" },
              { name: "IMG_247.jpeg", size: "2.1 MB", date: "06 Feb 2022", type: "image" },
              { name: "VCT Masters.pdf", size: "320 KB", date: "18 Feb 2022", type: "pdf" },
            ].map((file, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-3">
                  {file.type === "pdf" ? (
                    <svg
                      className="h-4 w-4 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 2V8H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : file.type === "image" ? (
                    <svg
                      className="h-4 w-4 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 15L16 10L5 21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23 7L16 12L23 17V7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{file.size}</span>
                    <span className="mx-1">•</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}



// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { Search, Paperclip, Smile, Send, Mic, ChevronRight, Phone, Video, MoreHorizontal } from "lucide-react"
// import Image from "next/image"

// export default function ChatApp() {
//   const [message, setMessage] = useState("")
//   const chatContainerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     // Scroll to bottom of chat when component mounts
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
//     }
//   }, [])

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (message.trim()) {
//       // In a real app, you would send the message to your backend
//       setMessage("")
//     }
//   }

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Left Sidebar */}
//       <div className="w-80 border-r flex flex-col">
//         <div className="p-4 border-b">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-8 h-8 flex items-center justify-center">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M4 4L10 12V20L14 16V12L20 4H4Z" fill="#7C3AED" />
//               </svg>
//             </div>
//             <h1 className="text-xl font-bold">Chat</h1>
//           </div>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               placeholder="Search people or messages..."
//               className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm"
//             />
//           </div>
//         </div>

//         <div className="p-4 border-b">
//           <h2 className="font-medium mb-3">Online</h2>
//           <div className="flex gap-4">
//             {["Benkaii", "Jason", "Kyedae", "Aleck", "Alfie"].map((name, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <div className="relative">
//                   <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
//                     <Image
//                       src={`/placeholder.svg?height=40&width=40&text=${name.charAt(0)}`}
//                       alt={name}
//                       width={40}
//                       height={40}
//                     />
//                   </div>
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                 </div>
//                 <span className="text-xs mt-1">{name}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           <h2 className="font-medium p-4 pb-2">Messages</h2>
//           {[
//             { name: "Jason Susanto", message: "Image Sent", time: "9:45 AM", online: true },
//             { name: "JJ Jingga", message: "Nice clutch vs Fnatic 🔥", time: "9:40 AM", online: false, unread: 2 },
//             { name: "Benkaii", message: "Sent u in GRP", time: "Yesterday", online: true },
//             { name: "Asterisk", message: "Yea let's play 5 stacks", time: "Yesterday", online: true },
//             { name: "Aleck", message: "COME SCRIM HERE!!!", time: "Yesterday", online: true, unread: 2 },
//             { name: "Tyson", message: "Thanks, let's meet at Cha...", time: "Yesterday", online: true },
//             { name: "Kyedae", message: "W GAMING!!!", time: "Yesterday", online: true },
//             {
//               name: "PAPER REX",
//               message: "GG BRO, 2nd place is great L...",
//               time: "Yesterday",
//               online: false,
//               unread: 12,
//             },
//             { name: "Nats", message: "", time: "04 Jan 2022", online: false },
//           ].map((chat, index) => (
//             <div
//               key={index}
//               className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${chat.name === "Jason Susanto" ? "bg-gray-50" : ""}`}
//             >
//               <div className="relative mr-3">
//                 <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
//                   <Image
//                     src={`/placeholder.svg?height=40&width=40&text=${chat.name.charAt(0)}`}
//                     alt={chat.name}
//                     width={40}
//                     height={40}
//                   />
//                 </div>
//                 {chat.online && (
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between">
//                   <h3 className="font-medium truncate">{chat.name}</h3>
//                   <span className="text-xs text-gray-500">{chat.time}</span>
//                 </div>
//                 <div className="flex items-center">
//                   {index < 7 && (
//                     <svg
//                       className="h-3 w-3 text-gray-400 mr-1"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M20 6L9 17L4 12"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   )}
//                   <p className="text-sm text-gray-500 truncate">{chat.message}</p>
//                 </div>
//               </div>
//               {chat.unread && (
//                 <div className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {chat.unread}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="p-4 border-t flex justify-around">
//           <button className="p-2 rounded-full hover:bg-gray-100">
//             <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </button>
//           <button className="p-2 rounded-full hover:bg-gray-100">
//             <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//           <button className="p-2 rounded-full hover:bg-gray-100">
//             <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M15 9H9V15H15V9Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//           <button className="p-2 rounded-full hover:bg-gray-100">
//             <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M9 22V12H15V22"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//           <button className="p-2 rounded-full hover:bg-gray-100">
//             <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M22 12H18L15 21L9 3L6 12H2"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         <div className="p-4 border-b flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="relative mr-3">
//               <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
//                 <Image src="/placeholder.svg?height=40&width=40&text=J" alt="Jason Susanto" width={40} height={40} />
//               </div>
//               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//             </div>
//             <div>
//               <h2 className="font-medium">Jason Susanto</h2>
//               <p className="text-xs text-gray-500">Typing...</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="text-gray-500 hover:text-gray-700">
//               <Video className="h-5 w-5" />
//             </button>
//             <button className="text-gray-500 hover:text-gray-700">
//               <Phone className="h-5 w-5" />
//             </button>
//             <button className="text-gray-500 hover:text-gray-700">
//               <MoreHorizontal className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
//           <div className="text-center">
//             <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">Yesterday</span>
//           </div>

//           <div className="flex items-end">
//             <div className="max-w-[75%] bg-gray-100 rounded-t-lg rounded-br-lg p-3">
//               <p>Hahaha, lol 😂</p>
//               <span className="text-xs text-gray-500 mt-1 block">09:27 PM</span>
//             </div>
//           </div>

//           <div className="text-center">
//             <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">Today</span>
//           </div>

//           <div className="flex items-end">
//             <div className="max-w-[75%] bg-gray-100 rounded-t-lg rounded-br-lg p-3">
//               <p>Ron, when you&apos;ll book a plane ticket?</p>
//               <span className="text-xs text-gray-500 mt-1 block">09:27 PM</span>
//             </div>
//           </div>

//           <div className="flex items-end justify-end">
//             <div className="max-w-[75%] bg-purple-600 text-white rounded-t-lg rounded-bl-lg p-3">
//               <p>Maybe tomorrow</p>
//               <span className="text-xs text-purple-200 mt-1 block">09:28 PM</span>
//             </div>
//           </div>

//           <div className="flex items-end justify-end">
//             <div className="max-w-[75%] bg-purple-600 text-white rounded-t-lg rounded-bl-lg p-3">
//               <p>After we go back to SG</p>
//               <span className="text-xs text-purple-200 mt-1 block">09:28 PM ✓</span>
//             </div>
//           </div>

//           <div className="flex items-end">
//             <div className="max-w-[75%] bg-gray-100 rounded-t-lg rounded-br-lg p-3">
//               <div className="flex items-center gap-2">
//                 <button className="bg-purple-600 text-white rounded-full p-1">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M5 12L19 12"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M12 5L19 12L12 19"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//                 <div className="flex-1">
//                   <div className="w-full bg-gray-200 h-8 rounded-lg flex items-center px-2">
//                     <div className="flex-1">
//                       <div className="w-full h-2 bg-gray-300 rounded-full">
//                         <div className="bg-purple-600 h-2 rounded-full" style={{ width: "30%" }}></div>
//                       </div>
//                     </div>
//                     <span className="text-xs text-gray-500 ml-2">0:31</span>
//                   </div>
//                 </div>
//               </div>
//               <span className="text-xs text-gray-500 mt-1 block">09:31 PM</span>
//             </div>
//           </div>

//           <div className="flex items-end justify-end">
//             <div className="max-w-[75%] bg-purple-600 text-white rounded-t-lg rounded-bl-lg p-3">
//               <p>Son, I&apos;ve bought the tickets ✈️</p>
//               <div className="mt-2">
//                 <Image
//                   src="/placeholder.svg?height=200&width=300&text=Passport+and+Tickets"
//                   alt="Tickets"
//                   width={300}
//                   height={200}
//                   className="rounded-lg"
//                 />
//               </div>
//               <span className="text-xs text-purple-200 mt-1 block">10:42 AM ✓</span>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSendMessage} className="border-t p-4 flex items-center gap-2">
//           <button type="button" className="text-gray-500 hover:text-gray-700">
//             <Paperclip className="h-5 w-5" />
//           </button>
//           <button type="button" className="text-gray-500 hover:text-gray-700">
//             <Smile className="h-5 w-5" />
//           </button>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Write a message..."
//             className="flex-1 py-2 px-3 focus:outline-none"
//           />
//           <button type="button" className="text-gray-500 hover:text-gray-700">
//             <Mic className="h-5 w-5" />
//           </button>
//           <button
//             type="submit"
//             className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700"
//             disabled={!message.trim()}
//           >
//             <Send className="h-5 w-5" />
//           </button>
//         </form>
//       </div>

//       {/* Right Sidebar */}
//       <div className="w-80 border-l">
//         <div className="p-4 border-b flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <h2 className="font-medium">Media</h2>
//             <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">38</span>
//           </div>
//           <button className="text-xs text-gray-500 flex items-center">
//             View All <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         <div className="p-4 grid grid-cols-3 gap-2">
//           {[1, 2, 3].map((item) => (
//             <div key={item} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
//               <Image
//                 src={`/placeholder.svg?height=100&width=100&text=Image+${item}`}
//                 alt={`Media ${item}`}
//                 width={100}
//                 height={100}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="p-4 border-b flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <h2 className="font-medium">Link</h2>
//             <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">14</span>
//           </div>
//           <button className="text-xs text-gray-500 flex items-center">
//             View All <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         <div className="p-4 space-y-4">
//           <div className="border rounded-lg overflow-hidden">
//             <div className="p-3">
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
//                   <Image src="/placeholder.svg?height=40&width=40&text=🌐" alt="Website" width={40} height={40} />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs text-gray-500 truncate">https://airbnb.com/</p>
//                   <p className="text-sm font-medium truncate">Airbnb - Register...</p>
//                 </div>
//               </div>
//             </div>
//             <div className="border-t px-3 py-2 flex justify-between items-center">
//               <button className="text-xs text-purple-600 font-medium">View Messages</button>
//               <ChevronRight className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>

//           <div className="border rounded-lg overflow-hidden">
//             <div className="p-3">
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
//                   <Image src="/placeholder.svg?height=40&width=40&text=🌐" alt="Website" width={40} height={40} />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs text-gray-500 truncate">https://visitsingapore.com/</p>
//                   <p className="text-sm font-medium truncate">Visit Singapore - Explore...</p>
//                 </div>
//               </div>
//             </div>
//             <div className="border-t px-3 py-2 flex justify-between items-center">
//               <button className="text-xs text-purple-600 font-medium">View Messages</button>
//               <ChevronRight className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-b flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <h2 className="font-medium">Files</h2>
//             <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">10</span>
//           </div>
//           <button className="text-xs text-gray-500 flex items-center">
//             View All <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         <div className="p-4 space-y-4">
//           {[
//             { name: "Schedule VCT APAC.pdf", size: "450 KB", date: "27 Jan 2022", type: "pdf" },
//             { name: "IMG_102.jpeg", size: "2.4 MB", date: "26 Jan 2022", type: "image" },
//             { name: "IMG_117.jpeg", size: "3.5 MB", date: "31 Jan 2022", type: "image" },
//             { name: "Video_02-24-22.mp4", size: "10.2 MB", date: "02 Feb 2022", type: "video" },
//             { name: "IMG_247.jpeg", size: "2.1 MB", date: "06 Feb 2022", type: "image" },
//             { name: "VCT Masters.pdf", size: "320 KB", date: "18 Feb 2022", type: "pdf" },
//           ].map((file, index) => (
//             <div key={index} className="flex items-center">
//               <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-3">
//                 {file.type === "pdf" ? (
//                   <svg
//                     className="h-4 w-4 text-gray-500"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M14 2V8H20"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 ) : file.type === "image" ? (
//                   <svg
//                     className="h-4 w-4 text-gray-500"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M21 15L16 10L5 21"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="h-4 w-4 text-gray-500"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M23 7L16 12L23 17V7Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">{file.name}</p>
//                 <div className="flex items-center text-xs text-gray-500">
//                   <span>{file.size}</span>
//                   <span className="mx-1">•</span>
//                   <span>{file.date}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
