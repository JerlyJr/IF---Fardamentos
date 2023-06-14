import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import './Pedidos.module.css';
import ImgPedidos from '../../assets/pedido.png';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'pedidos'));
        const pedidosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPedidos(pedidosData);
      } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

// aqui eu criei uma função para quando clicar no pedido ele aparecer no lado direito da tela
  const handlePedidoClick = pedido => {
    setPedidoSelecionado(pedido);
  };

  // aqui eu criei uma função para quando clicar no botão fechar pedido ele fechar o pedido
  const handleFecharPedido = () => {
    setPedidoSelecionado(null);
  };

  return (
    <>
      <div className="background-image"></div>
      <div className="fundo">
        <div className="tela">
          <div className="conteiner-esquerdo">
            <input type="text" placeholder="Pesquisar" />
            <div className="lista-pedidos" style={{ overflow: 'auto' }}>
              {/* aqui eu  criei um map para listar os pedidos */}
              {pedidos.map(pedido => (
                <div
                  key={pedido.id}
                  className={`pedidos ${pedido === pedidoSelecionado ? 'selecionado' : ''}`}
                  onClick={() => handlePedidoClick(pedido)}
                > 
                  <div className="conteiner-pedido1">
                    <div className="nome-pedido">Pedido</div>
                    <div className="numero-pedido">#00</div>
                  </div>
                  <div className="conteiner-pedido2">
                    <div className="nome-cliente">
                      <b>Cliente:</b> {pedido.cliente}
                    </div>
                    <div className="itens-pedido">
                      <b>Itens:</b> {pedido.item}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="conteiner-direito">
            {/** aqui eu criei um if para quando clicar no pedido ele aparecer no lado direito da tela */}
            {pedidoSelecionado && (
              <div class='detalhes'>
                <div>
                  <b>Cliente:</b> {pedidoSelecionado.cliente}
                </div>
                <div>
                  <b>Data:</b> {pedidoSelecionado.data}
                </div>
                <div>
                  <b>Descrição:</b> {pedidoSelecionado.descricao}
                </div>
                <div>
                  <b>Item:</b> {pedidoSelecionado.item}
                </div>
                <div>
                  <b>Preço:</b> {pedidoSelecionado.preco}
                </div>
                <div>
                  <b>Quantidade:</b> {pedidoSelecionado.quantidade}
                </div>
                <div>
                  <b>Telefone:</b> {pedidoSelecionado.telefone}
                </div>
                <div>
                  <b>Valor Unitário:</b> {pedidoSelecionado.valorUnitario}
                </div>
                <button onClick={handleFecharPedido}>Fechar Pedido</button>
              </div>
            )}
            {!pedidoSelecionado && (
              <>
                <img src={ImgPedidos} alt="" width="100px" height="100px" />
                <Link to="/criar-pedido">
                  <button name="Adicionar_pedido" id="Adicionar_pedido">
                    Adicionar novo pedido
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pedidos;
