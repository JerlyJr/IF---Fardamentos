import '../css/global.css'
import '../css/login.css'

import ImgLogo from '../img/logo.png'

const Login = () => {
    return (
        <>
    <div className="background-image"></div>
    <div className="fundo">
        <div className="tela-login">
        <div className="logo">
            <img src={ImgLogo}/>
            Seja bem vindo(a)!
        </div>
        <div className="caixa-texto">
            Digite sua senha:
            <input type="password" name="senha" id="senha" placeholder="Senha"/>
        </div>
        <div class="botao">
            <a href="pedidos.jsx"><button type="submit" name="entrar" id="entrar">Entrar</button></a>
        </div>
        </div>
    </div>
</>
    );
}

export default Login;