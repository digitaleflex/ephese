import React, { useState } from 'react';

interface GiftOptionsProps {
  onChoiceMade: (choice: string) => void;
  onResetChoice: () => void;
  chosenOption: string | null;
}

const GiftOptions: React.FC<GiftOptionsProps> = ({ onChoiceMade, onResetChoice, chosenOption }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onChoiceMade(option);
  };

  const getOptionDetails = (option: string) => {
    switch (option) {
      case 'A':
        return {
          title: 'Ballade sur la plage',
          description: 'Une journée romantique au bord de l\'eau avec ballade, détente sur la plage et coucher de soleil enchanteur.',
          details: [
            'Promenade main dans la main sur le sable',
            'Moment de détente sur une grande serviette',
            'Contemplation du coucher de soleil'
          ],
          letterId: 101
        };
      case 'B':
        return {
          title: 'Dîner dans un restaurant',
          description: 'Un moment gastronomique exceptionnel dans le restaurant de votre choix, pour savourer ensemble.',
          details: [
            'Restaurant de votre choix',
            'Menu personnalisé selon vos goûts',
            'Moment privilégié rien qu\'à nous deux'
          ],
          letterId: 102
        };
      case 'C':
        return {
          title: 'Cadeau personnalisé',
          description: 'Demandez-moi le cadeau que vous souhaitez recevoir, et je ferai tout mon possible pour vous l\'offrir.',
          details: [
            'Liberté totale de choisir',
            'Voyage, objet précieux ou expérience unique',
            'Réalisation de votre vœu le plus cher'
          ],
          letterId: 103
        };
      default:
        return {
          title: '',
          description: '',
          details: [],
          letterId: 0
        };
    }
  };

  if (chosenOption) {
    const optionDetails = getOptionDetails(chosenOption);
    
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 text-center bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">Votre choix a été enregistré</h2>
            
            <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-6 mb-6">
              <p className="text-amber-300 text-lg mb-2">Option sélectionnée :</p>
              <p className="text-xl font-bold text-white">{optionDetails.title}</p>
              <p className="text-gray-400 mt-4">{optionDetails.description}</p>
              
              <ul className="text-gray-500 text-sm space-y-2 mt-4">
                {optionDetails.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-900/10 border border-amber-700/30 rounded-lg p-4 mb-6">
              <p className="text-amber-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Veuillez contacter LUMEN pour organiser votre cadeau. Il s'occupera de tous les détails pour rendre cette expérience inoubliable.
              </p>
            </div>
            
            <p className="text-gray-400 mb-8">
              Merci pour votre choix. Le contenu de votre lettre spéciale va maintenant se révéler.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-amber-300 font-cursive mb-4">Choisissez votre cadeau spécial</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sélectionnez l'une des options ci-dessous. Une fois votre choix effectué, les autres options disparaîtront.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Option A - Ballade sur la plage */}
          <div 
            className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedOption === 'A' 
                ? 'border-amber-500 shadow-lg shadow-amber-500/20 filter-none' 
                : 'border-gray-700 hover:border-amber-400 filter blur-sm'
            }`}
            onClick={() => handleSelectOption('A')}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 mb-4">
              <span className="text-xl font-bold">A</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Ballade sur la plage</h3>
            <p className="text-gray-400 mb-4">
              Une journée romantique au bord de l'eau avec ballade, détente sur la plage et coucher de soleil enchanteur.
            </p>
            <ul className="text-gray-500 text-sm space-y-2 mb-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Promenade main dans la main sur le sable</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Moment de détente sur une grande serviette</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Contemplation du coucher de soleil</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <button className="w-full py-2 px-4 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 rounded-lg transition duration-200">
                Choisir cette option
              </button>
            </div>
          </div>

          {/* Option B - Dîner dans un restaurant */}
          <div 
            className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedOption === 'B' 
                ? 'border-amber-500 shadow-lg shadow-amber-500/20 filter-none' 
                : 'border-gray-700 hover:border-amber-400 filter blur-sm'
            }`}
            onClick={() => handleSelectOption('B')}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 mb-4">
              <span className="text-xl font-bold">B</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Dîner dans un restaurant</h3>
            <p className="text-gray-400 mb-4">
              Un moment gastronomique exceptionnel dans le restaurant de votre choix, pour savourer ensemble.
            </p>
            <ul className="text-gray-500 text-sm space-y-2 mb-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Restaurant de votre choix</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Menu personnalisé selon vos goûts</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Moment privilégié rien qu'à nous deux</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <button className="w-full py-2 px-4 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 rounded-lg transition duration-200">
                Choisir cette option
              </button>
            </div>
          </div>

          {/* Option C - Cadeau personnalisé */}
          <div 
            className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedOption === 'C' 
                ? 'border-amber-500 shadow-lg shadow-amber-500/20 filter-none' 
                : 'border-gray-700 hover:border-amber-400 filter blur-sm'
            }`}
            onClick={() => handleSelectOption('C')}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 mb-4">
              <span className="text-xl font-bold">C</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Cadeau personnalisé</h3>
            <p className="text-gray-400 mb-4">
              Demandez-moi le cadeau que vous souhaitez recevoir, et je ferai tout mon possible pour vous l'offrir.
            </p>
            <ul className="text-gray-500 text-sm space-y-2 mb-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Liberté totale de choisir</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Voyage, objet précieux ou expérience unique</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Réalisation de votre vœu le plus cher</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <button className="w-full py-2 px-4 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 rounded-lg transition duration-200">
                Choisir cette option
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <p className="text-gray-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Une fois que vous aurez sélectionné une option, les autres choix ne seront plus disponibles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GiftOptions;