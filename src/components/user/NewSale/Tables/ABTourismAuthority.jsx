import React, { useState, useEffect } from "react";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

function ABTourismAuthority({getHabitacion, getReward}) {
  const [item, setItem] = useState({ selection: "" });
  const { selection } = item;
  const [habitacion, setHabitacion] = useState("");
  const [showConditions, setShowConditions] = useState(false);

  useEffect(() => {
    switch (habitacion) {
      default:
        getReward("");
        break;

      case "1 Reserva de 5 a 7 noches de alojamiento":
        getReward("50 usd Gift Card");
        break 
        
      case "1 Reserva de 8 noches de alojamiento o más":
        getReward("Free tour");
        break

      case "1 Reserva al destino a partir de 5.000usd":
        getReward("Fam Trip Seat chance");
        break

      case "El agente con más ventas (que cumpla con más de 10 reservas al destino) o con ventas de un valor de 25.000 uds o más.":
        getReward("Prize Trip");
        break
      }
      // eslint-disable-next-line
}, [habitacion])

  const handleChange = (e) => {
    e.persist();

    setItem((prevState) => ({
      ...prevState,
      selection: e.target.value,
    }));

    getHabitacion(e.target.value);
    setHabitacion(e.target.value);
  };

  const handleShowConditions = () => {
    setShowConditions(!showConditions);
  };

  return (
    <Container className="section_newsale_container__table">
      <Row>
        <h2>Antigua y Barbuda Tourism Authority</h2>
      </Row>
      <br />
      <Row>
        <p className="section_container_legales">
          Para reservas entre el 1 octubre 2022 y el 31 de enero 2023 (Booking
          window)
        </p>
      </Row>
      <Row className="align_middle">
        <div>
          <Table striped className="table align-middle">
            <thead>
              <tr>
                <th>Condiciones de la reserva</th>
                <th>Premios</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-bottom">
                  <input
                    value="1 Reserva de 5 a 7 noches de alojamiento"
                    type="checkbox"
                    id="custom-switch"
                    aria-label="radio 1"
                    onChange={handleChange}
                    checked={
                      selection === "1 Reserva de 5 a 7 noches de alojamiento"
                    }
                  />
                  <label className="hotelesLabel">1 Reserva de 5 a 7 noches de alojamiento</label>
                </td>
                <td className="align-bottom" id="color-pink">
                  50 usd Gift Card *
                </td>
              </tr>
              <tr>
                <td className="align-bottom">
                  <input
                    value="1 Reserva de 8 noches de alojamiento o más"
                    type="checkbox"
                    id="custom-switch"
                    aria-label="radio 2"
                    onChange={handleChange}
                    checked={
                      selection === "1 Reserva de 8 noches de alojamiento o más"
                    }
                  />
                  <label className="hotelesLabel">1 Reserva de 8 noches de alojamiento o más</label>
                </td>
                <td className="align-bottom" id="color-pink">
                  Free tour **
                </td>
              </tr>
              <tr>
                <td className="align-bottom">
                  <input
                    value="1 Reserva al destino a partir de 5.000usd"
                    type="checkbox"
                    id="custom-switch"
                    aria-label="radio 3"
                    onChange={handleChange}
                    checked={
                      selection === "1 Reserva al destino a partir de 5.000usd"
                    }
                  />
                  <label className="hotelesLabel">1 Reserva al destino a partir de 5.000usd</label>
                </td>
                <td className="align-bottom" id="color-pink">
                  Fam Trip Seat chance ***
                </td>
              </tr>
              <tr>
                <td className="align-bottom">
                  <input
                    value="El agente con más ventas (que cumpla con más de 10 reservas al destino) o con ventas de un valor de 25.000 uds o más."
                    type="checkbox"
                    id="custom-switch"
                    aria-label="radio 4"
                    onChange={handleChange}
                    checked={selection === "El agente con más ventas (que cumpla con más de 10 reservas al destino) o con ventas de un valor de 25.000 uds o más."}
                  />
                  <label className="hotelesLabel">
                    El agente con más ventas (que cumpla con más de 10 reservas
                    al destino)
                    <br /> o con ventas de un valor de 25.000 uds o más.
                  </label>
                </td>
                <td className="align-bottom" id="color-pink">
                  Prize Trip ****
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          <button id="show_conditions" onClick={handleShowConditions}>
            Mostrar condiciones de los premios
          </button>
        </div>
        {showConditions && (
          <div className="abTourismAuthority_legal">
            <p>
              * Los agentes de viaje que realicen reservas de 5 a 7 noches de
              alojamiento podrán canjear su reserva por una Gift Card de Amazon.
            </p>
            <p>
              ** El premio “FREE TOUR” consistirá en una excursión en Antigua y
              Barbuda por la isla que podrá ser utilizada por el agente de
              viajes o transferible a su cliente.
            </p>
            <p>
              *** Los agentes de viaje podrán acceder a la chance de participar
              en un Fam Tour con una reserva al destino de acuerdo al monto de
              la venta según las siguientes condiciones:
              <br />- Ventas entre 5.000 y 10.000usd: Alojamiento y traslados
              gratuitos + descuento en el pasaje aéreo.
              <br />- Ventas de más de 10.000usd: Alojamiento, traslados y
              pasaje aéreo gratis.
            </p>
            <p>
              *** El agente que realice más reservas al destino (Con 10 reservas
              como mínimo) o que tenga reservas por un valor de 25.000 usd o
              más, podrá acceder a un viaje de premio todo pago. (Pasaje aéreo,
              alojamiento y traslados).
            </p>
            <p>Los premios no son acumulables.</p>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default ABTourismAuthority;
