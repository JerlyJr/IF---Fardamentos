import '../css/global.css'
import '../css/criar_pedido.css'

const CriarPedido = () => {
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
                <div class="linha1">
                    <div class="nome-pedido">Pedido</div>
                    <div class="numero-pedido">#003</div>
                </div>
                <div class="linha2">
                    <div class="componente1">
                        <div class="conteiner-cliente">
                            <div class="nome-cliente">Cliente:</div>
                            <input type="text" placeholder="Nome do Cliente"/>
                        </div>
                        <div class="conteiner-telefone">
                            <div class="telefone">Telefone:</div>
                            <input type="text" placeholder="(XX) X XXXX-XXXX"/>
                        </div>
                    </div>
                    <div class="componente2">Data: 30/03/23</div>
                </div>
                <div class="linha3">
                    <div class="componente1">
                        <div class="topico">Item</div>
                        <div class="conteudo"><input type="text" placeholder="Nome do item"/></div>
                    </div>
                    <div class="componente2">
                        <div class="topico">Descrição</div>
                        <div class="conteudo"><input type="text" placeholder="Descreva características do pedido"/></div>
                    </div>
                    <div class="componente3">
                        <div class="topico">Quantidade</div>
                        <div class="conteudo">
                            <div class="txt1"><input type="number" id="numero" name="numero" min="0" max="10" placeholder="0"/></div>
                            <div class="txt2">Remover</div>
                        </div>
                    </div>
                    <div class="componente4">
                        <div class="topico">Valor Unitário</div>
                        <div class="conteudo"><input type="text" placeholder="R$ 00,00"/></div>
                    </div>
                    <div class="componente5">
                        <div class="topico">Preço</div>
                        <div class="conteudo"><input type="text" placeholder="R$ 00,00"/></div>
                    </div>
                </div>
                <div class="linha4">
                    <button type="submit">Adicionar novo item</button>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

export default CriarPedido;