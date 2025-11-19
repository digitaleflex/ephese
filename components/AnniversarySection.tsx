import React, { useState, useEffect } from 'react';

const AnniversarySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Date d'anniversaire fixe : 20 novembre 2025
      const anniversaryDate = new Date('2025-11-20T00:00:00');
      const now = new Date();
      
      // Calcul de la différence en millisecondes
      const difference = anniversaryDate.getTime() - now.getTime();
      
      // Vérifier si la date est passée
      if (difference <= 0) {
        setIsPast(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      // Convertir en jours, heures, minutes, secondes
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return {
        days,
        hours,
        minutes,
        seconds
      };
    };

    // Calcul initial
    setTimeLeft(calculateTimeLeft());
    
    // Mettre à jour le compte à rebours chaque seconde
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Nettoyer l'intervalle quand le composant est démonté
    return () => clearInterval(timer);
  }, []);

  const handleReturnToLetters = () => {
    // Déclencher un événement personnalisé pour retourner aux lettres
    window.dispatchEvent(new CustomEvent('returnToLetters'));
  };

  if (isPast) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-cursive text-amber-300 mb-4">Joyeux Anniversaire Mon Amour !</h1>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gray-300 text-lg md:text-xl mb-6">
              Aujourd'hui, c'est un jour spécial, un jour qui marque notre amour. 
              Chaque moment passé à tes côtés est un cadeau précieux que je chéris profondément.
            </p>
            
            <div className="flex justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            
            <p className="text-amber-300 text-xl md:text-2xl font-cursive">
              Merci d'être celle que tu es. Je t'aime plus que tout au monde.
            </p>
          </div>
          
          <button
            onClick={handleReturnToLetters}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux lettres
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-cursive text-amber-300 mb-4">Compte à rebours de notre Anniversaire</h1>
          <p className="text-gray-400 text-lg">20 Novembre 2025 - Un jour spécial qui approche</p>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-4"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6">
            <div className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">{timeLeft.days}</div>
            <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Jours</div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6">
            <div className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">{timeLeft.hours}</div>
            <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Heures</div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6">
            <div className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">{timeLeft.minutes}</div>
            <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Minutes</div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6">
            <div className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">{timeLeft.seconds}</div>
            <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Secondes</div>
          </div>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 mb-8">
          <p className="text-gray-300 text-lg md:text-xl mb-6">
            Chaque seconde qui passe nous rapproche de ce moment spécial. 
            J'ai hâte de célébrer notre amour et de créer de nouveaux souvenirs inoubliables ensemble.
          </p>
          
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <p className="text-amber-300 text-xl md:text-2xl font-cursive">
            À très bientôt, mon amour. Chaque moment avec toi est précieux.
          </p>
        </div>
        
        <button
          onClick={handleReturnToLetters}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux lettres
        </button>
      </div>
    </div>
  );
};

export default AnniversarySection;