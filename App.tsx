import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WallOfShame } from './components/WallOfShame';
import { FeaturedOpportunity } from './components/FeaturedOpportunity';
import { MethodDirectory } from './components/MethodDirectory';
import { PremiumBenefits } from './components/PremiumBenefits'; // Import new component
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { ImageGenerator } from './components/ImageGenerator'; // NEW IMPORT
import { AuthModal } from './components/AuthModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { User } from './types';
import { auth } from './services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  // Real Firebase Session Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        
        // Note: In a real app, 'isPremium' would come from a database (Firestore)
        // For this demo, we'll keep it in local state if upgraded during session
        setUser(prevUser => ({
          username: firebaseUser.displayName || 'Usuario',
          email: firebaseUser.email || '',
          token: token,
          isVerified: firebaseUser.emailVerified,
          isPremium: prevUser?.isPremium || false // Persist premium state locally for demo
        }));
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (userData: User) => {
      setUser(prev => ({...userData, isPremium: prev?.isPremium || false}));
      setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
      try {
        await signOut(auth);
        setUser(null);
      } catch (error) {
        console.error("Error signing out", error);
      }
  };

  const handleUpgradeToPremium = () => {
      // Logic to update user status
      if (user) {
          setUser({ ...user, isPremium: true });
          // In a real app, here you would update the user document in Firestore
      } else {
          // If not logged in, prompt login first
          setIsAuthModalOpen(true);
      }
  };

  const openSubscription = () => {
      if (!user) {
          setIsAuthModalOpen(true);
      } else {
          setIsSubscriptionModalOpen(true);
      }
  };

  return (
    <div className="font-sans bg-background text-gray-200 min-h-screen selection:bg-neonGreen selection:text-black">
      <Header 
        user={user} 
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenSubscription={openSubscription}
      />
      <main>
        <Hero />
        <FeaturedOpportunity />
        <WallOfShame />
        
        {/* New Premium Benefits Section placed strategically */}
        <PremiumBenefits onOpenSubscription={openSubscription} />

        {/* Pass onOpenSubscription to lockable components */}
        <MethodDirectory 
            user={user} 
            onOpenSubscription={openSubscription} 
        />
        
        <BlogSection 
            user={user} 
            onOpenSubscription={openSubscription} 
        />
        
        {/* ChatBot Component */}
        <ChatBot />

        {/* NEW: PRO Image Generator (Floating Button Left) */}
        <ImageGenerator 
            user={user}
            onOpenSubscription={openSubscription}
        />

        {/* Floating Discord Button */}
        <a 
          href="https://discord.gg/xrZwFPtN"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 right-6 z-30 bg-[#5865F2] hover:bg-[#4752C4] text-white p-3 rounded-full shadow-purple transition-transform hover:scale-110 flex items-center justify-center opacity-80 hover:opacity-100"
          title="Únete a Discord"
        >
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M18.942 5.556C17.502 4.887 15.964 4.402 14.364 4.148C14.166 4.512 13.935 5.004 13.774 5.385C12.067 5.127 10.371 5.127 8.687 5.385C8.526 5.004 8.292 4.512 8.094 4.148C6.491 4.402 4.953 4.89 3.513 5.556C0.597 9.864 -0.198 14.067 0.207 18.228C2.169 19.668 4.071 20.544 5.925 20.544C6.402 19.902 6.834 19.221 7.215 18.504C6.537 18.246 5.895 17.934 5.286 17.58C5.454 17.454 5.619 17.319 5.778 17.184C9.288 18.792 13.194 18.792 16.656 17.184C16.818 17.319 16.983 17.454 17.151 17.58C16.542 17.934 15.897 18.246 15.222 18.504C15.603 19.218 16.035 19.902 16.512 20.544C18.369 20.544 20.271 19.668 22.23 18.228C22.716 13.485 21.465 9.297 18.942 5.556ZM8.082 15.213C7.032 15.213 6.171 14.253 6.171 13.074C6.171 11.895 7.014 10.935 8.082 10.935C9.162 10.935 10.023 11.895 10.005 13.074C10.005 14.253 9.162 15.213 8.082 15.213ZM14.382 15.213C13.332 15.213 12.471 14.253 12.471 13.074C12.471 11.895 13.314 10.935 14.382 10.935C15.462 10.935 16.323 11.895 16.305 13.074C16.305 14.253 15.462 15.213 14.382 15.213Z" fill="currentColor"/>
           </svg>
        </a>

        {/* Authentication Modal */}
        <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
        />

        {/* Subscription Modal (The Sales Page) */}
        <SubscriptionModal
            isOpen={isSubscriptionModalOpen}
            onClose={() => setIsSubscriptionModalOpen(false)}
            onUpgrade={handleUpgradeToPremium}
            user={user}
        />

      </main>
      <Footer />
    </div>
  );
};

export default App;