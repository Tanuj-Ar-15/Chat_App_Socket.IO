import React from 'react'
import { useAuthStore } from '../store/useAuth'
import { Home, LogOut, MessageSquare, Settings, User, User2 } from 'lucide-react'
import { Link, useLocation, useSearchParams } from "react-router-dom"

const Navbar = () => {
  const { authUser, logout } = useAuthStore()
  const location = useLocation()



  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Left side - Logo */}
        <Link to={"/"} className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
          <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center'>
            <MessageSquare className='w-5 h-5 text-primary' />
          </div>
          <h1 className='text-lg font-bold'>Chatty</h1>
        </Link>

        {/* Right side - Settings */}
        <div className="flex items-center gap-2">
          <Link to={"/settings"} className='btn btn-sm gap-2 transition-colors'>
            <Settings className='w-4 h-4 zindex-4' />
            <span className='hidden sm:inline'>Settings</span>
          </Link>
          {
            authUser && location.pathname !== "/" && (
              <Link to={"/"} className={`btn btn-sm gap-2`} >
                <Home className={"size-5"} />
                <span className="hidden sm:inline" >Home</span>
              </Link>
            )
          }
            {
            authUser && location.pathname !== "/profile" && (
              <Link to={"/profile"} className={`btn btn-sm gap-2`} >
                <User className={"size-5"} />
                <span className="hidden sm:inline" >Profile</span>
              </Link>
            )
          }
          {
            authUser && (
              <>

                <button className="flex gap-2 items-center cursor-pointer" onClick={logout} >
                  <LogOut className="size-5" />
                  <span className='hidden sm:inline' >Logout</span>
                </button>

              </>
            )
          }




        </div>

      </div>
    </header>
  )
}

export default Navbar;
