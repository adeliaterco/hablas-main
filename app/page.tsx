"use client"

import { useState, useCallback } from "react"
import { ArrowRight, Lock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    
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
    
    // Pixel tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quiz_start');
    }
    
    setTimeout(() => {
      router.push(url);
    }, 1000);

  }, [isLoading, router]);

  return (
    <>
      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .container {
          background: #000000;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          text-align: center;
        }
        
        .stars {
          display: flex;
          gap: 8px;
          margin-bottom: 2rem;
        }
        
        .star {
          color: #FFD700;
          width: 24px;
          height: 24px;
        }
        
        .testimonial {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          max-width: 400px;
          width: 100%;
        }
        
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 auto 1rem;
          border: 3px solid #FFD700;
          display: block;
        }
        
        .author {
          color: #FFD700;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .text {
          color: #FFFFFF;
          font-style: italic;
        }
        
        .card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          max-width: 400px;
          width: 100%;
        }
        
        .book-image {
          width: 120px;
          height: auto;
          margin: 0 auto 1.5rem;
          display: block;
          border-radius: 12px;
        }
        
        .headline {
          font-size: 1.5rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        
        .subheadline {
          font-size: 1.1rem;
          color: #E0E0E0;
          font-weight: 400;
        }
        
        .cta-button {
          background: #FF0000 !important;
          color: #FFFFFF !important;
          padding: 1.2rem 2.5rem !important;
          font-size: 1.1rem !important;
          font-weight: 800 !important;
          border-radius: 50px !important;
          border: none !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          cursor: pointer !important;
          margin-bottom: 1.5rem !important;
          animation: pulse 2s infinite !important;
          transition: all 0.3s ease !important;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
          }
        }
        
        .cta-button:hover:not(:disabled) {
          transform: translateY(-2px);
          background: #FF3333 !important;
        }
        
        .cta-button:disabled {
          opacity: 0.7 !important;
          cursor: not-allowed !important;
        }
        
        .privacy {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #CCCCCC;
          font-size: 0.9rem;
        }
        
        .lock-icon {
          width: 16px;
          height: 16px;
          color: #FFD700;
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
        
        @media (max-width: 480px) {
          .headline {
            font-size: 1.3rem;
          }
          
          .cta-button {
            padding: 1rem 2rem !important;
            font-size: 1rem !important;
          }
          
          .book-image {
            width: 100px;
          }
          
          .stars {
            gap: 6px;
          }
          
          .star {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>

      <div className="container">
        
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="star" fill="currentColor" />
          ))}
        </div>

        <div className="testimonial">
          <img 
            src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png" 
            alt="Wand Henrique"
            className="avatar"
          />
          <div className="author">
            Wand Henrique (@wandhenriqueoficial)
          </div>
          <div className="text">
            "Fiz e refiz seu Quiz umas 30 vezes kkkkkkkkkk ficou insano!"
          </div>
        </div>

        <div className="card">
          <img 
            src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png" 
            alt="Plan A - Método Secreto"
            className="book-image"
          />
          
          <h1 className="headline">
            Faço até perfis fracos venderem 100% no piloto automático.
          </h1>
          
          <p className="subheadline">
            Sem truques, só o poder do método certo.
          </p>
        </div>

        <Button
          onClick={handleStart}
          disabled={isLoading}
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

        <div className="privacy">
          <Lock className="lock-icon" />
          Suas respostas são confidenciais e estão protegidas
        </div>

      </div>
    </>
  );
}