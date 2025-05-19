import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'

import NoChatSelected from '../Components/NoChatSelected'
import ChatContainer from '../Components/ChatContainer'
import Sidebar from '../Components/Sidebar'
import { useAuthStore } from '../store/useAuth'

const HomePage = () => {

  const { selectedUser } = useChatStore();
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])




  return (
    <div className='h-screen bg-base-200  ' >
      <div className='flex  items-center justify-center  pt-20 px-4 ' >
        <div className="bg-base-100 rounded-lg shadow-cl w-full  max-w-6xl   h-[calc(100vh-8rem)] ">
          <div className="flex h-full rounded-lg o">


            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
