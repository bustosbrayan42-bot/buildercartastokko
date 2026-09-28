import fs from 'fs';
import path from 'path';

const card_text_1 = `CARTA 071
TÍTULO: GOLPE PRECISO
CLASE: Atleta de cancha
HABILIDAD: Saque ganador
EFECTO: Coloca una carta de acción en la parte superior de tu mazo.
RESEÑA: “La concentración transforma cada golpe en una oportunidad.”

CARTA 072
TÍTULO: SALTO DECISIVO
CLASE: Jugadora urbana
HABILIDAD: Lanzamiento aéreo
EFECTO: Aumenta el poder de una carta durante este turno.
RESEÑA: “Cuando se eleva, la canasta parece mucho más cerca.”

CARTA 073
TÍTULO: REMATE NEÓN
CLASE: Guerrera de playa
HABILIDAD: Remate brillante
EFECTO: Supera una defensa rival y conserva el impulso de tu jugada.
RESEÑA: “La pelota cruza la red antes de que el público pueda reaccionar.”

CARTA 074
TÍTULO: RITMO IMPARABLE
CLASE: Corredora urbana
HABILIDAD: Carrera continua
EFECTO: Avanza una etapa adicional sin perder recursos.
RESEÑA: “Cada paso la acerca a la meta y la aleja de cualquier duda.”

CARTA 075
TÍTULO: DESCENSO EXTREMO
CLASE: Ciclista de montaña
HABILIDAD: Bajada veloz
EFECTO: Obtén una acción extra si mantienes el control del turno.
RESEÑA: “La montaña no la detiene; solo le marca una nueva dirección.”

CARTA 076
TÍTULO: PULSO ACUÁTICO
CLASE: Nadadora olímpica
HABILIDAD: Carrera de agua
EFECTO: Cruza un obstáculo y roba una carta adicional.
RESEÑA: “Cada brazada corta el agua como un destello de cian.”

CARTA 077
TÍTULO: EQUILIBRIO URBANO
CLASE: Patinadora callejera
HABILIDAD: Maniobra perfecta
EFECTO: Evita una penalización y conserva tu carta en juego.
RESEÑA: “El suelo se mueve, pero ella siempre encuentra su centro.”

CARTA 078
TÍTULO: OLA BRILLANTE
CLASE: Surfista tropical
HABILIDAD: Cresta luminosa
EFECTO: Aprovecha el impulso y duplica el valor de tu próximo recurso.
RESEÑA: “Solo necesita una ola, una tabla y el momento exacto.”

CARTA 079
TÍTULO: AGARRE FIRME
CLASE: Escaladora de altura
HABILIDAD: Punto de apoyo
EFECTO: Protege una carta mientras avanzas hacia la siguiente etapa.
RESEÑA: “Cada roca es un desafío; cada agarre, una nueva victoria.”

CARTA 080
TÍTULO: NIEVE VELOZ
CLASE: Esquiadora de neón
HABILIDAD: Descenso helado
EFECTO: Reduce el coste de tu próxima acción.
RESEÑA: “La nieve se levanta detrás de ella como una estela de luz.”

CARTA 081
TÍTULO: SWING PERFECTO
CLASE: Golfista de precisión
HABILIDAD: Golpe limpio
EFECTO: Envía una carta objetivo al descarte sin activar su efecto.
RESEÑA: “Silencio, respiración y un solo movimiento perfectamente calculado.”

CARTA 082
TÍTULO: PUÑO ENERGÉTICO
CLASE: Boxeadora de gimnasio
HABILIDAD: Golpe controlado
EFECTO: Debilita una carta rival sin causar daño permanente.
RESEÑA: “Entrena para dominar su fuerza, no para perder el control.”

CARTA 083
TÍTULO: GIRO ELEGANTE
CLASE: Gimnasta artística
HABILIDAD: Rutina perfecta
EFECTO: Reorganiza dos cartas y conserva la mejor posición.
RESEÑA: “Cada movimiento parece imposible hasta que ella lo convierte en arte.”

CARTA 084
TÍTULO: PASO URBANO
CLASE: Bailarina callejera
HABILIDAD: Ritmo cinético
EFECTO: Activa una carta adicional después de resolver tu primera acción.
RESEÑA: “La plaza entera sigue su ritmo cuando comienza la música.”

CARTA 085
TÍTULO: BATEO POTENTE
CLASE: Jugadora de estadio
HABILIDAD: Línea ganadora
EFECTO: Envía un recurso rival fuera del campo durante un turno.
RESEÑA: “La pelota desaparece en el cielo antes de que llegue el aplauso.”

CARTA 086
TÍTULO: PIRUETA GLACIAL
CLASE: Patinadora artística
HABILIDAD: Giro cristalino
EFECTO: Evita un efecto rival y conserva tu siguiente acción.
RESEÑA: “El hielo refleja cada giro como si estuviera hecho de estrellas.”

CARTA 087
TÍTULO: REMO IMPULSOR
CLASE: Remera de lago
HABILIDAD: Palada poderosa
EFECTO: Avanza dos espacios y roba una carta si terminas el movimiento.
RESEÑA: “El agua se abre a su paso y las montañas observan en silencio.”

CARTA 088
TÍTULO: FLECHA CERTERA
CLASE: Arquera deportiva
HABILIDAD: Trayectoria limpia
EFECTO: Elige una carta entre varias y colócala en la cima del mazo.
RESEÑA: “La cuerda vibra una sola vez; el objetivo ya está decidido.”

CARTA 089
TÍTULO: SENDERO VIVO
CLASE: Corredora de montaña
HABILIDAD: Ritmo del bosque
EFECTO: Recupera una carta utilizada mientras mantienes tu avance.
RESEÑA: “Corre con la ligereza de quien conoce cada curva del sendero.”

CARTA 090
TÍTULO: RUEDA URBANA
CLASE: Ciclista de ciudad
HABILIDAD: Pedaleo veloz
EFECTO: Cambia la posición de una carta y continúa tu turno.
RESEÑA: “Entre luces y edificios, siempre encuentra un camino despejado.”

CARTA 091
TÍTULO: MANGUERA HEROICA
CLASE: Bombera profesional
HABILIDAD: Llama controlada
EFECTO: Elimina un peligro y protege tus cartas durante la próxima acción.
RESEÑA: “Su valor no hace ruido; aparece justo cuando alguien la necesita.”

CARTA 092
TÍTULO: RUTA AÉREA
CLASE: Piloto civil
HABILIDAD: Despegue seguro
EFECTO: Coloca una carta de transporte directamente en juego.
RESEÑA: “Cada vuelo comienza con una decisión firme y un cielo abierto.”

CARTA 093
TÍTULO: HORIZONTE ESTELAR
CLASE: Exploradora espacial
HABILIDAD: Salto orbital
EFECTO: Mira las próximas cartas y elige el camino que seguirás.
RESEÑA: “El universo es enorme, pero su curiosidad lo es todavía más.”

CARTA 094
TÍTULO: PLANO PERFECTO
CLASE: Arquitecta urbana
HABILIDAD: Diseño estructural
EFECTO: Construye una combinación de dos recursos en una sola jugada.
RESEÑA: “Antes de levantar muros, imagina todo lo que puede suceder dentro.”

CARTA 095
TÍTULO: SABOR CREATIVO
CLASE: Chef de neón
HABILIDAD: Receta brillante
EFECTO: Combina dos cartas y crea un recurso de mayor valor.
RESEÑA: “Cada ingrediente tiene un color, un aroma y una posibilidad.”

CARTA 096
TÍTULO: PULSO VETERINARIO
CLASE: Cuidadora animal
HABILIDAD: Cuidado experto
EFECTO: Restaura una carta aliada y elimina una condición negativa.
RESEÑA: “Una mirada tranquila puede devolverle la calma a cualquier criatura.”

CARTA 097
TÍTULO: MIRADA SALVAJE
CLASE: Fotógrafa naturalista
HABILIDAD: Captura lejana
EFECTO: Revela una carta oculta sin activar sus efectos.
RESEÑA: “Espera el momento exacto para guardar la belleza del paisaje.”

CARTA 098
TÍTULO: JARDÍN VIBRANTE
CLASE: Jardinera botánica
HABILIDAD: Brote brillante
EFECTO: Haz crecer un recurso y aumenta su valor durante este turno.
RESEÑA: “Entre flores y senderos, cada semilla guarda una pequeña promesa.”

CARTA 099
TÍTULO: CIELO ROTOR
CLASE: Piloto de helicóptero
HABILIDAD: Vuelo panorámico
EFECTO: Ignora un obstáculo del campo y continúa avanzando.
RESEÑA: “Desde arriba, hasta la ruta más difícil parece posible.”

CARTA 100
TÍTULO: HORNEADO ESTELAR
CLASE: Maestra pastelera
HABILIDAD: Dulce creación
EFECTO: Convierte dos recursos básicos en una carta especial.
RESEÑA: “La paciencia, el calor y un poco de magia hacen el resto.”

CARTA 101
TÍTULO: CIELO PROFUNDO
CLASE: Astrónoma nocturna
HABILIDAD: Observación estelar
EFECTO: Mira tres cartas del mazo y ordénalas como prefieras.
RESEÑA: “Cada estrella parece guardar una respuesta diferente.”

CARTA 102
TÍTULO: NOTICIA ABIERTA
CLASE: Periodista urbana
HABILIDAD: Fuente directa
EFECTO: Obtén información sobre una carta antes de elegir tu objetivo.
RESEÑA: “Hace las preguntas correctas antes de encender el micrófono.”

CARTA 103
TÍTULO: MODA ORIGINAL
CLASE: Diseñadora de atelier
HABILIDAD: Corte creativo
EFECTO: Cambia la apariencia de una carta sin alterar sus habilidades.
RESEÑA: “Una línea bien trazada puede convertir una idea en tendencia.”

CARTA 104
TÍTULO: MADERA FIRME
CLASE: Carpintera de taller
HABILIDAD: Ensamble preciso
EFECTO: Une dos recursos compatibles y crea una estructura más resistente.
RESEÑA: “Cada pieza encuentra su lugar cuando las manos conocen el oficio.”

CARTA 105
TÍTULO: GRAVEDAD CERO
CLASE: Cadete espacial
HABILIDAD: Entrenamiento orbital
EFECTO: Evita el próximo coste de movimiento de una carta.
RESEÑA: “En el espacio, incluso un pequeño impulso puede cambiarlo todo.”

CARTA 106
TÍTULO: RUTA SEGURA
CLASE: Guía de montaña
HABILIDAD: Paso experto
EFECTO: Avanza sin activar la próxima amenaza del camino.
RESEÑA: “Conoce la montaña lo suficiente para respetarla y atravesarla.”

CARTA 107
TÍTULO: ABISMO CROMÁTICO
CLASE: Buzo de arrecife
HABILIDAD: Inmersión profunda
EFECTO: Recupera una carta desde la zona de descarte acuática.
RESEÑA: “Bajo la superficie, los colores cuentan historias que nadie más escucha.”

CARTA 108
TÍTULO: CAMPAMENTO LUMINOSO
CLASE: Exploradora del bosque
HABILIDAD: Refugio nocturno
EFECTO: Protege tus cartas durante la próxima ronda.
RESEÑA: “Una tienda, una linterna y el bosque convertido en hogar.”

CARTA 109
TÍTULO: PASO MONTAÑÉS
CLASE: Caminante de altura
HABILIDAD: Sendero firme
EFECTO: Descubre una ruta alternativa y elige tu siguiente destino.
RESEÑA: “El cansancio pesa menos cuando el paisaje recompensa cada paso.”

CARTA 110
TÍTULO: RÍO IMPULSOR
CLASE: Kayakista de montaña
HABILIDAD: Corriente veloz
EFECTO: Desplaza una carta y gana una acción de movimiento.
RESEÑA: “La corriente no pregunta hacia dónde ir; ella sí sabe responder.”

CARTA 111
TÍTULO: VUELO LIBRE
CLASE: Aventurera del cielo
HABILIDAD: Planeo majestuoso
EFECTO: Cruza una zona peligrosa sin detener tu avance.
RESEÑA: “El mundo se vuelve pequeño cuando el viento sostiene tus sueños.”

CARTA 112
TÍTULO: CASCADA SERENA
CLASE: Exploradora natural
HABILIDAD: Descanso brillante
EFECTO: Recupera energía y elimina una penalización de tu campo.
RESEÑA: “El ruido del agua convierte cualquier pausa en un momento especial.”

CARTA 113
TÍTULO: CIELO VIAJERO
CLASE: Viajera de altura
HABILIDAD: Ascenso aéreo
EFECTO: Observa el campo desde arriba y elige una carta visible.
RESEÑA: “Desde la canasta, cada paisaje parece una postal viviente.”

CARTA 114
TÍTULO: FUEGO SERENO
CLASE: Campista nocturna
HABILIDAD: Calor compartido
EFECTO: Recupera una carta de apoyo y protege la siguiente jugada.
RESEÑA: “Las mejores historias aparecen cuando el fuego ilumina los rostros.”

CARTA 115
TÍTULO: LUZ PARISINA
CLASE: Viajera europea
HABILIDAD: Recuerdo icónico
EFECTO: Conserva una carta de viaje y roba una carta adicional.
RESEÑA: “Una fotografía puede guardar todo un día de aventura.”

CARTA 116
TÍTULO: HORIZONTE LIBRE
CLASE: Viajera americana
HABILIDAD: Mirada monumental
EFECTO: Revela una carta de paisaje y úsala para ampliar tu campo.
RESEÑA: “Hay lugares tan grandes que obligan a mirar hacia arriba.”

CARTA 117
TÍTULO: CAMPANADA URBANA
CLASE: Viajera londinense
HABILIDAD: Tiempo exacto
EFECTO: Ajusta el orden de dos cartas en el campo.
RESEÑA: “Cuando el reloj marca la hora, ella ya está lista para avanzar.”

CARTA 118
TÍTULO: PIEDRA ETERNA
CLASE: Viajera romana
HABILIDAD: Legado antiguo
EFECTO: Recupera una carta histórica y aumenta su resistencia.
RESEÑA: “Cada piedra conserva una historia que merece ser descubierta.”

CARTA 119
TÍTULO: FORMA SAGRADA
CLASE: Viajera catalana
HABILIDAD: Visión arquitectónica
EFECTO: Transforma una carta de estructura en un recurso especial.
RESEÑA: “La imaginación convierte la piedra en una obra que parece viva.”

CARTA 120
TÍTULO: PUERTO AUSTRAL
CLASE: Viajera oceánica
HABILIDAD: Brisa costera
EFECTO: Mueve una carta hacia una zona segura del campo.
RESEÑA: “El mar, la luz y la ciudad se encuentran en un solo recuerdo.”

CARTA 121
TÍTULO: JARDÍN BLANCO
CLASE: Viajera imperial
HABILIDAD: Paz simétrica
EFECTO: Equilibra dos recursos y elimina la diferencia entre sus valores.
RESEÑA: “Algunos lugares parecen construidos para detener el tiempo.”

CARTA 122
TÍTULO: ARENA DORADA
CLASE: Exploradora del desierto
HABILIDAD: Rastro antiguo
EFECTO: Busca una carta de aventura y colócala en tu mano.
RESEÑA: “Cada huella en la arena puede conducir a una historia milenaria.”

CARTA 123
TÍTULO: BRAZOS ABIERTOS
CLASE: Viajera tropical
HABILIDAD: Mirador verde
EFECTO: Aumenta el alcance de tus cartas de exploración durante este turno.
RESEÑA: “La ciudad y la montaña parecen abrazarse bajo el mismo cielo.”

CARTA 124
TÍTULO: MONTAÑA SERENA
CLASE: Viajera japonesa
HABILIDAD: Silencio rosado
EFECTO: Reduce el ruido del campo y protege tu próxima carta.
RESEÑA: “Entre flores y agua quieta, hasta el viento aprende a susurrar.”

CARTA 125
TÍTULO: MURALLA INFINITA
CLASE: Exploradora asiática
HABILIDAD: Camino elevado
EFECTO: Cruza una zona extensa sin gastar una acción adicional.
RESEÑA: “El sendero continúa mucho después de que desaparece el horizonte.”

CARTA 126
TÍTULO: TORRE INCLINADA
CLASE: Viajera italiana
HABILIDAD: Equilibrio turístico
EFECTO: Evita que una carta sea desplazada durante el próximo turno.
RESEÑA: “A veces la mejor fotografía requiere sostener el mundo con una mano.”

CARTA 127
TÍTULO: CIUDAD PERDIDA
CLASE: Exploradora andina
HABILIDAD: Ruta ancestral
EFECTO: Recupera una carta de exploración y revela una zona desconocida.
RESEÑA: “La niebla se aparta lentamente para mostrar un lugar fuera del tiempo.”

CARTA 128
TÍTULO: PUENTE DORADO
CLASE: Viajera californiana
HABILIDAD: Cruce brillante
EFECTO: Conecta dos zonas del campo y permite mover una carta entre ellas.
RESEÑA: “El puente une orillas, historias y nuevas posibilidades.”

CARTA 129
TÍTULO: ALTURA IMPERIAL
CLASE: Viajera futurista
HABILIDAD: Mirada vertical
EFECTO: Aumenta el valor de una carta de ciudad durante este turno.
RESEÑA: “Desde abajo parece imposible; desde cerca, solo parece enorme.”

CARTA 130
TÍTULO: ARCOÍRIS GIGANTE
CLASE: Viajera de cascadas
HABILIDAD: Salto natural
EFECTO: Elimina un obstáculo de terreno y roba una carta de paisaje.
RESEÑA: “El agua cae con tanta fuerza que parece partir el cielo en colores.”`;

const card_text_2 = `CARTA 001
TÍTULO: EDICIÓN TOTAL
CLASE: Creadora de contenido
HABILIDAD: Edición precisa
EFECTO: Reorganiza las ideas y convierte cada fragmento en una historia clara.
RESEÑA: “Donde otros ven cortes, ella encuentra ritmo.”

CARTA 002
TÍTULO: ENFOQUE PRECISO
CLASE: Cazadora de momentos
HABILIDAD: Apertura espectral
EFECTO: Roba 2 cartas de tu mazo y reorganiza la parte superior de tu baraja.
RESEÑA: “Su lente especial es capaz de ver fluctuaciones cuánticas y memorias.”

CARTA 003
TÍTULO: CUARTO IMPECABLE
CLASE: Guardiana del orden
HABILIDAD: Barrido energético
EFECTO: Elimina el desorden y recupera el control de tu espacio.
RESEÑA: “Cada rincón limpio libera una nueva dosis de energía.”

CARTA 004
TÍTULO: BRILLO DOMÉSTICO
CLASE: Maestra del hogar
HABILIDAD: Pulso reluciente
EFECTO: Limpia una zona y fortalece tu próxima acción.
RESEÑA: “Un hogar ordenado también es una estrategia.”

CARTA 005
TÍTULO: COSECHA URBANA
CLASE: Recolectora urbana
HABILIDAD: Cosecha brillante
EFECTO: Obtén recursos frescos y conserva una carta adicional en tu mano.
RESEÑA: “Sabe que las mejores decisiones se eligen una por una.”

CARTA 006
TÍTULO: PEDIDO RELÁMPAGO
CLASE: Servidora veloz
HABILIDAD: Pedido relámpago
EFECTO: Entrega una acción inmediata antes de que termine el turno.
RESEÑA: “Rapidez, sonrisa y cero errores en la bandeja.”

CARTA 007
TÍTULO: ESTILO NUEVO
CLASE: Exploradora de estilos
HABILIDAD: Cambio de imagen
EFECTO: Reemplaza una carta de tu mano por otra del mazo.
RESEÑA: “A veces el look correcto cambia toda la partida.”

CARTA 008
TÍTULO: AJUSTE PERFECTO
CLASE: Técnica de precisión
HABILIDAD: Ajuste perfecto
EFECTO: Repara un recurso dañado y déjalo listo para volver a funcionar.
RESEÑA: “Escucha al motor antes de que el motor pida ayuda.”

CARTA 009
TÍTULO: MIRA CUÁNTICA
CLASE: Heroína de neón
HABILIDAD: Mira cuántica
EFECTO: Observa las próximas cartas y elige cuál quedará en la cima.
RESEÑA: “Un segundo de enfoque puede cambiar el futuro.”

CARTA 010
TÍTULO: HALO RESTAURADOR
CLASE: Sanadora astral
HABILIDAD: Halo restaurador
EFECTO: Recupera una carta descartada y devuelve la esperanza al campo.
RESEÑA: “Su luz llega justo cuando todo parecía perdido.”

CARTA 011
TÍTULO: LECCIÓN MAESTRA
CLASE: Mentora luminosa
HABILIDAD: Lección magistral
EFECTO: Comparte conocimiento y permite que otra carta mejore su efecto.
RESEÑA: “La mejor respuesta comienza con una buena pregunta.”

CARTA 012
TÍTULO: RIESGO CALCULADO
CLASE: Estratega financiera
HABILIDAD: Riesgo calculado
EFECTO: Mira tres cartas y elige la que mejor se adapte a tu plan.
RESEÑA: “Toda gran jugada parece obvia después de verla.”

CARTA 013
TÍTULO: GUANTE BLANCO
CLASE: Sombra elegante
HABILIDAD: Hurto silencioso
EFECTO: Toma una carta rival sin revelar tu siguiente movimiento.
RESEÑA: “Nunca deja huellas; solo dudas impecables.”

CARTA 014
TÍTULO: ORDEN PÚBLICO
CLASE: Protectora cercana
HABILIDAD: Orden público
EFECTO: Protege una carta aliada y evita que sea retirada este turno.
RESEÑA: “La tranquilidad del barrio también necesita una guardiana.”

CARTA 015
TÍTULO: MINIATURA POP
CLASE: Arquitecta visual
HABILIDAD: Miniatura perfecta
EFECTO: Convierte una idea pequeña en un efecto que todos puedan notar.
RESEÑA: “Un buen detalle consigue que nadie quiera pasar de largo.”

CARTA 016
TÍTULO: VLOG DIARIO
CLASE: Cronista cotidiana
HABILIDAD: Registro instantáneo
EFECTO: Guarda el momento actual y úsalo nuevamente en tu próximo turno.
RESEÑA: “Cada día tiene una escena que merece repetirse.”

CARTA 017
TÍTULO: RETOQUE LUMÍNICO
CLASE: Alquimista de luz
HABILIDAD: Enfoque selectivo
EFECTO: Ajusta una carta y elimina una desventaja visible.
RESEÑA: “La imagen ideal suele esconderse detrás de un pequeño ajuste.”

CARTA 018
TÍTULO: SETUP ORDENADO
CLASE: Ingeniera del setup
HABILIDAD: Cableado limpio
EFECTO: Reorganiza tus recursos y recupera una acción desperdiciada.
RESEÑA: “Cuando cada cable encuentra su lugar, las ideas fluyen.”

CARTA 019
TÍTULO: VISTA CLARA
CLASE: Vigía transparente
HABILIDAD: Visión despejada
EFECTO: Retira un obstáculo y revela la próxima oportunidad.
RESEÑA: “Nada se esconde detrás de un vidrio bien pulido.”

CARTA 020
TÍTULO: CANASTA ALEGRE
CLASE: Recolectora del barrio
HABILIDAD: Canasta abundante
EFECTO: Añade dos recursos sencillos a tu mano.
RESEÑA: “Pan, fruta y una buena ruta hacen un gran día.”

CARTA 021
TÍTULO: PAQUETE SORPRESA
CLASE: Operadora de envíos
HABILIDAD: Paquete sorpresa
EFECTO: Prepara una carta y déjala lista para activarse más adelante.
RESEÑA: “El próximo gran momento puede caber en una caja.”

CARTA 022
TÍTULO: FOCO COMERCIAL
CLASE: Directora de estudio
HABILIDAD: Enfoque comercial
EFECTO: Duplica temporalmente el valor de un recurso elegido.
RESEÑA: “Con la luz correcta, hasta lo simple se vuelve inolvidable.”

CARTA 023
TÍTULO: FRECUENCIA ABIERTA
CLASE: Voz de la comunidad
HABILIDAD: Frecuencia abierta
EFECTO: Comparte una idea y roba una carta adicional.
RESEÑA: “Una conversación genuina siempre encuentra audiencia.”

CARTA 024
TÍTULO: BRILLO PROFUNDO
CLASE: Purificadora doméstica
HABILIDAD: Brillo profundo
EFECTO: Elimina un efecto negativo de una carta aliada.
RESEÑA: “Hasta la tarea más difícil mejora con música y determinación.”

CARTA 025
TÍTULO: VERDURAS FRESCAS
CLASE: Exploradora del mercado
HABILIDAD: Selección fresca
EFECTO: Elige un recurso del mazo y colócalo en tu mano.
RESEÑA: “Siempre reconoce la mejor elección entre todas las opciones.”

CARTA 026
TÍTULO: CAMBIO EXACTO
CLASE: Operadora de caja
HABILIDAD: Cambio exacto
EFECTO: Intercambia un recurso por otro del mismo valor.
RESEÑA: “La precisión también puede venir acompañada de una sonrisa.”

CARTA 027
TÍTULO: REFLEJO IDEAL
CLASE: Curadora de estilo
HABILIDAD: Reflejo ideal
EFECTO: Revisa una carta y decide si conservarla o devolverla al mazo.
RESEÑA: “El espejo no decide por ella, solo confirma su intuición.”

CARTA 028
TÍTULO: GIRO RESISTENTE
CLASE: Mecánica de emergencia
HABILIDAD: Giro resistente
EFECTO: Recupera una carta agotada y vuelve a ponerla en movimiento.
RESEÑA: “Un imprevisto no detiene a quien lleva las herramientas correctas.”

CARTA 029
TÍTULO: SALTO TEMPORAL
CLASE: Viajera temporal
HABILIDAD: Rebobinado breve
EFECTO: Repite una acción realizada durante el turno anterior.
RESEÑA: “Si algo sale mal, quizá solo falte intentarlo un segundo antes.”

CARTA 030
TÍTULO: ARENA CROMÁTICA
CLASE: Campeona del desierto
HABILIDAD: Tormenta de arena
EFECTO: Confunde al rival y reduce la precisión de su próximo efecto.
RESEÑA: “Bajo el sol intenso, cada paso se vuelve una declaración.”

CARTA 031
TÍTULO: PINCELADA VITAL
CLASE: Maestra del color
HABILIDAD: Pincelada vital
EFECTO: Transforma una carta común en una herramienta más poderosa.
RESEÑA: “No hay error que no pueda convertirse en parte de la obra.”

CARTA 032
TÍTULO: ACUERDO FAVORABLE
CLASE: Consultora ejecutiva
HABILIDAD: Acuerdo favorable
EFECTO: Negocia un intercambio y conserva el mejor resultado.
RESEÑA: “Escucha con calma; el mejor trato aparece entre líneas.”

CARTA 033
TÍTULO: SALTO SOMBRÍO
CLASE: Acróbata nocturna
HABILIDAD: Salto de sombra
EFECTO: Evade una amenaza y cambia la posición de una carta.
RESEÑA: “La ciudad duerme, pero sus pasos nunca pierden el compás.”

CARTA 034
TÍTULO: RONDA SEGURA
CLASE: Vigilante urbana
HABILIDAD: Ronda segura
EFECTO: Revisa el campo y detecta cualquier peligro oculto.
RESEÑA: “Un paseo atento puede prevenir más de lo que imaginas.”

CARTA 035
TÍTULO: ÁNIMO TOTAL
CLASE: Impulsora del chat
HABILIDAD: Explosión de ánimo
EFECTO: Aumenta la energía de todas tus cartas durante este turno.
RESEÑA: “Cuando el chat se enciende, nadie quiere quedarse quieto.”

CARTA 036
TÍTULO: REVIEW DIRECTA
CLASE: Crítica tecnológica
HABILIDAD: Evaluación sincera
EFECTO: Revela el valor de una carta antes de decidir si la utilizas.
RESEÑA: “Antes de recomendar algo, siempre lo prueba desde todos los ángulos.”

CARTA 037
TÍTULO: DETALLE LIMPIO
CLASE: Guardiana de detalles
HABILIDAD: Pulido brillante
EFECTO: Elimina una penalización y deja tu recurso listo para usar.
RESEÑA: “Los detalles pequeños son los que hacen brillar el conjunto.”

CARTA 038
TÍTULO: CARRO COMPLETO
CLASE: Navegante de pasillos
HABILIDAD: Carro completo
EFECTO: Roba hasta tener cinco cartas en tu mano.
RESEÑA: “Entró por una cosa y salió lista para toda la semana.”

CARTA 039
TÍTULO: SERVICIO EXPRESS
CLASE: Anfitriona del mostrador
HABILIDAD: Servicio express
EFECTO: Entrega un recurso aliado y activa su efecto inmediatamente.
RESEÑA: “Rapidez sin perder la amabilidad: esa es su especialidad.”

CARTA 040
TÍTULO: FARO PRECISO
CLASE: Técnica de iluminación
HABILIDAD: Faro preciso
EFECTO: Ilumina una carta oculta y descubre su efecto.
RESEÑA: “Una luz bien dirigida revela hasta el problema más pequeño.”

CARTA 041
TÍTULO: DESCENSO CELESTIAL
CLASE: Guardiana alada
HABILIDAD: Descenso celestial
EFECTO: Coloca una carta desde tu mano directamente en el campo.
RESEÑA: “Cuando extiende sus alas, incluso el caos encuentra refugio.”

CARTA 042
TÍTULO: PUNTO EXACTO
CLASE: Observadora de largo alcance
HABILIDAD: Punto exacto
EFECTO: Elige un objetivo entre varias cartas y enfoca todo el efecto.
RESEÑA: “La distancia no importa cuando la concentración es absoluta.”

CARTA 043
TÍTULO: CÓDIGO CLARO
CLASE: Instructora digital
HABILIDAD: Código claro
EFECTO: Ordena tus recursos y elimina una carta innecesaria.
RESEÑA: “Todo problema parece menos complejo después de explicarlo bien.”

CARTA 044
TÍTULO: LLAVE MAESTRA
CLASE: Guía de espacios
HABILIDAD: Llave maestra
EFECTO: Abre una zona bloqueada y permite usarla de inmediato.
RESEÑA: “Cada puerta es el comienzo de una nueva posibilidad.”

CARTA 045
TÍTULO: PIEZA ÚNICA
CLASE: Coleccionista furtiva
HABILIDAD: Pieza única
EFECTO: Toma una carta especial del descarte y añádela a tu mano.
RESEÑA: “Las vitrinas guardan tesoros; ella guarda planes mejores.”

CARTA 046
TÍTULO: SEÑAL DE PASO
CLASE: Controladora del cruce
HABILIDAD: Señal de paso
EFECTO: Detén una acción rival y concede prioridad a tu siguiente jugada.
RESEÑA: “Un gesto preciso basta para poner el caos en orden.”

CARTA 047
TÍTULO: ONDA LIMPIA
CLASE: Ingeniera de sonido
HABILIDAD: Onda limpia
EFECTO: Cancela un ruido negativo y conserva el efecto principal.
RESEÑA: “Sabe distinguir una gran idea incluso entre toda la estática.”

CARTA 048
TÍTULO: LUZ PREPARADA
CLASE: Fotógrafa doméstica
HABILIDAD: Luz preparada
EFECTO: Prepara una carta para que su próximo efecto cueste menos.
RESEÑA: “La toma perfecta comienza mucho antes de presionar el botón.”

CARTA 049
TÍTULO: ESPUMA PROTECTORA
CLASE: Cocinera ordenada
HABILIDAD: Espuma protectora
EFECTO: Limpia una carta y protégela contra el próximo efecto rival.
RESEÑA: “Entre burbujas y platos, también se construyen defensas.”

CARTA 050
TÍTULO: RESERVA BRILLANTE
CLASE: Abastecedora del hogar
HABILIDAD: Reserva brillante
EFECTO: Busca un recurso básico y guárdalo para usarlo después.
RESEÑA: “Tener lo necesario a mano es una forma de estar preparada.”

CARTA 051
TÍTULO: MEZCLA ESTIMULANTE
CLASE: Barista de neón
HABILIDAD: Mezcla estimulante
EFECTO: Combina dos recursos pequeños para crear uno de mayor valor.
RESEÑA: “Cada taza lleva energía, paciencia y un toque de color.”

CARTA 052
TÍTULO: LECTURA MECÁNICA
CLASE: Diagnóstica experta
HABILIDAD: Lectura mecánica
EFECTO: Examina un recurso y descubre si todavía puede activarse.
RESEÑA: “Antes de desmontar nada, escucha lo que la máquina quiere decir.”

CARTA 053
TÍTULO: ESCUDO PRISMÁTICO
CLASE: Defensora cromática
HABILIDAD: Escudo prismático
EFECTO: Bloquea el próximo efecto que apunte a una carta aliada.
RESEÑA: “Su defensa no apaga la luz: la convierte en un muro.”

CARTA 054
TÍTULO: PRISMA ARCANO
CLASE: Hechicera de neón
HABILIDAD: Prisma arcano
EFECTO: Cambia el tipo de energía de una carta sin alterar su poder.
RESEÑA: “La magia no se crea ni se pierde; solo cambia de color.”

CARTA 055
TÍTULO: RECREO SEGURO
CLASE: Supervisora amable
HABILIDAD: Recreo seguro
EFECTO: Mantén protegidas tus cartas mientras reorganizas tu campo.
RESEÑA: “Una mirada atenta deja espacio para que todos puedan disfrutar.”

CARTA 056
TÍTULO: MERCADO ASCENDENTE
CLASE: Operadora bursátil
HABILIDAD: Mercado ascendente
EFECTO: Aumenta temporalmente el valor de tus recursos disponibles.
RESEÑA: “Lee las tendencias como si fueran luces moviéndose en la ciudad.”

CARTA 057
TÍTULO: BRILLO ROBADO
CLASE: Cazadora de gemas
HABILIDAD: Brillo robado
EFECTO: Copia el efecto de una carta especial durante un solo turno.
RESEÑA: “La gema no era el plan; solo era imposible de ignorar.”

CARTA 058
TÍTULO: INFORME COMPLETO
CLASE: Archivista de seguridad
HABILIDAD: Informe completo
EFECTO: Revisa el descarte y recupera una carta de apoyo.
RESEÑA: “En cada carpeta hay una pista esperando ser encontrada.”

CARTA 059
TÍTULO: GUÍA CREATIVA
CLASE: Instructora manual
HABILIDAD: Explicación clara
EFECTO: Enseña una técnica y permite repetir un efecto sencillo.
RESEÑA: “El secreto no es hacerlo rápido; es mostrar cómo hacerlo bien.”

CARTA 060
TÍTULO: GALERÍA SELECTA
CLASE: Editora de recuerdos
HABILIDAD: Galería selecta
EFECTO: Mira varias opciones y conserva únicamente la mejor.
RESEÑA: “Entre cientos de imágenes, siempre encuentra la que cuenta la historia.”

CARTA 061
TÍTULO: RESERVA FRÍA
CLASE: Organizadora fresca
HABILIDAD: Reserva fría
EFECTO: Conserva una carta para más tarde y evita que sea descartada.
RESEÑA: “Todo tiene su lugar, incluso las mejores sorpresas.”

CARTA 062
TÍTULO: DOBLE ELECCIÓN
CLASE: Asesora de vestuario
HABILIDAD: Doble elección
EFECTO: Compara dos opciones y elige la que más te convenga.
RESEÑA: “Dos chaquetas, un espejo y una decisión con mucho estilo.”

CARTA 063
TÍTULO: MESA ATENDIDA
CLASE: Servidora cordial
HABILIDAD: Mesa atendida
EFECTO: Recupera un recurso utilizado y colócalo nuevamente en tu reserva.
RESEÑA: “Un buen servicio hace que todo vuelva a estar listo.”

CARTA 064
TÍTULO: PEDALEO CONTINUO
CLASE: Mecánica de movimiento
HABILIDAD: Pedaleo continuo
EFECTO: Reactiva una carta agotada y permite usarla una vez más.
RESEÑA: “Con la cadena ajustada, ningún camino parece demasiado largo.”

CARTA 065
TÍTULO: ARRANQUE TURBO
CLASE: Piloto de alto octanaje
HABILIDAD: Arranque turbo
EFECTO: Obtén impulso inmediato y adelántate a la próxima jugada.
RESEÑA: “Su motor favorito es el que todavía no conoce límites.”

CARTA 066
TÍTULO: MAPA ABIERTO
CLASE: Exploradora de portales
HABILIDAD: Mapa sin límites
EFECTO: Descubre una ruta oculta y elige entre dos caminos.
RESEÑA: “Un mapa en blanco no es un problema: es una invitación.”

CARTA 067
TÍTULO: ARMONÍA CRECIENTE
CLASE: Maestra del ritmo
HABILIDAD: Armonía creciente
EFECTO: Coordina tus cartas y mejora sus efectos en conjunto.
RESEÑA: “Cada nota encuentra su lugar cuando alguien marca el compás.”

CARTA 068
TÍTULO: PROYECCIÓN FUTURA
CLASE: Analista de tendencias
HABILIDAD: Proyección futura
EFECTO: Predice la próxima oportunidad y prepara tu estrategia.
RESEÑA: “Los números cambian; la mirada estratégica permanece.”

CARTA 069
TÍTULO: MÁSCARA BRILLANTE
CLASE: Infiltrada de gala
HABILIDAD: Máscara brillante
EFECTO: Oculta una carta y sorprende al rival cuando sea revelada.
RESEÑA: “En una gala, la mejor identidad es la que nadie cuestiona.”

CARTA 070
TÍTULO: RED VECINAL
CLASE: Protectora vecinal
HABILIDAD: Red de apoyo
EFECTO: Refuerza una carta aliada con ayuda de todos tus recursos.
RESEÑA: “Una comunidad unida siempre es más fuerte que cualquier problema.”`;

const cards_extra = [
  {
    num: 131,
    title: 'AURORA BOREAL',
    clase: 'Exploradora polar',
    habilidad: 'Danza del norte',
    efecto: 'Ilumina el campo de juego y roba dos cartas de tu mazo.',
    resena: 'El cielo nocturno se viste de verde y violeta para guiar su camino.'
  },
  {
    num: 132,
    title: 'OASIS ESCONDIDO',
    clase: 'Nómada del desierto',
    habilidad: 'Manantial puro',
    efecto: 'Restaura la energía de todas tus cartas aliadas en juego.',
    resena: 'En medio de la arena ardiente, el agua es el mayor tesoro.'
  },
  {
    num: 133,
    title: 'CIMA NEVADA',
    clase: 'Alpinista legendaria',
    habilidad: 'Conquista cumbre',
    efecto: 'Otorga inmunidad temporal a tu carta activa contra efectos rivales.',
    resena: 'El aire es delgado, pero la vista desde la cima no tiene precio.'
  },
  {
    num: 134,
    title: 'VALLE SECRETO',
    clase: 'Botánica mística',
    habilidad: 'Flora ancestral',
    efecto: 'Busca en tu mazo una carta de recurso y colócala en tu mano.',
    resena: 'Plantas que no crecen en ningún otro lugar florecen bajo su cuidado.'
  },
  {
    num: 135,
    title: 'FARO CELESTE',
    clase: 'Guardiana de costa',
    habilidad: 'Destello guía',
    efecto: 'Revela las tres primeras cartas del mazo rival.',
    resena: 'Ningún navío se pierde cuando su luz atraviesa la tormenta.'
  },
  {
    num: 136,
    title: 'CRISTAL SUBTERRÁNEO',
    clase: 'Minera espeleóloga',
    habilidad: 'Resonancia cuarzo',
    efecto: 'Aumenta el poder de tus habilidades durante este turno.',
    resena: 'La oscuridad de la cueva se desvanece ante el brillo del mineral.'
  },
  {
    num: 137,
    title: 'ISLA FLOTANTE',
    clase: 'Navegante de nubes',
    habilidad: 'Viento ascendente',
    efecto: 'Permite a una carta aliada esquivar la próxima penalización.',
    resena: 'Lugares que solo los pájaros y los soñadores han visto.'
  },
  {
    num: 138,
    title: 'TEMPLO ANTIGUO',
    clase: 'Arqueóloga mística',
    habilidad: 'Glifo sagrado',
    efecto: 'Recupera una carta del descarte y añade un punto de poder.',
    resena: 'Secretos grabados en piedra que han esperado siglos para ser leídos.'
  },
  {
    num: 139,
    title: 'CONSTELACIÓN VIVA',
    clase: 'Astrónoma estelar',
    habilidad: 'Alineación cósmica',
    efecto: 'Duplica el efecto de tu próxima habilidad especial.',
    resena: 'Las estrellas no solo brillan, también trazan el mapa de su victoria.'
  },
  {
    num: 140,
    title: 'DESTINO TOKKII',
    clase: 'Emblema del Génesis',
    habilidad: 'Chispa infinita',
    efecto: 'Une todas las energías del equipo y roba una carta adicional.',
    resena: 'El primer gran paso de un viaje que recién comienza.'
  }
];

const elements = ['impulso', 'ingenio', 'arte', 'aura', 'talento', 'estilo', 'aventura', 'desafio', 'rutina', 'leyenda'];

function parseCardsBlock(text: string) {
  const cards: Record<number, any> = {};
  const regex = /CARTA\s+(\d+)\s*\n\s*T[IÍ]TULO:\s*(.*?)\s*\n\s*CLASE:\s*(.*?)\s*\n\s*HABILIDAD:\s*(.*?)\s*\n\s*EFECTO:\s*(.*?)\s*\n\s*RESE[ÑN]A:\s*([“"'].*?[”"'])/gis;
  
  let match;
  while ((match = regex.exec(text)) !== null) {
    const num = parseInt(match[1], 10);
    const title = match[2].trim();
    const clase = match[3].trim();
    const habilidad = match[4].trim();
    const efecto = match[5].trim();
    const resena = match[6].trim().replace(/^[“"']+|[”"']+$/g, '');
    cards[num] = { num, title, clase, habilidad, efecto, resena };
  }
  return cards;
}

const allRawCards: Record<number, any> = {
  ...parseCardsBlock(card_text_2),
  ...parseCardsBlock(card_text_1),
};

for (const extra of cards_extra) {
  allRawCards[extra.num] = extra;
}

console.log(`Total parsed cards: ${Object.keys(allRawCards).length}`);

const cardsData: any[] = [];
for (let num = 1; num <= 140; num++) {
  const c = allRawCards[num];
  if (!c) {
    console.warn(`Missing card ${num}`);
    continue;
  }
  const numStr = String(num).padStart(3, '0');
  const element = elements[(num - 1) % elements.length];

  cardsData.push({
    id: `tokkii-${numStr}`,
    title: `Tokkii - ${c.title}`,
    subtitle: `${c.clase} • Edición Génesis`,
    image: '/cards/tokkii_photographer.jpg',
    imageZoom: 1,
    imageOffsetX: 0,
    imageOffsetY: 0,
    imageRotation: 0,
    imageFit: 'cover',
    rarity: 'common',
    element: element,
    hp: 80 + ((num * 5) % 40),
    cardNumber: numStr,
    totalInSet: '140',
    artist: 'Tokkii Studio',
    flavorText: c.resena,
    abilityName: c.habilidad,
    abilityCost: [element],
    abilityDamage: String(20 + ((num * 10) % 50)),
    abilityDesc: c.efecto,
    attacks: [
      {
        id: `atk-${num}`,
        name: c.habilidad,
        cost: [element],
        damage: String(20 + ((num * 10) % 50)),
        description: c.efecto
      }
    ],
    retreatCost: 1,
    isFullArt: false,
    dateAdded: '2026-09-28',
    tags: ['Tokkii', c.clase, 'Génesis', 'Común']
  });
}

const tsContent = `import type { CardData, BoosterPackConfig } from '../types/card';

export const DEFAULT_CARDS: CardData[] = ${JSON.stringify(cardsData, null, 2)};

export const DEFAULT_PACK_CONFIG: BoosterPackConfig = {
  packTitle: 'Sobre de Colección Tokkii',
  packSubtitle: 'Edición Génesis 1.ª Serie',
  seriesName: 'TOKKII TCG SERIES',
  badgeText: '1 CARTA POR SOBRE',
  gradientTheme: 'gold',
  cardsPerPack: 1,
  crimpColor: '#f59e0b',
  soundEnabled: true,
  dropRates: {
    common: 50,
    uncommon: 30,
    rare: 14,
    super_rare: 4.5,
    ultra_rare: 1.5,
    secret_rare: 0,
  },
  packSizeRules: {
    1: {
      enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare'],
      dropRates: {
        common: 55,
        uncommon: 30,
        rare: 11,
        super_rare: 3.5,
        ultra_rare: 0.5,
        secret_rare: 0,
      },
      guaranteedSlotMinRarity: 'none',
      guaranteedSlotRates: {
        common: 55,
        uncommon: 30,
        rare: 11,
        super_rare: 3.5,
        ultra_rare: 0.5,
        secret_rare: 0,
      },
    },
    3: {
      enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare'],
      dropRates: {
        common: 48,
        uncommon: 32,
        rare: 14,
        super_rare: 5,
        ultra_rare: 1,
        secret_rare: 0,
      },
      guaranteedSlotMinRarity: 'rare',
      guaranteedSlotRates: {
        common: 0,
        uncommon: 0,
        rare: 75,
        super_rare: 20,
        ultra_rare: 5,
        secret_rare: 0,
      },
    },
    5: {
      enabledRarities: ['common', 'uncommon', 'rare', 'super_rare', 'ultra_rare', 'secret_rare'],
      dropRates: {
        common: 40,
        uncommon: 32,
        rare: 17,
        super_rare: 7,
        ultra_rare: 3,
        secret_rare: 1,
      },
      guaranteedSlotMinRarity: 'super_rare',
      guaranteedSlotRates: {
        common: 0,
        uncommon: 0,
        rare: 45,
        super_rare: 38,
        ultra_rare: 13,
        secret_rare: 4,
      },
    },
  },
  cardWeights: {},
};
`;

fs.writeFileSync('E:/Imágenes/Tokkii/Builder_Visor_Imagenes/src/data/defaultData.ts', tsContent, 'utf8');
console.log('Successfully wrote defaultData.ts in Builder!');

const visorTsContent = `import type { CardData } from '../types/card';

export const DEFAULT_CARDS: CardData[] = ${JSON.stringify(cardsData, null, 2)};
`;

fs.writeFileSync('E:/Imágenes/Tokkii/Visor_Imagenes/src/data/defaultCards.ts', visorTsContent, 'utf8');
console.log('Successfully wrote defaultCards.ts in Visor!');
