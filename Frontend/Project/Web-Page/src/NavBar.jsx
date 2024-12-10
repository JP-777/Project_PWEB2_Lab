import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#">
            <img src='./logo.svg'/>
        </a>
      </div>
      <ul className="navbar-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Sobre Nosotros</a></li>
        <li><a href="#">Servicios</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
      <div className="navbar-auth">
        <button className="login-button">Iniciar Sesión</button>
        <button className="signup-button">Registrarse</button>
      </div>
    </nav>
  );
}

export default NavBar;
