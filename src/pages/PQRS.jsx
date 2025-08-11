import useTitulo from '../hooks/useTitulo';

const WHATSAPP_NUMBER = '573104280125';
const MENSAJE_PREDEFINIDO = 'Hola, necesito ayuda con un PQRS.';

const PQRS = () => {
  useTitulo('PQRS');

  const handleClick = () => {
    const url = new URL('https://api.whatsapp.com/send');
    url.searchParams.set('phone', String(WHATSAPP_NUMBER).replace(/[^\d]/g, ''));
    url.searchParams.set('text', MENSAJE_PREDEFINIDO.trim());

    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='fullContainer'>
      <div className='imgPQRSContainer'>
        <img className='imgPQRS' src='/pqrs.webp' alt='imagen' />
      </div>
      <div className='btn-container'>
        <button className='btn-pqrs' onClick={handleClick}>
          Da clic aquí y escríbenos
        </button>
      </div>
    </div>
  );
};

export default PQRS;
