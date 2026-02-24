import { Link } from 'react-router-dom';
import style from './Navbar.module.scss';

export function Navbar() {
  return (
    <nav className={style.navbar}>
      <div className={style.logo}>RedditClone</div>
      <div className={style.auth_buttons}>
        <Link title="Entrar" to="/login" className={style.login_btn}>
          Entrar
        </Link>
      </div>
    </nav>
  );
}