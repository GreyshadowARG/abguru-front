import React, { useState, useEffect } from "react";

function VerandahResort({ getHabitacion, getReward }) {
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
        <option value="Hillside Suite 3+">Hillside Suite 3+</option>
        <option value="Waterview Suite 3+">Waterview Suite 3+</option>
        <option value="Superior Waterfront Suite 3+">
          Superior Waterfront Suite 3+
        </option>
        <option value="Family Waterfront Suite 5+">
          Family Waterfront Suite 5+
        </option>
        <option value="2 Bedroom Villa 7+">2 Bedroom Villa 7+</option>
        <option value="2 Bedroom Plunge Pool Villa 3+">
          2 Bedroom Plunge Pool Villa 3+
        </option>
      </select>
    </div>
  );
}

export default VerandahResort;
