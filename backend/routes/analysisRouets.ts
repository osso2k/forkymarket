import { Router } from "express";
import { analysisChat, predictSymbols } from "../controllers/analysisController";


const analysisRouter = Router()
analysisRouter.post("predict", predictSymbols)
analysisRouter.post("chat", analysisChat)

export default analysisRouter