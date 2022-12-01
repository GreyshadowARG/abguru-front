import React, { useState, useEffect } from "react";

function ABTourismAuthority({ getHabitacion, getReward }) {
  const [habitacion, setHabitacion] = useState("");

  useEffect(() => {
    switch (habitacion) {
      default:
        getReward("");
        break;

      case "1 Reserva de 5 a 7 noches de alojamiento":
        getReward("50 usd Gift Card");
        break;

      case "1 Reserva de 8 noches de alojamiento o más":
        getReward("Free tour");
        break;

      case "1 Reserva al destino a partir de 5.000usd":
        getReward("Fam Trip Seat chance");
        break;

      case "El agente con más ventas (que cumpla con más de 10 reservas al destino) o con ventas de un valor de 25.000 uds o más.":
        getReward("Prize Trip");
        break;
    }
    // eslint-disable-next-line
  }, [habitacion]);

  const handleChange = (e) => {
    e.persist();
    setHabitacion(e.target.value);
    getHabitacion(e.target.value);
  };

  return (
    <div>
      <select
        className="new_sale_inputs"
        id="AB_HotelSelector"
        onChange={handleChange}
        required
        name="AB_HotelSelector"
      >
        <option value="">-- Selecciona la categoría de habitación --</option>
        <option value="1 Reserva de 5 a 7 noches de alojamiento">
          1 Reserva de 5 a 7 noches de alojamiento
        </option>
        <option value="1 Reserva de 8 noches de alojamiento o más">
          1 Reserva de 8 noches de alojamiento o más
        </option>
        <option value="1 Reserva al destino a partir de 5.000usd">
          1 Reserva al destino a partir de 5.000usd
        </option>
        <option value="El agente con más ventas (que cumpla con más de 10 reservas al destino) o con ventas de un valor de 25.000 uds o más.">
          El agente con más ventas o con ventas de un valor de 25.000 uds o más
        </option>
      </select>
    </div>
  );
}

export default ABTourismAuthority;
