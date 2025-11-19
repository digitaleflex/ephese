import React, { useState, useEffect } from 'react';
import { letters } from './constants/letters';
import { Letter } from './types';
import LetterList from './components/LetterList';
import LetterDisplay from './components/LetterDisplay';
import AnniversarySection from './components/AnniversarySection';
import GiftOptions from './components/GiftOptions';

const App: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [readLetters, setReadLetters] = useState<Set<number>>(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showAnniversary, setShowAnniversary] = useState(false);
  const [showGiftOptions, setShowGiftOptions] = useState(false);
  const [chosenGiftOption, setChosenGiftOption] = useState<string | null>(null);

  // Vérifier si nous sommes proches de la date d'anniversaire (20 novembre)
  useEffect(() => {
    const today = new Date();
    const anniversary = new Date(today.getFullYear(), 10, 20); // Mois 10 = Novembre (0-indexé)
    
    // Si l'anniversaire est dans les 30 jours (avant ou après)
    const timeDiff = Math.abs(anniversary.getTime() - today.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff <= 30) {
      setShowAnniversary(true);
    }
  }, []);

  useEffect(() => {
    // Set the first letter as default on initial render and mark as read
    if (letters.length > 0 && isAuthenticated) {
      const firstLetter = letters[0];
      setSelectedLetter(firstLetter);
      setReadLetters(new Set([firstLetter.id]));
    }
  }, [isAuthenticated]);

  // Gérer le retour aux lettres depuis la section d'anniversaire
  useEffect(() => {
    const handleReturnToLetters = () => {
      setShowAnniversary(false);
    };

    window.addEventListener('returnToLetters', handleReturnToLetters);
    
    return () => {
      window.removeEventListener('returnToLetters', handleReturnToLetters);
    };
  }, []);

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

  const handleOpenGiftOptions = () => {
    setShowGiftOptions(true);
  };

  const handleGiftChoice = (choice: string) => {
    setChosenGiftOption(choice);
    // Après avoir fait un choix, on révèle le contenu de la lettre 33
    if (selectedLetter && selectedLetter.id === 33) {
      // On force la révélation du contenu
      setTimeout(() => {
        const event = new CustomEvent('revealLetter33Content');
        window.dispatchEvent(event);
      }, 100);
    }
  };

  const handleResetGiftChoice = () => {
    setChosenGiftOption(null);
    setShowGiftOptions(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6 w-full max-w-md">
          <div className="text-center mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-cursive text-amber-300 mb-2">Lettres à mon Éphèse</h1>
            <p className="text-gray-400 text-sm md:text-base">Veuillez entrer le code secret pour accéder</p>
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
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
                placeholder="Entrez le code secret"
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 md:py-3 md:px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm md:text-base"
            >
              Accéder
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Afficher les options de cadeaux si demandé
  if (showGiftOptions) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col overflow-hidden">
        <header className="p-3 md:p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 text-center">
          <h1 className="text-xl md:text-2xl font-cursive text-amber-300">Votre cadeau spécial</h1>
        </header>
        <GiftOptions 
          onChoiceMade={handleGiftChoice} 
          onResetChoice={handleResetGiftChoice}
          chosenOption={chosenGiftOption}
        />
        {chosenGiftOption && (
          <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
            <button
              onClick={handleResetGiftChoice}
              className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Retour aux lettres
            </button>
          </div>
        )}
      </div>
    );
  }

  // Afficher la section d'anniversaire si c'est la période appropriée
  if (showAnniversary) {
    return <AnniversarySection />;
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col md:flex-row overflow-hidden">
      <header className="md:hidden p-3 md:p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 text-center">
        <h1 className="text-2xl md:text-3xl font-cursive text-amber-300">Lettres à mon Éphèse</h1>
      </header>
      <LetterList 
        letters={letters} 
        selectedLetter={selectedLetter} 
        onSelectLetter={handleSelectLetter} 
        readLetters={readLetters}
      />
      <LetterDisplay 
        letter={selectedLetter} 
        onOpenGiftOptions={handleOpenGiftOptions} 
      />
    </div>
  );
};

export default App;