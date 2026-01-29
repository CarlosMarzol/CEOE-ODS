import { Section, Question, QuestionOption } from './types';

export const SECTIONS: Section[] = [
  {
    id: 'gestion',
    title: 'Gestión y Estrategia',
    description: 'Liderazgo, ética y buen gobierno corporativo.',
    color: 'bg-yellow-500',
    icon: 'Briefcase'
  },
  {
    id: 'personas',
    title: 'Personas',
    description: 'Condiciones laborales, igualdad y desarrollo del talento.',
    color: 'bg-orange-500',
    icon: 'Users'
  },
  {
    id: 'planeta',
    title: 'Planeta',
    description: 'Gestión ambiental, economía circular y descarbonización.',
    color: 'bg-teal-600',
    icon: 'Globe'
  },
  {
    id: 'prosperidad',
    title: 'Prosperidad',
    description: 'Innovación, impacto económico y cadena de valor.',
    color: 'bg-blue-600',
    icon: 'TrendingUp'
  },
  {
    id: 'alianzas',
    title: 'Alianzas',
    description: 'Colaboración institucional y compromiso social.',
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
        inicial: "Prioridad: Redacte un documento sencillo de 'Compromiso con la Sostenibilidad' y asígnele la responsabilidad a una persona del equipo, aunque no sea a tiempo completo.",
        proceso: "Formalice su estrategia: Defina 3 objetivos anuales de sostenibilidad (ej. reducir papel, formación empleados) y revíselos semestralmente en comité de dirección.",
        avanzado: "Integre la sostenibilidad en el núcleo: Vincule parte de la retribución variable a objetivos ESG y elabore un Código Ético con canal de denuncias.",
        lider: "Excelencia: Publique una Memoria de Sostenibilidad verificada externamente y lidere foros sectoriales sobre ética empresarial y transparencia."
    },
    personas: {
        inicial: "Cumplimiento: Asegure estrictamente el registro horario y la prevención de riesgos. Formalice los contratos y descripciones de puesto.",
        proceso: "Desarrollo: Implemente un plan de formación anual detectando necesidades reales. Active un protocolo de prevención del acoso conocido por todos.",
        avanzado: "Bienestar: Mida el clima laboral con encuestas anónimas y ofrezca medidas de flexibilidad horaria y teletrabajo superiores a la ley.",
        lider: "Talento Diverso: Implemente currículum ciego en selección, programas de liderazgo femenino y auditorías de brecha salarial proactivas."
    },
    planeta: {
        inicial: "Control Básico: Recopile todas las facturas de energía, agua y combustible en un Excel para tener una línea base de consumo.",
        proceso: "Eficiencia: Cambie iluminación a LED, instale sensores de presencia y segregue residuos más allá de lo obligatorio. Sensibilice a la plantilla.",
        avanzado: "Medición de Impacto: Calcule su Huella de Carbono (Alcance 1 y 2) y contrate energía eléctrica con certificado de origen 100% renovable.",
        lider: "Net Zero: Establezca objetivos de reducción basados en la ciencia (SBTi), compense emisiones residuales e innove en ecodiseño de productos."
    },
    prosperidad: {
        inicial: "Orden Financiero: Digitalice su facturación y asegure el control de flujo de caja. Pague a proveedores en plazo para sostener la cadena.",
        proceso: "Digitalización: Implante un CRM/ERP básico. Priorice proveedores locales para generar riqueza en su entorno inmediato.",
        avanzado: "Innovación: Dedique presupuesto a I+D+i para desarrollar productos/servicios más sostenibles. Evalúe a proveedores con criterios ESG.",
        lider: "Valor Compartido: Mida su contribución al PIB local y el retorno social de sus inversiones (SROI). Desarrolle modelos de negocio circulares."
    },
    alianzas: {
        inicial: "Conexión: Asóciese a su organización empresarial sectorial o territorial. Participe en eventos de networking locales.",
        proceso: "Colaboración Puntual: Realice alguna acción de voluntariado corporativo o donación a una entidad social local una vez al año.",
        avanzado: "Alianzas Estratégicas: Firme convenios estables con centros educativos (FP Dual) o ONGs para proyectos de integración laboral.",
        lider: "Liderazgo Social: Impulse proyectos multi-actor (Empresa-Universidad-Administración) para resolver retos sociales complejos del entorno."
    }
};

export const OPTIONS: QuestionOption[] = [
  { value: 0, label: 'No iniciado', description: 'No existe o no se hace.' },
  { value: 1, label: 'En proceso', description: 'Se están dando los primeros pasos.' },
  { value: 2, label: 'Implantado', description: 'Se aplica de forma habitual.' },
  { value: 3, label: 'Consolidado', description: 'Sistemático, se mide y mejora.' },
  { value: -1, label: 'No aplica', description: 'No relevante para mi actividad.' },
];

export const QUESTIONS: Question[] = [
  // GESTIÓN
  { id: 'g1', category: 'gestion', text: 'Estrategia: ¿Existe una hoja de ruta con objetivos de sostenibilidad claros?' },
  { id: 'g2', category: 'gestion', text: 'Seguimiento: ¿Se revisan periódicamente los indicadores de desempeño no financiero?' },
  { id: 'g3', category: 'gestion', text: 'ODS: ¿Ha identificado qué ODS son prioritarios para su negocio?' },
  { id: 'g4', category: 'gestion', text: 'Ética: ¿Dispone de un Código Ético o de Conducta conocido por la plantilla?' },
  { id: 'g5', category: 'gestion', text: 'Responsables: ¿Hay una persona o comité asignado para impulsar estos temas?' },
  { id: 'g6', category: 'gestion', text: 'Reporte: ¿Comunica sus avances en sostenibilidad (web, memoria, redes)?' },
  { id: 'g7', category: 'gestion', text: 'Compras: ¿Aplica criterios de sostenibilidad al seleccionar proveedores?' },
  { id: 'g8', category: 'gestion', text: 'Cumplimiento: ¿Tiene un sistema para asegurar el cumplimiento legal actualizado?' },
  { id: 'g9', category: 'gestion', text: 'Certificaciones: ¿Cuenta con certificaciones (ISO 9001, 14001, B Corp, etc.)?' },
  
  // PERSONAS
  { id: 'p1', category: 'personas', text: 'Selección: ¿Son los procesos de selección transparentes y libres de sesgos?' },
  { id: 'p2', category: 'personas', text: 'Estabilidad: ¿Fomenta la contratación indefinida y reduce la temporalidad?' },
  { id: 'p3', category: 'personas', text: 'Conciliación: ¿Ofrece medidas de flexibilidad horaria o teletrabajo?' },
  { id: 'p4', category: 'personas', text: 'Formación: ¿Tiene un plan de formación financiado por la empresa?' },
  { id: 'p5', category: 'personas', text: 'Igualdad: ¿Aplica medidas efectivas para garantizar la igualdad de oportunidades?' },
  { id: 'p6', category: 'personas', text: 'Acoso: ¿Existe un protocolo contra el acoso laboral y sexual?' },
  { id: 'p7', category: 'personas', text: 'Salud: ¿Va más allá de la ley en vigilancia de la salud y bienestar?' },
  { id: 'p8', category: 'personas', text: 'Brecha Salarial: ¿Analiza y corrige posibles desigualdades salariales?' },
  { id: 'p9', category: 'personas', text: 'Diversidad: ¿Tiene políticas activas de inclusión (discapacidad, edad, etc.)?' },
  { id: 'p10', category: 'personas', text: 'Clima: ¿Mide la satisfacción de los empleados regularmente?' },

  // PLANETA
  { id: 'pl1', category: 'planeta', text: 'Energía: ¿Monitoriza el consumo eléctrico y de combustibles?' },
  { id: 'pl2', category: 'planeta', text: 'Eficiencia: ¿Ha implementado medidas de ahorro (LEDs, sensores, aislamiento)?' },
  { id: 'pl3', category: 'planeta', text: 'Renovables: ¿Consume energía renovable (contrato verde o autoconsumo)?' },
  { id: 'pl4', category: 'planeta', text: 'Agua: ¿Controla el consumo de agua y aplica medidas de ahorro?' },
  { id: 'pl5', category: 'planeta', text: 'Carbono: ¿Calcula la huella de carbono de su actividad?' },
  { id: 'pl6', category: 'planeta', text: 'Movilidad: ¿Fomenta el transporte sostenible entre empleados o en logística?' },
  { id: 'pl7', category: 'planeta', text: 'Residuos: ¿Separa correctamente los residuos para su reciclaje?' },
  { id: 'pl8', category: 'planeta', text: 'Peligrosos: ¿Gestiona adecuadamente los residuos peligrosos/químicos?' },
  { id: 'pl9', category: 'planeta', text: 'Circularidad: ¿Diseña productos/servicios pensando en su vida útil y reciclaje?' },
  { id: 'pl10', category: 'planeta', text: 'Insumos: ¿Prioriza materiales reciclados o sostenibles?' },

  // PROSPERIDAD
  { id: 'pr1', category: 'prosperidad', text: 'Viabilidad: ¿Realiza presupuestos anuales y control de gestión?' },
  { id: 'pr2', category: 'prosperidad', text: 'Datos: ¿Toma decisiones basadas en datos financieros actualizados?' },
  { id: 'pr3', category: 'prosperidad', text: 'Innovación: ¿Dedica recursos a mejorar productos o procesos?' },
  { id: 'pr4', category: 'prosperidad', text: 'Digital: ¿Utiliza herramientas digitales para la gestión (ERP, CRM)?' },
  { id: 'pr5', category: 'prosperidad', text: 'Calidad: ¿Tiene procesos para asegurar la calidad y satisfacción del cliente?' },
  { id: 'pr6', category: 'prosperidad', text: 'Local: ¿Prioriza proveedores locales (Km 0) cuando es posible?' },
  { id: 'pr7', category: 'prosperidad', text: 'Pagos: ¿Cumple rigurosamente los plazos de pago legales?' },
  { id: 'pr8', category: 'prosperidad', text: 'Fiscalidad: ¿Cumple sus obligaciones fiscales de forma transparente?' },

  // ALIANZAS
  { id: 'a1', category: 'alianzas', text: 'Sectorial: ¿Participa en asociaciones empresariales?' },
  { id: 'a2', category: 'alianzas', text: 'Público: ¿Colabora con la administración local o regional?' },
  { id: 'a3', category: 'alianzas', text: 'Social: ¿Colabora con ONGs o entidades sociales?' },
  { id: 'a4', category: 'alianzas', text: 'Educación: ¿Acoge alumnos en prácticas o FP Dual?' },
  { id: 'a5', category: 'alianzas', text: 'Voluntariado: ¿Facilita el voluntariado de sus empleados?' },
  { id: 'a6', category: 'alianzas', text: 'Conocimiento: ¿Comparte buenas prácticas con otras empresas?' },
  { id: 'a7', category: 'alianzas', text: 'Mecenazgo: ¿Patrocina actividades culturales o deportivas locales?' }
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