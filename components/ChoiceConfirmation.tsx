import React from 'react';

interface ChoiceConfirmationProps {
  onResetChoice: () => void;
}

const ChoiceConfirmation: React.FC<ChoiceConfirmationProps> = ({ onResetChoice }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 text-center bg-gray-900">
      <div className="max-w-md mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">Choix confirmé</h2>
        
        <p className="text-gray-400 mb-6">
          Votre choix a été enregistré avec succès. Les autres options ne sont plus disponibles pour cette sélection.
        </p>
        
        <p className="text-gray-500 mb-8">
          Si vous souhaitez modifier votre choix, vous pouvez réinitialiser la sélection.
        </p>
        
        <button
          onClick={onResetChoice}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Réinitialiser le choix
        </button>
      </div>
    </div>
  );
};

export default ChoiceConfirmation;