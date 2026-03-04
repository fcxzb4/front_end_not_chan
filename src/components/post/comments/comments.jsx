import { useState } from 'react';
import { useRealtimeComments } from '../../../hooks/useRealtimeComments';
import { createComment } from '../../../service/postService'; 
import style from './comments.module.scss';

export function CommentSection({ postId }) {
  const comments = useRealtimeComments(postId);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false); // Dica: adicione um estado de loading

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || loading) return;

    setLoading(true);
    try {
      // 2. Use a função do service que já tem a URL CORRETA (/posts/comments)
      await createComment(postId, newComment);
      
      setNewComment('');
    } catch (err) {
      console.error("Erro ao enviar comentário:", err);
      alert("Erro ao enviar comentário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.comment_section}>
      <form onSubmit={handleSend} className={style.comment_form}>
        <input 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="O que você acha disso?"
          required
          disabled={loading} // Desativa o campo enquanto envia
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Comentar'}
        </button>
      </form>

      <div className={style.list}>
        {comments.length === 0 ? (
          <p className={style.no_comments}>Ninguém comentou ainda. Seja o primeiro!</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className={style.comment_item}>
              <p>{c.content}</p>
              {/* 3. Verifique se o nome aqui é createdAt ou created_at (conforme o map do Prisma) */}
              <span>{new Date(c.createdAt || c.created_at).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}