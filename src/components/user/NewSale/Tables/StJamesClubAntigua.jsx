import React, { useState, useEffect } from "react";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

function StJamesClubAntigua({getHabitacion, getReward}) {
  const [item, setItem] = useState({ selection: "" });
  const { selection } = item;
  const [habitacion, setHabitacion] = useState("");


  useEffect(() => {
    switch (habitacion) {
      default:
        getReward("");
        break;

      case "Club Room 3+":
      case "Premium Room 3+":
      case "Beachfront Room 3+":
        getReward(10);
        break; 
        
      case "Royal Suite 3+":
      case "Junior Suite 3+":
        getReward(15);
        break;

      case "2 Bedroom Villas 3+":
      case "3 Bedroom Villas 3+":
        getReward(30);
        break;
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

  return (
    <Container className="section_newsale_container__table">
      <Col>
        <Row>
          <h2>St James's Club Antigua</h2>
        </Row>
        <Row>
          <p className="section_container_descripcion">
            Obtenga puntos para canjear por noches gratis. Puede canjear un
            máximo de 7 noches gratis por año calendario. Las noches gratis se
            pueden canjear entre octubre 2022 y diciembre 2023). Black out
            dates: Dec 20-Jan 3, Feb 1-28, Mar 10-April 20, 2023. No combinable
            con otras promociones.
          </p>
          <p className="section_container_legales">
            Para reservas entre el 1 octubre 2022 y el 31 de enero 2023 (Booking
            window)
          </p>
        </Row>
        <Row>
          <div>
            <Table striped className="table align-middle">
              <thead>
                <tr>
                  <th>Categoría de habitación</th>
                  <th>Duración de la estadía</th>
                  <th>Puntos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="align-bottom">
                    <input
                      value="Club Room 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="radio 1"
                      onChange={handleChange}
                      checked={selection === "Club Room 3+"}
                    />
                    <label className="hotelesLabel">Club Room</label>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">10</td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <input
                      value="Premium Room 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="radio 2"
                      onChange={handleChange}
                      checked={selection === "Premium Room 3+"}
                    />
                    <label className="hotelesLabel">Premium Room</label>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">10</td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <input
                      value="Beachfront Room 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="radio 3"
                      onChange={handleChange}
                      checked={selection === "Beachfront Room 3+"}
                    />
                    <label className="hotelesLabel">Beachfront Room</label>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">10</td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <input
                      value="Royal Suite 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="checkbox 4"
                      onChange={handleChange}
                      checked={selection === "Royal Suite 3+"}
                    />
                    <label className="hotelesLabel">Royal Suite</label>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">15</td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <input
                      value="Junior Suite 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="checkbox 5"
                      onChange={handleChange}
                      checked={selection === "Junior Suite 3+"}
                    />
                    <label className="hotelesLabel">Junior Suite</label>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">15</td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <input
                      value="2 Bedroom Villas 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="checkbox 6"
                      onChange={handleChange}
                      checked={selection === "2 Bedroom Villas 3+"}
                    />
                    <label className="hotelesLabel">2 Bedroom Villas</label>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">30</td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <input
                      value="3 Bedroom Villas 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="checkbox 7"
                      onChange={handleChange}
                      checked={selection === "3 Bedroom Villas 3+"}
                    />
                    <label className="hotelesLabel">3 Bedroom Villas</label>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">30</td>
                </tr>
              </tbody>
            </Table>
            <div>
              <p className="price_legal">
               <span id="text-bold">Canje de estadías:</span> 30 puntos = 1 noche gratis con AI.
              </p>
            </div>
          </div>
        </Row>
      </Col>
    </Container>
    );
}

export default StJamesClubAntigua;