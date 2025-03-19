import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '/logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
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
        <NavLink className='navbar-logo' to='#'>
          <img src={logo} alt='logo' />
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link active' aria-current='page' to='#'>
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
                  <NavLink className='dropdown-item' to='#'>
                    Historia
                  </NavLink>
                </li>
                <li>
                  <NavLink className='dropdown-item' to='#'>
                    Perfiles
                  </NavLink>
                </li>
                <li>
                  <NavLink className='dropdown-item' to='#'>
                    Manual de Convivencia
                  </NavLink>
                </li>
                <li>
                  <NavLink className='dropdown-item' to='#'>
                    Mision y Vision
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
                  <NavLink className='dropdown-item' to='#'>
                    Modalidades
                  </NavLink>
                </li>
                <li>
                  <NavLink className='dropdown-item' to='#'>
                    Formación Deportiva
                  </NavLink>
                </li>
                <li>
                  <NavLink className='dropdown-item' to='#'>
                    Actividades Ludicas
                  </NavLink>
                </li>
                <li>
                  <NavLink className='dropdown-item' to='#'>
                    Programa de Cobertura
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='#'>
                PQRS
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='#'>
                Contactanos
              </NavLink>
            </li>
          </ul>

          {/* redes sociales */}
          <div className="social-links d-flex">
            <a href="https://www.facebook.com/egresados.cocicor?fref=ts" target="_blank" className="social-icon mx-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://x.com/iecocicor" target="_blank" className="social-icon mx-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/cocicor/?hl=es-la" target="_blank" className="social-icon mx-2">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCDeENgR7gNEQUfjWMRxqj7g" target="_blank" className="social-icon mx-2">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCxtPSGwRp7kmiDf-UHKQLAw" target="_blank" className="social-icon mx-2">
              <i className="fab fa-youtube"></i>
              <span className="kids-badge">Kids</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
