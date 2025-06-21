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
            <Nav.Link as={Link} to="/" onClick={onHandleMenuAction}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/cardápio" onClick={onHandleMenuAction}>Menu</Nav.Link>
            <Nav.Link as={Link} to="/add" onClick={onHandleMenuAction}>Adicionar ao cardápio</Nav.Link>
            <Nav.Link as={Link} to="/estoque" onClick={onHandleMenuAction}>Controle de estoque</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
