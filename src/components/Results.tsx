'use client';

interface ResultsProps {
  originalText: string;
  correctedText: string;
}

const Results: React.FC<ResultsProps> = ({ originalText, correctedText }) => {
  return (
    <div className="max-w-3xl mx-auto p-5 bg-gray-50 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Original Text:</h3>
          <div className="p-3 bg-white border border-gray-200 rounded-md whitespace-pre-wrap text-gray-900">
            {originalText}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Corrected Text:</h3>
          <div className="p-3 bg-white border border-green-200 rounded-md whitespace-pre-wrap text-gray-900">
            {correctedText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;