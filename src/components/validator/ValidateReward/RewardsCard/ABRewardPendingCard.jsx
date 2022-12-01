import { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ABRewardPendingCard = (props) => {
  const [denyState, setDenyState] = useState(false);
  const [denyText, setDenyText] = useState("None");
  const [headerType, setHeaderType] = useState("");

  const axiosPrivate = useAxiosPrivate();  
  // URL
  const APPROVEREWARD_URL = "api/reward/approveReward/" + props._id;
  const SUBSTRACTELITENIGHTS_URL = "api/users/substractEliteNights/" + props.userID;
  const ADDDENYTEXT_URL = "api/reward/addDenyText/" + props._id;
  const DENYREWARD_URL = "api/reward/denyReward/" + props._id;
  const RETRIEVEPOINTSWHENDENY = "api/users/addPoints/" + props.userID;

  useEffect(() => {
    switch (props.rewardState) {
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

  const approveSale = async () => {
    await axiosPrivate.post(
      APPROVEREWARD_URL,
      JSON.stringify({
        rewardState: "Aprobada",
      })
    );
  };

  const handleApprove = () => {
    setDenyText("None");
    approveSale();
    addDenyText();
    setApproveState();
  };

  // Reserva desaprobada
  const denyReward = async () => {
    await axiosPrivate.post(
      DENYREWARD_URL,
      JSON.stringify({
        rewardState: "Desaprobada",
      })
    );
  };

  const handleDenyState = async () => {
    setDenyState(true);
  };

  const handleInputDeny = async (e) => {
    setDenyText(e.target.value);
  };

  const addDenyText = async () => {
    await axiosPrivate.post(
      ADDDENYTEXT_URL,
      JSON.stringify({
        denyText: denyText,
      })
    );
  };

  const handleDeny = () => {
    denyReward();
    addDenyText();
    setApproveState();
  };

  return (
    <div className="saleslist_card">
      <Row>
        <h5>
          <div className={headerType}>
            <p>Reward:</p>
            <p id="text-bold">{props?.ABreward}</p>
            {props?.hotelSelector === "A&B Tourism Authority" && (
              <p>Hotel: {props?.AB_Hotel}</p>
            )}
          </div>
        </h5>
      </Row>
      <Row className="saleslist_card_body">
        <Col className="saleslist_card_body_left">
          <p id="text-bold">Agent name:</p>
          <p id="padding_left_3px">
            {props?.firstName} {props?.lastName}
          </p>
          <br />
          <br />
          <p id="text-bold">Identity number:</p>
          <p id="padding_left_3px">{props?.identityNumber}</p>
          <br />
          <br />
          <p id="text-bold">Location:</p>
          <p id="padding_left_3px">{props?.city},</p>
          <p id="padding_left_3px">{props?.country}</p>
          <br />
          <br />
          <p id="text-bold">Email:</p>
          <p id="padding_left_3px">{props?.email}</p>
          <br />
          <br />
          <p id="text-bold">Phone number:</p>
          <p id="padding_left_3px">{props?.phoneNum}</p>
        </Col>
        <Col className="saleslist_card_body_right">
          <p id="text-bold">Validation:</p>
          <br />
          <p className="padding_right_10px" id="padding_left_3px">
            {props?.rewardState}
          </p>
          <br />
          <br />
          <div className="reward_card_button">
            <button
              id="approve-button"
              onClick={handleApprove}
              className="btn btn-primary"
            >
              Approve reward
            </button>
            {!denyState && (
              <button
                id="delete-button"
                onClick={handleDenyState}
                className="btn btn-primary"
              >
                Deny reward
              </button>
            )}
          </div>
        </Col>
      </Row>
      <Row className="saleslist_card_body">
        <Col>
          {denyState && (
            <Col>
              <div className="saleslist_card_correction">
                <input
                  type="textarea"
                  placeholder="Specify the reasons for rejecting the reward."
                  className="input_denySale"
                  onChange={handleInputDeny}
                  required
                />
                <p className="loadedsales_legal">
                  By <span id="deny-text">Denying the reward</span>, it
                  will be canceled and the agent will not receive the reward.
                </p>
                <Row>
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
      </Row>
    </div>
  );
};
