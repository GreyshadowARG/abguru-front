import { useState, useEffect } from "react";

// bootstrap
import Col from "react-bootstrap/Col";

export const ABSalesCard = (props) => {
  const [headerType, setHeaderType] = useState("");

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

  return (
    <div className="saleslist_card">
      <div>
        <div className={headerType}>
          <h5 id="text-bold">{props?.validacionAB}</h5>
        </div>
        <div className="saleslist_card_body">
          <Col xs={8}>
            <p id="text-bold">{props?.hotelSelector}</p>
            {props?.hotelSelector === "A&B Tourism Authority" && (
              <p> Hotel: {props?.AB_Hotel}</p>
            )}
            <br />
            <p>{props?.catHabitacion}</p>
            <br />
            <div>
              <p id="text-bold">Reservation code:</p>
              <p id="padding_left_3px">{props?.codigoReserva}</p>
              <br />
            </div>
          </Col>
          <Col xs={4}>
            <p className="padding_right_10px" id="padding_left_3px">
              <span id="text-bold">
                {props?.firstName} {props?.lastName}
              </span>
            </p>
            <br />
            <p className="padding_right_10px" id="padding_left_3px">
              {props?.tipoAgente}
            </p>
            <br />
            <p className="padding_right_10px" id="padding_left_3px">
              {props?.procesadaPor}
            </p>
          </Col>
        </div>
      </div>
    </div>
  );
};
