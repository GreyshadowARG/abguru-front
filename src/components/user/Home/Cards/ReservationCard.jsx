// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ReservationCard = (props) => {
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

        <Col xs={3}>
          <p>
            Hotel: <span id="text-bold">{props.hotelSelector}</span>
          </p>
        </Col>

        <Col xs={3}>
          {props.rewardAB === "None" && (
            <p>
              Puntos: <span id="text-bold">{props.rewardElite}</span>
            </p>
          )}
          {props.rewardElite === "None" && (
            <p>
              <span id="text-bold">{props.rewardAB}</span>
            </p>
          )}
          {props.rewardElite !== "None" && props.rewardAB !== "None" && (
            <div>
              {props.rewardElite !== "0" && (
                <p>
                  Puntos: <span id="text-bold">{props.rewardElite}</span>
                </p>
              )}

              {props.rewardAB !== "None" && (
                <p>
                  <span id="text-bold">{props.rewardAB}</span>
                </p>
              )}
            </div>
          )}
        </Col>

        <Col xs={2}>
          {props.rewardAB === "None" && (
            <p>
              <span
                id={
                  props.validacionElite === "Aprobada"
                    ? "color-green"
                    : "color-red"
                }
              >
                {props.validacionElite}
              </span>{" "}
            </p>
          )}
          {props.rewardElite === "None" && (
            <p>
              <span
                id={
                  props.validacionAB === "Aprobada"
                    ? "color-green"
                    : "color-red"
                }
              >
                {props.validacionAB}
              </span>{" "}
            </p>
          )}
          {props.rewardElite !== "None" && props.rewardAB !== "None" && props.validacionElite === props.validacionAB &&(
            <div>
              <p>
                <span
                  id={
                    props.validacionElite === "Aprobada"
                      ? "color-green"
                      : "color-red"
                  }
                >
                  {props.validacionElite}
                </span>{" "}
              </p>
            </div>
          )}
        </Col>
        
        <Row>
          {props.correctionTextElite !== "None" && (
            <p id="color-red">
              <span id="text-bold">Motivos:</span>{" "}
              {props.correctionTextElite}
            </p>
          )}
          {props.correctionTextAB !== "None" && (
            <p id="color-red">
              <span id="text-bold">Motivos:</span>{" "}
              {props.correctionTextAB}
            </p>
          )}
        </Row>
        <hr></hr>
      </Row>
    </div>
  );
};
