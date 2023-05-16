import "./Pedidos.css"
import ImgPedido from '../assets/pedido.png'

const Pedidos = () => {
  return (
    <div>
        <div className="background-image"></div>
        <div className="fundo">
            <div className="tela">
                <div className="conteiner-esquerdo">
                    <input type="text" placeholder="Pesquisar" />
                    <div className="pedidos">
                        <div className="conteiner-pedido1">
                            <div className="nome-pedido">Pedido 01</div>
                            <div className="numero-pedido">#001</div>
                        </div>
                        <div className="conteiner-pedido2">
                            <div className="nome-cliente">Cliente 01</div>
                            <div className="itens-pedido">Item 01</div>
                        </div>
                    </div>
                    <div className="pedidos">
                        <div className="conteiner-pedido1">
                            <div className="nome-pedido">Pedido 02</div>
                            <div className="numero-pedido">#002</div>
                        </div>
                        <div className="conteiner-pedido2">
                            <div className="nome-cliente">Cliente 02</div>
                            <div className="itens-pedido">Item 02</div>
                        </div>
                    </div>
                    <div className="pedidos">
                        <div className="conteiner-pedido1">
                            <div className="nome-pedido">Pedido 03</div>
                            <div className="numero-pedido">#003</div>
                        </div>
                        <div className="conteiner-pedido2">
                            <div className="nome-cliente">Cliente 03</div>
                            <div className="itens-pedido">Item 03</div>
                        </div>
                    </div>
                    <div className="pedidos">
                        <div className="conteiner-pedido1">
                            <div className="nome-pedido">Pedido 04</div>
                            <div className="numero-pedido">#004</div>
                        </div>
                        <div className="conteiner-pedido2">
                            <div className="nome-cliente">Cliente 04</div>
                            <div className="itens-pedido">Item 04</div>
                        </div>
                    </div>
                </div>
                <div className="conteiner-direito">
                    <img src={ImgPedido} alt="" width="100px" height="100px" />
                    <button type="submit" name="Adicionar_pedido" id="Adicionar_pedido">Adicionar novo pedido</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pedidos