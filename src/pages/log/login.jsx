import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importação necessária
import { authService } from '../../service/authService';
import style from './login.module.scss';

export function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await authService.login(email, password);
        console.log('Logado:', data);
        alert('Logado com sucesso!');
        navigate('/'); // Redireciona para a Home após o login
      } else {
        await authService.register(email, password);
        alert('Cadastro realizado! Verifique seu e-mail.');
      }
    } catch (err) {
      alert('Erro na operação: ' + (err.message || 'Verifique os dados'));
    }
  };

  return (
    <div className={style.auth_container}>
      {/* Botão para voltar à Home */}
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
          <button type="submit">
            {isLogin ? 'Logar' : 'Criar conta'}
          </button>
        </form>

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