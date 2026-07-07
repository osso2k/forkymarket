import { Request, Response } from "express"
import finnhub from "finnhub"
import OpenAI from "openai"
import { getPrices } from "../stores/pricesStore"

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
})

const {DefaultApi} = finnhub
const finnhubClient = new DefaultApi(process.env.FINNHUB_API_KEY!)

export const predictSymbols = async (req: Request, res:Response)=>{
    const { symbol } = req.body

    if (!symbol) res.status(400).json({message: "Symbol is required"})

    // let finalThoughts : Record<string, string[]> = ({})

    try {
        const newsSentiment = await fetch(`https://finnhub.io/api/v1/news-sentiment?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`)
        const newsData = newsSentiment.json()
        const socialSentiment = await fetch(`https://finnhub.io/api/v1/social-sentiment?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`)
        const socialData = socialSentiment.json()


        const coinData = getPrices()[symbol]
        if (!coinData) res.status(404).json({meesage: `No data for symbol, ${symbol}`})

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                role: "system",
                content: "You are a crypto market analyst. Given news sentiment, social sentiment, and price data for a cryptocurrency, predict whether the price will go UP (COP) or DOWN (DROP) in the short term. Return ONLY valid JSON. No markdown, no explanation outside the JSON."
            },
            {
                role: "user",
                content: `Analyze this data and return a prediction:\n\nSymbol: ${symbol}\nCurrent Price: $${symbolData.price}\n24h Change: ${symbolData.changePct}%\nNews Score (0-1): ${newsSentiment.newsScore}\nBullish Articles: ${bullishPercent}%\nBearish Articles: ${bearishPercent}%\nBuzz Level (0-1): ${buzz}\n\nRespond with this exact format:\n{\n  "symbol": "${symb}",\n  "prediction": "COP or DROP",\n  "confidence": (0-100),\n  "reasoning": "One sentence explaining the key driver"\n}`
            }
        ]
            
        })
        // res.json({newsSentiment, socialSentiment})
    } catch (error) {
        res.status(501).json({message: "Analysis failed", error: (error as Error).message})
    }
}
export const analysisChat = async ()=>{

}