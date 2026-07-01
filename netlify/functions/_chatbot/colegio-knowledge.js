
// netlify/functions/_chatbot/colegio-knowledge.js

export const DEFAULT_ANSWER =
  'Por ahora no tengo esa información. Por favor comunícate con secretaría o tesorería.';

export const GENERAL_CONTEXT = [
  'Eres Keyla, la asistente virtual del Colegio Ciudad Córdoba de Cali.',
  'Tu función es responder preguntas institucionales sobre costos, matrículas, pensiones, pagos, horarios, cronograma, contacto, servicios, docentes y atención a padres de familia.',
  'Keyla es el nombre de la asistente, no del usuario. Nunca llames al usuario Keyla.',
  'Responde únicamente con información institucional incluida en la base de conocimiento.',
  'No inventes datos. Responde corto, claro y amable.',
  'Si no tienes la información exacta, responde: Por ahora no tengo esa información. Por favor comunícate con secretaría o tesorería.',
].join('\n');

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
    answer:
      'Costos de matrícula 2026:\n- Matrícula ordinaria: $387.000 para todos los niveles.\n- Matrícula extraordinaria: $424.340 para todos los niveles.\n- La matrícula extraordinaria aplica con recargo del 10% a partir del 13 de diciembre de 2025.\n- La estampilla Pro-cultura 1,5% y el carné estudiantil están incluidos en el costo de matrícula.',
  },
  {
    id: 'pension-preescolar-primaria',
    title: 'Pensión Jardín, Transición y Primaria 2026',
    keywords: ['pension jardin', 'pensión jardín', 'pension transicion', 'pensión transición', 'pension primero', 'pension segundo', 'pension tercero', 'pension cuarto', 'pension quinto', 'primaria', 'jardin', 'transicion', 'primero', 'segundo', 'tercero', 'cuarto', 'quinto'],
    answer:
      'Pensión 2026 para Jardín, Transición y grados 1°, 2°, 3°, 4° y 5°:\n- Día 1 al 4: $258.000.\n- Día 5 al 8: $260.000.\n- Desde el día 9: $265.200.',
  },
  {
    id: 'pension-sexto',
    title: 'Pensión grado 6° 2026',
    keywords: ['pension sexto', 'pensión sexto', 'grado 6', 'grado sexto', 'sexto'],
    answer:
      'Pensión 2026 para grado 6°:\n- Día 1 al 4: $263.000.\n- Día 5 al 8: $265.000.\n- Desde el día 9: $270.300.',
  },
  {
    id: 'pension-7-11',
    title: 'Pensión grados 7° a 11° 2026',
    keywords: ['pension septimo', 'pensión séptimo', 'pension octavo', 'pension noveno', 'pension decimo', 'pension once', 'septimo', 'séptimo', 'octavo', 'noveno', 'decimo', 'décimo', 'once', 'grado 7', 'grado 8', 'grado 9', 'grado 10', 'grado 11'],
    answer:
      'Pensión 2026 para grados 7°, 8°, 9°, 10° y 11°:\n- Día 1 al 4: $283.000.\n- Día 5 al 8: $285.000.\n- Desde el día 9: $290.700.',
  },
  {
    id: 'cronograma-2026',
    title: 'Cronograma 2026',
    keywords: ['cronograma', 'calendario', 'inicio clases', 'periodo', 'periodos', 'evaluaciones', 'semana santa', 'vacaciones', 'receso', 'dia cientifico', 'día científico', 'dia familia', 'día familia', 'grados', 'graduacion', 'graduación'],
    answer:
      'Cronograma 2026:\n- Planeación: del 21 al 30 de enero.\n- Inicio de clases: lunes 2 de febrero.\n- Primer periodo: del 26 de enero al 17 de abril.\n- Segundo periodo: del 20 de abril al 11 de junio.\n- Tercer periodo: del 14 de julio al 18 de septiembre.\n- Cuarto periodo: del 21 de septiembre al 30 de noviembre.\n- Semana Santa: del 30 de marzo al 3 de abril.\n- Vacaciones estudiantes: del 19 de junio al 13 de julio.\n- Semana cultural y deportiva: del 30 de septiembre al 2 de octubre.\n- Semana de receso institucional: del 5 al 9 de octubre.\n- Día científico: viernes 25 de septiembre.\n- Día de la familia: sábado 7 de noviembre.\n- Expo Cocicor comercial e industrial: jueves 15 de octubre.\n- Grados grado 11: sábado 13 de diciembre.\n- Graduación Transición y Quinto: miércoles 2 de diciembre, 4:00 p.m. y 6:00 p.m.\n- Matrícula privado: 10 de diciembre.\n- Matrícula privado BTO: 11 de diciembre.\n- Matrícula cobertura: 9 de diciembre.',
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
    answer:
      'Coordinación 2026:\nDiana Díaz - Coordinación Primaria:\n- Jornada mañana: lunes a viernes, 8:00 a.m. a 10:00 a.m.\n- Jornada tarde: lunes, martes, miércoles y viernes, 2:30 p.m. a 4:10 p.m.\n- Jueves en la tarde no atiende.\n\nAlexander Fajardo - Coordinación Secundaria:\n- Jornada mañana: lunes a viernes, 8:00 a.m. a 10:00 a.m.\n- Jornada tarde: lunes, martes, jueves y viernes, 2:30 p.m. a 4:10 p.m.\n- Miércoles en la tarde no atiende.',
  },
  {
    id: 'psicologia',
    title: 'Horario de psicología 2026',
    keywords: ['psicologia', 'psicología', 'psicologa', 'psicóloga', 'hannyt', 'kienesberger', 'angela ceballos', 'ángela ceballos'],
    answer:
      'Psicología 2026:\nHannyt Kienesberger:\n- Lunes, martes, miércoles y viernes.\n- Mañana: 7:00 a.m. a 1:00 p.m.\n- Tarde: 1:30 p.m. a 5:40 p.m.\n- Jueves no atiende.\n\nÁngela Ceballos Conde:\n- Lunes: 9:00 a.m. a 1:00 p.m. y 1:30 p.m. a 3:30 p.m.\n- Martes: 9:00 a.m. a 1:00 p.m. y 1:30 p.m. a 2:30 p.m.\n- Miércoles: 9:00 a.m. a 1:00 p.m. y 1:30 p.m. a 3:00 p.m.\n- Jueves: 9:00 a.m. a 1:00 p.m. y 1:30 p.m. a 3:00 p.m.\n- Viernes: 9:00 a.m. a 1:00 p.m.\nWhatsApp psicología: 3175016066.',
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
    keywords: ['modalidad', 'modalidades', 'comercial', 'industrial', 'sena', 'robotica', 'robótica', 'contabilidad', 'electricidad'],
    answer:
      'Modalidades:\n- Modalidad Comercial: los estudiantes aprenden contabilidad, técnicas de oficina y legislaciones en el programa de formación en Contabilización de Operaciones Comerciales y Financieras. También se trabaja contabilidad, legislación laboral, legislación comercial, ciencia y tecnología, y emprendimiento.\n- Modalidad Industrial: los estudiantes aprenden dibujo técnico y electricidad-electrónica en el programa de Instalación de Redes Eléctricas Residenciales. También se trabaja robótica, electricidad, electrónica, dibujo técnico y emprendimiento.\n- Desde 2026, grado sexto no se divide por modalidades.\n- De sexto a noveno ven asignaturas optativas como contabilidad, programación, robótica, dibujo técnico y artes plásticas.',
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
    keywords: ['historia', 'reseña historica', 'reseña histórica', 'fundacion', 'fundación', '1990', 'rector', 'sena', 'icfes'],
    answer:
      'Reseña histórica: El Colegio Ciudad Córdoba fue fundado en 1990 con educación preescolar, básica primaria y básica secundaria. Su primer rector fue Armando Gordillo López. En 1994-1995 graduó la primera promoción comercial; en 2000-2001 la primera promoción industrial. En 2007-2008 inició integración con el SENA para grado once en modalidades industrial y comercial. El colegio también ha desarrollado procesos de calidad, plataforma virtual, actividades deportivas y culturales, y presencia institucional en la comuna 15 de Cali.',
  },
];

export const ENROLLMENT_2026 = {
  ordinary: '$387.000',
  extraordinary: '$424.340',
};

export const TUITION_FEES_2026 = {
  jardin: {
    label: 'Jardín',
    discount: '$258.000',
    normal: '$260.000',
    late: '$265.200',
  },
  transicion: {
    label: 'Transición',
    discount: '$258.000',
    normal: '$260.000',
    late: '$265.200',
  },
  primero: {
    label: 'grado 1°',
    discount: '$258.000',
    normal: '$260.000',
    late: '$265.200',
  },
  segundo: {
    label: 'grado 2°',
    discount: '$258.000',
    normal: '$260.000',
    late: '$265.200',
  },
  tercero: {
    label: 'grado 3°',
    discount: '$258.000',
    normal: '$260.000',
    late: '$265.200',
  },
  cuarto: {
    label: 'grado 4°',
    discount: '$258.000',
    normal: '$260.000',
    late: '$265.200',
  },
  quinto: {
    label: 'grado 5°',
    discount: '$258.000',
    normal: '$260.000',
    late: '$265.200',
  },
  sexto: {
    label: 'grado 6°',
    discount: '$263.000',
    normal: '$265.000',
    late: '$270.300',
  },
  septimo: {
    label: 'grado 7°',
    discount: '$283.000',
    normal: '$285.000',
    late: '$290.700',
  },
  octavo: {
    label: 'grado 8°',
    discount: '$283.000',
    normal: '$285.000',
    late: '$290.700',
  },
  noveno: {
    label: 'grado 9°',
    discount: '$283.000',
    normal: '$285.000',
    late: '$290.700',
  },
  decimo: {
    label: 'grado 10°',
    discount: '$283.000',
    normal: '$285.000',
    late: '$290.700',
  },
  once: {
    label: 'grado 11°',
    discount: '$283.000',
    normal: '$285.000',
    late: '$290.700',
  },
};

export const TEACHERS = [
  {
    name: 'Angie Rodríguez',
    courses: ['Jardín A', 'Transición B'],
    subjects: [],
    schedules: [
      'Lunes: 8:40 a.m. a 9:10 a.m.',
      'Miércoles: 10:30 a.m. a 11:30 a.m.',
      'Viernes: 1:40 p.m. a 2:30 p.m.',
    ],
  },
  {
    name: 'Lina Sarria',
    courses: ['Transición A'],
    subjects: [],
    schedules: [
      'Miércoles: 7:20 a.m. a 8:15 a.m.',
      'Jueves: 10:30 a.m. a 11:20 a.m.',
    ],
  },
  {
    name: 'Daniela Caicedo',
    courses: ['Primero 2', 'Transición C'],
    subjects: [],
    schedules: [
      'Lunes: 2:30 p.m. a 3:20 p.m.',
      'Miércoles: 8:15 a.m. a 9:10 a.m.',
      'Miércoles: 1:40 p.m. a 2:30 p.m.',
      'Viernes: 9:10 a.m. a 10:00 a.m.',
    ],
  },
  {
    name: 'Ana Elssy Cardona',
    courses: ['Primero 1'],
    subjects: [],
    schedules: [
      'Lunes: 9:10 a.m. a 10:00 a.m.',
      'Martes: 8:15 a.m. a 9:10 a.m.',
      'Jueves: 8:15 a.m. a 9:10 a.m.',
    ],
  },
  {
    name: 'Diana Marcela Gutiérrez',
    courses: ['Primero 4'],
    subjects: [],
    schedules: [
      'Miércoles: 11:30 a.m. a 12:10 p.m.',
      'Miércoles: 12:50 p.m. a 1:40 p.m.',
      'Viernes: 11:30 a.m. a 12:10 p.m.',
    ],
  },
  {
    name: 'Viviana Rojas',
    courses: ['Segundo 1'],
    subjects: [],
    schedules: [
      'Martes: 12:50 p.m. a 1:40 p.m.',
      'Miércoles: 11:30 a.m. a 12:10 p.m.',
      'Viernes: 7:20 a.m. a 8:15 a.m.',
    ],
  },
  {
    name: 'Paola Girón',
    courses: ['Primero 3', 'Tercero 2'],
    subjects: [],
    schedules: [
      'Martes: 12:50 p.m. a 1:40 p.m.',
      'Miércoles: 8:15 a.m. a 9:10 a.m.',
      'Miércoles: 12:50 p.m. a 1:40 p.m.',
      'Viernes: 10:30 a.m. a 11:30 a.m.',
    ],
  },
  {
    name: 'Francy Barona',
    courses: ['Segundo 2', 'Segundo 3'],
    subjects: [],
    schedules: [
      'Lunes: 12:50 p.m. a 1:40 p.m.',
      'Martes: 10:30 a.m. a 11:30 a.m.',
      'Miércoles: 8:20 a.m. a 9:10 a.m.',
      'Viernes: 10:30 a.m. a 11:30 a.m.',
    ],
  },
  {
    name: 'Sharon Castrillon',
    courses: ['Segundo 4'],
    subjects: [],
    schedules: [
      'Lunes: 11:30 a.m. a 12:10 p.m.',
      'Miércoles: 1:40 p.m. a 2:30 p.m.',
    ],
  },
  {
    name: 'Lady Rojas Aranda',
    courses: ['Tercero 1', 'Tercero 3'],
    subjects: [],
    schedules: [
      'Lunes: 8:15 a.m. a 9:10 a.m.',
      'Lunes: 3:20 p.m. a 4:10 p.m.',
      'Miércoles: 9:10 a.m. a 10:00 a.m.',
      'Jueves: 2:30 p.m. a 3:20 p.m.',
      'Viernes: 12:50 p.m. a 1:40 p.m.',
    ],
  },
  {
    name: 'Tulia Muñoz',
    courses: ['3-3', '4-1', '6-3'],
    subjects: ['Inglés', 'Tecnología T-B', 'Tecnología T-C', 'Tecnología 1-3'],
    schedules: [
      'Lunes: 8:30 a.m. a 10:00 a.m.',
      'Jueves: 2:00 p.m. a 3:00 p.m.',
    ],
  },
  {
    name: 'Alexandra Cabal',
    courses: ['Tercero 4', 'Cuarto 2'],
    subjects: [],
    schedules: [
      'Lunes: 7:20 a.m. a 8:15 a.m.',
      'Miércoles: 3:20 p.m. a 4:10 p.m.',
      'Jueves: 11:30 a.m. a 12:00 p.m.',
      'Viernes: 8:15 a.m. a 9:10 a.m.',
      'Viernes: 1:40 p.m. a 2:30 p.m.',
    ],
  },
  {
    name: 'Alexandra Cortés',
    courses: ['Cuarto 1', 'Cuarto 3'],
    subjects: [],
    schedules: [
      'Lunes: 10:30 a.m. a 11:30 a.m.',
      'Miércoles: 11:30 a.m. a 12:00 p.m.',
      'Miércoles: 2:30 p.m. a 3:20 p.m.',
      'Jueves: 4:40 p.m. a 5:40 p.m.',
      'Viernes: 8:15 a.m. a 9:10 a.m.',
    ],
  },
  {
    name: 'Noe Garzon Garzon',
    courses: ['Cuarto 4', 'Quinto 1'],
    subjects: [],
    schedules: [
      'Lunes: 11:30 a.m. a 12:00 p.m.',
      'Martes: 9:10 a.m. a 10:00 a.m.',
      'Jueves: 12:50 p.m. a 2:20 p.m.',
    ],
  },
  {
    name: 'Yimmi Lopez',
    courses: ['Quinto 2', 'Quinto 3'],
    subjects: [],
    schedules: [
      'Martes: 11:30 a.m. a 12:00 p.m.',
      'Martes: 12:50 p.m. a 2:20 p.m.',
      'Viernes: 8:15 a.m. a 9:10 a.m.',
    ],
  },
  {
    name: 'Luz Angela Gasca',
    courses: ['Sexto 1', 'Séptimo 3 COM'],
    subjects: ['Inglés', 'Sociales'],
    schedules: [
      'Lunes: 8:15 a.m. a 9:00 a.m.',
      'Martes: 1:45 p.m. a 2:20 p.m.',
      'Jueves: 7:20 a.m. a 8:10 a.m.',
      'Jueves: 12:45 p.m. a 2:20 p.m.',
      'Viernes: 11:30 a.m. a 12:10 p.m.',
    ],
  },
  {
    name: 'Cielo Espinosa',
    courses: ['Sexto 2', 'Sexto 3'],
    subjects: ['Lengua Castellana'],
    schedules: [
      'Lunes: 8:15 a.m. a 9:50 a.m.',
      'Martes: 10:30 a.m. a 12:10 p.m.',
      'Martes: 7:20 a.m. a 8:10 a.m.',
      'Viernes: 9:10 a.m. a 9:50 a.m.',
    ],
  },
  {
    name: 'John Benitez',
    courses: ['Sexto 4'],
    subjects: ['Artística'],
    schedules: [
      'Martes: 8:15 a.m. a 9:50 a.m.',
      'Martes: 10:25 a.m. a 11:20 a.m.',
      'Miércoles: 12:45 p.m. a 1:30 p.m.',
      'Viernes: 10:25 a.m. a 11:20 a.m.',
      'Viernes: 3:20 p.m. a 4:00 p.m.',
    ],
  },
  {
    name: 'José Donaldo Gutiérrez',
    courses: ['Sexto 5'],
    subjects: ['Ética', 'Religión', 'Cátedra de Paz'],
    schedules: [
      'Lunes: 1:40 p.m. a 2:20 p.m.',
      'Martes: 1:40 p.m. a 2:30 p.m.',
      'Jueves: 10:25 a.m. a 12:10 p.m.',
      'Viernes: 11:30 a.m. a 12:10 p.m.',
      'Viernes: 1:40 p.m. a 2:20 p.m.',
    ],
  },
  {
    name: 'Alejandro Molina',
    courses: ['Séptimo 1 COM', 'Séptimo 2 COM'],
    subjects: ['Ciencias Naturales'],
    schedules: [
      'Lunes: 12:45 p.m. a 1:30 p.m.',
      'Martes: 10:25 a.m. a 11:20 a.m.',
      'Martes: 2:30 p.m. a 3:10 p.m.',
      'Jueves: 1:40 p.m. a 2:20 p.m.',
      'Viernes: 8:15 a.m. a 9:00 a.m.',
      'Viernes: 11:30 a.m. a 12:10 p.m.',
    ],
  },
  {
    name: 'Jorge Ramírez',
    courses: ['Séptimo 1 IND', 'Séptimo 2 IND'],
    subjects: ['Dibujo Técnico', 'Matemáticas'],
    schedules: [
      'Lunes: 12:45 p.m. a 1:30 p.m.',
      'Martes: 11:30 a.m. a 12:10 p.m.',
      'Jueves: 10:25 a.m. a 11:20 a.m.',
      'Jueves: 3:20 p.m. a 4:00 p.m.',
      'Viernes: 8:15 a.m. a 10:00 a.m.',
    ],
  },
  {
    name: 'Viviana Cardoza',
    courses: ['Octavo 1 COM'],
    subjects: ['Inglés'],
    schedules: [
      'Martes: 3:20 p.m. a 4:00 p.m.',
      'Miércoles: 10:25 a.m. a 11:20 a.m.',
      'Jueves: 9:10 a.m. a 10:00 a.m.',
      'Jueves: 11:30 a.m. a 12:10 p.m.',
      'Viernes: 9:10 a.m. a 10:00 a.m.',
      'Viernes: 12:45 p.m. a 1:30 p.m.',
    ],
  },
  {
    name: 'Carolina Peña',
    courses: ['Octavo 1 IND', 'Octavo 2 IND'],
    subjects: ['Matemáticas'],
    schedules: [
      'Martes: 7:20 a.m. a 8:10 a.m.',
      'Miércoles: 9:10 a.m. a 10:00 a.m.',
      'Miércoles: 12:45 p.m. a 2:20 p.m.',
      'Jueves: 8:15 a.m. a 9:00 a.m.',
      'Jueves: 3:20 p.m. a 4:00 p.m.',
    ],
  },
  {
    name: 'Mauricio Méndez',
    courses: ['Octavo 2 COM'],
    subjects: ['Lengua Castellana'],
    schedules: [
      'Lunes: 9:10 a.m. a 10:00 a.m.',
      'Martes: 2:30 p.m. a 4:00 p.m.',
      'Miércoles: 11:30 a.m. a 12:10 p.m.',
      'Jueves: 2:30 p.m. a 3:10 p.m.',
      'Viernes: 6:20 a.m. a 7:10 a.m.',
    ],
  },
  {
    name: 'Luis E. Villalba',
    courses: ['Noveno 1 COM', 'Décimo 2 COM'],
    subjects: ['Modalidad Comercial'],
    schedules: [
      'Lunes: 7:20 a.m. a 9:00 a.m.',
      'Lunes: 12:45 p.m. a 2:20 p.m.',
      'Martes: 9:10 a.m. a 10:00 a.m.',
      'Jueves: 10:25 a.m. a 11:20 a.m.',
    ],
  },
  {
    name: 'John Alegrias',
    courses: ['Noveno 1 IND', 'Noveno 2 COM'],
    subjects: ['Ciencias Sociales', 'Filosofía'],
    schedules: [
      'Lunes: 2:30 p.m. a 3:10 p.m.',
      'Martes: 2:30 p.m. a 3:10 p.m.',
      'Miércoles: 10:25 a.m. a 11:20 a.m.',
      'Viernes: 8:15 a.m. a 10:00 a.m.',
      'Viernes: 2:30 p.m. a 3:10 p.m.',
    ],
  },
  {
    name: 'Salome Espinosa',
    courses: ['Noveno 3 COM'],
    subjects: ['Inglés'],
    schedules: [
      'Lunes: 2:30 p.m. a 3:10 p.m.',
      'Miércoles: 8:15 a.m. a 9:00 a.m.',
      'Miércoles: 4:35 p.m. a 5:30 p.m.',
      'Viernes: 6:20 a.m. a 8:10 a.m.',
    ],
  },
  {
    name: 'Monica Montoya',
    courses: ['Décimo 1 COM'],
    subjects: ['Lengua Castellana'],
    schedules: [
      'Lunes: 10:25 a.m. a 11:20 a.m.',
      'Lunes: 12:45 p.m. a 1:30 p.m.',
      'Lunes: 3:20 p.m. a 4:00 p.m.',
      'Viernes: 10:25 a.m. a 12:10 p.m.',
      'Viernes: 12:45 p.m. a 1:30 p.m.',
    ],
  },
  {
    name: 'Olmes Gordillo',
    courses: ['Décimo 1 IND'],
    subjects: ['Modalidad Industrial'],
    schedules: [
      'Lunes: 7:20 a.m. a 8:10 a.m.',
      'Martes: 9:10 a.m. a 10:00 a.m.',
      'Martes: 1:40 p.m. a 2:20 p.m.',
      'Miércoles: 6:20 a.m. a 7:10 a.m.',
      'Jueves: 3:20 p.m. a 4:00 p.m.',
      'Viernes: 8:15 a.m. a 9:00 a.m.',
    ],
  },
  {
    name: 'Elizabeth Borelly',
    courses: ['Once 1 COM', 'Décimo 2 IND'],
    subjects: ['Ética', 'Religión', 'Cátedra de Paz'],
    schedules: [
      'Lunes: 3:20 p.m. a 4:00 p.m.',
      'Lunes: 4:35 p.m. a 5:30 p.m.',
      'Miércoles: 1:40 p.m. a 2:20 p.m.',
      'Viernes: 7:20 a.m. a 9:00 a.m.',
      'Viernes: 11:30 a.m. a 12:10 p.m.',
    ],
  },
  {
    name: 'Ricardo Gerena',
    courses: ['Noveno 2 IND', 'Once 2 IND'],
    subjects: ['Educación Física'],
    schedules: [
      'Martes: 10:25 a.m. a 11:20 a.m.',
      'Jueves: 10:25 a.m. a 11:20 a.m.',
      'Viernes: 7:20 a.m. a 8:10 a.m.',
      'Viernes: 10:25 a.m. a 11:20 a.m.',
      'Viernes: 1:40 p.m. a 2:20 p.m.',
      'Viernes: 4:35 p.m. a 5:30 p.m.',
    ],
  },
  {
    name: 'Olga Lucia Pacheco',
    courses: ['Once 1 IND'],
    subjects: ['Ciencias Sociales', 'Ética', 'Ciencia y Tecnología'],
    schedules: [
      'Martes: 1:40 p.m. a 2:20 p.m.',
      'Jueves: 11:30 a.m. a 12:10 p.m.',
      'Jueves: 1:40 p.m. a 3:10 p.m.',
      'Viernes: 7:20 a.m. a 8:10 a.m.',
      'Viernes: 9:10 a.m. a 10:00 a.m.',
    ],
  },
  {
    name: 'Jose Angel',
    courses: ['Noveno 3 IND'],
    subjects: ['Matemáticas', 'Física'],
    schedules: [
      'Lunes: 9:10 a.m. a 10:00 a.m.',
      'Lunes: 11:30 a.m. a 12:20 p.m.',
      'Lunes: 1:40 p.m. a 3:10 p.m.',
      'Martes: 11:30 a.m. a 12:10 p.m.',
      'Miércoles: 3:20 p.m. a 4:00 p.m.',
    ],
  },
  {
    name: 'Roosevel Lopez',
    courses: [],
    subjects: ['Bio-Química'],
    schedules: [
      'Lunes: 10:25 a.m. a 11:20 a.m.',
      'Lunes: 1:40 p.m. a 2:20 p.m.',
      'Miércoles: 7:20 a.m. a 8:10 a.m.',
      'Miércoles: 10:25 a.m. a 11:20 a.m.',
      'Jueves: 12:45 p.m. a 1:30 p.m.',
      'Viernes: 6:20 a.m. a 7:10 a.m.',
    ],
  },
  {
    name: 'Ivan Pardo',
    courses: [],
    subjects: ['Informática'],
    schedules: [
      'Lunes: 7:20 a.m. a 8:10 a.m.',
      'Lunes: 10:25 a.m. a 11:20 a.m.',
      'Miércoles: 7:20 a.m. a 8:10 a.m.',
      'Jueves: 9:10 a.m. a 10:00 a.m.',
      'Viernes: 6:20 a.m. a 7:10 a.m.',
    ],
  },
  {
    name: 'Gustavo García',
    courses: [],
    subjects: ['Educación Física', 'Ciencias Naturales'],
    schedules: [
      'Martes: 9:10 a.m. a 10:00 a.m.',
      'Martes: 1:40 p.m. a 2:20 p.m.',
      'Miércoles: 10:30 a.m. a 11:20 a.m.',
      'Jueves: 8:15 a.m. a 9:00 a.m.',
      'Jueves: 12:45 p.m. a 1:30 p.m.',
      'Viernes: 12:45 p.m. a 1:30 p.m.',
    ],
  },
];

export const GROUP_DIRECTORS = [
  { course: 'Jardín A', teacher: 'Angie Rodríguez' },
  { course: 'Transición A', teacher: 'Lina Sarria' },
  { course: 'Transición B', teacher: 'Angie Rodríguez' },
  { course: 'Transición C', teacher: 'Daniela Caicedo' },
  { course: 'Primero 1', teacher: 'Ana Elssy Cardona' },
  { course: 'Primero 2', teacher: 'Daniela Caicedo' },
  { course: 'Primero 3', teacher: 'Paola Girón' },
  { course: 'Primero 4', teacher: 'Diana Marcela Gutiérrez' },
  { course: 'Segundo 1', teacher: 'Viviana Rojas' },
  { course: 'Segundo 2', teacher: 'Francy Barona' },
  { course: 'Segundo 3', teacher: 'Francy Barona' },
  { course: 'Segundo 4', teacher: 'Sharon Castrillon' },
  { course: 'Tercero 1', teacher: 'Lady Rojas Aranda' },
  { course: 'Tercero 2', teacher: 'Paola Girón' },
  { course: 'Tercero 3', teacher: 'Lady Rojas Aranda' },
  { course: 'Tercero 4', teacher: 'Alexandra Cabal' },
  { course: 'Cuarto 1', teacher: 'Alexandra Cortés' },
  { course: 'Cuarto 2', teacher: 'Alexandra Cabal' },
  { course: 'Cuarto 3', teacher: 'Alexandra Cortés' },
  { course: 'Cuarto 4', teacher: 'Noe Garzon Garzon' },
  { course: 'Quinto 1', teacher: 'Noe Garzon Garzon' },
  { course: 'Quinto 2', teacher: 'Yimmi Lopez' },
  { course: 'Quinto 3', teacher: 'Yimmi Lopez' },
  { course: 'Sexto 1', teacher: 'Luz Angela Gasca' },
  { course: 'Sexto 2', teacher: 'Cielo Espinosa' },
  { course: 'Sexto 3', teacher: 'Cielo Espinosa' },
  { course: 'Sexto 4', teacher: 'John Benitez' },
  { course: 'Sexto 5', teacher: 'José Donaldo Gutiérrez' },
  { course: 'Séptimo 1 COM', teacher: 'Alejandro Molina' },
  { course: 'Séptimo 2 COM', teacher: 'Alejandro Molina' },
  { course: 'Séptimo 3 COM', teacher: 'Luz Angela Gasca' },
  { course: 'Séptimo 1 IND', teacher: 'Jorge Ramírez' },
  { course: 'Séptimo 2 IND', teacher: 'Jorge Ramírez' },
  { course: 'Octavo 1 COM', teacher: 'Viviana Cardoza' },
  { course: 'Octavo 2 COM', teacher: 'Mauricio Méndez' },
  { course: 'Octavo 1 IND', teacher: 'Carolina Peña' },
  { course: 'Octavo 2 IND', teacher: 'Carolina Peña' },
  { course: 'Noveno 1 COM', teacher: 'Luis E. Villalba' },
  { course: 'Noveno 2 COM', teacher: 'John Alegrias' },
  { course: 'Noveno 3 COM', teacher: 'Salome Espinosa' },
  { course: 'Noveno 1 IND', teacher: 'John Alegrias' },
  { course: 'Noveno 2 IND', teacher: 'Ricardo Gerena' },
  { course: 'Noveno 3 IND', teacher: 'Jose Angel' },
  { course: 'Décimo 1 COM', teacher: 'Monica Montoya' },
  { course: 'Décimo 2 COM', teacher: 'Luis E. Villalba' },
  { course: 'Décimo 1 IND', teacher: 'Olmes Gordillo' },
  { course: 'Décimo 2 IND', teacher: 'Elizabeth Borelly' },
  { course: 'Once 1 COM', teacher: 'Elizabeth Borelly' },
  { course: 'Once 2 COM', teacher: 'John Alegrias' },
  { course: 'Once 1 IND', teacher: 'Olga Lucia Pacheco' },
  { course: 'Once 2 IND', teacher: 'Ricardo Gerena' },
];

const teacherContext = TEACHERS.map((teacher) => {
  const courses = teacher.courses.length ? `Cursos: ${teacher.courses.join(', ')}.` : '';
  const subjects = teacher.subjects.length ? `Asignaturas: ${teacher.subjects.join(', ')}.` : '';
  return `${teacher.name}. ${courses} ${subjects} Horario de atención: ${teacher.schedules.join('; ')}.`;
}).join('\n');

const groupDirectorContext = GROUP_DIRECTORS.map(
  (item) => `${item.course}: director(a) de grupo ${item.teacher}.`
).join('\n');

export const SCHOOL_CONTEXT = `${GENERAL_CONTEXT}

BASE DE CONOCIMIENTO DEL SITIO WEB:
${KNOWLEDGE_ENTRIES.map((entry) => `${entry.title}:
${entry.answer}`).join('\n\n')}

DIRECTORES DE GRUPO 2026:
${groupDirectorContext}

HORARIO DE ATENCIÓN A PADRES DE FAMILIA - AÑO LECTIVO 2026:
${teacherContext}`;