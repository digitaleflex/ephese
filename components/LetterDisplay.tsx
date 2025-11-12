import React from 'react';
import { Letter } from '../types';

interface LetterDisplayProps {
  letter: Letter | null;
}

const FeatherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);


const LetterDisplay: React.FC<LetterDisplayProps> = ({ letter }) => {
  if (!letter) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 text-center bg-gray-900">
          <FeatherIcon/>
        <h2 className="text-xl md:text-2xl font-bold text-gray-400 mt-4">Bienvenue</h2>
        <p className="text-gray-500 mt-2 max-w-xs md:max-w-sm">Sélectionnez une lettre dans la liste pour commencer votre voyage à travers ces mots d'affection.</p>
      </div>
    );
  }

  return (
    <main className="flex-grow p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 md:mb-10 pb-4 border-b border-gray-700/50">
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-amber-300 font-cursive">Lettre {letter.id}: {letter.title}</h1>
                {letter.specialNote && (
                    <p className="text-sm text-gray-400 mt-2 italic">
                        <span className="font-semibold">{letter.specialNote.type}:</span> {letter.specialNote.text}
                    </p>
                )}
            </div>
            
            <div className="prose prose-invert prose-sm md:prose-base lg:prose-lg text-gray-300 leading-relaxed">
                {letter.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 md:mb-6 whitespace-pre-wrap">{paragraph}</p>
                ))}
            </div>

            <div className="mt-8 md:mt-12 pt-6 border-t border-gray-700/50 text-right">
                <p className="text-gray-400 text-xl md:text-2xl font-cursive whitespace-pre-wrap">
                   — {letter.author}
                </p>
            </div>
        </div>
    </main>
  );
};

export default LetterDisplay;