import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

const PsePaymentCta = ({ href }) => (
  <div className='psePaymentCta'>
    <div className='pseHint pseHintLeft' aria-hidden='true'>
      <span>Haz clic aquí</span>
      <FaArrowRight />
    </div>
    <a
      href={href}
      className='pseCta'
      aria-label='Pagar con PSE'
      target='_blank'
      rel='noopener noreferrer'
    >
      <img src={CLOUDINARY_ASSETS.pse} alt='PSE' className='pseCostos' width='350' height='350' />
    </a>
    <div className='pseHint pseHintRight' aria-hidden='true'>
      <FaArrowLeft />
      <span>Paga aquí</span>
    </div>
  </div>
);

PsePaymentCta.propTypes = {
  href: PropTypes.string.isRequired,
};

export default PsePaymentCta;
