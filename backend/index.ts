import express from 'express';
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv';
import authRouter from "./routes/authRoutes";
import wsServer from "./ws/wsServer";
import { connectDB, createFavouritesTable, createUserTable, messagesTable, uuidGen } from './config/db';
import { apiServer } from './ws/api';
import { protectedRoute } from './middleware/authMiddleware';
import favsRouter from './routes/favsRoutes';
import newsRouter from './routes/newsRoutes';
import analysisRouter from './routes/analysisRoutes';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3030;

app.use(express.json())
app.use(cors())

await connectDB()
await uuidGen()
await createUserTable()
await createFavouritesTable()
await messagesTable()


const server = http.createServer(app)
const wss = wsServer(server)
apiServer(wss)
app.use('/api/auth',authRouter)
app.use('/api/app',protectedRoute,favsRouter)
app.use('/api/news', protectedRoute, newsRouter)
app.use('/api/analysis', protectedRoute, analysisRouter)
server.listen(PORT, ()=>{
    console.log(`Server is Live on port: ${PORT}`);
})