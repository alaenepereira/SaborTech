import React, { useState } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import BackButton from '../Utils/BackButton';



export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (

    <Navbar expand="lg" data-bs-theme="dark" sticky="top" className="navbar-custom">
      <BackButton />
      <Container fluid className="header ">

        <Navbar.Brand as={Link} to="/">SaborTech</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" in={menuOpen}>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/cardapio">Menu</Nav.Link>
            <Nav.Link as={Link} to="/add">Adicionar ao cardápio</Nav.Link>
            <Nav.Link as={Link} to="/estoque">Controle de estoque</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <button className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </Container>
    </Navbar>
  );
}