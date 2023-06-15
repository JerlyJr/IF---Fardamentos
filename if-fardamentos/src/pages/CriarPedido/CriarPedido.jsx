import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './CriarPedido.module.css';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

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
  const [pedidosCount, setPedidosCount] = useState(0); // Adicionado estado para controlar o índice

  useEffect(() => {
    const fetchPedidosCount = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'pedidos'));
        setPedidosCount(snapshot.docs.length);
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

    // Criar um objeto com os dados do pedido
    const pedido = {
      cliente,
      telefone,
      data,
      item,
      descricao,
      quantidade,
      valorUnitario,
      preco,
      index: pedidosCount + 1, // Adicionar o índice ao pedido
    };

    try {
      // Enviar o pedido para o Firebase
      const docRef = await addDoc(collection(db, 'pedidos'), pedido);
      console.log('Pedido cadastrado com ID: ', docRef.id);

      // Ativar o redirecionamento para a página de pedidos
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
            <form onSubmit={handleSubmit}>
              <span>Cliente:</span>
              <input
                type="text"
                name="cliente"
                id="cliente"
                placeholder="Cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
              <span>Telefone:</span>
              <input
                type="text"
                name="telefone"
                id="telefone"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />

              <span>Data de entrega:</span>
              <input
                type="date"
                name="date"
                id="date"
                placeholder="Data"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <span>Item:</span>
              <input
                type="text"
                name="item"
                id="item"
                placeholder="Item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />

              <span>Descrição:</span>
              <input
                type="textbox"
                name="descricao"
                id="descricao"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />

              <span>Quantidade:</span>
              <input
                type="number"
                name="numero"
                id="numero"
                placeholder="Quantidade"
                value={quantidade}
                onChange={handleQuantidadeChange}
              />

              <span>Valor unitário:</span>
              <input
                type="number"
                name="valorUnitario"
                id="valorUnitario"
                placeholder="Valor unitário"
                value={valorUnitario}
                onChange={handleValorUnitarioChange}
              />
              <p>O preço será {preco}.</p>
              <div className={styles.buttonContainer}>
                <button type="button">
                  <Link to="/pedidos">Cancelar</Link>
                </button>
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriarPedido;
