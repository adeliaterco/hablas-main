"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  ArrowRight,
  Check,
  Clock,
  Users,
  Heart,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { enviarEvento } from "../../lib/analytics"

export default function ResultPageOptimized() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [recentBuyers, setRecentBuyers] = useState(3)
  const [userGender, setUserGender] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedGender = localStorage.getItem("userGender")
    if (savedGender) setUserGender(savedGender)

    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Simular compradores recientes
    const interval = setInterval(() => {
      setRecentBuyers((prev) => {
        const increase = Math.floor(Math.random() * 2) + 1
        return Math.min(prev + increase, 23)
      })
    }, 45000)

    // Registra visualización
    try {
      enviarEvento("visualizou_resultado")
    } catch (error) {
      console.error("Error al registrar evento:", error)
    }

    // Carrega script do VTurb
    const loadVTurbScript = () => {
      if (!document.querySelector('script[src*="68cc44955c346294924218e1"]')) {
        const script = document.createElement("script")
        script.src = "https://scripts.converteai.net/529d9a9b-9a02-4648-9d1f-be6bbe950e40/players/68cc44955c346294924218e1/v4/player.js"
        script.async = true
        document.head.appendChild(script)
      }
    }

    loadVTurbScript()

    return () => clearInterval(interval)
  }, [])

  const handlePurchase = () => {
    try {
      enviarEvento("clicou_comprar", {
        posicao: "principal",
      })
    } catch (error) {
      console.error("Error al registrar evento de clic:", error)
    }
    window.open("https://pay.hotmart.com/F100142422S?off=0p2j9dbs&checkoutMode=10&offDiscount=PLAN", "_blank")
  }

  const getPersonalizedPronoun = () => {
    return userGender === "FEMININO" ? "él" : "ella"
  }

  const handleTouchFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  return (
    <>
      {/* META TAGS MOBILE OTIMIZADAS */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden w-full max-w-[100vw] mobile-container" ref={contentRef}>
        
        {/* ✅ SEÇÃO 1: RESULTADO INICIAL ENXUTO */}
        <div className="relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 animate-pulse"></div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            className="relative z-10 mobile-padding text-center w-full"
          >
            {/* Headline Principal */}
            <h1 className="mobile-headline text-white mb-4 sm:mb-6 leading-tight max-w-full break-words">
              🎯 <span className="text-orange-400">¡FELICITACIONES!</span>
              <br />
              TU CASO TIENE <span className="text-green-400">90,5%</span>
              <br />
              DE PROBABILIDAD DE ÉXITO
            </h1>

            {/* Resultado Visual Simples */}
            <div className="max-w-sm mx-auto mb-6 sm:mb-8 w-full">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 mobile-border rounded-2xl mobile-card-padding shadow-2xl max-w-full">
                <div className="mobile-circle mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mobile-border-white mb-4">
                  <div className="text-center">
                    <span className="mobile-percentage font-extrabold text-black">90,5%</span>
                    <p className="mobile-success-text font-bold text-black">ÉXITO</p>
                  </div>
                </div>
                
                <div className="text-white space-y-2 mobile-info-text">
                  <p><strong>Tiempo estimado:</strong> 14-21 días</p>
                  <p><strong>Estrategia:</strong> Plan A</p>
                  <p><strong>Tipo:</strong> Altamente recuperable</p>
                </div>
              </div>
            </div>

            {/* Transição para VSL */}
            <p className="mobile-transition-text text-gray-300 mb-4 font-semibold max-w-full break-words px-2">
              Ahora descubre <span className="text-orange-400 font-bold">cómo es posible</span> este resultado:
            </p>
          </motion.div>
        </div>

        {/* ✅ SEÇÃO 2: VSL PRINCIPAL (POSIÇÃO OTIMIZADA) */}
        <div className="mobile-padding bg-gradient-to-r from-gray-900 to-black w-full">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-6">
              <h2 className="mobile-section-title font-bold text-white mb-4 max-w-full break-words">
                🎯 <span className="text-orange-400">EL MÉTODO</span> QUE HACE POSIBLE TU RESULTADO
              </h2>
              
              <div className="max-w-2xl mx-auto mb-6 w-full">
                <p className="mobile-description text-gray-300 mb-4 break-words">
                  Mira este video donde 3 especialistas revelan:
                </p>
                <div className="text-left bg-black/30 rounded-lg mobile-list-padding space-y-2 w-full">
                  <div className="flex items-start text-white mobile-list-text">
                    <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="break-words">Por qué tu caso tiene <strong className="text-orange-400">90,5% de éxito</strong></span>
                  </div>
                  <div className="flex items-start text-white mobile-list-text">
                    <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="break-words">Los <strong className="text-orange-400">disparadores</strong> que funcionan en 21 días</span>
                  </div>
                  <div className="flex items-start text-white mobile-list-text">
                    <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="break-words">Cómo aplicarlo <strong className="text-orange-400">paso a paso</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* VSL CENTRALIZADA COM VTURB */}
            <div className="flex justify-center mb-6 sm:mb-8 w-full">
              <div className="w-full max-w-3xl">
                <div className="relative bg-black rounded-xl sm:rounded-2xl mobile-video-padding mobile-border-orange shadow-2xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl sm:rounded-2xl animate-pulse"></div>
                  <div className="relative z-10 w-full mobile-video-container">
                    <vturb-smartplayer 
                      id="vid-68cc44955c346294924218e1" 
                      className="mobile-vturb-player"
                    ></vturb-smartplayer>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA ÚNICO APÓS VSL */}
            <div className="text-center w-full">
              <div className="bg-orange-600 text-white mobile-badge-padding rounded-full inline-block font-bold mobile-badge-text mb-4 sm:mb-6 animate-bounce max-w-full">
                👆 APLICA ESTO Y VERÁS RESULTADOS EN DÍAS
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="w-full"
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="mobile-cta-primary"
                  onTouchStart={handleTouchFeedback}
                >
                  <Heart className="mobile-icon-size mr-2 flex-shrink-0" />
                  <span className="mobile-cta-text text-center leading-tight break-words">
                    <span className="mobile-show">APLICAR MÉTODO - $19</span>
                    <span className="desktop-show">QUIERO APLICAR ESTE MÉTODO - $19</span>
                  </span>
                  <ArrowRight className="mobile-icon-size ml-2 flex-shrink-0" />
                </Button>
              </motion.div>

              <p className="text-white mobile-description font-semibold mt-4 max-w-full break-words px-2">
                Ahora que conoces el método, es hora de <span className="text-orange-400">ponerlo en práctica</span>
              </p>
            </div>
          </div>
        </div>

        {/* ✅ SEÇÃO 3: PROVA SOCIAL RÁPIDA (1 DEPOIMENTO EM VÍDEO) */}
        <div className="mobile-padding bg-gradient-to-r from-black to-gray-900 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-6">
              <h3 className="mobile-subsection-title font-bold text-white mb-2 max-w-full break-words">
                💬 <span className="text-orange-400">TESTIMONIO REAL</span> DE QUIEN YA LO LOGRÓ
              </h3>
              <p className="text-gray-300 mobile-small-text break-words">
                Escucha la historia de transformación usando exactamente el mismo método
              </p>
            </div>

            {/* Depoimento em Vídeo Centralizado */}
            <div className="flex justify-center mb-6 sm:mb-8 w-full">
              <div className="w-full max-w-xs">
                <div className="relative bg-black rounded-xl sm:rounded-2xl p-2 mobile-border-orange shadow-xl overflow-hidden w-full">
                  
                  {/* Header do Story */}
                  <div className="flex items-center p-2 pb-1">
                    <div className="mobile-avatar rounded-full border border-orange-400 overflow-hidden mr-2 flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <span className="text-white font-bold mobile-avatar-text">FB</span>
                      </div>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="text-white font-bold mobile-name-text truncate">Facundo B.</h4>
                      <p className="text-green-400 mobile-status-text font-semibold">✅ Reconciliado en 15 días</p>
                    </div>
                  </div>

                  {/* Vídeo Story - Mantendo Wistia para o depoimento */}
                  <div className="relative mobile-story-video bg-gray-900 rounded-xl overflow-hidden w-full">
                    <script src="https://fast.wistia.com/player.js" async></script>
                    <script src="https://fast.wistia.com/embed/3rj8vdh574.js" async type="module"></script>
                    <wistia-player 
                      media-id="3rj8vdh574" 
                      aspect="0.5625"
                      className="mobile-wistia-player"
                    ></wistia-player>
                  </div>

                  {/* Footer com CTA */}
                  <div className="p-2 text-center w-full">
                    <Button
                      onClick={handlePurchase}
                      className="mobile-cta-secondary"
                      onTouchStart={handleTouchFeedback}
                    >
                      <Play className="mobile-small-icon mr-1 flex-shrink-0" />
                      <span className="mobile-cta-small-text truncate">
                        <span className="mobile-show">QUIERO RESULTADOS</span>
                        <span className="desktop-show">QUIERO LOS MISMOS RESULTADOS</span>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Números de Prova Social */}
            <div className="mobile-grid max-w-2xl mx-auto w-full">
              <div className="bg-gray-800 mobile-stats-padding rounded-lg mobile-border-orange text-center">
                <div className="mobile-stats-number font-bold text-orange-400 mb-1">87%</div>
                <p className="text-white mobile-stats-text break-words">Ven resultados en 14 días</p>
              </div>
              <div className="bg-gray-800 mobile-stats-padding rounded-lg mobile-border-orange text-center">
                <div className="mobile-stats-number font-bold text-orange-400 mb-1">3.847+</div>
                <p className="text-white mobile-stats-text break-words">Relaciones recuperadas</p>
              </div>
              <div className="bg-gray-800 mobile-stats-padding rounded-lg mobile-border-orange text-center">
                <div className="mobile-stats-number font-bold text-orange-400 mb-1">21</div>
                <p className="text-white mobile-stats-text break-words">Días o menos</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ SEÇÃO 4: OFERTA FINAL SIMPLIFICADA */}
        <div className="mobile-padding w-full">
          <div className="max-w-4xl mx-auto w-full">
            <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl mobile-border-yellow w-full">
              <CardContent className="mobile-offer-padding text-center w-full">
                
                {/* Badge de Oferta */}
                <div className="bg-yellow-400 text-black font-bold mobile-offer-badge rounded-full inline-block mb-4 sm:mb-6 mobile-badge-text max-w-full">
                  🔥 OFERTA ESPECIAL - SOLO HOY
                </div>

                <h2 className="mobile-offer-title font-black mb-4 sm:mb-6 break-words">PLAN A - RECUPERACIÓN RÁPIDA</h2>

                {/* Preço Simples */}
                <div className="bg-black/20 rounded-lg mobile-price-padding mb-4 sm:mb-6 w-full">
                  <div className="text-center mb-4">
                    <div className="mobile-price-main font-black text-yellow-300 mb-2">$19</div>
                    <div className="mobile-price-sub">
                      <span className="line-through text-gray-400 mr-3">$99,90</span>
                      <span className="text-green-400 font-bold">AHORRAS $80</span>
                    </div>
                  </div>

                  {/* O que inclui */}
                  <div className="text-left space-y-2 sm:space-y-3 max-w-md mx-auto w-full">
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Sistema completo Plan A</span>
                    </div>
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">21 Disparadores Emocionales ($47)</span>
                    </div>
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Protocolo de Emergencia 72H ($37)</span>
                    </div>
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Garantía 30 días</span>
                    </div>
                    <div className="flex items-start text-white mobile-feature-text">
                      <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Acceso inmediato</span>
                    </div>
                  </div>
                </div>

                {/* CTA Principal Único */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="mb-4 sm:mb-6 w-full"
                >
                  <Button
                    onClick={handlePurchase}
                    size="lg"
                    className="mobile-cta-offer"
                    onTouchStart={handleTouchFeedback}
                  >
                    <span className="mobile-cta-offer-text text-center leading-tight break-words">
                      <span className="mobile-show">💕 RECUPERAR - $19</span>
                      <span className="desktop-show">💕 RECUPERAR AHORA POR $19</span>
                    </span>
                    <ArrowRight className="mobile-icon-size ml-2 flex-shrink-0" />
                  </Button>
                </motion.div>

                {/* Urgência Final */}
                <div className="bg-red-800 mobile-urgency-padding rounded-lg mb-4 w-full">
                  <p className="text-yellow-300 font-bold mobile-urgency-text mb-2">⏰ OFERTA EXPIRA EN:</p>
                  <div className="mobile-countdown font-black text-white">
                    <CountdownTimer minutes={15} seconds={0} />
                  </div>
                </div>

                {/* Social Proof Final */}
                <div className="flex justify-center mobile-social-gap mobile-social-text text-white mb-4 flex-wrap">
                  <div className="flex items-center">
                    <Users className="mobile-social-icon text-orange-400 mr-1" />
                    <span><strong>{recentBuyers}</strong> compraron hoy</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mobile-social-icon text-red-400 mr-1" />
                    <span>Últimas horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ✅ SEÇÃO 5: GARANTIA SIMPLES */}
        <div className="mobile-padding bg-gradient-to-r from-green-900/30 to-emerald-900/30 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <Card className="bg-green-50 mobile-border-green shadow-2xl w-full">
              <CardContent className="mobile-guarantee-padding text-center w-full">
                <Shield className="mobile-shield-icon text-green-600 mx-auto mb-4" />
                <h2 className="mobile-guarantee-title font-bold text-green-800 mb-4 break-words">GARANTÍA TOTAL DE 30 DÍAS</h2>
                <p className="text-green-700 mobile-guarantee-text font-semibold mb-4 break-words">
                  Si no ves resultados, te devolvemos el 100% de tu dinero
                </p>
                <p className="text-green-600 max-w-2xl mx-auto mobile-guarantee-desc break-words">
                  Prueba el método durante 30 días. Si no funciona, te devolvemos todo sin hacer preguntas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ✅ SEÇÃO 6: FAQ MÍNIMO (SÓ 3 PERGUNTAS) */}
        <div className="mobile-padding w-full">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="mobile-faq-title font-bold text-white text-center mb-6 sm:mb-8 break-words">PREGUNTAS FRECUENTES</h2>

            <div className="space-y-4 max-w-2xl mx-auto w-full">
              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="mobile-faq-padding w-full">
                  <h3 className="mobile-faq-question font-bold text-orange-400 mb-2 break-words">
                    ¿Y si {getPersonalizedPronoun()} ya está con otra persona?
                  </h3>
                  <p className="text-gray-300 mobile-faq-answer break-words">
                    El método funciona incluso cuando hay terceras personas. El 67% de nuestros casos exitosos comenzaron en esta situación.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="mobile-faq-padding w-full">
                  <h3 className="mobile-faq-question font-bold text-orange-400 mb-2 break-words">¿Cuánto tiempo tarda en ver resultados?</h3>
                  <p className="text-gray-300 mobile-faq-answer break-words">
                    El 87% ve cambios positivos en menos de 14 días. El sistema completo funciona en 21 días máximo.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="mobile-faq-padding w-full">
                  <h3 className="mobile-faq-question font-bold text-orange-400 mb-2 break-words">¿Cómo recibo el acceso?</h3>
                  <p className="text-gray-300 mobile-faq-answer break-words">
                    Inmediatamente después del pago recibes un email con tus credenciales. Todo queda disponible al momento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* ✅ CTA FINAL URGENTE */}
        <div className="mobile-padding bg-gradient-to-r from-red-600 to-orange-600 w-full">
          <div className="max-w-4xl mx-auto text-center w-full">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl mobile-final-padding mobile-border-yellow w-full">
              <h2 className="mobile-final-title font-black text-white mb-4 break-words">⏰ ÚLTIMA OPORTUNIDAD</h2>
              <p className="mobile-final-subtitle text-white mb-4 sm:mb-6 font-semibold break-words">
                Esta oferta expira en minutos. Después vuelve a $99,90.
              </p>

              <div className="bg-red-800 mobile-final-countdown-padding rounded-lg mb-4 sm:mb-6 w-full">
                <p className="text-yellow-300 font-bold mobile-final-countdown-label mb-2">TIEMPO RESTANTE:</p>
                <div className="mobile-final-countdown-time font-black text-white">
                  <CountdownTimer minutes={15} seconds={0} />
                </div>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="w-full"
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="mobile-cta-final"
                  onTouchStart={handleTouchFeedback}
                >
                  <span className="mobile-cta-final-text text-center leading-tight break-words">
                    <span className="mobile-show">💕 ¡RECUPERAR YA!</span>
                    <span className="desktop-show">💕 ¡SÍ, QUIERO RECUPERAR AHORA!</span>
                  </span>
                  <ArrowRight className="mobile-icon-size ml-2 flex-shrink-0" />
                </Button>
              </motion.div>

              <p className="text-yellow-300 mobile-final-warning mt-4 font-semibold break-words">
                Haz clic ahora antes de que sea demasiado tarde
              </p>
            </div>
          </div>
        </div>

        {/* CSS MOBILE-FIRST OTIMIZADO */}
        <style jsx global>{`
          /* ===== RESET E BASE MOBILE-FIRST ===== */
          * {
            box-sizing: border-box !important;
            max-width: 100% !important;
          }

          html {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100%;
            margin: 0;
            padding: 0;
          }

          .mobile-container {
            max-width: 100vw !important;
            overflow-x: hidden !important;
            width: 100% !important;
            position: relative;
          }

          /* ===== SISTEMA DE BREAKPOINTS ===== */
          .mobile-show { display: inline !important; }
          .desktop-show { display: none !important; }

          @media (min-width: 640px) {
            .mobile-show { display: none !important; }
            .desktop-show { display: inline !important; }
          }

          /* ===== PADDING E SPACING RESPONSIVO ===== */
          .mobile-padding {
            padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-card-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-video-padding {
            padding: clamp(0.5rem, 2vw, 1rem);
          }

          .mobile-list-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-badge-padding {
            padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-offer-padding {
            padding: clamp(1rem, 4vw, 2rem);
          }

          .mobile-price-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-stats-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-urgency-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-guarantee-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-faq-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-final-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-final-countdown-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          /* ===== TIPOGRAFIA RESPONSIVA ===== */
          .mobile-headline {
            font-size: clamp(1.5rem, 6vw, 3rem);
            line-height: 1.2;
            font-weight: 900;
          }

          .mobile-section-title {
            font-size: clamp(1.25rem, 5vw, 2rem);
            line-height: 1.3;
          }

          .mobile-subsection-title {
            font-size: clamp(1.125rem, 4vw, 1.5rem);
            line-height: 1.3;
          }

          .mobile-offer-title {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            line-height: 1.2;
          }

          .mobile-final-title {
            font-size: clamp(1.5rem, 5vw, 2rem);
            line-height: 1.2;
          }

          .mobile-guarantee-title {
            font-size: clamp(1.125rem, 4vw, 1.5rem);
            line-height: 1.3;
          }

          .mobile-faq-title {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1.3;
          }

          .mobile-description {
            font-size: clamp(1rem, 3vw, 1.125rem);
            line-height: 1.5;
          }

          .mobile-transition-text {
            font-size: clamp(1.125rem, 4vw, 1.25rem);
            line-height: 1.4;
          }

          .mobile-info-text {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-list-text {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-badge-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-small-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.4;
          }

          .mobile-feature-text {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-price-main {
            font-size: clamp(2.5rem, 8vw, 3.75rem);
            line-height: 1;
          }

          .mobile-price-sub {
            font-size: clamp(1rem, 3vw, 1.25rem);
            line-height: 1.3;
          }

          .mobile-stats-number {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1.2;
          }

          .mobile-stats-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.3;
          }

          .mobile-countdown {
            font-size: clamp(1.5rem, 5vw, 2rem);
            line-height: 1.2;
          }

          .mobile-urgency-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-social-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.3;
          }

          .mobile-guarantee-text {
            font-size: clamp(1rem, 3vw, 1.125rem);
            line-height: 1.4;
          }

          .mobile-guarantee-desc {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-faq-question {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-faq-answer {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.4;
          }

          .mobile-final-subtitle {
            font-size: clamp(1rem, 3vw, 1.25rem);
            line-height: 1.4;
          }

          .mobile-final-countdown-label {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-final-countdown-time {
            font-size: clamp(1.75rem, 6vw, 2.25rem);
            line-height: 1.2;
          }

          .mobile-final-warning {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.3;
          }

          /* ===== ELEMENTOS ESPECÍFICOS ===== */
          .mobile-circle {
            width: clamp(5rem, 15vw, 6rem);
            height: clamp(5rem, 15vw, 6rem);
          }

          .mobile-percentage {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1;
          }

          .mobile-success-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1;
          }

          .mobile-avatar {
            width: clamp(1.75rem, 5vw, 2rem);
            height: clamp(1.75rem, 5vw, 2rem);
          }

          .mobile-avatar-text {
            font-size: clamp(0.625rem, 2vw, 0.75rem);
          }

          .mobile-name-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
          }

          .mobile-status-text {
            font-size: clamp(0.625rem, 2vw, 0.75rem);
          }

          /* ===== ÍCONES RESPONSIVOS ===== */
          .mobile-icon-size {
            width: clamp(1.25rem, 4vw, 1.5rem);
            height: clamp(1.25rem, 4vw, 1.5rem);
          }

          .mobile-check-icon {
            width: clamp(1rem, 3vw, 1.25rem);
            height: clamp(1rem, 3vw, 1.25rem);
          }

          .mobile-small-icon {
            width: clamp(0.75rem, 2.5vw, 1rem);
            height: clamp(0.75rem, 2.5vw, 1rem);
          }

          .mobile-social-icon {
            width: clamp(0.75rem, 2.5vw, 1rem);
            height: clamp(0.75rem, 2.5vw, 1rem);
          }

          .mobile-shield-icon {
            width: clamp(3rem, 8vw, 4rem);
            height: clamp(3rem, 8vw, 4rem);
          }

          /* ===== BORDAS RESPONSIVAS ===== */
          .mobile-border {
            border-width: clamp(2px, 1vw, 4px);
          }

          .mobile-border-white {
            border: clamp(2px, 1vw, 4px) solid white;
          }

          .mobile-border-orange {
            border: clamp(1px, 0.5vw, 2px) solid rgb(249 115 22);
          }

          .mobile-border-yellow {
            border: clamp(2px, 1vw, 4px) solid rgb(250 204 21);
          }

          .mobile-border-green {
            border: clamp(2px, 1vw, 4px) solid rgb(34 197 94);
          }

          /* ===== GRID RESPONSIVO ===== */
          .mobile-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(0.5rem, 2vw, 1rem);
          }

          .mobile-social-gap {
            gap: clamp(0.5rem, 2vw, 1rem);
          }

          /* ===== BOTÕES MOBILE-OPTIMIZED ===== */
          .mobile-cta-primary {
            width: 100% !important;
            max-width: 28rem !important;
            margin: 0 auto !important;
            background: linear-gradient(to right, rgb(249 115 22), rgb(220 38 38)) !important;
            color: white !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1rem, 3vw, 1.25rem) !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            transition: all 0.3s ease !important;
            border: clamp(2px, 1vw, 4px) solid rgb(250 204 21) !important;
            min-height: clamp(3.5rem, 12vw, 4rem) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          .mobile-cta-primary:hover {
            background: linear-gradient(to right, rgb(234 88 12), rgb(185 28 28)) !important;
            transform: scale(1.02) !important;
          }

          .mobile-cta-secondary {
            width: 100% !important;
            background: linear-gradient(to right, rgb(249 115 22), rgb(220 38 38)) !important;
            color: white !important;
            font-weight: 700 !important;
            padding: clamp(0.5rem, 2vw, 0.75rem) clamp(0.5rem, 2vw, 0.75rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25) !important;
            transition: all 0.3s ease !important;
            min-height: clamp(2.25rem, 8vw, 2.5rem) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          .mobile-cta-secondary:hover {
            background: linear-gradient(to right, rgb(234 88 12), rgb(185 28 28)) !important;
          }

          .mobile-cta-offer {
            width: 100% !important;
            max-width: 32rem !important;
            margin: 0 auto !important;
            background: rgb(234 179 8) !important;
            color: black !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1.125rem, 4vw, 1.5rem) !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            transition: all 0.3s ease !important;
            border: clamp(2px, 1vw, 4px) solid white !important;
            min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          .mobile-cta-offer:hover {
            background: rgb(202 138 4) !important;
            transform: scale(1.02) !important;
          }

                    .mobile-cta-final {
            width: 100% !important;
            max-width: 28rem !important;
            margin: 0 auto !important;
            background: rgb(234 179 8) !important;
            color: black !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1.125rem, 4vw, 1.5rem) !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            transition: all 0.3s ease !important;
            border: clamp(2px, 1vw, 4px) solid white !important;
            min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          .mobile-cta-final:hover {
            background: rgb(202 138 4) !important;
            transform: scale(1.05) !important;
          }

          /* ===== TEXTO DOS BOTÕES ===== */
          .mobile-cta-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem) !important;
            line-height: 1.2 !important;
            font-weight: 700 !important;
          }

          .mobile-cta-small-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            line-height: 1.2 !important;
            font-weight: 600 !important;
          }

          .mobile-cta-offer-text {
            font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
            line-height: 1.2 !important;
            font-weight: 800 !important;
          }

          .mobile-cta-final-text {
            font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
            line-height: 1.2 !important;
            font-weight: 800 !important;
          }

          /* ===== PLAYERS DE VÍDEO MOBILE ===== */
          .mobile-video-container {
            width: 100% !important;
            max-width: 100% !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
          }

          .mobile-vturb-player {
            display: block !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            aspect-ratio: 16/9 !important;
            height: auto !important;
            min-height: clamp(200px, 40vw, 400px) !important;
          }

          vturb-smartplayer {
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            aspect-ratio: 16/9 !important;
            contain: layout style paint !important;
            min-height: clamp(200px, 40vw, 400px) !important;
          }

          .mobile-story-video {
            aspect-ratio: 9/16 !important;
            height: clamp(260px, 60vw, 320px) !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .mobile-wistia-player {
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            display: block !important;
            box-sizing: border-box !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
          }

          wistia-player[media-id='3rj8vdh574']:not(:defined) { 
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/3rj8vdh574/swatch') !important; 
            display: block !important; 
            filter: blur(5px) !important; 
            padding-top: 177.78% !important; 
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
          }
          
          wistia-player {
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 100% !important;
            display: block !important;
            box-sizing: border-box !important;
          }

          /* ===== OTIMIZAÇÕES PARA TELAS MUITO PEQUENAS ===== */
          @media (max-width: 375px) {
            .mobile-padding {
              padding: 1rem 0.75rem !important;
            }

            .mobile-headline {
              font-size: 1.25rem !important;
              line-height: 1.3 !important;
            }

            .mobile-section-title {
              font-size: 1.125rem !important;
            }

            .mobile-offer-title {
              font-size: 1.25rem !important;
            }

            .mobile-price-main {
              font-size: 2rem !important;
            }

            .mobile-grid {
              gap: 0.25rem !important;
            }

            .mobile-cta-primary,
            .mobile-cta-offer,
            .mobile-cta-final {
              padding: 0.875rem 1rem !important;
              min-height: 3rem !important;
              font-size: 0.875rem !important;
            }

            .mobile-vturb-player {
              min-height: 180px !important;
            }

            .mobile-story-video {
              height: 240px !important;
            }
          }

          /* ===== OTIMIZAÇÕES PARA TELAS MÉDIAS ===== */
          @media (min-width: 640px) {
            .mobile-padding {
              padding: 2rem 1rem !important;
            }

            .mobile-grid {
              gap: 1rem !important;
            }

            .mobile-social-gap {
              gap: 1rem !important;
            }

            .mobile-border {
              border-width: 4px !important;
            }

            .mobile-border-orange {
              border-width: 2px !important;
            }
          }

          /* ===== PERFORMANCE E ANIMAÇÕES ===== */
          .bg-gradient-to-r, 
          .bg-gradient-to-br {
            will-change: transform !important;
            backface-visibility: hidden !important;
            transform: translateZ(0) !important;
          }

          /* ===== PREVENÇÃO DE ZOOM NO IOS ===== */
          @supports (-webkit-touch-callout: none) {
            input, 
            select, 
            textarea {
              font-size: 16px !important;
            }
          }

          /* ===== SCROLL SUAVE ===== */
          html {
            scroll-behavior: smooth !important;
          }

          /* ===== TRUNCAMENTO E QUEBRA DE TEXTO ===== */
          .truncate {
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }

          .break-words {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            word-break: break-word !important;
            hyphens: auto !important;
          }

          /* ===== GARANTIR RESPONSIVIDADE TOTAL ===== */
          * {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          img, 
          video {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            box-sizing: border-box !important;
          }

          /* ===== OTIMIZAÇÕES DE TOUCH ===== */
          button,
          a,
          [role="button"] {
            min-height: 44px !important;
            min-width: 44px !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
          }

          /* ===== CONTAINER QUERIES FALLBACK ===== */
          @container (max-width: 768px) {
            .mobile-headline { font-size: 1.5rem !important; }
            .mobile-section-title { font-size: 1.25rem !important; }
            .mobile-offer-title { font-size: 1.5rem !important; }
          }

          /* ===== OTIMIZAÇÕES ESPECÍFICAS PARA LANDSCAPE MOBILE ===== */
          @media (max-height: 500px) and (orientation: landscape) {
            .mobile-padding {
              padding: 1rem 0.75rem !important;
            }

            .mobile-headline {
              font-size: 1.25rem !important;
              margin-bottom: 1rem !important;
            }

            .mobile-circle {
              width: 4rem !important;
              height: 4rem !important;
            }

            .mobile-vturb-player {
              min-height: 150px !important;
            }

            .mobile-story-video {
              height: 200px !important;
            }
          }

          /* ===== OTIMIZAÇÕES PARA ACESSIBILIDADE ===== */
          @media (prefers-reduced-motion: reduce) {
            .animate-pulse,
            .animate-bounce {
              animation: none !important;
            }

            motion-div {
              animation: none !important;
            }
          }

          /* ===== DARK MODE COMPATIBILITY ===== */
          @media (prefers-color-scheme: dark) {
            .bg-green-50 {
              background-color: rgb(20 83 45) !important;
            }

            .text-green-800 {
              color: rgb(187 247 208) !important;
            }

            .text-green-700 {
              color: rgb(134 239 172) !important;
            }

            .text-green-600 {
              color: rgb(74 222 128) !important;
            }
          }

          /* ===== GARANTIAS FINAIS DE RESPONSIVIDADE ===== */
          .min-h-screen {
            max-width: 100vw !important;
            overflow-x: hidden !important;
            width: 100% !important;
            position: relative !important;
          }

          .max-w-4xl {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 auto !important;
            padding: 0 !important;
          }

          .max-w-3xl,
          .max-w-2xl,
          .max-w-xl,
          .max-w-lg,
          .max-w-md,
          .max-w-sm,
          .max-w-xs {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 auto !important;
          }

          @media (min-width: 640px) {
            .max-w-4xl { max-width: 56rem !important; }
            .max-w-3xl { max-width: 48rem !important; }
            .max-w-2xl { max-width: 42rem !important; }
            .max-w-xl { max-width: 36rem !important; }
            .max-w-lg { max-width: 32rem !important; }
            .max-w-md { max-width: 28rem !important; }
            .max-w-sm { max-width: 24rem !important; }
            .max-w-xs { max-width: 20rem !important; }
          }
        `}</style>
      </div>
    </>
  )
}
