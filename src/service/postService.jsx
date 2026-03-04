const API_URL = "https://api-not-chan.vercel.app";

// 1. Buscar todos os posts (Feed)
export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Erro ao buscar relatos");
  }

  return response.json();
}

// 2. Criar um novo post
export async function createPost(post) {
  const token = localStorage.getItem('token'); // Pega o token se o usuário estiver logado
  
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }) // Envia o token se existir
    },
    body: JSON.stringify(post)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao criar relato");
  }

  return response.json();
}

// 3. NOVO: Buscar comentários de um post específico
// Essa função será usada dentro do seu Hook ou Componente de Comentários
export async function getCommentsByPost(postId) {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`);

  if (!response.ok) {
    throw new Error("Erro ao buscar comentários");
  }

  return response.json();
}