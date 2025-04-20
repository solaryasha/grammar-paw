import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as GrammarCheckRequest;
    
    if (!body.text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
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
          content: `Please check and correct the grammar in this text: "${body.text}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseData: GrammarCheckResponse = {
      originalText: body.text,
      correctedText: response.choices[0].message.content || ''
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error processing grammar check:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}