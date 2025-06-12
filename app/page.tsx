"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Lock, Star } from "lucide-react"
import { useRouter } from "next/navigation"

// GA otimizado
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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const timer = setTimeout(() => {
      enviarEvento('page_view', {
        device: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
      background: '#000000',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      margin: 0,
      padding: 0
    }}>

      {/* CSS Global para eliminar QUALQUER branco */}
      <style jsx global>{`
        * {
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box !important;
        }
        
        html, body {
          background: #000000 !important;
          color: #FFFFFF !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        body * {
          background-color: transparent !important;
        }
        
        .hero-container * {
          background: transparent !important;
        }
      `}</style>

      {/* IMAGEM DE FUNDO */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-11T112151.941.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.4,
        zIndex: 1
      }}></div>

      {/* PARTÍCULAS DOURADAS */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: '#FFD700',
            borderRadius: '50%',
            opacity: 0.9,
            zIndex: 3,
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
            animation: `float${i} 4s ease-in-out infinite`,
            ...(i === 1 && { bottom: '25%', right: '10%', animationDelay: '0s' }),
            ...(i === 2 && { bottom: '45%', right: '20%', animationDelay: '1.5s' }),
            ...(i === 3 && { bottom: '65%', left: '15%', animationDelay: '3s' }),
            ...(i === 4 && { top: '30%', left: '20%', animationDelay: '2s' })
          }}
        ></div>
      ))}

      <style jsx>{`
        @keyframes float1, @keyframes float2, @keyframes float3, @keyframes float4 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.9; }
          50% { transform: translateY(-25px) scale(1.3); opacity: 1; }
        }
      `}</style>

      {/* Loading overlay */}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{
              color: '#FFFFFF',
              fontSize: '1.2rem',
              marginBottom: '1.5rem',
              fontWeight: 600
            }}>
              Preparando seu teste...
            </div>
            <div style={{
              width: '280px',
              height: '6px',
              background: '#333333',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                borderRadius: '10px',
                transition: 'width 0.3s ease',
                width: `${loadingProgress}%`
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          background: '#dc2626',
          color: '#ffffff',
          padding: '1rem',
          borderRadius: '12px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>{errorMessage}</span>
          <button 
            onClick={() => setErrorMessage("")}
            style={{
              marginLeft: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
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
          top: 0,
          left: 0,
          right: 0,
          background: '#d97706',
          color: '#ffffff',
          textAlign: 'center',
          padding: '0.75rem',
          zIndex: 50
        }}>
          ⚠️ Sem conexão com a internet
        </div>
      )}

      {/* DEPOIMENTO */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        right: '1rem',
        background: 'rgba(0, 0, 0, 0.9)',
        border: '2px solid #FFD700',
        borderRadius: '20px',
        padding: '1rem',
        zIndex: 15,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        {/* Avatar */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundImage: 'url("https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '3px solid #FFD700',
          flexShrink: 0
        }}></div>
        
        {/* Conteúdo */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '2px', marginBottom: '0.25rem' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} style={{ color: '#FFD700', width: '14px', height: '14px' }} fill="currentColor" />
            ))}
          </div>
          <div style={{
            color: '#FFD700',
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: '0.25rem'
          }}>
            Wand Henrique (@wandhenriqueoficial)
          </div>
          <div style={{
            color: '#FFFFFF',
            fontSize: '0.8rem',
            lineHeight: 1.3
          }}>
            "Fiz e refiz seu Quiz umas 30 vezes kkkkkkkkk ficou insano!"
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL - SEM FUNDO BRANCO */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '120px 16px 64px',
        background: 'transparent'
      }}>
        
        <div style={{
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
          background: 'transparent'
        }}>

          {/* Logo */}
          <div style={{ marginBottom: '2rem' }}>
            <img
              src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
              alt="Logo Plan A"
              style={{
                height: '60px',
                width: 'auto',
                maxWidth: '200px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 15px rgba(255, 215, 0, 0.4))'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Headline Principal */}
          <h1 style={{
            fontSize: 'clamp(1.8rem, 8vw, 2.8rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.1,
            margin: '1.5rem 0',
            textShadow: '2px 2px 8px rgba(0,0,0,0.9)'
          }}>
            Faço até perfis fracos venderem 100% no piloto automático.
          </h1>
          
          {/* Subtítulo */}
          <p style={{
            fontSize: 'clamp(0.95rem, 4vw, 1.2rem)',
            color: '#CCCCCC',
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: 400,
            lineHeight: 1.4,
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
          }}>
            Sem truques, só o poder do método certo.
          </p>

          {/* Botão CTA */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <button
              onClick={handleStart}
              disabled={isLoading || !isOnline}
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                color: '#000000',
                padding: '1rem 2.5rem',
                fontSize: '1rem',
                fontWeight: 800,
                borderRadius: '50px',
                boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: 'none',
                transition: 'all 0.3s ease',
                width: '100%',
                maxWidth: '300px',
                cursor: isLoading || !isOnline ? 'not-allowed' : 'pointer',
                opacity: isLoading || !isOnline ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && isOnline) {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(255, 215, 0, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && isOnline) {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.4)';
                }
              }}
            >
              {isLoading ? (
                <>
                  PREPARANDO...
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(0,0,0,0.3)',
                    borderTop: '2px solid #000000',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                </>
              ) : (
                <>
                  COMEÇAR AGORA
                  <ArrowRight style={{ width: '20px', height: '20px' }} />
                </>
              )}
            </button>
          </div>

          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>

          {/* Security Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#CCCCCC',
            fontSize: '0.8rem',
            padding: '0.75rem',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            gap: '0.5rem'
          }}>
            <Lock style={{ width: '16px', height: '16px' }} />
            Suas respostas são confidenciais e estão protegidas
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div style={{
        position: 'absolute',
        bottom: '0.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#888888',
        fontSize: '0.7rem',
        zIndex: 10,
        textAlign: 'center'
      }}>
        Bel Fada™ Todos os Direitos Reservados.
      </div>

    </div>
  );
}