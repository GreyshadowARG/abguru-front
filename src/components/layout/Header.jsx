import React from 'react'
import {Link} from 'react-router-dom'


export default function Header() {
  return (
    <header>
        <h2>EM Rewards System</h2>
        <nav>
          <ul className="navbar">
              <li className="navbar-button"><Link to="/cargarVenta">Cargar ventas</Link></li>
              <li className="navbar-button"><Link to="/historialVentas">Historial ventas</Link></li>
              <li className="navbar-button"><Link to="/premios">Premios</Link></li>
              <li className="navbar-button"><Link to="/tablaPuntos">Tabla puntos</Link></li>
          </ul>
        </nav>
    </header>
  )
}