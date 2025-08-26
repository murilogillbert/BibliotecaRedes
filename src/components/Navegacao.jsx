import { Link } from 'react-router-dom'
import './Navegacao.css'

function Navegacao() {
  return (
    <nav className="navegacao">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="logo-link">ICteca</Link>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Início</Link>
          </li>
          <li className="nav-item">
            <Link to="/loginregister" className="nav-link">Login/Cadastro</Link>
          </li>
          <li className="nav-item">
            <Link to="/curator" className="nav-link">Curador</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navegacao