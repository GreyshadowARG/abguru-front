import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios.js";
import { Link } from "react-router-dom";

// imagenes
import abGuruLogo from "../../assets/images/abguru_logo.png";

// Nombre y apellido
const NAME_REGEX = /^[a-zA-Z ,.'-]/;

// Usuario:
// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// Password:
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).(?=.*[!@#$%]).{8,24}$/;

// Documento identidad
const ID_REGEX = /[0-9]$/;

// Email:
const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

//const PHONENUM_REGEX = /^[\]?[(]?[0-9]{3}[)]?[-\s\]?[0-9]{3}[-\s\]?[0-9]{4,6}$/;

// URL
const REGISTER_URL = "https://aybgurusrewards.com/api/register/newUser";

export default function Register() {
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [identityNumber, setIdentityNumber] = useState("");
  const [validIdentityNumber, setValidIdentityNumber] = useState(false);
  const [identityNumberFocus, setIdentityNumberFocus] = useState(false);

  const [address, setAdress] = useState("");
  const [validAdress, setValidAdress] = useState(false);
  const [addressFocus, setAdressFocus] = useState(false);

  const [postalCode, setPostalCode] = useState("");
  const [validPostalCode, setValidPostalCode] = useState(false);
  const [postalCodeFocus, setPostalCodeFocus] = useState(false);

  const [country, setCountry] = useState("");
  const [validCountry, setValidCountry] = useState(false);
  const [countryFocus, setCountryFocus] = useState(false);

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  const [phoneNum, setPhoneNum] = useState("");
  const [validPhoneNum, setValidPhoneNum] = useState(false);
  const [phoneNumFocus, setPhoneNumFocus] = useState(false);

  const [reachBy, setReachBy] = useState("");

  const [pointsEarned, setPointsEarned] = useState("0");

  const [eliteNights, setEliteNights] = useState("0");

  const [AB_Prize, setAB_Prize] = useState([]);

  const [famTripChance, setFamTripChance] = useState("No");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // nombre valido?
  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]);

  // apellido valido?
  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);

  // email valido?
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // password valido - ambos pass coinciden?
  useEffect(() => {
    setValidPassword(PASS_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  // identityNumber valido?
  useEffect(() => {
    const result = ID_REGEX.test(identityNumber);
    setValidIdentityNumber(result);
  }, [identityNumber]);

  // adress valido?
  useEffect(() => {
    const result = NAME_REGEX.test(address);
    setValidAdress(result);
  }, [address]);

  // postalCode valido?
  useEffect(() => {
    const result = ID_REGEX.test(postalCode);
    setValidPostalCode(result);
  }, [postalCode]);

  // country valido?
  useEffect(() => {
    const result = NAME_REGEX.test(country);
    setValidCountry(result);
  }, [country]);

  // city valido?
  useEffect(() => {
    const result = NAME_REGEX.test(city);
    setValidCity(result);
  }, [city]);

  // phoneNum valido?
  useEffect(() => {
    const result = ID_REGEX.test(phoneNum);
    setValidPhoneNum(result);
  }, [phoneNum]);

  // mensaje de error
  useEffect(() => {
    setErrMsg("");
  }, [
    firstName,
    lastName,
    email,
    password,
    matchPassword,
    identityNumber,
    address,
    postalCode,
    country,
    city,
    phoneNum,
    reachBy,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(firstName);
    const v2 = NAME_REGEX.test(lastName);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PASS_REGEX.test(password);
    const v5 = ID_REGEX.test(identityNumber);
    const v6 = NAME_REGEX.test(address);
    const v7 = ID_REGEX.test(postalCode);
    const v8 = NAME_REGEX.test(country);
    const v9 = NAME_REGEX.test(city);
    const v10 = ID_REGEX.test(phoneNum);
    const v11 = reachBy;
    const v12 = pointsEarned;
    const v13 = eliteNights;
    const v14 = AB_Prize;
    const v15 = famTripChance;
    if (
      !v1 ||
      !v2 ||
      !v3 ||
      !v4 ||
      !v5 ||
      !v5 ||
      !v6 ||
      !v7 ||
      !v8 ||
      !v9 ||
      !v10 ||
      !v11 ||
      !v12 ||
      !v13 ||
      !v14 ||
      !v15
    ) {
      setErrMsg("Entrada no valida");
      return;
    }
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          identityNumber,
          address,
          postalCode,
          country,
          city,
          phoneNum,
          reachBy,
          pointsEarned,
          eliteNights,
          AB_Prize,
          famTripChance,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMatchPassword("");
      setIdentityNumber("");
      setAdress("");
      setPostalCode("");
      setCountry("");
      setCity("");
      setPhoneNum("");
      setReachBy("");
      setPointsEarned("0");
      setEliteNights("0");
      setAB_Prize("None");
      setFamTripChance("No");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="landing_container">
          <div className="logo_header">
            <img src={abGuruLogo} alt="" />
          </div>
          <section>
            <h2 id="color-pink">Registro exitoso!</h2>
            <p>
              <a href="/">Ingresar</a>
            </p>
          </section>
        </div>
      ) : (
        <div className="landing_container">
          <div className="logo_header">
            <img src={abGuruLogo} alt="" />
          </div>

          <section className="section_container">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstName">
                Nombre:
                <span className={validFirstName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validFirstName || !firstName ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="firstName"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  firstNameFocus && firstName && !validFirstName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="lastName">
                Apellido:
                <span className={validLastName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validLastName || !lastName ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="lastName"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  lastNameFocus && lastName && !validLastName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>
              <label htmlFor="email">
                Correo electrónico:
                <span className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras, números, guiones y guiones bajos.
              </p>

              <label htmlFor="password">
                Contraseña:
                <span className={validPassword ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validPassword || !password ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p
                id="passwordnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Debe incluir mayúsculas y minúsculas, un número y un caracter
                especial.
                <br />
                Caracteres especiales permitidos:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>

              <label htmlFor="confirm_password">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPassword ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="confirm_password"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Debe coincidir con la primer constraseña.
              </p>

              <label htmlFor="identityNumber">
                Documento de identidad:
                <span className={validIdentityNumber ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validIdentityNumber || !identityNumber ? "hide" : "invalid"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="identityNumber"
                autoComplete="off"
                onChange={(e) => setIdentityNumber(e.target.value)}
                required
                aria-invalid={validIdentityNumber ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setIdentityNumberFocus(true)}
                onBlur={() => setIdentityNumberFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  identityNumberFocus && identityNumber && !validIdentityNumber
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="address">
                Domicilio:
                <span className={validAdress ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validAdress || !address ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="adress"
                autoComplete="off"
                onChange={(e) => setAdress(e.target.value)}
                required
                aria-invalid={validAdress ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setAdressFocus(true)}
                onBlur={() => setAdressFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  addressFocus && address && !validAdress
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="postalCode">
                Código postal:
                <span className={validPostalCode ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validPostalCode || !postalCode ? "hide" : "invalid"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="postalCode"
                autoComplete="off"
                onChange={(e) => setPostalCode(e.target.value)}
                required
                aria-invalid={validAdress ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPostalCodeFocus(true)}
                onBlur={() => setPostalCodeFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  postalCodeFocus && postalCode && !validPostalCode
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="country">
                País:
                <span className={validCountry ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validCountry || !country ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="country"
                autoComplete="off"
                onChange={(e) => setCountry(e.target.value)}
                required
                aria-invalid={validAdress ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setCountryFocus(true)}
                onBlur={() => setCountryFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  countryFocus && country && !validCountry
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="city">
                Ciudad:
                <span className={validCity ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validCity || !city ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="city"
                autoComplete="off"
                onChange={(e) => setCity(e.target.value)}
                required
                aria-invalid={validCity ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setCityFocus(true)}
                onBlur={() => setCityFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  cityFocus && city && !validCity ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="phoneNum">
                Teléfono de contacto:
                <span className={validPhoneNum ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validPhoneNum || !phoneNum ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="phoneNum"
                autoComplete="off"
                onChange={(e) => setPhoneNum(e.target.value)}
                required
                aria-invalid={validCity ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPhoneNumFocus(true)}
                onBlur={() => setPhoneNumFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  phoneNumFocus && phoneNum && !validPhoneNum
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 a 24 caracteres.
                <br />
                Debe comenzar con una letra.
                <br />
                Puede contener letras y ,.'-.
              </p>

              <label htmlFor="reachBy">¿Cómo nos conociste?</label>
              <br />
              <select
                id="reachBy"
                value={reachBy}
                onChange={(e) => {
                  setReachBy(e.target.value);
                }}
                name="reachBy"
              >
                <option value="">-- Elige una opción --</option>
                <option value="newsletter">Newsletter</option>
                <option value="redes_sociales">Redes sociales</option>
                <option value="capacitaciones">Capacitaciones A&B</option>
                <option value="invitacion_mayoristas">
                  Invitación mayoristas
                </option>
                <option value="otro">Otra</option>
              </select>
              <br />
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  aria-describedby="uidnote"
                  required
                />
                <label>
                  <Link
                    className="terms_open_button"
                    target="_blank"
                    to="/termsandconditions"
                  >
                    Acepto los terminos y condiciones del Programa de Rewards
                    para Antigua y Barbuda: “A&B GURÚS”.
                  </Link>
                </label>
              </div>
              <br />
              <button
                className="login_button"
                disabled={
                  !validEmail || !validPassword || !validMatch ? true : false
                }
              >
                Registrar
              </button>
            </form>
            <br />
            <p>
              Ya estas registrado?
              <br />
              <button className="login_button">
                <a href="/">Ingresar</a>
              </button>
            </p>
          </section>
          <br />
        </div>
      )}
    </>
  );
}
