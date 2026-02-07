import style from './post_card.scss'

function PostCard({ post }) {
  return (
    <article className={style.post-card}>
      <header className={style.post-card__header}>
        <h3 className={style.post-card__title}>{post.title}</h3>
      </header>

      <section className={style.post-card__content}>
        <p>{post.content}</p>
      </section>

      <footer className={style.post-card__footer}>
        <span className={style.post-card__author}>
          🕵️ {post.author || "Anônimo"}
        </span>

        {post.created_at && (
          <span className={style.post-card__date}>
            {new Date(post.created_at).toLocaleDateString("pt-BR")}
          </span>
        )}
      </footer>
    </article>
  );
}

export default PostCard;
