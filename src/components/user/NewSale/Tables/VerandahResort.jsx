import React, { useState, useEffect } from "react";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

function VerandahResort({getHabitacion, getReward}) {
  const [item, setItem] = useState({ selection: "" });
  const { selection } = item;
  const [habitacion, setHabitacion] = useState("");
  
  useEffect(() => {
      switch (habitacion) {
        default:
          getReward("");
          break;
  
        case "Hillside Suite 3+":
        case "Waterview Suite 3+":
        case "Superior Waterfront Suite 3+":
        case "Family Waterfront Suite 5+":
          getReward(10);
          break; 
          
        case "2 Bedroom Villa 7+":
        case "2 Bedroom Plunge Pool Villa 3+":
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
          <h2>The Verandah Resort & Spa</h2>
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
                  <th>
                    Duración de
                    <br />
                    la estadía
                  </th>
                  <th>Puntos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      value="Hillside Suite 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="radio 1"
                      onChange={handleChange}
                      checked={selection === "Hillside Suite 3+"}
                    />
                    <label className="hotelesLabel">Hillside Suite</label>
                  </td>
                  <td>3+</td>
                  <td id="color-pink">10</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <input
                      value="Waterview Suite 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="radio 2"
                      onChange={handleChange}
                      checked={selection === "Waterview Suite 3+"}
                    />
                    <label className="hotelesLabel">Waterview Suite</label>
                  </td>
                  <td>3+</td>
                  <td id="color-pink">10</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <input
                      value="Superior Waterfront Suite 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="radio 3"
                      onChange={handleChange}
                      checked={selection === "Superior Waterfront Suite 3+"}
                    />
                    <label className="hotelesLabel">
                      Superior Waterfront Suite
                    </label>
                  </td>
                  <td>3+</td>
                  <td id="color-pink">10</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <input
                      value="Family Waterfront Suite 5+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="radio 4"
                      onChange={handleChange}
                      checked={selection === "Family Waterfront Suite 5+"}
                    />
                    <label className="hotelesLabel">
                      Family Waterfront Suite
                    </label>
                  </td>
                  <td>5+</td>
                  <td id="color-pink">10</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <input
                      value="2 Bedroom Villa 7+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="radio 5"
                      onChange={handleChange}
                      checked={selection === "2 Bedroom Villa 7+"}
                    />
                    <label className="hotelesLabel">2 Bedroom Villa</label>
                  </td>
                  <td>7+</td>
                  <td id="color-pink">30</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <input
                      value="2 Bedroom Plunge Pool Villa 3+"
                      type="checkbox"
                      id="custom-switch"
                      aria-label="radio 6"
                      onChange={handleChange}
                      checked={selection === "2 Bedroom Plunge Pool Villa 3+"}
                    />
                    <label className="hotelesLabel">
                      2 Bedroom Plunge Pool Villa
                    </label>
                  </td>
                  <td>3+</td>
                  <td id="color-pink">30</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
            <div>
              <p className="price_legal">
                <span id="text-bold">Canje de estadías:</span> 30 puntos = 1
                noche gratis con AI.
              </p>
            </div>
          </div>
        </Row>
      </Col>
    </Container>
  );
}

export default VerandahResort;
