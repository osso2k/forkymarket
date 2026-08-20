import { useNavigate } from "react-router-dom"

const Homepage = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-6">
            <h1 className="font-minecraft text-6xl md:text-7xl mb-4 text-center">
                Forkymarket
            </h1>
            <p className="font-sans text-zinc-400 text-lg md:text-xl mb-12 text-center">
                Real-time crypto analysis powered by AI
            </p>
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={() => navigate("/markets")}
                    className="font-minecraft text-xl px-10 py-2 rounded-2xl border bg-purple-900/45 hover:bg-purple-900/70 transition-all cursor-pointer"
                >
                    Explore
                </button>
                <span
                    onClick={() => navigate("/login")}
                    className="font-sans text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                    Log in
                </span>
            </div>
        </div>
    )
}

export default Homepage
