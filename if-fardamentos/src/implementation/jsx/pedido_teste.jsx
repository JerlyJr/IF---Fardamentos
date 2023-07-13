import React, { useState } from 'react';
import '../css/global.css'
import '../css/pedido.css'

const Pedido = () => {

    const [selectedPedido, setSelectedPedido] = useState(null);

    const showDetails = (pedidoId) => {
        setSelectedPedido(pedidoId);
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <div class="background-image" />

            <div class="fundo">

                <div class="tela">
                    <div class="conteiner-esquerdo">
                        <input type="text" placeholder="Pesquisar" />

                        <div
                            className={`pedidos ${selectedPedido === 1 ? 'active' : ''}`}
                            onClick={() => showDetails(1)}
                            data-id="1"
                        >

                            <div class="conteiner-pedido1">
                                <div class="nome-pedido">Pedido 01</div>
                                <div class="numero-pedido">#001</div>
                            </div>

                            <div class="conteiner-pedido2">
                                <div class="nome-cliente">Cliente 01</div>
                                <div class="itens-pedido">Item 01</div>
                            </div>

                        </div>

                        <div
                            className={`pedidos ${selectedPedido === 2 ? 'active' : ''}`}
                            onClick={() => showDetails(2)}
                            data-id="2"
                        >

                            <div class="conteiner-pedido1">
                                <div class="nome-pedido">Pedido 02</div>
                                <div class="numero-pedido">#002</div>
                            </div>

                            <div class="conteiner-pedido2">
                                <div class="nome-cliente">Cliente 02</div>
                                <div class="itens-pedido">Item 02</div>
                            </div>

                        </div>

                        <div
                            className={`pedidos ${selectedPedido === 3 ? 'active' : ''}`}
                            onClick={() => showDetails(3)}
                            data-id="3"
                        >

                            <div class="conteiner-pedido1">
                                <div class="nome-pedido">Pedido 03</div>
                                <div class="numero-pedido">#003</div>
                            </div>

                            <div class="conteiner-pedido2">
                                <div class="nome-cliente">Cliente 03</div>
                                <div class="itens-pedido">Item 03</div>
                            </div>

                        </div>

                        <div
                            className={`pedidos ${selectedPedido === 4 ? 'active' : ''}`}
                            onClick={() => showDetails(4)}
                            data-id="4"
                        >

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

                        <div className="details">
                            {selectedPedido ? (
                                <>
                                    <h2>Detalhes do Pedido {selectedPedido}</h2>
                                    <p>
                                        <strong>Cliente:</strong> Cliente {selectedPedido}
                                    </p>
                                    <p>
                                        <strong>Data de Criação:</strong> {getCurrentDate()}
                                    </p>
                                </>
                            ) : (
                                <p>Selecione um pedido para ver os detalhes.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div >
        </>
    );
}

export default Pedido;