import { usePricesStore } from "../stores/usePricesStore"


const Gainers = () => {
    const prices = usePricesStore()
    const top7 = Object.entries(prices).sort(([,a],[,b]) => Number(b.volume) - Number(a.volume)).slice(0,7)
    const gainers = [...top7].sort(([,a], [,b]) => Number(b.changePct) - Number(a.changePct)).slice(0,2)
    const losers = [...top7].sort(([,a], [,b]) => Number(a.changePct) - Number(b.changePct)).slice(0,2)
    const display = [...gainers, ...losers]
  return (
    <div className="h-full w-[80%] mx-auto">
        <h1 className="text-center font-minecraft border-b border-zinc-700 font-semibold text-lg md:text-2xl mt-4 mb-4 pb-4 pt-1">Todays Gainers and losers</h1>
        {display.length > 0 ? display.map(([symbol, price]) => (
            <div key={symbol} className="flex justify-center my-1">
                <p className="pr-4 font-sans text-xl flex my-auto">{symbol.replace("USDT", "")}</p>
                <p className="font-minecraft pr-2 flex my-auto">  {`-->`} </p>
                <p className={`font-sans text-md flex my-auto text-xl ${Number(price.changePct) >= 0 ? 'text-green-400' : 'text-red-400'}`}>%{price.changePct}</p>
            </div>
        ) ) : <><p className="mx-auto my-auto">Fetching...</p></>}
    </div>
  )
}

export default Gainers