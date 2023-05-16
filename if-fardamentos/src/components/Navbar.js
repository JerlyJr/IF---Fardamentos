import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
        <Link to="/" className="link">Home</Link>
        <Link to="/pedidos" className="link">Pedidos</Link>
    </div>
  )
}

export default Navbar