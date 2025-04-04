import React from 'react';
import './Results.css';

interface ResultsProps {
  originalText: string;
  correctedText: string;
}

const Results: React.FC<ResultsProps> = ({ originalText, correctedText }) => {
  // Find differences between original and corrected text
  const highlightDifferences = () => {
    // This is a simple implementation; a more sophisticated diff algorithm could be used
    if (originalText === correctedText) {
      return <p className="no-errors">No grammar issues found in your text!</p>;
    }
    
    return (
      <div className="text-comparison">
        <div className="text-column">
          <h3>Original Text</h3>
          <div className="text-content">{originalText}</div>
        </div>
        <div className="text-column">
          <h3>Corrected Text</h3>
          <div className="text-content">{correctedText}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="results-container">
      <h2>Results</h2>
      {highlightDifferences()}
    </div>
  );
};

export default Results;