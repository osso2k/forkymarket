import { usePricesStore } from "../../stores/usePricesStore"


const DisplayTop7 = () => {
  const prices = usePricesStore()
  const sortedPrices = Object.entries(prices).sort(([,a],[,b]) => Number(b.volume) - Number(a.volume)).slice(0,7).sort(([,a], [,b])=> Number(b.price) - Number(a.price))
  return (
    <div className="flex flex-wrap shrink min-w-0 w-[70%] flex-col font-serif mt-7">
      <h1 className="text-center text-2xl mb-9 border-b border-zinc-600 pb-3 font-minecraft">Ones to Look out for</h1>
      {sortedPrices.length > 0 ? sortedPrices.map(([symbol , price ]) =>(
        <div className="flex w-full justify-between my-1 mx-auto" key={symbol}>
          <span className="text-xl">{symbol.replace("USDT",'')}</span>
          <span className="flex min-w-[50%] font-sans text-xl">${Number(price.price)}</span>
        </div>
      )) : <><div>Hey</div></>}
    </div>
    
  )
}

export default DisplayTop7