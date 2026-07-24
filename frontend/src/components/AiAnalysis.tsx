// import { useEffect, useState } from "react";
// import { usePricesStore } from "../stores/usePricesStore";

// interface Results {
//     prediction: string;
//     confidence: string;
//     reasoning: string;
// }
const AiAnalysis = () => {
  // const [results, setResults] = useState<Record<string, Results[]>>({})
  // const [loading, setLoading] = useState<boolean>(false)
  // const [activeChat, setActiveChat] = useState<string | null>()
  // const [chatHistory, setChatHistory] = useState<Record<string, Array<{role: string, content:string}>>>({})
  // const [chatInput, setChatInput] = useState<string>("")

  // useEffect(()=>{
  //   // const prices = usePricesStore()
  //   // const updatedPrices = Object.entries(prices).sort(([,a],[,b]) => Number(b.volume) - Number(a.volume)).slice(0,7).sort(([,a], [,b])=> Number(b.price) - Number(a.price))
    
  // },[])

  return (
    <div className="flex flex-col w-full h-full">
      <h1>Market Pulse </h1>
    </div>
  )
}

export default AiAnalysis