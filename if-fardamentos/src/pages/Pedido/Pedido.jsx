import styles from './Pedido.module.css'

const Pedido = () => {
    return (
        <>
<div class="background-image"/>

<div class="fundo">

    <div class="tela">
        <div class="conteiner-esquerdo">
            <input type="text" placeholder="Pesquisar"/>
                    <div class="pedido-selecionado">

                        <div class="conteiner-pedido1">
                            <div class="nome-pedido">Pedido 01</div>
                            <div class="numero-pedido">#001</div>
                        </div>

                        <div class="conteiner-pedido2">
                            <div class="nome-cliente">Cliente 01</div>
                            <div class="itens-pedido">Item 01</div>
                        </div>
                    </div>

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
                        <div class="cliente">Claudia</div>
                    </div>

                    <div class="conteiner-telefone">
                        <div class="telefone">Telefone:</div>
                        <div class="telefone"> (XX) X XXXX-XXXX</div>
                    </div>

                </div>

                <div class="componente2">Data: 30/03/23</div>

            </div>

            <div class="linha3">

                <div class="componente1">
                    <div class="topico">Item</div>
                    <div class="conteudo">
                        <div class="nome_item">
                            Jaleco
                        </div>
                    </div>
                </div>

                <div class="componente2">
                    <div class="topico">Descrição</div>
                    <div class="conteudo">
                        <div class="nome_item">
                            Oxford branco modelo ufif. <br/>
                            Bordado peito: Cor verde bandeira. <br/>
                            Claudia Melo <br/>
                            ENFERMAGEM <br/>
                            Bordado braço: Brasão enfermagem unif <br/>
                            Ajustes: Reduzir 6cm nas mangas
                        </div>
                    </div>
                </div>

                <div class="componente3">
                    <div class="topico">Quantidade</div>
                    <div class="conteudo">
                        <div class="txt1">
                            <div class="quantidade">
                                01
                            </div>
                        </div>
                        <div class="txt2">Remover</div>
                    </div>
                </div>

                <div class="componente4">
                    <div class="topico">Valor Unitário</div>
                    <div class="conteudo">
                        <div class="valor_unitario">
                            R$ 00,00
                        </div>
                    </div>
                </div>

                <div class="componente5">
                    <div class="topico">Preço</div>
                    <div class="conteudo">
                        <div class="preco">
                            R$ 00,00
                        </div>
                    </div>
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

export default Pedido;