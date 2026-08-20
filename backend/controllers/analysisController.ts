import { Request, Response } from "express"
// import finnhub from "finnhub"
import OpenAI from "openai"
import { getPrices } from "../stores/pricesStore"

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
})

// const {DefaultApi} = finnhub
// const finnhubClient = new DefaultApi(process.env.FINNHUB_API_KEY!)

export const predictSymbols = async (req: Request, res:Response)=>{
    const { symbol } = req.body ?? {}

    if (!symbol) return res.status(400).json({message: "Symbol is required"})

    try {
        // const newsSentiment = await fetch(`https://finnhub.io/api/v1/news-sentiment?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`)
        // const socialSentiment = await fetch(`https://finnhub.io/api/v1/social-sentiment?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`)

        // const newsData = await newsSentiment.json()
        // const socialData = await socialSentiment.json()


        let coinData = getPrices()[symbol]
        if (!coinData) {
            try {
                const tickerRes = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
                const ticker = await tickerRes.json()
                coinData = {
                    price: ticker.lastPrice,
                    changePct: ticker.priceChangePercent,
                    volume: ticker.quoteVolume
                }
            } catch {
                return res.status(404).json({message: `No data for symbol, ${symbol}`})
            }
        }
        
        try {
            let headlines = "No recent news..."
            try {
                const newsRes = await fetch( `https://finnhub.io/api/v1/news?category=crypto&apikey=${process.env.FINNHUB_API_KEY}`)
                if (newsRes.ok){
                    const news = await newsRes.json()
                    headlines = news.slice(0,5).map((n: any) => n.headline).join("\n")
                }
            } catch (error) {
                console.error("News fetch failed:", (error as Error).message)
            }
            const response = await openai.chat.completions.create({
                model: "openai/gpt-4o-mini",
                messages: [
                  {
                    role: "system",
                    content: "You are a crypto analyst. Given price data and news, predict COP (up) or DROP (down). Return only valid JSON.",
                  },
                  {
                    role: "user",
                    content: `Symbol: ${symbol}\nPrice: $${coinData.price}\n24h Change: ${coinData.changePct}%\nVolume: ${coinData.volume} USDT\n\nNews:\n${headlines}\n\nReturn JSON: { "prediction": "COP or DROP", "confidence": 0-100, "reasoning": "2 lines of reason" }`,
                  },
                ],
                response_format: { type: "json_object" },
              })
              const result = await JSON.parse(response.choices[0].message.content!)
              res.json({symbol, ...result})
        } catch (error) {
            res.status(500).json({message: "Analysis Failed", err:(error as Error).message})
        }
    } catch (error) {
        res.status(501).json({message: "Analysis failed", error: (error as Error).message})
    }
}
export const analysisChat = async (req: Request, res: Response)=>{
    try {
        const {symbol , messages } = req.body
        if(!symbol || !messages) return res.status(400).json({message: "Invalid Information"})

        const coinData = getPrices()[symbol]
        if (!coinData) return res.status(400).json({message: "Data not Found"})
        
        const contextMsg = {
            role: "system",
            content: `Current data for ${symbol}: Price ${coinData.price}, 24h Change ${coinData.changePct}. Be concise, and very thoughtdful for the user.`
        }
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [contextMsg, ...messages]
        })
        res.json({reply: response.choices[0].message.content})
    } catch (error) {
        res.status(500).json({message: "Chat failed", err: (error as Error).message})
    }
}