import { useRealtimeComments } from '../../hooks/useRealtimeComments';
import style from './comments.module.scss';

export function CommentSection({ postId }) {
  const comments = useRealtimeComments(postId);
  const [newComment, setNewComment] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    // Envia para o seu BACK-END (NestJS + Prisma)
    await fetch(`http://localhost:3000/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newComment, postId }),
    });
    setNewComment('');
  };

  return (
    <div className={style.comment_section}>
      <form onSubmit={handleSend}>
        <input 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="O que você acha disso?"
        />
        <button type="submit">Comentar</button>
      </form>

      <div className={style.list}>
        {comments.map(c => (
          <div key={c.id} className={style.comment_item}>
            <p>{c.content}</p>
            <span>{new Date(c.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}