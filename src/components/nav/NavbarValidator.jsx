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
        <Link className="navbar_button" aria-current="page" to="/validator">
          Home
        </Link>
        <Link className="navbar_button" aria-current="page" to="/validator/ValidateSale">
          Validate Reservations
        </Link>
        <Link className="navbar_button" aria-current="page" to="/validator/ValidateReward">
          Validate Rewards
        </Link>
        <Link className="navbar_button" to="/validator/ValidationHistory">
          Validation history
        </Link>
      </div>
      <button className="navbar_button_logout" onClick={logout}>
        Log out
      </button>
    </nav>
  );
};
export default Navbar;
