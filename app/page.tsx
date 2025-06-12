"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Lock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

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
      {/* CSS Inline Crítico */}
      <style jsx>{`
        .hero-container {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        
        .testimonial-bubble {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: #000;
          border-radius: 20px;
          padding: 1.5rem;
          max-width: 320px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          z-index: 10;
        }
        
        .testimonial-bubble::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 30px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #000;
        }
        
        .stars-container {
          display: flex;
          gap: 2px;
          margin-bottom: 0.5rem;
        }
        
        .star-gold {
          color: #FFD700;
          width: 16px;
          height: 16px;
        }
        
        .user-name {
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        .testimonial-text {
          color: white;
          font-size: 0.85rem;
          line-height: 1.4;
        }
        
        .main-headline {
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 900;
          color: white;
          text-align: center;
          line-height: 1.1;
          margin: 2rem 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }
        
        .sub-headline {
          font-size: clamp(1rem, 3vw, 1.4rem);
          color: #ccc;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 300;
        }
        
        .cta-premium {
          background: linear-gradient(45deg, #dc2626, #ef4444) !important;
          color: white !important;
          padding: 1.2rem 3rem !important;
          font-size: 1.1rem !important;
          font-weight: bold !important;
          border-radius: 50px !important;
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4) !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          border: none !important;
        }
        
        .cta-premium:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 35px rgba(220, 38, 38, 0.6) !important;
        }
        
        .copyright-text {
          position: absolute;
          bottom: 1rem;
          right: 2rem;
          color: #888;
          font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
          .testimonial-bubble {
            top: 1rem;
            left: 1rem;
            right: 1rem;
            max-width: none;
          }
          
          .copyright-text {
            bottom: 0.5rem;
            right: 1rem;
            font-size: 0.7rem;
          }
        }
      `}</style>

      {/* Container principal */}
      <div className="hero-container">

        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="text-white text-xl mb-4">Preparando seu teste...</div>
              <div className="w-64 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="fixed top-4 left-4 right-4 bg-red-600 text-white p-4 rounded-lg z-40 flex items-center justify-between">
            {errorMessage}
            <button onClick={() => setErrorMessage("")} className="ml-2 font-bold">×</button>
          </div>
        )}

        {/* Offline indicator */}
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-yellow-600 text-white text-center p-2 z-40">
            Sin conexión a internet
          </div>
        )}

        {/* Depoimento - Canto Superior Esquerdo */}
        <div className="testimonial-bubble">
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

        {/* Conteúdo principal */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
          
          <Card className="w-full max-w-2xl bg-black/20 backdrop-blur-sm border-gray-700">
            <CardContent className="p-8 text-center">

              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-16 w-auto"
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
              <div className="mt-8">
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

              <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
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