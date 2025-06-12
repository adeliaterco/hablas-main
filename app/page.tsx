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
      {/* CSS Inline Crítico - LAYOUT IDÊNTICO À IMAGEM */}
      <style jsx>{`
        .hero-container {
          background-image: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T112151.941.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        
        /* Overlay para melhor legibilidade */
        .hero-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          z-index: 1;
        }
        
        /* Container principal do conteúdo */
        .content-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem 1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* 5 ESTRELAS NO TOPO */
        .stars-section {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 1.5rem;
        }
        
        .star-black {
          color: #000;
          width: 20px;
          height: 20px;
        }
        
        /* DEPOIMENTO EXATO DA IMAGEM */
        .testimonial-section {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .testimonial-author {
          font-size: 1rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.5rem;
        }
        
        .testimonial-text {
          font-size: 1rem;
          color: #000;
          line-height: 1.4;
        }
        
        /* CAIXA CINZA PRINCIPAL */
        .main-card {
          background-color: #f5f5f5;
          border-radius: 12px;
          padding: 2.5rem 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
          width: 100%;
          max-width: 500px;
        }
        
        /* HEADLINE PRINCIPAL */
        .main-headline {
          font-size: 1.4rem;
          font-weight: 700;
          color: #000;
          line-height: 1.3;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        /* SUBTÍTULO */
        .sub-headline {
          font-size: 1rem;
          color: #000;
          margin-bottom: 2rem;
          font-weight: 400;
        }
        
        /* BOTÃO PRETO EXATO DA IMAGEM */
        .cta-button {
          background-color: #000 !important;
          color: white !important;
          padding: 1rem 2.5rem !important;
          font-size: 1rem !important;
          font-weight: 700 !important;
          border-radius: 8px !important;
          border: none !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          transition: all 0.2s ease !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }
        
        .cta-button:hover {
          background-color: #333 !important;
          transform: translateY(-1px) !important;
        }
        
        /* TEXTO DE CONFIDENCIALIDADE */
        .privacy-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.9rem;
          margin-top: 1.5rem;
        }
        
        .lock-icon {
          width: 16px;
          height: 16px;
          color: #666;
        }
        
        /* RESPONSIVIDADE */
        @media (max-width: 768px) {
          .hero-container {
            background-attachment: scroll;
          }
          
          .content-wrapper {
            padding: 1.5rem 1rem;
          }
          
          .main-card {
            padding: 2rem 1.5rem;
          }
          
          .main-headline {
            font-size: 1.2rem;
          }
          
          .cta-button {
            padding: 0.9rem 2rem !important;
            font-size: 0.9rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .stars-section {
            gap: 2px;
          }
          
          .star-black {
            width: 18px;
            height: 18px;
          }
          
          .main-headline {
            font-size: 1.1rem;
          }
          
          .sub-headline {
            font-size: 0.9rem;
          }
        }
      `}</style>

      {/* Container principal com background fixo */}
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

        {/* CONTEÚDO PRINCIPAL - LAYOUT EXATO DA IMAGEM */}
        <div className="content-wrapper">
          
          {/* 5 ESTRELAS NO TOPO */}
          <div className="stars-section">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="star-black" fill="currentColor" />
            ))}
          </div>

          {/* DEPOIMENTO */}
          <div className="testimonial-section">
            <div className="testimonial-author">
              Wand Henrique (@wandhenriqueoficial)
            </div>
            <div className="testimonial-text">
              "Fiz e refiz seu Quiz umas 30 vezes kkkkkkkkkk ficou insano!"
            </div>
          </div>

          {/* CAIXA CINZA PRINCIPAL */}
          <div className="main-card">
            
            {/* HEADLINE PRINCIPAL */}
            <h1 className="main-headline">
              Faço até perfis fracos venderem 100% no piloto automático.
            </h1>
            
            {/* SUBTÍTULO */}
            <p className="sub-headline">
              Sem truques, só o poder do método certo.
            </p>

            {/* BOTÃO CTA PRETO */}
            <Button
              onClick={handleStart}
              disabled={isLoading || !isOnline}
              className="cta-button"
            >
              {isLoading ? (
                <>
                  PREPARANDO...
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </>
              ) : (
                <>
                  COMEÇAR AGORA
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

          </div>

          {/* TEXTO DE CONFIDENCIALIDADE */}
          <div className="privacy-text">
            <Lock className="lock-icon" />
            Suas respostas são confidenciais e estão protegidas
          </div>

        </div>

      </div>
    </>
  );
}