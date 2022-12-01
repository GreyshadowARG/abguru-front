import React from 'react';

// imagenes
import abGuruLogo from '../../assets/images/abguru_logo.png'
import AyBLogo from '../../assets/images/antiguaBarbuda_logo.png';
import emMarketingLogo from '../../assets/images/em_logo_small.png';

export default function Footer() {
  return (
  <div className="footer_container">
    <div className="footer_container__imgs_left">
        <img src={abGuruLogo} alt="" className="abGuruLogo" />
        <img src={AyBLogo} alt="" className="AyBLogo" />
    </div>
    <div className="footer_container__imgs_right">
        <img src={emMarketingLogo} alt="" className="emMarketingLogo" />
    <p className="footer__em_text"><span style={{fontWeight: 'bold'}}>Contacto</span> - EM Marketing Communication. Mail: <a href="mailto:gurus@aybgurusrewards.com">gurus@aybgurusrewards.com</a></p>
    </div>          
</div>
  )
}

