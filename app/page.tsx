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
      {/* CSS Crítico Inline - PERFORMANCE EXTREMA */}
      <style jsx>{`
        /* Reset e base otimizada */
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Container hero com background FIXO otimizado */
        .hero-container {
          background-image: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T112151.941.png');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          min-height: 100dvh;
          position: relative;
          overflow-x: hidden;
          will-change: transform;
        }
        
        /* Desktop: manter background fixo */
        @media (min-width: 769px) {
          .hero-container {
            background-attachment: fixed;
          }
        }
        
        /* Mobile: background fixo também (iOS suporta com transform) */
        @media (max-width: 768px) {
          .hero-container {
            background-attachment: fixed;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
        }
        
        /* Container de conteúdo sem overlay branco */
        .content-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          min-height: 100dvh;
          padding: 1rem;
          max-width: 420px;
          margin: 0 auto;
          backdrop-filter: blur(1px);
        }
        
        /* 5 ESTRELAS - Douradas como na imagem */
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
        
        /* DEPOIMENTO - Caixa preta com avatar ARREDONDADO */
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
        
        /* CARD PRINCIPAL - Transparente com bordas */
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
        
        /* Efeito de brilho sutil */
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
        
        /* IMAGEM DO LIVRO PLAN A - ARREDONDADA */
        .book-image {
          width: 120px;
          height: auto;
          margin: 0 auto 1.5rem;
          display: block;
          border-radius: 12px;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        /* HEADLINE PRINCIPAL - Branca e impactante */
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
        
        /* SUBTÍTULO */
        .sub-headline {
          font-size: 1.1rem;
          color: #E0E0E0;
          margin-bottom: 0;
          font-weight: 400;
          line-height: 1.4;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
        }
        
        /* BOTÃO VERMELHO PULSANTE ARREDONDADO - Fora do container */
        .cta-button-container {
          width: 100%;
          max-width: 400px;
          margin-bottom: 1.5rem;
          animation: fadeInUp 1.4s ease-out 0.8s both;
        }
        
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.8rem !important;
          box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5) !important;
          position: relative !important;
          overflow: hidden !important;
          cursor: pointer !important;
          width: 100% !important;
          text-decoration: none !important;
          min-height: 60px !important;
          animation: pulse 2s infinite !important;
        }
        
        /* ANIMAÇÃO PULSANTE */
        @keyframes pulse {
          0% {
            box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 12px 35px rgba(255, 0, 0, 0.8);
            transform: scale(1.02);
          }
          100% {
            box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5);
            transform: scale(1);
          }
        }
        
        .cta-button:hover:not(:disabled) {
          background: #FF3333 !important;
          background-image: linear-gradient(135deg, #FF3333 0%, #FF0000 50%, #DC143C 100%) !important;
          transform: translateY(-3px) scale(1.05) !important;
          box-shadow: 0 15px 40px rgba(255, 0, 0, 0.8) !important;
          animation: none !important;
        }
        
        .cta-button:active {
          transform: translateY(-1px) scale(0.98) !important;
          box-shadow: 0 6px 20px rgba(255, 0, 0, 0.6) !important;
        }
        
        .cta-button:disabled {
          opacity: 0.8 !important;
          cursor: not-allowed !important;
          transform: none !important;
          animation: none !important;
        }
        
        /* Efeito de ripple no botão */
        .cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
          z-index: 0;
        }
        
        .cta-button:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .cta-button > * {
          position: relative;
          z-index: 1;
        }
        
        /* TEXTO DE CONFIDENCIALIDADE */
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
        
        /* LOADING OVERLAY PREMIUM */
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
          animation: progressShine 1.5s infinite;
        }
        
        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Spinner loading */
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
        
        /* ANIMAÇÕES DE ENTRADA */
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
        
        /* RESPONSIVIDADE MOBILE-FIRST */
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
            line-height: 1.3;
          }
          
          .sub-headline {
            font-size: 1rem;
          }
          
          .cta-button {
            padding: 1.1rem 2rem !important;
            font-size: 1rem !important;
            border-radius: 40px !important;
          }
          
          .cta-button-container {
            margin: 0 0.5rem 1rem;
          }
          
          .testimonial-section {
            padding: 1.2rem;
            margin: 0 0.5rem 1.5rem;
          }
          
          .testimonial-avatar {
            width: 50px;
            height: 50px;
          }
          
          .stars-section {
            gap: 4px;
            margin-bottom: 1rem;
          }
          
          .star-gold {
            width: 20px;
            height: 20px;
          }
          
          .book-image {
            width: 100px;
            margin-bottom: 1.2rem;
            border-radius: 10px;
          }
          
          .privacy-text {
            margin: 0 0.5rem;
            padding: 0.7rem 1rem;
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 360px) {
          .main-headline {
            font-size: 1.2rem;
          }
          
          .cta-button {
            padding: 1rem 1.5rem !important;
            font-size: 0.95rem !important;
            border-radius: 35px !important;
          }
          
          .book-image {
            width: 90px;
            border-radius: 8px;
          }
        }
        
        /* OTIMIZAÇÕES DE PERFORMANCE */
        .hero-container,
        .content-wrapper,
        .main-card {
          contain: layout style paint;
        }
        
        /* Preload crítico */
        .hero-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
          background-image: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T112151.941.png');
          opacity: 0;
          pointer-events: none;
        }
      `}</style>

      {/* Container principal sem overlay branco */}
      <div className="hero-container">

        {/* Loading overlay premium */}
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

        {/* Error message otimizado */}
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

        {/* Offline indicator */}
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

        {/* CONTEÚDO PRINCIPAL */}
        <div className="content-wrapper">
          
          {/* 5 ESTRELAS DOURADAS */}
          <div className="stars-section">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="star-gold" fill="currentColor" />
            ))}
          </div>

          {/* DEPOIMENTO EM CAIXA PRETA COM AVATAR ARREDONDADO */}
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

          {/* CARD PRINCIPAL TRANSPARENTE */}
          <div className="main-card">
            
            {/* IMAGEM DO LIVRO PLAN A - ARREDONDADA */}
            <img 
              src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png" 
              alt="Plan A - Método Secreto"
              className="book-image"
            />
            
            {/* HEADLINE PRINCIPAL */}
            <h1 className="main-headline">
              Faço até perfis fracos venderem 100% no piloto automático.
            </h1>
            
            {/* SUBTÍTULO */}
            <p className="sub-headline">
              Sem truques, só o poder do método certo.
            </p>

          </div>

          {/* BOTÃO CTA VERMELHO PULSANTE ARREDONDADO - FORA DO CONTAINER */}
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