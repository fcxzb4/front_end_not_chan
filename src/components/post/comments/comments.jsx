import { useState } from 'react'; // Importação que faltava
import { useRealtimeComments } from '../../../hooks/useRealtimeComments';
import style from './comments.module.scss';

export function CommentSection({ postId }) {
  const comments = useRealtimeComments(postId);
  const [newComment, setNewComment] = useState('');

  // Use a URL da Vercel em vez de localhost
  const API_URL = 'https://api-not-chan.vercel.app';

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment, postId }),
      });
      setNewComment('');
    } catch (err) {
      console.error("Erro ao enviar comentário:", err);
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
        />
        <button type="submit">Comentar</button>
      </form>

      <div className={style.list}>
        {comments.length === 0 ? (
          <p className={style.no_comments}>Ninguém comentou ainda. Seja o primeiro!</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className={style.comment_item}>
              <p>{c.content}</p>
              <span>{new Date(c.createdAt).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}