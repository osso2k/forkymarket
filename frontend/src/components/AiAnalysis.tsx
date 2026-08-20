import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../api";
import AiResultsCard from "./Markets/AiResultsCard";
import Loading from "./Loading";

interface Prediction {
  symbol: string;
  prediction: string;
  reasoning: string;
  confidence: number;
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const idx = text.toUpperCase().indexOf(query.toUpperCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-mauve-400 font-semibold">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  );
}

const AiAnalysis = () => {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState(0);
  const [open, setOpen] = useState(false);
  const [data,setData] = useState<Prediction | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [allSymbols, setAllSymbols] = useState<string[]>([])

  useEffect(() => {
    fetch("https://api.binance.com/api/v3/exchangeInfo")
      .then(res => res.json())
      .then(data => {
        const symbols = data.symbols
          .filter((s: any) => s.status === "TRADING" && s.quoteAsset === "USDT")
          .map((s: any) => s.symbol)
        setAllSymbols(symbols)
      })
  }, [])

  const containerRef = useRef<HTMLDivElement>(null);

  const matches = search.trim() ? allSymbols.filter((s) => s.includes(search.trim().toUpperCase())).slice(0, 5) : [];

  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])
  const [chatInput, setChatInput] = useState("")

  useEffect(() => {
    setHighlighted(0);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selected) {
      const saved = localStorage.getItem(`chat_${selected}`)
      setMessages(saved ? JSON.parse(saved) : [])
    } else {
      setMessages([])
    }
  }, [selected]);

  useEffect(() => {
    if (selected && messages.length > 0) {
      localStorage.setItem(`chat_${selected}`, JSON.stringify(messages))
    }
  }, [messages, selected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSelected(null);
    setOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || matches.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectSymbol(matches[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const selectSymbol = (symbol: string) => {
    setSearch(symbol.replace("USDT", ""));
    setSelected(symbol);
    setOpen(false);
    setData(null);
    setMessages([]);
  };


  const handleAnalyze = async () => {
    try {
      setLoading(true)
      const response = await api.post("/api/analysis/predict", {symbol:selected})
      setLoading(false)
      const predic = await response.data
      setData(predic)
      console.log(response);
    } catch (error) {
      const msg = (error as any).response?.data?.message || (error as Error).message
      toast.error(`Analysis failed: ${msg}`)
      console.error(msg)
    }
  }

  const handleSend = async () => {
    if (!chatInput.trim() || !selected) return
    const userMsg = { role: "user", content: chatInput.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setChatInput("")
    try {
      const { data } = await api.post("/api/analysis/chat", { symbol: selected, messages: updated })
      setMessages([...updated, { role: "assistant", content: data.reply }])
    } catch (error) {
      toast.error("Failed to get AI response")
    }
  }

  return (
    <div className="flex flex-col w-full h-full mt-12 mb-3">
      <h1 className="text-2xl mx-auto">Market Pulse </h1>
      <div className=" w-[60%] h-[90%] mx-auto">
        <div ref={containerRef} className="relative flex gap-1 mx-auto w-full justify-center mt-4">
          <div className="relative w-[50%]">
            <input
              onChange={handleChange}
              onFocus={() => search && setOpen(true)}
              onKeyDown={handleKeyDown}
              value={search}
              role="combobox"
              aria-expanded={open}
              className="bg-zinc-700 w-full h-9 rounded pl-3"
              type="text"
              placeholder="🔍Search for a coin..."
            />

            {open && search.trim() && (
              <div
                role="listbox"
                className="absolute z-10 mt-1 w-full overflow-hidden rounded bg-zinc-700 shadow-md shadow-mauve-600"
              >
                {matches.length > 0 ? (
                  matches.map((symbol, i) => (
                    <div
                      key={symbol} role="option" aria-selected={highlighted === i} onMouseEnter={() => setHighlighted(i)} onClick={() => selectSymbol(symbol)} className={`cursor-pointer px-3 py-2 text-sm transition-colors ${highlighted === i ? "bg-zinc-600" : ""}`}>
                      {highlightMatch(symbol.replace("USDT", ""), search.trim())}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-zinc-400">
                    No matches for "{search}"
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            disabled={!selected}
            onClick={handleAnalyze}
            className="px-4 py-1 bg-mauve-700 border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Analyze
          </button>
        </div>
      </div>
      <div>
        {loading ? <Loading /> : data ? <AiResultsCard {...data} /> : null}
      </div>
      {data && selected && (
        <div className="w-[60%] mx-auto mt-6 mb-8">
          <h3 className="font-minecraft text-lg mb-3 border-b border-zinc-700 pb-2">
            Ask about {selected.replace("USDT", "")}
          </h3>
          <div className="max-h-80 overflow-y-auto mb-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-zinc-500 text-sm font-sans text-center py-4">
                Ask anything about {selected.replace("USDT", "")}...
              </p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-lg text-sm font-sans ${
                  msg.role === "user"
                    ? "bg-mauve-700 text-white"
                    : "bg-zinc-700 text-zinc-200"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-zinc-700 rounded px-3 py-2 text-sm font-sans"
              placeholder="Ask about this coin..."
            />
            <button
              onClick={handleSend}
              disabled={!chatInput.trim()}
              className="px-4 py-2 bg-mauve-700 border rounded text-sm font-sans disabled:opacity-40 cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default AiAnalysis;