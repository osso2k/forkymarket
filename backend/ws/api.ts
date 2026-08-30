import { WebSocket, WebSocketServer } from "ws";
import { setPrices } from "../stores/pricesStore";

export const apiServer = async (wss:WebSocketServer) =>{
    // const COINS = ["btcusdt","ethusdt","bnbusdt","solusdt","xrpusdt","dogeusdt","adausdt"]
    let prices: Record<string , {price:string; changePct: string; volume: string}> = {}

    // const streams = COINS.map(c => `${c}@trade`).join("/")
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/!miniTicker@arr`)
    ws.on("open", ()=>{
        console.log("binance is connected!")
    })

    ws.on("message",(msg:Buffer | string)=>{
        const tickers = JSON.parse(msg.toString())
        const full: Record<string, any> = {} 
        tickers.forEach((t: any)=>{
            if (!t.s.endsWith("USDT")) return;
            const changePct = ((Number(t.c) - Number(t.o)) / Number(t.o) * 100).toFixed(2)
            full[t.s] = {price: t.c, changePct: changePct, volume: t.q}
        })
        prices = Object.fromEntries(
            Object.entries(full).sort(([,a ], [, b]) => Number(b.volume) - Number(a.volume))
        )
        setPrices(prices)
    })
    setInterval(()=>{
        if (Object.keys(prices).length === 0) return
        wss.clients.forEach((client)=>{
            if (client.readyState === WebSocket.OPEN && client.isAuthenticated){
                client.send(JSON.stringify({ type :"prices", data:prices}))
            }
        })
    },2000)
    ws.on("error", (err:Error)=>{
        console.log("Sorry something went wrong...",err);
    })
    ws.on("close",()=>{
        console.log("Connection lost...");
    })
    
}