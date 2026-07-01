import useTitulo from '../hooks/useTitulo';
import { Carrusel } from '../components/Carrusel';
import { useCarrusel } from '../hooks/useCarrusel';
import { BACKGROUND_IMAGES_HISTORIA } from '../constants/inicio';

const Historia = () => {
  useTitulo('Historia');

  const { currentImageIndex: indexHistoria } = useCarrusel(BACKGROUND_IMAGES_HISTORIA);

  return (
    <>
      <div className='fullContainer'>
        <div className='imgHistoriaContainer'>
          <Carrusel images={BACKGROUND_IMAGES_HISTORIA} currentImageIndex={indexHistoria} />
        </div>
        <div className='texto'>
          <h1>RESEÑA HISTÓRICA: AÑO 1990 - 2025</h1>
          <p>
            En el año de 1.988 el señor Armando Gordillo López le informó al señor Julio Cesar
            Ceballos Ramos y su señora Patricia Conde Gordillo, quienes residían en Estados Unidos,
            que en el Sur Oriente de Cali había un proyecto de vivienda en la comuna 15 en el cual
            venderían aproximadamente 5.000 lotes. A partir de ese momento, Armando Gordillo López y
            el señor Pablo Emilio Conde Cediel se dieron a la tarea de averiguar los centros
            educativos o proyectos de construcción de los mismos en el sector.
            <br />
            <br />
            La familia Gordillo Conde tradicionalmente ha sido reconocida en el sector educativo del
            Valle del Cauca, motivo por el cual surgió la idea de construir una institución
            educativa que hoy es llamada Colegio Ciudad Córdoba. Fundado en 1990 con educación
            preescolar, básica primaria y básica secundaria (6 y 7) con el siguiente personal: 5
            administrativos, 10 docentes, 6 en servicios generales y con una cantidad de 339
            estudiantes. El rector que inició en el colegio fue el señor Armando Gordillo López.
            <br />
            <br />
            En el año lectivo 1994-1995 se culminó la construcción de segunda y tercera planta, al
            igual que se graduó la primera promoción de la modalidad comercial. En el año lectivo
            2000-2001 se graduó la primera promoción de la modalidad industrial. En el año 1996 se
            creó el club deportivo COCICOR y en 1998 se fundó el grupo DANZAR.
            <br />
            <br />
            En el año 1.996 se retiró el rector Armando Gordillo López y en su cargo llegó el
            licenciado Walter Mendoza Borrero, quien estuvo en la rectoría hasta finalizar el año
            lectivo 1.997, fecha en que regresó el señor Armando Gordillo.
            <br />
            <br />
            En el año lectivo 2005-2006 se suscribió contrato con la Secretaría de Educación
            Municipal, en el llamado Plan de Cobertura, beneficiando a 210 estudiantes de estrato
            0-1 y 2.
            <br />
            <br />
            A partir del año lectivo 2007-2008 se inició el proceso del convenio de integración con
            el SENA, con la capacitación correspondiente para la acreditación y certificación de los
            estudiantes de grado once (11) en las diferentes modalidades. (INDUSTRIAL: TÉCNICO EN
            INSTALACIONES ELÉCTRICAS RESIDENCIALES // COMERCIAL: TÉCNICO EN NÓMINA Y PRESTACIONES
            SOCIALES).
            <br />
            <br />
            El colegio en el año lectivo de 2009-2010 comenzó a prestar el servicio de pre ICFES
            para estudiantes de la comuna 15, con la vinculación de 6 docentes. El proyecto dirigido
            por el señor Edwin Cárdenas Gordillo (rector del Colegio Ciudad Córdoba a partir del
            mismo año) se ha mantenido en la institución logrando un avance en los resultados
            individuales de los estudiantes de grado once en las pruebas SABER (ICFES).
            <br />
            <br />
            Para el proceso de certificación de calidad, en el año 2.009, el colegio se vinculó al
            proyecto de LÍDERES SIGLO XXI apoyado por la fundación NUTRESA, quienes mensualmente
            ofrecían un servicio de asesoría en el tema de calidad. En julio del 2.013 el colegio
            toma la decisión de retirarse debido a la planificación directa e individual con el
            apoyo de un asesor externo en calidad contratado por la institución.
            <br />
            <br />
            En el año lectivo 2.012, el colegio creó su página web de la siguiente manera:
            <br />
            www.colegiociudadcordoba.edu.co
            <br />
            <br />
            En el año 2.013, el colegio pretende certificar su Sistema de Gestión de Calidad (SGC)
            con el ICONTEC. Además, inició su primer curso de inglés de manera independiente con 8
            estudiantes, dictado los días sábados de 1:00 pm a 5:00 pm. También se originó el evento
            RECRE ARTE COCICOR, dirigido por el docente ROOSEVELT LÓPEZ DELGADO y que incluyó las
            presentaciones de las áreas lúdicas: Danzas, Salsa y Banda Marcial. Además de otras
            presentaciones especiales.
            <br />
            <br />
            Para el año lectivo 2.014, como implementación de las TICS el colegio inicio con el
            manejo de la plataforma virtual con la editorial EDUCAR. Adicionalmente se acondicionó
            el cuarto (4°) piso, adicionando nuevos espacios en la planta física (2 salas de
            audiovisuales nuevas) y se trasladó la biblioteca para este piso.
            <br />
            <br />
            Para el año lectivo 2.015, los propietarios de la institución entregaron s todos los
            estudiantes y colaboradores una manilla alusiva a las bodas de plata (19 Febrero).
            Además, el 20 de Febrero, se realizó una eucaristía en acción de gracias por los 25 años
            de funcionamiento y el sábado 28 febrero en la noche, invitaron a un brindis a los
            egresados con la asistencia de 123 de ellos.
            <br />
            <br />
            Para el cierre de la celebración de los 25 años, el colegio tiene planeado realizar un
            magno evento en el teatro JORGE ISSACS, el lunes festivo 16 de Noviembre de 2.015, con 2
            presentaciones: 1 para primaria y 1 para bachillerato.
            <br />
            <br />
            En el año lectivo 2.016, el colegio obtuvo una excelente posición en el ranking de los
            mejores colegios de Colombia que publica anualmente la revista Dinero a través de su
            página en internet:
            <br />
            <a
              href='https://www.semana.com/ranking-de-los-mejores-colegios-de-colombia-en-el-2016/222439/'
              target='_blank'
              rel='noreferrer noopener'
            >
              mejorescolegiosdecolombia2016
            </a>
            <br />
            quedando como el número 1 en la comuna 15, número 5 en los colegios de Cali en
            calendario A, número 33 en Cali y puesto 767 en Colombia, ubicándonos en el 10% de los
            mejores colegios a nivel nacional.
            <br />
            <br />
            Para el año lectivo 2.017, se consolidó la selección deportiva de futbol femenino, la
            cual logró ser la ganadora de la copa Atlas y trajo su primer reconocimiento deportivo.
            Además a finales del mismo año, se dio a conocer a la comunidad que según la página
            oficial del ICFES (www.icfesinteractivo.gov.co), el colegio logró obtener el resultado
            de A+ en las pruebas Icfes de grado 11°, siendo la clasificación más alta de los
            colegios ante el Instituto Colombiano para el Fomento de la Educación Superior.
            <br />
            <br />
            El año lectivo 2.018, se inició con un incremento de estudiantes, pasando de 1.136 a
            1.196 (60 estudiantes nuevos). Además, por segundo año consecutivo se alcanzó la
            clasificación de A+ en los resultados de las pruebas ICFES SABER 11°, posicionando a la
            institución como una de las mejores de la ciudad a nivel de resultados académicos. La
            actividad artística que se realiza anualmente se presentó en el Teatro Jorge Isaac en el
            mes de Noviembre con un aforo de más de 700 entradas. y excelentes presentaciones.
            <br />
            <br />
            Para el año lectivo 2.020, iniciamos con una cantidad de estudiantes de 1.249 (es la
            mayor cantidad de estudiantes con la que hemos iniciado en los últimos 10 años). Para
            este año el colegio cambió a su coordinadora de Primaria, ya que la señora MERY
            RODRIGUEZ se retiró después de 28 años de servicio a la institución, en su reemplazo fue
            escogida la docente OLGA LUCIA PACHECO, quien lleva 12 años de servicio en la
            institución. Además, se planeó la celebración de los 30 años del colegio en el Teatro
            Jorge Isaac. El 16 de Marzo el gobierno Nacional decretó una emergencia sanitaria debido
            a una enfermedad mortal llamada COVID 19, la cual afectó a gran parte del mundo,
            ocasionando miles de muertes alrededor de todos los países que se vieron afectados por
            esta pandemia. Por los motivos mencionados anteriormente, los colegios continuaron con
            el trabajo educativo a través de clases virtuales en plataformas que fueron autorizadas
            por el Ministerio de Educación Nacional.
            <br />
            <br />
            En el año lectivo 2.022 con el regreso a clases (directiva#01 del Ministerio de
            Educación Nacional) ingresamos el 01 de Febrero con el 100% de presencialidad y al 31 de
            Marzo de 2.022 con un corte de 1.201 estudiantes. Después de los grandes logros que como
            institución alcanzamos con la educación virtual, el colegio adquirió audiovisuales para
            todos los salones de la institución con televisores de 39 pulgadas con Smart tv y
            conexión a internet. De igual manera, para este año contamos con algunos docentes nuevos
            y en la parte directiva fue integrada una coordinadora de primaria nueva: la señora
            DIANA MARIA DÍAZ, debido a que la anterior coordinadora de primaria regresó a dictar
            clases a la sesión de bachillerato. Otro aspecto muy importante y de análisis que para
            este regreso a clases contamos con un 10% de población aproximada de estratos
            socioeconómicos 4 y 5 de los barrios de Ciudad 2.000, Caney y Valle del Lili.
            <br />
            <br />
            A finales del año lectivo 2.024, las directivas de la institución aprobaron realizar una
            prueba piloto con la modalidad industrial para los grados 9° y 10°, que consiste en
            reemplazar el programa de formación de electricidad- electrónica con un programa de
            Robótica, programa que sería aprobado para los años siguientes en caso tal de ser
            aceptado y útil para la institución.
            <br />
            <br />
            Iniciamos el año lectivo 2.025 con 1.321 estudiantes, dato histórico en los últimos 15
            años y como se mencionó anteriormente la población de los barrios Caney; Valle del Lili,
            Bochalema y Kachipay sigue en aumento. Continuamos con la mejora de los procesos
            académicos y de convivencia.
          </p>
        </div>
      </div>
    </>
  );
};

export default Historia;
