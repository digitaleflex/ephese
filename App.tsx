import React, { useState, useEffect, useRef } from 'react';
import { letters } from './constants/letters';
import { Letter } from './types';
import LetterList from './components/LetterList';
import LetterDisplay from './components/LetterDisplay';
import AnniversarySection from './components/AnniversarySection';
import ChoiceConfirmation from './components/ChoiceConfirmation';
import GiftOptions from './components/GiftOptions';

const App: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [readLetters, setReadLetters] = useState<Set<number>>(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showAnniversary, setShowAnniversary] = useState(false);
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [isChoiceAvailable, setIsChoiceAvailable] = useState(false);
  const [giftChoice, setGiftChoice] = useState<string | null>(null);
  const [showGiftOptions, setShowGiftOptions] = useState(false);
  const letterDisplayRef = useRef<{ revealContent: () => void }>(null);

  // Vérifier si nous sommes proches de la date d'anniversaire (20 novembre) ou si c'est pour les tests
  useEffect(() => {
    const today = new Date();
    const anniversary = new Date(2025, 10, 20); // 20 novembre 2025 (Mois 10 = Novembre, 0-indexé)
    
    // Pour les tests, déverrouiller si nous sommes le 19/11/2025 ou après
    const testUnlockDate = new Date(2025, 10, 19); // 19 novembre 2025
    
    // Si c'est la période de test (19/11/2025) ou si l'anniversaire est dans les 30 jours
    if (today >= testUnlockDate || Math.abs(anniversary.getTime() - today.getTime()) <= 30 * 24 * 60 * 60 * 1000) {
      setIsChoiceAvailable(true);
    }
    
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
    
    // Si la lettre est une option de choix, enregistrer le choix
    if (letter.isChoiceOption && letter.choiceGroupId) {
      setChosenOption(letter.choiceGroupId);
    }
    
    // Réinitialiser l'affichage des options de cadeaux
    if (letter.id !== 33) {
      setShowGiftOptions(false);
    }
  };

  const handleResetChoice = () => {
    setChosenOption(null);
    setGiftChoice(null);
    setShowGiftOptions(false);
    // Réinitialiser la sélection à la lettre de choix
    const choiceLetter = letters.find(letter => letter.id === 33);
    if (choiceLetter) {
      setSelectedLetter(choiceLetter);
    }
  };

  const handleGiftChoice = (choice: string) => {
    setGiftChoice(choice);
    // Révéler le contenu de la lettre spéciale
    if (letterDisplayRef.current) {
      letterDisplayRef.current.revealContent();
    }
  };

  const handleOpenGiftOptions = () => {
    setShowGiftOptions(true);
  };

  // Filtrer les lettres en fonction du choix effectué
  const filteredLetters = letters.filter(letter => {
    // Masquer les lettres de choix si elles ne sont pas encore disponibles
    if ((letter.id === 33 || letter.isChoiceOption) && !isChoiceAvailable) {
      return false;
    }
    
    // Si un choix a été fait, masquer les autres options du même groupe
    if (chosenOption && letter.isChoiceOption && letter.choiceGroupId === chosenOption) {
      // Masquer les autres options du même groupe
      return letter.id === selectedLetter?.id || !letter.isChoiceOption;
    }
    // Masquer également la lettre de présentation des choix si un choix a été fait
    if (chosenOption && letter.id === 33) {
      return false;
    }
    return true;
  });

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

  // Afficher la section d'anniversaire si c'est la période appropriée
  if (showAnniversary) {
    return <AnniversarySection />;
  }

  // Afficher les options de cadeaux si disponible et si c'est le bon moment
  if (isChoiceAvailable && showGiftOptions) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col md:flex-row overflow-hidden">
        <header className="md:hidden p-3 md:p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 text-center">
          <h1 className="text-2xl md:text-3xl font-cursive text-amber-300">Lettres à mon Éphèse</h1>
        </header>
        <GiftOptions 
          onChoiceMade={handleGiftChoice} 
          onResetChoice={handleResetChoice} 
          chosenOption={giftChoice} 
        />
      </div>
    );
  }

  // Afficher la confirmation de choix si un choix a été fait
  if (chosenOption && selectedLetter?.isChoiceOption) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col md:flex-row overflow-hidden">
        <header className="md:hidden p-3 md:p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 text-center">
          <h1 className="text-2xl md:text-3xl font-cursive text-amber-300">Lettres à mon Éphèse</h1>
        </header>
        <LetterList 
          letters={filteredLetters} 
          selectedLetter={selectedLetter} 
          onSelectLetter={handleSelectLetter} 
          readLetters={readLetters}
        />
        <ChoiceConfirmation onResetChoice={handleResetChoice} />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col md:flex-row overflow-hidden">
      <header className="md:hidden p-3 md:p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 text-center">
        <h1 className="text-2xl md:text-3xl font-cursive text-amber-300">Lettres à mon Éphèse</h1>
      </header>
      <LetterList 
        letters={filteredLetters} 
        selectedLetter={selectedLetter} 
        onSelectLetter={handleSelectLetter} 
        readLetters={readLetters}
      />
      <LetterDisplay 
        ref={letterDisplayRef}
        letter={selectedLetter} 
        onOpenGiftOptions={handleOpenGiftOptions} 
      />
    </div>
  );
};

export default App;