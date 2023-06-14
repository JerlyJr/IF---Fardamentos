import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import './Pedidos.module.css';
import ImgPedidos from '../../assets/pedido.png';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidosRef = collection(db, 'pedidos');
        const snapshot = await getDocs(pedidosRef);

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
          <div className="conteiner-esquerdo" >
            <input type="text" placeholder="Pesquisar" />
            <div className={"lista-pedidos"} style={{ overflow: 'auto' }}>
              {pedidos.map(pedido => (
                <div key={pedido.id} className={"pedidos"}>
                  <div className="conteiner-pedido1">
                    <div className="nome-pedido">Pedido</div>
                    <div className="numero-pedido">#00</div>
                  </div>
                  <div className="conteiner-pedido2">
                    <div className="nome-cliente"><b>Cliente: </b>{pedido.cliente}</div>
                    <div className="itens-pedido"><b>Itens: </b>{pedido.item}</div>
                  </div>
                </div>
              ))}
            </div>
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
      </div>
    </>
  );
};

export default Pedidos;
