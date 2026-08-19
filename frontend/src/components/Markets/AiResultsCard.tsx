

interface Prediction {
    symbol: string;
    prediction: string;
    reasoning: string;
    confidence: number;
}
const AiResultsCard = (prediction: Prediction) => {
  return (
    <div>
        <p>{prediction.symbol}</p>
        <p>{prediction.prediction}</p>
        <p>{prediction.confidence}</p>
        <p>{prediction.reasoning}</p>
    </div>
  )
}

export default AiResultsCard