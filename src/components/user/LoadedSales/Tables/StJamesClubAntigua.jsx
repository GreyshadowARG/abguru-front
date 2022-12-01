import React, { useState, useEffect } from "react";

function StJamesClubAntigua({ getHabitacion, getReward }) {
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
        <option value="Club Room 3+">Club Room 3+</option>
        <option value="Premium Room 3+">Premium Room 3+</option>
        <option value="Beachfront Room 3+">Beachfront Room 3+</option>
        <option value="Royal Suite 3+">Royal Suite 3+</option>
        <option value="Junior Suite 3+">Junior Suite 3+</option>
        <option value="2 Bedroom Villas 3+">2 Bedroom Villas 3+</option>
        <option value="3 Bedroom Villas 3+">3 Bedroom Villas 3+</option>
      </select>
    </div>
  );
}

export default StJamesClubAntigua;
