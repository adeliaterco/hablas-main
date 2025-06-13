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
    <div style={{ 
      backgroundColor: '#000000', 
      minHeight: '100vh', 
      padding: '20px',
      position: 'relative'
    }}>
      
      <style jsx>{`
        /* BOTÃO VERMELHO PULSANTE */
        .btn-vermelho-pulsante {
          background: #dc2626 !important;
          color: white !important;
          border: none !important;
          padding: 16px 32px !important;
          font-size: 18px !important;
          font-weight: bold !important;
          border-radius: 50px !important;
          text-transform: uppercase !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          animation: pulsar 1.5s infinite !important;
          width: 100% !important;
          max-width: 300px !important;
        }
        
        @keyframes pulsar {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
          }
        }
        
        .btn-vermelho-pulsante:hover {
          background: #b91c1c !important;
          transform: scale(1.1) !important;
        }
        
        /* CONTAINER PRETO */
        .container-preto {
          background-color: #000000 !important;
          border: 2px solid #333333 !important;
          border-radius: 20px !important;
          padding: 40px !important;
          max-width: 600px !important;
          margin: 0 auto !important;
          text-align: center !important;
        }
        
        /* TEXTOS BRANCOS */
        .texto-branco {
          color: #ffffff !important;
        }
        
        .titulo-principal {
          color: #ffffff !important;
          font-size: 32px !important;
          font-weight: bold !important;
          margin-bottom: 20px !important;
          line-height: 1.2 !important;
        }
        
        .subtitulo {
          color: #ffffff !important;
          font-size: 18px !important;
          margin-bottom: 30px !important;
        }
        
        /* DEPOIMENTO - OTIMIZADO PARA MOBILE */
        .depoimento {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #000000;
          border: 1px solid #333;
          border-radius: 15px;
          padding: 15px;
          max-width: 300px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 10;
        }
        
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-image: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png');
          background-size: cover;
          background-position: center;
          border: 2px solid #FFD700;
          flex-shrink: 0;
        }
        
        .estrelas {
          color: #FFD700;
          font-size: 12px;
        }
        
        .nome-usuario {
          color: #FFD700;
          font-weight: bold;
          font-size: 12px;
        }
        
        .texto-depoimento {
          color: #ffffff;
          font-size: 11px;
          line-height: 1.3;
        }
        
        /* LOGO ARREDONDADA */
        .logo-arredondada {
          border-radius: 50% !important;
          width: 120px !important;
          height: 120px !important;
          object-fit: cover !important;
          border: 3px solid #333333 !important;
        }
        
        /* LOADING */
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .loading-content {
          text-align: center;
          color: white;
        }
        
        .progress-bar {
          width: 200px;
          height: 4px;
          background: #333;
          border-radius: 2px;
          overflow: hidden;
          margin-top: 20px;
        }
        
        .progress-fill {
          height: 100%;
          background: #dc2626;
          transition: width 0.3s ease;
        }
        
        /* RESPONSIVO MOBILE-FIRST */
        @media (max-width: 768px) {
          .container-preto {
            padding: 20px !important;
            margin: 10px !important;
            border-radius: 15px !important;
          }
          
          .titulo-principal {
            font-size: 24px !important;
            margin-bottom: 15px !important;
          }
          
          .subtitulo {
            font-size: 16px !important;
            margin-bottom: 25px !important;
          }
          
          .depoimento {
            position: relative;
            top: 0;
            left: 0;
            margin: 0 auto 15px auto;
            max-width: 100%;
            padding: 12px;
          }
          
          .avatar {
            width: 40px;
            height: 40px;
          }
          
          .nome-usuario {
            font-size: 11px;
          }
          
          .texto-depoimento {
            font-size: 10px;
          }
          
          .estrelas {
            font-size: 11px;
          }
          
          .logo-arredondada {
            width: 100px !important;
            height: 100px !important;
          }
          
          .btn-vermelho-pulsante {
            padding: 14px 28px !important;
            font-size: 16px !important;
            max-width: 280px !important;
          }
          
          .progress-bar {
            width: 150px;
          }
        }
        
        @media (max-width: 480px) {
          .container-preto {
            padding: 15px !important;
            margin: 5px !important;
          }
          
          .titulo-principal {
            font-size: 20px !important;
          }
          
          .subtitulo {
            font-size: 14px !important;
          }
          
          .depoimento {
            padding: 10px;
            gap: 8px;
          }
          
          .avatar {
            width: 35px;
            height: 35px;
          }
          
          .logo-arredondada {
            width: 80px !important;
            height: 80px !important;
          }
          
          .btn-vermelho-pulsante {
            padding: 12px 24px !important;
            font-size: 14px !important;
            max-width: 250px !important;
          }
        }
        
        /* OTIMIZAÇÃO DE ESPAÇAMENTO */
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding-top: 80px;
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding-top: 20px;
            min-height: calc(100vh - 40px);
          }
        }
      `}</style>

      {/* Loading overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div>Preparando seu teste...</div>
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
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          right: '20px',
          background: '#dc2626',
          color: 'white',
          padding: '15px',
          borderRadius: '10px',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{errorMessage}</span>
          <button 
            onClick={() => setErrorMessage("")}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Offline indicator */}
      {!isOnline && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          background: '#f59e0b',
          color: 'white',
          textAlign: 'center',
          padding: '10px',
          zIndex: 1000
        }}>
          ⚠️ Sem conexão com a internet
        </div>
      )}

      {/* DEPOIMENTO - Agora mais próximo do container */}
      <div className="depoimento">
        <div className="avatar"></div>
        <div>
          <div className="estrelas">★★★★★</div>
          <div className="nome-usuario">Wand Henrique (@wandhenriqueoficial)</div>
          <div className="texto-depoimento">"Fiz e refiz seu Quiz umas 30 vezes kkkkkkkkk ficou insano!"</div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="main-content">
        
        <div className="container-preto">
          
          {/* Logo Arredondada */}
          <div style={{ marginBottom: '30px' }}>
            <Image
              src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Red-Gradient-Profile-Photo-Instagram-Post.png"
              alt="Logo Plan A"
              width={120}
              height={120}
              className="logo-arredondada"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Título */}
          <h1 className="titulo-principal">
            Hago que incluso los casos más difíciles de infidelidad regresen al 100% en piloto automático.
          </h1>
          
          {/* Subtítulo */}
          <p className="subtitulo">
            Sin juegos mentales, solo el poder del método correcto
          </p>

          {/* Botão CTA */}
          <button
            onClick={handleStart}
            disabled={isLoading || !isOnline}
            className="btn-vermelho-pulsante"
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                PREPARANDO...
                <div style={{
                  marginLeft: '10px',
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                COMEÇAR AGORA
                <ArrowRight style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
              </span>
            )}
          </button>

          {/* Security Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '14px',
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Lock style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Suas respostas são confidenciais e estão protegidas
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#ffffff',
        fontSize: '12px',
        textAlign: 'center'
      }}>
        Plan A™ Todos os Direitos Reservados.
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}