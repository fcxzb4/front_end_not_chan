import { usePosts } from "../hooks/usePosts";
import styles from './homePage.scss'
import PostForm from "../components/post/postForm";
import PostCard from "../components/post/postCard";

function homePage() {
  const { posts, loading, error, addPost } = usePosts();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <>
      <PostForm onAddPost={addPost} />

      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      <div className="home-page">
      <h1>Relatos Anônimos</h1>

      {/* PostForm precisa ter className="post-form" */}
      {/* PostCard precisa ter className="post-card" */}
    </div>
    </>
  );
}

export default homePage ;
