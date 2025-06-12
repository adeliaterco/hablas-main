"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Lock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Head from "next/head"

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
    
    // Delay para não bloquear renderização
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

    // Animação de progresso eficiente
    let progress = 20;
    const interval = setInterval(() => {
      progress += 15;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Preservar UTMs
        let url = '/quiz/1';
        if (window.location.search) {
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
      <Head>
        {/* CRÍTICO: Preload das imagens com alta prioridade */}
        <link rel="preload" href="/logo.png" as="image" fetchPriority="high" />
        <link rel="preload" href="/main-image.jpg" as="image" fetchPriority="high" />
        
        {/* DNS otimizado */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />
        
        {/* Meta essencial */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        
        {/* Inline CSS crítico para evitar FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* CSS CRÍTICO INLINE - BEL FADA STYLE */
            .hero-container {
              background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
              min-height: 100vh;
              position: relative;
              overflow: hidden;
            }
            
            .artistic-bg {
              position: absolute;
              top: 0;
              right: 0;
              width: 60%;
              height: 100%;
              background: url('/artistic-portrait.jpg') no-repeat center;
              background-size: cover;
              opacity: 0.3;
              filter: grayscale(100%) contrast(1.2);
            }
            
            .artistic-bg::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: radial-gradient(circle at 70% 30%, transparent 20%, rgba(0,0,0,0.8) 70%);
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
              font-size: clamp(2.5rem, 8vw, 4.5rem);
              font-weight: 900;
              color: white;
              text-align: center;
              line-height: 1.1;
              margin: 2rem 0;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            }
            
            .sub-headline {
              font-size: clamp(1.2rem, 4vw, 1.8rem);
              color: #ccc;
              text-align: center;
              margin-bottom: 3rem;
              font-weight: 300;
            }
            
            .cta-button-premium {
              background: linear-gradient(45deg, #dc2626, #ef4444);
              color: white;
              border: none;
              padding: 1.2rem 3rem;
              font-size: 1.3rem;
              font-weight: bold;
              border-radius: 50px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            
            .cta-button-premium:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 35px rgba(220, 38, 38, 0.6);
            }
            
            .copyright-text {
              position: absolute;
              bottom: 1rem;
              right: 2rem;
              color: #888;
              font-size: 0.8rem;
            }
            
            .light-particles {
              position: absolute;
              width: 4px;
              height: 4px;
              background: #FFD700;
              border-radius: 50%;
              opacity: 0.6;
              animation: float 3s ease-in-out infinite;
            }
            
            .particle-1 { bottom: 20%; right: 15%; animation-delay: 0s; }
            .particle-2 { bottom: 40%; right: 25%; animation-delay: 1s; }
            .particle-3 { bottom: 60%; left: 10%; animation-delay: 2s; }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
              50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
            }
            
            @media (max-width: 768px) {
              .testimonial-bubble {
                top: 1rem;
                left: 1rem;
                right: 1rem;
                max-width: none;
              }
              
              .artistic-bg {
                width: 100%;
                opacity: 0.2;
              }
              
              .copyright-text {
                bottom: 0.5rem;
                right: 1rem;
                font-size: 0.7rem;
              }
            }
          `
        }} />
      </Head>

      {/* Container principal - BEL FADA DESIGN */}
      <div className="hero-container">
        
        {/* Fundo artístico */}
        <div className="artistic-bg"></div>
        
        {/* Partículas de luz */}
        <div className="light-particles particle-1"></div>
        <div className="light-particles particle-2"></div>
        <div className="light-particles particle-3"></div>

        {/* Loading overlay otimizado */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-xl mb-4 font-semibold">Preparando seu teste...</div>
              <div className="w-64 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-full transition-all duration-300 ease-out rounded-full"
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
          
          <Card className="w-full max-w-2xl bg-black/20 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardContent className="p-8 text-center">

              {/* Logo - OTIMIZADO PARA LCP */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-16 w-auto object-contain"
                    width={200}
                    height={64}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      contentVisibility: 'visible',
                      contain: 'layout style paint'
                    }}
                    onLoad={() => console.log('Logo carregado')}
                    onError={(e) => {
                      console.error('Erro ao carregar logo');
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Headline Principal - Estilo Bel Fada */}
              <div className="space-y-6">
                <h1 className="main-headline">
                  Faço até perfis fracos venderem 100% no piloto automático.
                </h1>
                
                <p className="sub-headline">
                  Sem truques, só o poder do método certo.
                </p>
              </div>

              {/* CTA Button - Otimizado */}
              <div className="mt-8">
                <Button
                  onClick={handleStart}
                  disabled={isLoading || !isOnline}
                  className="cta-button-premium"
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

        {/* Copyright - Canto Inferior Direito */}
        <div className="copyright-text">
          Bel Fada™ Todos os Direitos Reservados.
        </div>

      </div>

      {/* Script crítico inline - OTIMIZAÇÃO MÁXIMA */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Otimizar imagens críticas
            document.querySelectorAll('img[src*="logo"], img[src*="main"]').forEach(img => {
              // Forçar prioridade máxima
              img.fetchPriority = 'high';
              img.loading = 'eager';
              img.decoding = 'sync';
              
              // Otimizar renderização
              img.style.contentVisibility = 'visible';
              img.style.contain = 'layout style paint';
              
              // Preload se não carregou
              if (!img.complete) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.href = img.src;
                preloadLink.as = 'image';
                preloadLink.fetchPriority = 'high';
                document.head.appendChild(preloadLink);
              }
            });
            
            // Prefetch da próxima página após 3s
            setTimeout(() => {
              const prefetchLink = document.createElement('link');
              prefetchLink.rel = 'prefetch';
              prefetchLink.href = '/quiz/1';
              document.head.appendChild(prefetchLink);
            }, 3000);
            
            // Otimizar Web Vitals
            if ('PerformanceObserver' in window) {
              try {
                new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  entries.forEach(entry => {
                    if (entry.startTime > 2500) {
                      console.warn('LCP lento:', entry.startTime + 'ms', entry.element);
                    }
                  });
                }).observe({type: 'largest-contentful-paint', buffered: true});
              } catch(e) {}
            }
          })();
        `
      }} />
    </>
  );
}