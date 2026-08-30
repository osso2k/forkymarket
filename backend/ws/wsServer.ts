import type { Server } from "node:http";
import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const AUTH_TIMEOUT = 5000
const ALLOWED_ORIGINS = (process.env.FRONTEND_ORIGIN || "http://localhost:5173").split(",")

const wsServer = (server: Server) => {
    const wss = new WebSocketServer({server, maxPayload: 1024 * 1024})

    wss.on("connection", (socket, request) => {
        socket.isAuthenticated = false

        const origin = request.headers.origin
        if (origin && !ALLOWED_ORIGINS.includes(origin)) {
            socket.close(1008, "Origin not allowed")
            return
        }

        const authTimer = setTimeout(() => {
            if (!socket.isAuthenticated) {
                socket.close(1008, "Authentication timeout")
            }
        }, AUTH_TIMEOUT)

        socket.on("message", (data) => {
            try {
                const msg = JSON.parse(data.toString())
                if (msg.type === "auth") {
                    const decoded = jwt.verify(msg.token, process.env.JWT_SECRET!) as jwt.JwtPayload
                    socket.isAuthenticated = true
                    console.log(`WS authenticated: ${decoded.id}`)
                    clearTimeout(authTimer)
                }
            } catch {
                socket.close(1008, "Invalid authentication")
            }
        })

        socket.on("error", (err) => {
            console.log(`Err: `, err.message)
        })
        socket.on("close", () => {
            clearTimeout(authTimer)
            console.log(`Server Disconnected...`)
        })
    })

    return wss
}

export default wsServer