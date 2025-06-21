"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Gift,
  Star,
  Shield,
  ArrowRight,
  Check,
  Clock,
  AlertTriangle,
  BookOpen,
  Users,
  Zap,
  Target,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { enviarEvento } from "../../lib/analytics"

export default function ResultPageOptimized() {
  const [unlockedBonuses, setUnlockedBonuses] = useState<number[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [recentBuyers, setRecentBuyers] = useState(3)
  const [userGender, setUserGender] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedBonuses = localStorage.getItem("unlockedBonuses")
    const savedValue = localStorage.getItem("totalValue")
    const savedGender = localStorage.getItem("userGender")

    if (savedBonuses) setUnlockedBonuses(JSON.parse(savedBonuses))
    if (savedValue) setTotalValue(Number.parseInt(savedValue))
    if (savedGender) setUserGender(savedGender)

    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Simular compradores recientes con comportamiento más dinámico
    const interval = setInterval(() => {
      setRecentBuyers((prev) => {
        const increase = Math.floor(Math.random() * 3) + 1
        return Math.min(prev + increase, 17)
      })
    }, 30000)

    // Registra visualización de la página de resultado
    try {
      enviarEvento("visualizou_resultado")
      console.log("Evento de visualización registrado con éxito")
    } catch (error) {
      console.error("Error al registrar evento de visualización:", error)
    }

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
    window.open("https://pay.hotmart.com/F100142422S?off=qqcmu6vg&checkoutMode=10", "_blank")
  }

  const getPersonalizedPronoun = () => {
    return userGender === "FEMININO" ? "él" : "ella"
  }

  // Función para feedback táctil en dispositivos móviles
  const handleTouchFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black" ref={contentRef}>
      {/* HERO SECTION - RESULTADO IMPACTANTE */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 animate-pulse"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          className="relative z-10 px-4 py-8 text-center"
        >
          {/* Badge de Urgencia */}
          <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
            <Zap className="w-4 h-4 mr-2" />
            RESULTADO DISPONIBLE POR TIEMPO LIMITADO
          </div>

          {/* Headline Principal - Mobile Optimized */}
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            🎯 <span className="text-orange-400">¡FELICITACIONES!</span>
            <br />
            TU CASO TIENE UN <span className="text-green-400">90,5%</span>
            <br />
            DE PROBABILIDAD DE ÉXITO
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto font-semibold">
            Basándome en tus respuestas,{" "}
            <span className="text-orange-300 font-bold">{getPersonalizedPronoun()} aún siente algo por ti</span> y
            puedes recuperar la relación en tan solo 21 días.
          </p>

          {/* Resultado Visual Impactante */}
          <div className="max-w-md mx-auto mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 border-4 border-yellow-400 shadow-2xl">
              <CardContent className="p-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
                  <div className="relative z-10 w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white mb-4">
                    <div className="text-center">
                      <span className="text-3xl font-extrabold text-black">90,5%</span>
                      <p className="text-xs font-bold text-black">COMPATIBLE</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">TU DIAGNÓSTICO:</h3>
                <div className="text-left space-y-2 text-white">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">
                      Tipo de ruptura: <strong>Altamente recuperable</strong>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">
                      Tiempo estimado: <strong>14-21 días</strong>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">
                      Estrategia recomendada: <strong>Plan A</strong>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Principal - Mobile Optimized */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="mb-6"
          >
            <Button
              onClick={handlePurchase}
              size="lg"
              className="w-full max-w-sm mx-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black py-6 px-8 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-yellow-400"
              onTouchStart={handleTouchFeedback}
            >
              <Heart className="w-6 h-6 mr-2" />
              RECUPERAR AHORA POR $9
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>

          {/* Social Proof Dinámico */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4 text-sm text-white">
              <div className="flex items-center">
                <Users className="w-4 h-4 text-orange-400 mr-1" />
                <span>
                  <strong className="text-orange-400">{recentBuyers}</strong> personas compraron hoy
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-red-400 mr-1" />
                <span>
                  Expira en: <CountdownTimer minutes={15} seconds={0} />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SECCIÓN DE URGENCIA Y ESCASEZ */}
      <div className="px-4 py-8 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-red-600 border-4 border-yellow-400 shadow-2xl">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">⚠️ ATENCIÓN: VENTANA DE OPORTUNIDAD LIMITADA</h2>
              <p className="text-white text-lg mb-4">
                <strong>Solo hoy</strong> tienes acceso al sistema completo por $9 (valor normal $97). Después de esta
                oferta, el precio vuelve a la normalidad y los bonos dejan de estar disponibles.
              </p>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-yellow-300 font-bold text-xl mb-2">LA OFERTA EXPIRA EN:</p>
                <div className="text-3xl font-black text-white">
                  <CountdownTimer minutes={15} seconds={0} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* VÍDEO VSL - POSICIÓN ESTRATÉGICA */}
      <div className="px-4 py-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              🎯 <span className="text-orange-400">DESCUBRE EL MÉTODO</span> QUE HACE POSIBLE TU RESULTADO
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              3 especialistas revelan los{" "}
              <span className="text-orange-400 font-bold">disparadores psicológicos exactos</span> que harán que{" "}
              {getPersonalizedPronoun()} regrese sin perseguir ni suplicar
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative bg-black rounded-2xl p-4 border-4 border-orange-500 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-2xl animate-pulse"></div>
              <div className="relative z-10">
                <script src="https://fast.wistia.com/player.js" async></script>
                <script src="https://fast.wistia.com/embed/6fyiaz12pl.js" async type="module"></script>
                <wistia-player media-id="6fyiaz12pl" aspect="1.7877094972067038"></wistia-player>
              </div>
            </div>

            {/* Call to Action após o vídeo */}
            <div className="text-center mt-6">
              <div className="bg-orange-600 text-white py-3 px-6 rounded-full inline-block font-bold text-lg mb-4 animate-bounce">
                👆 APLICA ESTO Y VERÁS RESULTADOS EN DÍAS
              </div>
              <p className="text-white text-lg font-semibold">
                Ahora que conoces el método, es hora de <span className="text-orange-400">ponerlo en práctica</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSFORMACIÓN ANTES/DESPUÉS - MOBILE OPTIMIZED */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            TU VIDA EN <span className="text-red-400">21 DÍAS</span>
          </h2>

          <div className="grid gap-6">
            {/* ANTES */}
            <Card className="bg-gradient-to-r from-red-900 to-red-800 border-2 border-red-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-red-300 mb-4 text-center">😢 AHORA (SIN EL PLAN A)</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">✗</span>
                    </div>
                    <span className="text-red-100">Sufriendo con el dolor de la separación todos los días</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">✗</span>
                    </div>
                    <span className="text-red-100">Intentando estrategias que solo empeoran la situación</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">✗</span>
                    </div>
                    <span className="text-red-100">Viendo cómo {getPersonalizedPronoun()} se aleja cada vez más</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DESPUÉS */}
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-2 border-green-400">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-green-100 mb-4 text-center">😍 EN 21 DÍAS (CON EL PLAN A)</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-800" />
                    </div>
                    <span className="text-green-100 font-semibold">
                      {getPersonalizedPronoun()} respondiendo a tus mensajes con interés
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-800" />
                    </div>
                    <span className="text-green-100 font-semibold">Viendo ese brillo en su mirada cuando te ve</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-800" />
                    </div>
                    <span className="text-green-100 font-semibold">
                      Construyendo una relación aún más fuerte que antes
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Estratégico */}
          <div className="text-center mt-8">
            <Button
              onClick={handlePurchase}
              size="lg"
              className="w-full max-w-sm mx-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 px-6 rounded-full text-lg shadow-xl transition-all duration-300"
              onTouchStart={handleTouchFeedback}
            >
              QUIERO ESTA TRANSFORMACIÓN
              <Target className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF IMPACTANTE */}
      <div className="px-4 py-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-2">RESULTADOS COMPROBADOS</h2>
          <p className="text-orange-400 text-lg mb-8">Más de 3.847 personas ya han recuperado sus relaciones</p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-orange-500">
              <div className="text-4xl font-bold text-orange-400 mb-2">87%</div>
              <p className="text-white">Ven resultados en 14 días</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-orange-500">
              <div className="text-4xl font-bold text-orange-400 mb-2">3.847+</div>
              <p className="text-white">Relaciones recuperadas</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-orange-500">
              <div className="text-4xl font-bold text-orange-400 mb-2">21</div>
              <p className="text-white">Días o menos</p>
            </div>
          </div>

          {/* Testimonio Destacado */}
          <Card className="bg-white shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img
                    src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/04-roberto.png"
                    alt="Cliente satisfecho"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">Carlos M., 34 años</h4>
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg font-semibold mb-3">
                "Ella había bloqueado mi número y decía que nunca más quería verme. Seguí el Plan A exactamente como
                estaba escrito y en 18 días me llamó llorando pidiendo que volviéramos. ¡Hoy estamos comprometidos!"
              </p>
              <div className="text-sm text-green-600 font-bold">✅ Reconciliado hace 8 meses</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* OFERTA PRINCIPAL - MOBILE OPTIMIZED */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl border-4 border-yellow-400">
            <CardContent className="p-8 text-center">
              <div className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full inline-block mb-6 text-lg">
                🔥 OFERTA ESPECIAL - SOLO HOY
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-6">PLAN A - RECUPERACIÓN RÁPIDA</h2>

              <p className="text-xl mb-8 font-semibold">Sistema Completo + 2 Bonos Exclusivos</p>

              {/* Productos Incluidos */}
              <div className="bg-white/20 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-2xl font-bold text-yellow-300 mb-6 text-center">LO QUE RECIBES HOY:</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">PLAN A: Sistema Completo</h4>
                      <p className="text-gray-200 mb-2">
                        4 módulos con estrategias paso a paso para cualquier tipo de ruptura
                      </p>
                      <div className="flex items-center">
                        <span className="text-gray-300 line-through mr-2 text-lg">$97</span>
                        <span className="text-yellow-300 font-bold text-xl">$9</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Gift className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">BONO #1: 21 Gatillos Emocionales</h4>
                      <p className="text-gray-200 mb-2">Frases exactas que despiertan sentimientos profundos</p>
                      <div className="flex items-center">
                        <span className="text-gray-300 line-through mr-2 text-lg">$47</span>
                        <span className="text-green-400 font-bold text-xl">GRATIS</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">BONO #2: Protocolo de Emergencia</h4>
                      <p className="text-gray-200 mb-2">Guía para situaciones críticas en las primeras 72 horas</p>
                      <div className="flex items-center">
                        <span className="text-gray-300 line-through mr-2 text-lg">$37</span>
                        <span className="text-green-400 font-bold text-xl">GRATIS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumen de la Oferta */}
              <div className="bg-black/30 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h4 className="font-bold text-yellow-300 mb-2">VALOR TOTAL:</h4>
                    <div className="text-3xl font-bold">
                      <span className="line-through text-gray-400">$181</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-300 mb-2">HOY SOLO:</h4>
                    <div className="text-3xl font-bold text-yellow-300">$9</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-green-400 font-bold text-xl">¡AHORRAS $172!</p>
                </div>
              </div>

              {/* CTA Principal Gigante */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="mb-6"
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black py-6 px-8 rounded-full text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-white"
                  onTouchStart={handleTouchFeedback}
                >
                  💕 RECUPERAR AHORA POR $9
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </motion.div>

              <div className="flex justify-center gap-4 text-sm text-white flex-wrap mb-4">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-1" />
                  <span>Acceso inmediato</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-1" />
                  <span>Garantía 30 días</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-1" />
                  <span>Soporte incluido</span>
                </div>
              </div>

              {recentBuyers > 0 && (
                <div className="bg-red-500 text-white py-3 px-6 rounded-full inline-block font-bold">
                  🔥 ¡{recentBuyers} personas compraron en las últimas 2 horas!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* GARANTÍA */}
      <div className="px-4 py-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-green-50 border-4 border-green-400 shadow-2xl">
            <CardContent className="p-8 text-center">
              <Shield className="w-20 h-20 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-green-800 mb-4">GARANTÍA TOTAL DE 30 DÍAS</h2>
              <p className="text-green-700 text-xl font-semibold mb-4">
                Si no ves resultados, te devolvemos el 100% de tu dinero
              </p>
              <p className="text-green-600 max-w-2xl mx-auto">
                Estamos tan seguros de que este método va a funcionar para ti que ofrecemos una garantía completa. Si
                sigues el plan durante 30 días y no ves resultados, te devolvemos todo tu dinero sin hacer preguntas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ ESENCIAL - MOBILE OPTIMIZED */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">PREGUNTAS FRECUENTES</h2>

          <div className="space-y-4">
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-3">
                  ¿Y si {getPersonalizedPronoun()} ya está con otra persona?
                </h3>
                <p className="text-gray-300">
                  El método funciona incluso cuando hay terceras personas involucradas. El 67% de nuestros casos de
                  éxito comenzaron exactamente en esta situación. El Módulo 3 enseña estrategias específicas para estos
                  casos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-3">¿Cuánto tiempo tarda en ver resultados?</h3>
                <p className="text-gray-300">
                  El 87% de los usuarios ven los primeros cambios positivos en menos de 14 días. El sistema completo
                  está diseñado para funcionar en 21 días, pero muchos consiguen resultados más rápidos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-3">¿Cómo recibo el acceso?</h3>
                <p className="text-gray-300">
                  Inmediatamente después de la confirmación del pago, recibes un email con tus credenciales de acceso.
                  Todo el contenido queda disponible al momento, incluyendo los bonos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA FINAL URGENTE */}
      <div className="px-4 py-8 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border-4 border-yellow-400">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">⏰ ÚLTIMA OPORTUNIDAD</h2>
            <p className="text-xl text-white mb-6 font-semibold">
              Esta oferta expira en pocos minutos. Después de esto, el precio vuelve a los $97 normales.
            </p>

            <div className="bg-red-800 p-4 rounded-lg mb-6">
              <p className="text-yellow-300 font-bold text-lg mb-2">TIEMPO RESTANTE:</p>
              <div className="text-4xl font-black text-white">
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
            >
              <Button
                onClick={handlePurchase}
                size="lg"
                className="w-full max-w-md mx-auto bg-yellow-500 hover:bg-yellow-600 text-black font-black py-6 px-8 rounded-full text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-white"
                onTouchStart={handleTouchFeedback}
              >
                💕 ¡SÍ, QUIERO RECUPERAR AHORA!
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </motion.div>

            <p className="text-yellow-300 text-sm mt-4 font-semibold">
              Haz clic ahora antes de que sea demasiado tarde
            </p>
          </div>
        </div>
      </div>

      {/* Estilos CSS Mobile-First + Wistia */}
      <style jsx global>{`
        /* Estilos para el player Wistia */
        wistia-player[media-id='6fyiaz12pl']:not(:defined) { 
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/6fyiaz12pl/swatch'); 
          display: block; 
          filter: blur(5px); 
          padding-top: 55.94%; 
          border-radius: 12px;
        }
        
        wistia-player {
          border-radius: 12px !important;
          overflow: hidden;
          width: 100% !important;
        }

        @media (max-width: 768px) {
          .timeline-card {
            margin-left: 0 !important;
            margin-right: 0 !important;
            width: 100% !important;
          }
          
          .product-image {
            max-height: 200px;
            object-fit: contain;
          }
          
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }

          /* Optimizaciones específicas para móvil */
          button {
            min-height: 44px !important;
            touch-action: manipulation;
          }

          .text-3xl {
            font-size: 1.875rem !important;
            line-height: 2.25rem !important;
          }

          .text-4xl {
            font-size: 2.25rem !important;
            line-height: 2.5rem !important;
          }

          /* Mejor legibilidad en móvil */
          p {
            line-height: 1.6 !important;
          }

          /* CTAs más visibles en móvil */
          .bg-gradient-to-r {
            background-attachment: fixed;
          }

          /* Wistia responsivo en móvil */
          wistia-player[media-id='6fyiaz12pl']:not(:defined) {
            padding-top: 56.25% !important;
          }
        }

        /* Animaciones optimizadas para móvil */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
