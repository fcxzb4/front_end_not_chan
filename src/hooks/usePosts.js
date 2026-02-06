import { useEffect, useState } from "react";
import { getPosts, createPost } from "../services/postService";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addPost(post) {
    try {
      const newPost = await createPost(post);
      setPosts(prev => [newPost, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return { posts, loading, error, addPost };
}
