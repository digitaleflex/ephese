import React, { useState, useEffect } from 'react';
import { letters } from './constants/letters';
import { Letter } from './types';
import LetterList from './components/LetterList';
import LetterDisplay from './components/LetterDisplay';

const App: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [readLetters, setReadLetters] = useState<Set<number>>(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Set the first letter as default on initial render and mark as read
    if (letters.length > 0 && isAuthenticated) {
      const firstLetter = letters[0];
      setSelectedLetter(firstLetter);
      setReadLetters(new Set([firstLetter.id]));
    }
  }, [isAuthenticated]);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === 'MYTYLYQVT') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Code secret incorrect');
    }
  };

  const handleSelectLetter = (letter: Letter) => {
    setSelectedLetter(letter);
    setReadLetters(prevReadLetters => {
      const newReadLetters = new Set(prevReadLetters);
      newReadLetters.add(letter.id);
      return newReadLetters;
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-cursive text-amber-300 mb-2">Lettres à mon Éphèse</h1>
            <p className="text-gray-400 text-sm">Veuillez entrer le code secret pour accéder</p>
          </div>
          
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label htmlFor="secretCode" className="block text-sm font-medium text-gray-300 mb-2">
                Code secret
              </label>
              <input
                type="password"
                id="secretCode"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                placeholder="Entrez le code secret"
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-base"
            >
              Accéder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col md:flex-row overflow-hidden">
      <header className="md:hidden p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 text-center">
        <h1 className="text-3xl font-cursive text-amber-300">Lettres à mon Éphèse</h1>
      </header>
      <LetterList 
        letters={letters} 
        selectedLetter={selectedLetter} 
        onSelectLetter={handleSelectLetter} 
        readLetters={readLetters}
      />
      <LetterDisplay letter={selectedLetter} />
    </div>
  );
};

export default App;