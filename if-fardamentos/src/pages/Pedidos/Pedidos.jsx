import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import styles from './Pedidos.module.css';
import ImgPedidos from '../../assets/pedido.png';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Função para buscar os pedidos no Firestore
    const fetchPedidos = async () => {
      try {
        const pedidosRef = db.collection('pedidos');
        const snapshot = await pedidosRef.get();

        const pedidosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPedidos(pedidosData);
      } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <>
      <div className="background-image"></div>
      <div className="fundo">
        <div className="tela">
          <div className="conteiner-esquerdo">
            <input type="text" placeholder="Pesquisar" />
          </div>
          <div className="conteiner-direito">
            <img src={ImgPedidos} alt="" width="100px" height="100px" />
            <Link to="/criar-pedido">
              <button name="Adicionar_pedido" id="Adicionar_pedido">
                Adicionar novo pedido
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.listaPedidos}>
          {pedidos.map(pedido => (
            <div key={pedido.id} className={styles.pedidoItem}>
              <div className={styles.numeroPedido}>{`#${pedido.id}`}</div>
              <div className={styles.detalhesPedido}>
                <div className={styles.nomeCliente}>{pedido.cliente}</div>
                <div className={styles.infoPedido}>
                  <div>{`Item: ${pedido.item}`}</div>
                  <div>{`Preço: R$ ${pedido.preco}`}</div>
                  <div>{`Data: ${pedido.data}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
