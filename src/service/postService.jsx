const API_URL = "https://api-not-chan.vercel.app";

// 1. Buscar todos os posts (Feed)
export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) throw new Error("Erro ao buscar relatos");
  return response.json();
}

// 2. Criar um novo post
export async function createPost(post) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    body: JSON.stringify(post)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao criar relato");
  }
  return response.json();
}

// 3. Buscar comentários de um post específico
export async function getCommentsByPost(postId) {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!response.ok) throw new Error("Erro ao buscar comentários");
  return response.json();
}

// 4. Enviar um novo comentário (Substitui o fetch solto)
export async function createComment(postId, content) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await fetch(`${API_URL}/posts/comments`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // O Back-end agora exige isso
    },
    body: JSON.stringify({ content, postId }),
  });
  return response.json();
}