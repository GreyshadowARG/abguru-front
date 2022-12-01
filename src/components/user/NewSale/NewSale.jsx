import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";

import Navbar from "../../nav/NavbarUser";
import Footer from "../../layout/Footer";

// imagenes
import abGuruLogo from "../../../assets/images/abguru_logo.png";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Radiobuttons
import R1TipoAgente from "./RadioButtons/R1TipoAgente.jsx";
import R2ProcesadaPor from "./RadioButtons/R2ProcesadaPor.jsx";

// tablas
import VerandahResort from "./Tables/VerandahResort";
import StJamesClubAntigua from "./Tables/StJamesClubAntigua";
import PineappleBeachClub from "./Tables/PineappleBeachClub";
import ABTourismAuthority from "./Tables/ABTourismAuthority";

// URL
const NEWSALE_URL = "/api/sales/newSale";

const NewSale = () => {
  const [userData, setUserData] = useState([]);
  const [tipoAgente, setTipoAgente] = useState("");
  const [procesadaPor, setProcesadaPor] = useState("");
  const [fechaCheckIn, setFechaCheckIn] = useState("");
  const [fechaCheckOut, setFechaCheckOut] = useState("");
  const [hotelSelector, setHotelSelector] = useState("");
  const [AB_HotelSelector, setAB_HotelSelector] = useState("");
  const [AB_Hotel, setAB_Hotel] = useState("No");
  const [rewardElite, setRewardElite] = useState("None");
  const [validacionElite, setValidacionElite] = useState("Pendiente");
  const [rewardAB, setRewardAB] = useState("None");
  const [famTripChance, setFamTripChance] = useState("No");
  const [validacionAB, setValidacionAB] = useState("Pendiente");
  const [nightsQuantity, setNightsQuantity] = useState("None");
  const [reserveAmount, setReserveAmount] = useState("0");
  const [codigoReserva, setCodigoReserva] = useState("");
  const [catHabitacion, setCatHabitacion] = useState("None");
  const [success, setSuccess] = useState(false);
  const [correctionTextAB, setCorrectionTextAB] = useState("None");
  const [correctionTextElite, setCorrectionTextElite] = useState("None");
  const userID = userData._id;
  const firstName = userData.firstName;
  const lastName = userData.lastName;
  const identityNumber = userData.identityNumber;

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axiosPrivate.get("api/users/currentUser");
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();

    //eslint-disable-next-line
  }, []);

  const getTipoAgente = (tipoAgente) => {
    setTipoAgente(tipoAgente);
  };

  const getProcesadaPor = (procesadaPor) => {
    setProcesadaPor(procesadaPor);
  };

  const getHabitacion = (catHabitacion) => {
    setCatHabitacion(catHabitacion);
  };
  const getReward = (reward) => {
    if (hotelSelector === "A&B Tourism Authority") {
      setRewardAB(reward);
      if (reward === "Fam Trip Seat chance") {
        setRewardAB("Free tour");
        setFamTripChance("Si");
      } else {
        setFamTripChance("No");
      }
    } else {
      setRewardElite(reward);
    }
  };

  const handleNightsQuantity = (e) => {
    setNightsQuantity(e.target.value);
  };

  const handleReserveAmount = (e) => {
    setReserveAmount(e.target.value);
  };

  useEffect(() => {
    const AB_RewardCalculator = () => {
      if (
        hotelSelector !== "A&B Tourism Authority" &&
        nightsQuantity >= 5 &&
        nightsQuantity <= 7 &&
        reserveAmount < 5000
      ) {
        setRewardAB("50 usd Gift Card");
      } else if (
        hotelSelector !== "A&B Tourism Authority" &&
        nightsQuantity >= 8 &&
        reserveAmount < 5000
      ) {
        setRewardAB("Free tour");
      } else if (
        hotelSelector !== "A&B Tourism Authority" &&
        reserveAmount >= 5000 &&
        reserveAmount < 25000
      ) {
        setRewardAB("Free tour");
        setFamTripChance("Si");
      } else if (
        hotelSelector !== "A&B Tourism Authority" &&
        reserveAmount >= 25000
      ) {
        setRewardAB("Prize Trip");
      } else if (
        hotelSelector !== "A&B Tourism Authority" &&
        nightsQuantity < 5
      ) {
        setRewardAB("None");
      }
    };

    AB_RewardCalculator();
    //eslint-disable-next-line
  }, [hotelSelector, nightsQuantity, reserveAmount]);

  const hotelTable = () => {
    const handleAB_HotelSelector = (e) => {
      setAB_HotelSelector(e.target.value);
      setAB_Hotel(e.target.value);
    };

    const handleInputAB_Hotel = (e) => {
      setAB_Hotel(e.target.value);
    };

    switch (hotelSelector) {
      default:
        return (
          <h3 className="hotelSelector_default">
            Indica a que hotel pertenece la reserva
          </h3>
        );

      // The Verandah Resort & Spa
      case "The Verandah Resort & Spa":
        return (
          <VerandahResort getHabitacion={getHabitacion} getReward={getReward} />
        );
      case "St James's Club Antigua":
        return (
          <StJamesClubAntigua
            getHabitacion={getHabitacion}
            getReward={getReward}
          />
        );
      case "Pineapple Beach Club":
        return (
          <PineappleBeachClub
            getHabitacion={getHabitacion}
            getReward={getReward}
          />
        );

      // A&B Tourism Authority
      case "A&B Tourism Authority":
        return (
          <Container>
            <Row className="section_newsale_container__row_AB">
              <div>
                <select
                  className="new_sale_inputs"
                  id="AB_HotelSelector"
                  value={AB_HotelSelector}
                  onChange={handleAB_HotelSelector}
                  required
                  name="AB_HotelSelector"
                >
                  <option value="">-- Selecciona un hotel --</option>
                  <option value="Sandals Grande Antigua">
                    Sandals Grande Antigua
                  </option>
                  <option value="Blue Waters Resort & Spa">
                    Blue Waters Resort & Spa
                  </option>
                  <option value="Carlisle Bay Antigua">
                    Carlisle Bay Antigua
                  </option>
                  <option value="Hermitage Bay Resort">
                    Hermitage Bay Resort
                  </option>
                  <option value="Hodges Bay Resort & Spa">
                    Hodges Bay Resort & Spa
                  </option>
                  <option value="Galley Bay Resort & Spa">
                    Galley Bay Resort & Spa
                  </option>
                  <option value="Tamarind Hills">Tamarind Hills</option>
                  <option value="Royalton Resort & casino">
                    Royalton Resort & casino
                  </option>
                  <option value="Cocobay Resort">Cocobay Resort</option>
                  <option value="Coco's Hotel Antigua">
                    Coco's Hotel Antigua
                  </option>
                  <option value="Hammock Cove Resort & Spa">
                    Hammock Cove Resort & Spa
                  </option>
                  <option value="Antigua Village Beach Resort">
                    Antigua Village Beach Resort
                  </option>
                  <option value="Antigua Yacht Club Marina Resort">
                    Antigua Yacht Club Marina Resort
                  </option>
                  <option value="Buccaneer Beach Club">
                    Buccaneer Beach Club
                  </option>
                  <option value="Keyonna Beach Resort">
                    Keyonna Beach Resort
                  </option>
                  <option value="Siboney Beach Club">Siboney Beach Club</option>
                  <option value="Trade Winds Hotel">Trade Winds Hotel</option>
                  <option value="Ocean Point Resort & Spa">
                    Ocean Point Resort & Spa
                  </option>
                  <option value="Barbuda Bell">Barbuda Bell</option>
                  <option value="Barbuda Cottages">Barbuda Cottages</option>
                  <option value="Otro">Otro...</option>
                </select>
              </div>
              <div>
                {AB_HotelSelector === "Otro" && (
                  <div>
                    <input
                      className="inputAB_Hotel"
                      type="text"
                      placeholder="Escribe el nombre completo del hotel"
                      id="InputAB_Hotel"
                      onChange={handleInputAB_Hotel}
                      required
                      aria-describedby="uidnote"
                    />
                  </div>
                )}
              </div>
            </Row>
            <ABTourismAuthority
              getHabitacion={getHabitacion}
              getReward={getReward}
            />
          </Container>
        );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !tipoAgente ||
      !procesadaPor ||
      !fechaCheckIn ||
      !fechaCheckOut ||
      !hotelSelector ||
      !catHabitacion ||
      !nightsQuantity ||
      !reserveAmount ||
      !codigoReserva
    ) {
      return;
    }
    try {
      await axiosPrivate.post(
        NEWSALE_URL,
        JSON.stringify({
          tipoAgente,
          procesadaPor,
          fechaCheckIn,
          fechaCheckOut,
          hotelSelector,
          AB_Hotel,
          rewardAB,
          rewardElite,
          validacionAB,
          validacionElite,
          nightsQuantity,
          reserveAmount,
          famTripChance,
          catHabitacion,
          codigoReserva,
          userID,
          firstName,
          lastName,
          identityNumber,
          correctionTextAB,
          correctionTextElite,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess(true);
      setTipoAgente("");
      setProcesadaPor("");
      setFechaCheckIn("");
      setFechaCheckOut("");
      setCodigoReserva("");
      setAB_Hotel("No");
      setAB_HotelSelector("")
      setValidacionElite("Pendiente");
      setValidacionAB("Pendiente");
      setNightsQuantity("None");
      setReserveAmount("None");
      setCatHabitacion("None");
      setCorrectionTextAB("None");
      setCorrectionTextElite("None");
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else if (err.response?.status === 409) {
        console.log("Username taken");
      } else {
        console.log("Registration failed");
      }
    }
  };

  return (
    <div className="main_container">
      <div>
        <img src={abGuruLogo} alt="" className="logo_header" />
      </div>

      <section>
        <Navbar />
        <div className="section_container">
          <h2 id="color-pink">Cargar Reserva</h2>
          {success ? (
            <div className="section_newsale_success">
              <h4 id="text-bold">La reserva ha sido cargada exitosamente.</h4>
              <h5>
                La misma se encuentra en estado pendiente, la recompenza se
                computará cuando sea aprobada.
              </h5>
              <br />
              {rewardAB !== "None" &&
                hotelSelector !== "A&B Tourism Authority" && (
                  <h5>
                    Ademas de <span id="text-bold">sumar puntos</span>,
                    calificas para un <span id="text-bold">{rewardAB}</span>,
                    premio otorgado por A&B Tourism Authority.
                  </h5>
                )}
              <br />
              {famTripChance === "Si" && (
                <div>
                  <h5>
                    Con tu reserva, ademas de obtener un{" "}
                    <span id="text-bold">"Free Tour"</span>, también participas
                    por un <span id="text-bold">"Fam Trip Seat chance"</span>.
                  </h5>
                </div>
              )}
              <br />
              <button
                className="newsale_sendButton"
                onClick={() => {
                  setRewardAB("None");
                  setRewardElite("None");
                  setHotelSelector("");
                  setFamTripChance("No");
                  setSuccess(false);
                }}
              >
                Cargar nueva reserva
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="section_newsale_container__inputs">
                <Container>
                  <R1TipoAgente getTipoAgente={getTipoAgente} />
                  <hr className="solid"></hr>
                  <R2ProcesadaPor getProcesadaPor={getProcesadaPor} />
                  <hr className="solid"></hr>
                  <Row className="section_newsale_container__row">
                    <Col>
                      <label htmlFor="fechaCheckIn">Fecha de Check-in</label>
                      <input
                        type="date"
                        id="check-in"
                        onChange={(e) => setFechaCheckIn(e.target.value)}
                        required
                        aria-describedby="uidnote"
                      />
                    </Col>
                    <Col>
                      <label htmlFor="fechaCheckOut">Fecha de Check-out</label>

                      <input
                        type="date"
                        id="check-out"
                        onChange={(e) => setFechaCheckOut(e.target.value)}
                        required
                        aria-describedby="uidnote"
                      />
                    </Col>
                  </Row>
                  <hr className="solid"></hr>
                  <Row>
                    <Col>
                      <label htmlFor="hotelSelector">
                        ¿A qué hotel pertenece la reserva?
                      </label>
                      <select
                        className="new_sale_inputs"
                        id="hotelSelector"
                        value={hotelSelector}
                        onChange={(e) => {
                          setHotelSelector(e.target.value);
                        }}
                        name="hotelSelector"
                      >
                        <option value="">-- ¿Selecciona un hotel? --</option>
                        <option value="The Verandah Resort & Spa">
                          The Verandah Resort & Spa
                        </option>
                        <option value="St James's Club Antigua">
                          St James's Club Antigua
                        </option>
                        <option value="Pineapple Beach Club">
                          Pineapple Beach Club
                        </option>
                        <option value="A&B Tourism Authority">
                          * Hoteles que participan a traves de A&B Tourism
                          Authority
                        </option>
                      </select>
                    </Col>
                  </Row>
                </Container>
                <Container>
                  <Row>{hotelTable()}</Row>
                </Container>
                <hr className="solid"></hr>
                <Container>
                  <Row>
                    <Col md={6}>
                      <label htmlFor="nightsQuantity">
                        Indique la cantidad de noches de la reserva
                      </label>
                      <select
                        className="new_sale_inputs"
                        id="nightsQuantity"
                        value={nightsQuantity}
                        onChange={handleNightsQuantity}
                        required
                        name="AB_nightsQuantity"
                      >
                        <option value="">-- Selecciona una opción --</option>
                        <option value="3">3 noches</option>
                        <option value="4">4 noches</option>
                        <option value="5">5 noches</option>
                        <option value="6">6 noches</option>
                        <option value="7">7 noches</option>
                        <option value="8">8 noches</option>
                        <option value="9">9 noches</option>
                        <option value="10">10 noches</option>
                        <option value="11">11 noches</option>
                        <option value="12">12 noches</option>
                        <option value="13">13 noches</option>
                        <option value="14">14 noches</option>
                        <option value="14+">+ de 14 noches</option>
                      </select>
                    </Col>
                    <Col md={6}>
                      <label htmlFor="reserveAmount">
                        Monto de la reserva (dólares US$)
                      </label>
                      <br />
                      <input
                        type="text"
                        id="reserveAmount"
                        className="new_sale_inputs"
                        placeholder="0"
                        onChange={handleReserveAmount}
                        required
                        aria-describedby="uidnote"
                      />
                    </Col>
                  </Row>
                  <br />
                </Container>
                <hr className="solid"></hr>
                <Container>
                  <Row>
                    <Col>
                      <label htmlFor="codigoReserva">
                        Ingrese el código de reserva
                      </label>
                      <input
                        className="new_sale_inputs"
                        type="text"
                        placeholder="Este campo es obligatorio."
                        id="codigoReserva"
                        autoComplete="off"
                        onChange={(e) => setCodigoReserva(e.target.value)}
                        aria-describedby="uidnote"
                      />
                    </Col>
                  </Row>
                </Container>
                <br />
                <Container className="section_newsale_container__row_send">
                  <button className="newsale_sendButton">
                    CARGAR
                    <br />
                    RESERVA
                  </button>
                  <p>
                    Al cargar tu reserva, esta pasará a modo pendiente.
                    <br />
                    Una vez que sea aprobada se computarán los puntos.
                  </p>
                </Container>
              </div>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewSale;
