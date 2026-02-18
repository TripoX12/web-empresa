import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Image as ImageIcon, X, Download, Copy, Wand2, 
  Palette, Monitor, Box, Smartphone, Layers, Loader2, Crown 
} from 'lucide-react';
import { generateMarketingImage } from '../services/geminiService';
import { User } from '../types';

interface ImageGeneratorProps {
  user: User | null;
  onOpenSubscription: () => void;
}

interface HistoryItem {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ user, onOpenSubscription }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState('Photorealistic');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [autoEnhance, setAutoEnhance] = useState(true);

  // Mapped styles with specific technical keywords for the AI
  const styles = [
    { 
        id: 'Photorealistic', 
        label: 'Realista', 
        icon: <Monitor size={14} />,
        keywords: 'Photorealistic, Cinematic lighting, Shot on 35mm lens, Depth of field, ISO 100, 8k, Hyper-detailed' 
    },
    { 
        id: '3D Render', 
        label: '3D Render', 
        icon: <Box size={14} />,
        keywords: '3D Octane Render, Unreal Engine 5, Raytracing, Global Illumination, Smooth textures, Clay render aesthetic, 3D masterpiece' 
    },
    { 
        id: 'Minimalist Logo', 
        label: 'Logo', 
        icon: <Layers size={14} />,
        keywords: 'Vector Art, Flat design, Minimalist, Simple lines, Solid colors, White background, Adobe Illustrator style, Corporate identity' 
    },
    { 
        id: 'Cyberpunk', 
        label: 'Cyberpunk', 
        icon: <Smartphone size={14} />,
        keywords: 'Cyberpunk aesthetic, Neon lights, Night city background, High contrast, Futurism, Glitch effect, Pink and Blue color palette' 
    },
    { 
        id: 'Oil Painting', 
        label: 'Arte', 
        icon: <Palette size={14} />,
        keywords: 'Oil painting on canvas, Heavy brushstrokes, Classical art style, Impasto texture, Artistic masterpiece' 
    },
  ];

  const ratios = [
    { id: '1:1', label: 'Cuadrado' },
    { id: '16:9', label: 'Paisaje' },
    { id: '9:16', label: 'Story' },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Gatekeep: Must be Premium
    if (!user?.isPremium) {
        onOpenSubscription();
        return;
    }

    setIsGenerating(true);
    setCurrentImage(null);
    setEnhancedPrompt('');

    try {
        // Find the keywords for the selected style
        const styleObj = styles.find(s => s.id === selectedStyleId);
        const styleKeywords = autoEnhance 
            ? (styleObj?.keywords || 'Photorealistic, 8k') 
            : '';

        const { imageUrl, enhancedPrompt: aiPrompt } = await generateMarketingImage(
            prompt, 
            styleKeywords, 
            selectedRatio
        );

        setCurrentImage(imageUrl);
        setEnhancedPrompt(aiPrompt);

        // Add to history
        setHistory(prev => [{
            id: Date.now().toString(),
            url: imageUrl,
            prompt: prompt,
            timestamp: new Date()
        }, ...prev].slice(0, 10)); // Keep last 10

    } catch (error) {
        console.error("Generation failed", error);
        // Fallback error handling could be added here
    } finally {
        setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (currentImage) {
        const link = document.createElement('a');
        link.href = currentImage;
        link.download = `gdh-studio-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  return (
    <>
        {/* TRIGGER BUTTON (Floating Left) */}
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-40 group flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-proGold via-yellow-400 to-yellow-600 shadow-gold transition-all duration-300 hover:scale-105"
        >
            <div className="bg-black rounded-full p-3 flex items-center gap-2 relative overflow-hidden">
                 <div className="absolute inset-0 bg-proGold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 <Sparkles size={20} className="text-proGold animate-pulse" />
                 <span className="text-xs font-bold text-white pr-1 hidden md:block">GDH Studio</span>
            </div>
        </button>

        {/* MAIN MODAL */}
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsOpen(false)}></div>

                <div className="bg-[#0f0f0f] w-full max-w-6xl h-[90vh] rounded-3xl border border-white/10 shadow-2xl relative flex overflow-hidden animate-fadeIn">
                    
                    {/* LEFT SIDEBAR (History & Config) */}
                    <div className="w-80 border-r border-white/5 bg-[#0a0a0a] flex flex-col hidden md:flex">
                        <div className="p-6 border-b border-white/5">
                            <div className="flex items-center gap-2 text-proGold mb-1">
                                <Crown size={18} fill="currentColor" />
                                <span className="font-display font-bold text-lg text-white">GDH Studio</span>
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Generador Ilimitado PRO</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 pl-2">Historial Reciente</h4>
                            <div className="space-y-3">
                                {history.map(item => (
                                    <button 
                                        key={item.id}
                                        onClick={() => {
                                            setCurrentImage(item.url);
                                            setPrompt(item.prompt);
                                        }}
                                        className="w-full text-left p-2 rounded-xl hover:bg-white/5 transition-colors group flex gap-3 items-center"
                                    >
                                        <img src={item.url} className="w-12 h-12 rounded-lg object-cover border border-white/10" alt="thumbnail" />
                                        <div className="overflow-hidden">
                                            <p className="text-xs text-gray-300 truncate group-hover:text-white transition-colors">{item.prompt}</p>
                                            <p className="text-[10px] text-gray-600">{item.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                        </div>
                                    </button>
                                ))}
                                {history.length === 0 && (
                                    <div className="text-center py-10 text-gray-600 text-xs">
                                        <ImageIcon size={24} className="mx-auto mb-2 opacity-50" />
                                        Tu historial aparecerá aquí
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="flex-1 flex flex-col bg-surface/30 relative">
                        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-20 p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>

                        {/* OUTPUT AREA */}
                        <div className="flex-1 flex items-center justify-center p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5 relative overflow-hidden">
                            
                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-proGold/5 blur-[150px] rounded-full pointer-events-none"></div>

                            {currentImage ? (
                                <div className="relative group max-h-full max-w-full shadow-2xl rounded-lg overflow-hidden animate-fadeIn">
                                    <img 
                                        src={currentImage} 
                                        alt="Generated" 
                                        className="max-h-[60vh] object-contain rounded-lg border border-white/10"
                                    />
                                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button onClick={handleDownload} className="p-3 bg-black/80 backdrop-blur text-white rounded-full hover:bg-neonGreen hover:text-black transition-colors" title="Descargar">
                                            <Download size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : isGenerating ? (
                                <div className="text-center">
                                    <div className="relative w-24 h-24 mx-auto mb-6">
                                        <div className="absolute inset-0 border-4 border-proGold/20 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-proGold rounded-full border-t-transparent animate-spin"></div>
                                        <Sparkles className="absolute inset-0 m-auto text-proGold animate-pulse" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 animate-pulse">Creando Activo Digital...</h3>
                                    <p className="text-sm text-gray-500">Nuestra IA está mejorando tu prompt y renderizando pixels.</p>
                                </div>
                            ) : (
                                <div className="text-center opacity-50 select-none">
                                    <Wand2 size={64} className="mx-auto mb-4 text-gray-600" />
                                    <h3 className="text-2xl font-bold text-gray-400">Listo para crear</h3>
                                    <p className="text-gray-500">Describe tu idea y deja que la magia ocurra.</p>
                                </div>
                            )}
                        </div>

                        {/* INPUT AREA */}
                        <div className="p-6 bg-[#0a0a0a] border-t border-white/10 z-10">
                            <form onSubmit={handleGenerate} className="max-w-4xl mx-auto space-y-4">
                                
                                {/* CONTROLS */}
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                                        {styles.map(style => (
                                            <button
                                                key={style.id}
                                                type="button"
                                                onClick={() => setSelectedStyleId(style.id)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
                                                    selectedStyleId === style.id 
                                                    ? 'bg-proGold text-black border-proGold' 
                                                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
                                                }`}
                                            >
                                                {style.icon} {style.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                                        {ratios.map(ratio => (
                                            <button
                                                key={ratio.id}
                                                type="button"
                                                onClick={() => setSelectedRatio(ratio.id)}
                                                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                                                    selectedRatio === ratio.id 
                                                    ? 'bg-white/10 text-white shadow-sm' 
                                                    : 'text-gray-500 hover:text-gray-300'
                                                }`}
                                            >
                                                {ratio.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* PROMPT INPUT */}
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-proGold/20 to-yellow-600/20 rounded-2xl blur-sm group-focus-within:opacity-100 opacity-0 transition-opacity duration-500"></div>
                                    <div className="relative flex gap-2">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                placeholder="Ej: Un logo minimalista para una tienda de café premium, fondo oscuro..."
                                                className="w-full bg-[#151515] border border-white/10 text-white placeholder:text-gray-600 rounded-xl px-4 py-4 focus:outline-none focus:border-proGold/50 transition-colors pr-32 font-medium"
                                                disabled={isGenerating}
                                            />
                                            {/* AI Toggle inside input */}
                                            <button
                                                type="button"
                                                onClick={() => setAutoEnhance(!autoEnhance)}
                                                className={`absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                                                    autoEnhance ? 'text-neonGreen bg-neonGreen/10' : 'text-gray-600 bg-white/5 hover:text-gray-400'
                                                }`}
                                                title="Reescribir prompt para mejor calidad"
                                            >
                                                <Sparkles size={10} /> IA AUTO-FIX
                                            </button>
                                        </div>
                                        <button 
                                            type="submit"
                                            disabled={isGenerating || !prompt.trim()}
                                            className="px-6 bg-proGold text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-gold flex items-center gap-2"
                                        >
                                            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                                            <span className="hidden md:inline">GENERAR</span>
                                        </button>
                                    </div>
                                </div>

                                {/* AI FEEDBACK (Enhanced Prompt Display) */}
                                {enhancedPrompt && !isGenerating && (
                                    <div className="flex items-start gap-2 text-[10px] text-gray-500 bg-white/5 p-2 rounded-lg border border-white/5">
                                        <Sparkles size={12} className="text-proGold mt-0.5 shrink-0" />
                                        <div>
                                            <span className="text-proGold font-bold">Prompt Optimizado usado:</span> {enhancedPrompt}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};