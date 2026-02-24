import { Link } from "react-router-dom"; // Importante para a navegação
import { usePosts } from "../../hooks/usePosts";
import PostForm from "../../components/post/postForm";
import PostList from "../../components/post/postList";
import style from "./home_page.module.scss";

function HomePage() {
  const { posts, loading, error, addPost } = usePosts();

  return (
    <div className={style.container}>
      {/* Navbar simples integrada ou você pode criar um componente separado */}
      <nav className={style.navbar}>
        <div className={style.logo}>RedditClone</div>
        <div className={style.auth_area}>
          <Link to="/login" className={style.login_button}>
            Entrar
          </Link>
        </div>
      </nav>

      <main className={style.content}>
        <div className={style.feed_container}>
          <PostForm onAddPost={addPost} />
          
          {loading && <p className={style.status_msg}>Carregando posts...</p>}
          {error && <p className={style.error_msg}>Erro: {error}</p>}
          
          {!loading && !error && <PostList posts={posts} />}
        </div>
      </main>
    </div>
  );
}

export default HomePage;