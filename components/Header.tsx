import React, { useState } from 'react';
import { Menu, X, User as UserIcon, LogOut, Crown, LogIn, Sparkles, ChevronRight } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onOpenSubscription: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout, onOpenSubscription }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/5 backdrop-blur-xl bg-black/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <a href="#" className="text-2xl font-display font-bold text-white shrink-0 hover:opacity-80 transition-opacity">
          GD<span className="text-neonGreen">Hispano</span>.
        </a>

        {/* 2. CENTER NAVIGATION (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400 absolute left-1/2 -translate-x-1/2">
          <a href="#home" className="hover:text-white transition-colors">Inicio</a>
          <a href="#directory" className="hover:text-white transition-colors">Métodos</a>
          <a href="#wall-of-shame" className="text-danger/80 hover:text-danger hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all">Scam Shield</a>
          <a href="#guides" className="hover:text-white transition-colors">Blog</a>
        </nav>

        {/* 3. RIGHT ACTIONS (Auth & PRO) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* CTA: BECOME PRO (Visible if not premium) */}
          {!user?.isPremium && (
            <button 
              onClick={onOpenSubscription}
              className="group relative px-5 py-2 bg-gradient-to-r from-proGold to-yellow-500 text-black font-bold text-xs rounded-full shadow-gold hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/30 -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
              <Crown size={14} fill="currentColor" />
              HAZTE PRO
            </button>
          )}

          {user ? (
            // LOGGED IN STATE
            <div className="flex items-center gap-3 pl-2">
                <div className="flex flex-col text-right leading-none">
                    <span className="text-white font-bold text-sm">{user.username}</span>
                    <span className={`text-[10px] uppercase font-bold tracking-wide ${user.isPremium ? 'text-proGold drop-shadow-sm' : 'text-gray-500'}`}>
                        {user.isPremium ? 'Miembro Élite' : 'Plan Gratuito'}
                    </span>
                </div>
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    user.isPremium 
                    ? 'bg-proGold/10 border-proGold text-proGold shadow-[0_0_10px_rgba(251,191,36,0.2)]' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-neonGreen hover:text-neonGreen'
                }`}>
                    <UserIcon size={18} />
                </div>

                <button 
                    onClick={onLogout} 
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                    title="Cerrar Sesión"
                >
                    <LogOut size={18} />
                </button>
            </div>
          ) : (
            // LOGGED OUT STATE
            <div className="flex items-center gap-3">
                <button 
                    onClick={onLoginClick}
                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white text-sm font-medium transition-all group"
                >
                    <LogIn size={16} className="text-neonGreen group-hover:text-white transition-colors" />
                    Entrar
                </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden glass border-b border-white/10 absolute w-full left-0 top-20 p-6 flex flex-col gap-6 animate-fadeIn bg-[#0a0a0a]">
            {user && (
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                        user.isPremium 
                        ? 'bg-proGold/20 border-proGold text-proGold' 
                        : 'bg-techPurple/20 border-techPurple text-techPurple'
                    }`}>
                        <UserIcon size={24} />
                    </div>
                    <div>
                        <div className="text-white font-bold flex items-center gap-2 text-lg">
                            {user.username}
                            {user.isPremium && <Crown size={16} className="text-proGold" fill="currentColor" />}
                        </div>
                        <div className="text-xs text-gray-400">{user.isPremium ? 'Plan PRO Activo' : 'Cuenta Gratuita'}</div>
                    </div>
                </div>
            )}
            
            {!user?.isPremium && (
                 <button 
                    onClick={() => { setIsOpen(false); onOpenSubscription(); }}
                    className="w-full py-4 bg-gradient-to-r from-proGold to-yellow-500 text-black font-bold rounded-xl shadow-gold flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Crown size={18} fill="currentColor" /> MEJORAR A PRO
                </button>
            )}

            <div className="flex flex-col gap-4 text-lg">
                <a href="#home" className="text-gray-300 hover:text-white flex justify-between items-center" onClick={() => setIsOpen(false)}>
                    Inicio <ChevronRight size={16} className="opacity-50"/>
                </a>
                <a href="#directory" className="text-gray-300 hover:text-white flex justify-between items-center" onClick={() => setIsOpen(false)}>
                    Métodos <ChevronRight size={16} className="opacity-50"/>
                </a>
                <a href="#wall-of-shame" className="text-danger hover:text-red-400 flex justify-between items-center font-bold" onClick={() => setIsOpen(false)}>
                    <span className="flex items-center gap-2"><Sparkles size={16}/> Scam Shield</span>
                    <ChevronRight size={16} className="opacity-50"/>
                </a>
                <a href="#guides" className="text-gray-300 hover:text-white flex justify-between items-center" onClick={() => setIsOpen(false)}>
                    Blog <ChevronRight size={16} className="opacity-50"/>
                </a>
            </div>
          
            <div className="border-t border-white/10 pt-6 mt-2">
                {!user ? (
                    <button 
                        onClick={() => {
                            setIsOpen(false);
                            onLoginClick();
                        }} 
                        className="w-full py-3 bg-white/10 border border-white/10 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                    >
                        <LogIn size={18} className="text-neonGreen" /> Iniciar Sesión
                    </button>
                ) : (
                    <button 
                        onClick={() => {
                            setIsOpen(false);
                            onLogout();
                        }} 
                        className="w-full py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all"
                    >
                        <LogOut size={18} /> Cerrar Sesión
                    </button>
                )}
            </div>
        </div>
      )}
    </header>
  );
};