"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { captureUTMs, buildURLWithUTMs } from "@/lib/utm-tracker"

// Função de analytics SUPER controlada - SEM checkout
const enviarEventoSeguro = (() => {
  let queue: Array<{ evento: string; props: any }> = []
  let timeout: NodeJS.Timeout | null = null

  const EVENTOS_PERMITIDOS = ["page_view", "quiz_start", "button_click", "form_start"]
  const EVENTOS_BLOQUEADOS = [
    "initiate_checkout",
    "purchase",
    "add_to_cart",
    "begin_checkout",
    "checkout",
    "InitiateCheckout",
    "Purchase",
    "AddToCart",
  ]

  return (evento: string, props: any = {}) => {
    if (EVENTOS_BLOQUEADOS.includes(evento)) {
      console.error(`🚫 EVENTO BLOQUEADO: ${evento}`)
      return
    }

    if (!EVENTOS_PERMITIDOS.includes(evento)) {
      console.warn(`⚠️ Evento não permitido: ${evento}`)
      return
    }

    console.log(`✅ Enviando evento seguro: ${evento}`, props)

    queue.push({ evento, props })

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      if (typeof window !== "undefined" && window.gtag && queue.length) {
        queue.forEach(({ evento, props }) => {
          const eventoSeguro = `safe_${evento}`

          window.gtag("event", eventoSeguro, {
            ...props,
            custom_event: true,
            original_event: evento,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
          })
        })
        queue = []
      }
    }, 300)
  }
})()

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isOnline, setIsOnline] = useState(true)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [utmsCapturadas, setUtmsCapturadas] = useState<Record<string, string>>({})

  // Capturar UTMs na inicialização
  useEffect(() => {
    const utms = captureUTMs()
    setUtmsCapturadas(utms)

    console.log("📊 UTMs da sessão:", utms)
  }, [])

  // Page view com UTMs
  useEffect(() => {
    if (typeof window === "undefined") return

    let pageViewSent = false

    const sendPageView = () => {
      if (!pageViewSent) {
        pageViewSent = true
        enviarEventoSeguro("page_view", {
          page_title: "Home - Plan A",
          device: window.innerWidth < 768 ? "mobile" : "desktop",
          // Incluir UTMs no evento
          ...utmsCapturadas,
        })
      }
    }

    const timer = setTimeout(sendPageView, 1500)
    return () => clearTimeout(timer)
  }, [utmsCapturadas])

  // Detecção de conexão
  useEffect(() => {
    if (typeof window === "undefined") return

    const updateOnlineStatus = () => setIsOnline(navigator.onLine)

    window.addEventListener("online", updateOnlineStatus, { passive: true })
    window.addEventListener("offline", updateOnlineStatus, { passive: true })

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  // Função de clique com UTMs preservadas
  const handleStart = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()

      if (isLoading || !isOnline || buttonClicked) return

      console.log("🔘 Botão clicado - iniciando processo")

      setButtonClicked(true)
      setIsLoading(true)
      setLoadingProgress(20)

      // Evento com UTMs incluídas
      enviarEventoSeguro("quiz_start", {
        source: "home_cta_button",
        button_text: "EMPEZAR AHORA",
        user_action: "manual_click",
        session_id: Date.now().toString(),
        // Incluir UTMs no evento
        ...utmsCapturadas,
      })

      let progress = 20
      const interval = setInterval(() => {
        progress += 15
        setLoadingProgress(progress)

        if (progress >= 100) {
          clearInterval(interval)

          // Usar função que preserva UTMs
          const url = buildURLWithUTMs("/quiz/1")
          console.log("🔗 Navegando para:", url)

          router.push(url)
        }
      }, 200)
    },
    [isLoading, isOnline, router, buttonClicked, utmsCapturadas],
  )

  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", padding: "20px", position: "relative" }}>
      {/* Debug UTMs - remover em produção */}
      {Object.keys(utmsCapturadas).length > 0 && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            background: "#4CAF50",
            color: "white",
            padding: "8px",
            borderRadius: "5px",
            fontSize: "12px",
            zIndex: 1000,
          }}
        >
          📊 UTMs: {Object.keys(utmsCapturadas).length}
        </div>
      )}

      {/* Resto do componente igual... */}
      <style jsx>{`
        .cta-button-safe {
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
          outline: none !important;
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
        
        .cta-button-safe:hover {
          background: #b91c1c !important;
          transform: scale(1.1) !important;
        }
        
        .cta-button-safe:disabled {
          opacity: 0.6 !important;
          cursor: not-allowed !important;
          animation: none !important;
        }
        
        .container-preto {
          background-color: #000000 !important;
          border: 2px solid #333333 !important;
          border-radius: 20px !important;
          padding: 40px !important;
          max-width: 600px !important;
          margin: 0 auto !important;
          text-align: center !important;
        }
        
        .titulo-principal {
          color: #ffffff !important;
          font-size: 32px !important;
          font-weight: bold !important;
          margin-bottom: 20px !important;
          line-height: 1.2 !important;
          animation: fadeInUp 1s ease-out 0.3s both !important;
        }
        
        .subtitulo {
          color: #ffffff !important;
          font-size: 18px !important;
          margin-bottom: 30px !important;
          animation: fadeInUp 1s ease-out 0.6s both !important;
        }
        
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px !important;
          animation: fadeInDown 1s ease-out;
        }
        
        .logo-arredondada {
          border-radius: 50% !important;
          width: 150px !important;
          height: 150px !important;
          object-fit: cover !important;
          border: 4px solid #dc2626 !important;
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.3) !important;
          transition: all 0.3s ease !important;
        }
        
        .logo-arredondada:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.5) !important;
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
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
        
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding-top: 80px;
        }
        
        @media (max-width: 768px) {
          .container-preto {
            padding: 25px !important;
            margin: 10px !important;
            border-radius: 15px !important;
          }
          
          .logo-arredondada {
            width: 120px !important;
            height: 120px !important;
            border: 3px solid #dc2626 !important;
          }
          
          .titulo-principal {
            font-size: 26px !important;
            margin-bottom: 15px !important;
          }
          
          .subtitulo {
            font-size: 16px !important;
            margin-bottom: 25px !important;
          }
          
          .cta-button-safe {
            padding: 14px 28px !important;
            font-size: 16px !important;
            max-width: 280px !important;
          }
          
          .main-content {
            padding-top: 20px;
            min-height: calc(100vh - 40px);
          }
        }
        
        @media (max-width: 480px) {
          .container-preto {
            padding: 20px !important;
            margin: 5px !important;
          }
          
          .logo-arredondada {
            width: 100px !important;
            height: 100px !important;
            border: 2px solid #dc2626 !important;
          }
          
          .titulo-principal {
            font-size: 22px !important;
          }
          
          .subtitulo {
            font-size: 14px !important;
          }
          
          .cta-button-safe {
            padding: 12px 24px !important;
            font-size: 14px !important;
            max-width: 250px !important;
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Loading overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div>Preparando o teste...</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${loadingProgress}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Offline indicator */}
      {!isOnline && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            background: "#f59e0b",
            color: "white",
            textAlign: "center",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          ⚠️ Sem conexão com a internet
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <div className="main-content">
        <div className="container-preto">
          <div className="logo-container">
            <Image
              src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Red-Gradient-Profile-Photo-Instagram-Post.png"
              alt="Logo Plan A"
              width={150}
              height={150}
              className="logo-arredondada"
              priority
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          </div>

          <h1 className="titulo-principal">
            Hago que incluso los casos más difíciles de infidelidad regresen al 100% en piloto automático.
          </h1>

          <p className="subtitulo">Sin juegos mentales, solo el poder del método correcto</p>

          <button
            onClick={handleStart}
            disabled={isLoading || !isOnline || buttonClicked}
            className="cta-button-safe"
            type="button"
            data-event="quiz-start"
            data-no-checkout="true"
            aria-label="Iniciar teste"
          >
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                PREPARANDO...
                <div
                  style={{
                    marginLeft: "10px",
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                EMPEZAR AHORA
                <ArrowRight style={{ marginLeft: "10px", width: "20px", height: "20px" }} />
              </span>
            )}
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#ffffff",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        Plan A™ Todos los Derechos Reservados.
      </div>
    </div>
  )
}
