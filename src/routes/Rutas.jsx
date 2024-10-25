import { useRoutes } from 'react-router';
import Inicio from '../pages/Inicio';
import Nosotros from '../pages/Nosotros';
import Contacto from '../pages/Contacto';
import NoEncontrado from '../pages/NoEncontrado';

const Rutas = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Inicio />,
    },
    {
      path: '/nosotros',
      element: <Nosotros />,
    },
    {
      path: '/contacto',
      element: <Contacto />,
    },
    {
      path: '/*',
      element: <NoEncontrado />,
    },
  ]);
  return routes;
};

export default Rutas;
