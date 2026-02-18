import React from 'react';
import { Twitter, Instagram, Send, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
                <div className="text-2xl font-display font-bold text-white mb-4">
                    GD<span className="text-neonGreen">Hispano</span>.
                </div>
                <p className="text-gray-500 text-sm mb-6">
                    Central de Auditoría de ingresos online. Empoderando a la comunidad hispana con datos reales.
                </p>
                <div className="flex gap-4">
                    <a href="https://t.me/GanaDineroHispanos" target="_blank" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all">
                        <Send size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-techPurple hover:text-white transition-all">
                        <Instagram size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                        <Twitter size={16} />
                    </a>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Explorar</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                    <li><a href="#directory" className="hover:text-neonGreen transition-colors">Directorio Auditado</a></li>
                    <li><a href="#wall-of-shame" className="hover:text-danger transition-colors">Lista Negra (Scams)</a></li>
                    <li><a href="#guides" className="hover:text-white transition-colors">Blog y Guías</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Herramientas Gratuitas</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Legal</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                    <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Descargo de Responsabilidad</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Newsletter Privada</h4>
                <p className="text-gray-500 text-xs mb-4">Recibe las nuevas oportunidades auditadas antes de que se saturen.</p>
                <form className="flex gap-2">
                    <input 
                        type="email" 
                        placeholder="tu@email.com" 
                        className="bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white w-full focus:border-neonGreen outline-none"
                    />
                    <button className="bg-neonGreen text-black px-3 py-2 rounded text-sm font-bold hover:bg-white transition-colors">
                        <Mail size={16} />
                    </button>
                </form>
            </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-xs">
            <p>&copy; 2026 GanaDineroHispano. Comunidad de Auditoría. Todos los derechos reservados.</p>
            <p className="mt-2">Importante: No somos asesores financieros. Toda inversión conlleva riesgos.</p>
        </div>
      </div>
    </footer>
  );
};