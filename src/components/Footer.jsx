const year = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <div className='footer-fixed'>
        {/* redes sociales */}
        <div className='social-links d-flex'>
          <a
            href='https://drive.google.com/drive/folders/1WQxB8YcoqMrXuf9HG3P9DjbKSxGSifbk'
            target='_blank'
            className='social social-icon mx-2'
          >
            <img src='/dian.svg' alt='DIAN' className='dian-icon' />
          </a>
          <a
            href='https://www.facebook.com/egresados.cocicor?fref=ts'
            target='_blank'
            className='social social-icon mx-2'
          >
            <i className='fab fa-facebook-f'></i>
          </a>
          <a href='https://x.com/iecocicor' target='_blank' className='social social-icon mx-2'>
            <i className='fab fa-twitter'></i>
          </a>
          <a
            href='https://www.instagram.com/cocicor/?hl=es-la'
            target='_blank'
            className='social social-icon mx-2'
          >
            <i className='fab fa-instagram'></i>
          </a>
          <a
            href='https://www.youtube.com/channel/UCDeENgR7gNEQUfjWMRxqj7g'
            target='_blank'
            className='social social-icon mx-2'
          >
            <i className='fab fa-youtube'></i>
          </a>
          <a
            href='https://www.youtube.com/channel/UCxtPSGwRp7kmiDf-UHKQLAw'
            target='_blank'
            className='social social-icon mx-2'
          >
            <i className='fab fa-youtube ytk'>
              <span className='kids-badge'>Kids</span>
            </i>
          </a>
        </div>
        <div>
          © {year} &middot; by Kraken Digital &middot;
          <a href={'https://github.com/wilmanconde2'} target='_blank' rel='noopener noreferrer'>
            <img
              className='redesSociales'
              src='/githubWhite.png'
              alt='Github icons created by -Artist - Flaticon'
            />
          </a>
          <a
            href={'https://www.linkedin.com/in/wilman-conde/'}
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
