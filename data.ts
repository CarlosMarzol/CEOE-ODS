import { Section, Question, QuestionOption } from './types';

export const SECTIONS: Section[] = [
  {
    id: 'gestion',
    title: 'Gestión',
    description: 'Estrategia, ética y buen gobierno para generar confianza.',
    color: 'bg-yellow-500',
    icon: 'Briefcase'
  },
  {
    id: 'personas',
    title: 'Personas',
    description: 'Protección, desarrollo e implicación de las personas.',
    color: 'bg-orange-500',
    icon: 'Users'
  },
  {
    id: 'planeta',
    title: 'Planeta',
    description: 'Gestión de impactos ambientales y mejora continua.',
    color: 'bg-teal-600',
    icon: 'Globe'
  },
  {
    id: 'prosperidad',
    title: 'Prosperidad',
    description: 'Impacto económico, innovación y relación con el entorno.',
    color: 'bg-blue-600',
    icon: 'TrendingUp'
  },
  {
    id: 'alianzas',
    title: 'Alianzas',
    description: 'Colaboración con otras entidades para objetivos comunes.',
    color: 'bg-indigo-600',
    icon: 'Handshake'
  }
];

export const OPTIONS: QuestionOption[] = [
  { value: 0, label: 'No iniciado', description: 'No existe / no se hace' },
  { value: 1, label: 'En proceso', description: 'En diseño, piloto o acciones puntuales' },
  { value: 2, label: 'Implantado', description: 'Se aplica de forma habitual' },
  { value: 3, label: 'Consolidado', description: 'Se aplica sistemáticamente y se revisa para mejorar' },
  { value: -1, label: 'No aplica / No lo sé', description: '' },
];

export const QUESTIONS: Question[] = [
  // GESTIÓN
  { id: 'g1', category: 'gestion', text: 'Estrategia/plan de sostenibilidad: en su empresa existe una hoja de ruta (objetivos, acciones y responsables).' },
  { id: 'g2', category: 'gestion', text: 'Objetivos y seguimiento: en su empresa se definen objetivos de sostenibilidad y se revisan de forma periódica.' },
  { id: 'g3', category: 'gestion', text: 'ODS prioritarios: en su empresa están identificados los ODS más relevantes y se han traducido en acciones.' },
  { id: 'g4', category: 'gestion', text: 'Código ético e integridad: existe un código ético o políticas de integridad (incluye prevención de corrupción).' },
  { id: 'g5', category: 'gestion', text: 'Políticas sociales básicas: existen políticas o medidas básicas en igualdad/no discriminación y condiciones laborales.' },
  { id: 'g6', category: 'gestion', text: 'Política ambiental básica: existen compromisos o políticas ambientales (energía, residuos, compras, etc.).' },
  { id: 'g7', category: 'gestion', text: 'Indicadores y responsables: se hace seguimiento con indicadores de sostenibilidad y hay responsables definidos.' },
  { id: 'g8', category: 'gestion', text: 'Comunicación/reporte: se comunican los avances en sostenibilidad (internamente y/o a públicos externos).' },
  { id: 'g9', category: 'gestion', text: 'Compras sostenibles: se aplican criterios de sostenibilidad en compras y contratación.' },
  
  // PERSONAS
  { id: 'p1', category: 'personas', text: 'Selección y contratación: los procesos son transparentes y con criterios objetivos.' },
  { id: 'p2', category: 'personas', text: 'Estabilidad del empleo: se hace seguimiento de rotación/temporalidad y se aplican acciones de mejora.' },
  { id: 'p3', category: 'personas', text: 'Jornada y horas extra: se registra la jornada y se gestionan las horas extra conforme a normativa.' },
  { id: 'p4', category: 'personas', text: 'Conciliación y flexibilidad: existen medidas de conciliación y flexibilidad y criterios equitativos.' },
  { id: 'p5', category: 'personas', text: 'Formación y desarrollo: se planifica la formación (plan anual) y se revisan necesidades.' },
  { id: 'p6', category: 'personas', text: 'Igualdad y no discriminación: existe una política o medidas para prevenir discriminación y promover igualdad.' },
  { id: 'p7', category: 'personas', text: 'Prevención del acoso: existe protocolo y canal confidencial para prevenir y actuar ante acoso.' },
  { id: 'p8', category: 'personas', text: 'Retribución y equidad salarial: hay criterios retributivos definidos y se revisa la equidad.' },
  { id: 'p9', category: 'personas', text: 'Gestión de PRL: están definidos roles y responsabilidades y se conocen.' },
  { id: 'p10', category: 'personas', text: 'Evaluación de riesgos: la evaluación de riesgos está actualizada y existe plan preventivo.' },

  // PLANETA
  { id: 'pl1', category: 'planeta', text: 'Energía: se registra y revisa el consumo energético (facturas, contadores).' },
  { id: 'pl2', category: 'planeta', text: 'Eficiencia energética: se aplican medidas para reducir el consumo (equipos, iluminación, hábitos).' },
  { id: 'pl3', category: 'planeta', text: 'Electricidad renovable: se utiliza electricidad de origen renovable (autoconsumo o contrato).' },
  { id: 'pl4', category: 'planeta', text: 'Agua: se registra y revisa el consumo de agua.' },
  { id: 'pl5', category: 'planeta', text: 'Huella de carbono: se estiman o calculan emisiones y se documenta el método.' },
  { id: 'pl6', category: 'planeta', text: 'Movilidad: se promueve movilidad sostenible (flota, rutas, viajes, teletrabajo).' },
  { id: 'pl7', category: 'planeta', text: 'Residuos: se separan y gestionan residuos con gestores/autorizaciones.' },
  { id: 'pl8', category: 'planeta', text: 'Residuos peligrosos: existe segregación, almacenamiento seguro y gestión conforme a normativa.' },
  { id: 'pl9', category: 'planeta', text: 'Plásticos de un solo uso: se reducen o sustituyen plásticos de un solo uso.' },
  { id: 'pl10', category: 'planeta', text: 'Compras con criterios ambientales: se incorporan criterios ambientales en compras.' },

  // PROSPERIDAD
  { id: 'pr1', category: 'prosperidad', text: 'Viabilidad económica: se realiza seguimiento de resultados, costes y liquidez.' },
  { id: 'pr2', category: 'prosperidad', text: 'Decisiones basadas en datos: se utilizan datos económico-financieros para planificar.' },
  { id: 'pr3', category: 'prosperidad', text: 'Innovación en productos/servicios: existe proceso para identificar e introducir mejoras.' },
  { id: 'pr4', category: 'prosperidad', text: 'Digitalización: se usan herramientas digitales para mejorar gestión y productividad.' },
  { id: 'pr5', category: 'prosperidad', text: 'Clientes: existen prácticas de transparencia, calidad, atención responsable y reclamaciones.' },
  { id: 'pr6', category: 'prosperidad', text: 'Proveedores locales: se prioriza o fomenta la contratación de proveedores locales.' },
  { id: 'pr7', category: 'prosperidad', text: 'Pago responsable: se respetan plazos de pago y prácticas comerciales justas.' },
  { id: 'pr8', category: 'prosperidad', text: 'Impacto local: se identifica y/o hace seguimiento del impacto económico en el entorno.' },

  // ALIANZAS
  { id: 'a1', category: 'alianzas', text: 'Colaboración empresarial: se participa en proyectos o iniciativas conjuntas con otras empresas.' },
  { id: 'a2', category: 'alianzas', text: 'Asociaciones y clústeres: participa activamente en asociaciones o redes empresariales.' },
  { id: 'a3', category: 'alianzas', text: 'Administraciones públicas: colabora con administraciones en programas o iniciativas.' },
  { id: 'a4', category: 'alianzas', text: 'Entidades sociales: colabora con ONG, fundaciones u organizaciones sociales.' },
  { id: 'a5', category: 'alianzas', text: 'Centros educativos: colabora con centros de formación o universidades.' },
  { id: 'a6', category: 'alianzas', text: 'Patrocinios y apoyos: apoya iniciativas externas (culturales, sociales, ambientales).' },
  { id: 'a7', category: 'alianzas', text: 'Intercambio de buenas prácticas: comparte y/o recibe buenas prácticas en sostenibilidad.' }
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
  'D. Suministro de energía',
  'E. Suministro de agua y saneamiento',
  'F. Construcción',
  'G. Comercio; reparación de vehículos',
  'H. Transporte y almacenamiento',
  'I. Hostelería',
  'J. Información y comunicaciones',
  'K. Actividades financieras y de seguros',
  'L. Actividades inmobiliarias',
  'M. Actividades profesionales, científicas y técnicas',
  'N. Actividades administrativas y servicios auxiliares',
  'O. Administración pública',
  'P. Educación',
  'Q. Actividades sanitarias',
  'R. Actividades artísticas y recreativas',
  'S. Otros servicios'
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
  'Fuera de Canarias'
];

export const ROLES = [
  'Dirección / Gerencia',
  'Sostenibilidad / RSC / ESG',
  'Administración / Finanzas',
  'Personas / RRHH',
  'Operaciones / Producción',
  'Calidad / Medio ambiente / PRL',
  'Comercial / Marketing',
  'Propietario/a'
];
