// src/components/BotonWhatsapp.jsx

import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaWhatsapp,
  FaChevronUp,
  FaChevronDown,
  FaUserTie,
  FaChalkboardTeacher,
  FaComments,
} from 'react-icons/fa';
import { MdPsychology } from 'react-icons/md';

const BotonWhatsapp = () => {
  const [abierto, setAbierto] = useState(false);
  const [horariosAbiertos, setHorariosAbiertos] = useState(false);
  const contenedorRef = useRef(null);

  const opciones = useMemo(
    () => [
      {
        id: 'coordinacion',
        titulo: 'Cita con Coordinación',
        numero: '573104280125',
        icono: <FaUserTie aria-hidden='true' />,
        horarios: [{ label: 'Horario Coordinadores', to: '/horario-coordinadores' }],
        mensaje: `Hola, deseo agendar una cita con coordinación

Nombre completo acudiente:
Nombre del estudiante:
Grado:
Motivo de la cita:
Día y hora (de acuerdo a los horarios establecidos por el/la coordinador(a)):
Teléfono de contacto:`,
      },
      {
        id: 'profesores',
        titulo: 'Cita con Profesores',
        numero: '573104280125',
        icono: <FaChalkboardTeacher aria-hidden='true' />,
        horarios: [
          { label: 'Horario Primaria', to: '/horario-primaria' },
          { label: 'Horario Secundaria', to: '/horario-secundaria' },
        ],
        mensaje: `Hola, deseo agendar una cita con profesor(a)

Nombre profesor:
Nombre completo acudiente:
Nombre del estudiante:
Grado:
Motivo de la cita:
Día y hora (de acuerdo a los horarios establecidos por el docente):
Teléfono de contacto:`,
      },
      {
        id: 'psicologia',
        titulo: 'Cita con Psicología',
        numero: '573175016066',
        icono: <MdPsychology aria-hidden='true' />,
        horarios: [{ label: 'Horario Psicología', to: '/horario-psicologia' }],
        mensaje: `Hola. Gracias por comunicarte con el departamento de psicología. Para agendar tu cita, por favor completa la siguiente información:

Nombre del acudiente:
Nombre del o la menor:
Fecha de nacimiento:
Tipo de documento de identidad:
Número de documento de identidad:
Edad:
Motivo de consulta:
Día y hora (de acuerdo a los horarios establecidos por las psicólogas):
Teléfono de contacto:

Enseguida estaremos contigo para confirmar tu cita!!`,
      },
      {
        id: 'general',
        titulo: 'Preguntas e inquietudes',
        numero: '573104280125',
        icono: <FaComments aria-hidden='true' />,
        horarios: [],
        mensaje: `Hola, deseo comunicarme con el colegio para resolver una pregunta o inquietud.

Nombre completo:
Nombre del estudiante:
Grado:
Motivo de la consulta:
Teléfono de contacto:`,
      },
    ],
    [],
  );

  const horarios = useMemo(
    () =>
      opciones.flatMap((opcion) =>
        opcion.horarios.map((horario) => ({
          ...horario,
          key: `${opcion.id}-${horario.to}`,
        })),
      ),
    [opciones],
  );

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (contenedorRef.current && !contenedorRef.current.contains(event.target)) {
        setAbierto(false);
        setHorariosAbiertos(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setAbierto(false);
        setHorariosAbiertos(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!abierto) return undefined;

    const previousOverflow = document.body.style.overflow;

    if (window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [abierto]);

  const construirLink = (numero, mensaje) =>
    `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  const toggleMenu = () => {
    setAbierto((prev) => {
      const siguiente = !prev;
      if (!siguiente) setHorariosAbiertos(false);
      return siguiente;
    });
  };

  const cerrarMenu = () => {
    setAbierto(false);
    setHorariosAbiertos(false);
  };

  const toggleHorarios = () => {
    setHorariosAbiertos((prev) => !prev);
  };

  return (
    <div ref={contenedorRef} className={`agenda-float ${abierto ? 'is-open' : ''}`}>
      <div className='agenda-float__menu' aria-hidden={!abierto}>
        <div className='agenda-float__mobile-schedule'>
          <button
            type='button'
            className={`agenda-float__schedule-toggle ${horariosAbiertos ? 'is-open' : ''}`}
            onClick={toggleHorarios}
            aria-expanded={horariosAbiertos}
            aria-controls='agenda-mobile-schedules'
          >
            <span>Ver horarios</span>

            <span className='agenda-float__schedule-toggle-icon' aria-hidden='true'>
              {horariosAbiertos ? <FaChevronDown /> : <FaChevronUp />}
            </span>
          </button>

          <div
            id='agenda-mobile-schedules'
            className={`agenda-float__mobile-schedule-links ${horariosAbiertos ? 'is-open' : ''}`}
          >
            {horarios.map((horario) => (
              <NavLink
                key={horario.key}
                to={horario.to}
                className='agenda-float__schedule-link'
                onClick={cerrarMenu}
              >
                {horario.label}
              </NavLink>
            ))}
          </div>
        </div>

        {opciones.map((opcion) => {
          const tieneHorarios = opcion.horarios.length > 0;

          return (
            <div
              key={opcion.id}
              className={`agenda-float__card ${tieneHorarios ? 'agenda-float__card--with-schedule' : ''}`}
            >
              {tieneHorarios && (
                <div className='agenda-float__schedule-area'>
                  <div className='agenda-float__links'>
                    {opcion.horarios.map((horario) => (
                      <NavLink
                        key={horario.to}
                        to={horario.to}
                        className='agenda-float__schedule-link'
                        onClick={cerrarMenu}
                      >
                        {horario.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={construirLink(opcion.numero, opcion.mensaje)}
                target='_blank'
                rel='noopener noreferrer'
                className='agenda-float__option'
                onClick={cerrarMenu}
              >
                <span className='agenda-float__option-icon'>{opcion.icono}</span>
                <span className='agenda-float__option-text'>{opcion.titulo}</span>
              </a>
            </div>
          );
        })}
      </div>

      <button
        type='button'
        className='agenda-float__trigger'
        onClick={toggleMenu}
        aria-expanded={abierto}
        aria-label='Abrir opciones para agendar cita por WhatsApp'
      >
        <span className='agenda-float__trigger-icon'>
          <FaWhatsapp aria-hidden='true' />
        </span>

        <span className='agenda-float__trigger-content'>
          <span className='agenda-float__trigger-title'>Agenda <br />tu cita</span>
        </span>

        <span className='agenda-float__trigger-arrow'>
          {abierto ? <FaChevronDown aria-hidden='true' /> : <FaChevronUp aria-hidden='true' />}
        </span>
      </button>
    </div>
  );
};

export default BotonWhatsapp;
