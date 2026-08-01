import { Request , Response } from "express"
import { pool } from "../config/db"
import bcrypt from "bcrypt"
import { generateToken } from "../middleware/authMiddleware"

interface User {
    username: string,
    password: string 
}
export const getuser = async (req:Request,res:Response)=>{
    try {
        const {username} = req.body
        if (!username){
            return res.json({message:"Plwase enter valid credentials"})
        }
        const user = await pool.query(`SELECT id , username , created_at FROM users WHERE username=$1`,[username])
        if (user.rows.length ===0){
            return res.status(404).json({message:"User not Found"})
        }
        return res.json(user.rows[0])
    } catch (error) {
        res.status(500).json({message:"Something went wrong in getting user...",err:(error as Error).message })
    }
}


export const signup = async (req: Request<{},{},User> ,res:Response) =>{
    const {username, password} = req.body
    try {
        if (!username || !password){
            return res.status(400).json({message:"Please enter valid credentials"})
        }
        const exists = await pool.query(`SELECT * FROM users WHERE (username=$1)`,[username])
        if (exists.rows.length !== 0){
            return res.status(400).json({message:"username taken"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await pool.query("INSERT INTO users (username , hashed_password) VALUES ($1,$2) RETURNING id",[username, hashedPassword])
        //const token = //gen token wioth id
        const token = generateToken(user.rows[0].id)
        res.status(201).json({message:"User Created Successfully!", user:{userID: user.rows[0].id, username: user.rows[0].username, createdAt: user.rows[0].created_at  }  ,token})
    } catch (error) {
        res.status(500).json({message:"Something went wrong in signing up...",err:(error as Error).message})
    }
}

export const login = async (req:Request<{},{},User>,res:Response)=>{
    try {
        const {username , password} = req.body
        if (!username || !password){
            return res.status(400).json({message:"Please enter valid credentials"})
        }
        const user = await pool.query(`SELECT * FROM users WHERE (username=$1)`,[username])
        if (user.rows.length === 0){
            return res.status(404).json({message:"User not found"})
        }
        const isValid = await bcrypt.compare(password, user.rows[0].hashed_password)

        if (!isValid){
            return res.status(401).json({message:"Invalid credentials"})
        }
        //gen token
        const token= generateToken(user.rows[0].id)
        res.json({message:"Successfully logged in!", user:{userID: user.rows[0].id, username: user.rows[0].username, createdAt: user.rows[0].created_at  } , token })
    } catch (error) {
        res.status(500).json({message:"Something went wrong in logging in...", err: (error as Error).message})
    }
}