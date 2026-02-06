s

function PostCard({ post }) {
  return (
    <article className="post-card">
      <header className="post-card__header">
        <h3 className="post-card__title">{post.title}</h3>
      </header>

      <section className="post-card__content">
        <p>{post.content}</p>
      </section>

      <footer className="post-card__footer">
        <span className="post-card__author">
          🕵️ {post.author || "Anônimo"}
        </span>

        {post.created_at && (
          <span className="post-card__date">
            {new Date(post.created_at).toLocaleDateString("pt-BR")}
          </span>
        )}
      </footer>
    </article>
  );
}

export default PostCard;
