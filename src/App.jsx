import { useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './Page/HomePage'
import SignUp from './Page/SignUp'
import Login from './Page/Login'
import ProfilePage from './Page/ProfilePage'
import SettingsPage from './Page/SettingsPage'

import { BrowserRouter as Router } from 'react-router-dom'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuth'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const location = useLocation();
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  const hideNavbarPaths = ['/login', '/signup'];

  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    )
  }

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </Router>
  );
}

export default App;
