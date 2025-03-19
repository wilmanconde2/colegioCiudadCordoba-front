const year = new Date().getFullYear();

const Footer = () => {
  return (
    <>

      <div className='footer-fixed'>

        {/* redes sociales */}
        <div className="social-links d-flex">
          <a href="https://www.facebook.com/egresados.cocicor?fref=ts" target="_blank" className="social social-icon mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://x.com/iecocicor" target="_blank" className="social social-icon mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/cocicor/?hl=es-la" target="_blank" className="social social-icon mx-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCDeENgR7gNEQUfjWMRxqj7g" target="_blank" className="social social-icon mx-2">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCxtPSGwRp7kmiDf-UHKQLAw" target="_blank" className="social social-icon mx-2">
            <i className="fab fa-youtube"></i>
            <span className="kids-badge">Kids</span>
          </a>
        </div>
        <div>
          © Copyright {year}
        </div>
        <div>
          Cra. 42 B # 51-35 B/ Ciudad Córdoba Cali - Colombia
        </div>
        <div>
          Tel: 327 26 85 - 328 83 73 | Fax: 328 22 12 | Cel: 3104280125
        </div>
        <div>
          colegiociudadcordoba@hotmail.com
        </div>
      </div>

    </>
  );
};

export default Footer;
