import { useRoutes } from 'react-router';
import Contacto from '../pages/Contacto';
import DeporteLudica from '../pages/DeporteLudica';
import Historia from '../pages/Historia';
import HorarioPrimaria from '../pages/HorarioPrimaria';
import HorarioSecundaria from '../pages/HorarioSecundaria';
import Inicio from '../pages/Inicio';
import ManualConvivencia from '../pages/ManualConvivencia';
import MisionVision from '../pages/MisionVision';
import Modalidades from '../pages/Modalidades';
import NoEncontrado from '../pages/NoEncontrado';
import PerfilesCCC from '../pages/PerfilesCCC';
import PQRS from '../pages/PQRS';
import Tesoreria from '../pages/Tesoreria';

const Rutas = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Inicio />,
    },
    {
      path: '/contacto',
      element: <Contacto />,
    },
    {
      path: '/deporte-ludica',
      element: <DeporteLudica />,
    },
    {
      path: '/historia',
      element: <Historia />,
    },
    {
      path: '/horario-primaria',
      element: <HorarioPrimaria />,
    },
    {
      path: '/horario-secundaria',
      element: <HorarioSecundaria />,
    },

    {
      path: '/manual-convivencia',
      element: <ManualConvivencia />,
    },
    {
      path: '/mision-vision',
      element: <MisionVision />,
    },
    {
      path: '/modalidades',
      element: <Modalidades />,
    },
    {
      path: '/perfiles-ccc',
      element: <PerfilesCCC />,
    },
    {
      path: '/pqrs',
      element: <PQRS />,
    },
    {
      path: '/tesoreria',
      element: <Tesoreria />,
    },
    {
      path: '/*',
      element: <NoEncontrado />,
    },
  ]);
  return routes;
};

export default Rutas;
