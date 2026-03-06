import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authService = {
  // LOGIN COM GOOGLE (Já estava quase certo)
  async loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/', 
      },
    });

    if (error) throw error;
    return data;
  },

  // LOGIN (Agora usando o Supabase diretamente)
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) throw error;

    // O Supabase já salva o token automaticamente no LocalStorage/Cookies.
    // Mas se quiser manter sua lógica de salvar manualmente:
    if (data.session?.access_token) {
      localStorage.setItem('token', data.session.access_token);
    }

    return data;
  },

  // CADASTRO (Agora usando o Supabase diretamente)
  async register(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          display_name: email.split('@')[0], // Nome padrão baseado no email
        }
      }
    });

    if (error) throw error;
    return data;
  }
};