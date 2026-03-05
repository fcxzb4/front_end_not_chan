import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. Definição segura das credenciais
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Inicialização do cliente (apenas se as chaves existirem)
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export function useRealtimeComments(postId) {
  const [comments, setComments] = useState([]);
  
  // URL da sua API no NestJS (Vercel)
  const API_URL = 'https://api-not-chan.vercel.app';

  useEffect(() => {
    if (!postId || !supabase) return;

    // 1. Buscar comentários iniciais via sua API NestJS
    fetch(`${API_URL}/posts/${postId}/comments`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        // Garante que 'data' seja um array antes de salvar
        setComments(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error("Erro ao carregar comentários:", err));

    // 2. Escutar novos comentários via WebSocket (Realtime do Supabase)
    const channel = supabase
      .channel(`comments-post-${postId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Comment', // Certifique-se que o nome no banco é exatamente 'Comment'
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          // Adiciona o novo comentário no topo da lista
          setComments((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // Limpeza ao desmontar o componente
    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  return comments;
}