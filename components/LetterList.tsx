import React, { useRef } from 'react';
import { Letter } from '../types';

interface LetterListProps {
  letters: Letter[];
  selectedLetter: Letter | null;
  onSelectLetter: (letter: Letter) => void;
  readLetters: Set<number>;
}

const LetterList: React.FC<LetterListProps> = ({ letters, selectedLetter, onSelectLetter, readLetters }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return;
    }
    event.preventDefault();

    let nextIndex;
    if (event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % letters.length;
    } else { // ArrowUp
      nextIndex = (currentIndex - 1 + letters.length) % letters.length;
    }
    
    if (listRef.current) {
      const buttons = listRef.current.querySelectorAll('button');
      const nextButton = buttons[nextIndex];
      if (nextButton) {
        nextButton.focus();
      }
    }
  };

  return (
    <nav className="w-full md:w-80 flex-shrink-0 bg-gray-900/50 backdrop-blur-sm border-b md:border-b-0 md:border-r border-gray-700/50">
      <div className="p-4 border-b border-gray-700/50">
        <h2 className="text-3xl font-cursive text-gray-100">Lettres</h2>
        <p className="text-sm text-gray-400">Une collection</p>
      </div>
      <div 
        ref={listRef}
        role="listbox"
        aria-label="Liste des lettres"
        className="flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto md:h-[calc(100vh-89px)] p-2 md:p-4 gap-2">
        {letters.map((letter, index) => (
          <button
            key={letter.id}
            onClick={() => onSelectLetter(letter)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="option"
            aria-selected={selectedLetter?.id === letter.id}
            className={`relative w-40 md:w-full flex-shrink-0 text-left p-4 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 ${
              selectedLetter?.id === letter.id
                ? 'bg-amber-600/20 text-amber-400 shadow-lg'
                : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
            }`}
          >
            {readLetters.has(letter.id) && selectedLetter?.id !== letter.id && (
              <span 
                aria-label="Lettre lue"
                className="absolute top-3 right-3 h-2 w-2 rounded-full bg-gray-500"
              ></span>
            )}
            <p className="text-sm font-semibold opacity-80">Lettre {letter.id}</p>
            <p className="font-medium truncate">{letter.title}</p>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default LetterList;