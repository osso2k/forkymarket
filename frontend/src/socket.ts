const token = localStorage.getItem("token") || ""

export const socket = new WebSocket(import.meta.env.VITE_BACKEND_WSS)

socket.onopen = () => {
    socket.send(JSON.stringify({ type: "auth", token }))
}