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
      {/* CSS Inline Crítico - MOBILE FIRST */}
      <style jsx>{`
        .hero-container {
          background: #000000;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        
        /* DEPOIMENTO MOBILE FIRST */
        .testimonial-bubble {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 1rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8);
          z-index: 15;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          max-width: 100%;
        }
        
        .testimonial-bubble::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 2rem;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #000000;
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
          border: 2px solid #FFD700;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .testimonial-avatar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.1) 50%, transparent 70%);
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .testimonial-content {
          flex: 1;
          min-width: 0;
        }
        
        .stars-container {
          display: flex;
          gap: 1px;
          margin-bottom: 0.25rem;
          justify-content: flex-start;
        }
        
        .star-gold {
          color: #FFD700;
          width: 12px;
          height: 12px;
          filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
        }
        
        .user-name {
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          font-size: 0.8rem;
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }
        
        .testimonial-text {
          color: #ffffff;
          font-size: 0.75rem;
          line-height: 1.3;
          font-weight: 400;
        }
        
        /* HEADLINES MOBILE FIRST */
        .main-headline {
          font-size: clamp(1.8rem, 8vw, 2.8rem);
          font-weight: 900;
          color: #ffffff;
          text-align: center;
          line-height: 1.1;
          margin: 1.5rem 0;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.9);
        }
        
        .sub-headline {
          font-size: clamp(0.95rem, 4vw, 1.2rem);
          color: #ffffff;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 300;
          line-height: 1.4;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
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
          filter: drop-shadow(0 4px 15px rgba(255, 215, 0, 0.3));
          transition: all 0.3s ease;
        }
        
        .logo-image:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 6px 20px rgba(255, 215, 0, 0.5));
        }
        
        /* CTA BUTTON PREMIUM PULSANTE */
        .cta-premium {
          background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #dc2626 100%) !important;
          color: white !important;
          padding: 1rem 2.5rem !important;
          font-size: 1rem !important;
          font-weight: 800 !important;
          border-radius: 50px !important;
          box-shadow: 
            0 8px 25px rgba(220, 38, 38, 0.4),
            inset 0 1px 0 rgba(255,255,255,0.2) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          border: none !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative !important;
          overflow: hidden !important;
          width: 100% !important;
          max-width: 300px !important;
          animation: pulse-red 2s infinite !important;
        }
        
        @keyframes pulse-red {
          0% {
            transform: scale(1);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(220, 38, 38, 0.7);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
          }
        }
        
        .cta-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .cta-premium:hover::before {
          left: 100%;
        }
        
        .cta-premium:hover {
          transform: translateY(-3px) scale(1.08) !important;
          box-shadow: 
            0 20px 50px rgba(220, 38, 38, 0.8),
            inset 0 1px 0 rgba(255,255,255,0.3) !important;
          animation: none !important;
        }
        
        .cta-premium:active {
          transform: translateY(-1px) scale(1.02) !important;
        }
        
        /* CARD OTIMIZADO */
        .main-card {
          background: #000000 !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
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
          color: #ffffff;
          font-size: 0.8rem;
          margin-top: 1.5rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* COPYRIGHT */
        .copyright-text {
          position: absolute;
          bottom: 0.5rem;
          left: 50%;
          transform: translateX(-50%);
          color: #ffffff;
          font-size: 0.7rem;
          z-index: 10;
          text-align: center;
          width: 100%;
          padding: 0 1rem;
        }
        
        /* LOADING OTIMIZADO */
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
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
          color: white;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        
        .progress-bar {
          width: 280px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #dc2626, #ef4444);
          border-radius: 10px;
          transition: width 0.3s ease;
          position: relative;
        }
        
        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: progressShimmer 1.5s infinite;
        }
        
        @keyframes progressShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* RESPONSIVO TABLET */
        @media (min-width: 768px) {
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
          .testimonial-bubble {
            max-width: 400px;
          }
        }
        
        /* OTIMIZAÇÕES DE PERFORMANCE */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .hero-container * {
          will-change: auto;
        }
        
        .cta-premium {
          will-change: transform, box-shadow;
        }
      `}</style>

      {/* Container principal */}
      <div className="hero-container">

        {/* Loading overlay otimizado */}
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

        {/* Error message otimizado */}
        {errorMessage && (
          <div className="fixed top-4 left-4 right-4 bg-red-600/90 backdrop-blur-sm text-white p-4 rounded-2xl z-50 flex items-center justify-between border border-red-500/30">
            <span className="font-medium">{errorMessage}</span>
            <button 
              onClick={() => setErrorMessage("")} 
              className="ml-2 font-bold text-xl hover:bg-red-700/50 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {/* Offline indicator otimizado */}
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-yellow-600/90 backdrop-blur-sm text-white text-center p-3 z-50 font-medium">
            ⚠️ Sem conexão com a internet
          </div>
        )}

        {/* DEPOIMENTO COM FOTO - Otimizado */}
        <div className="testimonial-bubble">
          {/* FOTO DO AVATAR OTIMIZADA */}
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

              {/* Logo Otimizado */}
              <div className="logo-container">
                <Image
                  src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
                  alt="Logo Plan A"
                  width={200}
                  height={60}
                  className="logo-image"
                  priority
                  quality={90}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Headlines */}
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
                      <div className="ml-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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