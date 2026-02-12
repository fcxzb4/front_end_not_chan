import style from './post_card.module.scss'

function PostCard({ post }) {
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
      </footer>
    </article>
  );
}

export default PostCard;
