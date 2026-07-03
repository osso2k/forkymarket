import { useNavigate } from 'react-router-dom'
import profile from '../assets/profile.png'

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className="flex justify-between sm:grid sm:grid-cols-2 md:grid-cols-3 w-full h-[12%] mt-2  px-6">
        <div className='mx-auto my-auto'>
            <h1 onClick={()=>{navigate("/")}} className="font-minecraft text-3xl sm:pl-14 md:pl-20 pt-6 cursor-pointer hover:text-zinc-500" >Forkymarket</h1>
        </div>
        <div className="hidden md:flex text-xl mx-auto my-auto">
            <ul className="flex border-b border-zinc-800 font-minecraft text-xl list-none gap-6 pt-8 pb-2">
                <li onClick={()=>{navigate("/martkets")}} className="cursor-pointer hover:text-zinc-700 transition-all ">markets</li>
                <li onClick={()=>{navigate("/favs")}} className="cursor-pointer hover:text-zinc-700 transition-all ">favs</li>
                <li onClick={()=>{navigate("/profile")}} className="cursor-pointer hover:text-zinc-700 transition-all ">Profile</li>
            </ul>
        </div>
        <div className='pt-4 mx-auto my-auto'>
            <img className='cursor-pointer h-12 w-12 hover:opacity-55 transition-all hover:scale-[99%]' src={profile} alt="pic" />
        </div>

    </div>
  )
}

export default Header