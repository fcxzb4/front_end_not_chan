import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Use as mesmas variáveis que você já tem no .env
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export function useRealtimeComments(postId) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 1. Buscar comentários iniciais via sua API NestJS
    fetch(`http://localhost:3000/posts/${postId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data));

    // 2. Escutar novos comentários via WebSocket
    const channel = supabase
      .channel(`comments-post-${postId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Comment',
          filter: `postId=eq.${postId}`,
        },
        (payload) => {
          // Adiciona o novo comentário recebido pelo WebSocket na lista
          setComments((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  return comments;
}