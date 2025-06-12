"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Lock } from "lucide-react"
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
        <link rel="preload" href="/logo.png" as="image" fetchpriority="high" />
        <link rel="preload" href="/hero-image.jpg" as="image" fetchpriority="high" />

        {/* DNS otimizado */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Meta essencial */}
        <title>Método Secreto - Perfis Fracos Vendendo 100%</title>
        <meta name="description" content="Descubra o método que faz perfis fracos venderem 100% no piloto automático" />

        {/* Inline CSS crítico para evitar FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
              background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
              color: white;
              overflow-x: hidden;
            }
            .container { min-height: 100vh; position: relative; }
            .loading { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; align-items: center; justify-content: center; flex-direction: column; }
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(-2deg); }
              50% { transform: translateY(-10px) rotate(-2deg); }
            }
            .animate-float { animation: float 3s ease-in-out infinite; }
          `
        }} />
      </Head>

      {/* Container principal - estrutura simplificada */}
      <div className="container">

        {/* Loading overlay otimizado */}
        {isLoading && (
          <div className="loading">
            <div className="text-white text-xl mb-4">Preparando seu teste...</div>
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="fixed top-4 left-4 right-4 bg-red-600 text-white p-4 rounded-lg z-50 flex justify-between items-center">
            {errorMessage}
            <button onClick={() => setErrorMessage("")} className="ml-2 font-bold">×</button>
          </div>
        )}

        {/* Offline indicator */}
        {!isOnline && (
          <div className="fixed top-4 left-4 right-4 bg-yellow-600 text-white p-2 rounded text-center z-50">
            Sem conexão com a internet
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
          
          {/* Background artístico */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><defs><linearGradient id="face" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23666;stop-opacity:0.3"/><stop offset="100%" style="stop-color:%23333;stop-opacity:0.1"/></linearGradient></defs><path d="M150 100 Q200 80 250 100 Q280 150 270 200 Q250 280 200 300 Q150 280 130 200 Q120 150 150 100 Z" fill="url(%23face)"/></svg>')] bg-no-repeat bg-center bg-cover opacity-20" />
          
          {/* Pontos de luz decorativos */}
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute bottom-32 right-32 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse delay-700" />

          <Card className="w-full max-w-4xl bg-transparent border-0 shadow-none">
            <CardContent className="p-6 relative">
              
              {/* Depoimento no canto superior esquerdo */}
              <div className="absolute -top-16 -left-8 md:-left-16 max-w-xs transform -rotate-2 animate-float z-10">
                <div className="bg-black p-4 rounded-2xl shadow-2xl relative">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <div className="text-yellow-400 font-semibold text-xs mb-1">
                    Wand Henrique (@wandhenriqueoficial)
                  </div>
                  <div className="text-white text-xs leading-tight">
                    Fiz e refiz seu Quiz umas 30 vezes kkkkkkkkk ficou insano!
                  </div>
                  <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black" />
                </div>
              </div>

              {/* Logo - OTIMIZADO PARA LCP */}
              <div className="text-center mb-8">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="h-16 mx-auto mb-4"
                  fetchpriority="high"
                  loading="eager"
                  onLoad={() => console.log('Logo carregado')}
                  onError={(e) => {
                    console.error('Erro ao carregar logo');
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Título - Otimizado para CLS */}
              <div className="text-center space-y-6 mb-12">
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  Faço até perfis fracos venderem{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    100%
                  </span>{' '}
                  no piloto automático.
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300">
                  Sem truques, só o poder do método certo.
                </p>

                <div className="space-y-4 text-left max-w-2xl mx-auto">
                  <div className="flex items-center text-lg">
                    <span className="text-green-400 font-bold mr-4 text-xl">✓</span>
                    <span>Funciona mesmo com perfis sem seguidores</span>
                  </div>
                  <div className="flex items-center text-lg">
                    <span className="text-green-400 font-bold mr-4 text-xl">✓</span>
                    <span>Sem precisar aparecer ou criar conteúdo</span>
                  </div>
                  <div className="flex items-center text-lg">
                    <span className="text-green-400 font-bold mr-4 text-xl">✓</span>
                    <span>Sistema 100% automatizado que vende sozinho</span>
                  </div>
                </div>
              </div>

              {/* Segunda imagem - com lazy loading inteligente */}
              <div className="text-center mb-8">
                <img 
                  src="/hero-image.jpg" 
                  alt="Método Secreto" 
                  className="max-w-full h-auto mx-auto rounded-lg shadow-2xl"
                  loading="lazy"
                  onLoad={() => console.log('Imagem principal carregada')}
                  onError={(e) => {
                    console.error('Erro ao carregar imagem principal');
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* CTA Button - Otimizado */}
              <div className="text-center space-y-4">
                <Button
                  onClick={handleStart}
                  disabled={isLoading || !isOnline}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      PREPARANDO...
                    </span>
                  ) : (
                    <span className="flex items-center relative z-10">
                      COMEÇAR AGORA
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                </Button>

                <div className="flex items-center justify-center text-gray-400 text-sm">
                  <Lock className="h-4 w-4 mr-2" />
                  Suas respostas são confidenciais e estão protegidas
                </div>
              </div>

            </CardContent>
          </Card>
          
          {/* Copyright */}
          <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
            Bel Fada™ Todos os Direitos Reservados.
          </div>

        </div>
      </div>

      {/* Script crítico inline - OTIMIZAÇÃO MÁXIMA */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Forçar prioridade máxima
            document.querySelectorAll('img[fetchpriority="high"]').forEach(img => {
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