import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import camisas from '../../assets/camisas.png';
import addPedido from '../../assets/addPedido.png';

const Pedidos = () => {
  // Variáveis de estado
  const [pedidos, setPedidos] = useState([]); // Armazena a lista de pedidos
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null); // Armazena o pedido selecionado
  const [searchValue, setSearchValue] = useState(''); // Armazena o valor de busca
  const [editMode, setEditMode] = useState(false); // Armazena o estado de edição
  const [editFields, setEditFields] = useState({}); // Armazena os campos de edição

  // Busca os pedidos no banco de dados
  const fetchPedidos = async () => {
    try {
      // Obtém todos os documentos da coleção 'pedidos'
      const snapshot = await getDocs(collection(db, 'pedidos'));
      const pedidosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Filtra os pedidos com base no valor de busca
      const filteredPedidos = pedidosData.filter((pedido) =>
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

  const handlePedidoClick = (pedido) => {
    // Define o pedido selecionado quando um pedido é clicado
    setPedidoSelecionado(pedido);
    setEditMode(false); // Desativa o modo de edição
    setEditFields({ ...pedido }); // Pré-definir os campos de edição com os dados do pedido selecionado
  };

  const handleFecharPedido = () => {
    // Fecha o pedido selecionado
    setPedidoSelecionado(null);
    setEditMode(false); // Desativa o modo de edição
    setEditFields({}); // Limpa os campos de edição
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

  const handleEditFieldsChange = (e) => {
    // Atualiza os campos de edição com os novos valores
    setEditFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditPedido = async () => {
    try {
      // Atualiza o pedido selecionado no banco de dados
      await updateDoc(doc(db, 'pedidos', pedidoSelecionado.id), editFields);
      setEditMode(false); // Desativa o modo de edição
      fetchPedidos();
    } catch (error) {
      console.error('Erro ao editar o pedido:', error);
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
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Link to="/criar-pedido">
              <div className="addPedido">
                <img src={addPedido} alt="" width="100px" height="100px" />
              </div>
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
            {pedidoSelecionado ? (
              <>
                {!editMode ? (
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
                      <button onClick={() => setEditMode(true)}>Editar Pedido</button>
                    </div>
                  </>
                ) : (
                  <>
                    <table className="edit-table">
                      <tbody>
                        <tr>
                          <td>
                            <label htmlFor="cliente">Cliente:</label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="cliente"
                              value={editFields.cliente || ''}
                              onChange={handleEditFieldsChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="data">Data:</label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="data"
                              value={editFields.data || ''}
                              onChange={handleEditFieldsChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="descricao">Descrição:</label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="descricao"
                              value={editFields.descricao || ''}
                              onChange={handleEditFieldsChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="item">Item:</label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="item"
                              value={editFields.item || ''}
                              onChange={handleEditFieldsChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="preco">Preço:</label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="preco"
                              value={editFields.preco || ''}
                              onChange={handleEditFieldsChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="quantidade">Quantidade:</label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="quantidade"
                              value={editFields.quantidade || ''}
                              onChange={handleEditFieldsChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="telefone">Telefone:</label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="telefone"
                              value={editFields.telefone || ''}
                              onChange={handleEditFieldsChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="valorUnitario">Valor Unitário:</label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="valorUnitario"
                              value={editFields.valorUnitario || ''}
                              onChange={handleEditFieldsChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="botoes">
                      <button onClick={handleEditPedido}>Salvar Edições</button>
                      <button onClick={() => setEditMode(false)}>Cancelar</button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <img src={camisas} alt="" width="50%" height="50%" />
                <b>Bem-vindo(a) ao sistema de gerenciamento de pedidos!</b>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pedidos;
