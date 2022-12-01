import { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ABSalePendingCard = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const [denyState, setDenyState] = useState(false);
  const [correctionText, setCorrectionText] = useState("None");
  const [headerType, setHeaderType] = useState("");

  // URL
  const ADDABPRIZE_URL = "api/users/addAB_Prize/" + props.userID;
  const APPROVESALE_URL = "api/sales/approveSale/" + props._id;
  const ADDCORRECTIONTEXT_URL = "api/sales/addCorrectionText/" + props._id;
  const DENYSALE_URL = "api/sales/denySale/" + props._id;
  const REQUESTCORRECTION_URL = "api/sales/requestCorrection/" + props._id;

  useEffect(() => {
    switch (props.validacionAB) {
      default:
        break;
      case "Aprobada":
        setHeaderType("saleslist_card_header_approved");
        break;
      case "Pendiente":
        setHeaderType("saleslist_card_header_pending");
        break;
      case "Desaprobada":
        setHeaderType("saleslist_card_header_deny");
        break;
      case "Requiere corrección":
        setHeaderType("saleslist_card_header_correction");
        break;
    } // eslint-disable-next-line
  }, []);

  const setApproveState = () => {
    props.getApprovedState(true);
  };

  const addRewardAB = async () => {
    await axiosPrivate.post(
      ADDABPRIZE_URL,
      JSON.stringify({
        AB_Prize: props.rewardAB,
      })
    );
  };
  

  const approveSale = async () => {
    await axiosPrivate.post(
      APPROVESALE_URL,
      JSON.stringify({
        validacionAB: "Aprobada",
      })
    );
  };

  const handleApprove = () => {
    addRewardAB();
    setCorrectionText("None");
    approveSale();
    addCorrectionText();
    setApproveState();
  };

  const denySale = async () => {
    await axiosPrivate.post(
      DENYSALE_URL,
      JSON.stringify({
        validacionAB: "Desaprobada",
      })
    );
  };

  const addCorrectionText = async () => {
    await axiosPrivate.post(
      ADDCORRECTIONTEXT_URL,
      JSON.stringify({
        correctionTextAB: correctionText,
      })
    );
  };

  const handleDenyState = async () => {
    setDenyState(true);
  };

  const handleInputCorrection = async (e) => {
    setCorrectionText(e.target.value);
  };

  const handleDeny = () => {
    denySale();
    addCorrectionText();
    setApproveState();
  };

  // Reserva en estado de revisión
  const requestCorrection = async () => {
    await axiosPrivate.post(
      REQUESTCORRECTION_URL,
      JSON.stringify({
        validacionAB: "Requiere corrección",
      })
    );
  };

  const handleRequestCorrection = () => {
    requestCorrection();
    addCorrectionText();
    setApproveState();
  };

  return (
    <div className="saleslist_card">
      <Row>
        <h5>
          <div className={headerType}>
            <p id="text-bold">{props?.hotelSelector}</p>
            {props?.hotelSelector === "A&B Tourism Authority" && (
              <p>Hotel: {props?.AB_Hotel}</p>
            )}
          </div>
        </h5>
      </Row>
      <Row className="saleslist_card_body">
        <Col className="saleslist_card_body_left">
          <p id="text-bold">Room category:</p>
          <p id="padding_left_3px">{props?.catHabitacion}</p>
          <br />
          <br />
          <div>
            <p id="text-bold">Check-In:</p>
            <p className="padding_right_10px" id="padding_left_3px">
              {props?.fechaCheckIn}
            </p>
            <br />
            <p id="text-bold">Check-Out:</p>
            <p id="padding_left_3px"> {props?.fechaCheckOut}</p>
            <br />
            <br />
            <p id="text-bold">Nights quantity:</p>
            <p id="padding_left_3px">{props?.nightsQuantity} nights</p>
            <br />
            <p id="text-bold">Reservation cost:</p>
            <p id="padding_left_3px">{props?.reserveAmount} US$</p>
            <br />
            <br />
            <p id="text-bold">Reservation code:</p>
            <p id="padding_left_3px">{props?.codigoReserva}</p>
          </div>
        </Col>
        <Col className="saleslist_card_body_right">
          <p id="text-bold">Agent type:</p>
          <br />
          <p className="padding_right_10px" id="padding_left_3px">
            {props?.tipoAgente}
          </p>
          <br />
          <br />
          <p id="text-bold">Reservation processed by:</p>
          <br />
          <p className="padding_right_10px" id="padding_left_3px">
            {props?.procesadaPor}
          </p>
          <br />
          <br />
          <p id="text-bold">Agent name:</p>
          <br />
          <p className="padding_right_10px" id="padding_left_3px">
            <span>
              {props?.firstName} {props?.lastName}
            </span>
          </p>
          <br />
          <br />
          <p id="text-bold">PRICE: {props?.rewardAB}</p>
        </Col>
      </Row>
      <Row className="saleslist_card_body">
        <Col>
          {denyState && (
            <Col>
              <div className="saleslist_card_correction">
                <input
                  type="textarea"
                  placeholder="Request corrections or specify the reasons for rejecting the reservation."
                  className="input_denySale"
                  onChange={handleInputCorrection}
                  required
                />
                <p className="loadedsales_legal">
                  By <span id="request-text">Requesting corrections</span>, the
                  reservation will remain pending until the agent makes the
                  requested changes.
                </p>
                <p className="loadedsales_legal">
                  By <span id="deny-text">Denying the reservation</span>, it
                  will be canceled and the agent will not receive the points.
                </p>
                <Row>
                  <Col md="auto">
                    <button
                      id="request-button"
                      onClick={handleRequestCorrection}
                    >
                      Request correction
                    </button>
                  </Col>
                  <Col md="auto">
                    <button id="delete-button" onClick={handleDeny}>
                      Deny reservation
                    </button>
                  </Col>
                </Row>
              </div>
            </Col>
          )}
        </Col>
        <Col md="auto" className="cards_button">
          <button
            id="approve-button"
            onClick={handleApprove}
            className="btn btn-primary"
          >
            Approve reservation
          </button>
          {denyState === false && (
            <button
              id="delete-button"
              onClick={handleDenyState}
              className="btn btn-primary"
            >
              Deny reservation
            </button>
          )}
        </Col>
      </Row>
    </div>
  );
};
