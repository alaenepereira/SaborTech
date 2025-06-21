import React from 'react'
import './App.css'
import './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import Menu from './pages/Menu/Options';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardápio" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );




}

export default App
