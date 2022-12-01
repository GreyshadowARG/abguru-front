import React, { useState } from "react";

const R2ProcesadaPor = ({ getProcesadaPor }) => {
  const [procesadaPor, setProcesadaPor] = useState("");

  const [item, setItem] = useState({ selection: "" });
  const { selection } = item;

  const handleChangeCheck = (e) => {
    e.persist();

    setItem((prevState) => ({
      ...prevState,
      selection: e.target.value,
    }));

    setProcesadaPor(e.target.value);
    getProcesadaPor(e.target.value)

  };

  const handleInput = (e) => {
    getProcesadaPor(e.target.value);
  };

  return (
    <div>
      <label className="R2_radios">Reserva procesada a través de:</label>
      <div>
        <input
          type="radio"
          value="Operador mayorista responsable"
          aria-label="radio 1"
          checked={selection === "Operador mayorista responsable"}
          onChange={handleChangeCheck}
          required
        />
        <label className="padding_right_10px">Operador responsable mayorista</label>
        <input
          type="radio"
          value="Venta directa de la agencia"
          aria-label="radio 2"
          checked={selection === "Venta directa de la agencia"}
          onChange={handleChangeCheck}
          required
        />
        <label>Venta directa de la agencia</label>
      </div>
      {procesadaPor === "Operador mayorista responsable" && (
        <div>
          <input
            className="new_sale_inputs"
            type="text"
            placeholder="Escribe el nombre del operador mayorista"
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

export default R2ProcesadaPor;
