import { usePosts } from "../hooks/usePosts";
import PostForm from "../components/post/postForm";
import PostList from "../components/post/postList";
import style from "./home_page.module.scss";

function HomePage() {
  const { posts, loading, error, addPost } = usePosts();

  if (loading) return (<p>Carregando...</p>);
  if (error) return (<p>Erro: {error}</p>);

  return (
    <>
    <div className={style.home-page}>
    <PostForm onAddPost={addPost} />
    <PostList posts={posts} />
  </div>
    </>
  );
}

export default HomePage;

