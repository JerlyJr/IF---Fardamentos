import styles from './Login.module.css';
import ImgLogo from '../../assets/logo.png';
import { useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Link } from 'react-router-dom';

const Login = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    const user = {
      email: nomeUsuario,
      password: senha,
    };

    try {
      await login(user);
      // Autenticação bem-sucedida, redirecione para a página desejada
    } catch (error) {
      console.log(error.message);
      setErro('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <>
      <div className="background-image"></div>
      <div className="fundo">
        <div className={styles.telaLogin}>
          <div className={styles.logo}>
            <img src={ImgLogo} alt="Logo IF Fardamentos" />
            <span className={styles.span}>Seja bem-vindo!</span>
            <span className={styles.span}>Entre no sistema:</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.caixaTexto}>
              <span className={styles.span}>Digite seu nome de usuário (@if.com):</span>
              <input
              className={styles.input}
                type="text"
                name="username"
                id="username"
                placeholder="Nome de Usuário"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
              />
            </div>
            <div className={styles.caixaTexto}>
              <span className={styles.span}>Digite sua senha:</span>
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className={styles.botao}>
              <button type="submit" name="entrar" id="entrar" disabled={loading}>
                {loading ? 'Aguarde...' : 'Entrar'}
              </button>
            </div>
            {erro && <p className="error">{erro}</p>}
          </form>
          <p>Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>.</p>
        </div>
      </div>
    </>
  );
};

export default Login;