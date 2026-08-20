import type { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"


export const Protected = ({children}:PropsWithChildren) => {
    const token = localStorage.getItem("token")
    if (!token){
        return <Navigate to={"/login"} replace/>
    }
    const decoded = jwtDecode(token)
    if (decoded && decoded.exp! * 1000 < Date.now()){
        localStorage.removeItem("token")
        return <Navigate to={"/login"} replace />
    }
    return children;
}
export const ProtectedAuth = ({children}:PropsWithChildren)=>{
    const token = localStorage.getItem("token")
    if(token){
        return <Navigate to={"/markets"} replace/>
    }
    return children;
}