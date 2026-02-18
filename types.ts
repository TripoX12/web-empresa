export enum MethodCategory {
  SURVEYS = 'Encuestas',
  CRYPTO = 'Trading y Cripto',
  AFFILIATE = 'Marketing de Afiliados',
  FREELANCE = 'Freelancing',
  TASKS = 'Micro-Tareas',
  ECOMMERCE = 'E-Commerce',
  HIGH_TICKET = 'High Ticket Closing',
}

export enum Difficulty {
  BEGINNER = 'Principiante',
  INTERMEDIATE = 'Intermedio',
  ADVANCED = 'Avanzado',
  EXPERT = 'Solo Expertos',
}

export interface Method {
  id: string;
  name: string;
  description: string;
  category: MethodCategory;
  verified: boolean;
  investmentRequired: boolean;
  difficulty: Difficulty;
  rating: number; // 1-5
  link?: string;
  isPremium?: boolean; // New Flag
  potentialEarnings?: string; // e.g. "$500 - $2000 / mes"
  content?: string; // Full HTML guide content
}

export interface ScamEntry {
  id: string;
  name: string;
  type: string;
  riskLevel: 'Safe' | 'Warning' | 'High' | 'Critical';
  // Fixed: Added 'WARNING' to allowed status types to match usage in WallOfShame.tsx
  status: 'SCAM' | 'LEGIT' | 'SUSPICIOUS' | 'WARNING'; 
  reason: string;
  dateReported?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Added content field for full article
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
  isPremium?: boolean; // New Flag
}

export interface User {
  username: string;
  email: string;
  token: string;
  isVerified: boolean;
  isPremium?: boolean; // New Flag
}