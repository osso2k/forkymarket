const token = localStorage.getItem("token") || ""

export const socket = new WebSocket('ws://localhost:8080')

socket.onopen = () => {
    socket.send(JSON.stringify({ type: "auth", token }))
}