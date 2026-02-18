import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuración exacta proporcionada por el usuario
const firebaseConfig = {
  apiKey: "AIzaSyB49ZRitwjTpf0ofAKbdQybgCktEL-PXf4",
  authDomain: "ganadinerohispano-a3df1.firebaseapp.com",
  projectId: "ganadinerohispano-a3df1",
  storageBucket: "ganadinerohispano-a3df1.firebasestorage.app",
  messagingSenderId: "1000835736436",
  appId: "1:1000835736436:web:63ae9817d97ff773958221",
  measurementId: "G-LT0J264GQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (opcional, pero buena práctica si tienes el ID)
// Usamos un try-catch por si se ejecuta en un entorno sin window (aunque en web no pasará)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics not supported in this environment");
}

// Initialize Auth
export const auth = getAuth(app);
export { analytics };
export default app;