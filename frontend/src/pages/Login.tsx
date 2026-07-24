import { useState } from "react";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import api from "../api";
interface Form {
    username:string;
    password:string;
}
const Login = () => {
    const [form,setForm] = useState<Form>({username:"", password: ""})
    const navigate = useNavigate()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm(prev =>({...prev,[e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            if(form.username == "" || form.username.length < 4){
                toast.error("username too short")
                return 
            }else if (form.password == "" || form.password.length < 6){
                toast.error("password too short")
                return
            }
            const response = await api.post("/api/auth/login", form)
            if(response){
                toast.success("Logged in!")
                localStorage.setItem("userId", response.data.user)
                localStorage.setItem("token", response.data.token)
                navigate("/")
                return
            }else{
                toast.error("Invalid Credentials..")
                console.error("User not found");
                return
            }            

        } catch (error) {
            console.log("Error in sending user data to server... (login)", (error as Error).message);
            toast.error("Error in Logging in...")
        }
    }
    return (
        <div className="flex w-full h-screen">
          <div className="flex flex-col flex-wrap mx-auto my-auto h-125 w-[40%] shadow shadow-zinc-800 rounded-lg ">
          <div className="flex justify-between">
                <h1 className="font-minecraft text-2xl pt-12 pl-10">Forkymarket</h1>
                <p className="font-mono text-lg my-auto pt-7 pr-10  text-zinc-600">Log In</p>
            </div>
          <div className="pt-24 flex flex-col flex-wrap">
              <form onSubmit={handleSubmit} action="">
                  <div className="flex pl-[20%] p-1">  
                      <label className="font-minecraft my-auto pr-3" >username: </label>
                      <input  onChange={handleChange} name="username" autoComplete="off" value={form.username} className=" text-md focus:border-violet-500 focus:ring-2 transition-all duration-200 text-white placeholder:text-zinc-500 pl-2 h-10 border-2  border-black w-[50%] bg-zinc-800 rounded-lg" type="text" />
                  </div>
                  <div className="flex pl-[20%] p-1">  
                      <label className="font-minecraft my-auto pr-3" >password: </label>
                      <input onChange={handleChange} name="password" autoComplete="off" value={form.password} className=" text-md focus:border-violet-500 focus:ring-2 transition-all duration-200 text-white placeholder:text-zinc-500 pl-2 h-10 border-2  border-black w-[50%] bg-zinc-800 rounded-lg" type="password" />
                  </div>
                  <button className="flex mx-auto mt-2  pt-2 text-xl rounded-2xl px-6 cursor-pointer my-auto py-1 text-center font-minecraft border bg-purple-900/45" type="submit">Login</button>
              </form>
              <div className="text-white text-lg text-center">
              <p className=" pt-10 ">Dont have an account?</p>
              <span onClick={()=>{navigate("/signup")}} className="font-minecraft font-semibold cursor-pointer"> Sign up.</span>
              </div>
          </div>
          </div>
      </div>
    )
  }
  
  export default Login