const dateTime = new Date().toLocaleString();

const Footer = () => {
  return (
    <>
     
        <div className='footer-fixed'>{dateTime} | KRAKEN</div>
     
    </>
  );
};

export default Footer;
