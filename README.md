# Forkymarket

A full-stack real-time cryptocurrency market dashboard with AI-powered analysis. Stream live Binance prices, get AI predictions on whether a coin will go up or down, and chat with an AI analyst about any coin.

![Forkymarket Screenshot](frontend/src/assets/forkymarket.jpeg)

## Features

- **Live Prices** — streams all USDT trading pairs from Binance via WebSocket, updating every 2 seconds
- **AI Analysis** — search 484 coins and get COP (up) / DROP (down) predictions with confidence scores and reasoning, powered by GPT-4o-mini via OpenRouter
- **AI Chat** — ask follow-up questions about any coin after analysis, with conversation history saved in localStorage
- **News Feed** — rotating crypto headlines from Finnhub, updating every 7.5 seconds
- **Auth** — JWT-based signup/login with bcrypt password hashing and protected routes
- **Profile** — user info, logout, and favorites grid

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7 |
| Backend | Express 5, TypeScript, WebSocket (ws) |
| Database | PostgreSQL |
| AI | OpenRouter API (GPT-4o-mini) |
| Data | Binance WebSocket + REST API |
| News | Finnhub API |
| Auth | JWT + bcrypt |
| Visual | Ferrofluid WebGL shader, BorderGlow (OGL), Framer Motion |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Binance API key (for WebSocket streaming)
- OpenRouter API key (for AI predictions)
- Finnhub API key (for news)

### Installation

```bash
# Clone the repo
git clone https://github.com/osso2k/project5.git
cd project5

# Backend setup
cd backend
npm install
cp .env.example .env   # fill in your API keys
npm start              # runs on http://localhost:8080

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev            # runs on http://localhost:5173
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```
PORT=8080
DATABASE_URL=postgresql://user:password@localhost:5432/forkymarket
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_key
FINNHUB_API_KEY=your_finnhub_key
```

## Project Structure

```
forkymarket/
├── backend/
│   ├── config/          # Database setup
│   ├── controllers/     # Route handlers (auth, analysis, news, favs)
│   ├── middleware/       # JWT auth middleware
│   ├── routes/          # Express route definitions
│   ├── stores/          # In-memory price store
│   ├── types/           # TypeScript type extensions
│   ├── ws/              # WebSocket server + Binance streaming
│   └── index.ts         # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # UI components (AiAnalysis, Header, Layout, etc.)
│   │   ├── pages/       # Route pages (Homepage, Login, Signup, Profile)
│   │   ├── stores/      # React hooks for WebSocket data
│   │   ├── techs/       # Visual effects (Ferrofluid, BorderGlow)
│   │   ├── api.ts       # Axios client with JWT interceptor
│   │   └── main.tsx     # App entry + routing
│   └── package.json
└── README.md
```

## How It Works

1. **Binance WebSocket** connects to `wss://stream.binance.com:9443/ws/!miniTicker@arr`, filters USDT pairs, and broadcasts prices to connected clients every 2 seconds
2. **Frontend** receives prices via WebSocket and stores them in React state. The search dropdown fetches the full coin list from Binance's exchangeInfo API (one-time fetch, cached)
3. **AI Predict** sends the coin symbol to the backend, which fetches live price data (from the WS store or Binance REST fallback) + Finnhub news, then calls OpenRouter's GPT-4o-mini to generate a COP/DROP prediction
4. **AI Chat** sends the conversation history + coin context to OpenRouter, which responds with analysis
5. **Auth** uses JWT tokens stored in localStorage, with axios interceptors attaching the token to every request and redirecting to login on 401
