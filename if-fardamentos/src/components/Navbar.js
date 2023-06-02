import { Link } from "react-router-dom"
import { useAuthentication } from "../hooks/useAuthentication";
import "./Navbar.css"

const Navbar = () => {
  const { auth, logout } = useAuthentication();

  const handleLogout = () => {
    logout();
  };

  console.log(auth.currentUser);

  return (
    <div>
      {!auth.currentUser && (
        <>
          <Link to="/" className="link">Entrar</Link>
          <Link to="/cadastro" className="link">Cadastro</Link>
        </>
      )}
      {auth.currentUser && (
        <>
          <Link to="/pedidos" className="link">Pedidos</Link>
          <Link to="/" onClick={handleLogout} className="link">Sair</Link>
        </>
      )}
    </div>
  )
}

export default Navbar