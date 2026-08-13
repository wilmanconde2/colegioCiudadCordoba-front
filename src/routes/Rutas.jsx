// src/routes/Rutas.jsx

import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router';
import Inicio from '../pages/Inicio';

const Contacto = lazy(() => import('../pages/Contacto'));
const Cronograma2026 = lazy(() => import('../pages/Cronograma2026'));
const DeporteLudica = lazy(() => import('../pages/DeporteLudica'));
const DIAN = lazy(() => import('../pages/DIAN'));
const Historia = lazy(() => import('../pages/Historia'));
const HorarioCoordinadores = lazy(() => import('../pages/HorarioCoordinadores'));
const HorarioPrimaria = lazy(() => import('../pages/HorarioPrimaria'));
const HorarioPsicologia = lazy(() => import('../pages/HorarioPsicologia'));
const HorarioSecundaria = lazy(() => import('../pages/HorarioSecundaria'));
const ManualConvivencia = lazy(() => import('../pages/ManualConvivencia'));
const MisionVision = lazy(() => import('../pages/MisionVision'));
const Modalidades = lazy(() => import('../pages/Modalidades'));
const NoEncontrado = lazy(() => import('../pages/NoEncontrado'));
const PerfilesCCC = lazy(() => import('../pages/PerfilesCCC'));
const PQRS = lazy(() => import('../pages/PQRS'));
const Tesoreria = lazy(() => import('../pages/Tesoreria'));

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
      path: '/cronograma-2026',
      element: <Cronograma2026 />,
    },
    {
      path: '/deporte-ludica',
      element: <DeporteLudica />,
    },
    {
      path: '/dian',
      element: <DIAN />,
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
      path: '/horario-psicologia',
      element: <HorarioPsicologia />,
    },
    {
      path: '/horario-coordinadores',
      element: <HorarioCoordinadores />,
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

  return <Suspense fallback={null}>{routes}</Suspense>;
};

export default Rutas;
