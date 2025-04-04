import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '/logo.png';
import ppf from '/ppf.png';
import club from '/clubCCC.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleNavLinkClick = () => {
    setIsNavbarOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
      <div className='container-fluid'>
        <div className='navbar-logo ppf'>
          <img src={ppf} alt='logo' />
        </div>
        <div className='navbar-logo club'>
          <img src={club} alt='logo' />
        </div>
        <div className='navbar-logo logo'>
          <img src={logo} alt='logo' />
        </div>
        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          aria-expanded={isNavbarOpen ? 'true' : 'false'}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}
          id='navbarNavDropdown'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink
                className='nav-link active'
                aria-current='page'
                to='/'
                onClick={handleNavLinkClick}
              >
                Inicio
              </NavLink>
            </li>
            <li className='nav-item dropdown'>
              <NavLink
                className='nav-link dropdown-toggle'
                to='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Nosotros
              </NavLink>
              <ul className='dropdown-menu'>
                <li>
                  <NavLink className='dropdown-item' to='/historia' onClick={handleNavLinkClick}>
                    Historia
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='dropdown-item'
                    to='/perfiles-ccc'
                    onClick={handleNavLinkClick}
                  >
                    Perfiles
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='dropdown-item'
                    to='/manual-convivencia'
                    onClick={handleNavLinkClick}
                  >
                    Manual de Convivencia
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='dropdown-item'
                    to='/mision-vision'
                    onClick={handleNavLinkClick}
                  >
                    Misión y Visión
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className='nav-item dropdown'>
              <NavLink
                className='nav-link dropdown-toggle'
                to='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Servicios
              </NavLink>
              <ul className='dropdown-menu'>
                <li>
                  <NavLink className='dropdown-item' to='/modalidades' onClick={handleNavLinkClick}>
                    Modalidades
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='dropdown-item'
                    to='/deporte-ludica'
                    onClick={handleNavLinkClick}
                  >
                    Deporte y Ludica
                  </NavLink>
                </li>
                <li>
                  <a
                    className='dropdown-item'
                    href='http://ieccc.no-ip.biz:90/inicio'
                    target='_blank'
                  >
                    Admin
                  </a>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/pqrs' onClick={handleNavLinkClick}>
                PQRS
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/contacto' onClick={handleNavLinkClick}>
                Contáctanos
              </NavLink>
            </li>
          </ul>

          {/* redes sociales */}
          <div className='social-links d-flex'>
            <a
              href='https://www.facebook.com/egresados.cocicor?fref=ts'
              target='_blank'
              className='social-icon mx-2'
            >
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href='https://x.com/iecocicor' target='_blank' className='social-icon mx-2'>
              <i className='fab fa-twitter'></i>
            </a>
            <a
              href='https://www.instagram.com/cocicor/?hl=es-la'
              target='_blank'
              className='social-icon mx-2'
            >
              <i className='fab fa-instagram'></i>
            </a>
            <a
              href='https://www.youtube.com/channel/UCDeENgR7gNEQUfjWMRxqj7g'
              target='_blank'
              className='social-icon mx-2'
            >
              <i className='fab fa-youtube'></i>
            </a>
            <a
              href='https://www.youtube.com/channel/UCxtPSGwRp7kmiDf-UHKQLAw'
              target='_blank'
              className='social-icon mx-2 ytkids'
            >
              <i className='fab fa-youtube'></i>
              <span className='kids-badge'>Kids</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
