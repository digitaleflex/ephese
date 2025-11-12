import React, { useState, useEffect } from 'react';

const AnniversarySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showLetter, setShowLetter] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Date de l'anniversaire : 20 novembre 2025
      const anniversaryDate = new Date('2025-11-20T00:00:00');
      const now = new Date();
      const difference = anniversaryDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      }
      
      // Si la date est passée, on affiche le message
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Si le compteur a atteint zéro, on affiche la lettre
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setShowLetter(true);
      }
    }, 1000);

    // Initial calculation
    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);
    
    // Si la date est déjà passée, on affiche la lettre
    if (initialTimeLeft.days <= 0 && initialTimeLeft.hours <= 0 && initialTimeLeft.minutes <= 0 && initialTimeLeft.seconds <= 0) {
      setShowLetter(true);
    }

    return () => clearInterval(timer);
  }, []);

  // Génération des éléments d'image pour la galerie avec des formes aléatoires
  const renderImageGallery = () => {
    const images = [];
    // Nous avons 56 images copiées (de image1.jpg à image56.jpg)
    for (let i = 1; i <= 56; i++) {
      // Générer une classe de forme aléatoire
      const shapes = [
        'rounded-full', // Cercle
        'rounded-none', // Carré
        'rounded-lg',   // Arrondi léger
        'rounded-2xl',  // Arrondi prononcé
        'rounded-t-lg', // Arrondi en haut seulement
        'rounded-b-lg', // Arrondi en bas seulement
        'rounded-l-lg', // Arrondi à gauche seulement
        'rounded-r-lg'  // Arrondi à droite seulement
      ];
      
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      
      images.push(
        <div 
          key={i} 
          className={`aspect-square overflow-hidden border-2 border-rose-300/50 ${randomShape} transition-all duration-300 hover:scale-110 hover:rotate-6 hover:z-10 shadow-lg hover:shadow-rose-300/30`}
        >
          <img 
            src={`/image${i}.jpg`} 
            alt={`Souvenir spécial ${i}`} 
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
      );
    }
    return images;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-4xl w-full bg-gradient-to-br from-rose-900/40 via-purple-900/40 to-indigo-900/40 backdrop-blur-lg border border-rose-700/50 rounded-2xl p-6 md:p-10 shadow-2xl animate-gradient-x">
        <style>
          {`
            @keyframes gradient-x {
              0%, 100% { background-size: 200% 200%; background-position: left center; }
              50% { background-size: 200% 200%; background-position: right center; }
            }
            .animate-gradient-x {
              animation: gradient-x 8s ease infinite;
            }
          `}
        </style>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 mb-4 animate-pulse">
            Joyeux Anniversaire, mon Éphèse !
          </h1>
          <p className="text-lg md:text-xl text-rose-100 max-w-2xl mx-auto">
            Une journée spéciale pour celle qui illumine mes jours
          </p>
        </div>

        {/* Compteur à rebours avec cadeau animé */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gradient-to-br from-rose-800/50 to-purple-800/50 rounded-xl p-4 text-center border border-rose-600/30 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-rose-200">{timeLeft.days}</div>
            <div className="text-rose-100">Jours</div>
          </div>
          <div className="bg-gradient-to-br from-rose-800/50 to-purple-800/50 rounded-xl p-4 text-center border border-rose-600/30 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-rose-200">{timeLeft.hours}</div>
            <div className="text-rose-100">Heures</div>
          </div>
          <div className="bg-gradient-to-br from-rose-800/50 to-purple-800/50 rounded-xl p-4 text-center border border-rose-600/30 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-rose-200">{timeLeft.minutes}</div>
            <div className="text-rose-100">Minutes</div>
          </div>
          <div className="bg-gradient-to-br from-rose-800/50 to-purple-800/50 rounded-xl p-4 text-center border border-rose-600/30 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-rose-200">{timeLeft.seconds}</div>
            <div className="text-rose-100">Secondes</div>
          </div>
        </div>

        {/* Cadeau animé qui s'affiche pendant le compteur */}
        {!showLetter && (
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full animate-bounce flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-rose-700 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Message spécial - s'affiche après le compteur */}
        {showLetter && (
          <div className="mb-10 relative">
            {/* Enveloppe animée */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-24 bg-gradient-to-br from-rose-400 to-purple-500 rounded-lg transform rotate-3 animate-pulse shadow-lg">
                <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-lg transform origin-bottom -skew-x-12"></div>
                <div className="absolute top-0 right-0 w-full h-12 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-lg transform origin-bottom skew-x-12"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-yellow-300"></div>
              </div>
            </div>
            
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Arrière-plan avec dégradé animé */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 animate-gradient-x opacity-90"></div>
              
              {/* Image en filigrane */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: "url('/image11.jpg')" }}
              ></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl p-6 md:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 mb-2">
                    Un message spécial pour ton anniversaire
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full"></div>
                </div>
                
                <div className="prose prose-rose max-w-none">
                  <p className="text-rose-800 text-lg leading-relaxed font-serif">
                    Mon Éphèse,<br /><br />
                    En ce jour si spécial, je voulais te dire à quel point ta présence illumine ma vie. 
                    Chaque lettre que je t'ai écrite témoigne de l'amour profond que j'ai pour toi. 
                    Tu es cette lumière qui guide mes pas, cette étoile brillante dans mon ciel.<br /><br />
                    Que cette nouvelle année t'apporte encore plus de bonheur, de paix et d'amour. 
                    Que chaque jour soit une bénédiction, et que tu continues à rayonner comme tu le fais si bien.<br /><br />
                    Merci d'être celle que tu es. Merci d'être mon Éphèse.<br /><br />
                    Avec tout mon amour,<br />
                    <span className="font-cursive text-xl text-rose-600">Ton compagnon de l'invisible</span>
                  </p>
                </div>
                
                {/* Cœur décoratif */}
                <div className="flex justify-center mt-6">
                  <div className="text-rose-400 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bouton pour accéder à la galerie */}
        <div className="text-center mb-8">
          <button 
            onClick={() => setShowGallery(true)}
            className="px-6 py-3 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 shadow-lg hover:shadow-rose-500/30"
          >
            Explorer la galerie de souvenirs
          </button>
        </div>

        {/* Galerie spéciale - s'affiche au clic sur le bouton */}
        {showGallery && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl md:text-3xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300">
                Galerie de souvenirs
              </h2>
              <button 
                onClick={() => setShowGallery(false)}
                className="px-4 py-2 bg-gradient-to-r from-rose-700 to-purple-700 hover:from-rose-800 hover:to-purple-800 text-white rounded-lg transition duration-200 shadow-md"
              >
                Fermer
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto p-2 bg-rose-900/20 rounded-xl">
              {renderImageGallery()}
            </div>
          </div>
        )}

        {/* Bouton retour - visible seulement si la galerie n'est pas affichée */}
        {!showGallery && (
          <div className="text-center mt-10">
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 shadow-lg hover:shadow-rose-500/30"
            >
              Retour aux lettres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnniversarySection;