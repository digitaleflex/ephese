import React, { useState, useEffect, useRef } from 'react';

const AnniversarySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showLetter, setShowLetter] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [giftMessage, setGiftMessage] = useState(false);
  const [isAnniversaryDay, setIsAnniversaryDay] = useState(false);
  const carouselRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const giftMessageTimeout = useRef<NodeJS.Timeout | null>(null);

  // Références pour les fonctions de rappel
  const onReturnToLetters = useRef<(() => void) | null>(null);

  // Permettre l'initialisation de la fonction de rappel
  const setReturnToLettersCallback = (callback: () => void) => {
    onReturnToLetters.current = callback;
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Date de l'anniversaire : 20 novembre 2025
      const anniversaryDate = new Date('2025-11-20T00:00:00');
      const now = new Date();
      const difference = anniversaryDate.getTime() - now.getTime();

      // Vérifier si nous sommes le jour de l'anniversaire
      const isSameDay = now.getDate() === anniversaryDate.getDate() && 
                        now.getMonth() === anniversaryDate.getMonth() && 
                        now.getFullYear() === anniversaryDate.getFullYear();
      
      setIsAnniversaryDay(isSameDay);

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

  // Démarrer le carrousel automatique quand la galerie est affichée
  useEffect(() => {
    if (showGallery) {
      carouselRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 56);
      }, 3000); // Change d'image toutes les 3 secondes
    } else {
      if (carouselRef.current) {
        clearInterval(carouselRef.current);
        carouselRef.current = null;
      }
      setCurrentSlide(0);
    }

    return () => {
      if (carouselRef.current) {
        clearInterval(carouselRef.current);
      }
    };
  }, [showGallery]);

  // Gérer l'affichage automatique du message du cadeau
  useEffect(() => {
    if (giftMessage) {
      // Le message disparaît automatiquement après 3 secondes
      giftMessageTimeout.current = setTimeout(() => {
        setGiftMessage(false);
      }, 3000);
    }

    return () => {
      if (giftMessageTimeout.current) {
        clearTimeout(giftMessageTimeout.current);
      }
    };
  }, [giftMessage]);

  // Fonction pour naviguer dans le carrousel
  const goToSlide = (index: number) => {
    setCurrentSlide((index + 56) % 56);
  };

  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  // Gestion des gestes tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Vérifier si le swipe est horizontal (plus horizontal que vertical)
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 10) {
        // Swipe gauche
        nextSlide();
      } else if (diffX < -10) {
        // Swipe droite
        prevSlide();
      }
      
      // Réinitialiser les valeurs pour éviter les déclenchements multiples
      touchStartX.current = 0;
      touchStartY.current = 0;
    }
  };

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
          className={`aspect-square overflow-hidden border-2 border-rose-300/50 ${randomShape} transition-all duration-300 hover:scale-110 hover:rotate-6 hover:z-10 shadow-lg hover:shadow-rose-300/30 cursor-pointer`}
          onClick={() => setSelectedImage(i)}
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

  // Afficher l'image agrandie
  const renderImageModal = () => {
    if (selectedImage === null) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={() => setSelectedImage(null)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div 
          className="relative max-w-4xl max-h-[90vh] w-full flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Flèche gauche - masquée sur mobile très petit */}
          <button 
            className="absolute left-2 sm:left-4 text-white bg-rose-700/80 hover:bg-rose-600 rounded-full p-2 sm:p-3 z-10 transition-colors shadow-lg hidden xs:block"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage > 1 ? selectedImage - 1 : 56);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Image */}
          <div className="flex-1 flex justify-center">
            <img 
              src={`/image${selectedImage}.jpg`} 
              alt={`Souvenir spécial ${selectedImage} agrandi`} 
              className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg sm:rounded-xl shadow-2xl"
            />
          </div>
          
          {/* Flèche droite - masquée sur mobile très petit */}
          <button 
            className="absolute right-2 sm:right-4 text-white bg-rose-700/80 hover:bg-rose-600 rounded-full p-2 sm:p-3 z-10 transition-colors shadow-lg hidden xs:block"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage < 56 ? selectedImage + 1 : 1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Bouton fermer */}
          <button 
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white bg-rose-700/80 hover:bg-rose-600 rounded-full p-1 sm:p-2 z-10 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Indicateur de progression */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
            {selectedImage}/56
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-2 sm:p-4 text-white">
      <div className="max-w-4xl w-full bg-gradient-to-br from-rose-900/40 via-purple-900/40 to-indigo-900/40 backdrop-blur-lg border border-rose-700/50 rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-6 shadow-2xl animate-gradient-x">
        <style>
          {`
            @keyframes gradient-x {
              0%, 100% { background-size: 200% 200%; background-position: left center; }
              50% { background-size: 200% 200%; background-position: right center; }
            }
            .animate-gradient-x {
              animation: gradient-x 8s ease infinite;
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            @keyframes pulse-border {
              0% { box-shadow: 0 0 0 0 rgba(251, 146, 146, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(251, 146, 146, 0); }
              100% { box-shadow: 0 0 0 0 rgba(251, 146, 146, 0); }
            }
            .animate-pulse-border {
              animation: pulse-border 2s infinite;
            }
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translate3d(0, 100%, 0);
              }
              to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
              }
            }
            .animate-fade-in-up {
              animation: fadeInUp 0.5s ease-out forwards;
            }
            @keyframes fadeOutDown {
              from {
                opacity: 1;
                transform: translate3d(0, 0, 0);
              }
              to {
                opacity: 0;
                transform: translate3d(0, 100%, 0);
              }
            }
            .animate-fade-out-down {
              animation: fadeOutDown 0.5s ease-out forwards;
            }
          `}
        </style>
        
        <div className="text-center mb-4 sm:mb-6 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 mb-1 sm:mb-2 md:mb-4 animate-pulse">
            Joyeux Anniversaire, mon Éphèse !
          </h1>
          <p className="text-xs sm:text-sm md:text-xl text-rose-100 max-w-2xl mx-auto px-2">
            Une journée spéciale pour celle qui illumine mes jours
          </p>
        </div>

        {/* Compteur à rebours avec cadeau animé */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 md:gap-4 mb-4 sm:mb-6 md:mb-10">
          <div className="bg-gradient-to-br from-rose-800/50 to-purple-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-rose-600/30 backdrop-blur-sm">
            <div className="text-lg sm:text-xl md:text-4xl font-bold text-rose-200">{timeLeft.days}</div>
            <div className="text-xs sm:text-sm md:text-sm text-rose-100">Jours</div>
          </div>
          <div className="bg-gradient-to-br from-rose-800/50 to-purple-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-rose-600/30 backdrop-blur-sm">
            <div className="text-lg sm:text-xl md:text-4xl font-bold text-rose-200">{timeLeft.hours}</div>
            <div className="text-xs sm:text-sm md:text-sm text-rose-100">Heures</div>
          </div>
          <div className="bg-gradient-to-br from-rose-800/50 to-purple-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-rose-600/30 backdrop-blur-sm">
            <div className="text-lg sm:text-xl md:text-4xl font-bold text-rose-200">{timeLeft.minutes}</div>
            <div className="text-xs sm:text-sm md:text-sm text-rose-100">Minutes</div>
          </div>
          <div className="bg-gradient-to-br from-rose-800/50 to-purple-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-rose-600/30 backdrop-blur-sm">
            <div className="text-lg sm:text-xl md:text-4xl font-bold text-rose-200">{timeLeft.seconds}</div>
            <div className="text-xs sm:text-sm md:text-sm text-rose-100">Secondes</div>
          </div>
        </div>

        {/* Cadeau animé qui s'affiche pendant le compteur */}
        {!showLetter && (
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-10">
            <div 
              className="relative cursor-pointer"
              onClick={() => setGiftMessage(true)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full animate-bounce flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 md:w-32 h-2 sm:h-3 md:h-4 bg-rose-700 rounded-full"></div>
              
              {/* Message au clic sur le cadeau - version toast avec disparition automatique */}
              {giftMessage && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gradient-to-r from-rose-700/90 to-purple-700/90 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-xl border border-rose-400/30 animate-fade-in-up">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-rose-300 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    <span className="font-cursive text-xs sm:text-sm md:text-base">Le cadeau s'ouvrira bientôt...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Message spécial - s'affiche après le compteur ou si c'est le jour de l'anniversaire */}
        {(showLetter || isAnniversaryDay) && (
          <div className="mb-4 sm:mb-6 md:mb-10 relative">
            {/* Enveloppe animée */}
            <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
              <div className="relative w-20 h-16 sm:w-24 sm:h-18 md:w-32 md:h-24 bg-gradient-to-br from-rose-400 to-purple-500 rounded-lg transform rotate-3 animate-pulse shadow-lg">
                <div className="absolute top-0 left-0 w-full h-6 sm:h-8 md:h-12 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-lg transform origin-bottom -skew-x-12"></div>
                <div className="absolute top-0 right-0 w-full h-6 sm:h-8 md:h-12 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-lg transform origin-bottom skew-x-12"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-3 sm:h-4 md:h-8 bg-yellow-300"></div>
              </div>
            </div>
            
            <div 
              className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Arrière-plan avec dégradé animé */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 animate-gradient-x opacity-90"></div>
              
              {/* Image en filigrane */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: "url('/image11.jpg')" }}
              ></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm border border-rose-200 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-8">
                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-3xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 mb-1 sm:mb-2">
                    Un message spécial pour ton anniversaire
                  </h2>
                  <div className="w-12 sm:w-16 md:w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full"></div>
                </div>
                
                <div className="prose prose-rose max-w-none">
                  <p className="text-rose-800 text-sm sm:text-base md:text-lg leading-relaxed font-serif">
                    Mon Éphèse,<br /><br />
                    En ce jour si spécial, je voulais te dire à quel point ta présence illumine ma vie. 
                    Chaque lettre que je t'ai écrite témoigne de l'amour profond que j'ai pour toi. 
                    Tu es cette lumière qui guide mes pas, cette étoile brillante dans mon ciel.<br /><br />
                    Que cette nouvelle année t'apporte encore plus de bonheur, de paix et d'amour. 
                    Que chaque jour soit une bénédiction, et que tu continues à rayonner comme tu le fais si bien.<br /><br />
                    Merci d'être celle que tu es. Merci d'être mon Éphèse.<br /><br />
                    Avec tout mon amour,<br />
                    <span className="font-cursive text-base sm:text-lg md:text-xl text-rose-600">Ton compagnon de l'invisible</span>
                  </p>
                </div>
                
                {/* Cœur décoratif */}
                <div className="flex justify-center mt-3 sm:mt-4 md:mt-6">
                  <div className="text-rose-400 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bouton pour accéder à la galerie - protégé par la date */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          {isAnniversaryDay ? (
            <button 
              onClick={() => setShowGallery(true)}
              className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-medium rounded-lg sm:rounded-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 shadow-lg hover:shadow-rose-500/30 text-xs sm:text-sm md:text-base"
            >
              Explorer la galerie de souvenirs
            </button>
          ) : (
            <div className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-rose-800/50 to-purple-800/50 text-rose-200 font-medium rounded-lg sm:rounded-xl border border-rose-600/30 backdrop-blur-sm text-xs sm:text-sm md:text-base">
              La galerie sera déverrouillée le jour de l'anniversaire
            </div>
          )}
        </div>

        {/* Galerie spéciale - s'affiche au clic sur le bouton et seulement le jour de l'anniversaire */}
        {showGallery && isAnniversaryDay && (
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl md:text-3xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300">
                Galerie de souvenirs
              </h2>
              <button 
                onClick={() => setShowGallery(false)}
                className="px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 bg-gradient-to-r from-rose-700 to-purple-700 hover:from-rose-800 hover:to-purple-800 text-white rounded-lg sm:rounded-xl transition duration-200 shadow-md text-xs sm:text-sm md:text-base"
              >
                Fermer
              </button>
            </div>
            
            {/* Carrousel d'images en vedette avec flèches de contrôle - version améliorée */}
            <div className="mb-3 sm:mb-4 md:mb-6 relative overflow-hidden rounded-lg sm:rounded-xl bg-rose-900/20 p-2 sm:p-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-rose-200 text-xs sm:text-sm md:text-base">Image en vedette</div>
                <div className="text-rose-200 text-xs sm:text-sm">{currentSlide + 1}/56</div>
              </div>
              <div className="flex items-center justify-center">
                {/* Flèche gauche */}
                <button 
                  className="mr-2 sm:mr-3 md:mr-4 text-rose-200 hover:text-white p-1 sm:p-2 rounded-full hover:bg-rose-700/50 transition-colors"
                  onClick={prevSlide}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Image en vedette - avec bordures arrondies et animations */}
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-rose-400/50 animate-float"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                >
                  <img 
                    src={`/image${currentSlide + 1}.jpg`} 
                    alt={`Image en vedette ${currentSlide + 1}`} 
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 object-cover transition-all duration-500 animate-pulse-border"
                  />
                </div>
                
                {/* Flèche droite */}
                <button 
                  className="ml-2 sm:ml-3 md:ml-4 text-rose-200 hover:text-white p-1 sm:p-2 rounded-full hover:bg-rose-700/50 transition-colors"
                  onClick={nextSlide}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2 md:gap-4 max-h-48 sm:max-h-64 md:max-h-96 overflow-y-auto p-1 sm:p-2 bg-rose-900/20 rounded-lg sm:rounded-xl">
              {renderImageGallery()}
            </div>
          </div>
        )}

        {/* Bouton voir les lettres - protégé par la date et visible seulement si la galerie n'est pas affichée */}
        {!showGallery && (
          <div className="text-center mt-4 sm:mt-6 md:mt-10">
            {isAnniversaryDay ? (
              <button 
                onClick={() => {
                  // Cacher la section d'anniversaire et retourner à l'application principale
                  const event = new CustomEvent('returnToLetters');
                  window.dispatchEvent(event);
                }}
                className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-medium rounded-lg sm:rounded-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 shadow-lg hover:shadow-rose-500/30 text-xs sm:text-sm md:text-base"
              >
                Voir les lettres
              </button>
            ) : (
              <div className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-rose-800/50 to-purple-800/50 text-rose-200 font-medium rounded-lg sm:rounded-xl border border-rose-600/30 backdrop-blur-sm text-xs sm:text-sm md:text-base">
                Les lettres seront déverrouillées le jour de l'anniversaire
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Modal pour l'image agrandie */}
      {renderImageModal()}
    </div>
  );
};

export default AnniversarySection;