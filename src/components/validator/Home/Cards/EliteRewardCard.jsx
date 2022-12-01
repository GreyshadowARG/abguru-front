// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const EliteRewardPendingCard = (props) => {
  return (
    <div>
      <Row className="mb-n1">
        <Col xs={4}>
          {
          props?.ABreward !== "None" ? <p id="text-bold">{props?.ABreward}</p> : <p id="text-bold">{props?.eliteReward}</p>
          }
        </Col>
        <Col xs={2}>
          <p id="text-bold">
            {props?.firstName} {props?.lastName}
          </p>
        </Col>
        <Col xs={4}>
          <p id="text-bold">{props?.email}</p>
        </Col>
        <Col xs={2}>
          <p>
            <span
              id={
                props.rewardState === "Aprobada" ? "color-green" : "color-red"
              }
            >
              {props.rewardState}
            </span>{" "}
          </p>
        </Col>
        <hr></hr>
      </Row>
    </div>
  );
};
