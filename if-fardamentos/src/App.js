import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer'

// Pages
import Login from './pages/Login/Login';
import Pedidos from './pages/Pedidos/Pedidos';
import Pedido from './pages/Pedido/Pedido';
import NotFound from './pages/NotFound/NotFound';
import Cadastro from './pages/Cadastro/Cadastro';

// Context
import { AuthProvider } from './pages/context/AuthContext';

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
              <Route path="/pedido" element={<Pedido />}></Route>
              <Route path="*" element={<NotFound />}></Route>
              <Route></Route>    
            </Routes>
      <Footer />        
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;