import { useState, useEffect } from "react";

export const ABrewardCard = (props) => {
  const [headerType, setHeaderType] = useState("");

  useEffect(() => {
    switch (props.rewardState) {
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
          <h5 id="text-bold">{props?.rewardState}</h5>
        </div>
        <div className="saleslist_card_body">
          <div className="saleslist_card_body_left">
            <p id="text-bold">{props?.ABreward}</p>
          </div>
          <div className="saleslist_card_body_right">
            <p className="padding_right_10px" id="padding_left_3px">
              <span id="text-bold">
                {props?.firstName} {props?.lastName}
              </span>
            </p>
          </div>
        </div>
        {props.denyText !== "None" && (
          <div>
            <p className="salelist_card_body_correctionText">
              <span id="text-bold">Reason for denial: </span>
              {props.denyText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
