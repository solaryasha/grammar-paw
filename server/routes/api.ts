import express, { Request, Response } from 'express';
import { OpenAI } from 'openai';
import corsMiddleware from '../middlewares/cors.middleware';

// Types
interface GrammarCheckRequest {
  text: string;
}

interface GrammarCheckResponse {
  originalText: string;
  correctedText: string;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

// Apply CORS middleware to all routes
router.use(corsMiddleware());

// Grammar check endpoint
router.post('/grammar-check', async (req: Request, res: Response) => {
  try {
    const { text } = req.body as GrammarCheckRequest;

    if (!text) {
      res.status(500).json({ error: 'Failed to check grammar' }).end();
    }

    const response = await openai.chat.completions.create({
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

    const responseData: GrammarCheckResponse = {
      originalText: text,
      correctedText: response.choices[0].message.content || ''
    };

    res.status(200).json(responseData).end();
  } catch (error) {
    console.error('Error checking grammar:', error);
    res.status(500).json({ error: 'Failed to check grammar' }).end();
  }
});

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

export default router;