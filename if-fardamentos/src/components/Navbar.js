import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
        <Link to="/" className="link">Entrar</Link>
        <Link to="/cadastro" className="link">Cadastro</Link>
        <Link to="/pedidos" className="link">Pedidos</Link>
    </div>
  )
}

export default Navbar