import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import { Toaster } from 'react-hot-toast'
import { Protected, ProtectedAuth } from './components/Protected.tsx'
import Homepage from './pages/Homepage.tsx'
import Favs from './pages/Favs.tsx'
import Profile from './pages/Profile.tsx'
import Header from './components/Header.tsx'

createRoot(document.getElementById('root')!).render(
  <div className='flex flex-col min-h-screen w-full bg-[hsl(280,26%,9%)] text-white font-minecraft'>
  <StrictMode>
    <BrowserRouter >
    <Toaster />
    <Header />
      <Routes>
        <Route path='/' element={<Protected><App /></Protected>} />
        <Route path='/markets' element={<Protected><Homepage /></Protected>} />
        <Route path='/favs' element={<Protected><Favs /></Protected>} />
        <Route path='/profile' element={<Protected><Profile /></Protected>} />
        <Route path='/signup' element={<ProtectedAuth><Signup /></ProtectedAuth>} />
        <Route path='/login' element={<ProtectedAuth><Login /></ProtectedAuth>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
  </div>
)
