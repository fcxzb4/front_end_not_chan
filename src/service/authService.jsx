import { createClient } from '@supabase/supabase-js';

// No Vite, usamos import.meta.env.VITE_NOME_DA_VARIAVEL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Conexão direta com o Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const API_URL = 'https://api-not-chan.vercel.app';

export const authService = {
  async loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/home', 
      },
    });

    if (error) throw error;
    return data;
  },

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