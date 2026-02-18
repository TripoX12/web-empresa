import { Method, MethodCategory, Difficulty, ScamEntry, BlogPost } from './types';

// --- WALL OF SHAME DATA ---
export const SCAM_DATABASE: ScamEntry[] = [
  { id: 's1', name: 'OmegaPro', type: 'Ponzi Scheme', riskLevel: 'Critical', status: 'SCAM', reason: 'Colapso financiero global. Fondos congelados indefinidamente. Usaban un falso algoritmo de trading.', dateReported: '2022' },
  { id: 's2', name: 'GoArbit', type: 'Ponzi Crypto', riskLevel: 'Critical', status: 'SCAM', reason: 'Token interno (Square Token) sin liquidez real. Rentabilidades imposibles (200% ROI).', dateReported: '2023' },
  { id: 's3', name: 'Validus', type: 'MLM', riskLevel: 'Critical', status: 'SCAM', reason: 'Esquema piramidal sin producto real. La "academia" era una fachada para captar capital.', dateReported: '2023' },
  { id: 's4', name: 'Quantum Leap', type: 'Ponzi', riskLevel: 'Critical', status: 'SCAM', reason: 'CEO desaparecido con fondos de usuarios. Prometían arbitraje cuántico inexistente.', dateReported: '2024' },
  { id: 's5', name: 'Ganancias Deportivas', type: 'Betting Ponzi', riskLevel: 'Critical', status: 'SCAM', reason: 'No hacían apuestas reales. Pagaban con dinero de nuevos entrantes (Esquema Ponzi de libro).', dateReported: '2022' },
  { id: 's6', name: 'FTX', type: 'Exchange', riskLevel: 'Critical', status: 'SCAM', reason: 'Fraude corporativo masivo y malversación de fondos de clientes por Sam Bankman-Fried.', dateReported: '2022' },
  { id: 's7', name: 'Amz-Orders-Bot', type: 'Phishing', riskLevel: 'High', status: 'SCAM', reason: 'Suplantación de identidad de Amazon. Piden depósito previo en USDT para "liberar pedidos".', dateReported: '2024' },
  { id: 's8', name: 'Task-Shein-VIP', type: 'Task Scam', riskLevel: 'High', status: 'SCAM', reason: 'Estafa de tareas falsas. Te dejan retirar $2 y luego te exigen depositar $100 para seguir.', dateReported: '2024' },
  // Grey Hat / Legit in Scam DB context
  { id: 'w1', name: 'Venta de Reseñas (Maps)', type: 'Marketing Grey Hat', riskLevel: 'Warning', status: 'WARNING', reason: 'Negocio rentable de gestión de reputación. Google puede borrar reseñas, pero pagan bien por la acción.', dateReported: 'Active' },
  { id: 'w2', name: 'Farming de Cuentas (Gmail)', type: 'Asset Creation', riskLevel: 'Safe', status: 'LEGIT', reason: 'Creación masiva de cuentas para proveedores. Alta demanda en foros blackhat para automatización.', dateReported: 'Active' },
  { id: 'w3', name: 'Airdrop Hunter Scripts', type: 'Crypto Automation', riskLevel: 'Warning', status: 'LEGIT', reason: 'Uso de bots para calificar en airdrops. Riesgo de baneo de wallet (Sybil), pero alta recompensa si se hace bien.', dateReported: 'Active' },
  { id: 'w4', name: 'Social Media Boosting', type: 'SMM Services', riskLevel: 'Safe', status: 'LEGIT', reason: 'Venta de likes/follows. Mercado enorme y pagos rápidos. No es ilegal, pero infringe TOS de redes.', dateReported: 'Active' },
  // Legit
  { id: 'l1', name: 'Binance', type: 'Exchange', riskLevel: 'Safe', status: 'LEGIT', reason: 'Exchange Tier 1 con Proof of Reserves auditada. Plataforma segura para operar.', dateReported: 'Verified' },
  { id: 'l2', name: 'Upwork', type: 'Freelance', riskLevel: 'Safe', status: 'LEGIT', reason: 'Plataforma segura con Escrow para pagos. Si trabajas, cobras seguro.', dateReported: 'Verified' },
  { id: 'l3', name: 'Fiverr', type: 'Freelance', riskLevel: 'Safe', status: 'LEGIT', reason: 'Mercado de servicios fiable. Protección al vendedor y comprador.', dateReported: 'Verified' },
  { id: 'l4', name: 'Coinbase', type: 'Exchange', riskLevel: 'Safe', status: 'LEGIT', reason: 'Empresa pública listada en NASDAQ. Máxima regulación en USA.', dateReported: 'Verified' },
  { id: 'l5', name: 'UserTesting', type: 'Usability', riskLevel: 'Safe', status: 'LEGIT', reason: 'Paga por grabar pantalla. Empresa sólida que trabaja con marcas Fortune 500.', dateReported: 'Verified' },
  { id: 'l6', name: 'Notion Templates', type: 'Digital Products', riskLevel: 'Safe', status: 'LEGIT', reason: 'Venta de plantillas digitales. Ingreso pasivo real y escalable.', dateReported: 'Verified' },
];

// --- METHODS DIRECTORY DATA ---
export const METHODS_DATABASE: Method[] = [
  // FREE METHODS
  {
    id: '1',
    name: 'UserTesting',
    category: MethodCategory.TASKS,
    description: 'Prueba sitios web y apps grabando tu pantalla y voz. Pagos fiables por PayPal. Ideal para principiantes.',
    verified: true,
    investmentRequired: false,
    difficulty: Difficulty.BEGINNER,
    rating: 4.8,
    potentialEarnings: "$10 - $50 / test",
    link: "https://www.usertesting.com/be-a-tester",
    content: `
      <h3>¿Qué es UserTesting?</h3>
      <p>Es la plataforma líder mundial en pruebas de usabilidad. Empresas como HP, Samsung, y Adobe pagan por ver a personas reales intentando usar sus sitios web y aplicaciones para encontrar errores o confusiones.</p>
      
      <h3>Requisitos Técnicos</h3>
      <ul>
        <li>PC o Mac con conexión a internet estable.</li>
        <li>Un micrófono decente (el de los auriculares del móvil suele servir).</li>
        <li>Cuenta de PayPal (imprescindible para cobrar).</li>
        <li>Ser mayor de 18 años.</li>
      </ul>

      <h3>Estrategia para ser Aceptado (La clave)</h3>
      <p>El 80% de la gente es rechazada en el test de prueba. Aquí tienes el secreto para pasar:</p>
      <p>El sistema busca personas que practiquen el <strong>"Think Aloud Protocol" (Pensar en voz alta)</strong>. No te calles ni un segundo.</p>
      
      <div class="bg-surface p-4 rounded-lg border border-white/10 my-4">
        <strong>Ejemplo INCORRECTO:</strong> (Clickeas en silencio buscando el menú de contacto).<br/><br/>
        <strong>Ejemplo CORRECTO:</strong> "Vale, estoy buscando la página de contacto. Voy a mirar en el menú superior... no la veo aquí. Quizás esté en el pie de página... ah, sí, aquí está 'Help Center', voy a hacer clic aquí porque asumo que tendrán un formulario."
      </div>

      <h3>Paso a Paso</h3>
      <ol>
        <li>Regístrate en <a href="https://www.usertesting.com/be-a-tester" target="_blank" class="text-neonGreen underline">UserTesting</a>.</li>
        <li>Realiza el test de práctica aplicando la técnica de "Pensar en voz alta".</li>
        <li>Una vez aprobado, mantén la pestaña abierta. Los tests "vuelan".</li>
        <li>Realiza tests de $10 (toman unos 15-20 minutos).</li>
        <li>Cobra exactamente 7 días después de completar el test en tu PayPal.</li>
      </ol>
    `
  },
  {
    id: '2',
    name: 'Binance Earn',
    category: MethodCategory.CRYPTO,
    description: 'Staking flexible y ahorros en criptomonedas. Gana intereses pasivos de tus tenencias actuales.',
    verified: true,
    investmentRequired: true,
    difficulty: Difficulty.INTERMEDIATE,
    rating: 4.5,
    potentialEarnings: "3% - 15% APY",
    content: `
      <h3>Generar Ingresos Pasivos con Cripto (Riesgo Bajo)</h3>
      <p>Binance Earn funciona como una cuenta de ahorros bancaria, pero con criptomonedas. En lugar de tener tus monedas paradas en la billetera, las prestas al exchange a cambio de un interés anual (APY).</p>

      <h3>La Estrategia Segura: USDT Flexible</h3>
      <p>Si no quieres exponerte a la volatilidad de Bitcoin o Ethereum, puedes usar "Stablecoins" (monedas pegadas al valor del dólar).</p>
      <ul>
        <li><strong>Moneda:</strong> USDT (Tether) o USDC.</li>
        <li><strong>Riesgo:</strong> Muy bajo (salvo colapso sistémico del dólar o Tether).</li>
        <li><strong>Retorno:</strong> Suele oscilar entre el 5% y el 15% anual en promociones.</li>
      </ul>

      <h3>Paso a Paso</h3>
      <ol>
        <li>Crea una cuenta en Binance y verifica tu identidad (KYC).</li>
        <li>Deposita Euros/Dólares o compra USDT mediante P2P.</li>
        <li>Ve a la sección <strong>"Earn" > "Simple Earn"</strong>.</li>
        <li>Busca USDT y selecciona la opción <strong>"Flexible"</strong> (puedes retirar el dinero cuando quieras).</li>
        <li>Activa la opción "Auto-Subscribe" para que los intereses generados se reinviertan automáticamente (Interés Compuesto).</li>
      </ol>

      <div class="bg-danger/10 p-4 rounded-lg border border-danger/30 my-4 text-sm">
        <strong>Advertencia:</strong> Evita productos de "Dual Investment" si eres principiante, ya que tienen riesgo de pérdida si el mercado se mueve en tu contra. Quédate en "Simple Earn".
      </div>
    `
  },
  {
    id: '5',
    name: 'Google Rewards',
    category: MethodCategory.SURVEYS,
    description: 'Encuestas muy cortas oficiales de Google. Paga en saldo de Play Store para apps y juegos.',
    verified: true,
    investmentRequired: false,
    difficulty: Difficulty.BEGINNER,
    rating: 4.0,
    potentialEarnings: "$5 - $10 / mes",
    content: `
      <h3>Dinero por tu Historial de Ubicaciones</h3>
      <p>Google Opinion Rewards es la única app de encuestas que recomendamos al 100% porque paga siempre y no te expulsa a mitad de la encuesta. Google te paga por validar que has estado en ciertos comercios.</p>

      <h3>Truco para recibir más encuestas</h3>
      <p>Mucha gente se queja de que no le llegan encuestas. Esto es porque no se mueven o tienen la configuración mal.</p>
      <ol>
        <li><strong>Activa el GPS:</strong> Google necesita saber que has visitado el Mercadona, la gasolinera o el hotel.</li>
        <li><strong>Sé honesto:</strong> Google a veces envía "preguntas trampa" sobre sitios que NO existen o que no has visitado. Si mientes, dejarán de enviarte encuestas.</li>
        <li><strong>Responde rápido:</strong> Las encuestas caducan en 24 horas.</li>
        <li><strong>Abre la app:</strong> Ábrela una vez al día aunque no tengas notificaciones para forzar la sincronización.</li>
      </ol>

      <h3>¿Para qué sirve el saldo?</h3>
      <p>No se puede retirar a PayPal (salvo en iOS a veces). Sirve para:</p>
      <ul>
        <li>Comprar versiones PRO de apps.</li>
        <li>Pagar suscripciones de YouTube Premium o Google One.</li>
        <li>Comprar monedas en juegos (Robux, Brawl Stars, etc).</li>
      </ul>
    `
  },
  // PREMIUM METHODS
  {
    id: 'pro-1',
    name: 'Arbitraje Cripto P2P',
    category: MethodCategory.CRYPTO,
    description: 'Estrategia avanzada para comprar barato y vender caro en mercados P2P. Incluye lista de pares y spreads.',
    verified: true,
    investmentRequired: true,
    difficulty: Difficulty.ADVANCED,
    rating: 5.0,
    isPremium: true,
    potentialEarnings: "$50 - $200 / día",
    content: "PREMIUM_CONTENT_LOCKED"
  },
  {
    id: 'pro-2',
    name: 'Appointment Setting',
    category: MethodCategory.HIGH_TICKET,
    description: 'Conviértete en un setter para infoproductores. Agenda llamadas y gana comisiones del 5-10% por venta cerrada.',
    verified: true,
    investmentRequired: false,
    difficulty: Difficulty.INTERMEDIATE,
    rating: 4.9,
    isPremium: true,
    potentialEarnings: "$1500 - $3000 / mes",
    content: "PREMIUM_CONTENT_LOCKED"
  },
  {
    id: 'pro-3',
    name: 'Amazon FBA Private Label',
    category: MethodCategory.ECOMMERCE,
    description: 'Crea tu propia marca de productos e impórtalos para vender con la logística de Amazon. Guía completa de proveedores.',
    verified: true,
    investmentRequired: true,
    difficulty: Difficulty.EXPERT,
    rating: 4.7,
    isPremium: true,
    potentialEarnings: "$2000+ / mes (Escalable)",
    content: "PREMIUM_CONTENT_LOCKED"
  },
  {
    id: 'pro-4',
    name: 'Airdrop Farming Automático',
    category: MethodCategory.CRYPTO,
    description: 'Scripts y rutas para farmear airdrops en nuevas blockchains (ZkSync, LayerZero) maximizando probabilidad de elegibilidad.',
    verified: true,
    investmentRequired: true,
    difficulty: Difficulty.ADVANCED,
    rating: 4.8,
    isPremium: true,
    potentialEarnings: "$5000+ (Evento único)",
    content: "PREMIUM_CONTENT_LOCKED"
  }
];

// --- BLOG POSTS DATA ---
export const BLOG_DATABASE: BlogPost[] = [
  {
    id: '1',
    title: 'Guía Oficial: Gana tus primeros Robux o Saldo con Reseñas',
    excerpt: 'El paso a paso definitivo para participar en la campaña de Google Maps de GDH sin cometer errores.',
    category: 'Tutorial GDH',
    readTime: '4 min',
    date: 'Actualizado Hoy',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    content: `
      <h2>Introducción</h2>
      <p>Las reseñas en Google Maps son vitales para los negocios locales. En GDH conectamos negocios que necesitan mejorar su reputación con usuarios dispuestos a escribir reseñas honestas y de calidad.</p>
      
      <h3>¿Cuánto se paga?</h3>
      <p>El pago estándar por reseña verificada y publicada es de:</p>
      <ul>
        <li><strong>Opción A:</strong> $0.50 - $1.00 USD vía PayPal/Binance.</li>
        <li><strong>Opción B:</strong> 50 - 100 Robux (cubrimos tasas).</li>
        <li><strong>Opción C:</strong> 1 Mes de Discord Nitro (pack de 5 reseñas).</li>
      </ul>

      <h3>Reglas de Oro (Para no ser baneado)</h3>
      <ol>
        <li><strong>No copiar y pegar:</strong> Google detecta textos duplicados. Tu reseña debe ser única.</li>
        <li><strong>Simular naturalidad:</strong> Busca el negocio en Google Maps, navega por las fotos unos segundos antes de escribir. No entres con enlace directo y escribas en 5 segundos.</li>
        <li><strong>Perfil con foto:</strong> Los perfiles de Google sin foto de perfil suelen ser filtrados como spam.</li>
      </ol>
      
      <h3>Cómo empezar</h3>
      <p>Únete a nuestro Discord y busca el canal <strong>#tareas-disponibles</strong>. Abre un ticket para solicitar tu primera asignación.</p>
    `
  },
  {
    id: '2',
    title: 'Cómo detectar estafas en Telegram y Discord (Guía Auditoría)',
    excerpt: 'Los métodos más sofisticados que usan los estafadores en 2024 y cómo detectarlos al instante.',
    category: 'Ciberseguridad',
    readTime: '10 min',
    date: '10 Oct 2023',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    content: `
      <h2>El Triángulo del Fraude</h2>
      <p>Todas las estafas financieras online, desde Ponzis cripto hasta falsos gurús, se basan en tres pilares psicológicos. Si aprendes a identificarlos, serás inmune.</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div class="bg-surface p-4 rounded border border-white/10">
            <h4 class="text-neonGreen font-bold">1. La Promesa Desmesurada</h4>
            <p class="text-xs text-gray-400">"Gana 2% diario fijo", "Sin riesgo", "Dinero garantizado". El mercado real fluctúa. Lo fijo y alto siempre es Ponzi.</p>
        </div>
        <div class="bg-surface p-4 rounded border border-white/10">
            <h4 class="text-neonGreen font-bold">2. La Urgencia Artificial</h4>
            <p class="text-xs text-gray-400">"Solo quedan 5 plazas", "El precio sube en 1 hora". Buscan que tu cerebro emocional anule al racional.</p>
        </div>
        <div class="bg-surface p-4 rounded border border-white/10">
            <h4 class="text-neonGreen font-bold">3. La Oscuridad Técnica</h4>
            <p class="text-xs text-gray-400">"Usamos un bot de arbitraje cuántico con IA". Palabras complejas para ocultar que no hay producto real.</p>
        </div>
      </div>

      <h3>Herramientas de Auditoría (Gratis)</h3>
      <p>Antes de meter un dólar en cualquier plataforma, pásala por este filtro:</p>

      <h4>1. Whois Domain Tools</h4>
      <p>Entra en <a href="https://who.is" target="_blank" class="text-neonGreen underline">who.is</a> y pon el dominio de la empresa.</p>
      <ul>
        <li><strong>Red Flag 🚩:</strong> El dominio fue creado hace 2 semanas pero dicen ser "Líderes mundiales desde 2010".</li>
        <li><strong>Red Flag 🚩:</strong> El registro expira en 1 año (las empresas serias compran dominios por 5-10 años).</li>
      </ul>

      <h4>2. Búsqueda Inversa de Imágenes</h4>
      <p>Muchos scams usan fotos de modelos de stock para sus "CEOs" o "Directores".</p>
      <ul>
        <li>Haz una captura de la foto del equipo.</li>
        <li>Súbela a <a href="https://tineye.com" target="_blank" class="text-neonGreen underline">TinEye</a> o Google Lens.</li>
        <li>Si el CEO aparece en una web de "Venta de fotos de ejecutivos", huye.</li>
      </ul>

      <h4>3. El Test de Liquidez (Para Tokens)</h4>
      <p>Si te venden un token nuevo que "va a subir x1000", búscalo en <strong>DexScreener</strong> o <strong>HoneyPot.is</strong>.</p>
      <ul>
        <li>Si el token tiene el "Sell Tax" al 99% o 100%, es un HoneyPot (puedes comprar pero no vender).</li>
        <li>Si la liquidez es menor a $10,000, es extremadamente peligroso.</li>
      </ul>

      <h3>Estafas de Tareas (Task Scams)</h3>
      <p>Están muy de moda en WhatsApp y Telegram. Te dicen: <em>"Somos de Shein/Amazon y pagamos por dar likes"</em>.</p>
      <p><strong>El Modus Operandi:</strong></p>
      <ol>
        <li>Te pagan realmente $2 o $5 el primer día para ganar tu confianza.</li>
        <li>Te meten en un "Grupo VIP" donde las tareas pagan $50.</li>
        <li>Para hacer esas tareas, te piden que "recargues saldo" o pagues una fianza.</li>
        <li>Una vez pagas la fianza, te bloquean y desaparecen.</li>
      </ol>
      <p class="bg-danger/10 p-3 rounded text-danger font-bold text-center">NUNCA PAGUES PARA TRABAJAR. Un trabajo real te paga a ti, no al revés.</p>
    `
  },
  {
    id: 'pro-1',
    title: 'BLUEPRINT: De 0 a $3,000/mes con SEO Parásito (Paso a Paso)',
    excerpt: 'Cómo usar la autoridad de LinkedIn y Medium para posicionar artículos de afiliado en Top 1 de Google en 48 horas.',
    category: 'Estrategia PRO',
    readTime: '15 min',
    date: 'Exclusivo Miembros',
    isPremium: true,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    content: 'PREMIUM_CONTENT_LOCKED'
  },
  {
    id: 'pro-2',
    title: 'La Estrategia "Whale": Cómo cazar Airdrops de >$10,000',
    excerpt: 'Análisis de billeteras de ballenas. Qué protocolos están usando ahora mismo para calificar al airdrop de LayerZero y Starknet.',
    category: 'Crypto Alpha',
    readTime: '12 min',
    date: 'Actualización Semanal',
    isPremium: true,
    imageUrl: 'https://images.unsplash.com/photo-1621504450168-b8c437532b3a?auto=format&fit=crop&q=80&w=800',
    content: 'PREMIUM_CONTENT_LOCKED'
  }
];