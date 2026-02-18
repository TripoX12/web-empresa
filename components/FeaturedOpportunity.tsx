import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

export const FeaturedOpportunity: React.FC = () => {
  return (
    <section className="py-10 container mx-auto px-6">
        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-gray-800 via-techPurple to-gray-800">
            <div className="bg-[#1e1e24] rounded-[22px] overflow-hidden relative p-8 md:p-12">
                
                {/* Tag */}
                <div className="absolute top-0 right-0 bg-techPurple text-white px-6 py-2 rounded-bl-2xl font-bold text-sm uppercase flex items-center gap-2">
                    <Flame size={16} /> Oportunidad Verificada
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    
                    {/* Content */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
                            ¡Reseñas en Google Maps!
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Gana <span className="text-white font-bold">Nitro, Robux o Efectivo</span> por dejar reseñas en lugares reales. 
                            Plataforma externa auditada y aprobada por el equipo GDH.
                        </p>
                        <a 
                            href="https://discord.gg/xrZwFPtN" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-techPurple hover:bg-violet-500 text-white font-bold rounded-lg transition-all shadow-purple"
                        >
                            IR A RESEÑAR AHORA <ArrowRight size={20} />
                        </a>
                    </div>

                    {/* Visual Proof Mockup */}
                    <div className="bg-[#2b2d31] rounded-xl border border-[#1e1f22] p-6 shadow-2xl relative">
                        <div className="absolute -top-3 -left-3 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            PAGO REAL
                        </div>
                        
                        {/* Discord Message Mockup */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold shrink-0">
                                B
                            </div>
                            <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-white font-bold hover:underline cursor-pointer">Bot_Pagos</span>
                                    <span className="bg-[#5865F2] text-white text-[10px] px-1 rounded uppercase font-bold">Bot</span>
                                    <span className="text-gray-500 text-xs">Hoy a las 14:30</span>
                                </div>
                                
                                <div className="mt-2 bg-[#1e1f22] border-l-4 border-green-500 rounded p-3">
                                    <div className="font-bold text-white mb-1">Pago Exitoso ✅</div>
                                    <div className="text-gray-300 text-sm">Se han enviado <strong className="text-green-400">50 Robux</strong> al usuario <span className="text-blue-400 cursor-pointer">@AlexGamer</span> por completar la tarea.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
  );
};