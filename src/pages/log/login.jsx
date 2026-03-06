import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../service/authService';
import style from './login.module.scss';

export function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // Estado para evitar múltiplos cliques
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login(email, password);
        // Não precisamos dar alert se a Navbar mudar, mas é bom para o usuário
        navigate('/'); 
      } else {
        await authService.register(email, password);
        alert('Cadastro realizado! Se o Supabase exigir, verifique seu e-mail.');
        setIsLogin(true); // Muda para tela de login após cadastrar
      }
    } catch (err) {
      alert('Erro: ' + (err.message || 'Verifique seus dados'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authService.loginWithGoogle();
    } catch (err) {
      alert('Erro ao entrar com Google');
    }
  };

  return (
    <div className={style.auth_container}>
      <Link to="/" className={style.back_link}>← Voltar para o feed</Link>

      <div className={style.auth_card}>
        <h2>{isLogin ? 'Entrar' : 'Cadastrar'}</h2>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className={style.main_submit} disabled={loading}>
            {loading ? 'Processando...' : (isLogin ? 'Logar' : 'Criar conta')}
          </button>
        </form>

        <div className={style.separator}>ou</div>

        <button 
          type="button" 
          onClick={handleGoogleLogin} 
          className={style.google_btn}
          disabled={loading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Entrar com Google
        </button>

        <button 
          className={style.toggle_btn} 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Novo por aqui? Cadastre-se' : 'Já tem conta? Faça Login'}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;