'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface GrammarFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const GrammarForm: React.FC<GrammarFormProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-5 p-5 bg-gray-50 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="text-input" className="block font-semibold text-gray-700">
            Enter your text:
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            placeholder="Type or paste your text here for grammar checking..."
            rows={8}
            disabled={isLoading}
            required
            className="w-full p-3 border border-gray-300 rounded-md font-inherit text-base transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <button 
          type="submit" 
          className="mt-4 px-5 py-2.5 bg-blue-500 text-white rounded-md text-base cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? 'Checking...' : 'Check Grammar'}
        </button>
      </form>
    </div>
  );
};

export default GrammarForm;