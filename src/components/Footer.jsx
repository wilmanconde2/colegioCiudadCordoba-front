const dateTime = new Date().toLocaleString();

const Footer = () => {
  return (
    <footer>
      <div className='footer-fixed'>{dateTime} | WC2 | willconde2@hotmail.com</div>
    </footer>
  );
};

export default Footer;
