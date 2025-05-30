import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './Skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuth';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser, getMessages, subscribeTomessages, unsubscribeTomessages } = useChatStore();
  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeTomessages()

    return () => unsubscribeTomessages()
  }, [getMessages, selectedUser?._id, subscribeTomessages, unsubscribeTomessages]);


  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);



  useEffect(() => {
    console.log("messages", messages);

  }, [messages])
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }


  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || '/avatar.png'
                      : selectedUser.profilePic || '/avatar.png'
                  }
                  alt="Profile Pic"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;





// -- Previous Code --


// import React, { useEffect } from 'react'
// import { useChatStore } from '../store/useChatStore'
// import ChatHeader from './ChatHeader'
// import MessageInput from './MessageInput'
// import MessageSkeleton from './Skeletons/MessageSkeleton'
// import { useAuthStore } from '../store/useAuth'
// import { formatMessageTime } from '../lib/utils'

// const ChatContainer = () => {

//     const { messages, isMessagesLoading, selectedUser, getMessages } = useChatStore()

//     const { authUser } = useAuthStore()

//     useEffect(() => {
//         getMessages(selectedUser?._id)
//     }, [getMessages, selectedUser?._id])

//     if (isMessagesLoading) return (
//         <div className='flex-1 flex flex-col overflow-auto' >
//             <ChatHeader />
//             <MessageSkeleton />
//             <MessageInput />
//         </div>
//     )


//     return (
//         <div className='w-full    ' >
//             <ChatHeader />
//             <div className='flex-1 overflow-y-auto    p-4 space-y-4 ' >
//                 {
//                     messages.map((message) => (
//                         <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} >
//                             <div className='chat-image avatar' >
//                                 <div className='size-10 rounded-full border' >
//                                     <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="Profile Pic" />
//                                 </div>

//                             </div>

//                             <div className='chat-header mb-1' >
//                                 <time className='text-xs opacity-50 ml-1' >
//                                     {formatMessageTime(message.createdAt)}
//                                 </time>
//                             </div>
//                             <div className='chat-bubble flex ' >
//                                 {message.image && (
//                                     <img src={message.image} alt='Attachement' className='sm:max-w-[200px] rounded-md mb-2' />
//                                 )}
//                                 {message.text && <p>{message.text}</p>}
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//             <MessageInput />
//         </div>
//     )
// }