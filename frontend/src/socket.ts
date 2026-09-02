
export const socket = new WebSocket(import.meta.env.VITE_BACKEND_WSS || 'ws://localhost:8080')

socket.onopen = () => {
    const token = localStorage.getItem("token") || ""
    socket.send(JSON.stringify({ type: "auth", token }))
}