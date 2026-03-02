import { createClient } from '@supabase/supabase-js';

// Conexão direta com o Supabase (para o OAuth)
const supabase = createClient(
  'SUA_SUPABASE_URL', 
  'SUA_SUPABASE_ANON_KEY'
);

const API_URL = 'https://api-not-chan.vercel.app';

export const authService = {
  // --- LOGIN COM GOOGLE (NOVO) ---
  async loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Para onde o usuário volta após logar no Google
        redirectTo: window.location.origin + '/home', 
      },
    });

    if (error) throw error;
    return data;
  },

  // --- LOGIN TRADICIONAL (MANTÉM) ---
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email.trim(), 
        password: password 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
    }

    return data;
  },

  // --- REGISTRO TRADICIONAL (MANTÉM) ---
  async register(email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email.trim(), 
        password: password 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao criar conta');
    }

    return data;
  }
};