import { useNavigate } from "react-router-dom"


const Homepage = () => {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={()=> {navigate("/markets")}}>-- main --</button>
    </div>
  )
}

export default Homepage