import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

const ManualConvivencia = () => {
  useTitulo('Manual de Convivencia');

  // Función para descargar el PDF
  const handleDownload = () => {
    const pdfUrl = '/manualConvivencia.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Manual_Convivencia_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='fullContainerManual'>
      <div className='imgManualContainer'>
        <img className='imgManual' src={CLOUDINARY_ASSETS.manual} alt='imagen' width='400' height='400' />
      </div>
      <div className='containerManual'>
        <h1>MANUAL DE CONVIVENCIA 2026</h1>
        <h2 className='manual'>Colegio Ciudad Córdoba</h2>
        <button type='button' className='btn btn-primary btnManual' onClick={handleDownload}>
          Descargar
        </button>
      </div>
    </div>
  );
};

export default ManualConvivencia;
