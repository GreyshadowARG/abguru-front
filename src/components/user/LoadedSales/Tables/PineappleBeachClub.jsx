import React, { useState, useEffect } from "react";

function PineappleBeachClub({ getHabitacion, getReward }) {
  const [habitacion, setHabitacion] = useState("");

  useEffect(() => {
    switch (habitacion) {
      default:
        getReward("");
        break;

      case "Pool Terrace room 3+":
      case "Gardenview room 3+":
      case "Oceanview room 3+":
      case "Beachfront room 3+":
        getReward(10);
        break;

      case "Waterfront room 3+":
        getReward(15);
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
        <option value="Pool Terrace room 3+">Pool Terrace room 3+</option>
        <option value="Gardenview room 3+">Gardenview room 3+</option>
        <option value="Oceanview room 3+">Oceanview room 3+</option>
        <option value="Beachfront room 3+">Beachfront room 3+</option>
        <option value="Waterfront room 3+">Waterfront room 3+</option>
      </select>
    </div>
  );
}

export default PineappleBeachClub;
