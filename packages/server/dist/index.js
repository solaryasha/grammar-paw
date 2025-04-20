"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
// Create Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Basic CORS middleware for general app security
// This provides a fallback, but the detailed CORS handling is in api.ts
// app.use(cors({
//   origin: ['http://localhost:5173'],
//   credentials: true
// }));
// Middleware
// app.use(express.json());
// API routes - CORS handling now moved to api.ts
// app.use('/api', apiRouter);
// app.use('/api', (req, res) => {
//   console.log('CORS headers set for API routes');
//   res.status(200).json({ message: 'CORS headers set for API routes' }).end();
// }); 
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
