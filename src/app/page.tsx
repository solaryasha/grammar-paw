'use client';

import { useState } from 'react';
import axios from 'axios';
import GrammarForm from '@/components/GrammarForm';
import Results from '@/components/Results';
import Loader from '@/components/Loader';

export default function Home() {
  const [originalText, setOriginalText] = useState<string>('');
  const [correctedText, setCorrectedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkGrammar = async (text: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setOriginalText(text);
    
    try {
      const response = await axios.post<{ correctedText: string }>('/api/grammar-check', { text });
      setCorrectedText(response.data.correctedText);
    } catch (err) {
      setError('Error checking grammar. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 flex flex-col">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Grammar Paw</h1>
        <p className="text-lg text-gray-600">Improve your writing with AI-powered grammar checking</p>
      </div>

      <div className="flex-grow flex flex-col">
        {error && (
          <div className="max-w-3xl mx-auto text-center py-4 text-red-600">
            {error}
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : correctedText && (
          <Results originalText={originalText} correctedText={correctedText} />
        )}

        <div className="mt-auto pt-8">
          <GrammarForm onSubmit={checkGrammar} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
