"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Lock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"

// GA otimizado - só envia quando necessário
const enviarEvento = (() => {
  let queue = [];
  let timeout;
  
  return (evento, props = {}) => {
    queue.push({ evento, props });
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gtag && queue.length) {
        queue.forEach(({ evento, props }) => {
          window.gtag('event', evento, props);
        });
        queue = [];
      }
    }, 500);
  };
})();

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload crítico das imagens
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        'https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T112151.941.png',
        'https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png',
        'https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png'
      ];

      const promises = imageUrls.map(url => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = url;
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    if (typeof window !== 'undefined') {
      preloadImages();
    }
  }, []);

  // Detecção de conexão minimalista
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateOnlineStatus, { passive: true });
    window.addEventListener('offline', updateOnlineStatus, { passive: true });
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Tracking minimalista - só o essencial
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const timer = setTimeout(() => {
      enviarEvento('page_view', {
        device: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Função de início ultra-otimizada
  const handleStart = useCallback(() => {
    if (isLoading || !isOnline) return;

    setIsLoading(true);
    setLoadingProgress(20);
    
    enviarEvento('quiz_start');

    let progress = 20;
    const interval = setInterval(() => {
      progress += 15;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Preservar UTMs
        let url = '/quiz/1';
        if (typeof window !== 'undefined' && window.location.search) {
          const params = new URLSearchParams(window.location.search);
          const utms = new URLSearchParams();
          
          for (const [key, value] of params) {
            if (key.startsWith('utm_')) utms.set(key, value);
          }
          
          if (utms.toString()) url += `?${utms.toString()}`;
        }
        
        router.push(url);
      }
    }, 200);

  }, [isLoading, isOnline, router]);

  return (
    <>
      {/* CSS Inline Crítico - FUNDO PRETO TOTAL */}
      <style jsx>{`
        .hero-container {
          background: #000000;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        
        /* FUNDO ARTÍSTICO - SEM BLUR, SEM EMBAÇADO */
        .artistic-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T112151.941.png');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          opacity: 0.3;
          z-index: 1;
        }
        
        .artistic-bg::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 100%);
          z-index: 2;
        }
        
        /* PARTÍCULAS DE LUZ DOURADAS */
        .light-particles {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFD700;
          border-radius: 50%;
          opacity: 0.9;
          animation: float 4s ease-in-out infinite;
          z-index: 3;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
        }
        
        .particle-1 { 
          bottom: 25%; 
          right: 10%; 
          animation-delay: 0s; 
        }
        .particle-2 { 
          bottom: 45%; 
          right: 20%; 
          animation-delay: 1.5s; 
        }
        .particle-3 { 
          bottom: 65%; 
          left: 15%; 
          animation-delay: 3s; 
        }
        .particle-4 { 
          top: 30%; 
          left: 20%; 
          animation-delay: 2s; 
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.9; 
          }
          50% { 
            transform: translateY(-25px) scale(1.3); 
            opacity: 1; 
          }
        }
        
        /* DEPOIMENTO - FUNDO PRETO SÓLIDO */
        .testimonial-bubble {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          background: #000000;
          border: 2px solid #FFD700;
          border-radius: 20px;
          padding: 1rem;
          box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3);
          z-index: 15;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          max-width: 100%;
        }
        
        .testimonial-bubble::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 2rem;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #000000;
        }
        
        /* AVATAR OTIMIZADO E REDONDO */
        .testimonial-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-image: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 3px solid #FFD700;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.5);
        }
        
        .testimonial-content {
          flex: 1;
          min-width: 0;
        }
        
        .stars-container {
          display: flex;
          gap: 2px;
          margin-bottom: 0.25rem;
          justify-content: flex-start;
        }
        
        .star-gold {
          color: #FFD700;
          width: 14px;
          height: 14px;
        }
        
        .user-name {
          color: #FFD700;
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }
        
        .testimonial-text {
          color: #FFFFFF;
          font-size: 0.8rem;
          line-height: 1.3;
          font-weight: 400;
        }
        
        /* HEADLINES - TEXTO NÍTIDO SEM EMBAÇADO */
        .main-headline {
          font-size: clamp(1.8rem, 8vw, 2.8rem);
          font-weight: 900;
          color: #FFFFFF;
          text-align: center;
          line-height: 1.1;
          margin: 1.5rem 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }
        
        .sub-headline {
          font-size: clamp(0.95rem, 4vw, 1.2rem);
          color: #CCCCCC;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 400;
          line-height: 1.4;
        }
        
        /* LOGO OTIMIZADO */
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          position: relative;
        }
        
        .logo-image {
          height: 60px;
          width: auto;
          max-width: 200px;
          object-fit: contain;
          filter: drop-shadow(0 4px 15px rgba(255, 215, 0, 0.4));
        }
        
        /* CTA BUTTON - DOURADO E PRETO */
        .cta-premium {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%) !important;
          color: #000000 !important;
          padding: 1rem 2.5rem !important;
          font-size: 1rem !important;
          font-weight: 800 !important;
          border-radius: 50px !important;
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          border: 2px solid #FFD700 !important;
          transition: all 0.3s ease !important;
          width: 100% !important;
          max-width: 300px !important;
        }
        
        .cta-premium:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.6) !important;
          background: #FFD700 !important;
        }
        
        /* CARD - FUNDO PRETO SÓLIDO */
        .main-card {
          background: #000000 !important;
          border: 2px solid #333333 !important;
          border-radius: 25px !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8) !important;
        }
        
        .card-content {
          padding: 2rem 1.5rem !important;
        }
        
        /* SECURITY BADGE */
        .security-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #CCCCCC;
          font-size: 0.8rem;
          margin-top: 1.5rem;
          padding: 0.75rem;
          background: #111111;
          border-radius: 15px;
          border: 1px solid #333333;
        }
        
        /* COPYRIGHT */
        .copyright-text {
          position: absolute;
          bottom: 0.5rem;
          left: 50%;
          transform: translateX(-50%);
          color: #888888;
          font-size: 0.7rem;
          z-index: 10;
          text-align: center;
          width: 100%;
          padding: 0 1rem;
        }
        
        /* LOADING - FUNDO PRETO */
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        
        .loading-content {
          text-align: center;
          padding: 2rem;
        }
        
        .loading-text {
          color: #FFFFFF;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        
        .progress-bar {
          width: 280px;
          height: 6px;
          background: #333333;
          border-radius: 10px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FFD700, #FFA500);
          border-radius: 10px;
          transition: width 0.3s ease;
        }
        
        /* RESPONSIVO TABLET */
        @media (min-width: 768px) {
          .artistic-bg {
            width: 70%;
            right: 0;
            left: auto;
            opacity: 0.4;
          }
          
          .testimonial-bubble {
            top: 2rem;
            left: 2rem;
            right: auto;
            max-width: 350px;
          }
          
          .card-content {
            padding: 2.5rem !important;
          }
          
          .cta-premium {
            width: auto !important;
            padding: 1.2rem 3rem !important;
            font-size: 1.1rem !important;
          }
        }
        
        /* RESPONSIVO DESKTOP */
        @media (min-width: 1024px) {
          .artistic-bg {
            width: 60%;
            opacity: 0.5;
          }
          
          .testimonial-bubble {
            max-width: 400px;
          }
        }
      `}</style>

      {/* Container principal */}
      <div className="hero-container">

        {/* FUNDO ARTÍSTICO - SEM BLUR */}
        <div className="artistic-bg"></div>
        
        {/* PARTÍCULAS DE LUZ DOURADAS */}
        <div className="light-particles particle-1"></div>
        <div className="light-particles particle-2"></div>
        <div className="light-particles particle-3"></div>
        <div className="light-particles particle-4"></div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-text">Preparando seu teste...</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="fixed top-4 left-4 right-4 bg-red-600 text-white p-4 rounded-2xl z-50 flex items-center justify-between border border-red-500">
            <span className="font-medium">{errorMessage}</span>
            <button 
              onClick={() => setErrorMessage("")} 
              className="ml-2 font-bold text-xl hover:bg-red-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {/* Offline indicator */}
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-yellow-600 text-white text-center p-3 z-50 font-medium">
            ⚠️ Sem conexão com a internet
          </div>
        )}

        {/* DEPOIMENTO COM FOTO */}
        <div className="testimonial-bubble">
          {/* FOTO DO AVATAR */}
          <div className="testimonial-avatar"></div>
          
          {/* CONTEÚDO DO DEPOIMENTO */}
          <div className="testimonial-content">
            <div className="stars-container">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-gold" fill="currentColor" />
              ))}
            </div>
            <div className="user-name">
              Wand Henrique (@wandhenriqueoficial)
            </div>
            <div className="testimonial-text">
              "Fiz e refiz seu Quiz umas 30 vezes kkkkkkkkk ficou insano!"
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-16">
          
          <Card className="w-full max-w-2xl main-card">
            <CardContent className="card-content text-center">

              {/* Logo */}
              <div className="logo-container">
                <Image
                  src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
                  alt="Logo Plan A"
                  width={200}
                  height={60}
                  className="logo-image"
                  priority
                  quality={100}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Headlines - TEXTO NÍTIDO */}
              <div className="space-y-4">
                <h1 className="main-headline">
                  Faço até perfis fracos venderem 100% no piloto automático.
                </h1>
                
                <p className="sub-headline">
                  Sem truques, só o poder do método certo.
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleStart}
                  disabled={isLoading || !isOnline}
                  className="cta-premium"
                  size="lg"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      PREPARANDO...
                      <div className="ml-2 w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      COMEÇAR AGORA
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Security Badge */}
              <div className="security-badge">
                <Lock className="h-4 w-4 mr-2" />
                Suas respostas são confidenciais e estão protegidas
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Copyright */}
        <div className="copyright-text">
          Bel Fada™ Todos os Direitos Reservados.
        </div>

      </div>
    </>
  );
}