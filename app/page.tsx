"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Lock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// GA otimizado com queue inteligente
const enviarEvento = (() => {
  let queue = [];
  let timeout;
  
  return (evento, props = {}) => {
    queue.push({ evento, props, timestamp: Date.now() });
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gtag && queue.length) {
        queue.forEach(({ evento, props }) => {
          window.gtag('event', evento, {
            ...props,
            engagement_time_msec: Date.now() - props.timestamp
          });
        });
        queue = [];
      }
    }, 300);
  };
})();

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [viewTime, setViewTime] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);

  // Tracking de engajamento avançado
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const startTime = Date.now();
    let maxScroll = 0;
    
    const trackScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        setScrollDepth(scrollPercent);
      }
    };
    
    const trackTime = setInterval(() => {
      setViewTime(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    
    window.addEventListener('scroll', trackScroll, { passive: true });
    
    // Tracking inicial
    enviarEvento('page_view', {
      device: window.innerWidth < 768 ? 'mobile' : 'desktop',
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      timestamp: startTime
    });
    
    return () => {
      clearInterval(trackTime);
      window.removeEventListener('scroll', trackScroll);
      
      // Evento de saída
      enviarEvento('page_exit', {
        time_on_page: Math.round((Date.now() - startTime) / 1000),
        max_scroll_depth: maxScroll
      });
    };
  }, []);

  // Detecção de conexão otimizada
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      if (!online) {
        setErrorMessage("Conexão perdida. Verifique sua internet.");
      } else if (errorMessage.includes("Conexão")) {
        setErrorMessage("");
      }
    };
    
    window.addEventListener('online', updateOnlineStatus, { passive: true });
    window.addEventListener('offline', updateOnlineStatus, { passive: true });
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [errorMessage]);

  // Função de início com micro-animações persuasivas
  const handleStart = useCallback(() => {
    if (isLoading || !isOnline) return;

    setIsLoading(true);
    setLoadingProgress(25);
    
    enviarEvento('quiz_start_attempt', {
      time_on_page: viewTime,
      scroll_depth: scrollDepth,
      device: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop'
    });

    let progress = 25;
    const interval = setInterval(() => {
      progress += 18;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Preservar UTMs e adicionar tracking
        let url = '/quiz/1';
        if (typeof window !== 'undefined' && window.location.search) {
          const params = new URLSearchParams(window.location.search);
          const utms = new URLSearchParams();
          
          for (const [key, value] of params) {
            if (key.startsWith('utm_')) utms.set(key, value);
          }
          
          // Adicionar dados de engajamento
          utms.set('engagement_time', viewTime.toString());
          utms.set('scroll_depth', scrollDepth.toString());
          
          if (utms.toString()) url += `?${utms.toString()}`;
        }
        
        enviarEvento('quiz_start_success');
        router.push(url);
      }
    }, 180);

  }, [isLoading, isOnline, router, viewTime, scrollDepth]);

  return (
    <>
      {/* CSS Crítico - APENAS AS 3 MUDANÇAS SOLICITADAS */}
      <style jsx>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* 1. BACKGROUND FIXO */
        .hero-container {
          background-image: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T112151.941.png');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        .content-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 1rem;
          max-width: 420px;
          margin: 0 auto;
          backdrop-filter: blur(1px);
        }
        
        .stars-section {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 1.5rem;
          animation: fadeInUp 0.6s ease-out;
        }
        
        .star-gold {
          color: #FFD700;
          width: 24px;
          height: 24px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          transition: transform 0.2s ease;
        }
        
        .star-gold:hover {
          transform: scale(1.1);
        }
        
        .testimonial-section {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: fadeInUp 0.8s ease-out 0.2s both;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          position: relative;
        }
        
        .testimonial-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 auto 1rem;
          border: 3px solid #FFD700;
          object-fit: cover;
          display: block;
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }
        
        .testimonial-author {
          font-size: 1rem;
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 0.8rem;
          letter-spacing: 0.5px;
        }
        
        .testimonial-text {
          font-size: 1rem;
          color: #FFFFFF;
          line-height: 1.5;
          font-style: italic;
        }
        
        .main-card {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(15px);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          margin-bottom: 2rem;
          text-align: center;
          width: 100%;
          max-width: 400px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          animation: fadeInUp 1s ease-out 0.4s both;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
          position: relative;
          overflow: hidden;
        }
        
        .main-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        /* 2. IMAGEM PLAN A ARREDONDADA */
        .book-image {
          width: 120px;
          height: auto;
          margin: 0 auto 1.5rem;
          display: block;
          border-radius: 15px;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .main-headline {
          font-size: 1.5rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.2;
          margin-bottom: 1.2rem;
          text-align: center;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          letter-spacing: -0.5px;
        }
        
        .sub-headline {
          font-size: 1.1rem;
          color: #E0E0E0;
          margin-bottom: 0;
          font-weight: 400;
          line-height: 1.4;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
        }
        
        .cta-button-container {
          width: 100%;
          max-width: 400px;
          margin-bottom: 1.5rem;
          animation: fadeInUp 1.4s ease-out 0.8s both;
        }
        
        /* 3. BOTÃO VERMELHO PULSANTE ARREDONDADO */
        .cta-button {
          background: #FF0000 !important;
          background-image: linear-gradient(135deg, #FF0000 0%, #DC143C 50%, #B22222 100%) !important;
          color: #FFFFFF !important;
          padding: 1.3rem 3rem !important;
          font-size: 1.1rem !important;
          font-weight: 800 !important;
          border-radius: 50px !important;
          border: none !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          transition: all 0.3s ease !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.8rem !important;
          box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5) !important;
          position: relative !important;
          cursor: pointer !important;
          width: 100% !important;
          min-height: 60px !important;
          animation: buttonPulse 2s infinite !important;
        }
        
        @keyframes buttonPulse {
          0% {
            box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5);
          }
          50% {
            box-shadow: 0 12px 35px rgba(255, 0, 0, 0.8);
          }
          100% {
            box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5);
          }
        }
        
        .cta-button:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 15px 40px rgba(255, 0, 0, 0.8) !important;
          animation: none !important;
        }
        
        .cta-button:disabled {
          opacity: 0.8 !important;
          cursor: not-allowed !important;
          animation: none !important;
        }
        
        .privacy-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #CCCCCC;
          font-size: 0.9rem;
          background: rgba(0, 0, 0, 0.6);
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          backdrop-filter: blur(5px);
          animation: fadeInUp 1.6s ease-out 1s both;
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        
        .lock-icon {
          width: 16px;
          height: 16px;
          color: #FFD700;
          flex-shrink: 0;
        }
        
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(10px);
        }
        
        .loading-content {
          text-align: center;
          color: white;
          max-width: 300px;
          padding: 2rem;
        }
        
        .loading-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #FFD700;
        }
        
        .progress-bar {
          width: 280px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF0000, #FFD700);
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile */
        @media (max-width: 480px) {
          .content-wrapper {
            padding: 0.8rem;
            max-width: 100%;
          }
          
          .main-card {
            padding: 2rem 1.5rem;
            margin: 0 0.5rem 1.5rem;
          }
          
          .main-headline {
            font-size: 1.3rem;
          }
          
          .cta-button {
            padding: 1.1rem 2rem !important;
            font-size: 1rem !important;
            border-radius: 40px !important;
          }
          
          .book-image {
            width: 100px;
            border-radius: 12px;
          }
        }
      `}</style>

      <div className="hero-container">

        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-title">Preparando Seu Método Secreto...</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div style={{ color: '#CCCCCC', fontSize: '0.9rem' }}>
                {loadingProgress < 50 ? 'Analisando seu perfil...' :
                 loadingProgress < 80 ? 'Preparando estratégias...' :
                 'Quase pronto...'}
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            right: '1rem',
            background: 'linear-gradient(135deg, #FF0000, #CC0000)',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(255, 0, 0, 0.3)'
          }}>
            {errorMessage}
            <button 
              onClick={() => setErrorMessage("")} 
              style={{ 
                marginLeft: '0.5rem', 
                fontWeight: 'bold',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >×</button>
          </div>
        )}

        {!isOnline && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
            color: 'white',
            textAlign: 'center',
            padding: '0.5rem',
            zIndex: 9998,
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            ⚠️ Sem conexão - Verifique sua internet
          </div>
        )}

        <div className="content-wrapper">
          
          <div className="stars-section">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="star-gold" fill="currentColor" />
            ))}
          </div>

          <div className="testimonial-section">
            <img 
              src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png" 
              alt="Wand Henrique"
              className="testimonial-avatar"
            />
            <div className="testimonial-author">
              Wand Henrique (@wandhenriqueoficial)
            </div>
            <div className="testimonial-text">
              "Fiz e refiz seu Quiz umas 30 vezes kkkkkkkkkk ficou insano!"
            </div>
          </div>

          <div className="main-card">
            
            <img 
              src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png" 
              alt="Plan A - Método Secreto"
              className="book-image"
            />
            
            <h1 className="main-headline">
              Faço até perfis fracos venderem 100% no piloto automático.
            </h1>
            
            <p className="sub-headline">
              Sem truques, só o poder do método certo.
            </p>

          </div>

          <div className="cta-button-container">
            <Button
              onClick={handleStart}
              disabled={isLoading || !isOnline}
              className="cta-button"
            >
              {isLoading ? (
                <>
                  PREPARANDO...
                  <div className="spinner" />
                </>
              ) : (
                <>
                  COMEÇAR AGORA
                  <ArrowRight style={{ width: '18px', height: '18px' }} />
                </>
              )}
            </Button>
          </div>

          <div className="privacy-text">
            <Lock className="lock-icon" />
            Suas respostas são confidenciais e estão protegidas
          </div>

        </div>

      </div>
    </>
  );
}