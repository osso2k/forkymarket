import CryptoNews from "./CryptoNews"
import DisplayTop7 from "./DisplayTop7"
import Gainers from "./Gainers"


const OpeningCard = () => {
  return (
    <div className="flex flex-wrap w-[97%] md:w-[65%] h-fit shadow-sm shadow-mauve-700  rounded-2xl mt-10 mx-auto pb-15">
      <div className=" grid grid-cols-1 md:grid-cols-2  min-h-full w-full gap-2 px-2 py-4">
        <div className="h-full w-full order-1 flex justify-center my-1">{<DisplayTop7 />}</div>
        <div className="order-2 flex justify-center h-full ">
          <div className="grid grid-rows-2 max-h-96 w-full justify-center gap-4">
            <div className="order-1 max-h-full w-full ">{<Gainers />}</div>
            <div className="order-2 max-h-full mt-3">{<CryptoNews />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpeningCard