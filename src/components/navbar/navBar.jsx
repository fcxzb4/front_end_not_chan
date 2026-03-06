import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient'; // Certifique-se que o caminho está correto
import style from './Navbar.module.scss';

export function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Verifica o usuário assim que o componente carrega
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // 2. Escuta mudanças de estado (Login, Logout, Token renovado)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // O onAuthStateChange vai cuidar de limpar o estado 'user' automaticamente
  };

  return (
    <nav className={style.navbar}>
      <div className={style.logo}>
        <Link to="/">Not-Chan</Link>
      </div>

      <div className={style.auth_buttons}>
        {user ? (
          <div className={style.user_info}>
            <span className={style.welcome_text}>
              Olá, <strong>{user.user_metadata?.display_name || user.email.split('@')[0]}</strong>
            </span>
            <button onClick={handleLogout} className={style.logout_btn}>
              Sair
            </button>
          </div>
        ) : (
          <Link title="Entrar" to="/login" className={style.login_btn}>
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}