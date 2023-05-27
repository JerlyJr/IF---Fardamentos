import styles from '../Login/Login.module.css';

import ImgLogo from '../../assets/logo.png';

// Hooks
import { useState, useEffect } from 'react';
import { useAuthentication, auth } from '../../hooks/useAuthentication';

const Cadastro = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Estado para controlar o valor do input de privilégios administrativos
  const [erro, setErro] = useState('');

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErro('');
  
    const user = {
      email: `${nomeUsuario}@if.com`, // Usando o nome de usuário como email
      password: senha,
      displayName: nomeUsuario,
      isAdmin: isAdmin,
    };
  
    if (senha !== confirmarSenha) {
      setErro('As senhas precisam ser iguais!');
      return;
    }
  
    try {
      const res = await createUser(user);
      console.log(res);
    } catch (error) {
      console.log(error.message);
      setErro('Ocorreu um erro durante o registro. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    if (authError) {
      setErro(authError);
    }
  }, [authError]);

  return (
    <>
      <div className="background-image"></div>
      <div className="fundo">
        <div className={styles.telaLogin}>
          <div className={styles.logo}>
            <img src={ImgLogo} alt="Logo IF Fardamentos" />
            <span>Seja bem-vindo!</span>
            <span>Cadastre um usuário no sistema:</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.caixaTexto}>
              <span>Digite seu nome de usuário:</span>
              <input
                type="text"
                name="nomeUsuario"
                id="nomeUsuario"
                placeholder="Nome de Usuário"
                required
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
              />
            </div>
            <div className={styles.caixaTexto}>
              <span>Digite sua senha:</span>
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className={styles.caixaTexto}>
              <span>Confirme a senha:</span>
              <input
                type="password"
                name="confirmarSenha"
                id="confirmarSenha"
                placeholder="Confirme a senha"
                required
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
            <div>
              <span>Privilégios administrativos?</span>
              <br />
              <input
                type="radio"
                id="sim"
                name="administrador"
                value="sim"
                checked={isAdmin} // Definindo o estado do input de acordo com o valor selecionado
                onChange={() => setIsAdmin(true)}
              />
              <label htmlFor="sim"> Sim</label>
              <br />
              <input
                type="radio"
                id="nao"
                name="administrador"
                value="nao"
                checked={!isAdmin} // Definindo o estado do input de acordo com o valor selecionado
                onChange={() => setIsAdmin(false)}
              />
              <label htmlFor="nao"> Não</label>
            </div>
            <div className={styles.botao}>
              {!loading && (
                <input type="submit" name="cadastrar" id="cadastrar" value="Cadastrar" />
              )}
              {loading && (
                <input
                  type="submit"
                  name="cadastrar"
                  id="cadastrar"
                  value="Aguarde..."
                  disabled
                />
              )}
              {erro && <p className="error">{erro}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cadastro;