import React, { useState, useEffect } from 'react';
import { X, Lock, User, Mail, ShieldCheck, Loader2, KeyRound, ArrowRight, RefreshCw, LogIn, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { Captcha } from './Captcha';
import { User as UserType } from '../types';
import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendEmailVerification,
  sendPasswordResetEmail,
  AuthError
} from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
}

type AuthView = 'LOGIN' | 'REGISTER' | 'VERIFY_EMAIL' | 'FORGOT_PASSWORD';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [view, setView] = useState<AuthView>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Reset state when opening/closing
  useEffect(() => {
    if (isOpen) {
        setError('');
        setSuccessMsg('');
        setIsLoading(false);
        setCaptchaValid(false);
        setShowPassword(false);
    }
  }, [isOpen]);

  // Password strength logic
  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length > 7) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };
  
  const strength = getPasswordStrength(password);

  const translateFirebaseError = (code: string) => {
      switch (code) {
          case 'auth/email-already-in-use': return 'Este correo ya está registrado. ¿Ya tienes cuenta?';
          case 'auth/invalid-email': return 'El correo no es válido.';
          case 'auth/weak-password': return 'La contraseña es muy débil (min 6 caracteres).';
          case 'auth/user-not-found': return 'Usuario no encontrado. Crea una cuenta.';
          case 'auth/wrong-password': return 'Contraseña incorrecta.';
          case 'auth/invalid-credential': return 'Correo o contraseña incorrectos. Verifica espacios o mayúsculas.';
          case 'auth/too-many-requests': return 'Demasiados intentos. Espera un momento o restablece contraseña.';
          case 'auth/operation-not-allowed': return '¡Error de Configuración! Habilita "Email/Password" en Firebase Console.';
          default: return 'Error de autenticación: ' + code;
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate Captcha only for Login and Register (not verify/reset step)
    if (view !== 'VERIFY_EMAIL' && view !== 'FORGOT_PASSWORD' && !captchaValid) {
      setError('Por favor completa la verificación de seguridad (Smart Button).');
      return;
    }

    setIsLoading(true);
    const cleanEmail = email.trim(); // IMPORTANT: Remove accidental spaces

    try {
        if (view === 'LOGIN') {
            const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
            const user = userCredential.user;

            // Check if email is verified
            if (!user.emailVerified) {
                setError('Tu cuenta no está verificada.');
                setView('VERIFY_EMAIL');
                setIsLoading(false);
                return;
            }

            const token = await user.getIdToken();
            
            onLoginSuccess({
                 username: user.displayName || 'Usuario',
                 email: user.email || '',
                 token: token,
                 isVerified: true
            });

        } else if (view === 'REGISTER') {
            if (strength < 50) {
                setError('La contraseña es demasiado débil.');
                setIsLoading(false);
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: username });
            await sendEmailVerification(user);
            
            setView('VERIFY_EMAIL');
        } else if (view === 'FORGOT_PASSWORD') {
            await sendPasswordResetEmail(auth, cleanEmail);
            setSuccessMsg('Enlace de recuperación enviado a tu correo.');
            setError('');
            setTimeout(() => setView('LOGIN'), 3000);
        }
    } catch (err: any) {
        const code = err.code;
        const msg = translateFirebaseError(code);
        setError(msg);
        
        if (code !== 'auth/email-already-in-use' && code !== 'auth/wrong-password' && code !== 'auth/user-not-found' && code !== 'auth/invalid-credential') {
             console.error("Auth Error:", err);
        }
    } finally {
        setIsLoading(false);
    }
  };

  const handleCheckVerification = async () => {
      setIsLoading(true);
      setError('');
      
      try {
          const user = auth.currentUser;
          if (user) {
              await user.reload();
              if (user.emailVerified) {
                  const token = await user.getIdToken();
                  onLoginSuccess({
                      username: user.displayName || 'Usuario',
                      email: user.email || '',
                      token: token,
                      isVerified: true
                  });
              } else {
                  setError('Aún no has verificado el correo. Revisa tu bandeja de entrada o spam.');
              }
          } else {
              setError('Sesión expirada. Inicia sesión de nuevo.');
              setView('LOGIN');
          }
      } catch (err) {
          setError('Error verificando estado. Intenta de nuevo.');
      } finally {
          setIsLoading(false);
      }
  };

  const handleResendEmail = async () => {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
          try {
              await sendEmailVerification(user);
              setSuccessMsg('Correo reenviado. Revisa Spam.');
          } catch (e: any) {
              if (e.code === 'auth/too-many-requests') {
                  setError('Espera unos minutos antes de reenviar.');
              } else {
                  setError('Error al reenviar correo.');
              }
          }
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-[#121212] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-surface to-black">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-neonGreen" size={24} />
            <div>
                <h2 className="font-display font-bold text-xl text-white">
                    {view === 'VERIFY_EMAIL' ? 'Verificación Requerida' : 
                     view === 'FORGOT_PASSWORD' ? 'Recuperar Cuenta' : 'Acceso Seguro'}
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Powered by Firebase Auth</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* View: VERIFY EMAIL */}
        {view === 'VERIFY_EMAIL' ? (
            <div className="p-8 text-center">
                <div className="w-20 h-20 bg-techPurple/20 rounded-full flex items-center justify-center mx-auto mb-6 text-techPurple animate-pulse">
                    <Mail size={40} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">¡Revisa tu bandeja de entrada!</h3>
                <p className="text-gray-400 text-sm mb-6">
                    Hemos enviado un enlace de confirmación a <strong className="text-white">{email || auth.currentUser?.email}</strong>. 
                    <br/><br/>
                    Debes hacer clic en el enlace del correo. <br/>
                    <span className="text-yellow-500 font-bold block mt-2">⚠️ REVISA LA CARPETA DE SPAM O "CORREO NO DESEADO" SI NO LO ENCUENTRAS.</span>
                </p>

                {error && <div className="bg-danger/10 text-danger text-xs p-2 rounded mb-4 border border-danger/20">{error}</div>}
                {successMsg && <div className="bg-neonGreen/10 text-neonGreen text-xs p-2 rounded mb-4 border border-neonGreen/20">{successMsg}</div>}

                <div className="space-y-3">
                    <button 
                        onClick={handleCheckVerification}
                        disabled={isLoading}
                        className="w-full py-3 bg-neonGreen hover:bg-white text-black font-bold rounded flex items-center justify-center gap-2 transition-all shadow-neon"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'YA HE VERIFICADO MI CUENTA'}
                    </button>
                    
                    <button 
                        onClick={handleResendEmail}
                        type="button"
                        className="text-xs text-techPurple hover:text-white underline flex items-center justify-center gap-1 w-full"
                    >
                        <RefreshCw size={12} /> No recibí el correo (Reenviar)
                    </button>
                </div>

                <button onClick={() => setView('LOGIN')} className="mt-6 text-gray-500 text-sm hover:text-white">
                    Volver al inicio de sesión
                </button>
            </div>
        ) : view === 'FORGOT_PASSWORD' ? (
            /* View: FORGOT PASSWORD */
            <div className="p-6">
                <p className="text-gray-400 text-sm mb-6">
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded border border-danger/30">{error}</div>}
                    {successMsg && <div className="bg-neonGreen/10 text-neonGreen text-sm p-3 rounded border border-neonGreen/30">{successMsg}</div>}

                    <div className="relative group">
                        <Mail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-neonGreen transition-colors" size={18} />
                        <input 
                            type="email" 
                            placeholder="Tu correo registrado"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neonGreen outline-none transition-all placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-3 bg-techPurple text-white font-bold rounded-lg hover:bg-violet-500 transition-all shadow-purple flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'ENVIAR ENLACE'}
                    </button>
                </form>
                <button onClick={() => setView('LOGIN')} className="mt-6 w-full text-center text-gray-500 text-sm hover:text-white">
                    Cancelar y volver
                </button>
            </div>
        ) : (
            /* View: LOGIN / REGISTER */
            <>
                <div className="flex border-b border-white/5">
                    <button 
                        onClick={() => { setView('LOGIN'); setError(''); }} 
                        className={`flex-1 py-3 text-sm font-bold transition-colors ${view === 'LOGIN' ? 'text-neonGreen border-b-2 border-neonGreen bg-neonGreen/5' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        INICIAR SESIÓN
                    </button>
                    <button 
                        onClick={() => { setView('REGISTER'); setError(''); }} 
                        className={`flex-1 py-3 text-sm font-bold transition-colors ${view === 'REGISTER' ? 'text-neonGreen border-b-2 border-neonGreen bg-neonGreen/5' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        CREAR CUENTA
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-danger/10 border border-danger/30 text-danger text-sm p-3 rounded flex items-center gap-2 animate-pulse">
                            <Lock size={14} className="shrink-0" /> 
                            <span className="flex-1">{error}</span>
                        </div>
                    )}

                    {view === 'REGISTER' && (
                        <div className="relative group">
                            <User className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-neonGreen transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Nombre de Usuario (Público)"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neonGreen outline-none transition-all placeholder:text-gray-600"
                                required
                            />
                        </div>
                    )}

                    <div className="relative group">
                        <Mail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-neonGreen transition-colors" size={18} />
                        <input 
                            type="email" 
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neonGreen outline-none transition-all placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <KeyRound className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-neonGreen transition-colors" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-white focus:border-neonGreen outline-none transition-all placeholder:text-gray-600"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Forgot Password Link */}
                    {view === 'LOGIN' && (
                        <div className="flex justify-end">
                            <button 
                                type="button"
                                onClick={() => setView('FORGOT_PASSWORD')}
                                className="text-xs text-gray-500 hover:text-neonGreen transition-colors flex items-center gap-1"
                            >
                                <HelpCircle size={10} /> ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                    )}

                    {/* Password Strength Meter */}
                    {view === 'REGISTER' && password && (
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-gray-500 uppercase">
                                <span>Seguridad:</span>
                                <span className={strength < 50 ? 'text-danger' : strength < 100 ? 'text-yellow-500' : 'text-neonGreen'}>
                                    {strength < 50 ? 'Débil' : strength < 100 ? 'Media' : 'Fuerte'}
                                </span>
                            </div>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-500 ${strength < 50 ? 'bg-danger' : strength < 100 ? 'bg-yellow-500' : 'bg-neonGreen'}`} 
                                    style={{width: `${strength}%`}}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className="pt-2">
                        <Captcha onValidate={setCaptchaValid} />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-3.5 bg-neonGreen text-black font-bold rounded-lg hover:bg-white transition-all shadow-neon flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                CONECTANDO...
                            </>
                        ) : (
                            <>
                                {view === 'LOGIN' ? 'ACCEDER AL HUB' : 'CREAR CUENTA'}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
                
                <div className="bg-surface/50 p-4 text-center text-xs text-gray-500 border-t border-white/5">
                    Protegido por Google Firebase Identity. SSL Activo.
                </div>
            </>
        )}
      </div>
    </div>
  );
};