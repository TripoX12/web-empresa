import React from 'react';
import { ArrowRight, ShieldCheck, Users, AlertCircle, Send } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonGreen/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-techPurple/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neonGreen/30 bg-neonGreen/5 mb-6">
            <ShieldCheck size={16} className="text-neonGreen" />
            <span className="text-neonGreen text-xs font-bold tracking-wider uppercase">Seguridad Activa 24/7</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6 text-white tracking-tight">
          La Central de <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonGreen to-techPurple">Auditoría.</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
          Somos el <strong>Hub Profesional</strong> donde filtramos las mejores oportunidades de ingresos. Deja de perder tiempo en sitios que no pagan.
        </p>

        {/* Disclaimer Alert from old site */}
        <div className="max-w-3xl mx-auto mb-10 bg-danger/5 border border-danger/20 rounded-lg p-4 flex items-start gap-4 text-left">
            <AlertCircle className="text-danger shrink-0 mt-1" size={24} />
            <div>
                <h4 className="text-danger font-bold text-sm uppercase mb-1">Aviso Importante</h4>
                <p className="text-gray-400 text-sm">
                    GDH NO es una plataforma de inversión. Auditamos páginas externas. Nosotros somos tu filtro, no tu banco.
                </p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a 
            href="https://discord.gg/xrZwFPtN" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 bg-neonGreen text-black font-bold rounded-lg shadow-neon hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            UNIRME A LA CENTRAL
            <Users className="w-5 h-5" />
          </a>
          
          <a 
            href="https://t.me/GanaDineroHispanos"
            target="_blank"
            rel="noopener noreferrer" 
            className="w-full md:w-auto px-8 py-4 glass text-white font-medium rounded-lg hover:bg-white/10 transition-all border-white/10 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            TELEGRAM OFICIAL
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="text-neonGreen w-5 h-5" />
            <span>+100 Métodos Auditados</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="text-techPurple w-5 h-5" />
            <span>Comunidad Activa</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-danger font-bold text-lg">0%</span>
            <span>Tolerancia a Ponzi</span>
          </div>
        </div>
      </div>
    </section>
  );
};