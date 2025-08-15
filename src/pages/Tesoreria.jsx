import useTitulo from '../hooks/useTitulo';

const Tesoreria = () => {
  useTitulo('Tesorería');

  return (
    <>
      <div className='fullContainerCostos'>
        <h1>Costos Educativos y Medios de Pago</h1>
        <div className='imgCostosContainer'>
          <img src='/costos2025.png' alt='costos2025' className='imgCostos' />
        </div>
        <div className='infoCostos'>
          <h5>Medios de pago:</h5>
          <p>- Tesorería de la institución (efectivo o datáfono) </p>
          <p>
            <a href='https://www.avalpaycenter.com/wps/portal/portal-de-pagos/web/pagos-aval/resultado-busqueda/realizar-pago?idConv=00024146&origen=buscar'>
              <img src='/pse.webp' alt='pse' className='pseCostos' />
            </a>
          </p>
          <p className='notaCodigo'>
            Recuerde tener a la mano el código del estudiante (número de 5 dígitos) el cual lo puede
            obtener en los boletines, recibos de pago anteriores, carnet estudiantil o en la{' '}
            <a href='https://colegiociudadcordoba.edu.co' target= '_blank' >página</a> principal del colegio.
          </p>
        </div>
      </div>
    </>
  );
};

export default Tesoreria;
