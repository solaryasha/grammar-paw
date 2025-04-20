import { NextRequest, NextResponse } from 'next/server';

// Types
interface GrammarCheckRequest {
  text: string;
}

interface GrammarCheckResponse {
  originalText: string;
  correctedText: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as GrammarCheckRequest;
    
    if (!body.text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // TODO: Replace this with actual OpenAI integration
    const correctedText = body.text; // Temporary placeholder

    return NextResponse.json({
      originalText: body.text,
      correctedText: correctedText
    });
  } catch (error) {
    console.error('Error processing grammar check:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}