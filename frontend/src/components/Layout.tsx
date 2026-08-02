import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col w-full min-h-screen'>
    <Header />
    <main className='flex-1 flex flex-col w-full'>
      <Outlet />

    </main>
    </div>
  )
}

export default Layout