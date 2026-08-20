import { useNavigate } from 'react-router-dom'
import profile from '../assets/profile.png'

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className="flex justify-between sm:grid sm:grid-cols-2 w-full h-[12%] mt-17 mb-10 px-6">
        <div className='mx-auto my-auto'>
            <h1 onClick={()=>{navigate("/markets")}} className="font-minecraft text-2xl md:text-2xl lg:text-3xl sm:pl-14 md:pl-6 lg:pl-18 pt-6 cursor-pointer hover:text-zinc-500 " >Forkymarket</h1>
        </div>
        {/* <div className="hidden md:flex text-xl mx-auto my-auto">
            <ul className="flex border-b border-zinc-800 font-minecraft text-xl list-none gap-6 pt-8 pb-2">
                <li onClick={()=>{navigate("/markets")}} className="cursor-pointer hover:text-zinc-700 transition-all text-[18px] lg:text-md ">markets</li>
            </ul>
        </div> */}
        <div className='pt-4 mx-auto my-auto'>
            <img onClick={()=>{ navigate("/profile")}} className='cursor-pointer h-12 w-12 hover:opacity-55 transition-all hover:scale-[99%]' src={profile} alt="pic" />
        </div>

    </div>
  )
}

export default Header