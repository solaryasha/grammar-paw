import React, { useState, FormEvent, ChangeEvent } from 'react';
import './GrammarForm.css';

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
    <div className="grammar-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text-input">Enter your text:</label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            placeholder="Type or paste your text here for grammar checking..."
            rows={8}
            disabled={isLoading}
            required
          />
        </div>
        <button 
          type="submit" 
          className="submit-button" 
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? 'Checking...' : 'Check Grammar'}
        </button>
      </form>
    </div>
  );
};

export default GrammarForm;