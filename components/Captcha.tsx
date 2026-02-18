import React, { useState } from 'react';
import { ShieldCheck, Loader2, Check } from 'lucide-react';

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
}

export const Captcha: React.FC<CaptchaProps> = ({ onValidate }) => {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');

  const handleVerify = () => {
    if (status !== 'idle') return;

    setStatus('verifying');
    
    // Simulate network analysis and bot check
    setTimeout(() => {
      setStatus('verified');
      onValidate(true);
    }, 1500);
  };

  return (
    <div 
        className={`bg-[#222] border ${status === 'verified' ? 'border-neonGreen/50 bg-neonGreen/5' : 'border-white/10'} rounded-lg p-3 flex items-center justify-between transition-all duration-300 select-none`}
    >
        <div className="flex items-center gap-3">
            <button 
                type="button"
                onClick={handleVerify}
                disabled={status !== 'idle'}
                className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all ${
                    status === 'idle' 
                        ? 'border-gray-500 hover:border-white bg-white/5' 
                        : status === 'verifying'
                            ? 'border-gray-500 bg-transparent'
                            : 'border-neonGreen bg-neonGreen'
                }`}
            >
                {status === 'verifying' && <Loader2 size={14} className="animate-spin text-gray-400" />}
                {status === 'verified' && <Check size={16} className="text-black font-bold" />}
            </button>
            <span className="text-sm text-gray-300 font-medium">
                {status === 'idle' && 'Haz clic para verificar que eres humano'}
                {status === 'verifying' && 'Analizando conexión...'}
                {status === 'verified' && 'Verificación humana exitosa'}
            </span>
        </div>
        
        <div className="flex flex-col items-center opacity-50">
            <ShieldCheck size={20} className={status === 'verified' ? 'text-neonGreen' : 'text-gray-500'} />
            <span className="text-[8px] uppercase font-bold text-gray-500 mt-0.5">GDH Shield</span>
        </div>
    </div>
  );
};