import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Login from './pages/Login';
import Pedidos from './pages/Pedidos';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/pedidos" element={<Pedidos />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route></Route>    
        </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
