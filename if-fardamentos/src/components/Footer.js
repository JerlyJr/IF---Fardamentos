import styles from "./Footer.module.css"

// hooks
import { useAuthValue } from "../pages/context/AuthContext";


const Footer = () => {
  const { user } = useAuthValue();
  return (
    <div>
      <footer className={styles.footer}>
        {user ? <h3>Bem-vindo ao sistema da loja IF Fardamentos, {user.displayName}!</h3> : <h3>Bem-vindo ao sistema da loja IF Fardamentos!</h3>}
        
        <p>IF Fardamentos &copy; {(new Date().getFullYear())}</p>
      </footer>
    </div>
  )
}

export default Footer