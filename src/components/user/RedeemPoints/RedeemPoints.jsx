import { useState, useEffect } from "react";
import Navbars from "../../nav/NavbarUser";
import Footer from "../../layout/Footer";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// imagenes
import abGuruLogo from "../../../assets/images/abguru_logo.png";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// URL
const GETCURRENTUSER_URL = "api/users/currentUser";

const RedeemPoints = () => {
  const [userData, setUserData] = useState("");
  const [userDataState, setUserDataState] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ABreward, setABreward] = useState("None");
  const [rewardSelected, setRewardSelected] = useState("");
  const [eliteReward, setEliteReward] = useState("");
  const [eliteCalc, setEliteCalc] = useState(0);
  const [pointsTaken, setPointsTaken] = useState("");
  const [rewardState, setRewardState] = useState("Pendiente");
  const [denyText, setDenyText] = useState("None");
  const [eliteNightsMax, setEliteNightsMax] = useState(false);
  const [correctStatus, setCorrectStatus] = useState(false);
  const [correctEliteReward, setCorrectEliteReward] = useState("");
  const [correctPointsTaken, setCorrectPointsTaken] = useState("");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let unmount = false;
    const getUserData = async () => {
      try {
        const fetchUser = await axiosPrivate.get(GETCURRENTUSER_URL);
        if (!unmount) {
          setUserData(fetchUser.data);
          fetchUser.data.eliteNights >= 7
            ? setEliteNightsMax(true)
            : setEliteNightsMax(false);
          setUserDataState(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
    return () => {
      unmount = true;
    };
    //eslint-disable-next-line
  }, [!success]);

  const {
    _id,
    firstName,
    lastName,
    email,
    identityNumber,
    country,
    city,
    phoneNum,
    pointsEarned,
    eliteNights,
    AB_Prize,
  } = userData;

  useEffect(() => {
    const pointsCalculator = async () => {
      if (pointsEarned >= 30 && pointsEarned < 60) {
        setEliteReward("1 noche gratis con All Inclusive");
        setPointsTaken(30);
        setEliteCalc(1);
      } else if (pointsEarned >= 60 && pointsEarned < 90) {
        setEliteReward("2 noches gratis con All Inclusive");
        setPointsTaken(60);
        setEliteCalc(2);
      } else if (pointsEarned >= 90 && pointsEarned < 120) {
        setEliteReward("3 noches gratis con All Inclusive");
        setPointsTaken(90);
        setEliteCalc(3);
      } else if (pointsEarned >= 120 && pointsEarned < 150) {
        setEliteReward("4 noches gratis con All Inclusive");
        setPointsTaken(120);
        setEliteCalc(4);
      } else if (pointsEarned >= 150 && pointsEarned < 180) {
        setEliteReward("5 noches gratis con All Inclusive");
        setPointsTaken(150);
        setEliteCalc(5);
      } else if (pointsEarned >= 180 && pointsEarned < 210) {
        setEliteReward("6 noches gratis con All Inclusive");
        setPointsTaken(180);
        setEliteCalc(6);
      } else if (pointsEarned >= 210) {
        setEliteReward("7 noches gratis con All Inclusive");
        setPointsTaken(210);
        setEliteCalc(7);
      }
    };

    pointsCalculator();
    //eslint-disable-next-line
  }, [userDataState]);

  useEffect(() => {
    const getCorrectNight = () => {
      const totalNights = Number(eliteCalc) + Number(eliteNights);
      if (totalNights >= 7) {
        const substract = Number(totalNights) - 7;
        const correctReward = Number(eliteCalc) - Number(substract);
        const pointsTaken = Number(correctReward) * 30;
        setCorrectEliteReward(
          correctReward > 1
            ? `${String(correctReward)} noches con All Inclusive`
            : `${String(correctReward)} noche con All Inclusive`
        );
        setCorrectPointsTaken(String(pointsTaken));
        setCorrectStatus(true);
      } else {
        setCorrectStatus(false);
      }
    };

    getCorrectNight();
    //eslint-disable-next-line
  }, [eliteCalc]);

  // URL
  const SUBSTRACTPOINTS_URL = "api/users/substractPoints/" + _id;
  const REMOVEUSERABPRIZE_URL = "api/users/removeAB_Prize/" + _id;
  const CLEANREWARDABPRIZE_URL = "api/reward/addAB_Prize/" + _id;
  const ADDELITENIGHTS_URL = "api/users/addEliteNights/" + _id;
  const LOADELITEREWARD_URL = "api/reward/loadEliteReward";
  const LOADABREWARD_URL = "api/reward/loadAB_Reward";

  const substractPointsTaken = async () => {
    try {
      await axiosPrivate.post(
        SUBSTRACTPOINTS_URL,
        JSON.stringify({
          pointsEarned: !correctStatus ? pointsTaken : correctPointsTaken,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadEliteReward = async () => {
    try {
      await axiosPrivate.post(
        LOADELITEREWARD_URL,
        JSON.stringify({
          _id,
          firstName,
          lastName,
          email,
          identityNumber,
          country,
          city,
          phoneNum,
          ABreward,
          eliteReward,
          pointsTaken,
          rewardState,
          denyText,
        })
      );
      setRewardState("Pendiente");
      setDenyText("None");
    } catch (err) {
      console.log(err);
    }
  };

  const loadAB_Reward = async () => {
    try {
      await axiosPrivate.post(
        LOADABREWARD_URL,
        JSON.stringify({
          _id,
          firstName,
          lastName,
          email,
          identityNumber,
          country,
          city,
          phoneNum,
          ABreward: rewardSelected,
          rewardState,
          denyText,
        })
      );
      setRewardState("Pendiente");
      setDenyText("None");
    } catch (err) {
      console.log(err);
    }
  };

  const cleanUserAB_Prize = async () => {
    await axiosPrivate.post(
      REMOVEUSERABPRIZE_URL,
      JSON.stringify({
        AB_Prize: [],
      })
    );
  };

  const cleanRewardAB_Prize = async () => {
    await axiosPrivate.post(
      CLEANREWARDABPRIZE_URL,
      JSON.stringify({
        ABreward: "None",
      })
    );
  };

  const addEliteNights = async () => {
    await axiosPrivate.post(
      ADDELITENIGHTS_URL,
      JSON.stringify({
        eliteNights: !correctStatus ? eliteCalc : correctEliteReward[0],
      })
    );
  };

  const setABReward = () => {
    AB_Prize !== "None" ? setABreward("None") : setABreward(AB_Prize);
  };

  const handleSendElite = () => {
    setABReward();
    substractPointsTaken();
    addEliteNights();
    loadEliteReward();
    cleanRewardAB_Prize();
    setSuccess(true);
  };

  const handleSendABReward = () => {
    cleanUserAB_Prize();
    loadAB_Reward();
    setSuccess(true);
  };

  const handleRewardSelected = (e) => {
    setRewardSelected(e.target.value);
  };

  return (
    <div className="main_container">
      <div>
        <img src={abGuruLogo} alt="" className="logo_header" />
      </div>
      <section>
        <Navbars />
        <div className="section_container">
          <h2>Redimir Recompensas</h2>
          {success ? (
            <div className="section_newsale_success">
              <h5 id="text-bold">
                Tu solicitud fue enviada correctamente y se encuentra en proceso
                de verificación.
              </h5>
              <br />
              <Row>
                <h5>
                  Cuando sea aprobada serás notificado en la app y un agente se
                  comunicará a tu mail para acordar las condiciones de entrega
                  de tu premio.
                </h5>
              </Row>
              <br />
              <br />
              <button
                className="newsale_sendButton"
                onClick={() => {
                  setSuccess(false);
                }}
              >
                Volver
              </button>
            </div>
          ) : (
            <div className="section_redeem_main">
              <div className="redeem_row">
                <h4>
                  <span id="text-bold">Puntos acumulados:</span> {pointsEarned}
                </h4>
                {pointsEarned >= 30 && !eliteNightsMax && (
                  <button className="redeem_button" onClick={handleSendElite}>
                    <div className="arrow left"></div> Solicitar canje de puntos
                  </button>
                )}
              </div>
              {AB_Prize?.length > 0 && (
                <div>
                  <Row>
                    <Col>
                      <h4>
                        <span id="text-bold">
                          Premio Antigua & Barbuda Tourism Authority:
                        </span>{" "}
                      </h4>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    {AB_Prize?.length > 1 && (
                      <>
                        <h5>
                          Tienes varios premios A&B, elige cual quieres canjear.
                        </h5>
                        <p>Recuerda que los premios no son acumulables</p>
                      </>
                    )}
                    <Col md={4}>
                      <select
                        className="new_sale_inputs"
                        id="rewardSelected"
                        onChange={handleRewardSelected}
                        name="rewardSelected"
                        placeholder="Elige tu premio"
                      >
                        <option defaultValue={true}>
                          {" "}
                          -Elige tu recompensa-{" "}
                        </option>
                        {AB_Prize?.map((prize, i) => (
                          <option key={i}> {prize} </option>
                        ))}
                      </select>
                    </Col>
                    <Col md={8}>
                      <button
                        className="redeem_button"
                        onClick={handleSendABReward}
                      >
                        <div className="arrow left"></div> Solicitar canje de
                        premios
                      </button>
                    </Col>
                  </Row>
                </div>
              )}
              <br />
              {pointsEarned < 30 ? (
                <div>
                  <h3 className="redeem_no_points">
                    No tienes puntos disponibles para canjear por premios.
                  </h3>
                  <div className="redeem_row">
                    <h5>
                      <span id="text-bold">Noches canjeadas:</span>{" "}
                      {eliteNights}
                    </h5>
                    {eliteNights >= "7" && (
                      <h6 className="redeem_maxNight_alert" id="text-bold">
                        Llegaste al máximo de noches gratis que puedes canjear
                        por año calendario. No podrás solicitar canje de puntos.
                      </h6>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {eliteNights < 7 && (
                    <div>
                      {!correctStatus ? (
                        <div>
                          <h5>
                            Puedes canjear tus puntos acumulados por{" "}
                            {<span id="text-bold">{eliteReward}</span>}.
                          </h5>
                          <h5>
                            Se descontarán{" "}
                            {<span id="text-bold">{pointsTaken} puntos.</span>}
                          </h5>
                        </div>
                      ) : (
                        <div>
                          <h5>
                            Puedes canjear tus puntos acumulados por{" "}
                            {<span id="text-bold">{correctEliteReward}</span>}.
                          </h5>
                          <h5>
                            Se descontarán{" "}
                            {
                              <span id="text-bold">
                                {correctPointsTaken} puntos.
                              </span>
                            }
                          </h5>
                        </div>
                      )}
                    </div>
                  )}
                  <br />
                  <div className="redeem_row">
                    <h5>
                      <span id="text-bold">Noches canjeadas:</span>{" "}
                      {eliteNights}
                    </h5>
                    {eliteNights >= "7" && (
                      <h6 className="redeem_maxNight_alert" id="text-bold">
                        Llegaste al máximo de noches gratis que puedes canjear
                        por año calendario. No podrás solicitar canje de puntos.
                      </h6>
                    )}
                  </div>
                  <div>
                    <p id="color-pink">
                      Puede canjear un máximo de 7 noches gratis por año
                      calendario. Las noches gratis se pueden canjear entre
                      octubre 2022 y diciembre 2023). Black out dates: Dec
                      20-Jan 3, Feb 1-28, Mar 10-April 20, 2023. No combinable
                      con otras promociones.
                    </p>
                  </div>
                  <br />
                  <p className="loadedsales_legal">
                    Al enviar la solicitud, se enviara tu información (nombre,
                    apellido, documento de identidad, email, pais, ciudad y
                    teléfono de contacto) a un agente que verifique tus datos.
                    <br />
                    <br />
                    Para cualquier duda o consulta comunícate a nuestro mail de
                    contacto:{" "}
                    <a href="mailto:gurus@aybgurusrewards.com">
                      gurus@aybgurusrewards.com
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RedeemPoints;
