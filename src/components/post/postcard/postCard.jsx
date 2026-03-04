import { useState } from 'react'; // Adicionado para controlar a exibição
import { CommentSection } from '../comments/comments'; // Ajuste o caminho conforme sua pasta
import style from './post_card.module.scss';

function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <article className={style.post_card}>
      <header className={style.post_card__header}>
        <h3 className={style.post_card__title}>{post.title}</h3>
      </header>

      <section className={style.post_card__content}>
        <p>{post.content}</p>
      </section>

      <footer className={style.post_card__footer}>
        <span className={style.post_card__author}>
          🕵️ {post.author || "Anônimo"}
        </span>

        {post.created_at && (
          <span className={style.post_card__date}>
            {new Date(post.created_at).toLocaleDateString("pt-BR")}
          </span>
        )}
        
        {/* Botão para abrir/fechar comentários */}
        <button 
          className={style.comment_toggle} 
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? 'Ocultar Comentários' : 'Ver Comentários'}
        </button>
      </footer>

      {/* Renderização condicional da seção de comentários */}
      {showComments && (
        <div className={style.post_comments_wrapper}>
          <CommentSection postId={post.id} />
        </div>
      )}
    </article>
  );
}

export default PostCard;