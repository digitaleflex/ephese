import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Letter } from '../types';

interface LetterDisplayProps {
  letter: Letter | null;
  onOpenGiftOptions?: () => void;
}

const FeatherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);


const LetterDisplay = forwardRef((props: LetterDisplayProps, ref) => {
  const { letter, onOpenGiftOptions } = props;
  const [showContent, setShowContent] = useState(false);

  // Révéler le contenu lorsque la lettre change
  useEffect(() => {
    if (letter && letter.id !== 33) {
      setShowContent(true);
    }
  }, [letter]);

  // Exposer la fonction de révélation du contenu via la référence
  useImperativeHandle(ref, () => ({
    revealContent: () => {
      setShowContent(true);
    }
  }));

  if (!letter) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 text-center bg-gray-900">
          <FeatherIcon/>
        <h2 className="text-xl md:text-2xl font-bold text-gray-400 mt-4">Bienvenue</h2>
        <p className="text-gray-500 mt-2 max-w-xs md:max-w-sm">Sélectionnez une lettre dans la liste pour commencer votre voyage à travers ces mots d'affection.</p>
      </div>
    );
  }

  // Pour la lettre spéciale (ID 33), masquer le contenu jusqu'à ce que l'utilisateur clique sur le bouton
  if (letter.id === 33) {
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

          {!showContent ? (
            <div className="text-center py-8">
              <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-6 mb-6 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-gray-300 mb-4">
                  Le contenu de cette lettre est protégé et ne sera révélé qu'après avoir fait votre choix.
                </p>
                <p className="text-gray-400 text-sm">
                  Cliquez sur le bouton ci-dessous pour choisir votre cadeau spécial.
                </p>
              </div>
              
              <button
                onClick={() => {
                  if (onOpenGiftOptions) {
                    onOpenGiftOptions();
                  }
                }}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Choisir mon cadeau
              </button>
            </div>
          ) : (
            <>
              <div className="prose prose-invert prose-sm md:prose-base lg:prose-lg text-gray-300 leading-relaxed">
                {letter.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 md:mb-6 whitespace-pre-wrap">{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 md:mt-12 flex justify-center">
                <button
                  onClick={onOpenGiftOptions}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Choisir mon cadeau
                </button>
              </div>
            </>
          )}

          <div className="mt-8 md:mt-12 pt-6 border-t border-gray-700/50 text-right">
            <p className="text-gray-400 text-xl md:text-2xl font-cursive whitespace-pre-wrap">
               — {letter.author}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Pour les autres lettres, afficher le contenu normalement
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
          {letter.isChoiceOption && (
            <div className="mt-4 p-3 bg-amber-900/30 border border-amber-700/50 rounded-lg">
              <p className="text-amber-300 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Une fois que vous aurez sélectionné cette option, les autres choix ne seront plus disponibles.
              </p>
            </div>
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
});

export default LetterDisplay;