import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import styles from './Pedidos.module.css';
import ImgPedidos from '../../assets/pedido.png';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const fetchPedidos = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'pedidos'));
      const pedidosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const filteredPedidos = pedidosData.filter(pedido =>
        pedido.cliente.toLowerCase().startsWith(searchValue.toLowerCase())
      );

      setPedidos(filteredPedidos);
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, [searchValue]);

  const handlePedidoClick = pedido => {
    setPedidoSelecionado(pedido);
  };

  const handleFecharPedido = () => {
    setPedidoSelecionado(null);
  };

  const handleDeletePedido = async () => {
    try {
      await deleteDoc(doc(db, 'pedidos', pedidoSelecionado.id));
      setPedidoSelecionado(null);
      fetchPedidos();
    } catch (error) {
      console.error('Erro ao deletar o pedido:', error);
    }
  };

  return (
    <>
      <div className="background-image"></div>
      <div className="fundo">
        <div className="tela">
          <div className="conteiner-esquerdo">
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <div className="lista-pedidos" style={{ overflow: 'auto' }}>
              {pedidos.map((pedido, index) => (
                <div
                  key={pedido.id}
                  className={`pedidos ${pedido === pedidoSelecionado ? 'selecionado' : ''}`}
                  onClick={() => handlePedidoClick(pedido)}
                >
                  <div className="conteiner-pedido1">
                    <div className="nome-pedido">Pedido</div>
                    <div className="numero-pedido">#{index + 1}</div>
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
            {pedidoSelecionado && (
              <>
              <div className="detalhes">
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
              </div>
              <div className={styles.botoes}>
                <button onClick={handleDeletePedido}>Deletar Pedido</button>
                <button onClick={handleFecharPedido}>Fechar Pedido</button>
              </div>
              </>
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