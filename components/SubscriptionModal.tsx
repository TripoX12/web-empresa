import React, { useState } from 'react';
import { X, Check, Star, Lock, Zap, Shield, Crown, CreditCard, Loader2 } from 'lucide-react';
import { User } from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  user: User | null;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onUpgrade, user }) => {
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setProcessing(true);
    // Simulating Payment Gateway delay
    setTimeout(() => {
        setProcessing(false);
        onUpgrade();
        onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] rounded-3xl border border-proGold/30 shadow-gold overflow-hidden flex flex-col md:flex-row animate-fadeIn">
        
        {/* Left Side: The Hook */}
        <div className="md:w-2/5 bg-gradient-to-br from-[#1a1500] to-black p-8 border-r border-white/5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-proGold/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-proGold/10 border border-proGold/40 text-proGold text-xs font-bold mb-6">
                    <Crown size={14} /> MIEMBROS DE ÉLITE
                </div>
                <h2 className="text-4xl font-display font-bold text-white mb-2">
                    Accede al <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-proGold to-yellow-200">1% Superior</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    La información gratuita está bien para empezar. La información de pago es para <strong>escalar agresivamente</strong> usando ventaja injusta.
                </p>
            </div>

            <div className="relative z-10 space-y-6 mt-8">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                        <Lock size={20} className="text-gray-500" />
                    </div>
                    <div>
                        <h4 className="text-gray-300 font-bold text-sm">Métodos Privados</h4>
                        <p className="text-gray-500 text-xs">Información que los "gurús" no comparten en YouTube.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-proGold/10 flex items-center justify-center shrink-0 border border-proGold/20">
                        <Zap size={20} className="text-proGold" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm">Automatización Total</h4>
                        <p className="text-gray-400 text-xs">Scripts y bots incluidos para maximizar ingresos.</p>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center">Garantía de Calidad Auditada</p>
            </div>
        </div>

        {/* Right Side: The Offer */}
        <div className="md:w-3/5 p-8 bg-surface relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X size={24} />
            </button>

            <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-1">Plan Mensual <span className="text-proGold">GDH PRO</span></h3>
                <div className="flex justify-center items-end gap-1 mb-2">
                    <span className="text-4xl font-display font-bold text-white">9,99€</span>
                    <span className="text-gray-500 text-sm mb-1">/ mes</span>
                </div>
                <p className="text-xs text-green-400 flex justify-center items-center gap-1">
                    <Shield size={10} /> Precio bloqueado de por vida (subirá pronto)
                </p>
            </div>

            {/* Benefits List - UPGRADED */}
            <div className="space-y-3 mb-8">
                {[
                    "Acceso a la 'Lista Alpha' (Métodos High-Ticket)",
                    "Scripts de Automatización (Airdrops & Tasks)",
                    "Base de datos de Proveedores Privados (E-com)",
                    "Señales de 'Ballenas' Crypto en tiempo real",
                    "Plantillas Legales & Contratos Freelance",
                    "Prioridad en soporte 1-a-1"
                ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-proGold/20 flex items-center justify-center shrink-0">
                            <Check size={12} className="text-proGold font-bold" />
                        </div>
                        <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/10 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-xs">Total a pagar hoy:</span>
                    <span className="text-white font-bold">9,99€</span>
                </div>
                <button 
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full py-4 bg-gradient-to-r from-proGold to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold text-lg rounded-lg shadow-gold transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                    {processing ? (
                        <>
                            <Loader2 className="animate-spin" /> Procesando...
                        </>
                    ) : (
                        <>
                            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            DESBLOQUEAR AHORA <Crown size={20} className="group-hover:rotate-12 transition-transform" />
                        </>
                    )}
                </button>
                <p className="text-[10px] text-center text-gray-500 mt-3">
                    Pagos seguros procesados vía Stripe/PayPal. Acceso inmediato.
                </p>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                 <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">STRIPE</div>
                 <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">VISA</div>
                 <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">PAYPAL</div>
            </div>
        </div>
      </div>
    </div>
  );
};