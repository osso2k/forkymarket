import "ws"

declare module "ws" {
    interface WebSocket {
        isAuthenticated?: boolean
    }
}