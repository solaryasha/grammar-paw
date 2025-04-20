"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_1 = require("openai");
// Initialize OpenAI client
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const router = express_1.default.Router();
// CORS middleware for API routes
const setCorsHeaders = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    next();
};
// Apply CORS headers to all routes
router.use(setCorsHeaders);
// Handle OPTIONS requests explicitly
router.options('/grammar-check', (req, res) => {
    // Pre-flight request
    console.log('Pre-flight request received');
    res.status(204).end();
});
// Grammar check endpoint
router.post('/grammar-check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        if (!text) {
            res.status(500).json({ error: 'Failed to check grammar' }).end();
        }
        const response = yield openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that checks grammar and improves writing. Return the corrected text with explanations for the changes."
                },
                {
                    role: "user",
                    content: `Please check and correct the grammar in this text: "${text}"`
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });
        const responseData = {
            originalText: text,
            correctedText: response.choices[0].message.content || ''
        };
        res.status(200).json(responseData).end();
    }
    catch (error) {
        console.error('Error checking grammar:', error);
        res.status(500).json({ error: 'Failed to check grammar' }).end();
    }
}));
// Health check endpoint
router.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
exports.default = router;
