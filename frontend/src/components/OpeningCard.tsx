import BorderGlow from "../techs/BorderGlow"
import CryptoNews from "./CryptoNews"
import DisplayTop7 from "./DisplayTop7"
import Gainers from "./Gainers"


const OpeningCard = () => {
  return (
    <BorderGlow edgeSensitivity={30}
    glowColor="40 80 80"
    backgroundColor="#19111d"
    borderRadius={1}
    glowRadius={1}
    glowIntensity={1}
    coneSpread={1}
    animated={true}
    colors={['#c084fc', '#f472b6', '#38bdf8']}
     className="flex bg-transparent flex-wrap w-[97%] md:w-[65%] max-h-full shadow-sm shadow-mauve-700  rounded-2xl mt-10 mx-auto pb-12">
      <div className=" grid grid-cols-1 md:grid-cols-2  min-h-full w-full gap-2 px-2 py-4">
        <div className="h-full w-full order-1 flex justify-center my-1">{<DisplayTop7 />}</div>
        <div className="order-2 flex justify-center h-full ">
          <div className="grid grid-rows-2 max-h-full w-full justify-center gap-4">
            <div className="order-1 max-h-full w-full ">{<Gainers />}</div>
            <div className="order-2 h-56 overflow-hidden mt-3 w-full">{<CryptoNews />}</div>
          </div>
        </div>
      </div>
    </BorderGlow>
  )
}

export default OpeningCard