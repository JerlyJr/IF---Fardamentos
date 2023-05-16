import './Login.css'

import ImgLogo from "../assets/logo.png"

const Login = () => {
  return (
    <div>
        <div className="background-image"></div>
        <div className="fundo">
            <div className="tela-login">
            <div className="logo">
                <img src={ImgLogo} alt="Logo IF Fardamentos" />
                Seja bem-vindo!
            </div>
            <div class="caixa-texto">
                Digite sua senha:
                <input type="password" name="senha" id="senha" placeholder="Senha" />
            </div>
            <div class="botao">
                <button type="submit" name="entrar" id="entrar">Entrar</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login