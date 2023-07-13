import '../css/global.css'
import '../css/pedidos.css'

import ImgPedidos from '../img/pedido.png'

const Pedidos = () => {
    return (
        <>
        <div class="background-image"></div>
    <div class="fundo">
        <div class="tela">
            <div class="conteiner-esquerdo">
                <input type="text" placeholder="Pesquisar"/>
                    <a href="pedido.html">
                        <div class="pedidos">
                            <div class="conteiner-pedido1">
                                <div class="nome-pedido">Pedido 01</div>
                                <div class="numero-pedido">#001</div>
                            </div>
                            <div class="conteiner-pedido2">
                                <div class="nome-cliente">Cliente 01</div>
                                <div class="itens-pedido">Item 01</div>
                            </div>
                        </div>
                    </a>
                <div class="pedidos">
                    <div class="conteiner-pedido1">
                        <div class="nome-pedido">Pedido 02</div>
                        <div class="numero-pedido">#002</div>
                    </div>
                    <div class="conteiner-pedido2">
                        <div class="nome-cliente">Cliente 02</div>
                        <div class="itens-pedido">Item 02</div>
                    </div>
                </div>
                <div class="pedidos">
                    <div class="conteiner-pedido1">
                        <div class="nome-pedido">Pedido 03</div>
                        <div class="numero-pedido">#003</div>
                    </div>
                    <div class="conteiner-pedido2">
                        <div class="nome-cliente">Cliente 03</div>
                        <div class="itens-pedido">Item 03</div>
                    </div>
                </div>
                <div class="pedidos">
                    <div class="conteiner-pedido1">
                        <div class="nome-pedido">Pedido 04</div>
                        <div class="numero-pedido">#004</div>
                    </div>
                    <div class="conteiner-pedido2">
                        <div class="nome-cliente">Cliente 04</div>
                        <div class="itens-pedido">Item 04</div>
                    </div>
                </div>
            </div>
            <div class="conteiner-direito">
                <img src={ImgPedidos} alt="" width="100px" height="100px"/>
                <a href="criar_pedido.html"><button type="submit" name="Adicionar_pedido" id="Adicionar_pedido">Adicionar novo pedido</button></a>
            </div>
        </div>
    </div>
    </>
    );
}

export default Pedidos;