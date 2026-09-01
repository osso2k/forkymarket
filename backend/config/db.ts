import {Pool} from "pg"
import dotenv from 'dotenv'

dotenv.config()


export const pool = new Pool({
    database:process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: process.env.DB_SSL == "true" ? {rejectUnauthorized: false} : false
})
export const connectDB = async ()=>{
    try {
        await pool.query(`SELECT 1;`)
        console.log('\nDB Connected!');
    } catch (error) {
        console.log(`Error in connecting ro DB...`, (error as Error).message);
    }
}
export const uuidGen = async () => {
    try {
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`)
    } catch (error) {
        console.log((error as Error).message)
    }
}
export const createUserTable = async ()=>{
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            username TEXT NOT NULL UNIQUE,
            hashed_password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )`)
    console.log("User Table created...");
}

export const createFavouritesTable = async ()=>{
    await pool.query(`CREATE TABLE IF NOT EXISTS favs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            symbol TEXT NOT NULL,
            UNIQUE(user_id, symbol)
        )`)
    console.log("Favs Table created...");
}

export const messagesTable = async ()=>{
    await pool.query(`CREATE TABLE IF NOT EXISTS messages (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            message TEXT NOT NULL ,
            sent_at TIMESTAMP DEFAULT NOW()
        )`)
        console.log("Messages Table created...\n");
}