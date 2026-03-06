import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = "https://kbqqjvuwxmgfbtfnkpac.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXFqdnV3eG1nZmJ0Zm5rcGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NTk1MjUsImV4cCI6MjA4NjMzNTUyNX0.6fZs9KyKKR_rucF9Gclx7G-MiBGKZ5Ezj5jDElAOv3Y";

 console.log("Supabase URL:", supabaseUrl);
console.log("Anon Key carregada:", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERRO: Variáveis de ambiente do Supabase não encontradas!");
}

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