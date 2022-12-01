import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar_nav">
      <Link className="navbar_button" aria-current="page" to="/">
          Home
        </Link>
        <Link className="navbar_button" aria-current="page" to="/user/Prizes">
          Premios disponibles
        </Link>
        <Link className="navbar_button" aria-current="page" to="/user/NewSale">
          Cargar Reserva
        </Link>
        <Link className="navbar_button" to="/user/LoadedSales">
          Reservas cargadas
        </Link>
        <Link className="navbar_button" to="/user/RedeemPoints">
          Redimir Recompensas
        </Link>
      </div>
      <button className="navbar_button_logout" onClick={logout}>
        Salir
      </button>
    </nav>
  );
};
export default Navbar;
