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
    <div className="flex flex-col w-full h-full mt-12 mb-3">
      <h1 className="text-2xl mx-auto">Market Pulse </h1>
      <div className="shadow-md shadow-mauve-800 w-[60%] h-[90%] mx-auto">
        <div className="flex gap-1 mx-auto w-full justify-center mt-4">
          <input className="bg-zinc-700 w-[50%] h-9 rounded pl-3 " type="text" placeholder="🔍Search for a coin..." />
          <button className="px-4 py-1 bg-mauve-700 border">Analyze</button>
        </div>
      </div>

    </div>
  )
}

export default AiAnalysis