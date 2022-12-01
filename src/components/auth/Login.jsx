import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import axios from "../../api/axios.js";
import HotelsBanner from "../layout/HotelsBanner";
import Footer from "../layout/Footer";

// imagenes
import abGuruLogo from "../../assets/images/abguru_logo.png";

const LOGIN_URL = "https://aybgurusrewards.com/api/auth/login";
const FORGOT_PASS = "https://aybgurusrewards.com/api/auth/forgotPassword";

export default function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoverPass, setRecoverPass] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      const redirectByRoles = () => {
        //user
        if (roles[0] === 2001) {
          navigate("/");
        }
        //validatorElite
        else if (roles[0] === 1984) {
          navigate("/validator");
        }
        //validatorElite
        else if (roles[0] === 5150) {
          navigate("/linkpage");
        }
      };

      setAuth({ email, password, roles, accessToken });
      setEmail("");
      setPassword("");
      redirectByRoles();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No se puede conectar con el servidor");
      } else if (err.response.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response.status === 401) {
        setErrMsg("Email o contraseña no válido.");
      } else {
        setErrMsg("No se puede conectar con el servidor");
      }
      errRef.current.focus();
    }
  };

  const handleSubmitRecover = async (e) => {
    e.preventDefault();
    try {
      await axios.post(FORGOT_PASS, JSON.stringify({ email }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main_container">
      <div className="landing_container">
        <div className="landing_container__header">
          <img src={abGuruLogo} alt="" />
          <h1>Transfórmate en un Gurú de experiencias</h1>
          <p id="text-bold">
            Sé parte del nuevo programa de recompensas de Antigua y Barbuda para
            agentes de Latinoamérica y obtén beneficios exclusivos.
          </p>
        </div>

        <section className="authentication_section">
          <>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h2>¿Ya eres parte?</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button className="ingresar_button">Ingresar</button>
            </form>
            <button
              id="recover-password_button"
              onClick={() => setRecoverPass(true)}
            >
              ¿Olvidaste tu contraseña?
            </button>
            <hr />
            <div className="authentication_section_reg">
              <p>¿No tienes cuenta?</p>
              <Link className="register_button" to="/register">
                Registrate
              </Link>
            </div>
          </>
        </section>
      </div>
      <HotelsBanner />
      <Footer />
    </div>
  );
}
