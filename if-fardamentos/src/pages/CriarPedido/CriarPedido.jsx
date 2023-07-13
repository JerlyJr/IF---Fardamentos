import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './CriarPedido.module.css';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import fecharPedido from '../../assets/fecharPedido.png'

const CriarPedido = () => {
  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [data, setData] = useState('');
  const [item, setItem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [valorUnitario, setValorUnitario] = useState(0);
  const [preco, setPreco] = useState(0);
  const [redirectToPedidos, setRedirectToPedidos] = useState(false);
  const [pedidosCount, setPedidosCount] = useState(0);

  useEffect(() => {
    const fetchPedidosCount = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'pedidos'));
        const pedidos = snapshot.docs.map((doc) => doc.data());

        if (pedidos.length > 0) {
          const maxIndex = Math.max(...pedidos.map((pedido) => pedido.index));
          setPedidosCount(maxIndex + 1);
        } else {
          setPedidosCount(1);
        }
      } catch (error) {
        console.error('Erro ao buscar a contagem de pedidos:', error);
      }
    };

    fetchPedidosCount();
  }, []);

  const handleValorUnitarioChange = (e) => {
    const value = parseFloat(e.target.value);
    setValorUnitario(value);

    const calculatedPrice = value * quantidade;
    setPreco(calculatedPrice);
  };

  const handleQuantidadeChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantidade(value);

    const calculatedPrice = valorUnitario * value;
    setPreco(calculatedPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pedido = {
      cliente,
      telefone,
      data,
      item,
      descricao,
      quantidade,
      valorUnitario,
      preco,
      index: pedidosCount,
      estado: "Em aberto"
    };

    try {
      const docRef = await addDoc(collection(db, 'pedidos'), pedido);
      console.log('Pedido cadastrado com ID: ', docRef.id);

      setPedidosCount((prevCount) => prevCount + 1);

      setRedirectToPedidos(true);
    } catch (error) {
      console.error('Erro ao cadastrar o pedido: ', error);
    }
  };

  if (redirectToPedidos) {
    return <Navigate to="/pedidos" />;
  }

  return (
    <>
      <div className="background-image"></div>
      <div className="fundo">
        <div className={styles.tela}>
          <div className={styles.conteiner_direito}>
            <div className={styles.botao_fechar3}>
              <Link to="/pedidos"><img src={fecharPedido} width="20px" height="20px" /></Link>
            </div>
            <form onSubmit={handleSubmit}>
              <table className={styles.table}>
                <tr>
                  <td><span>Cliente:</span></td>
                  <td>
                    <input
                      className=""
                      type="text"
                      name="cliente"
                      id="cliente"
                      placeholder="Cliente"
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Telefone:</span>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="telefone"
                      id="telefone"
                      placeholder="Telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Data:</span>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      placeholder="Data"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Item:</span>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="item"
                      id="item"
                      placeholder="Item"
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Descrição:</span>
                  </td>
                  <td>
                    <input
                      type="textbox"
                      name="descricao"
                      id="descricao"
                      placeholder="Descrição"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Quantidade:</span>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="numero"
                      id="numero"
                      placeholder="Quantidade"
                      value={quantidade}
                      onChange={handleQuantidadeChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Valor unitário:</span>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="valorUnitario"
                      id="valorUnitario"
                      placeholder="Valor unitário"
                      value={valorUnitario}
                      onChange={handleValorUnitarioChange}
                    />
                  </td>
                </tr>
              </table>
              <p>O preço será: <b>R$ {preco.toFixed(2)}</b></p>
              <div className={styles.buttonContainer}>
                <button type="submit" className='botao_salvar'>Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriarPedido;
