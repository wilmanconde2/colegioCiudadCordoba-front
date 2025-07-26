import { FaWhatsapp } from 'react-icons/fa';

const BotonWhatsapp = () => {
  const numero = '573104280125';

  return (
    <a
      href={`https://wa.me/${numero}`}
      target='_blank'
      rel='noopener noreferrer'
      className='whatsapp-float'
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default BotonWhatsapp;
