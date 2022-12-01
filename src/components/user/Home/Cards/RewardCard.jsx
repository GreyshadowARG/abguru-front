// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const RewardCard = (props) => {
  return (
    <div>
      <Row className="mb-n1">
        <Col xs={5}>
          {props.eliteReward === "None" && <p id="text-bold">{props.ABreward}</p>}
          {props.eliteReward !== "None" && <p id="text-bold">{props.eliteReward}</p>}
          
        </Col>
        <Col xs={5}>
          {props.eliteReward !== "None" && <p>
            Puntos usados: <span id="text-bold">{props.pointsTaken}</span>
          </p>}
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
        <Row>
          {props.denyText !== "None" && <p id="color-red">Motivos: {props.denyText}</p>}
          {props.rewardState === "Aprobada" && <p id="color-green">Pronto recibiras un correo en {props.email} con las instrucciones para usar tu premio.</p>}
        </Row>
        <hr></hr>
      </Row>
    </div>
  );
};
