import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adicionado useNavigate
import { authService } from '../../service/authService';
import style from './login.module.scss';

export function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Inicializado aqui

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await authService.login(email, password);
        console.log('Logado:', data);
        alert('Logado com sucesso!');
        navigate('/'); // Agora o navigate vai funcionar
      } else {
        await authService.register(email, password);
        alert('Cadastro realizado! Verifique seu e-mail para confirmar a conta.');
      }
    } catch (err) {
      alert('Erro na operação: ' + (err.message || 'Verifique os dados'));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authService.loginWithGoogle();
      // O Supabase redireciona automaticamente após o login do Google
    } catch (err) {
      console.error("Erro no Google OAuth:", err.message);
      alert('Erro ao entrar com Google');
    }
  };

  return (
    <div className={style.auth_container}>
      <Link to="/" className={style.back_link}>
        ← Voltar para o feed
      </Link>

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
          <button type="submit" className={style.main_submit}>
            {isLogin ? 'Logar' : 'Criar conta'}
          </button>
        </form>

        {/* Separador visual opcional */}
        <div className={style.separator}>ou</div>

        {/* Botão do Google fora do <form> para não disparar o handleSubmit */}
        <button 
          type="button" 
          onClick={handleGoogleLogin} 
          className={style.google_btn}
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