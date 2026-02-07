function PostForm({ onAddPost }) {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    onAddPost({
      title: formData.get("title"),
      content: formData.get("content")
    });

    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Título" required />
      <textarea name="content" placeholder="Relato" required />
      <button type="submit">Publicar</button>
    </form>
  );
}

export default PostForm;
