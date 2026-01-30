"use client";

import Link from "next/link";

export default function InstructionsPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fondo con gradiente animado */}
      <div className="fixed inset-0 liquid-bg opacity-20"></div>
      
      {/* Partículas de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="mb-8 text-center">
          <div className="flex justify-center gap-3 mb-4 text-5xl">
            <span>🍸</span>
            <span>🍷</span>
            <span>🔥</span>
            <span>💋</span>
            <span>🥃</span>
            <span>🍾</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 neon-text bg-gradient-to-r from-pink-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
            Instrucciones del Juego
          </h1>
          <p className="text-pink-300 text-lg mb-6 font-semibold">
            La guía completa para la noche más intensa
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 glass-effect text-white font-black rounded-xl transition-all seductive-hover shadow-xl neon-border"
          >
            <span className="flex items-center gap-2">
              <span>←</span>
              <span>Volver al Juego</span>
              <span>🔥</span>
            </span>
          </Link>
        </div>

        <div className="glass-effect rounded-3xl p-6 md:p-8 shadow-2xl neon-border space-y-8">
          {/* Introducción */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-400">
              🎮 ¿Qué es este juego?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Un juego competitivo de preguntas y desafíos picantes diseñado para grupos de amigos adultos. 
              Gana puntos completando desafíos, respondiendo preguntas honestamente y aprovechando los efectos 
              del dado virtual. El jugador con más puntos al final gana.
            </p>
          </section>

          {/* Configuración Inicial */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-400">
              ⚙️ Configuración Inicial
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  1. Agregar Jugadores
                </h3>
                <p>
                  Agrega entre 2 y 10 jugadores escribiendo sus nombres. Cada jugador debe tener un nombre único.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  2. Seleccionar Modo de Juego
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-pink-300">Competitivo:</strong> Modo con sistema de puntos completo</li>
                  <li><strong className="text-red-300">Extremo:</strong> Contenido máximo y puntos x2</li>
                  <li><strong className="text-purple-300">Mixto:</strong> Combinación de preguntas y desafíos</li>
                  <li><strong className="text-blue-300">Solo Preguntas:</strong> Únicamente preguntas</li>
                  <li><strong className="text-orange-300">Solo Desafíos:</strong> Únicamente desafíos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  3. Elegir Nivel de Intensidad
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-green-300">Suave (x1):</strong> Contenido más suave, puntos normales</li>
                  <li><strong className="text-yellow-300">Moderado (x1.5):</strong> Contenido moderado, puntos x1.5</li>
                  <li><strong className="text-orange-300">Extremo (x2):</strong> Contenido intenso, puntos x2</li>
                  <li><strong className="text-red-300">Insano (x3):</strong> Contenido máximo, puntos x3</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cómo Jugar */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-400">
              🎯 Cómo Jugar
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  Paso 1: Lanzar el Dado Virtual
                </h3>
                <p>
                  Al inicio de cada turno, el jugador activo puede lanzar el dado virtual. El dado puede otorgar:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Multiplicadores de puntos (x2, x3, x5)</li>
                  <li>Bonificaciones de puntos gratis</li>
                  <li>Desafíos dobles</li>
                  <li>Pasar turno sin penalización</li>
                  <li>Elegir tu propio desafío</li>
                  <li>Penalizaciones</li>
                </ul>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  Paso 2: Ver Pregunta o Desafío
                </h3>
                <p>
                  Se mostrará una pregunta o desafío según el modo de juego seleccionado. 
                  Las preguntas y desafíos están organizados por categorías y niveles de intensidad.
                </p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  Paso 3: Completar o Responder
                </h3>
                <p>
                  <strong className="text-pink-300">Para Preguntas:</strong> Responde honestamente y presiona &quot;Respondido&quot; para ganar puntos.
                </p>
                <p className="mt-2">
                  <strong className="text-pink-300">Para Desafíos:</strong> Completa el desafío y presiona &quot;Completado&quot; para ganar puntos, 
                  o &quot;Rechazar&quot; si no puedes completarlo (pierdes puntos).
                </p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  Paso 4: Siguiente Turno
                </h3>
                <p>
                  Después de completar o responder, presiona &quot;Siguiente Turno&quot; para pasar al siguiente jugador.
                </p>
              </div>
            </div>
          </section>

          {/* Sistema de Puntos */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-400">
              💰 Sistema de Puntos
            </h2>
            <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 p-6 rounded-lg border border-pink-500/30">
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-pink-300">
                    Puntos Base
                  </h3>
                  <ul className="space-y-2">
                    <li>• Preguntas: 10 puntos base</li>
                    <li>• Desafíos Suaves: 20 puntos</li>
                    <li>• Desafíos Intermedios: 30 puntos</li>
                    <li>• Desafíos Extremos: 40 puntos</li>
                    <li>• Desafíos Físicos: 35 puntos</li>
                    <li>• Desafíos Digitales: 30 puntos</li>
                    <li>• Desafíos Grupales: 50 puntos</li>
                    <li>• Desafíos Tabú: 60 puntos</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">
                    Multiplicadores
                  </h3>
                  <ul className="space-y-2">
                    <li>• Nivel de Intensidad: x1 a x3</li>
                    <li>• Dado Virtual: x2, x3, x5</li>
                    <li>• Rondas Especiales: x1.5 a x3</li>
                    <li>• Bonificaciones: +10 a +25 puntos</li>
                    <li>• Penalizaciones: -10 a -15 puntos</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Rondas Especiales */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-400">
              🔥 Rondas Especiales
            </h2>
            <p className="text-gray-300 mb-4">
              Cada 5-7 rondas normales, se activa automáticamente una ronda especial que modifica las reglas temporalmente:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                <h3 className="text-lg font-semibold text-orange-300 mb-2">🔥 Ronda de Fuego</h3>
                <p className="text-gray-300 text-sm">Todos los desafíos son extremos, puntos x2</p>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">💬 Ronda de Verdad</h3>
                <p className="text-gray-300 text-sm">Solo preguntas, puntos por honestidad</p>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">💪 Ronda de Desafío</h3>
                <p className="text-gray-300 text-sm">Solo desafíos físicos, puntos x1.5</p>
              </div>
              <div className="bg-pink-900/30 p-4 rounded-lg border border-pink-500/30">
                <h3 className="text-lg font-semibold text-pink-300 mb-2">👫 Ronda de Parejas</h3>
                <p className="text-gray-300 text-sm">Desafíos en parejas, puntos x2</p>
              </div>
              <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                <h3 className="text-lg font-semibold text-red-300 mb-2">🚫 Ronda Tabú</h3>
                <p className="text-gray-300 text-sm">Solo contenido tabú, puntos x3</p>
              </div>
              <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/30">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">👥 Ronda Grupal</h3>
                <p className="text-gray-300 text-sm">Todos participan, puntos x2</p>
              </div>
            </div>
          </section>

          {/* Eventos Especiales */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-400">
              ⚡ Eventos Especiales
            </h2>
            <p className="text-gray-300 mb-4">
              Durante el juego pueden aparecer eventos aleatorios que modifican la partida:
            </p>
            <div className="space-y-2 text-gray-300">
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <strong className="text-pink-300">Caos Total:</strong> Todos pierden 10 puntos
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <strong className="text-pink-300">Último Lugar:</strong> El jugador con menos puntos pierde su turno
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <strong className="text-pink-300">Doble o Nada:</strong> El siguiente desafío vale el doble o cero
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <strong className="text-pink-300">Intercambio de Poder:</strong> El último y el primero intercambian puntos
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <strong className="text-pink-300">Desafío Grupal:</strong> Todos deben completar un desafío juntos
              </div>
            </div>
          </section>

          {/* Tabla de Clasificación */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-400">
              🏆 Tabla de Clasificación
            </h2>
            <p className="text-gray-300 mb-4">
              La tabla de clasificación se actualiza en tiempo real y muestra:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li>Posición de cada jugador (🥇 🥈 🥉)</li>
              <li>Puntos totales acumulados</li>
              <li>Número de desafíos completados</li>
              <li>Indicador del jugador actual</li>
            </ul>
          </section>

          {/* Consejos */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-400">
              💡 Consejos y Estrategias
            </h2>
            <div className="space-y-3 text-gray-300">
              <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 p-4 rounded-lg border-l-4 border-pink-500">
                <p>
                  <strong className="text-pink-300">💎 Usa el Dado Sabiamente:</strong> El dado puede multiplicar tus puntos significativamente. 
                  Lánzalo al inicio de cada turno para maximizar tus ganancias.
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 rounded-lg border-l-4 border-purple-500">
                <p>
                  <strong className="text-purple-300">🎯 Completa los Desafíos:</strong> Los desafíos otorgan más puntos que las preguntas. 
                  Intenta completarlos siempre que sea posible.
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-4 rounded-lg border-l-4 border-orange-500">
                <p>
                  <strong className="text-orange-300">🔥 Aprovecha las Rondas Especiales:</strong> Las rondas especiales multiplican tus puntos. 
                  Asegúrate de completar desafíos durante estas rondas.
                </p>
              </div>
              <div className="bg-gradient-to-r from-cyan-900/20 to-green-900/20 p-4 rounded-lg border-l-4 border-cyan-500">
                <p>
                  <strong className="text-cyan-300">⚡ Estate Atento a los Eventos:</strong> Los eventos especiales pueden cambiar el juego. 
                  Adapta tu estrategia según el evento activo.
                </p>
              </div>
            </div>
          </section>

          {/* Advertencia */}
          <section className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-400">
              ⚠️ Advertencia Importante
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Este juego contiene contenido para adultos. Asegúrate de que todos los participantes sean mayores de edad 
              y estén de acuerdo con participar. Respeta los límites de cada jugador y nunca fuerces a nadie a hacer algo 
              con lo que no se sienta cómodo. El juego es para diversión entre amigos, siempre con respeto y consentimiento.
            </p>
          </section>

          {/* Botón Volver */}
          <div className="text-center pt-6">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-600 via-red-600 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-pink-700 hover:via-red-700 hover:to-purple-700 transition-all shadow-lg transform hover:scale-105"
            >
              🎮 Comenzar a Jugar
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
