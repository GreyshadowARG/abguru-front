import { useState } from "react";
import Navbar from "../../nav/NavbarUser";
import Footer from "../../layout/Footer";

// imagenes
import abGuruLogo from "../../../assets/images/abguru_logo.png";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const Prizes = () => {
  const [hotelSelector, setHotelSelector] = useState("");

  const hotelTable = () => {
    switch (hotelSelector) {
      default:
        return ("");

      // The Verandah Resort & Spa
      case "The Verandah Resort & Spa":
        return (
          <div>
            <h5 id="color-pink">The Verandah Resort & Spa</h5>
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
                  <td>
                    <p className="hotelesLabel">Hillside Suite</p>
                  </td>
                  <td>3+</td>
                  <td id="color-pink">10</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <p className="hotelesLabel">Waterview Suite</p>
                  </td>
                  <td>3+</td>
                  <td id="color-pink">10</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <p className="hotelesLabel">Superior Waterfront Suite</p>
                  </td>
                  <td>3+</td>
                  <td id="color-pink">10</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <p className="hotelesLabel">Family Waterfront Suite</p>
                  </td>
                  <td>5+</td>
                  <td id="color-pink">10</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <p className="hotelesLabel">2 Bedroom Villa</p>
                  </td>
                  <td>7+</td>
                  <td id="color-pink">30</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <p className="hotelesLabel">2 Bedroom Plunge Pool Villa</p>
                  </td>
                  <td>3+</td>
                  <td id="color-pink">30</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        );
      case "St James's Club Antigua":
        return (
          <div>
            <h5 id="color-pink">St James's Club Antigua</h5>
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
                    <p className="hotelesLabel">Club Room</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    10
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">Premium Room</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    10
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">Beachfront Room</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    10
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">Royal Suite</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    15
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">Junior Suite</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    15
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">2 Bedroom Villas</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    30
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">3 Bedroom Villas</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    30
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        );
      case "Pineapple Beach Club":
        return (
          <div>
            <h5 id="color-pink">Pineapple Beach Club</h5>
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
                    <p className="hotelesLabel">Pool Terrace room</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    10
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">Gardenview room</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    10
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">Oceanview room</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    10
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">Beachfront room</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    10
                  </td>
                </tr>
                <tr>
                  <td className="align-bottom">
                    <p className="hotelesLabel">Waterfront room</p>
                  </td>
                  <td className="align-bottom">3+</td>
                  <td className="align-bottom" id="color-pink">
                    15
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        );
    }
  };

  return (
    <div className="main_container">
      <div>
        <img src={abGuruLogo} alt="" className="logo_header" />
      </div>
      <section>
        <Navbar />
        <div className="section_container">
          <h2>Premios disponibles</h2>
          <div className="section_prizes_main">
            <p id="text-bold">
              ¡Con tus reservas a Antigua y Barbuda puedes acceder a distintos
              premios!
            </p>
            <p>
              ¡Si tu reserva corresponde a alguno de los hoteles participantes
              de la cadena Elite tienes doble chance!
              <br />
              Canjea tus puntos obtenidos al registrar reservas en los{" "}
              <span id="color-pink">hoteles de la cadena Elite</span> por
              estadías All Inclusive gratis. Al mismo tiempo que sumas también
              la posibilidad de participar por los premios adicionales que
              otorga la{" "}
              <span id="color-pink">
                Autoridad de Turismo de Antigua y Barbuda
              </span>{" "}
              (Gift Cards, Free Tours, Viajes de premio y posibilidad de
              participar en un FAM Tour).
              <br />
              <br />
              Si tu reserva corresponde a otro hotel de Antigua y Barbuda,
              podrás registrar tus ventas y obtener los premios que otorga esta
              autoridad del destino (Gift Cards, Free Tours, Viajes de premio y
              posibilidad de participar en un FAM Tour).
            </p>
            <p>
              Para reservas entre el 1 octubre 2022 y el 31 de enero 2023
              (Booking window)
            </p>
          </div>
          <div className="section_prizes_main">
            <h4 id="text-bold">Antigua y Barbuda Tourism Authority</h4>
            <div className="align_middle">
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
                      <p className="hotelesLabel">
                        1 Reserva de 5 a 7 noches de alojamiento
                      </p>
                    </td>
                    <td className="align-bottom" id="color-pink">
                      50 usd Gift Card *
                    </td>
                  </tr>
                  <tr>
                    <td className="align-bottom">
                      <p className="hotelesLabel">
                        1 Reserva de 8 noches de alojamiento o más
                      </p>
                    </td>
                    <td className="align-bottom" id="color-pink">
                      Free tour **
                    </td>
                  </tr>
                  <tr>
                    <td className="align-bottom">
                      <p className="hotelesLabel">
                        1 Reserva al destino a partir de 5.000usd
                      </p>
                    </td>
                    <td className="align-bottom" id="color-pink">
                      Fam Trip Seat chance ***
                    </td>
                  </tr>
                  <tr>
                    <td className="align-bottom">
                      <p className="hotelesLabel">
                        El agente con más ventas (que cumpla con más de 10
                        reservas al destino)
                        <br /> o con ventas de un valor de 25.000 uds o más.
                      </p>
                    </td>
                    <td className="align-bottom" id="color-pink">
                      Prize Trip ****
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="section_prizes_main_details">
              <p>
                <span id="text-bold">*</span> Los agentes de viaje que realicen
                reservas de 5 a 7 noches de alojamiento podrán canjear su
                reserva por una Gift Card de Amazon.
              </p>
              <br />
              <p>
                <span id="text-bold">**</span> El premio “FREE TOUR” consistirá
                en una excursión en Antigua y Barbuda por la isla que podrá ser
                utilizada por el agente de viajes o transferible a su cliente.
              </p>
              <br />
              <p>
                <span id="text-bold">***</span> Los agentes de viaje podrán
                acceder a la chance de participar en un Fam Tour con una reserva
                al destino de acuerdo al monto de la venta según las siguientes
                condiciones:
                <br />- Ventas entre 5.000 y 10.000usd: Alojamiento y traslados
                gratuitos + descuento en el pasaje aéreo.
                <br />- Ventas de más de 10.000usd: Alojamiento, traslados y
                pasaje aéreo gratis.
              </p>
              <br />
              <p>
                <span id="text-bold">****</span> El agente que realice más
                reservas al destino (Con 10 reservas como mínimo) o que tenga
                reservas por un valor de 25.000 usd o más, podrá acceder a un
                viaje de premio todo pago. (Pasaje aéreo, alojamiento y
                traslados).
              </p>
              <br/>
              <p>Los premios no son acumulables.</p>
            </div>
          </div>
          <br />
          <div className="section_prizes_main">
            <h5 id="text-bold">Hoteles de cadena Elite</h5>
            <h4 id="text-bold">
              The Verandah Resort & Spa, St James's Club Antigua y Pineapple
              Beach Club
            </h4>
            <p>
              Obtenga puntos para canjear por noches gratis. Puede canjear un
              máximo de 7 noches gratis por año calendario. Las noches gratis se
              pueden canjear entre octubre 2022 y diciembre 2023). Black out
              dates: Dec 20-Jan 3, Feb 1-28, Mar 10-April 20, 2023. No
              combinable con otras promociones.
            </p>
            <p className="price_legal">
              <span id="text-bold">Canje de estadías:</span> 30 puntos = 1 noche
              gratis con AI.
            </p>
            <div>
              <select
                className="new_sale_inputs"
                id="hotelSelector"
                value={hotelSelector}
                onChange={(e) => {
                  setHotelSelector(e.target.value);
                }}
                name="hotelSelector"
              >
                <option value="">
                  -- Selecciona un hotel de la cadena para ver su tabla de
                  puntos --
                </option>
                <option value="The Verandah Resort & Spa">
                  The Verandah Resort & Spa
                </option>
                <option value="St James's Club Antigua">
                  St James's Club Antigua
                </option>
                <option value="Pineapple Beach Club">
                  Pineapple Beach Club
                </option>
              </select>
            </div>
            <br />
            <div>{hotelTable()}</div>            
          </div>
          <br />
          <p className="loadedsales_legal">
            Para cualquier duda o consulta comunícate a nuestro mail de
            contacto:{" "}
            <a href="mailto:gurus@aybgurusrewards.com">
              gurus@aybgurusrewards.com
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Prizes;
