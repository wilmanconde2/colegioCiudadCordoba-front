import React, { useState, useEffect } from 'react';
import useTitulo from '../hooks/useTitulo';
import Formulario from '../components/Formulario';

const Inicio = () => {
  useTitulo('Inicio');

  const images = ['/background1.jpg', '/background2.jpg', '/background3.jpg', '/background4.jpg'];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3600);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className='fullContainer'>
      {/* Fondo con carrusel de imágenes */}
      <div className='backgroundContainer'>
        {images.map((image, index) => (
          <div
            key={index}
            className={`imageWrapper ${index === currentImageIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`background-${index}`} />
          </div>
        ))}
      </div>

      {/* Texto principal */}
      <div className='backgroundContainerText'>
        <h1>Paz - Progreso - Futuro</h1>
        <h2>
          ¡Una comunidad acogedora que inspira posibilidades, conecta personas y estimula el
          aprendizaje!
        </h2>
      </div>

      <Formulario />

      {/* Circular principal para descargar PDF*/}
      <div className='card circular'>
        <div className='card-body'>
          <img src='/circular.jpg' className='card-img-top' alt='circular' />
          <h5 className='card-title'>Circular Informativa</h5>
          <p className='card-text'>
            Ya está disponible la última Circular Informativa con novedades académicas y administrativas. Puedes visualizar o descargar el documento a continuación.
          </p>
          <div className='boton'>
            <a
              href='https://drive.google.com/file/d/1Vq9ihhwGA2LrzNeWgr-p1AgApySRYkic/view'
              className='btn btn-primary'
              target='_blank'
              rel='noopener noreferrer'
            >
              Descargar
            </a>
          </div>
        </div>
      </div>

      {/* Reporte academico */}
      <div className='card reporteAcademico'>
        <div className='card-body'>
          <img src='/reporte.jpg' className='card-img-top' alt='reporte academico' />
          <h5 className='card-title'>Reporte Académico</h5>
          <ul className='groupList'>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1UmB-E8ZpxKgxVFUwZH2yJpKxU11SqATk'
                target='_blank'
                rel='noopener noreferrer'
              >
                6-1 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1QdPTpExmFT3eu_AS-c0rLkh-PkbZxcUY'
                target='_blank'
                rel='noopener noreferrer'
              >
                6-2 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1OJi8mwUGFAIk_p6Bhrgxni6Hf00jPh6p'
                target='_blank'
                rel='noopener noreferrer'
              >
                6-1 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1z81uBwWkEgoEWlA6wrjjoHwLOMhong9J'
                target='_blank'
                rel='noopener noreferrer'
              >
                6-2 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1K7eCewnuwZF85kUVlfvZmBtKHm2uwa0X'
                target='_blank'
                rel='noopener noreferrer'
              >
                7-1 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/12DFqyMdS4tknJUCMgEHdF-jV7z4n5BfH'
                target='_blank'
                rel='noopener noreferrer'
              >
                7-2 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1Ao6vy_P-m3w9naeUZXeqr4MhQisDRJF9'
                target='_blank'
                rel='noopener noreferrer'
              >
                7-3 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/13TGaH8iUO4aOuqTxwUsD2SQ_4yqTQBWj'
                target='_blank'
                rel='noopener noreferrer'
              >
                7-1 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1mezhHq2jGFR1mkMw7Dl5T_NaEex_gUKw'
                target='_blank'
                rel='noopener noreferrer'
              >
                7-2 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1C8eTps7RD_qgeWPuEAt7-WmrCnBhPq4Y'
                target='_blank'
                rel='noopener noreferrer'
              >
                7-3 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1HVHALobcKwdAMWYmzvuxaebz_sYvjdeu'
                target='_blank'
                rel='noopener noreferrer'
              >
                8-1 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1bSwW4Phn1q4vF7VvyGssdfH7BjWO2c2n'
                target='_blank'
                rel='noopener noreferrer'
              >
                8-2 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/170gKn2QKhXfFLyk0m1izrYUyhlOfHl8m'
                target='_blank'
                rel='noopener noreferrer'
              >
                8-1 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1C9TS2aXGqAq_QpSpACbQFu63nK7Sr80Y'
                target='_blank'
                rel='noopener noreferrer'
              >
                8-2 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1XZ5rjnBZTtgpt9xlwnIowfQ8a4-oyqCx'
                target='_blank'
                rel='noopener noreferrer'
              >
                9-1 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/19S9RxJ3Nj6JYLHsK2aZ07T5qdbdYaFwp'
                target='_blank'
                rel='noopener noreferrer'
              >
                9-2 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/11dKORvYMg2I9xZPk8pon-T6iiTNIHi2B'
                target='_blank'
                rel='noopener noreferrer'
              >
                9-1 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1itUr0QHJ8XtWzf5hbP49vXNi_ZqhCy4a'
                target='_blank'
                rel='noopener noreferrer'
              >
                9-2 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1vFYO3ssZgwrMFRxRhyh8fRHiIi3pZ-mZ'
                target='_blank'
                rel='noopener noreferrer'
              >
                10-1 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1Ljwf0HMFiaRg6IQL1uqAY5waFdjcBWX6'
                target='_blank'
                rel='noopener noreferrer'
              >
                10-2 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1JL3TZlwssVElgo5pkr0nA0qkz2NCy_3b'
                target='_blank'
                rel='noopener noreferrer'
              >
                10-1 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1BGkL9TxqSyr2fd1sZ6XMakeyFOReK7pF'
                target='_blank'
                rel='noopener noreferrer'
              >
                10-2 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1V_N4i-q9ev_ghdjnIAwdOENCQunmYyFt'
                target='_blank'
                rel='noopener noreferrer'
              >
                11-1 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1vdeIaCBDEbmA1fOj9TRxb4PNUJr3FPIT'
                target='_blank'
                rel='noopener noreferrer'
              >
                11-2 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1k_gGCtijog12iQSz cxz7hsFiiX2Zki'
                target='_blank'
                rel='noopener noreferrer'
              >
                11-1 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1wI2TqgYk8vRHPui1WRD3zgKuReGHl5a3'
                target='_blank'
                rel='noopener noreferrer'
              >
                11-2 IND
              </a>
            </li>
          </ul>
          <p className='nota'>
            <em>Nota:</em> da un clic sobre tu grado y encontrarás el listado con los integrantes de
            tu salón de clases, busca tu nombre y revisa si debes presentar recuperaciones finales o
            si ya aprobaste tu año lectivo sin logros pendientes.
          </p>
        </div>
      </div>

      {/* Recuperacion */}
      <div className='card recuperacion'>
        <div className='card-body'>
          <img src='/recuperacion.jpg' className='card-img-top' alt='reporte recuperacion' />
          <h5 className='card-title'>Actividades Recuperación</h5>
          <ul className='groupList'>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1__TEGZa-HLe_MHRczk40ql6jC95zSCFM'
                target='_blank'
                rel='noopener noreferrer'
              >
                6 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1tw_eg8YfRsEjATHyuQNroGhPPbjb25Qj'
                target='_blank'
                rel='noopener noreferrer'
              >
                6 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1wqIH_pEk0cpCItY7MzaBPbpKBPvvFiFE'
                target='_blank'
                rel='noopener noreferrer'
              >
                7 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1dl57J3j2MX0ltokyAGF0G4uxAaL-2TXr'
                target='_blank'
                rel='noopener noreferrer'
              >
                7 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1v3pypfLx2yzUHJxpomFyeLPto7vtwnv8'
                target='_blank'
                rel='noopener noreferrer'
              >
                8 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1wE1OC7SHUlH3pDES1DtgAlkvt5NczXFj'
                target='_blank'
                rel='noopener noreferrer'
              >
                8 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1jV6myZSr3CR-KRT_Q2vAeRGsBC61PoXZ'
                target='_blank'
                rel='noopener noreferrer'
              >
                9 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1FRCX_NY3FyFoTFhxnNDzPu7OZ28ixDIM'
                target='_blank'
                rel='noopener noreferrer'
              >
                9 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1y4_gqmPOhlIw7V4Snu88KTH6ae9l3LSV'
                target='_blank'
                rel='noopener noreferrer'
              >
                10 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/14yKv-Uva0SNpRSyyAMF_UDMvCa8LUG09'
                target='_blank'
                rel='noopener noreferrer'
              >
                10 IND
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1W_bIiKMnGo4r0Q9-VvIGsmeXowsv1wdh'
                target='_blank'
                rel='noopener noreferrer'
              >
                11 COM
              </a>
            </li>
            <li>
              <a
                href='https://drive.google.com/drive/folders/1aWSnHugjjKp1AYasgrOC16fkgYQ1vRRv'
                target='_blank'
                rel='noopener noreferrer'
              >
                11 IND
              </a>
            </li>
          </ul>
          <p className='nota'>
            <em>Nota:</em> da un clic sobre tu grado y encontrarás las actividades de recuperación
            de todas las materias. Recuerda descargar y realizar solo las que te corresponden.
          </p>
        </div>
      </div>

      {/* Mejoramiento academico descarga PDF*/}
      <div className='card horariosRecuperacion'>
        <div className='card-body'>
          <img src='/horarios.jpg' className='card-img-top' alt='horarios' />
          <h5 className='card-title'>Horarios Recuperación</h5>
          <p className='card-text'>
            <em>Nota:</em> ten presente que el horario publicado de recuperaciones en la página web,
            no incluye algunas materias, si reprobaste una o varias materias que no están incluidas
            en el horario publicado, debes buscar al docente correspondiente de dicha/s materia/s el
            día lunes 25 de noviembre del presente año en la jornada de la mañana, para que cada
            docente te asigne un horario de recuperación.
          </p>
          <div className='boton'>
            <a
              href='https://drive.google.com/drive/folders/1B3h2CbVgE375o5Bg1fuoSoAiViRazur3'
              className='btn btn-primary'
              target='_blank'
              rel='noopener noreferrer'
            >
              Descargar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
