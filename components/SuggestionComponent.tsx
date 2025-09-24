import React, { useState } from 'react';
import { getGratitudeSuggestion } from '../gemini';

interface SuggestionComponentProps {
  onUseSuggestion: (suggestion: string) => void;
}

const SuggestionComponent: React.FC<SuggestionComponentProps> = ({ onUseSuggestion }) => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null); // Clear previous suggestion when fetching a new one
    try {
      const newSuggestion = await getGratitudeSuggestion();
      setSuggestion(newSuggestion);
    } catch (err) {
      setError('Sorry, I couldn\'t come up with a suggestion right now. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUseSuggestion = () => {
    if (suggestion) {
      onUseSuggestion(suggestion);
      setSuggestion(null); // Clear suggestion after using it
    }
  };

  return (
    <div className="my-4 text-center">
      {!suggestion && (
        <button
          type="button"
          onClick={fetchSuggestion}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-wait"
          aria-live="polite"
        >
          {isLoading ? (
             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.657 5.657a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 10a1 1 0 01-1-1 1 1 0 011-1h1a1 1 0 110 2H3zM10 16a6 6 0 004-9.668V3.5a1.5 1.5 0 00-3 0V1h-2v2.5a1.5 1.5 0 00-3 0V6.332A6 6 0 0010 16z" />
             </svg>
          )}
          <span>{isLoading ? 'Thinking...' : 'Get a Suggestion'}</span>
        </button>
      )}

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

      {suggestion && !isLoading && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 text-left transition-opacity duration-300">
          <p className="text-gray-300 italic">"{suggestion}"</p>
          <div className="flex justify-end gap-2 mt-3">
             <button
              type="button"
              onClick={fetchSuggestion}
              className="px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
            >
              Get another
            </button>
            <button
              type="button"
              onClick={handleUseSuggestion}
              className="px-4 py-1.5 rounded-lg bg-yellow-300 hover:bg-yellow-400 text-black text-sm font-bold transition-colors"
            >
              Use this
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestionComponent;