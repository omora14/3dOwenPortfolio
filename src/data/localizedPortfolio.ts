import type { Locale } from "@/i18n/LocaleProvider";
import {
  aboutParagraphs as aboutEn,
  education as educationEn,
  experience as experienceEn,
  profile as profileEn,
  projects as projectsEn,
} from "./portfolio";

const aboutEs = [
  "Creci en la costa pacifica de Costa Rica, un lugar que marco mis raices y me dio un amor profundo por este mundo. Desde muy temprano, la tecnologia me fascino. Antes de venir a Estados Unidos, dedique dos anos de mi vida a servir una mision: ayudando a personas, aprendiendo a escuchar y creciendo de formas que no esperaba. Mi familia ha sido la base de todo: me ha apoyado, impulsado y creido en mi para convertirme no solo en lo que quiero ser, sino en lo que siempre he sonado.",
  "Ese camino me trajo a Estados Unidos, donde estudio Computer Science en BYU-Idaho mientras complete un Associate en Business Statistics en BYU. He mantenido un GPA de 3.98 no por perseguir numeros, sino porque realmente amo aprender.",
  "En los ultimos anos pase de escribir scripts de automatizacion en Verizon, a crear integraciones en BYU que ahorran mas de $110K al ano, a ayudar a millones de usuarios de FamilySearch con software confiable, y a cofundar Daily Disciple, una plataforma que escalo a decenas de miles de usuarios. La ciencia de datos y la IA estan presentes en todo lo que construyo: creo que los mejores ingenieros entienden tanto el sistema como la historia detras de los datos.",
  "Cuando no estoy programando, me encuentras jugando Rainbow Six o compartiendo tiempo con las personas que mas quiero. Creo en construir rapido, aprender aun mas rapido y nunca perder de vista lo que importa.",
];

const educationEs = [
  {
    degree: "Licenciatura en Ciencias de la Computacion",
    school: "Brigham Young University - Idaho",
    period: "Abr 2027 (Esperado)",
    gpa: "3.98",
  },
  {
    degree: "Asociado en Estadistica de Negocios",
    school: "Brigham Young University",
    period: "Abr 2024",
    gpa: "4.0",
  },
];

const experienceEs = [
  {
    ...experienceEn[0],
    title: "Desarrollador de Software",
    period: "Mayo 2024 - Presente",
    bullets: [
      "Arquitecte un flujo escalable de parcheo de datos integrando Genesys, iPaaS y JavaScript para agregar metadatos esenciales a mas de 2,000 tickets diarios, ejecutando analisis en Python que habilita modelado de regresion lineal avanzado.",
      "Entregue mas de 350 integraciones de sistemas actualizando mas de 30 dashboards de Power BI en 15+ departamentos, apoyando a mas de 100,000 usuarios y decisiones estrategicas basadas en datos que ahorraron mas de $110K anuales.",
      "Formule un modelo seguro de limpieza de PII con Python, Microsoft Presidio y validacion Ollama, sanitizando transcripciones de Genesys que alimentan pipelines automatizados de Copilot en TeamDynamix.",
      "Construi una knowledge base serverless en React y TypeScript con GitHub Pages y Octokit APIs, centralizando documentacion tecnica interna sin dependencias de bases de datos externas.",
      "Acelere la entrega de encuestas en 93%, reingenierizando 21 flujos de backend dispersos con TypeScript.",
    ],
  },
  {
    ...experienceEn[1],
    title: "Cofundador",
    period: "Mayo 2025 - Presente",
    bullets: [
      "Lidere una plataforma integral de productividad que alcanzo 18,000+ usuarios activos, asegurando alianzas estrategicas con empresas Fortune 500 para modernizar flujos empresariales.",
      "Presente modelos de negocio para asegurar capital y contratar un equipo de ingenieria, impulsando la expansion al mercado hispanohablante y la adquisicion global de usuarios.",
      "Disene la infraestructura central con React, Expo y Node.js, estableciendo seguimiento en tiempo real que aumento la finalizacion de tareas en 76% y redujo el churn en 32%.",
    ],
  },
  {
    ...experienceEn[2],
    title: "Asistente de Ensenanza de CS",
    period: "Mayo 2026 - Presente",
    bullets: [
      "Valide arquitecturas cloud-native con AWS, Docker y Kubernetes, aplicando cumplimiento de escalado serverless, optimizando recursos y estableciendo practicas de despliegue estandar.",
      "Mentore a mas de 100 estudiantes en Cloud Development y WDD 131 Dynamic Web Fundamentals, usando estrategias interactivas multinivel para maximizar dominio frontend y comprension fundamental.",
      "Impulse mejores practicas modernas de CI/CD, agilizando flujos de entrega a traves de mas de 1,000 tareas automatizadas.",
    ],
  },
  {
    ...experienceEn[3],
    title: "Ingeniero de Software",
    period: "Abr 2025 - Oct 2025",
    bullets: [
      "Orqueste mas de 100 releases automatizados con C# y Azure Functions garantizando fiabilidad de plataforma, mitigando riesgos de despliegue y manteniendo cero downtime critico para 13.7M de usuarios globales.",
      "Transicione protocolos de testing manual a pipelines de integracion continua automatizados en C#, Java y Python, expandiendo cobertura al 97% y eliminando cuellos de botella operativos.",
      "Refactorice 10,000+ lineas de codigo legacy critico, mejorando el rendimiento del sistema en 36% con suites optimizadas en Azure.",
    ],
  },
  {
    ...experienceEn[4],
    title: "Investigador",
    period: "Sep 2023 - Mayo 2024",
    bullets: [
      "Optimice pipelines empresariales con R, SQL, Snowflake y Python, integrando 87% de los modelos predictivos requeridos para impulsar decisiones corporativas basadas en datos.",
      "Renove la arquitectura UI/UX de Zoho CRM elevando la productividad del personal en 34% sobre mas de 5,000 registros, con mejor accesibilidad de datos, dashboards intuitivos y navegacion simplificada.",
    ],
  },
  {
    ...experienceEn[5],
    title: "Tecnico IT Tier 3",
    period: "Feb 2022 - Sep 2023",
    bullets: [
      "Dirigi operaciones IT Tier 3 gestionando un equipo tecnico cross-funcional, simplificando la entrega operativa interna y elevando metricas de resolucion de tickets.",
      "Programe una herramienta de integracion C#/ASP.NET que aumento la productividad del equipo en 78% y redujo tiempos de entrega en 34% en despliegues regionales de telecomunicaciones.",
      "Fortaleci arquitecturas de seguridad empresarial vinculando MTAS/MSAT con Salesforce, generando $148K en ahorros.",
    ],
  },
];

const projectsEs = projectsEn.map((project) => ({ ...project }));

for (const project of projectsEs) {
  if (project.id === "phronesis") {
    project.subtitle = "App Movil y IA/ML";
    project.description =
      "De emocion a significado. Una app de reflexion con IA que procesa sentimiento en tiempo real y entrega insights diarios.";
    project.longDescription =
      "Construida durante el BYU Hackathon, Phronesis es una app movil en Expo/React Native con backend Node.js y Firebase que procesa mas de 1,000 reflexiones. Usa AssemblyAI para analisis de sentimiento en tiempo real en menos de 5 segundos.";
    project.metrics = [
      "100+ usuarios activos",
      "41% de correlacion en insights de IA",
      "Procesamiento de sentimiento <5s",
      "1,000+ reflexiones procesadas",
    ];
  } else if (project.id === "secure-file-sync") {
    project.subtitle = "Programacion de Sistemas y Seguridad";
    project.description =
      "Cifrado AES-256-GCM de nivel militar para 6,000+ archivos con monitoreo automatico de carpetas y herramientas CLI.";
    project.longDescription =
      "Aplicacion CLI en Rust que observa directorios y cifra/descifra archivos automaticamente con AES-256-GCM. Incluye gestion robusta de llaves, procesamiento en segundo plano y sincronizacion configurable.";
    project.metrics = [
      "6,000+ archivos protegidos",
      "87% menos trabajo manual",
      "Cifrado AES-256-GCM",
      "Sincronizacion en segundo plano",
    ];
  } else if (project.id === "centurion") {
    project.subtitle = "Analitica de Datos e IA/ML";
    project.description =
      "Lidere 7 talleres de Python, R, Tableau y Power BI para 80+ participantes, detectando $11K en ineficiencias anuales.";
    project.longDescription =
      "Iniciativa integral de analitica donde modelos y reportes de IA/ML identificaron ineficiencias operativas por $11,000 al ano. Tambien se impartieron talleres de dashboards y pipelines de datos.";
    project.metrics = [
      "$11K en ahorros identificados",
      "80+ participantes en talleres",
      "7 talleres impartidos",
      "Modelado predictivo aplicado",
    ];
  } else if (project.id === "roomies-chore") {
    project.subtitle = "App Movil y Colaboracion";
    project.description =
      "Un gestor colaborativo de tareas para roommates construido con Expo y Firebase.";
    project.longDescription =
      "RoomiesChore es una app movil colaborativa en React Native, Expo y TypeScript para crear grupos, asignar tareas y hacer seguimiento compartido con sincronizacion en tiempo real.";
    project.metrics = [
      "105+ commits",
      "Sync en tiempo real con Firestore",
      "Multiplataforma movil/web",
      "Asignacion grupal de tareas",
    ];
  } else if (project.id === "emotisphere") {
    project.subtitle = "Visualizacion de Datos y Go";
    project.description =
      "Mapa global interactivo que visualiza emociones de publicaciones y mensajes en tiempo real.";
    project.longDescription =
      "Plataforma de visualizacion en tiempo real construida en Go que agrega sentimiento emocional de textos y los muestra en un mapa mundial interactivo.";
    project.metrics = [
      "Mapeo de sentimiento en tiempo real",
      "Visualizacion geografica global",
      "Agregacion de datos sociales",
      "Backend en Go",
    ];
  } else if (project.id === "kb-connector") {
    project.subtitle = "Manipulacion e Integracion de Datos";
    project.description =
      "Capa de integracion TypeScript/Node.js sincronizando JSON via TDX API, reduciendo 88% del procesamiento manual.";
    project.longDescription =
      "Aplicacion automatizada en TypeScript/Node.js que sincroniza articulos de knowledge base mediante TDX API y orquesta integracion con Genesys para activar prompts en tiempo real.";
    project.metrics = [
      "88% menos procesamiento manual",
      "Doble precision de datos",
      "5,000+ interacciones mensuales de IA",
      "Activacion en tiempo real por horarios",
    ];
  } else if (project.id === "stardew-like") {
    project.subtitle = "Desarrollo de Juegos y Godot";
    project.description =
      "Juego 2D en Godot enfocado en movimiento, monedas, plataformas y loops de gameplay limpios.";
    project.longDescription =
      "Stardew Like es un platformer 2D en Godot con niveles, monedas, killzones y plataformas moviles. Incluye pixel-art, efectos de sonido y un gameplay loop claro.";
    project.metrics = [
      "Godot 4.5+",
      "Sistemas de gameplay en GDScript",
      "Platformer pixel-art",
      "Mecanicas de nivel y hazards",
    ];
  } else if (project.id === "crypto-reality") {
    project.subtitle = "Ciencia de Datos y Analisis de Sentimiento";
    project.description =
      "Analisis con Python sobre la relacion entre sentimiento del mercado cripto y variacion de precios.";
    project.longDescription =
      "Proyecto de ciencia de datos que explora la relacion entre sentimiento social y rendimiento del mercado de criptomonedas usando tecnicas de NLP y modelado estadistico.";
    project.metrics = [
      "Correlacion sentimiento-precio",
      "Pipeline NLP en Python",
      "Analisis de datos de mercado",
      "Modelado estadistico",
    ];
  } else if (project.id === "analysis-portfolio") {
    project.subtitle = "Coleccion de Ciencia de Datos y R";
    project.description =
      "Una coleccion curada de proyectos de ciencia de datos: visualizacion, analisis exploratorio, limpieza, mapas y texto — principalmente en R.";
    project.longDescription =
      "Portafolio en linea de analisis y visualizacion de datos agrupados por tema: criticas y rediseños de visualizacion, estudios exploratorios, pipelines de limpieza, mapas espaciales y analisis de texto. Construido principalmente en R como una coleccion viva de proyectos aplicados de ciencia de datos.";
    project.metrics = [
      "Mas de 20 analisis en 5 temas",
      "Flujos principalmente en R",
      "Viz, EDA, limpieza, mapas, NLP",
      "Galeria de proyectos publicada",
    ];
  }
}

export function getLocalizedPortfolio(locale: Locale) {
  if (locale === "es") {
    return {
      profile: { ...profileEn, origin: "Costa Rica" },
      aboutParagraphs: aboutEs,
      education: educationEs,
      experience: experienceEs,
      projects: projectsEs,
    };
  }
  return {
    profile: profileEn,
    aboutParagraphs: aboutEn,
    education: educationEn,
    experience: experienceEn,
    projects: projectsEn,
  };
}
