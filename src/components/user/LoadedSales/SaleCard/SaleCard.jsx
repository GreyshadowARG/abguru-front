import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";

// table
import VerandahResort from "../Tables/VerandahResort";
import StJamesClubAntigua from "../Tables/StJamesClubAntigua";
import PineappleBeachClub from "../Tables/PineappleBeachClub";
import ABTourismAuthority from "../Tables/ABTourismAuthority";

export const SaleCard = (props) => {
  const [headerType, setHeaderType] = useState("");

  const [editState, setEditState] = useState(false);
  const [catHabitacionState, setCatHabitacionState] = useState(false);
  const [checkInState, setCheckInState] = useState(false);
  const [checkOutState, setCheckOutState] = useState(false);
  const [cantidadNochesState, setCantidadNochesState] = useState(false);
  const [montoReservaState, setMontoReservaState] = useState(false);
  const [codigoReservaState, setCodigoReservaState] = useState(false);
  const [newValidacionAB, setNewValidacionAB] = useState("");
  const [newValidacionElite, setNewValidacionElite] = useState("");

  const [habitacionSelector, setHabitacionSelector] = useState("");
  const [catHabitacion, setCatHabitacion] = useState(props.catHabitacion);
  const [reward, setReward] = useState(props.reward);
  const [fechaCheckIn, setFechaCheckIn] = useState(props.fechaCheckIn);
  const [fechaCheckOut, setFechaCheckOut] = useState(props.fechaCheckOut);
  const [cantidadNoches, setCantidadNoches] = useState(props.nightsQuantity);
  const [montoReserva, setMontoReserva] = useState(props.reserveAmount);
  const [codigoReserva, setCodigoReserva] = useState(props.codigoReserva);

  const axiosPrivate = useAxiosPrivate();

  // URL
  const DELETESALE_URL = "api/sales/deleteSale/" + props._id;
  const ADDNEWDATA_URL = "api/sales/editHabitacion/" + props._id;

  useEffect(() => {
    switch (props.validacionAB || props.validacionElite) {
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

  useEffect(() => {
    props.validacionAB === "Requiere corrección" ? setNewValidacionAB("Pendiente") : setNewValidacionAB(props.validacionAB)
    props.validacionElite === "Requiere corrección" ? setNewValidacionElite("Pendiente") : setNewValidacionElite(props.validacionElite)
    if(props.validacionElite === props.validacionAB){setNewValidacionAB("Pendiente");setNewValidacionElite("Pendiente")}
    
    // eslint-disable-next-line
  },[headerType])

  const handleCoso = () => {
    props.getDeleteState(true);
  };

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(DELETESALE_URL);
      handleCoso();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    try {
      setEditState(!editState);
    } catch (err) {
      console.log(err);
    }
  };

  const getHabitacion = (catHabitacion) => {
    setCatHabitacion(catHabitacion);
  };
  const getReward = (reward) => {
    setReward(reward);
  };

  const handleEditHabitacion = () => {
    setCatHabitacionState(!catHabitacionState);
    switch (props.hotelSelector) {
      default:
        break;
      case "The Verandah Resort & Spa":
        setHabitacionSelector(
          <VerandahResort getHabitacion={getHabitacion} getReward={getReward} />
        );
        break;
      case "St James's Club Antigua":
        setHabitacionSelector(
          <StJamesClubAntigua
            getHabitacion={getHabitacion}
            getReward={getReward}
          />
        );
        break;
      case "Pineapple Beach Club":
        setHabitacionSelector(
          <PineappleBeachClub
            getHabitacion={getHabitacion}
            getReward={getReward}
          />
        );
        break;
      case "A&B Tourism Authority":
        setHabitacionSelector(
          <ABTourismAuthority
            getHabitacion={getHabitacion}
            getReward={getReward}
          />
        );
        break;
    }
  };

  const addNewData = async () => {
    await axiosPrivate.post(
      ADDNEWDATA_URL,
      JSON.stringify({
        catHabitacion: catHabitacion,
        reward: reward,
        fechaCheckIn: fechaCheckIn,
        fechaCheckOut: fechaCheckOut,
        nightsQuantity: cantidadNoches,
        reserveAmount: montoReserva,
        codigoReserva: codigoReserva,
        validacionAB: newValidacionAB,
        validacionElite: newValidacionElite,
      })
    );
  };

  const handleSaveChanges = async () => {
    addNewData();
    setEditState(false);
    setCatHabitacionState(false);
    setCheckInState(false);
    setCheckOutState(false);
    setCantidadNochesState(false);
    setMontoReservaState(false);
    setCodigoReservaState(false);
    handleCoso();
  };

  return (
    <div className="saleslist_card">
      <div>
        <h5>
          <div className={headerType}>
            <p id="text-bold">{props?.hotelSelector}</p>
            {props?.hotelSelector === "A&B Tourism Authority" && (
              <p>Hotel: {props?.AB_Hotel}</p>
            )}
          </div>
        </h5>

        <div className="saleslist_card_body">
          <div className="saleslist_card_body_left">
            <p id="text-bold">{props?.catHabitacion}</p>
            {editState && (
              <button className="edit-button" onClick={handleEditHabitacion}>
                Editar habitación
              </button>
            )}
            {catHabitacionState && habitacionSelector}
            <br />
            <br />
            <div>
              <p id="text-bold">Check-In:</p>
              <p className="padding_right_10px" id="padding_left_3px">
                {props?.fechaCheckIn}
              </p>
              {editState && (
                <button
                  className="edit-button"
                  onClick={() => {
                    setCheckInState(!checkInState);
                  }}
                >
                  Editar Check-In
                </button>
              )}
              {checkInState && (
                <Col>
                  <input
                    type="date"
                    id="check-in"
                    onChange={(e) => setFechaCheckIn(e.target.value)}
                    required
                    aria-describedby="uidnote"
                  />
                </Col>
              )}
              <br />
              <p id="text-bold">Check-Out:</p>
              <p id="padding_left_3px">{props?.fechaCheckOut}</p>
              {editState && (
                <button
                  className="edit-button"
                  onClick={() => {
                    setCheckOutState(!checkOutState);
                  }}
                >
                  Editar Check-Out
                </button>
              )}
              {checkOutState && (
                <Col>
                  <input
                    type="date"
                    id="check-out"
                    onChange={(e) => setFechaCheckOut(e.target.value)}
                    required
                    aria-describedby="uidnote"
                  />
                </Col>
              )}
              <br />
              <br />
              <p id="text-bold">Cantidad noches:</p>
              <p id="padding_left_3px">{props?.nightsQuantity}</p>
              {editState && (
                <button
                  className="edit-button"
                  onClick={() => {
                    setCantidadNochesState(!cantidadNochesState);
                  }}
                >
                  Editar Cantidad Noches
                </button>
              )}
              {cantidadNochesState && (
                <Col>
                  <input
                    type="text"
                    id="cantidadNoches"
                    onChange={(e) => setCantidadNoches(e.target.value)}
                    required
                    aria-describedby="uidnote"
                  />
                </Col>
              )}
              <br />
              <p id="text-bold">Monto de la reserva:</p>
              <p id="padding_left_3px">{props?.reserveAmount}</p>
              {editState && (
                <button
                  className="edit-button"
                  onClick={() => {
                    setMontoReservaState(!montoReservaState);
                  }}
                >
                  Editar Monto de Reserva
                </button>
              )}
              {montoReservaState && (
                <Col>
                  <input
                    type="text"
                    id="montoReserva"
                    onChange={(e) => setMontoReserva(e.target.value)}
                    required
                    aria-describedby="uidnote"
                  />
                </Col>
              )}
            </div>
            <br />
            <p id="text-bold">Código de reserva:</p>
            <p id="padding_left_3px">{props?.codigoReserva}</p>
            {editState && (
              <button
                className="edit-button"
                onClick={() => {
                  setCodigoReservaState(!codigoReservaState);
                }}
              >
                Editar código reserva
              </button>
            )}
            {codigoReservaState && (
              <input
                className="new_sale_inputs"
                type="text"
                placeholder="Ingresa el código de reserva"
                id="codigoReserva"
                autoComplete="off"
                onChange={(e) => setCodigoReserva(e.target.value)}
                aria-describedby="uidnote"
              />
            )}
          </div>
          <div className="saleslist_card_body_right">
            <p id="text-bold" className="padding_right_10px">
            {props.rewardAB !== "None" && props.rewardElite === "None" && props?.validacionAB}
            {props.rewardAB === "None" && props.rewardElite !== "None" && props?.validacionElite}
            {props.rewardAB !== "None" && props.rewardElite !== "None" && props?.validacionElite}
            {props.rewardAB === "None" && props.rewardElite === "None" && props?.validacionAB}
            </p>
            <br />
            <br />
            {props?.validacionAB === "Pendiente" && props?.validacionElite === "Pendiente" && (
              <button id="delete-button" onClick={handleDelete}>
                Eliminar reserva
              </button>
            )}
            {((props.validacionAB === "Requiere corrección" || props?.validacionElite === "Requiere corrección") && !editState) && (
              <button id="request-button" onClick={handleEdit}>
                Editar reserva
              </button>
            )}
            {editState && (
              <button id="approve-button" onClick={handleSaveChanges}>
                Guardar cambios
              </button>
            )}
          </div>
        </div>
        {props.correctionTextAB !== "None" && (
          <div>
            <p className="salelist_card_body_correctionText">
              <span id="text-bold">Motivo: </span>
              {props.correctionTextAB}
            </p>
          </div>
        )}
        {props.correctionTextElite !== "None" && (
          <div>
            <p className="salelist_card_body_correctionText">
              <span id="text-bold">Motivo: </span>
              {props.correctionTextElite}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
