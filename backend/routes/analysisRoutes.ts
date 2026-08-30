import { Router } from "express";
import { analysisChat, predictSymbols } from "../controllers/analysisController";
import { aiLimiter } from "../middleware/rateLimiter";


const analysisRouter = Router()
analysisRouter.post("/predict", aiLimiter, predictSymbols)
analysisRouter.post("/chat", aiLimiter,analysisChat)

export default analysisRouter