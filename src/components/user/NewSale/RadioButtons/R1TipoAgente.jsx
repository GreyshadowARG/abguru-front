import React, { useState } from "react";

const R1TipoAgente = ({ getTipoAgente }) => {
  const [tipoAgente, setTipoAgente] = useState("");

  const [item, setItem] = useState({ selection: "" });
  const { selection } = item;

  const handleChangeCheck = (e) => {

    setItem((prevState) => ({
      ...prevState,
      selection: e.target.value,
    }));

    setTipoAgente(e.target.value)
    getTipoAgente(e.target.value)
  };

  const handleInput = (e) => {
    getTipoAgente(e.target.value)
  };


  return (
    <div>
      <div>
        <input
          type="radio"
          value="Agencia Minorista"
          aria-label="radio 1"
          checked={selection === "Agencia Minorista"}
          onChange={handleChangeCheck}
          required
        />
        <label className="padding_right_10px">Agencia Minorista</label>

        <input
          
          type="radio"
          value="Agente de viajes independiente"
          aria-label="radio 2"
          checked={selection === "Agente de viajes independiente"}
          onChange={handleChangeCheck}
        />
        <label>Agente de viaje independiente</label>
      </div>

      {tipoAgente === "Agencia Minorista" && (
        <div>
          <input
            className="new_sale_inputs"
            type="text"
            placeholder="Escribe el nombre de la Agencia"
            id="operadorMayorista"
            onChange={handleInput}
            required
            aria-describedby="uidnote"
          />
        </div>
      )}
    </div>
  );
};

export default R1TipoAgente;
