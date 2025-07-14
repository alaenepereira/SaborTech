import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu/Options';
import CadastrarProduto from './pages/Menu/CadastrarProduto';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditarProduto from './pages/Menu/EditarProduto';



function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/add" element={<CadastrarProduto />} />
        <Route path="/editar/:id" element={<EditarProduto />} />

      </Routes>
      <footer />
    </BrowserRouter>
  );
}

export default App;
