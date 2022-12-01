// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const EliteReservationCard = (props) => {
  return (
    <div>
      <Row className="mb-n1">
        <Col xs={4}>
          <p id="text-bold">
            {props.catHabitacion ===
            "El agente con más ventas (que cumpla con más de 10 reservas al destino) o con ventas de un valor de 25.000 uds o más."
              ? "El agente con mas ventas"
              : props.catHabitacion}
          </p>
        </Col>
        <Col xs={4}>
          <p>
            Hotel: <span id="text-bold">{props.hotelSelector}</span>
          </p>
        </Col>
        <Col xs={2}>
          <p>
            <span id="text-bold">
              {props?.firstName} {props?.lastName}
            </span>
          </p>
        </Col>
        <Col xs={2}>
          <p>
            <span
              id={props.validacionElite === "Aprobada" ? "color-green" : "color-red"}
            >
              {props.validacionElite}
            </span>{" "}
          </p>
        </Col>
        <hr></hr>
      </Row>
    </div>
  );
};
