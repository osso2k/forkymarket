import rateLimit from "express-rate-limit";

// Broad limit for all /api routes — anti-abuse baseline
export const apiLimiter = rateLimit({
    windowMs: 60 * 1000,        // 1 minute
    limit: 100,                 // 100 requests/min per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." }
});

// Strict limit for AI routes — each call hits OpenRouter (costs money + latency)
export const aiLimiter = rateLimit({
    windowMs: 60 * 1000,        // 1 minute
    limit: 10,                  // 10 AI requests/min per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many AI requests, please slow down." }
});

// Auth brute-force protection
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    limit: 20,                  // 20 login/signup attempts per IP per 15 min
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many auth attempts, try again later." }
});