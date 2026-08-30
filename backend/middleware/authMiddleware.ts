import jwt, { JwtPayload } from "jsonwebtoken";
import {Request , Response , NextFunction } from "express"
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = (id:string)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET!,{expiresIn:"12h"})
    return token
}
export const protectedRoute = (req:Request,res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Not Authorized"})
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload & {id:string}
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({message: "Invaliod token"})
    }

}
