import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu/Options';
import CadastrarProduto from './pages/Menu/CadastrarProduto';
import EditarProduto from "./pages/Menu/EditarProduto";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Menu />} /> {/* Options.jsx */}
        <Route path="/add" element={<CadastrarProduto />} />
        <Route path="/editar/:id" element={<EditarProduto />} />
        {/* outras rotas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
