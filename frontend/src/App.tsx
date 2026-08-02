import AiAnalysis from "./components/AiAnalysis"
import OpeningCard from "./components/Markets/OpeningCard"


const App = () => {
  return(
    <div className="flex flex-col shrink flex-1 w-full">
      <OpeningCard />
      <AiAnalysis />
    </div>
  )
}

export default App