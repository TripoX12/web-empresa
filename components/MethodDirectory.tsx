import React, { useState, useEffect } from 'react';
import { Method, MethodCategory } from '../types';
import { METHODS_DATABASE } from '../data'; // Imported centralized data
import { CheckCircle2, DollarSign, Clock, BarChart, Lock, Crown, X, BookOpen, ExternalLink, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface MethodDirectoryProps {
  user: User | null;
  onOpenSubscription: () => void;
}

export const MethodDirectory: React.FC<MethodDirectoryProps> = ({ user, onOpenSubscription }) => {
  const [filter, setFilter] = useState<string>('All');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);

  const filteredMethods = filter === 'All' 
    ? METHODS_DATABASE 
    : METHODS_DATABASE.filter(m => m.category === filter);

  const categories = ['All', ...Object.values(MethodCategory)];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedMethod) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedMethod]);

  // Deep Link Logic (Optimized for immediate cleanup)
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#method-')) {
            const id = hash.replace('#method-', '');
            const method = METHODS_DATABASE.find(m => m.id === id);
            
            if (method) {
                // Force visibility by resetting filter if needed.
                setFilter('All');
                setHighlightedId(id);
                
                // Delay scroll slightly to ensure DOM render
                setTimeout(() => {
                    const el = document.getElementById(`method-${id}`);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
                
                // CLEAN URL IMMEDIATELY to prevent sticky redirect on reload
                // We use replaceState so it doesn't clutter history
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                }

                // Remove visual highlight after animation
                setTimeout(() => {
                    setHighlightedId(null);
                }, 2500);
            }
        }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check initial hash on mount
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isUnlocked = (method: Method) => {
    if (!method.isPremium) return true;
    return user?.isPremium;
  };

  const handleMethodClick = (method: Method) => {
      if (isUnlocked(method)) {
          setSelectedMethod(method);
      } else {
          onOpenSubscription();
      }
  };

  return (
    <>
      <section id="directory" className="py-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-display font-bold">Directorio de Oportunidades</h2>
            </div>
            <p className="text-gray-400">Plataformas que realmente pagan, probadas por el equipo.</p>
          </div>
          
          <div className="flex overflow-x-auto gap-2 mt-6 md:mt-0 pb-2 max-w-full no-scrollbar">
              {categories.map(cat => (
                  <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                          filter === cat 
                          ? 'bg-neonGreen text-black shadow-neon' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                  >
                      {cat}
                  </button>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMethods.map((method) => {
              const locked = !isUnlocked(method);
              const isHighlighted = highlightedId === method.id;
              
              return (
              <div 
                  key={method.id}
                  id={`method-${method.id}`}
                  className={`relative rounded-xl p-6 transition-all duration-500 group overflow-hidden ${
                      isHighlighted ? 'scale-105 shadow-[0_0_50px_rgba(16,185,129,0.3)] ring-2 ring-neonGreen z-10' : ''
                  } ${
                      method.isPremium 
                          ? 'premium-gradient border-proGold/30' 
                          : 'glass-card hover:translate-y-[-5px]'
                  }`}
              >
                  {/* Premium Background Effect */}
                  {method.isPremium && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-proGold/10 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none"></div>
                  )}

                  <div className="flex justify-between items-start mb-4 relative z-10">
                      <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${method.isPremium ? 'text-proGold border border-proGold/20' : 'text-gray-300'}`}>
                          {method.category}
                      </span>
                      
                      {method.isPremium ? (
                          <div className="flex items-center gap-1 text-proGold text-xs font-bold bg-proGold/10 px-2 py-1 rounded-full border border-proGold/20 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                              <Crown size={12} fill="currentColor" /> PRO
                          </div>
                      ) : (
                          method.verified && (
                              <div className="flex items-center gap-1 text-neonGreen text-xs font-bold bg-neonGreen/10 px-2 py-1 rounded-full">
                                  <CheckCircle2 size={12} /> VERIFICADO
                              </div>
                          )
                      )}
                  </div>

                  <div className="relative">
                      {/* Lock Overlay if Locked */}
                      {locked && (
                          <div className="absolute inset-0 z-20 backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center text-center p-4">
                              <div className="w-12 h-12 bg-black/80 rounded-full flex items-center justify-center mb-2 border border-proGold/50 shadow-gold">
                                  <Lock size={20} className="text-proGold" />
                              </div>
                              <p className="text-white font-bold text-sm mb-2">Contenido Exclusivo GDH PRO</p>
                              <button 
                                  onClick={onOpenSubscription}
                                  className="px-4 py-2 bg-proGold text-black text-xs font-bold rounded hover:bg-white transition-colors"
                              >
                                  DESBLOQUEAR AHORA
                              </button>
                          </div>
                      )}

                      <h3 className={`text-xl font-bold mb-2 transition-colors ${
                          method.isPremium ? 'text-white' : 'group-hover:text-neonGreen'
                      }`}>
                          {method.name}
                      </h3>
                      
                      <p className={`text-gray-400 text-sm mb-6 h-12 overflow-hidden ${locked ? 'blur-sm select-none opacity-50' : ''}`}>
                          {method.description}
                      </p>

                      <div className={`grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-500 mb-6 border-t ${method.isPremium ? 'border-proGold/20' : 'border-white/5'} pt-4 ${locked ? 'blur-[2px] opacity-50' : ''}`}>
                          <div className="flex items-center gap-1">
                              <DollarSign size={14} className={method.isPremium ? 'text-proGold' : 'text-techPurple'} />
                              <span>{method.investmentRequired ? 'Requiere Capital' : 'Sin Inversión'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                              <BarChart size={14} className={method.isPremium ? 'text-proGold' : 'text-techPurple'} />
                              <span>{method.difficulty}</span>
                          </div>
                          <div className="flex items-center gap-1 col-span-2">
                              <Clock size={14} className={method.isPremium ? 'text-proGold' : 'text-techPurple'} />
                              <span className={method.isPremium ? 'text-white font-bold' : ''}>Potencial: {method.potentialEarnings || 'Variable'}</span>
                          </div>
                      </div>

                      <button 
                          onClick={() => handleMethodClick(method)}
                          disabled={locked}
                          className={`w-full py-2 rounded border font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                              method.isPremium 
                                  ? 'bg-proGold/10 border-proGold/30 text-proGold hover:bg-proGold hover:text-black' 
                                  : 'bg-white/5 border-white/10 hover:bg-neonGreen hover:text-black hover:border-neonGreen'
                          } ${locked ? 'pointer-events-none opacity-0' : ''}`}
                      >
                          <BookOpen size={16} /> Ver Estrategia Completa
                      </button>
                  </div>
              </div>
          )})}
        </div>
      </section>

      {/* FULL STRATEGY MODAL */}
      {selectedMethod && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <div 
                className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity"
                onClick={() => setSelectedMethod(null)}
            ></div>
            
            <div className="bg-[#0f0f0f] w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/10 shadow-2xl relative flex flex-col overflow-hidden animate-fadeIn">
                
                {/* Modal Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-start bg-surface/50">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded border ${
                                selectedMethod.isPremium 
                                ? 'bg-proGold/10 text-proGold border-proGold/30' 
                                : 'bg-neonGreen/10 text-neonGreen border-neonGreen/30'
                            }`}>
                                {selectedMethod.category}
                            </span>
                            {selectedMethod.verified && (
                                <span className="flex items-center gap-1 text-gray-400 text-xs">
                                    <CheckCircle2 size={12} className="text-neonGreen" /> Verificado por GDH
                                </span>
                            )}
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white">{selectedMethod.name}</h2>
                    </div>
                    <button 
                        onClick={() => setSelectedMethod(null)}
                        className="p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
                    
                    {/* Main Guide Content */}
                    <div className="flex-1 p-8">
                         {selectedMethod.content ? (
                             <div 
                                className="prose prose-invert prose-lg max-w-none 
                                prose-headings:font-display prose-headings:font-bold prose-headings:text-white 
                                prose-h3:text-neonGreen prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                                prose-p:text-gray-300 prose-p:leading-relaxed
                                prose-ul:list-disc prose-li:marker:text-neonGreen prose-li:text-gray-300
                                prose-strong:text-white prose-a:text-techPurple prose-a:font-bold hover:prose-a:text-white"
                                dangerouslySetInnerHTML={{ __html: selectedMethod.content }}
                             />
                         ) : (
                             <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <AlertCircle size={48} className="text-gray-600 mb-4" />
                                <p className="text-gray-500">La guía detallada para este método se está actualizando.</p>
                             </div>
                         )}
                    </div>

                    {/* Sidebar / Stats Panel */}
                    <div className="md:w-80 bg-[#0a0a0a] border-l border-white/5 p-6 space-y-6">
                        <div>
                            <h4 className="text-gray-500 text-xs uppercase font-bold mb-4">Resumen de Ficha</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <BarChart size={16} className="text-techPurple" /> Dificultad
                                    </div>
                                    <span className="font-bold text-white text-sm">{selectedMethod.difficulty}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <DollarSign size={16} className="text-techPurple" /> Inversión
                                    </div>
                                    <span className="font-bold text-white text-sm">{selectedMethod.investmentRequired ? 'Requerida' : 'Gratis'}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <Clock size={16} className="text-techPurple" /> Potencial
                                    </div>
                                    <span className="font-bold text-neonGreen text-sm">{selectedMethod.potentialEarnings}</span>
                                </div>
                            </div>
                        </div>

                        {selectedMethod.link && (
                            <div className="pt-4 border-t border-white/5">
                                <a 
                                    href={selectedMethod.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-neonGreen hover:bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-neon group"
                                >
                                    IR AL SITIO OFICIAL <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <p className="text-[10px] text-gray-600 text-center mt-3">
                                    Enlace verificado por GDH Security.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
      )}
    </>
  );
};