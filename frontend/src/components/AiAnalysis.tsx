import { useState, useRef, useEffect } from "react";
import { usePricesStore } from "../stores/usePricesStore";
import toast from "react-hot-toast";
import api from "../api";
import AiResultsCard from "./Markets/AiResultsCard";

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
  const prices = usePricesStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const matches = search.trim()
    ? Object.keys(prices)
        .filter((s) => s.includes(search.trim().toUpperCase()))
        .slice(0, 5)
    : [];

  // const [results, setResults] = useState<Record<string, Results[]>>({})
  // const [loading, setLoading] = useState<boolean>(false)
  // const [activeChat, setActiveChat] = useState<string | null>()
  // const [chatHistory, setChatHistory] = useState<Record<string, Array<{role: string, content:string}>>>({})
  // const [chatInput, setChatInput] = useState<string>("")

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
  };


  const handleAnalyze = async () => {
    try {
      const response = await api.post("/api/analysis/predict", {symbol:selected})
      const predic = await response.data
      setData(predic)
      console.log(response);
    } catch (error) {
      toast.error("OOPS!! Something went wrong.")
      console.log((error as Error).message);
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
                      key={symbol}
                      role="option"
                      aria-selected={highlighted === i}
                      onMouseEnter={() => setHighlighted(i)}
                      onClick={() => selectSymbol(symbol)}
                      className={`cursor-pointer px-3 py-2 text-sm transition-colors ${
                        highlighted === i ? "bg-zinc-600" : ""
                      }`}
                    >
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
        {data && <AiResultsCard {...data} />}
      </div>
    </div>
  );
};

export default AiAnalysis;