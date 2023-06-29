import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"

// Components
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Login/Login';
import Pedidos from './pages/Pedidos/Pedidos';
import NotFound from './pages/NotFound/NotFound';
import Cadastro from './pages/Cadastro/Cadastro';
import CriarPedido from './pages/CriarPedido/CriarPedido'
// Context
import { AuthProvider } from './context/AuthContext';

// Hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/" element={!user ? <Login /> : <Navigate to = "/pedidos"/>} />
              <Route path="/cadastro" element={!user ? <Cadastro /> : <Navigate to = "/pedidos"/>} />
              <Route path="/pedidos" element={user ? <Pedidos /> : <Navigate to = "/"/>} />
              <Route path="/criar-pedido" element={<CriarPedido />}></Route>
              <Route path="*" element={<NotFound />}></Route>
              <Route></Route>    
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;