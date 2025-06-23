
import { Container } from "react-bootstrap";
import './home.css'
import Header from "../../Components/Header/Index";
import Copyright from "../../Components/Footer";


export default function Home() {

  return (
    <>
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h2>O sabor da eficiência começa aqui: controle seus pedidos com facilidade.</h2>
          <p>SaborTech conectando sabores à tecnologia.</p>
        </div>
      </section>
      <Copyright />
    </>
  );
};







