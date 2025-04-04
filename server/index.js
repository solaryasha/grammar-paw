/**
 * @typedef {Object} GrammarCheckRequest
 * @property {string} text - The text to check for grammar
 */

/**
 * @typedef {Object} GrammarCheckResponse
 * @property {string} originalText - The original text that was checked
 * @property {string} correctedText - The text with grammar corrections
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Grammar check endpoint
/**
 * @param {express.Request} req - The Express request object
 * @param {express.Response} res - The Express response object
 */
app.post('/api/grammar-check', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
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

    /** @type {GrammarCheckResponse} */
    const responseData = {
      originalText: text,
      correctedText: response.choices[0].message.content || ''
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error checking grammar:', error);
    res.status(500).json({ error: 'Failed to check grammar' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});