import {
  ACADEMIC_CALENDAR_2026,
  TUITION_FEES_2026,
} from '../../../../src/shared/institutional-data.js';
import {
  buildAdmissionsKnowledge,
  buildCalendarKnowledge,
  buildCoordinationKnowledge,
  buildEnrollmentKnowledge,
  buildPsychologyKnowledge,
  buildTuitionKnowledge,
} from './builders.js';

export const KNOWLEDGE_ENTRIES = [
  {
    id: 'identidad-colegio',
    title: 'Información general del colegio',
    keywords: ['colegio', 'nombre', 'ciudad cordoba', 'cocicor', 'fundacion', 'lema', 'paz progreso futuro'],
    answer:
      'El Colegio Ciudad Córdoba está ubicado en Cali. También se identifica como Fundación Social Educativa Paz, Progreso, Futuro. Su lema es: Paz - Progreso - Futuro.',
  },
  {
    id: 'contacto',
    title: 'Contacto institucional',
    keywords: ['contacto', 'telefono', 'teléfono', 'celular', 'whatsapp', 'correo', 'email', 'direccion', 'dirección', 'ubicacion', 'ubicación'],
    answer:
      'Contacto del Colegio Ciudad Córdoba:\n- Dirección: Cra. 42 B # 51-35, Barrio Ciudad Córdoba, Cali.\n- Teléfonos: (602) 3450411 - (602) 3731398.\n- Celular / WhatsApp general: 3104280125.\n- Correo: colegiociudadcordoba@hotmail.com',
  },
  {
    id: 'horario-oficina',
    title: 'Horario de oficina',
    keywords: ['horario oficina', 'secretaria', 'secretaría', 'tesoreria', 'tesorería', 'atencion oficina', 'atención oficina'],
    answer:
      'El horario de oficina de Tesorería y Secretaría es de lunes a viernes de 7:00 a.m. a 12:00 p.m. y de 1:00 p.m. a 5:00 p.m.',
  },
  {
    id: 'mision',
    title: 'Misión',
    keywords: ['mision', 'misión'],
    answer:
      'Misión: Somos una institución educativa de carácter privado, que ofrece los niveles desde Pre-escolar hasta la media técnica comercial e industrial, fundamentada en la formación académica, deportiva, cultural, artística y de valores, utilizando la ciencia y la tecnología como una herramienta que contribuye al desarrollo de competencias laborales.',
  },
  {
    id: 'vision',
    title: 'Visión',
    keywords: ['vision', 'visión', '2030'],
    answer:
      'Visión: Para el año 2030, el colegio seguirá posicionado como líder en formación académica innovadora, integrando los valores, el arte, la robótica, la tecnología y la sostenibilidad ambiental como pilares fundamentales del aprendizaje, impactando a la comunidad educativa Cocicor.',
  },
  {
    id: 'jornadas',
    title: 'Horarios de jornada 2026',
    keywords: ['jornada', 'horario jornada', 'primaria mañana', 'primaria tarde', 'bachillerato mañana', 'bachillerato tarde', 'entrada', 'salida'],
    answer:
      'Horarios de jornada 2026:\n- Primaria jornada mañana: 6:50 a.m. a 12:20 p.m.\n- Primaria jornada tarde: 12:45 p.m. a 6:00 p.m.\n- Bachillerato jornada mañana: 6:20 a.m. a 12:20 p.m.\n- Bachillerato jornada tarde: 12:45 p.m. a 6:40 p.m.',
  },
  {
    id: 'pagos',
    title: 'Tesorería y medios de pago',
    keywords: ['pago', 'pagos', 'pse', 'aval', 'aval pay', 'paycenter', 'datáfono', 'datafono', 'efectivo', 'transferencia', 'codigo estudiante', 'código estudiante'],
    answer:
      'Medios de pago:\n- Tesorería de la institución en efectivo.\n- Datáfono, con costo adicional.\n- PSE desde la sección Tesorería de la página web.\nPara pagar por PSE se necesita el código del estudiante de 5 dígitos. Este código se puede consultar en boletines, recibos de pago anteriores, carné estudiantil o en el formulario de Tesorería. No se realizan transferencias.',
  },
  {
    id: 'matricula-2026',
    title: 'Matrícula 2026',
    keywords: ['matricula', 'matrícula', 'matriculas', 'matrículas', 'extraordinaria', 'ordinaria', 'inscripcion', 'inscripción'],
    answer: buildEnrollmentKnowledge(),
  },
  {
    id: 'inscripciones-2027',
    title: 'Inscripciones 2027',
    keywords: ['inscripciones 2027', 'inscripcion 2027', 'matricula 2027', 'matriculas 2027', 'cupos 2027', 'cupo 2027', 'ano lectivo 2027'],
    answer: buildAdmissionsKnowledge(),
  },
  {
    id: 'pension-preescolar-primaria',
    title: 'Pensión Jardín, Transición y Primaria 2026',
    keywords: ['pension jardin', 'pensión jardín', 'pension transicion', 'pensión transición', 'pension primero', 'pension segundo', 'pension tercero', 'pension cuarto', 'pension quinto', 'primaria', 'jardin', 'transicion', 'primero', 'segundo', 'tercero', 'cuarto', 'quinto'],
    answer: buildTuitionKnowledge(
      'Jardín, Transición y grados 1°, 2°, 3°, 4° y 5°',
      TUITION_FEES_2026.jardin,
    ),
  },
  {
    id: 'pension-sexto',
    title: 'Pensión grado 6° 2026',
    keywords: ['pension sexto', 'pensión sexto', 'grado 6', 'grado sexto', 'sexto'],
    answer: buildTuitionKnowledge('grado 6°', TUITION_FEES_2026.sexto),
  },
  {
    id: 'pension-7-11',
    title: 'Pensión grados 7° a 11° 2026',
    keywords: ['pension septimo', 'pensión séptimo', 'pension octavo', 'pension noveno', 'pension decimo', 'pension once', 'septimo', 'séptimo', 'octavo', 'noveno', 'decimo', 'décimo', 'once', 'grado 7', 'grado 8', 'grado 9', 'grado 10', 'grado 11'],
    answer: buildTuitionKnowledge(
      'grados 7°, 8°, 9°, 10° y 11°',
      TUITION_FEES_2026.septimo,
    ),
  },
  {
    id: 'cronograma-2026',
    title: ACADEMIC_CALENDAR_2026.title,
    keywords: ['cronograma', 'calendario', 'inicio clases', 'periodo', 'periodos', 'evaluaciones', 'semana santa', 'vacaciones', 'receso', 'dia cientifico', 'día científico', 'dia familia', 'día familia', 'grados', 'graduacion', 'graduación'],
    answer: buildCalendarKnowledge(),
  },
  {
    id: 'reuniones-padres-2026',
    title: 'Reuniones de padres 2026',
    keywords: ['reunion padres', 'reunión padres', 'entrega boletines', 'boletines', 'padres de familia'],
    answer:
      'Reuniones de padres 2026:\n- Primer periodo: lunes 11 de mayo, 7:00 a.m. a 12:00 p.m. y 1:00 p.m. a 5:00 p.m.\n- Segundo periodo: jueves 13 de agosto, 7:00 a.m. a 12:00 p.m. y 1:00 p.m. a 5:00 p.m.\n- Tercer periodo: viernes 16 de octubre, 7:00 a.m. a 12:00 p.m. y 1:00 p.m. a 5:00 p.m.\n- Cuarto periodo: lunes 30 de noviembre, 7:00 a.m. a 3:00 p.m.\n- Reunión de docentes: 30 de abril, 13 de julio, 29 de septiembre, 20 y 25 de noviembre.',
  },
  {
    id: 'coordinacion',
    title: 'Horario de coordinación 2026',
    keywords: ['coordinacion', 'coordinación', 'coordinador', 'coordinadora', 'diana diaz', 'diana díaz', 'alexander fajardo'],
    answer: buildCoordinationKnowledge(),
  },
  {
    id: 'psicologia',
    title: 'Horario de psicología 2026',
    keywords: ['psicologia', 'psicología', 'psicologa', 'psicóloga', 'hannyt', 'kienesberger', 'angela ceballos', 'ángela ceballos'],
    answer: buildPsychologyKnowledge(),
  },
  {
    id: 'servicios-institucionales',
    title: 'Servicios y propuesta institucional',
    keywords: ['servicios del colegio', 'servicios ofrece', 'que ofrece el colegio', 'oferta educativa', 'propuesta educativa', 'niveles educativos', 'formacion integral'],
    answer:
      'El Colegio Ciudad Córdoba ofrece educación privada desde Preescolar hasta Media Técnica, con formación académica, deportiva, cultural, artística y en valores. Cuenta con modalidades Comercial e Industrial, orientación psicológica, coordinación académica, actividades deportivas y lúdicas, y uso de tecnología y robótica como apoyo al aprendizaje.',
  },
  {
    id: 'deporte-ludica',
    title: 'Formación deportiva y lúdica',
    keywords: ['deporte', 'ludica', 'lúdica', 'futbol', 'fútbol', 'voleibol', 'danzas', 'salsa', 'musica', 'música', 'poliza', 'póliza'],
    answer:
      'Formación Deportiva y Lúdica:\n- Inicia el 24 de febrero.\n- Es obligatorio tener póliza de seguro estudiantil.\n\nFútbol masculino - José Luis Triana:\nJornada mañana: Primero y Segundo martes y viernes 2:30 p.m. a 4:00 p.m.; Tercero y Cuarto martes y viernes 4:00 p.m. a 5:30 p.m.; Quinto y Sexto lunes y miércoles 2:30 p.m. a 3:45 p.m.; Séptimo y Octavo lunes y miércoles 3:45 p.m. a 5:00 p.m.; Noveno a Once lunes y miércoles 5:00 p.m. a 6:00 p.m.\nJornada tarde: Primero y Segundo martes y viernes 7:00 a.m. a 8:30 a.m.; Tercero y Cuarto martes y viernes 8:30 a.m. a 10:00 a.m.; Quinto y Sexto lunes y miércoles 7:00 a.m. a 8:15 a.m.; Séptimo y Octavo lunes y miércoles 8:15 a.m. a 9:30 a.m.; Noveno a Once lunes y miércoles 9:30 a.m. a 10:30 a.m.\n\nFútbol femenino y voleibol mixto 9°, 10° y 11° - Ricardo Gerena: miércoles. Jornada mañana: fútbol femenino 3:00 p.m. a 4:30 p.m. y voleibol 4:30 p.m. a 6:00 p.m. Jornada tarde: fútbol femenino 7:00 a.m. a 8:30 a.m. y voleibol 8:30 a.m. a 10:00 a.m.\n\nDanzas - Yessica Vente: viernes. Preescolar a tercero 7:00 a.m. a 8:00 a.m.; cuarto a séptimo 8:00 a.m. a 9:00 a.m.; octavo a once 9:00 a.m. a 10:00 a.m.\nSalsa - Danny Paola Barros: lunes. Preescolar a tercero 7:00 a.m. a 8:00 a.m.; cuarto a séptimo 8:00 a.m. a 9:00 a.m.; octavo a once 9:00 a.m. a 10:00 a.m.\nMúsica - Juan Sebastián Cabal: jornada mañana jueves 3:00 p.m. a 5:00 p.m.; jornada tarde viernes 8:30 a.m. a 10:30 a.m.',
  },
  {
    id: 'modalidades',
    title: 'Modalidades Comercial e Industrial',
    keywords: ['modalidad', 'modalidades', 'comercial', 'industrial', 'robotica', 'robótica', 'contabilidad', 'electricidad'],
    answer:
      'Modalidades:\n- Modalidad Comercial: los estudiantes trabajan contabilidad, técnicas de oficina, legislación laboral, legislación comercial, ciencia y tecnología, y emprendimiento.\n- Modalidad Industrial: los estudiantes trabajan robótica, electricidad, electrónica, dibujo técnico y emprendimiento.\n- Desde 2026, grado sexto no se divide por modalidades.\n- De sexto a noveno ven asignaturas optativas como contabilidad, programación, robótica, dibujo técnico y artes plásticas.',
  },
  {
    id: 'manual-convivencia',
    title: 'Manual de convivencia 2026',
    keywords: ['manual convivencia', 'convivencia', 'conducto regular', 'excusa', 'excusas', 'portería', 'porteria', 'lonchera', 'trabajos en grupo', 'whatsapp institucional'],
    answer:
      'Manual de Convivencia 2026:\n- Está disponible para descargar en la página web.\n- Contiene derechos, deberes, normas, convivencia, procesos académicos y conducto regular.\n- Conducto regular académico o convivencia: docente de área, director de grupo, coordinación, rectoría, comité de convivencia y consejo directivo.\n- Para reclamos académicos: primero docente del área, luego director de grupo, coordinación, rectoría o consejo académico / directivo.\n- Las excusas deben enviarse en físico al respectivo coordinador.\n- No se permite recibir en portería útiles, elementos escolares o loncheras.\n- Los trabajos en grupo por fuera del colegio están prohibidos.\n- No se manejan grupos de WhatsApp institucionales.',
  },
  {
    id: 'evaluacion-promocion',
    title: 'Evaluación y promoción',
    keywords: ['evaluacion', 'evaluación', 'promocion', 'promoción', 'notas', 'escala', 'superior', 'alto', 'basico', 'básico', 'bajo', 'autoevaluacion', 'coevaluacion', 'boletines'],
    answer:
      'Evaluación:\n- Cognitivo: 70%.\n- Personal: 15%.\n- Social: 15%.\n- Autoevaluación: 5%.\n- Coevaluación: 5%.\n- Escala: Superior 4.7 a 5.0; Alto 4.0 a 4.6; Básico 3.0 a 3.9; Bajo 1.0 a 2.9.\n- Se entregan 4 boletines oficiales al año.\n\nPromoción:\n- Se promueve si al finalizar el año alcanza desempeño básico, alto o superior en todas las asignaturas o queda pendiente en máximo 1 o 2 asignaturas.\n- No se promueve con inasistencia injustificada igual o superior al 25% o con desempeño bajo en 3 o más asignaturas.\n- Para grado 11, para ceremonia debe estar a paz y salvo, cumplir servicio social, no tener asignaturas en bajo y cumplir requisitos institucionales.',
  },
  {
    id: 'pqrs',
    title: 'PQRS / PQRSD',
    keywords: ['pqrs', 'pqrsd', 'peticion', 'petición', 'queja', 'reclamo', 'denuncia', 'buzon', 'buzón'],
    answer:
      'PQRS / PQRSD:\n- Se puede hacer por WhatsApp institucional: 3104280125.\n- También desde la pestaña PQRSD de la página web.\n- También existe buzón físico en portería.\n- Las peticiones se responden según tiempos legales.\n- Quejas, reclamos y denuncias: hasta 10 días hábiles.\n- Peticiones generales: hasta 15 días.',
  },
  {
    id: 'perfiles',
    title: 'Perfiles COCICOR',
    keywords: ['perfil', 'perfiles', 'directivo', 'docente', 'estudiante', 'padres', 'egresado'],
    answer:
      'Perfiles COCICOR:\n- Directivo docente: idóneo en aspectos pedagógicos, administrativos y de gestión; liderazgo positivo; proyección de la filosofía institucional.\n- Docente: formador de valores, comprometido con la formación integral, creativo, innovador, investigativo, justo, respetuoso, ético, con vocación y fundamentos pedagógicos.\n- Estudiante: persona con valores cívicos, sociales, religiosos y ecológicos; crítica, reflexiva, analítica y respetuosa de la identidad cultural.\n- Padres de familia: compromiso con la formación de sus hijos, colaboración responsable, respeto por las instancias de comunicación y participación democrática.\n- Egresado: competente en campos profesionales y laborales, modelo de valores y con búsqueda permanente de superación y excelencia.',
  },
  {
    id: 'historia-resumen',
    title: 'Reseña histórica',
    keywords: ['historia', 'reseña historica', 'reseña histórica', 'fundacion', 'fundación', '1990', 'rector', 'icfes'],
    answer:
      'Reseña histórica: El Colegio Ciudad Córdoba fue fundado en 1990 con educación preescolar, básica primaria y básica secundaria. Su primer rector fue Armando Gordillo López. En 1994-1995 graduó la primera promoción comercial; en 2000-2001 la primera promoción industrial. El colegio también ha desarrollado procesos de calidad, plataforma virtual, actividades deportivas y culturales, y presencia institucional en la comuna 15 de Cali.',
  },
];
