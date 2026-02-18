import React, { useState, useEffect, useRef } from 'react';
import { Search, AlertTriangle, XCircle, CheckCircle, Loader2, ShieldAlert, Check, AlertOctagon, Globe, Lock, ChevronDown, Award } from 'lucide-react';
import { ScamEntry } from '../types';
import { SCAM_DATABASE } from '../data'; // Imported centralized data
import { analyzeSiteRisk } from '../services/geminiService';

export const WallOfShame: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<ScamEntry[]>(SCAM_DATABASE);
  const [selectedResult, setSelectedResult] = useState<ScamEntry | null>(null);
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Deep Link Logic (Hash Listener)
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#scam-')) {
            const id = hash.replace('#scam-', '');
            const found = SCAM_DATABASE.find(s => s.id === id);
            if (found) {
                setSelectedResult(found);
                // Scroll to result view
                setTimeout(() => {
                    const resultElement = document.getElementById('scam-result-view');
                    if (resultElement) {
                        resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);

                // Clean URL immediately to avoid sticking
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                }
            }
        }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check initial
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Filter logic
  useEffect(() => {
    if (!query) {
      setSuggestions(SCAM_DATABASE); // Show all/popular when empty
    } else {
      const filtered = SCAM_DATABASE.filter(site => 
        site.name.toLowerCase().includes(query.toLowerCase()) || 
        site.type.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
    // Reset view if typing again
    if (selectedResult || aiAnalysis) {
        setSelectedResult(null);
        setAiAnalysis(null);
    }
  };

  const selectItem = (item: ScamEntry) => {
    setQuery(item.name);
    setSelectedResult(item);
    setIsDropdownOpen(false);
    setAiAnalysis(null);
  };

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    
    // Check local DB first
    const match = SCAM_DATABASE.find(s => s.name.toLowerCase() === query.toLowerCase());
    if (match) {
        selectItem(match);
        return;
    }

    // AI Fallback
    setIsSearchingAI(true);
    setSelectedResult(null);
    
    const analysis = await analyzeSiteRisk(query);
    setAiAnalysis(analysis);
    setIsSearchingAI(false);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
        case 'SCAM': return { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30', icon: <AlertOctagon size={16} /> };
        case 'LEGIT': return { color: 'text-neonGreen', bg: 'bg-neonGreen/10', border: 'border-neonGreen/30', icon: <CheckCircle size={16} /> };
        default: return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: <Award size={16} /> };
    }
  };

  return (
    <section id="wall-of-shame" className="py-24 bg-[#080808] border-y border-white/5 relative min-h-[80vh] flex flex-col items-center justify-start">
        
        {/* Background FX */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-techPurple/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 w-full max-w-4xl">
            
            {/* Minimal Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4 backdrop-blur-md">
                    <ShieldAlert size={14} className="text-gray-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Auditoría 2.0</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    Buscador de Fraudes & Oportunidades
                </h2>
                <p className="text-gray-500 text-sm">
                    Escribe el nombre de cualquier plataforma. Si no está en nuestra base de datos verificada, nuestra IA la analizará en tiempo real.
                </p>
            </div>

            {/* SEARCH COMPONENT */}
            <div className="relative z-50" ref={wrapperRef}>
                <form onSubmit={handleAISearch} className="relative">
                    <div className="relative flex items-center bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 focus-within:border-neonGreen/50 focus-within:shadow-neon focus-within:scale-[1.01]">
                        <Search className="absolute left-6 text-gray-500" size={24} />
                        <input 
                            type="text" 
                            value={query}
                            onFocus={handleInputFocus}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ej: OmegaPro, Binance, Google Maps Reviews..."
                            className="w-full bg-transparent py-6 pl-16 pr-32 text-white placeholder:text-gray-600 focus:outline-none font-medium text-xl font-sans"
                            autoComplete="off"
                        />
                        <button 
                            type="submit" 
                            className="absolute right-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-colors border border-white/5 flex items-center gap-2"
                        >
                            {isSearchingAI ? <Loader2 className="animate-spin" size={14} /> : (
                                <>
                                    AUDITAR
                                    <Globe size={14} className="text-gray-400" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* DROPDOWN RESULTS (Hidden unless interacted) */}
                {isDropdownOpen && (
                    <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-[#121212] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-fadeIn backdrop-blur-xl">
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm p-3 border-b border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider z-10">
                                <span>Resultados en Base de Datos</span>
                                <span>{suggestions.length} Entradas</span>
                            </div>
                            
                            {suggestions.length > 0 ? (
                                <ul>
                                    {suggestions.map((site) => {
                                        const style = getStatusStyle(site.status);
                                        return (
                                            <li key={site.id}>
                                                <button 
                                                    onClick={() => selectItem(site)}
                                                    className="w-full text-left px-6 py-4 hover:bg-white/5 flex items-center justify-between group transition-colors border-b border-white/5 last:border-0"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${style.bg} ${style.color}`}>
                                                            {style.icon}
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-200 font-bold text-lg block group-hover:text-white transition-colors">
                                                                {site.name}
                                                            </span>
                                                            <span className="text-xs text-gray-500">{site.type}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border mb-1 ${style.color} ${style.border} ${style.bg}`}>
                                                            {site.status}
                                                        </span>
                                                        <span className="text-[10px] text-gray-600">ID: {site.id}</span>
                                                    </div>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    <p className="mb-2">No encontrado en la lista local.</p>
                                    <button onClick={handleAISearch} className="text-neonGreen text-sm font-bold hover:underline">
                                        Forzar Auditoría con IA &rarr;
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* RESULTS AREA (Only appears after selection) */}
            <div id="scam-result-view" className="mt-12 min-h-[200px]">
                {selectedResult && (
                    <div className="animate-fadeIn">
                        <div className={`relative overflow-hidden rounded-3xl border p-1 bg-gradient-to-br ${
                             selectedResult.status === 'SCAM' ? 'from-danger/50 to-transparent' :
                             selectedResult.status === 'LEGIT' ? 'from-neonGreen/50 to-transparent' :
                             'from-yellow-500/50 to-transparent'
                        }`}>
                             <div className="bg-[#0f0f0f] rounded-[22px] p-8 md:p-10 relative overflow-hidden">
                                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-4xl font-display font-bold text-white">{selectedResult.name}</h3>
                                            <ChevronDown className="rotate-[-90deg] text-gray-600" />
                                            <span className={`text-sm font-bold ${getStatusStyle(selectedResult.status).color}`}>
                                                {selectedResult.status}
                                            </span>
                                        </div>
                                        <div className="h-1 w-20 bg-white/10 rounded-full mb-6"></div>
                                        
                                        <div className="bg-black/40 rounded-xl p-6 border border-white/5">
                                            <h4 className="text-gray-500 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                                                <Lock size={12} /> Análisis del Auditor
                                            </h4>
                                            <p className="text-xl text-gray-200 leading-relaxed font-medium">
                                                "{selectedResult.reason}"
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4 justify-center min-w-[200px] border-l border-white/5 pl-8">
                                        <div>
                                            <span className="text-gray-500 text-xs uppercase block mb-1">Categoría</span>
                                            <span className="text-white font-mono text-sm">{selectedResult.type}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs uppercase block mb-1">Nivel de Riesgo</span>
                                            <span className={`font-bold font-mono text-sm ${
                                                selectedResult.riskLevel === 'Critical' ? 'text-danger' : 
                                                selectedResult.riskLevel === 'Safe' ? 'text-neonGreen' : 'text-white'
                                            }`}>
                                                {selectedResult.riskLevel.toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs uppercase block mb-1">Reportado</span>
                                            <span className="text-white font-mono text-sm">{selectedResult.dateReported}</span>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                )}

                {aiAnalysis && !selectedResult && (
                    <div className="animate-fadeIn max-w-3xl mx-auto">
                        <div className="bg-[#121212] rounded-2xl p-8 border border-techPurple/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-techPurple/10 blur-[50px] rounded-full"></div>
                            
                            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-techPurple/10 border border-techPurple/30 flex items-center justify-center text-techPurple animate-pulse">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Análisis IA Generativo</h3>
                                    <p className="text-gray-500 text-sm">Auditoría en tiempo real para: <span className="text-white font-mono">{query}</span></p>
                                </div>
                            </div>
                            
                            <div className="prose prose-invert max-w-none text-gray-300 relative z-10">
                                <div dangerouslySetInnerHTML={{ __html: aiAnalysis.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    </section>
  );
};