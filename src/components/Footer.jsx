// src/components/Footer.jsx

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <div className='footer-fixed'>
        {/* redes sociales */}
        <div className='social-links d-flex'>
          <a
            href='/dian'
            className='social social-icon mx-2'
          >
            <img src='/dian.svg' alt='DIAN' className='dian-icon' />
          </a>
          <a
            href='https://www.facebook.com/egresados.cocicor?fref=ts'
            target='_blank'
            rel='noopener noreferrer'
            className='social social-icon mx-2'
          >
            <FaFacebookF aria-hidden='true' />
          </a>
          <a
            href='https://x.com/iecocicor'
            target='_blank'
            rel='noopener noreferrer'
            className='social social-icon mx-2'
          >
            <FaTwitter aria-hidden='true' />
          </a>
          <a
            href='https://www.instagram.com/cocicor/?hl=es-la'
            target='_blank'
            rel='noopener noreferrer'
            className='social social-icon mx-2'
          >
            <FaInstagram aria-hidden='true' />
          </a>
          <a
            href='https://www.youtube.com/channel/UCDeENgR7gNEQUfjWMRxqj7g'
            target='_blank'
            rel='noopener noreferrer'
            className='social social-icon mx-2'
          >
            <FaYoutube aria-hidden='true' />
          </a>
          <a
            href='https://www.youtube.com/channel/UCxtPSGwRp7kmiDf-UHKQLAw'
            target='_blank'
            rel='noopener noreferrer'
            className='social social-icon mx-2'
          >
            <span className='ytk'>
              <FaYoutube aria-hidden='true' />
              <span className='kids-badge'>Kids</span>
            </span>
          </a>
        </div>

        <div>
          © {year} &middot; Desarrollado por{' '}
          <a href='https://krakendigitalsd.netlify.app/' target='_blank' rel='noopener noreferrer'>
            KrakenDigitalSD
          </a>{' '}
          &middot;
          <a href='https://github.com/wilmanconde2' target='_blank' rel='noopener noreferrer'>
            <img
              className='redesSociales'
              src='/githubWhite.png'
              alt='Github icons created by -Artist - Flaticon'
            />
          </a>
          <a
            href='https://www.linkedin.com/in/wilman-conde/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className='redesSociales'
              src='/linkedinWhite.png'
              alt='Linkedin icons created by Smashicons - Flaticon'
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;