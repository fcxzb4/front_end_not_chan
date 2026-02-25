const API_URL = 'https://api-not-chan-bmmzu10qh-steezus-projects.vercel.app';

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email.trim(), 
        password: password 
      }),
    });

    // O erro estava aqui: o código deve continuar dentro da função login
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
    }

    return data;
  }, // Fim da função login

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
  } // Fim da função register
};