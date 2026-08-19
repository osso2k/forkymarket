interface Prediction {
    symbol: string;
    prediction: string;
    reasoning: string;
    confidence: number;
}

const AiResultsCard = ({ symbol, prediction, reasoning, confidence }: Prediction) => {
    const isCOP = prediction.toUpperCase() === "COP";

    return (
        <div className="w-[55%] mx-auto mt-8 mb-6 font-sans">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-minecraft text-2xl">
                    {symbol.replace("USDT", "")}
                </h2>
                <span
                    className={`font-minecraft text-lg px-4 py-1 rounded font-semibold ${
                        isCOP
                            ? "text-blue-200 shadow-sm shadow-blue-300/20"
                            : "text-pink-200 shadow-sm shadow-pink-300/20"
                    }`}
                >
                    {prediction.toUpperCase()}
                </span>
            </div>

            <div className="mb-4">
                <div className="flex justify-between text-md text-zinc-300 mb-1">
                    <span>Confidence</span>
                    <span className="font-bold">{confidence}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${
                            isCOP ? "bg-pink-800" : "bg-zinc-800"
                        }`}
                        style={{ width: `${confidence}%` }}
                    />
                </div>
            </div>

            <div className="border-t border-zinc-700 pt-4">
                <p className="text-zinc-400 text-md leading-relaxed">
                    {reasoning}
                </p>
            </div>
        </div>
    );
};

export default AiResultsCard;
