import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import camisas from '../../assets/camisas.png';
import addPedido from '../../assets/addPedido.png';
import fecharPedido from '../../assets/fecharPedido.png';
import excluirPedido from '../../assets/excluirPedido.png';
import logoHorizontal from '../../assets/logo_horizontal.png'
import editarPedido from '../../assets/editar.png'
import busca from '../../assets/busca.png'

const Pedidos = () => {
  // Variáveis de estado
  const [pedidos, setPedidos] = useState([]); // Armazena a lista de pedidos
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null); // Armazena o pedido selecionado
  const [searchValue, setSearchValue] = useState(''); // Armazena o valor de busca
  const [editMode, setEditMode] = useState(false); // Armazena o estado de edição
  const [editFields, setEditFields] = useState({}); // Armazena os campos de edição
  const [corDoEstado, setCorDoEstado] = useState('#000000');

  // Busca os pedidos no banco de dados
  const fetchPedidos = async () => {
    try {
      // Obtém todos os documentos da coleção 'pedidos'
      const snapshot = await getDocs(collection(db, 'pedidos'));
      const pedidosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Filtra os pedidos com base no valor de busca e estado
      const filteredPedidos = pedidosData.filter((pedido) => {
        const clienteLowerCase = pedido.cliente.toLowerCase();
        const itemLowerCase = pedido.item.toLowerCase();
        const estadoLowerCase = pedido.estado.toLowerCase();
        const searchValueLowerCase = searchValue.toLowerCase();

        return (
          clienteLowerCase.startsWith(searchValueLowerCase) ||
          itemLowerCase.startsWith(searchValueLowerCase) ||
          estadoLowerCase.startsWith(searchValueLowerCase)
        );
      });

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
    setPedidoSelecionado(pedido);
    setEditMode(false); // Desativa o modo de edição

    // Preenche os campos de edição com os valores do pedido selecionado
    setEditFields({
      cliente: pedido.cliente,
      data: pedido.data,
      descricao: pedido.descricao,
      item: pedido.item,
      preco: pedido.preco,
      quantidade: pedido.quantidade,
      telefone: pedido.telefone,
      valorUnitario: Number(pedido.valorUnitario),
      estado: pedido.estado
    });

    // Define a cor de fundo com base no estado do pedido
    if (pedido.estado === 'Concluído') {
      setCorDoEstado('#09D943');
    } else if (pedido.estado === 'Em aberto') {
      setCorDoEstado('#ffff00');
    } else {
      setCorDoEstado('#DF0006');
    }
  };

  const handleFecharPedido = () => {
    // Fecha o pedido selecionado
    setPedidoSelecionado(null);
    setEditMode(false); // Desativa o modo de edição
    setEditFields({}); // Limpa os campos de edição
    setCorDoEstado('#000000');
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

  const calculatePrice = () => {
    const { quantidade, valorUnitario } = editFields;
    const preco = quantidade * valorUnitario;
    setEditFields((prevFields) => ({
      ...prevFields,
      preco
    }));
  };

  const handleEditFieldsChange = (e) => {
    const { name, value } = e.target;

    setEditFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));

    if (name === 'quantidade' || name === 'valorUnitario') {
      calculatePrice();
    }

    if (name === 'estado') {
      if (value === 'Concluído') {
        setCorDoEstado('#09D943');
      } else if (value === 'Em aberto') {
        setCorDoEstado('#ffff00');
      } else {
        setCorDoEstado('#DF0006');
      }
    }
  };

  const handleEditPedido = async () => {
    try {
      editFields.preco = editFields.valorUnitario * editFields.quantidade;

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
          <div className="topo">
            <img src={logoHorizontal} />
          </div>
          <div className="conteiners">
            {/* <img src={logoHorizontal} alt="" /> */}
            <div className="conteiner-esquerdo">
              <input
                type="text"
                placeholder="🔎 Pesquisar"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Link to="/criar-pedido">
                <div className="addPedido">
                  <img src={addPedido} alt="addPedido" />
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
                      <div className="conteiner-detalhes">
                        <div className="botao-fechar">
                          <img
                            src={fecharPedido}
                            alt=""
                            width={20}
                            height={20}
                            onClick={handleFecharPedido}
                          />
                        </div>
                        <div className="detalhes">
                          <div className="linha">
                            <div className="detalhe-pedido">
                              <b>Pedido: </b>
                            </div>
                            <div className="detalhe-index">
                              <b>#{pedidoSelecionado.index}</b>
                            </div>
                          </div>
                          <div className="linha">
                            <div className="detalhe-status">
                              <b>Status: </b>
                            </div>
                            <div
                              className="detalhe-barra-status"
                              style={{ backgroundColor: corDoEstado, color: corDoEstado === '#ffff00' ? '#000000' : '#ffffff' }}
                            >
                              {pedidoSelecionado.estado}
                            </div>
                          </div>
                          <div className="linha">
                            <div className="detalhe-cliente">
                              <b>Cliente:</b> {pedidoSelecionado.cliente}
                            </div>
                            <div className="detalhe-data">
                              <b>Data:</b> {pedidoSelecionado.data}
                            </div>
                          </div>
                          <div className="linha">
                            <div>
                              <b>Telefone:</b> {pedidoSelecionado.telefone}
                            </div>
                          </div>
                          <div className="bloco-pedido">
                            <div className="linha-item">
                              <div className="detalhe-titulo">Item: </div>
                              <div className="detalhe-conteudo">
                                {pedidoSelecionado.item}
                              </div>
                            </div>
                            <div className="linha-descricao">
                              <div className="detalhe-titulo">Descrição: </div>
                              <div className="detalhe-conteudo-descricao">
                                {pedidoSelecionado.descricao}
                              </div>
                            </div>
                            <div className="linha-quantidade">
                              <div className="detalhe-titulo">Quantidade: </div>
                              <div className="detalhe-conteudo">
                                {pedidoSelecionado.quantidade}
                              </div>
                            </div>
                            <div className="linha-valor">
                              <div className="detalhe-titulo">Valor Unitário: </div>
                              <div className="detalhe-conteudo">
                                R$ {pedidoSelecionado.valorUnitario.toFixed(2)}
                              </div>
                            </div>
                            <div className="linha-preco">
                              <div className="detalhe-titulo">Preço: </div>
                              <div
                                className="detalhe-conteudo"
                                style={{ color: 'red' }}
                              >
                                R$ {pedidoSelecionado.preco.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="botoes">
                          <button
                            onClick={() => setEditMode(true)}
                            className="botao-editar"
                          >
                            <img src={editarPedido} height="12.5px" width="12.5px" />
                            Editar pedido
                          </button>
                        </div>
                      </div>
                      <div className="bloco-deletar">
                        <div className="botao-deletar" onClick={handleDeletePedido}>
                          <img src={excluirPedido} width={10} height={13} alt="Apagar pedido" />
                          Deletar Pedido
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="botao-fechar2">
                        <img
                          src={fecharPedido}
                          alt=""
                          width={20}
                          height={20}
                          onClick={() => setEditMode(false)}
                        />
                      </div>
                      <table className="edit-table">
                        <tbody>
                          <tr style={{ width: '100%' }}>
                            <td>
                              <label htmlFor="estado">Estado:</label>
                            </td>
                            <td style={{ display: 'flex', flexDirection: 'row' }}>
                              <select
                                name="estado"
                                value={editFields.estado || ''}
                                onChange={handleEditFieldsChange}
                                style={{ outline: 'none' }}
                              >
                                <option value="Cancelado">Cancelado</option>
                                <option value="Em aberto">Em aberto</option>
                                <option value="Concluído">Concluído</option>
                              </select>
                            </td>
                          </tr>
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
                              <label htmlFor="data">Data:</label>
                            </td>
                            <td>
                              <input
                                type="date"
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
                              <label htmlFor="quantidade">Quantidade:</label>
                            </td>
                            <td>
                              <input
                                type="number"
                                name="quantidade"
                                value={editFields.quantidade || ''}
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
                                type="number"
                                name="valorUnitario"
                                value={editFields.valorUnitario || ''}
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
                                type="number"
                                name="preco"
                                value={editFields.preco || ''}
                                onChange={handleEditFieldsChange}
                                disabled
                                className='preco'
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="botoes">
                        <button onClick={handleEditPedido} className='botao_salvar'>Salvar Edições</button>
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
      </div>
    </>
  );
};

export default Pedidos;
