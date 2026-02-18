import React from 'react';
import { Crown, Zap, Code2, Globe2, Users, TrendingUp, ShieldCheck, Lock, ArrowRight } from 'lucide-react';

interface PremiumBenefitsProps {
  onOpenSubscription: () => void;
}

export const PremiumBenefits: React.FC<PremiumBenefitsProps> = ({ onOpenSubscription }) => {
  const benefits = [
    {
      icon: <Code2 size={24} />,
      title: "Suite de Automatización",
      desc: "Acceso a nuestra librería de Scripts (Python/JS) para farmear Airdrops y realizar tareas repetitivas en piloto automático.",
      highlight: "Software Propio"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Señales 'Whale' en Vivo",
      desc: "Nuestro bot rastrea billeteras millonarias. Recibe una alerta 3 segundos después de que una 'ballena' compre una moneda nueva.",
      highlight: "Crypto Alpha"
    },
    {
      icon: <Globe2 size={24} />,
      title: "Proveedores Privados",
      desc: "Lista negra de proveedores chinos y europeos para E-commerce que no encontrarás en Alibaba. Márgenes del 40-60%.",
      highlight: "E-com Secret"
    },
    {
      icon: <Users size={24} />,
      title: "Networking High-Ticket",
      desc: "Acceso al canal oculto #business-elite. Conecta con usuarios que ya facturan +$10k/mes. Tu red es tu patrimonio.",
      highlight: "Comunidad VIP"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Kit Legal Freelancer",
      desc: "Plantillas de contratos blindados para cobrar a clientes internacionales y evitar impagos. Protege tu trabajo.",
      highlight: "Recursos"
    },
    {
      icon: <Zap size={24} />,
      title: "Soporte Prioritario 24/7",
      desc: "Línea directa con el equipo fundador. Tus tickets saltan la cola de espera. Análisis de tus proyectos personales.",
      highlight: "1-on-1"
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-proGold/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-proGold/30 bg-proGold/10 text-proGold text-xs font-bold mb-6 tracking-widest uppercase animate-pulse">
            <Crown size={14} /> Membresía Elite
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            La Inversión Asimétrica <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-proGold via-yellow-200 to-proGold">Más Rentable del Mercado</span>
          </h2>
          <p className="text-gray-400 text-lg">
            No vendemos humo. Vendemos <strong>herramientas, datos y velocidad</strong>. 
            Lo que te costaría años aprender y miles de euros desarrollar, lo tienes por 9,99€.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="group relative bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 hover:border-proGold/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] overflow-hidden"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-proGold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon */}
              <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-proGold group-hover:border-proGold transition-colors duration-300 relative z-10 mb-6">
                {benefit.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-proGold transition-colors">
                    {benefit.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 group-hover:text-proGold/70 border border-white/5 group-hover:border-proGold/30 px-2 py-1 rounded transition-colors">
                        {benefit.highlight}
                    </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-transparent via-proGold/50 to-transparent max-w-4xl mx-auto">
            <div className="bg-[#0a0a0a] rounded-[23px] px-8 py-12 md:flex items-center justify-between gap-8 relative overflow-hidden">
                {/* Shine effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-proGold/10 blur-[80px] rounded-full"></div>
                
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Deja de jugar en modo difícil.</h3>
                    <p className="text-gray-400 text-sm">El precio subirá a 29,99€ cuando lleguemos a 1,000 miembros.</p>
                </div>

                <div className="relative z-10 mt-6 md:mt-0">
                    <button 
                        onClick={onOpenSubscription}
                        className="group relative px-8 py-4 bg-proGold text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 w-full h-full bg-white/30 -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                        <span className="relative flex items-center gap-2">
                            OBTENER ACCESO TOTAL <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};