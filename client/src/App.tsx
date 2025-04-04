import { useState } from 'react';
import axios from 'axios';
import './App.css';
import GrammarForm from './components/GrammarForm';
import Results from './components/Results';

function App() {
  const [originalText, setOriginalText] = useState<string>('');
  const [correctedText, setCorrectedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkGrammar = async (text: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setOriginalText(text);
    
    try {
      const response = await axios.post<{ correctedText: string }>('http://localhost:5000/api/grammar-check', { text });
      setCorrectedText(response.data.correctedText);
    } catch (err) {
      setError('Error checking grammar. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grammar Paw</h1>
        <p>Improve your writing with AI-powered grammar checking</p>
      </header>
      <main>
        <GrammarForm onSubmit={checkGrammar} isLoading={isLoading} />
        {isLoading && <div className="loading">Checking grammar...</div>}
        {error && <div className="error">{error}</div>}
        {correctedText && <Results originalText={originalText} correctedText={correctedText} />}
      </main>
      <footer>
        <p>Powered by OpenAI • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
