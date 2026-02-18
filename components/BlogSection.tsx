import React, { useState, useEffect } from 'react';
import { BlogPost, User } from '../types';
import { BLOG_DATABASE } from '../data'; // Imported centralized data
import { ArrowRight, X, Calendar, Clock, Tag, Lock, Crown } from 'lucide-react';

interface BlogSectionProps {
  user: User | null;
  onOpenSubscription: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ user, onOpenSubscription }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPost]);

  const handlePostClick = (post: BlogPost) => {
      if (post.isPremium && !user?.isPremium) {
          onOpenSubscription();
      } else {
          setSelectedPost(post);
      }
  };

  return (
    <>
      <section id="guides" className="py-20 bg-black relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-neonGreen/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">Academia <span className="text-neonGreen">GDH</span></h2>
                <p className="text-gray-400">Guías verificadas para generar ingresos reales.</p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_DATABASE.map((post) => {
                  const locked = post.isPremium && !user?.isPremium;

                  return (
                  <article 
                    key={post.id} 
                    className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full relative ${
                        post.isPremium 
                        ? 'bg-[#0f0b00] border border-proGold/30 hover:shadow-gold hover:border-proGold' 
                        : 'bg-surface/50 border border-white/5 hover:border-neonGreen/50 hover:shadow-neon'
                    }`}
                    onClick={() => handlePostClick(post)}
                  >
                      {/* Premium Badge */}
                      {post.isPremium && (
                          <div className="absolute top-3 right-3 z-30 bg-proGold text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                              <Crown size={10} fill="currentColor" /> PRO
                          </div>
                      )}

                      <div className="relative overflow-hidden h-48 w-full">
                          <div className={`absolute inset-0 bg-gradient-to-t z-10 opacity-60 ${post.isPremium ? 'from-black via-transparent to-transparent' : 'from-black via-transparent to-transparent'}`}></div>
                          <img 
                              src={post.imageUrl} 
                              alt={post.title} 
                              className={`w-full h-full object-cover transform transition-transform duration-700 ${locked ? 'blur-[2px] grayscale-[50%]' : 'group-hover:scale-110'}`}
                          />
                          
                          {locked && (
                              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                  <Lock size={32} className="text-proGold drop-shadow-lg" />
                              </div>
                          )}

                          <div className={`absolute top-3 left-3 z-20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${
                              post.isPremium 
                              ? 'bg-black/80 text-proGold border-proGold/40' 
                              : 'bg-black/60 text-neonGreen border-neonGreen/20'
                          }`}>
                              <Tag size={10} />
                              {post.category}
                          </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                        </div>
                        
                        <h3 className={`text-xl font-bold mb-3 transition-colors leading-tight ${
                            post.isPremium ? 'text-white group-hover:text-proGold' : 'group-hover:text-neonGreen'
                        }`}>
                            {locked ? <span className="flex items-center gap-2"><Lock size={16} className="text-proGold inline" /> {post.title}</span> : post.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                            {post.excerpt}
                        </p>
                        
                        <div className={`flex items-center text-sm font-bold mt-auto group-hover:translate-x-2 transition-transform ${
                            post.isPremium ? 'text-proGold' : 'text-neonGreen'
                        }`}>
                            {locked ? 'DESBLOQUEAR CONTENIDO' : 'LEER GUÍA COMPLETA'} <ArrowRight size={16} className="ml-2" />
                        </div>
                      </div>
                  </article>
              )})}
          </div>
        </div>
      </section>

      {/* Full Screen Modal Reader */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedPost(null)}
          ></div>
          
          <div className="bg-[#121212] w-full max-w-3xl max-h-full md:max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl relative flex flex-col overflow-hidden animate-fadeIn">
            
            {/* Header Image */}
            <div className="h-48 md:h-64 relative shrink-0">
               <img src={selectedPost.imageUrl} className="w-full h-full object-cover opacity-50" alt="Cover" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]"></div>
               <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-neonGreen hover:text-black text-white p-2 rounded-full backdrop-blur-md transition-all z-20 border border-white/10"
                >
                  <X size={24} />
               </button>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 -mt-12 relative z-10">
               <div className="flex items-center gap-3 mb-4">
                 <span className={`px-3 py-1 rounded-full text-xs font-bold border ${selectedPost.isPremium ? 'bg-proGold/10 text-proGold border-proGold/30' : 'bg-neonGreen/10 text-neonGreen border-neonGreen/20'}`}>
                   {selectedPost.category}
                 </span>
                 <span className="text-gray-500 text-xs flex items-center gap-1">
                   <Clock size={12} /> Tiempo de lectura: {selectedPost.readTime}
                 </span>
               </div>

               <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-8 leading-tight">
                 {selectedPost.title}
               </h2>

               {/* Article Body - Styled for Prose */}
               <div 
                 className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-a:text-neonGreen prose-strong:text-neonGreen prose-ul:list-disc prose-li:marker:text-neonGreen"
                 dangerouslySetInnerHTML={{ __html: selectedPost.content }}
               />

               {/* CTA at bottom of article */}
               <div className="mt-12 p-6 bg-surface border border-white/10 rounded-xl flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div>
                    <h4 className="font-bold text-white mb-1">¿Listo para aplicar lo aprendido?</h4>
                    <p className="text-gray-400 text-sm">Únete a la comunidad y empieza hoy mismo.</p>
                  </div>
                  <a 
                    href="https://discord.gg/xrZwFPtN" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-neonGreen text-black font-bold rounded-lg hover:bg-white transition-colors whitespace-nowrap"
                  >
                    IR A DISCORD
                  </a>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};