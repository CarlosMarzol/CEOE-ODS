
import { Section, Question, QuestionOption } from './types';

export const SECTIONS: Section[] = [
  {
    id: 'gestion',
    title: 'GESTIÓN',
    description: 'Estrategia, gobernanza, ética, riesgos, compras y buen gobierno para generar confianza y estabilidad.',
    color: 'bg-yellow-500',
    icon: 'Briefcase'
  },
  {
    id: 'personas',
    title: 'PERSONAS',
    description: 'Empleo, condiciones laborales, igualdad, salud y seguridad, bienestar y formación.',
    color: 'bg-orange-500',
    icon: 'Users'
  },
  {
    id: 'planeta',
    title: 'PLANETA',
    description: 'Gestión de impactos ambientales: energía, agua, emisiones, residuos, economía circular y movilidad.',
    color: 'bg-teal-600',
    icon: 'Globe'
  },
  {
    id: 'prosperidad',
    title: 'PROSPERIDAD',
    description: 'Viabilidad económica, innovación, digitalización, relación con clientes y proveedores, e impacto local.',
    color: 'bg-blue-600',
    icon: 'TrendingUp'
  },
  {
    id: 'alianzas',
    title: 'ALIANZAS',
    description: 'Colaboración con otras entidades, asociaciones, sector público y social alineadas con los ODS.',
    color: 'bg-indigo-600',
    icon: 'Handshake'
  }
];

export const MATURITY_LEVELS = {
    inicial: { label: 'Inicial', min: 0, max: 25 },
    proceso: { label: 'En Proceso', min: 26, max: 50 },
    avanzado: { label: 'Avanzado', min: 51, max: 80 },
    lider: { label: 'Líder', min: 81, max: 100 }
};

export const RECOMMENDATIONS: Record<string, Record<string, string>> = {
    gestion: {
        inicial: "Prioridad: Redacte un documento sencillo de 'Compromiso con la Sostenibilidad' y asígnele la responsabilidad a una persona del equipo.",
        proceso: "Formalice su estrategia: Defina objetivos anuales de sostenibilidad y revíselos periódicamente en la dirección.",
        avanzado: "Integre la sostenibilidad: Vincule objetivos al desempeño y elabore un Código Ético con canal de denuncias.",
        lider: "Excelencia: Publique una Memoria de Sostenibilidad y lidere en ética y transparencia sectorial."
    },
    personas: {
        inicial: "Cumplimiento: Asegure el registro horario, prevención de riesgos y contratos formalizados.",
        proceso: "Desarrollo: Implemente planes de formación y protocolos de prevención del acoso.",
        avanzado: "Bienestar: Mida el clima laboral y ofrezca medidas de conciliación superiores a la ley.",
        lider: "Talento Diverso: Implemente currículum ciego, igualdad retributiva auditada y planes de bienestar integral."
    },
    planeta: {
        inicial: "Control Básico: Registre facturas de energía, agua y combustible para tener una línea base.",
        proceso: "Eficiencia: Implemente medidas de ahorro (LEDs, sensores) y segregación de residuos.",
        avanzado: "Medición: Calcule su Huella de Carbono y contrate energía 100% renovable.",
        lider: "Net Zero: Objetivos de reducción basados en ciencia, economía circular y ecodiseño."
    },
    prosperidad: {
        inicial: "Orden Financiero: Digitalice facturación y asegure control de flujo de caja y pagos.",
        proceso: "Digitalización: Implante herramientas de gestión y priorice proveedores locales.",
        avanzado: "Innovación: Invierta en I+D+i y evalúe a proveedores con criterios ESG.",
        lider: "Valor Compartido: Mida el impacto social y económico en el entorno y promueva la innovación abierta."
    },
    alianzas: {
        inicial: "Conexión: Asóciese a organizaciones sectoriales y participe en eventos locales.",
        proceso: "Colaboración: Realice acciones puntuales con entidades sociales o educativas.",
        avanzado: "Estratégico: Firme convenios estables con ONGs o centros de FP Dual.",
        lider: "Liderazgo: Impulse proyectos multi-actor para resolver retos sociales complejos."
    }
};

export const OPTIONS: QuestionOption[] = [
  { value: 0, label: '0. No iniciado', description: 'No existe / no se hace.' },
  { value: 1, label: '1. En proceso', description: 'En diseño, piloto o acciones puntuales.' },
  { value: 2, label: '2. Implantado', description: 'Se aplica de forma habitual.' },
  { value: 3, label: '3. Consolidado', description: 'Se aplica de forma sistemática y se hace seguimiento para mejorar.' },
  { value: 0.1, label: 'No lo sé', description: 'No dispongo de información.' }, // Treated as almost 0 but visually distinct
  { value: -1, label: 'No aplica', description: 'A mi empresa/actividad.' },
];

export const QUESTIONS: Question[] = [
  // --- GESTIÓN (12 preguntas) ---
  { id: 'g1', category: 'gestion', text: 'Estrategia/plan de sostenibilidad: en su empresa existe una hoja de ruta (objetivos, acciones y responsables), aunque sea sencilla.' },
  { id: 'g2', category: 'gestion', text: 'Objetivos y seguimiento: en su empresa se definen objetivos de sostenibilidad y se revisan de forma periódica.' },
  { id: 'g3', category: 'gestion', text: 'ODS prioritarios: en su empresa están identificados los ODS más relevantes y se han traducido en acciones o iniciativas concretas.' },
  { id: 'g4', category: 'gestion', text: 'Código ético e integridad: en su empresa existe un código ético o políticas de integridad (incluye prevención de corrupción) y mecanismos para aplicarlo.' },
  { id: 'g5', category: 'gestion', text: 'Políticas sociales básicas: en su empresa existen políticas o medidas básicas en igualdad/no discriminación y condiciones laborales.' },
  { id: 'g6', category: 'gestion', text: 'Política ambiental básica: en su empresa existen compromisos o políticas ambientales (energía, residuos, compras, etc.).' },
  { id: 'g7', category: 'gestion', text: 'Indicadores y responsables: en su empresa se hace seguimiento con indicadores de sostenibilidad y hay responsables definidos.' },
  { id: 'g8', category: 'gestion', text: 'Comunicación/reporte: en su empresa se comunican los avances en sostenibilidad (internamente y/o a públicos externos).' },
  { id: 'g9', category: 'gestion', text: 'Compras sostenibles: en su empresa se aplican criterios de sostenibilidad en compras y contratación (requisitos, cláusulas, certificaciones o equivalentes).' },
  { id: 'g10', category: 'gestion', text: 'Gestión de proveedores: en su empresa se evalúa a proveedores críticos (por riesgo/criticidad) y se promueven mejoras cuando procede.' },
  { id: 'g11', category: 'gestion', text: 'Riesgos y cumplimiento: en su empresa se identifican requisitos y riesgos relevantes en sostenibilidad y se gestionan.' },
  { id: 'g12', category: 'gestion', text: 'Grupos de interés: en su empresa existen canales para consultas/quejas/sugerencias (clientes, plantilla, proveedores, comunidad) y se responde.' },

  // --- PERSONAS (23 preguntas) ---
  { id: 'p1', category: 'personas', text: 'Selección y contratación: en su empresa los procesos de selección son transparentes y con criterios objetivos (perfiles definidos y registros).' },
  { id: 'p2', category: 'personas', text: 'Estabilidad del empleo: en su empresa se hace seguimiento de rotación/temporalidad y se aplican acciones de mejora.' },
  { id: 'p3', category: 'personas', text: 'Jornada y horas extra: en su empresa se registra la jornada y se gestionan las horas extra de forma planificada y conforme a normativa.' },
  { id: 'p4', category: 'personas', text: 'Conciliación y flexibilidad: en su empresa existen medidas de conciliación/flexibilidad y criterios para aplicarlas de forma equitativa.' },
  { id: 'p5', category: 'personas', text: 'Formación y desarrollo: en su empresa se planifica la formación (plan anual o acciones periódicas) y se revisan necesidades.' },
  { id: 'p6', category: 'personas', text: 'Desempeño y feedback: en su empresa se evalúa el desempeño de forma periódica (objetivos, entrevistas y/o feedback).' },
  { id: 'p7', category: 'personas', text: 'Comunicación interna y participación: en su empresa hay canales para informar, recoger propuestas y dar respuesta.' },
  { id: 'p8', category: 'personas', text: 'Igualdad y no discriminación: en su empresa existe una política o medidas para prevenir discriminación y promover igualdad.' },
  { id: 'p9', category: 'personas', text: 'Prevención del acoso: en su empresa existe protocolo y canal confidencial para prevenir y actuar ante acoso (laboral/sexual) y se conoce internamente.' },
  { id: 'p10', category: 'personas', text: 'Retribución y equidad salarial: en su empresa hay criterios retributivos definidos y se revisa la equidad (incluida brecha salarial cuando procede).' },
  { id: 'p11', category: 'personas', text: 'Inclusión y accesibilidad: en su empresa se aplican adaptaciones razonables y medidas de accesibilidad cuando es necesario.' },
  { id: 'p12', category: 'personas', text: 'Subcontratas/ETT: en su empresa se exigen condiciones laborales mínimas y cumplimiento a empresas subcontratadas o ETT, cuando corresponde.' },
  { id: 'p13', category: 'personas', text: 'Gestión de PRL: en su empresa están definidos roles y responsabilidades (responsable interno y/o servicio de prevención) y se conocen.' },
  { id: 'p14', category: 'personas', text: 'Evaluación de riesgos: en su empresa la evaluación de riesgos está actualizada y existe un plan preventivo asociado.' },
  { id: 'p15', category: 'personas', text: 'Formación en PRL: en su empresa se realiza formación inicial y periódica, especialmente en puestos con mayor riesgo.' },
  { id: 'p16', category: 'personas', text: 'Incidentes y accidentes: en su empresa se registran, investigan causas y se aplican medidas correctoras cuando ocurre un incidente.' },
  { id: 'p17', category: 'personas', text: 'EPIs y procedimientos: en su empresa hay EPIs disponibles y procedimientos definidos, y se verifica su uso cuando corresponde.' },
  { id: 'p18', category: 'personas', text: 'Vigilancia de la salud: en su empresa se ofrece/gestiona conforme a normativa y se utiliza para mejorar la prevención.' },
  { id: 'p19', category: 'personas', text: 'Riesgos psicosociales: en su empresa se evalúan factores psicosociales (estrés, carga, etc.) y se aplican acciones de mejora.' },
  { id: 'p20', category: 'personas', text: 'Bienestar y clima: en su empresa se mide clima/bienestar (encuesta u otros) y se ejecutan acciones a partir de resultados.' },
  { id: 'p21', category: 'personas', text: 'Desconexión digital: en su empresa existen pautas o medidas para respetar tiempos de descanso y desconexión.' },
  { id: 'p22', category: 'personas', text: 'Canal interno de quejas/sugerencias: en su empresa existe canal y un procedimiento de respuesta (plazos, responsables y seguimiento).' },
  { id: 'p23', category: 'personas', text: 'Mejora continua en SST/bienestar: en su empresa existe un plan de mejora y se revisa periódicamente.' },

  // --- PLANETA (24 preguntas) ---
  { id: 'pl1', category: 'planeta', text: 'Energía: en su empresa se registra y revisa el consumo energético (facturas, contadores o registros internos).' },
  { id: 'pl2', category: 'planeta', text: 'Eficiencia energética: en su empresa se aplican medidas para reducir el consumo (equipos, iluminación, climatización y hábitos).' },
  { id: 'pl3', category: 'planeta', text: 'Electricidad renovable: en su empresa se utiliza electricidad de origen renovable (autoconsumo y/o contrato con garantías).' },
  { id: 'pl4', category: 'planeta', text: 'Agua: en su empresa se registra y revisa el consumo de agua (facturas, contadores o registros internos).' },
  { id: 'pl5', category: 'planeta', text: 'Eficiencia hídrica: en su empresa se aplican medidas para reducir el consumo de agua (fugas, equipos y/o procesos).' },
  { id: 'pl6', category: 'planeta', text: 'Vertidos/aguas residuales: en su empresa se gestionan autorizaciones, controles y buenas prácticas cuando corresponde.' },
  { id: 'pl7', category: 'planeta', text: 'Huella de carbono: en su empresa se estiman o calculan emisiones (al menos energía y combustibles) y se documenta el método.' },
  { id: 'pl8', category: 'planeta', text: 'Reducción de emisiones: en su empresa existen medidas o un plan para reducir emisiones y mejorar el desempeño climático.' },
  { id: 'pl9', category: 'planeta', text: 'Movilidad: en su empresa se promueve movilidad sostenible (flota, rutas, viajes, teletrabajo, desplazamientos) cuando corresponde.' },
  { id: 'pl10', category: 'planeta', text: 'Refrigerantes y gases: en su empresa se controlan equipos, mantenimiento y fugas de refrigerantes conforme a normativa.' },
  { id: 'pl11', category: 'planeta', text: 'Riesgos climáticos: en su empresa se identifican riesgos (olas de calor, suministro, inundaciones, etc.) y medidas básicas de adaptación.' },
  { id: 'pl12', category: 'planeta', text: 'Cumplimiento ambiental: en su empresa se identifican requisitos aplicables (licencias/obligaciones) y se verifica su cumplimiento periódicamente.' },
  { id: 'pl13', category: 'planeta', text: 'Residuos: en su empresa se separan y gestionan residuos con gestores/autorizaciones cuando corresponde.' },
  { id: 'pl14', category: 'planeta', text: 'Residuos: en su empresa se registran cantidades o evidencias de gestión (contratos, albaranes, certificados) cuando es posible.' },
  { id: 'pl15', category: 'planeta', text: 'Residuos peligrosos: en su empresa existe segregación, almacenamiento seguro y gestión conforme a normativa cuando corresponde.' },
  { id: 'pl16', category: 'planeta', text: 'Prevención de residuos: en su empresa se aplican medidas para evitar residuos en origen (reducción, reutilización y compras).' },
  { id: 'pl17', category: 'planeta', text: 'Reutilización y reciclaje: en su empresa se favorecen la reutilización y el reciclaje (interno y/o con gestores) y se revisan resultados cuando es posible.' },
  { id: 'pl18', category: 'planeta', text: 'RAEE y consumibles: en su empresa se gestionan correctamente equipos eléctricos/electrónicos, tóner, pilas y similares.' },
  { id: 'pl19', category: 'planeta', text: 'Plásticos de un solo uso: en su empresa se reducen o sustituyen plásticos de un solo uso en operaciones y eventos.' },
  { id: 'pl20', category: 'planeta', text: 'Papel y digitalización: en su empresa se reduce la impresión y se promueve documentación digital y buenas prácticas de archivo.' },
  { id: 'pl21', category: 'planeta', text: 'Compras con criterios ambientales: en su empresa se incorporan criterios ambientales en compras (materiales, proveedores, certificaciones o equivalentes).' },
  { id: 'pl22', category: 'planeta', text: 'Envases y embalajes: en su empresa se reducen, reutilizan o mejoran embalajes y se priorizan opciones más sostenibles cuando corresponde.' },
  { id: 'pl23', category: 'planeta', text: 'Producto/servicio: en su empresa se consideran mejoras ambientales en diseño o prestación (durabilidad, eficiencia, circularidad) cuando corresponde.' },
  { id: 'pl24', category: 'planeta', text: 'Sensibilización ambiental interna: en su empresa se realizan acciones de comunicación o formación para implicar a la plantilla.' },

  // --- PROSPERIDAD (11 preguntas) ---
  { id: 'pr1', category: 'prosperidad', text: 'Viabilidad económica: en su empresa se realiza seguimiento de resultados, costes y liquidez del negocio.' },
  { id: 'pr2', category: 'prosperidad', text: 'Decisiones basadas en datos: en su empresa se utilizan datos económico-financieros para planificar y tomar decisiones relevantes.' },
  { id: 'pr3', category: 'prosperidad', text: 'Crecimiento responsable: en su empresa, al planificar crecimiento/inversiones, se consideran impactos en personas y entorno.' },
  { id: 'pr4', category: 'prosperidad', text: 'Innovación en productos/servicios: en su empresa existe un proceso para identificar e introducir mejoras/innovaciones en la oferta.' },
  { id: 'pr5', category: 'prosperidad', text: 'Innovación en procesos: en su empresa existe un proceso de mejora continua para ganar eficiencia y calidad.' },
  { id: 'pr6', category: 'prosperidad', text: 'Digitalización: en su empresa se usan herramientas digitales para mejorar gestión, productividad o relación con clientes (con enfoque planificado).' },
  { id: 'pr7', category: 'prosperidad', text: 'Clientes: en su empresa existen prácticas de transparencia, calidad, atención responsable y gestión de reclamaciones.' },
  { id: 'pr8', category: 'prosperidad', text: 'Proveedores locales: en su empresa se prioriza o fomenta la contratación de proveedores locales cuando es viable.' },
  { id: 'pr9', category: 'prosperidad', text: 'Pago responsable: en su empresa se respetan plazos de pago y prácticas comerciales justas.' },
  { id: 'pr10', category: 'prosperidad', text: 'Impacto local: en su empresa se identifica y/o hace seguimiento del impacto económico en el entorno local (empleo, compras, etc.).' },
  { id: 'pr11', category: 'prosperidad', text: 'Redes y proyectos: en su empresa se participa activamente en redes, asociaciones o proyectos colaborativos.' },

  // --- ALIANZAS (12 preguntas) ---
  { id: 'a1', category: 'alianzas', text: 'Colaboración empresarial: su empresa participa en proyectos o iniciativas conjuntas con otras empresas.' },
  { id: 'a2', category: 'alianzas', text: 'Asociaciones y clústeres: su empresa participa activamente en asociaciones, clústeres o redes empresariales.' },
  { id: 'a3', category: 'alianzas', text: 'Administraciones públicas: su empresa colabora con administraciones en programas, proyectos o iniciativas.' },
  { id: 'a4', category: 'alianzas', text: 'Entidades sociales: su empresa colabora con ONG, fundaciones u organizaciones sociales.' },
  { id: 'a5', category: 'alianzas', text: 'Centros educativos/tecnológicos: su empresa colabora con centros de formación, universidades o centros tecnológicos.' },
  { id: 'a6', category: 'alianzas', text: 'Proyectos vinculados a ODS: su empresa participa en proyectos colaborativos alineados con ODS prioritarios.' },
  { id: 'a7', category: 'alianzas', text: 'Patrocinios y apoyos: su empresa apoya iniciativas externas (culturales, sociales, ambientales, deportivas, etc.).' },
  { id: 'a8', category: 'alianzas', text: 'Voluntariado corporativo: su empresa impulsa o facilita la participación del personal en acciones de voluntariado cuando corresponde.' },
  { id: 'a9', category: 'alianzas', text: 'Compras con impacto: su empresa prioriza proveedores o servicios con impacto social o ambiental positivo cuando es viable.' },
  { id: 'a10', category: 'alianzas', text: 'Intercambio de buenas prácticas: su empresa comparte y/o recibe buenas prácticas en sostenibilidad.' },
  { id: 'a11', category: 'alianzas', text: 'Evaluación de alianzas: su empresa evalúa resultados o impacto de las colaboraciones.' },
  { id: 'a12', category: 'alianzas', text: 'Visión a largo plazo: las alianzas se integran en la estrategia y no son solo acciones puntuales.' }
];

export const COMPANY_SIZE_OPTIONS = [
  'Microempresa (1-9)',
  'Pequeña (10-49)',
  'Mediana (50-249)',
  'Grande (250 o más)',
  'No lo sé / Prefiero no decir'
];

export const SECTORS = [
  'A. Agricultura, ganadería, silvicultura y pesca',
  'B. Industrias extractivas',
  'C. Industria manufacturera',
  'D. Suministro de energía eléctrica, gas, vapor y aire acondicionado',
  'E. Suministro de agua; saneamiento, residuos y descontaminación',
  'F. Construcción',
  'G. Comercio; reparación de vehículos de motor y motocicletas',
  'H. Transporte y almacenamiento',
  'I. Hostelería',
  'J. Información y comunicaciones',
  'K. Actividades financieras y de seguros',
  'L. Actividades inmobiliarias',
  'M. Actividades profesionales, científicas y técnicas',
  'N. Actividades administrativas y servicios auxiliares',
  'O. Administración pública y defensa; Seguridad Social obligatoria',
  'P. Educación',
  'Q. Actividades sanitarias y de servicios sociales',
  'R. Actividades artísticas, recreativas y de entretenimiento',
  'S. Otros servicios',
  'T. Hogares como empleadores; bienes/servicios para uso propio',
  'U. Organismos extraterritoriales',
  'No lo sé / Prefiero no decir',
  'Otro'
];

export const LOCATIONS = [
  'Tenerife',
  'Gran Canaria',
  'La Palma',
  'La Gomera',
  'El Hierro',
  'Lanzarote',
  'Fuerteventura',
  'La Graciosa',
  'Fuera de Canarias',
  'Otro'
];

export const ROLES = [
  'Dirección / Gerencia',
  'Sostenibilidad / RSC / ESG',
  'Administración / Finanzas',
  'Personas / RRHH',
  'Operaciones / Producción',
  'Calidad / Medio ambiente / PRL',
  'Comercial / Marketing',
  'Personal técnico / Administrativo',
  'Propietario/a · Autónomo/a',
  'Prefiero no decirlo',
  'Otro'
];
