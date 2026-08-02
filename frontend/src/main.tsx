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
// import Header from './components/Header.tsx'
import Layout from './components/Layout.tsx'
import Ferrofluid from './techs/FerroFluids.tsx'
// import Ribbons from './techs/Ribbons.tsx'

createRoot(document.getElementById('root')!).render(
  <div className='relative min-h-screen w-full bg-[hsl(280,26%,9%)] text-white font-minecraft'>
<div className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
      <Ferrofluid
        colors={["#9c38eb","#5b4768","#b7b2bb"]}
        speed={0.3}
        scale={1.5}
        turbulence={1}
        fluidity={0.18}
        rimWidth={0.23}
        sharpness={2.5}
        shimmer={1.15}
        glow={2.6}
        flowDirection="left"
        opacity={0.4}
        mouseInteraction
        mouseStrength={1}
        mouseRadius={0.35}
      />
    </div>
  <div className='relative z-4'>

  <StrictMode>
    <BrowserRouter >
    <Toaster />
    {/* <Header /> */}
    {/* <Ribbons
    baseThickness={10}
    colors={["#5227FF"]}
    speedMultiplier={0.5}
    maxAge={500}
    enableFade={false}
    enableShaderEffect={false}
    /> */}
      <Routes >
        <Route element={<Layout />}>
        <Route path='/' element={<Protected><App /></Protected>} />
        <Route path='/markets' element={<Protected><Homepage /></Protected>} />
        <Route path='/favs' element={<Protected><Favs /></Protected>} />
        <Route path='/profile' element={<Protected><Profile /></Protected>} />
        </Route>
        <Route path='/signup' element={<ProtectedAuth><Signup /></ProtectedAuth>} />
        <Route path='/login' element={<ProtectedAuth><Login /></ProtectedAuth>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
    </div>
  </div>
)
