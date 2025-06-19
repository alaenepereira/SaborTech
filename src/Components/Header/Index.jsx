import React, { useState } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

export default function Header() {

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(expanded ? false : "expanded");
  };

  const onHandleMenuAction = () => {

    setExpanded(false);
  };
  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="navbar-custom" expanded={expanded}>
      <Container fluid className="header">
        <Navbar.Brand as={Link} to="/" onClick={onHandleMenuAction}>SaborTech </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={onHandleMenuAction}>Início</Nav.Link>
            <Nav.Link as={Link} to="/sobre" onClick={onHandleMenuAction}>Sobre Nós</Nav.Link>
            <Nav.Link as={Link} to="/menu" onClick={onHandleMenuAction}>Menu</Nav.Link>
            <Nav.Link as={Link} to="/pedidos" onClick={onHandleMenuAction}>Pedidos</Nav.Link>
            <Nav.Link as={Link} to="/historia" onClick={onHandleMenuAction}>História</Nav.Link>
            <Nav.Link as={Link} to="/contato" onClick={onHandleMenuAction}>Contato</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
