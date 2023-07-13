import React, { useState } from 'react';
import '../css/teste.css'

function Teste() {
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
    <div className="container">
      <div className="pedidos">
        <div
          className={`pedido ${selectedPedido === 1 ? 'active' : ''}`}
          onClick={() => showDetails(1)}
          data-id="1"
        >
          <div className="card">
            <h4>Pedido 1</h4>
            <h3>Cliente 1</h3>
            <p>ID do Pedido: 1</p>
            <p>Itens do Pedido: Item A, Item B, Item C</p>
            <p>Data: {getCurrentDate()}</p>
          </div>
        </div>
        <div
          className={`pedido ${selectedPedido === 2 ? 'active' : ''}`}
          onClick={() => showDetails(2)}
          data-id="2"
        >
          <div className="card">
            <h4>Pedido 2</h4>
            <h3>Cliente 2</h3>
            <p>ID do Pedido: 2</p>
            <p>Itens do Pedido: Item D, Item E, Item F</p>
            <p>Data: {getCurrentDate()}</p>
          </div>
        </div>
        <div
          className={`pedido ${selectedPedido === 3 ? 'active' : ''}`}
          onClick={() => showDetails(3)}
          data-id="3"
        >
          <div className="card">
            <h4>Pedido 3</h4>
            <h3>Cliente 3</h3>
            <p>ID do Pedido: 3</p>
            <p>Itens do Pedido: Item G, Item H, Item I</p>
            <p>Data: {getCurrentDate()}</p>
          </div>
        </div>
        <div
          className={`pedido ${selectedPedido === 4 ? 'active' : ''}`}
          onClick={() => showDetails(4)}
          data-id="4"
        >
          <div className="card">
            <h4>Pedido 4</h4>
            <h3>Cliente 4</h3>
            <p>ID do Pedido: 4</p>
            <p>Itens do Pedido: Item J, Item K, Item L</p>
            <p>Data: {getCurrentDate()}</p>
          </div>
        </div>
      </div>
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
  );
}

export default Teste;
