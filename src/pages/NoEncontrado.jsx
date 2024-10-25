import useTitulo from '../hooks/useTitulo';

const NoEncontrado = () => {
  useTitulo('Page Not Found');
  return (
    <>
      <div className='display-4 text-danger text-center m-4 py-5'>Page Not Found - 404</div>
    </>
  );
};

export default NoEncontrado;
