const API_URL = "http://localhost:3000";

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Erro ao buscar relatos");
  }

  return response.json();
}

export async function createPost(post) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  });

  if (!response.ok) {
    throw new Error("Erro ao criar relato");
  }

  return response.json();
}
