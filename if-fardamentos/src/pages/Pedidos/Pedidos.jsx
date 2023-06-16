import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import camisas from '../../assets/camisas.png';
import addPedido from '../../assets/addPedido.png';

const Pedidos = () => {
  // Variáveis de estado
  const [pedidos, setPedidos] = useState([]); // Armazena a lista de pedidos
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null); // Armazena o pedido selecionado
  const [searchValue, setSearchValue] = useState(''); // Armazena o valor de busca

  // Busca os pedidos no banco de dados
  const fetchPedidos = async () => {
    try {
      // Obtém todos os documentos da coleção 'pedidos'
      const snapshot = await getDocs(collection(db, 'pedidos'));
      const pedidosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filtra os pedidos com base no valor de busca
      const filteredPedidos = pedidosData.filter(pedido =>
        pedido.cliente.toLowerCase().startsWith(searchValue.toLowerCase())
      );

      // Ordena os pedidos pelo índice
      const sortedPedidos = filteredPedidos.sort((a, b) => a.index - b.index);

      setPedidos(sortedPedidos);
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error);
    }
  };

  useEffect(() => {
    // Busca os pedidos quando o componente é montado ou quando o valor de busca é alterado
    fetchPedidos();
  }, [searchValue]);

  const handlePedidoClick = pedido => {
    // Define o pedido selecionado quando um pedido é clicado
    setPedidoSelecionado(pedido);
  };

  const handleFecharPedido = () => {
    // Fecha o pedido selecionado
    setPedidoSelecionado(null);
  };

  const handleDeletePedido = async () => {
    try {
      // Deleta o pedido selecionado do banco de dados
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
            <Link to="/criar-pedido">
              <div className="addPedido"><img src={addPedido} alt="" width="100px" height="100px" /></div>
            </Link>
            <div className="lista-pedidos" style={{ overflow: 'auto' }}>
              {pedidos.map((pedido, index) => (
                <div
                  key={pedido.id}
                  className={`pedidos ${pedido === pedidoSelecionado ? 'selecionado' : ''}`}
                  onClick={() => handlePedidoClick(pedido)}
                >
                  <div className="conteiner-pedido1">
                    <div className="nome-pedido">Pedido</div>
                    <div className="numero-pedido">#{pedido.index}</div>
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
                <div className="botoes">
                  <button onClick={handleDeletePedido}>Deletar Pedido</button>
                  <button onClick={handleFecharPedido}>Fechar Pedido</button>
                </div>
              </>
            )}
            {!pedidoSelecionado && (
              <>
                <img src={camisas} alt="" width="50%" height="50%" />
                <b>Bem vindo(a) ao sistema de de gerenciamento de pedidos!</b>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pedidos;
