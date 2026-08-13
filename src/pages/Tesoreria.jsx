// src/pages/Tesoreria.jsx

import useTitulo from '../hooks/useTitulo';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';
import Formulario from '../components/Formulario';

const Tesoreria = () => {
  useTitulo('Tesorería');

  return (
    <>
      <div className='fullContainerCostos'>
        <h1>Costos Educativos y Medios de Pago</h1>
        <div className='imgCostosContainer'>
          <img src={CLOUDINARY_ASSETS.costos2026} alt='costos2025' className='imgCostos' width='2000' height='1308' />
        </div>
        <div className='infoCostos'>
          <h2>Medios de pago:</h2>
          <p>
            <a href='https://www.avalpaycenter.com/wps/portal/portal-de-pagos/web/pagos-aval/resultado-busqueda/realizar-pago?idConv=00024146&origen=buscar'>
              <img src={CLOUDINARY_ASSETS.pse} alt='pse' className='pseCostos' width='350' height='350' />
            </a>
          </p>
          <p>Tesorería de la institución</p>
          <ul>
            <li>Efectivo</li>
            <li>
              Datáfono {''}
              <i>
                <u>(tiene costo adicional)</u>
              </i>
            </li>
          </ul>
          <p className='notaCodigo'>
            Recuerde tener a la mano el código del estudiante (número de 5 dígitos) el cual lo puede
            obtener en los boletines, recibos de pago anteriores, carnet estudiantil o en el
            siguiente formulario.
          </p>
        </div>
        <Formulario typesearch='mensualidad' />
      </div>
    </>
  );
};

export default Tesoreria;
