import PostCard from "../post/postcard/postCard";

function PostList({ posts }) {
  if (!posts.length) {
    return <p>Nenhum relato encontrado.</p>;
  }

  return (
    <section>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}

export default PostList;
