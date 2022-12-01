import React from "react";

// imagenes
import verandah from '../../assets/images/verandah_final.jpg';
import pinneapple_final from '../../assets/images/pinneapple_final.jpg';
import st_james_final from '../../assets/images/st_james_final.jpg';

const HotelsBanner = () => {
  return (
    <div className="hotelsBanner_container">
      <h2>Hoteles Participantes</h2>
      <div >
        <img src={verandah} alt="" className="hotelsBanner_img" />
        <img src={pinneapple_final} alt="" className="hotelsBanner_img" />
        <img src={st_james_final} alt="" className="hotelsBanner_img" />
      </div>
      <p>Próximamente nuevos hoteles participantes</p>
    </div>
  );
};

export default HotelsBanner;
