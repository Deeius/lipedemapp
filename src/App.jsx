import { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import WelcomeGuide from "./WelcomeGuide";
import HomeTab from "./components/home/HomeTab";
import TodayTab from "./components/today/TodayTab";
import HistoryTab from "./components/history/HistoryTab";
import ProfileTab from "./components/profile/ProfileTab";
import FoodsTab from "./components/foods/FoodsTab";
import InfoTab from "./components/info/InfoTab";
import Onboarding from "./Onboarding";

import { useAuth } from "./hooks/useAuth";
import {
  getProfile,
  upsertProfile,
  getLogs,
  upsertLog,
  getFoods,
  upsertFood,
  deleteFood,
  getCycle,
  upsertCycle,
} from "./lib/db";

// ─── INFO RESOURCES ──────────────────────────────────────────────────────────
const INFO_RESOURCES = {
  science: {
    icon: "🔬",
    es: "Artículos Científicos",
    en: "Scientific Articles",
    items: [
      {
        lang: "en",
        title: "Lipedema: Progress, Challenges, and the Road Ahead (2025)",
        authors: "Systematic review — PubMed / PMC",
        desc_es:
          "Revisión sistemática de más de 100 estudios sobre fisiopatología, diagnóstico y opciones de tratamiento.",
        desc_en:
          "Systematic review of 100+ studies on pathophysiology, diagnosis and treatment options.",
        url: "https://pubmed.ncbi.nlm.nih.gov/40425048/",
        year: 2025,
        type: "review",
      },
      {
        lang: "en",
        title: "Lipedema: Insights into Morphology, Pathophysiology, and Challenges",
        authors: "Biomedicines — PubMed",
        desc_es:
          "Análisis en profundidad de las características morfológicas, fibrosis e inflamación del lipedema.",
        desc_en:
          "In-depth analysis of morphological features, fibrosis and inflammation in lipedema.",
        url: "https://pubmed.ncbi.nlm.nih.gov/36551837/",
        year: 2022,
        type: "review",
      },
      {
        lang: "en",
        title: "S2k Guideline Lipedema (Guía clínica oficial alemana)",
        authors: "DGPL — PubMed",
        desc_es:
          "Guía oficial con 60 recomendaciones sobre diagnóstico, tratamiento conservador, quirúrgico y autogestión.",
        desc_en:
          "Official guideline with 60 recommendations on diagnosis, conservative & surgical treatment, and self-management.",
        url: "https://pubmed.ncbi.nlm.nih.gov/39188170/",
        year: 2024,
        type: "guideline",
      },
      {
        lang: "en",
        title: "Proposed Framework for Research Case Definitions of Lipedema",
        authors: "Lipedema Simplified / Harvard — PubMed",
        desc_es:
          "Marco de referencia para estandarizar el diagnóstico en investigación, con 5 características clave.",
        desc_en:
          "Framework for standardizing lipedema research diagnosis, with 5 agreed-upon characteristics.",
        url: "https://pubmed.ncbi.nlm.nih.gov/38546398/",
        year: 2024,
        type: "research",
      },
      {
        lang: "en",
        title: "Lipedema and Adipose Tissue: Current Understanding & Future Directions",
        authors: "Frontiers in Cell and Developmental Biology",
        desc_es:
          "Estado del arte en 2025: macrófagos, fibrosis, dieta cetogénica e IA en el diagnóstico.",
        desc_en:
          "2025 state of the art: macrophages, fibrosis, ketogenic diet and AI in diagnosis.",
        url: "https://www.frontiersin.org/journals/cell-and-developmental-biology/articles/10.3389/fcell.2025.1691161/full",
        year: 2025,
        type: "review",
      },
      {
        lang: "es",
        title: "¿Qué sabemos del lipedema? Una enfermedad poco conocida",
        authors: "The Conversation — Divulgación científica",
        desc_es:
          "Artículo divulgativo en español sobre causas, diagnóstico y tratamiento multidisciplinar del lipedema.",
        desc_en:
          "Scientific outreach article in Spanish on causes, diagnosis and multidisciplinary treatment.",
        url: "https://theconversation.com/que-sabemos-del-lipedema-una-enfermedad-con-acumulacion-de-grasa-patologica-que-afecta-sobre-todo-a-las-mujeres-232179",
        year: 2025,
        type: "article",
      },
    ],
  },
  treatment: {
    icon: "💆‍♀️",
    es: "Guías de Tratamiento",
    en: "Treatment Guides",
    items: [
      {
        lang: "en",
        title: "Treating Lipedema — Lipedema Foundation",
        authors: "Lipedema Foundation (USA)",
        desc_es:
          "Guía completa de tratamientos conservadores y quirúrgicos de la organización líder en investigación.",
        desc_en:
          "Complete guide to conservative and surgical treatments from the leading research organization.",
        url: "https://www.lipedema.org/treating-lipedema",
        year: 2024,
        type: "guide",
      },
      {
        lang: "en",
        title: "Lipedema Treatment & Causes — The Lipedema Project",
        authors: "The Lipedema Project",
        desc_es:
          "Explicación detallada de la Terapia Descongestiva Completa (CDT), MLD, compresión y liposucción linfática.",
        desc_en:
          "Detailed explanation of Complete Decongestive Therapy (CDT), MLD, compression and lymphatic liposuction.",
        url: "https://lipedemaproject.org/treatment-for-lipedema/",
        year: 2024,
        type: "guide",
      },
      {
        lang: "en",
        title: "Patient Guide: Treatment of Lipedema and Lipo-Lymphedema",
        authors: "Toronto Physiotherapy",
        desc_es:
          "Guía para pacientes: qué puede y no puede hacer el MLD, compresión, dispositivos neumáticos y cirugía.",
        desc_en:
          "Patient guide: what MLD can and cannot do, compression, pneumatic devices and surgery.",
        url: "https://torontophysiotherapy.ca/patient-guide-lipedema-lipolymphedema-treatment/",
        year: 2022,
        type: "guide",
      },
      {
        lang: "en",
        title: "Finding a Lipedema Specialist — Lipedema Foundation",
        authors: "Lipedema Foundation",
        desc_es:
          "Directorio de especialistas y guía para navegar el sistema de salud con lipedema.",
        desc_en:
          "Specialist directory and guide to navigating the healthcare system with lipedema.",
        url: "https://www.lipedema.org/findspecialists",
        year: 2024,
        type: "guide",
      },
      {
        lang: "es",
        title: "Qué es el Lipedema — Lipemedical (España)",
        authors: "Lipemedical — Dr. Burgos de la Obra",
        desc_es:
          "Información clínica en español sobre síntomas, estadios y tratamiento quirúrgico WAL del lipedema.",
        desc_en:
          "Clinical info in Spanish on symptoms, stages and WAL surgical treatment for lipedema.",
        url: "https://lipedema.es/que-es-lipedema/",
        year: 2024,
        type: "clinical",
      },
    ],
  },
  community: {
    icon: "🤝",
    es: "Comunidades y Asociaciones",
    en: "Communities & Associations",
    items: [
      {
        lang: "es",
        title: "ADALIPE — Asociación de Afectadas de Lipedema de España",
        authors: "Asociación española de pacientes",
        desc_es:
          "La principal asociación de pacientes con lipedema en España. Foro privado, eventos y apoyo entre pares.",
        desc_en:
          "Main Spanish lipedema patient association. Private forum, events and peer support.",
        url: "https://www.adalipe.es/",
        year: 2024,
        type: "association",
      },
      {
        lang: "es",
        title: "FEDEAL — Federación Española de Asociaciones de Linfedema y Lipedema",
        authors: "Federación española",
        desc_es:
          "Punto de encuentro nacional de las asociaciones regionales. Trabaja por el reconocimiento institucional.",
        desc_en:
          "National federation of regional associations. Works for institutional recognition.",
        url: "https://fedeal.org/",
        year: 2024,
        type: "association",
      },
      {
        lang: "en",
        title: "Lipedema Foundation — Comunidad & Recursos",
        authors: "Lipedema Foundation (USA)",
        desc_es:
          "La mayor organización financiadora de investigación sobre lipedema. Registro de pacientes y directorio de proveedores.",
        desc_en: "Largest lipedema research funder. Patient registry and provider directory.",
        url: "https://www.lipedema.org/",
        year: 2024,
        type: "association",
      },
      {
        lang: "en",
        title: "r/Lipedema — Reddit Community",
        authors: "Reddit",
        desc_es:
          "Comunidad activa en inglés con miles de miembros compartiendo experiencias, cirugías y consejos diarios.",
        desc_en:
          "Active English community with thousands of members sharing experiences, surgeries and daily tips.",
        url: "https://www.reddit.com/r/Lipedema/",
        year: 2024,
        type: "forum",
      },
    ],
  },
  social: {
    icon: "📱",
    es: "Perfiles Recomendados",
    en: "Recommended Profiles",
    items: [
      {
        lang: "en",
        platform: "Instagram + TikTok",
        title: "@allison.jacobsss — Allison Jacobs",
        authors: "450K Instagram · 900K TikTok",
        desc_es:
          "Activista del lipedema y creadora de contenido. Baile, salud mental y visibilidad de la enfermedad.",
        desc_en:
          "Lipedema activist and content creator. Dance, mental health and disease visibility.",
        url: "https://www.instagram.com/allison.jacobsss/",
        type: "influencer",
      },
      {
        lang: "en",
        platform: "Instagram",
        title: "@sarah.whitlow_ — Sarah Whitlow",
        authors: "182K seguidores · Lipedema Movement & Fitness",
        desc_es:
          "Fundadora de Lipedema Movement & Fitness. Ejercicio adaptado y comunidad de apoyo.",
        desc_en: "Founder of Lipedema Movement & Fitness. Adapted exercise and support community.",
        url: "https://www.instagram.com/sarah.whitlow_/",
        type: "influencer",
      },
      {
        lang: "en",
        platform: "Instagram",
        title: "@xanthia_efthymiou — Xanthia Efthymiou",
        authors: "339K seguidores · Australia",
        desc_es:
          "Concienciación sobre lipoedema desde Australia. Transparente sobre su proceso y tratamientos.",
        desc_en:
          "Lipoedema awareness from Australia. Transparent about her process and treatments.",
        url: "https://www.instagram.com/xanthia_efthymiou/",
        type: "influencer",
      },
      {
        lang: "en",
        platform: "Instagram",
        title: "@the_lippy_lady — Ashley Fisher",
        authors: "12K seguidores · Co-host Lipedema Mamas Podcast",
        desc_es: "Comparte su viaje con el lipedema y co-conduce el podcast Lipedema Mamas.",
        desc_en: "Shares her lipedema journey and co-hosts the Lipedema Mamas Podcast.",
        url: "https://www.instagram.com/the_lippy_lady/",
        type: "influencer",
      },
      {
        lang: "es",
        platform: "Instagram + Blog",
        title: "@lipedemadiary — Lipedema Diary (España)",
        authors: "Comunidad española",
        desc_es:
          "Cuenta española que documenta el proceso, la cirugía en Barcelona y la vida diaria con lipedema.",
        desc_en:
          "Spanish account documenting the process, surgery in Barcelona and daily life with lipedema.",
        url: "https://www.instagram.com/lipedemadiary/",
        type: "influencer",
      },
      {
        lang: "en",
        platform: "Instagram",
        title: "@lipedemafitness — Lipedema Fitness",
        authors: "9K seguidores · Desde 2013",
        desc_es:
          "Dedicado al ejercicio y actividad física adaptada para personas con lipedema desde 2013.",
        desc_en:
          "Dedicated to adapted exercise and physical activity for people with lipedema since 2013.",
        url: "https://www.instagram.com/lipedemafitness/",
        type: "influencer",
      },
    ],
  },
};

// ─── SUPPLEMENTS DATA ────────────────────────────────────────────────────────
const SUPPLEMENT_OPTIONS = [
  {
    key: "omega3",
    icon: "🐟",
    es: "Omega-3",
    en: "Omega-3",
    note_es: "Antiinflamatorio",
    note_en: "Anti-inflammatory",
  },
  {
    key: "vitD",
    icon: "☀️",
    es: "Vitamina D3",
    en: "Vitamin D3",
    note_es: "Inmunidad y huesos",
    note_en: "Immunity & bones",
  },
  {
    key: "magnesium",
    icon: "🪨",
    es: "Magnesio",
    en: "Magnesium",
    note_es: "Calambres y sueño",
    note_en: "Cramps & sleep",
  },
  {
    key: "vitC",
    icon: "🍊",
    es: "Vitamina C",
    en: "Vitamin C",
    note_es: "Colágeno y antioxidante",
    note_en: "Collagen & antioxidant",
  },
  {
    key: "rutin",
    icon: "🌿",
    es: "Rutina / Diosmina",
    en: "Rutin / Diosmin",
    note_es: "Circulación y linfático",
    note_en: "Circulation & lymph",
  },
  {
    key: "quercetin",
    icon: "🍎",
    es: "Quercetina",
    en: "Quercetin",
    note_es: "Antiinflamatorio flavonoide",
    note_en: "Flavonoid anti-inflammatory",
  },
  {
    key: "selenium",
    icon: "⚗️",
    es: "Selenio",
    en: "Selenium",
    note_es: "Tiroides y antioxidante",
    note_en: "Thyroid & antioxidant",
  },
  {
    key: "zinc",
    icon: "🔩",
    es: "Zinc",
    en: "Zinc",
    note_es: "Inmunidad y piel",
    note_en: "Immunity & skin",
  },
  {
    key: "probiotics",
    icon: "🦠",
    es: "Probióticos",
    en: "Probiotics",
    note_es: "Microbiota intestinal",
    note_en: "Gut microbiome",
  },
  {
    key: "curcumin",
    icon: "🌾",
    es: "Cúrcuma / Curcumina",
    en: "Turmeric / Curcumin",
    note_es: "Antiinflamatorio potente",
    note_en: "Potent anti-inflammatory",
  },
  {
    key: "coq10",
    icon: "⚡",
    es: "Coenzima Q10",
    en: "CoQ10",
    note_es: "Energía celular",
    note_en: "Cellular energy",
  },
  {
    key: "ironB12",
    icon: "🩸",
    es: "Hierro + B12",
    en: "Iron + B12",
    note_es: "Anemia y fatiga",
    note_en: "Anemia & fatigue",
  },
  {
    key: "collagen",
    icon: "🧬",
    es: "Colágeno",
    en: "Collagen",
    note_es: "Piel y tejido conjuntivo",
    note_en: "Skin & connective tissue",
  },
  {
    key: "berberine",
    icon: "🌱",
    es: "Berberina",
    en: "Berberine",
    note_es: "Glucosa e inflamación",
    note_en: "Glucose & inflammation",
  },
  {
    key: "lymph",
    icon: "💧",
    es: "Drenaje linfático",
    en: "Lymphatic herbs",
    note_es: "Árnica, rusco, castaño...",
    note_en: "Arnica, butcher's broom...",
  },
];

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const LANG = {
  es: {
    appTitle: "Lipedema Tracker",
    appSubtitle: "Tu diario de salud personalizado",
    nav: {
      today: "Hoy",
      history: "Historial",
      charts: "Gráficos",
      foods: "Alimentos",
      supps: "Suplementos",
      info: "Info",
      profile: "Perfil",
    },
    today: {
      title: "Registro de Hoy",
      date: "Fecha",
      weight: "Peso (kg)",
      energy: "Nivel de Energía",
      waterGoal: "Objetivo: 8 vasos diarios",
      pain: "Nivel de Dolor",
      water: "Agua bebida hoy",
      inflammation: "Inflamación por Zonas",
      inflammationNote: "Descripción libre (síntomas, sensaciones...)",
      inflammationNotePlaceholder:
        "Ej: Piernas muy pesadas al levantarme, tobillos hinchados por la tarde...",
      mood: "Estado Emocional",
      measures: "Medidas (cm)",
      save: "Guardar registro",
      saved: "✓ Guardado",
      todaysSupps: "Suplementos tomados hoy",
      zoneNames: {
        waist: "Cintura",
        hips: "Caderas",
        leftThigh: "Muslo Izq.",
        rightThigh: "Muslo Der.",
        leftCalf: "Pantorrilla Izq.",
        rightCalf: "Pantorrilla Der.",
        leftArm: "Brazo Izq.",
        rightArm: "Brazo Der.",
        abdomen: "Abdomen",
        ankles: "Tobillos",
      },
    },
    foods: {
      title: "Alimentos & Digestiones",
      add: "Añadir alimento",
      name: "Alimento",
      namePlaceholder: "Ej: Aguacate, Lácteos, Gluten...",
      reaction: "Reacción",
      good: "Me sienta bien",
      bad: "Me sienta mal",
      neutral: "Sin efecto claro",
      notes: "Notas",
      notesPlaceholder: "Cómo te sentiste después...",
      category: "Categoría",
      categories: {
        antiinflammatory: "Antiinflamatorio",
        gluten: "Gluten",
        dairy: "Lácteos",
        sugar: "Azúcar",
        other: "Otro",
      },
      list: "Mi lista de alimentos",
      empty: "Aún no has registrado alimentos",
    },
    supps: {
      title: "Mi Suplementación",
      subtitle: "Selecciona los suplementos que tomas habitualmente",
      active: "Suplementos activos",
      dose: "Dosis / notas",
      dosePlaceholder: "Ej: 2000mg con comida",
      startDate: "Desde",
      effect: "Efecto percibido",
      effectOptions: { good: "Noto mejoría", none: "Sin cambios", bad: "Reacción negativa" },
      custom: "Añadir otro suplemento",
      customPlaceholder: "Nombre del suplemento...",
      addCustom: "Añadir",
      save: "Guardar suplementación",
      saved: "✓ Guardado",
      empty: "No tienes suplementos activos aún",
      dailyLog: "Registro diario de toma",
      dailyNote: "Marca en 'Hoy' qué suplementos tomaste",
    },
    info: {
      title: "Información & Recursos",
      subtitle: "Recursos curados y verificados sobre lipedema",
      filterAll: "Todos",
      filterEs: "En español",
      filterEn: "En inglés",
      tagTypes: {
        review: "Revisión",
        guideline: "Guía clínica",
        research: "Investigación",
        article: "Artículo",
        guide: "Guía",
        clinical: "Clínico",
        association: "Asociación",
        forum: "Foro",
        influencer: "Perfil",
        platform: "Plataforma",
      },
      disclaimer:
        "⚠️ Esta información es educativa. Consulta siempre con tu médico especialista antes de cambiar tu tratamiento.",
      openLink: "Abrir →",
    },
    profile: {
      title: "Mi Perfil",
      name: "Nombre",
      stage: "Estadio Lipedema",
      stages: {
        1: "Estadio 1",
        2: "Estadio 2",
        3: "Estadio 3",
        4: "Estadio 4",
        unknown: "No sé / Sin diagnóstico",
      },
      diagnosis: "Fecha de diagnóstico",
      activeZones: "Mis zonas afectadas",
      save: "Guardar perfil",
      saved: "✓ Guardado",
      intolerances: "Intolerancias / Alergias",
      intolerancesHint: "Selecciona las que apliquen",
    },
    history: {
      title: "Historial",
      empty: "Aún no hay registros. ¡Empieza hoy!",
      weight: "Peso",
      pain: "Dolor",
      energy: "Energía",
    },
    charts: {
      title: "Gráficos & Tendencias",
      weight: "Evolución del Peso",
      painEnergy: "Dolor vs Energía",
      inflammation: "Mapa de Inflamación",
      suppAdherence: "Adherencia a Suplementos",
      suppFrequency: "Frecuencia por Suplemento",
      foods: "Alimentos: Reacciones",
      noData: "Registra datos para ver gráficos",
    },
    energyLabels: ["Agotada", "Muy baja", "Baja", "Regular", "Bien", "Muy bien", "Excelente"],
    painLabels: ["Sin dolor", "Mínimo", "Leve", "Moderado", "Notable", "Intenso", "Severo"],
    moodOptions: ["😔", "😕", "😐", "🙂", "😊", "😄"],
  },
  en: {
    appTitle: "Lipedema Tracker",
    appSubtitle: "Your personalized health diary",
    nav: {
      today: "Today",
      history: "History",
      charts: "Charts",
      foods: "Foods",
      supps: "Supplements",
      info: "Info",
      profile: "Profile",
    },
    today: {
      title: "Today's Log",
      date: "Date",
      weight: "Weight (kg)",
      energy: "Energy Level",
      waterGoal: "Goal: 8 glasses a day",
      pain: "Pain Level",
      water: "Water intake today",
      inflammation: "Inflammation by Zone",
      inflammationNote: "Free description (symptoms, sensations...)",
      inflammationNotePlaceholder:
        "E.g. Very heavy legs in the morning, swollen ankles in the afternoon...",
      mood: "Emotional State",
      measures: "Measurements (cm)",
      save: "Save log",
      saved: "✓ Saved",
      todaysSupps: "Supplements taken today",
      zoneNames: {
        waist: "Waist",
        hips: "Hips",
        leftThigh: "Left Thigh",
        rightThigh: "Right Thigh",
        leftCalf: "Left Calf",
        rightCalf: "Right Calf",
        leftArm: "Left Arm",
        rightArm: "Right Arm",
        abdomen: "Abdomen",
        ankles: "Ankles",
      },
    },
    foods: {
      title: "Foods & Digestion",
      add: "Add food",
      name: "Food",
      namePlaceholder: "E.g. Avocado, Dairy, Gluten...",
      reaction: "Reaction",
      good: "Works well for me",
      bad: "Doesn't suit me",
      neutral: "No clear effect",
      notes: "Notes",
      notesPlaceholder: "How you felt afterwards...",
      category: "Category",
      categories: {
        antiinflammatory: "Anti-inflammatory",
        gluten: "Gluten",
        dairy: "Dairy",
        sugar: "Sugar",
        other: "Other",
      },
      list: "My food list",
      empty: "No foods logged yet",
    },
    supps: {
      title: "My Supplements",
      subtitle: "Select the supplements you regularly take",
      active: "Active supplements",
      dose: "Dose / notes",
      dosePlaceholder: "E.g. 2000mg with food",
      startDate: "Since",
      effect: "Perceived effect",
      effectOptions: { good: "Noticing improvement", none: "No change", bad: "Negative reaction" },
      custom: "Add another supplement",
      customPlaceholder: "Supplement name...",
      addCustom: "Add",
      save: "Save supplements",
      saved: "✓ Saved",
      empty: "No active supplements yet",
      dailyLog: "Daily intake log",
      dailyNote: "Mark in 'Today' which supplements you took",
    },
    info: {
      title: "Information & Resources",
      subtitle: "Curated and verified resources about lipedema",
      filterAll: "All",
      filterEs: "In Spanish",
      filterEn: "In English",
      tagTypes: {
        review: "Review",
        guideline: "Guideline",
        research: "Research",
        article: "Article",
        guide: "Guide",
        clinical: "Clinical",
        association: "Association",
        forum: "Forum",
        influencer: "Profile",
        platform: "Platform",
      },
      disclaimer:
        "⚠️ This information is educational. Always consult your specialist before changing your treatment.",
      openLink: "Open →",
    },
    profile: {
      title: "My Profile",
      name: "Name",
      stage: "Lipedema Stage",
      stages: {
        1: "Stage 1",
        2: "Stage 2",
        3: "Stage 3",
        4: "Stage 4",
        unknown: "Unknown / Undiagnosed",
      },
      diagnosis: "Diagnosis date",
      activeZones: "My affected zones",
      save: "Save profile",
      saved: "✓ Saved",
      intolerances: "Intolerances / Allergies",
      intolerancesHint: "Select all that apply",
    },
    history: {
      title: "History",
      empty: "No logs yet. Start today!",
      weight: "Weight",
      pain: "Pain",
      energy: "Energy",
    },
    charts: {
      title: "Charts & Trends",
      weight: "Weight Evolution",
      painEnergy: "Pain vs Energy",
      inflammation: "Inflammation Map",
      suppAdherence: "Supplement Adherence",
      suppFrequency: "Supplement Frequency",
      foods: "Foods: Reactions",
      noData: "Log data to see charts",
    },
    energyLabels: ["Exhausted", "Very low", "Low", "Fair", "Good", "Very good", "Excellent"],
    painLabels: ["No pain", "Minimal", "Mild", "Moderate", "Notable", "Intense", "Severe"],
    moodOptions: ["😔", "😕", "😐", "🙂", "😊", "😄"],
  },
};

const ALL_ZONES = [
  "waist",
  "hips",
  "leftThigh",
  "rightThigh",
  "leftCalf",
  "rightCalf",
  "leftArm",
  "rightArm",
  "abdomen",
  "ankles",
];

const ALLERGENS = [
  { key: "gluten", icon: "🌾", es: "Gluten", en: "Gluten" },
  { key: "dairy", icon: "🥛", es: "Lácteos / Lactosa", en: "Dairy / Lactose" },
  { key: "nuts", icon: "🥜", es: "Frutos secos", en: "Nuts" },
  { key: "fish", icon: "🐟", es: "Pescado / Marisco", en: "Fish / Shellfish" },
  { key: "soy", icon: "🫘", es: "Soja", en: "Soy" },
  { key: "eggs", icon: "🥚", es: "Huevos", en: "Eggs" },
  { key: "fructose", icon: "🍎", es: "Fructosa", en: "Fructose" },
  { key: "histamine", icon: "⚗️", es: "Histamina", en: "Histamine" },
  { key: "nightshades", icon: "🍅", es: "Solanáceas", en: "Nightshades" },
  { key: "corn", icon: "🌽", es: "Maíz", en: "Corn" },
  { key: "sesame", icon: "🫗", es: "Sésamo", en: "Sesame" },
  { key: "sulfites", icon: "🍷", es: "Sulfitos", en: "Sulfites" },
  { key: "caffeine", icon: "☕", es: "Cafeína", en: "Caffeine" },
];

const defaultEntry = () => ({
  date: new Date().toISOString().split("T")[0],
  weight: "",
  energy: 3,
  pain: 0,
  mood: 2,
  inflammationZones: {},
  inflammationNote: "",
  measures: {},
  suppsTaken: [],
  pillTaken: false,
  water: 0, // glasses of water (0-12)
});

const defaultProfile = {
  name: "",
  stage: "unknown",
  diagnosis: "",
  activeZones: ["leftThigh", "rightThigh", "leftCalf", "rightCalf"],
  pillActive: false, // is she taking the pill?
  pillBrand: "", // brand name
  intolerances: [], // allergen keys the user is sensitive to
};

const defaultSupps = { active: [], custom: [] };

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function SliderInput({ value, onChange, max = 6, labels, color = "#6366f1" }) {
  return (
    <div style={{ width: "100%" }}>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: color, cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        {labels.map((l, i) => (
          <span
            key={i}
            style={{
              fontSize: 10,
              color: i === value ? color : C.creamMuted,
              fontWeight: i === value ? 700 : 400,
              transition: "color 0.2s",
            }}
          >
            {i === value ? l : "·"}
          </span>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 6, fontSize: 13, fontWeight: 600, color }}>
        {labels[value]}
      </div>
    </div>
  );
}

function ZoneCard({ zone, zoneName, value, onChange }) {
  const colors = [C.border, "#8ab89a", "#5a9a72", "#c5a040", C.danger, "#8a2020"];
  const lv = value || 0;
  return (
    <div
      style={{
        background: C.bgInput,
        borderRadius: 10,
        padding: "10px 14px",
        border: `1.5px solid ${lv > 0 ? colors[Math.min(lv, 5)] : C.border}`,
        transition: "border-color 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: C.cream }}>{zoneName}</span>
        <span style={{ fontSize: 12, color: C.creamMuted }}>{lv}/5</span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2, 3, 4, 5].map((v) => (
          <div
            key={v}
            onClick={() => onChange(v)}
            style={{
              flex: 1,
              height: 18,
              borderRadius: 4,
              background: v <= lv ? colors[lv] : C.border,
              cursor: "pointer",
              transition: "background 0.2s",
              opacity: v <= lv ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SupplementCard({ supp, lang, isActive, suppData, onToggle, onUpdate }) {
  const name = lang === "es" ? supp.es : supp.en;
  const note = lang === "es" ? supp.note_es : supp.note_en;
  const t = LANG[lang].supps;

  return (
    <div
      style={{
        borderRadius: 12,
        border: `1.5px solid ${isActive ? C.sage : C.border}`,
        background: isActive ? "#f2f8f5" : C.bgCard,
        transition: "all 0.2s",
        overflow: "hidden",
        boxShadow: isActive ? "0 1px 6px rgba(77,138,110,0.1)" : "none",
      }}
    >
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 14px",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 22 }}>{supp.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: C.cream }}>{name}</div>
          <div style={{ fontSize: 11, color: C.creamMuted }}>{note}</div>
        </div>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: `2px solid ${isActive ? C.sage : C.border}`,
            background: isActive ? C.sage : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isActive && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
        </div>
      </div>

      {isActive && (
        <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <label style={labelStyle}>{t.dose}</label>
              <input
                style={inputStyle}
                placeholder={t.dosePlaceholder}
                value={suppData?.dose || ""}
                onChange={(e) => onUpdate({ dose: e.target.value })}
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{t.startDate}</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={suppData?.startDate || ""}
                  onChange={(e) => onUpdate({ startDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t.effect}</label>
              <div style={{ display: "flex", gap: 6 }}>
                {Object.entries(t.effectOptions).map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => onUpdate({ effect: k })}
                    style={{
                      flex: 1,
                      padding: "6px 4px",
                      borderRadius: 7,
                      border: `1px solid ${C.border}`,
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 600,
                      background:
                        suppData?.effect === k
                          ? k === "good"
                            ? C.success
                            : k === "bad"
                              ? C.danger
                              : C.creamMuted
                          : C.bgInput,
                      color: suppData?.effect === k ? "#fff" : C.creamMuted,
                      transition: "all 0.2s",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const C = {
  bg: "#f0f5f2", // fondo principal — verde pálido
  bgCard: "#ffffff", // tarjetas — blanco puro
  bgCardHov: "#f7faf8", // hover tarjetas
  bgInput: "#f7faf8", // inputs — blanco roto muy suave
  border: "#d6e5dd", // bordes — sage muy suave
  borderFoc: "#4d8a6e", // bordes activos
  sage: "#4d8a6e", // verde salvia principal (oscurecido para contraste en claro)
  sageDark: "#3a6e57", // sage oscuro (botones hover)
  sageLight: "#3a6e57", // sage texto (mismo, contraste ≥4.5:1 sobre blanco)
  cream: "#1c2b24", // texto principal — verde muy oscuro casi negro
  creamMuted: "#5a7568", // texto secundario — sage medio
  creamFaint: "#e4eeea", // superficies muy sutiles
  accent: "#8a6c3a", // dorado/tierra acento (oscurecido para legibilidad)
  danger: "#b84040", // error/dolor
  success: "#4d8a6e", // éxito/bien
  warn: "#a07830", // warning/neutral
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: C.creamMuted,
  marginBottom: 5,
  display: "block",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
};
const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 8,
  border: `1.5px solid ${C.border}`,
  fontSize: 13,
  outline: "none",
  background: C.bgCard,
  boxSizing: "border-box",
  fontFamily: "inherit",
  color: C.cream,
  transition: "border-color 0.2s",
};
const textareaStyle = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 8,
  border: `1.5px solid ${C.border}`,
  fontSize: 13,
  outline: "none",
  background: C.bgInput,
  boxSizing: "border-box",
  resize: "vertical",
  minHeight: 70,
  fontFamily: "inherit",
  color: C.cream,
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

// ─── NAV ITEMS & ICONS ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "home", icon: "home", es: "Inicio", en: "Home" },
  { key: "today", icon: "calendar", es: "Hoy", en: "Today" },
  { key: "history", icon: "clock", es: "Historial", en: "History" },
  { key: "charts", icon: "trending", es: "Gráficas", en: "Charts" },
  { key: "foods", icon: "utensils", es: "Alimentos", en: "Foods" },
  { key: "supps", icon: "pill", es: "Suplementos", en: "Supplements" },
  { key: "centers", icon: "mappin", es: "Centros", en: "Centers" },
  { key: "info", icon: "book", es: "Información", en: "Info" },
  { key: "profile", icon: "user", es: "Perfil", en: "Profile" },
];

// Lucide-style SVG icons — 20×20 viewBox, stroke-based
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75 }) {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const p = {
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const icons = {
    calendar: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <rect x="7" y="14" width="3" height="3" rx="0.5" fill={color} stroke="none" />
      </svg>
    ),
    clock: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
      </svg>
    ),
    trending: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    utensils: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="3" y1="2" x2="3" y2="22" />
        <path d="M7 2v7a4 4 0 0 1-4 4" />
        <path d="M21 2v20M21 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4" />
      </svg>
    ),
    pill: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M10.5 20H4a2 2 0 0 1-2-2v-2.5a2 2 0 0 1 2-2h6.5" />
        <path d="M13.5 4H20a2 2 0 0 1 2 2v2.5a2 2 0 0 1-2 2h-6.5" />
        <circle cx="12" cy="12" r="7" />
        <path d="M7.5 12h9" />
      </svg>
    ),
    mappin: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    book: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="12" y1="6" x2="16" y2="6" />
        <line x1="12" y1="10" x2="16" y2="10" />
      </svg>
    ),
    user: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    menu: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    x: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    home: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
        <polyline points="9 21 9 12 15 12 15 21" />
      </svg>
    ),
    leaf: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    hand: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M18 11V6a1 1 0 0 0-2 0v5" />
        <path d="M14 10V4a1 1 0 0 0-2 0v6" />
        <path d="M10 10.5V5a1 1 0 0 0-2 0v7" />
        <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.7-2.4L3.4 16a1.5 1.5 0 0 1 2.1-2.1L8 16" />
      </svg>
    ),
    sparkles: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
      </svg>
    ),
    lightbulb: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    clipboard: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M12 11h4" />
        <path d="M12 16h4" />
        <path d="M8 11h.01" />
        <path d="M8 16h.01" />
      </svg>
    ),
  };
  return icons[name] || null;
}

export default function App() {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [lang, setLang] = useState("es");
  const [showWelcome, setShowWelcome] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => { try { return !localStorage.getItem("lt_onboarding_done"); } catch { return true; } });
  const [tab, setTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [entry, setEntry] = useState(defaultEntry());
  const [logs, setLogs] = useState([]);
  const [foods, setFoods] = useState([]);
  const [profile, setProfile] = useState(defaultProfile);
  const [supps, setSupps] = useState(defaultSupps);
  const [savedMsg, setSavedMsg] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [suppsSaved, setSuppsSaved] = useState(false);
  const [cycleData, setCycleData] = useState({});
  const [cycleMonth, setCycleMonth] = useState(() => {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}`;
  });
  const [cycleActiveType, setCycleActiveType] = useState(null); // "period"|"spm"|"retention"|null
  const [recipeExpanded, setRecipeExpanded] = useState(false);
  const [openLog, setOpenLog] = useState(null);
  const [avatarMenu, setAvatarMenu] = useState(false);
  const [centersView, setCentersView] = useState("list"); // "list" | "propose" | "pending"
  const [centerForm, setCenterForm] = useState({
    name: "",
    address: "",
    city: "",
    mapsUrl: "",
    specialty: "",
    notes: "",
    type: "",
  });
  const [centerFilter, setCenterFilter] = useState("all");
  const [userCenters, setUserCenters] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lt_centers") || "[]");
    } catch {
      return [];
    }
  });
  const [pendingCenters, setPendingCenters] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lt_centers_pending") || "[]");
    } catch {
      return [];
    }
  });
  const [newFood, setNewFood] = useState({
    name: "",
    reaction: "good",
    notes: "",
    category: "other",
  });
  const [customSuppName, setCustomSuppName] = useState("");
  const [infoFilter, setInfoFilter] = useState("all");

  const t = LANG[lang];

  useEffect(() => {
    // Carga localStorage siempre (fallback y usuarios no logueados)
    try {
      const sl = localStorage.getItem("lt_logs");
      const sf = localStorage.getItem("lt_foods");
      const sp = localStorage.getItem("lt_profile");
      const ss = localStorage.getItem("lt_supps");
      const sl2 = localStorage.getItem("lt_lang");
      const sw = localStorage.getItem("lt_welcome_seen");
      const so = localStorage.getItem("lt_onboarding_done");
      const sc = localStorage.getItem("lt_cycle");
      if (sc) setCycleData(JSON.parse(sc));
      if (sl) {
        const parsed = JSON.parse(sl);
        setLogs(parsed);
        const todayStr = new Date().toISOString().split("T")[0];
        const todayLog = parsed.find((l) => l.date === todayStr);
        if (todayLog) setEntry(todayLog);
      }
      if (sf) setFoods(JSON.parse(sf));
      if (sp) setProfile({ ...defaultProfile, ...JSON.parse(sp) });
      if (ss) setSupps(JSON.parse(ss));
      if (sl2) setLang(sl2);
      if (sw) setShowWelcome(false);
      if (sw && !so && !user) setShowOnboarding(true);
    } catch {}

    // Si hay sesión activa, sobreescribe con datos de Supabase
    if (!user) return;
    (async () => {
      try {
        const [dbProfile, dbLogs, dbFoods, dbCycle] = await Promise.all([
          getProfile(user.id),
          getLogs(user.id),
          getFoods(user.id),
          getCycle(user.id),
        ]);
        if (dbProfile) setProfile({ ...defaultProfile, ...dbProfile });
        if (dbLogs?.length) {
          setLogs(dbLogs);
          const todayStr = new Date().toISOString().split("T")[0];
          const todayLog = dbLogs.find((l) => l.date === todayStr);
          if (todayLog) setEntry(todayLog);
        }
        if (dbFoods?.length) setFoods(dbFoods);
        if (dbCycle && Object.keys(dbCycle).length) setCycleData(dbCycle);
      } catch (e) {
        console.error("Supabase load:", e);
      }
    })();

    // Si el usuario se acaba de loguear (Google/magic link), cerrar onboarding
    if (user) {
      try { localStorage.setItem("lt_onboarding_done", "1"); } catch {}
      setShowOnboarding(false);
      setShowWelcome(false);
    }
  }, [user]);

  const handleEnterApp = useCallback(() => {
    try {
      localStorage.setItem("lt_welcome_seen", "1");
    } catch {}
    setShowWelcome(false);
    setShowOnboarding(true);
  }, []);

  const handleOnboardingComplete = useCallback((data) => {
    // null = explorar sin cuenta (guest)
    if (data === null) {
      try {
        localStorage.setItem("lt_onboarding_done", "1");
      } catch {}
      setShowOnboarding(false);
      return;
    }
    const {
      name,
      lang: newLang,
      country,
      region,
      stage,
      compression,
      posture,
      lipedemaType,
    } = data;
    const updatedProfile = {
      ...defaultProfile,
      name,
      stage,
      country,
      region,
      compression,
      posture,
      lipedemaType: lipedemaType || "",
    };
    setProfile(updatedProfile);
    setLang(newLang);
    try {
      localStorage.setItem("lt_profile", JSON.stringify(updatedProfile));
      localStorage.setItem("lt_lang", newLang);
      localStorage.setItem("lt_onboarding_done", "1");
      if (country) localStorage.setItem("lt_location", JSON.stringify({ country, region }));
    } catch {}
    setShowOnboarding(false);
  }, []);

  const persist = useCallback((key, val) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }, []);

  const updateEntry = (field, val) => setEntry((e) => ({ ...e, [field]: val }));

  const handleLogout = () => {
    if (
      !window.confirm(
        lang === "es"
          ? "¿Segura que quieres cerrar sesión? Tus datos están guardados en la nube."
          : "Sure you want to log out? Your data is safely stored in the cloud."
      )
    )
      return;
    logout(); // Supabase signOut
    localStorage.removeItem("lt_welcome_seen");
    localStorage.removeItem("lt_onboarding_done");
    setShowWelcome(true);
    setShowOnboarding(false);
    setAvatarMenu(false);
  };

  const saveLog = () => {
    const updated = logs.filter((l) => l.date !== entry.date).concat(entry);
    updated.sort((a, b) => a.date.localeCompare(b.date));
    setLogs(updated);
    persist("lt_logs", updated);
    if (user) upsertLog(user.id, entry);
    setSavedMsg(t.today.saved);
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const saveProfile = () => {
    persist("lt_profile", profile);
    if (user) upsertProfile(user.id, profile);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const saveSupps = () => {
    persist("lt_supps", supps);
    setSuppsSaved(true);
    setTimeout(() => setSuppsSaved(false), 2500);
  };

  const addFood = () => {
    if (!newFood.name.trim()) return;
    const food = { ...newFood, id: Date.now().toString() };
    const updated = [...foods, food];
    setFoods(updated);
    persist("lt_foods", updated);
    if (user) upsertFood(user.id, food);
    setNewFood({ name: "", reaction: "good", notes: "", category: "other" });
  };

  const toggleCycleDay = (dateStr, type) => {
    setCycleData((prev) => {
      const next = { ...prev };
      if (next[dateStr] === type) delete next[dateStr];
      else next[dateStr] = type;
      try {
        localStorage.setItem("lt_cycle", JSON.stringify(next));
      } catch {}
      if (user) upsertCycle(user.id, next);
      return next;
    });
  };

  const saveCenterProposal = () => {
    if (!centerForm.name.trim() || !centerForm.city.trim()) return;
    const proposal = {
      ...centerForm,
      id: Date.now(),
      status: "pending",
      proposedAt: new Date().toISOString(),
    };
    const updated = [...pendingCenters, proposal];
    setPendingCenters(updated);
    try {
      localStorage.setItem("lt_centers_pending", JSON.stringify(updated));
    } catch {}
    setCenterForm({
      name: "",
      address: "",
      city: "",
      mapsUrl: "",
      specialty: "",
      notes: "",
      type: "",
    });
    setCentersView("list");
  };

  const approveCenter = (id) => {
    const center = pendingCenters.find((c) => c.id === id);
    if (!center) return;
    const approved = { ...center, status: "approved", verified: false };
    const newUser = [...userCenters, approved];
    const newPending = pendingCenters.filter((c) => c.id !== id);
    setUserCenters(newUser);
    setPendingCenters(newPending);
    try {
      localStorage.setItem("lt_centers", JSON.stringify(newUser));
      localStorage.setItem("lt_centers_pending", JSON.stringify(newPending));
    } catch {}
  };

  const rejectCenter = (id) => {
    const updated = pendingCenters.filter((c) => c.id !== id);
    setPendingCenters(updated);
    try {
      localStorage.setItem("lt_centers_pending", JSON.stringify(updated));
    } catch {}
  };

  const removeFood = (id) => {
    const updated = foods.filter((f) => f.id !== id);
    setFoods(updated);
    persist("lt_foods", updated);
    if (user) deleteFood(user.id, id);
  };

  const switchLang = (l) => {
    setLang(l);
    persist("lt_lang", l);
  };

  // Supplement helpers
  const allSupplementKeys = [
    ...SUPPLEMENT_OPTIONS.map((s) => s.key),
    ...(supps.custom || []).map((c) => c.key),
  ];

  const toggleSupp = (key) => {
    const active = supps.active || [];
    const isOn = active.some((a) => a.key === key);
    const updated = isOn
      ? { ...supps, active: active.filter((a) => a.key !== key) }
      : { ...supps, active: [...active, { key, dose: "", startDate: "", effect: "" }] };
    setSupps(updated);
  };

  const updateSuppData = (key, patch) => {
    const updated = {
      ...supps,
      active: supps.active.map((a) => (a.key === key ? { ...a, ...patch } : a)),
    };
    setSupps(updated);
  };

  const addCustomSupp = () => {
    if (!customSuppName.trim()) return;
    const key = "custom_" + Date.now();
    const updated = {
      ...supps,
      custom: [...(supps.custom || []), { key, name: customSuppName, icon: "💊" }],
      active: [...(supps.active || []), { key, dose: "", startDate: "", effect: "" }],
    };
    setSupps(updated);
    setCustomSuppName("");
  };

  const activeZones = profile.activeZones || [];
  const activeSupps = supps.active || [];

  const allSuppsList = [
    ...SUPPLEMENT_OPTIONS,
    ...(supps.custom || []).map((c) => ({
      key: c.key,
      icon: c.icon,
      es: c.name,
      en: c.name,
      note_es: "",
      note_en: "",
    })),
  ];

  // Chart data
  const chartData = logs.slice(-30).map((l) => ({
    date: l.date.slice(5),
    weight: parseFloat(l.weight) || null,
    pain: l.pain,
    energy: l.energy,
  }));

  const inflammationData = activeZones.map((z) => {
    const avg = logs.length
      ? logs.reduce((sum, l) => sum + (l.inflammationZones?.[z] || 0), 0) / logs.length
      : 0;
    return { zone: t.today.zoneNames[z] || z, value: parseFloat(avg.toFixed(1)) };
  });

  const suppChartData = logs.slice(-30).map((l) => ({
    date: l.date.slice(5),
    taken: (l.suppsTaken || []).length,
  }));

  const last30 = logs.slice(-30);
  const suppFreqData = activeSupps
    .map((a) => {
      const def = allSuppsList.find((s) => s.key === a.key);
      return {
        name: def ? (lang === "es" ? def.es : def.en) : a.key,
        count: last30.filter((l) => (l.suppsTaken || []).includes(a.key)).length,
      };
    })
    .sort((a, b) => b.count - a.count);

  const foodReactions = [
    {
      name: t.foods.good,
      count: foods.filter((f) => f.reaction === "good").length,
      fill: "#34d399",
    },
    { name: t.foods.bad, count: foods.filter((f) => f.reaction === "bad").length, fill: "#f87171" },
    {
      name: t.foods.neutral,
      count: foods.filter((f) => f.reaction === "neutral").length,
      fill: "#94a3b8",
    },
  ];

  // ─── STYLES ───────────────────────────────────────────────────────────────
  const S = {
    app: {
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      minHeight: "100vh",
      background: C.bg,
      color: C.cream,
      display: "flex",
      flexDirection: "column",
    },
    layout: { display: "flex", flex: 1 },
    header: {
      background: C.bgCard,
      borderBottom: `1px solid ${C.border}`,
      padding: "0 16px",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 200,
      boxShadow: "0 1px 8px rgba(74,110,87,0.07)",
      flexShrink: 0,
    },
    // Sidebar — shown on desktop (≥768px) via inline media workaround
    sidebar: (visible) => ({
      width: visible ? 220 : 0,
      minWidth: visible ? 220 : 0,
      background: C.bgCard,
      borderRight: `1px solid ${C.border}`,
      display: visible ? "flex" : "none",
      flexDirection: "column",
      padding: visible ? "16px 10px 24px" : 0,
      gap: 2,
      flexShrink: 0,
      overflowY: "auto",
      position: "sticky",
      top: 56,
      height: "calc(100vh - 56px)",
    }),
    // Mobile drawer
    drawerOverlay: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      background: "rgba(28,43,36,0.35)",
      backdropFilter: "blur(3px)",
    },
    drawer: {
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      width: 248,
      zIndex: 301,
      background: C.bgCard,
      borderRight: `1px solid ${C.border}`,
      boxShadow: "6px 0 32px rgba(28,43,36,0.12)",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    },
    sbItem: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 12px",
      borderRadius: 10,
      cursor: "pointer",
      transition: "all 0.15s",
      background: active ? C.creamFaint : "transparent",
      color: active ? C.sage : C.creamMuted,
      fontWeight: active ? 700 : 500,
      fontSize: 13,
      border: "none",
      width: "100%",
      textAlign: "left",
    }),
    sbSection: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.7px",
      color: C.creamMuted,
      padding: "12px 12px 4px",
    },
    // Bottom nav — mobile only
    bottomNav: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      background: C.bgCard,
      borderTop: `1px solid ${C.border}`,
      display: "flex",
      boxShadow: "0 -2px 12px rgba(28,43,36,0.06)",
    },
    bnItem: (active) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      padding: "8px 2px 6px",
      cursor: "pointer",
      border: "none",
      background: "none",
      color: active ? C.sage : C.creamMuted,
      transition: "color 0.15s",
    }),
    page: {
      flex: 1,
      overflowY: "auto",
      padding: "24px 24px 90px",
      maxWidth: 800,
      width: "100%",
      margin: "0 auto",
    },
    card: {
      background: C.bgCard,
      borderRadius: 14,
      padding: 20,
      marginBottom: 16,
      border: `1px solid ${C.border}`,
      boxShadow: "0 1px 4px rgba(74,110,87,0.06)",
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: C.cream,
      marginBottom: 14,
      letterSpacing: "-0.3px",
    },
    label: labelStyle,
    input: inputStyle,
    textarea: textareaStyle,
    btn: {
      padding: "12px 24px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 700,
      background: C.sage,
      color: "#fff",
      width: "100%",
      transition: "background 0.2s",
    },
    btnSm: (col) => ({
      padding: "6px 14px",
      borderRadius: 7,
      border: "none",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      background: col || C.creamFaint,
      color: col ? "#fff" : C.cream,
    }),
    row: { display: "flex", gap: 12 },
    col: { flex: 1 },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    tag: (color) => ({
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      background: color + "18",
      color,
    }),
    reactionColor: { good: C.success, bad: C.danger, neutral: C.creamMuted },
  };

  // Responsive breakpoint
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const BOTTOM_NAV_KEYS = ["home", "today", "history", "charts", "profile"];

  // Nav sections for sidebar grouping
  const NAV_GROUPS = [
    {
      label: lang === "es" ? "Seguimiento" : "Tracking",
      keys: ["home", "today", "history", "charts"],
    },
    { label: lang === "es" ? "Salud" : "Health", keys: ["foods", "supps"] },
    { label: lang === "es" ? "Recursos" : "Resources", keys: ["centers", "info"] },
    { label: lang === "es" ? "Cuenta" : "Account", keys: ["profile"] },
  ];

  // ─── RENDER ───────────────────────────────────────────────────────────────
  // Loading state mientras Supabase verifica la sesión
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f0f5f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#5a7568" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🌿</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Cargando…</div>
        </div>
      </div>
    );
  }
  if (showWelcome) {
    return <WelcomeGuide lang={lang} onEnter={handleEnterApp} />;
  }

  if (showOnboarding) {
    return (
      <Onboarding
        initialLang={lang}
        onComplete={handleOnboardingComplete}
        loginWithGoogle={loginWithGoogle}
      />
    );
  }

  return (
    <div style={S.app}>
      {/* Guide overlay — shown from Info tab, covers app without resetting state */}
      {showGuide && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, overflowY: "auto" }}>
          <WelcomeGuide lang={lang} onEnter={() => setShowGuide(false)} isOverlay />
        </div>
      )}
      {/* ── HEADER ── */}
      <div style={S.header}>
        {/* Left: hamburger (mobile only) + logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!isDesktop && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon name="menu" size={22} color={C.cream} />
            </button>
          )}
          {/* Logo SVG — leaf + circle mark */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="14" cy="14" r="13" fill={C.creamFaint} stroke={C.border} strokeWidth="1" />
            {/* Leaf shape */}
            <path
              d="M14 6 Q20 10 20 16 Q20 21 14 22 Q8 21 8 16 Q8 10 14 6Z"
              fill="none"
              stroke={C.sage}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Vein */}
            <line
              x1="14"
              y1="6"
              x2="14"
              y2="22"
              stroke={C.sage}
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="13"
              x2="18"
              y2="11"
              stroke={C.sage}
              strokeWidth="0.7"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="16"
              x2="18"
              y2="14"
              stroke={C.sage}
              strokeWidth="0.7"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="13"
              x2="10"
              y2="11"
              stroke={C.sage}
              strokeWidth="0.7"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="16"
              x2="10"
              y2="14"
              stroke={C.sage}
              strokeWidth="0.7"
              strokeLinecap="round"
            />
          </svg>

          {/* Wordmark */}
          <div>
            <span
              style={{ fontSize: 15, fontWeight: 800, color: C.cream, letterSpacing: "-0.4px" }}
            >
              lipedema
            </span>
            <span
              style={{ fontSize: 15, fontWeight: 300, color: C.sageLight, letterSpacing: "-0.2px" }}
            >
              {" "}
              tracker
            </span>
            <span
              style={{ fontSize: 9, color: C.creamMuted, marginLeft: 4, verticalAlign: "middle" }}
            >
              v{__APP_VERSION__}
            </span>
          </div>
        </div>

        {/* Right: lang toggle + avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              display: "flex",
              gap: 2,
              background: C.creamFaint,
              borderRadius: 8,
              padding: 2,
            }}
          >
            <button
              style={{
                padding: "3px 9px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                background: lang === "es" ? C.bgCard : "transparent",
                color: lang === "es" ? C.sageLight : C.creamMuted,
                transition: "all 0.2s",
              }}
              onClick={() => switchLang("es")}
            >
              ES
            </button>
            <button
              style={{
                padding: "3px 9px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                background: lang === "en" ? C.bgCard : "transparent",
                color: lang === "en" ? C.sageLight : C.creamMuted,
                transition: "all 0.2s",
              }}
              onClick={() => switchLang("en")}
            >
              EN
            </button>
          </div>

          {/* Avatar + dropdown */}
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setAvatarMenu((m) => !m)}
              title={profile.name || (lang === "es" ? "Mi perfil" : "My profile")}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.sage}, ${C.sageDark})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                border: `2px solid ${avatarMenu ? C.sage : C.creamFaint}`,
                transition: "border 0.15s",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                {profile.name ? profile.name.trim()[0].toUpperCase() : "?"}
              </span>
            </div>

            {/* Dropdown */}
            {avatarMenu && (
              <>
                {/* Backdrop — click outside to close */}
                <div
                  onClick={() => setAvatarMenu(false)}
                  style={{ position: "fixed", inset: 0, zIndex: 299 }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    zIndex: 300,
                    background: "white",
                    borderRadius: 14,
                    border: `1px solid ${C.border}`,
                    boxShadow: "0 8px 32px rgba(74,110,87,0.15)",
                    minWidth: 200,
                    overflow: "hidden",
                  }}
                >
                  {/* User info */}
                  <div style={{ padding: "14px 16px 10px", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${C.sage}, ${C.sageDark})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
                          {profile.name ? profile.name.trim()[0].toUpperCase() : "?"}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: C.cream }}>
                          {profile.name || (lang === "es" ? "Sin nombre" : "No name")}
                        </div>
                        <div style={{ fontSize: 11, color: C.creamMuted }}>
                          {lang === "es"
                            ? `Estadio ${profile.stage === "unknown" ? "—" : profile.stage}`
                            : `Stage ${profile.stage === "unknown" ? "—" : profile.stage}`}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: user ? C.sage : C.creamMuted,
                            marginTop: 2,
                            fontWeight: 600,
                          }}
                        >
                          {user
                            ? lang === "es"
                              ? "✓ Sincronizado"
                              : "✓ Synced"
                            : lang === "es"
                              ? "Sin cuenta — datos locales"
                              : "No account — local data"}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Menu items */}
                  <div style={{ padding: "6px 0" }}>
                    <button
                      onClick={() => {
                        setTab("profile");
                        setAvatarMenu(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13,
                        color: C.cream,
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      <Icon name="user" size={16} color={C.creamMuted} />
                      {lang === "es" ? "Mi perfil" : "My profile"}
                    </button>
                    <button
                      onClick={() => {
                        setTab("home");
                        setAvatarMenu(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13,
                        color: C.cream,
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      <Icon name="home" size={16} color={C.creamMuted} />
                      {lang === "es" ? "Inicio" : "Home"}
                    </button>
                    <div style={{ margin: "4px 12px", borderTop: `1px solid ${C.border}` }} />

                    {/* Botón Google login — solo si no hay sesión activa */}
                    {!user && (
                      <>
                        <button
                          onClick={() => {
                            loginWithGoogle();
                            setAvatarMenu(false);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px 16px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontSize: 13,
                            color: C.cream,
                            fontWeight: 700,
                            textAlign: "left",
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          {lang === "es" ? "Iniciar sesión con Google" : "Sign in with Google"}
                        </button>
                        <div style={{ margin: "4px 12px", borderTop: `1px solid ${C.border}` }} />
                      </>
                    )}

                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13,
                        color: "#c06080",
                        fontWeight: 700,
                        textAlign: "left",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c06080"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      {lang === "es" ? "Cerrar sesión" : "Log out"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── LAYOUT: sidebar + content ── */}
      <div style={S.layout}>
        {/* ── SIDEBAR (desktop) ── */}
        {isDesktop && (
          <aside style={S.sidebar(true)}>
            {/* Mini logo in sidebar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 12px 16px",
                borderBottom: `1px solid ${C.border}`,
                marginBottom: 8,
                cursor: "pointer",
              }}
              onClick={() => setTab("home")}
            >
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <circle
                  cx="14"
                  cy="14"
                  r="13"
                  fill={C.creamFaint}
                  stroke={C.border}
                  strokeWidth="1"
                />
                <path
                  d="M14 6 Q20 10 20 16 Q20 21 14 22 Q8 21 8 16 Q8 10 14 6Z"
                  fill="none"
                  stroke={C.sage}
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <line
                  x1="14"
                  y1="6"
                  x2="14"
                  y2="22"
                  stroke={C.sage}
                  strokeWidth="0.9"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{ fontSize: 12, fontWeight: 700, color: C.creamMuted, cursor: "pointer" }}
                onClick={() => setTab("home")}
              >
                {lang === "es" ? "Inicio" : "Home"}
              </span>
            </div>
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <div style={S.sbSection}>{group.label}</div>
                {group.keys.map((key) => {
                  const item = NAV_ITEMS.find((n) => n.key === key);
                  if (!item) return null;
                  const active = tab === key;
                  return (
                    <button key={key} style={S.sbItem(active)} onClick={() => setTab(key)}>
                      <Icon name={item.icon} size={16} color={active ? C.sage : C.creamMuted} />
                      {lang === "es" ? item.es : item.en}
                    </button>
                  );
                })}
              </div>
            ))}
          </aside>
        )}

        {/* ── MOBILE DRAWER ── */}
        {!isDesktop && sidebarOpen && (
          <>
            <div style={S.drawerOverlay} onClick={() => setSidebarOpen(false)} />
            <div style={S.drawer}>
              {/* Drawer header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 16px 12px",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: C.cream }}>
                    lipedema <span style={{ fontWeight: 300, color: C.creamMuted }}>tracker</span>
                  </div>
                  {profile.name && (
                    <div style={{ fontSize: 12, color: C.creamMuted, marginTop: 2 }}>
                      {profile.name}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: C.creamMuted,
                    padding: 4,
                  }}
                >
                  <Icon name="x" size={18} color={C.creamMuted} />
                </button>
              </div>
              <div
                style={{
                  padding: "8px 10px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {NAV_GROUPS.map((group) => (
                  <div key={group.label}>
                    <div style={S.sbSection}>{group.label}</div>
                    {group.keys.map((key) => {
                      const item = NAV_ITEMS.find((n) => n.key === key);
                      if (!item) return null;
                      const active = tab === key;
                      return (
                        <button
                          key={key}
                          style={S.sbItem(active)}
                          onClick={() => {
                            setTab(key);
                            setSidebarOpen(false);
                          }}
                        >
                          <Icon name={item.icon} size={16} color={active ? C.sage : C.creamMuted} />
                          {lang === "es" ? item.es : item.en}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── PAGE CONTENT ── */}
        <div style={S.page}>
          {/* ── HOME ── */}
          {tab === "home" && (
            <HomeTab
              logs={logs}
              cycleData={cycleData}
              activeSupps={activeSupps}
              allSuppsList={allSuppsList}
              profile={profile}
              lang={lang}
              C={C}
              setTab={setTab}
              recipeExpanded={recipeExpanded}
              setRecipeExpanded={setRecipeExpanded}
            />
          )}

          {/* ── TODAY ── */}
          {tab === "today" && (
            <TodayTab
              entry={entry}
              updateEntry={updateEntry}
              activeZones={activeZones}
              activeSupps={activeSupps}
              allSuppsList={allSuppsList}
              profile={profile}
              cycleData={cycleData}
              cycleMonth={cycleMonth}
              setCycleMonth={setCycleMonth}
              cycleActiveType={cycleActiveType}
              setCycleActiveType={setCycleActiveType}
              toggleCycleDay={toggleCycleDay}
              setCycleData={setCycleData}
              saveLog={saveLog}
              savedMsg={savedMsg}
              lang={lang}
              C={C}
              S={S}
              t={t}
              ZoneCard={ZoneCard}
              SliderInput={SliderInput}
            />
          )}

          {/* ── HISTORY ── */}
          {tab === "history" && (
            <HistoryTab
              logs={logs}
              openLog={openLog}
              setOpenLog={setOpenLog}
              allSuppsList={allSuppsList}
              profile={profile}
              lang={lang}
              C={C}
              S={S}
              t={t}
            />
          )}

          {/* ── CHARTS ── */}
          {tab === "charts" && (
            <>
              {logs.length < 1 ? (
                <div style={{ ...S.card, textAlign: "center", padding: 40 }}>
                  <div style={{ fontSize: 40 }}>📊</div>
                  <div style={{ color: C.creamMuted, marginTop: 8 }}>{t.charts.noData}</div>
                </div>
              ) : (
                <>
                  {/* Weight chart — only if at least one weight entry */}
                  {chartData.some((d) => d.weight) ? (
                    <div style={S.card}>
                      <div style={S.cardTitle}>{t.charts.weight}</div>
                      <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} domain={["auto", "auto"]} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#6366f1"
                            strokeWidth={2.5}
                            dot={{ r: 5 }}
                            connectNulls
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div
                      style={{
                        ...S.card,
                        color: C.creamMuted,
                        fontSize: 12,
                        textAlign: "center",
                        padding: "18px 16px",
                      }}
                    >
                      {lang === "es"
                        ? "Añade peso en el registro diario para ver esta gráfica"
                        : "Add weight in your daily log to see this chart"}
                    </div>
                  )}

                  <div style={S.card}>
                    <div style={S.cardTitle}>{t.charts.painEnergy}</div>
                    {logs.length === 1 && (
                      <div
                        style={{
                          fontSize: 11,
                          color: C.creamMuted,
                          marginBottom: 8,
                          fontStyle: "italic",
                        }}
                      >
                        {lang === "es"
                          ? "Con más registros verás la evolución en el tiempo"
                          : "Add more entries to see your trend over time"}
                      </div>
                    )}
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} domain={[0, 6]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="pain"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                          name={t.history.pain}
                        />
                        <Line
                          type="monotone"
                          dataKey="energy"
                          stroke="#22c55e"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                          name={t.history.energy}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {inflammationData.some((d) => d.value > 0) && (
                    <div style={S.card}>
                      <div style={S.cardTitle}>{t.charts.inflammation}</div>
                      <ResponsiveContainer width="100%" height={220}>
                        <RadarChart data={inflammationData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="zone" tick={{ fontSize: 11 }} />
                          <Radar
                            dataKey="value"
                            stroke="#f97316"
                            fill="#f97316"
                            fillOpacity={0.35}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {activeSupps.length > 0 && (
                    <div style={S.card}>
                      <div style={S.cardTitle}>{t.charts.suppAdherence}</div>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={suppChartData}>
                          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Bar dataKey="taken" fill={C.sage} radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {suppFreqData.some((d) => d.count > 0) && (
                    <div style={S.card}>
                      <div style={S.cardTitle}>{t.charts.suppFrequency}</div>
                      <ResponsiveContainer
                        width="100%"
                        height={Math.max(160, suppFreqData.length * 32)}
                      >
                        <BarChart data={suppFreqData} layout="vertical">
                          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10 }} />
                          <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fontSize: 11 }}
                            width={120}
                          />
                          <Tooltip />
                          <Bar dataKey="count" fill="#6366f1" radius={[0, 6, 6, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </>
              )}

              {foods.length > 0 && (
                <div style={S.card}>
                  <div style={S.cardTitle}>{t.charts.foods}</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={foodReactions} layout="vertical">
                      <XAxis type="number" tick={{ fontSize: 10 }} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} />
                      <Tooltip />
                      <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#6366f1" label={false} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          )}

          {/* ── FOODS ── */}
          {tab === "foods" && (
            <FoodsTab
              foods={foods}
              newFood={newFood}
              setNewFood={setNewFood}
              addFood={addFood}
              removeFood={removeFood}
              lang={lang}
              C={C}
              S={S}
              t={t}
            />
          )}

          {/* ── SUPPLEMENTS ── */}
          {tab === "supps" && (
            <>
              <div style={S.card}>
                <div style={S.cardTitle}>{t.supps.title}</div>
                <p style={{ fontSize: 13, color: C.creamMuted, marginBottom: 16 }}>
                  {t.supps.subtitle}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {SUPPLEMENT_OPTIONS.map((supp) => {
                    const isActive = activeSupps.some((a) => a.key === supp.key);
                    const suppData = activeSupps.find((a) => a.key === supp.key);
                    return (
                      <SupplementCard
                        key={supp.key}
                        supp={supp}
                        lang={lang}
                        isActive={isActive}
                        suppData={suppData}
                        onToggle={() => toggleSupp(supp.key)}
                        onUpdate={(patch) => updateSuppData(supp.key, patch)}
                      />
                    );
                  })}

                  {/* Custom supplements */}
                  {(supps.custom || []).map((c) => {
                    const supp = {
                      key: c.key,
                      icon: c.icon,
                      es: c.name,
                      en: c.name,
                      note_es: "",
                      note_en: "",
                    };
                    const isActive = activeSupps.some((a) => a.key === c.key);
                    const suppData = activeSupps.find((a) => a.key === c.key);
                    return (
                      <SupplementCard
                        key={c.key}
                        supp={supp}
                        lang={lang}
                        isActive={isActive}
                        suppData={suppData}
                        onToggle={() => toggleSupp(c.key)}
                        onUpdate={(patch) => updateSuppData(c.key, patch)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Add custom supplement */}
              <div style={S.card}>
                <div style={S.cardTitle}>{t.supps.custom}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    style={{ ...S.input, flex: 1 }}
                    placeholder={t.supps.customPlaceholder}
                    value={customSuppName}
                    onChange={(e) => setCustomSuppName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomSupp()}
                  />
                  <button
                    style={{ ...S.btn, width: "auto", padding: "9px 18px" }}
                    onClick={addCustomSupp}
                  >
                    {t.supps.addCustom}
                  </button>
                </div>
              </div>

              <button style={S.btn} onClick={saveSupps}>
                {suppsSaved ? t.supps.saved : t.supps.save}
              </button>
            </>
          )}

          {/* ── INFO ── */}
          {tab === "info" && (
            <InfoTab
              infoFilter={infoFilter}
              setInfoFilter={setInfoFilter}
              setShowGuide={setShowGuide}
              INFO_RESOURCES={INFO_RESOURCES}
              profile={profile}
              userCenters={userCenters}
              pendingCenters={pendingCenters}
              centerFilter={centerFilter}
              setCenterFilter={setCenterFilter}
              centersView={centersView}
              setCentersView={setCentersView}
              centerForm={centerForm}
              setCenterForm={setCenterForm}
              saveCenterProposal={saveCenterProposal}
              approveCenter={approveCenter}
              rejectCenter={rejectCenter}
              setTab={setTab}
              lang={lang}
              C={C}
              S={S}
              t={t}
            />
          )}

          {/* ── PROFILE ── */}
          {tab === "profile" && (
            <ProfileTab
              profile={profile}
              setProfile={setProfile}
              activeZones={activeZones}
              saveProfile={saveProfile}
              profileSaved={profileSaved}
              ALLERGENS={ALLERGENS}
              ALL_ZONES={ALL_ZONES}
              lang={lang}
              C={C}
              S={S}
              t={t}
            />
          )}
        </div>
      </div>

      {/* ── BOTTOM NAV (mobile) ── */}
      {!isDesktop && (
        <nav style={S.bottomNav}>
          {BOTTOM_NAV_KEYS.map((key) => {
            const item = NAV_ITEMS.find((n) => n.key === key);
            if (!item) return null;
            const active = tab === key;
            return (
              <button key={key} style={S.bnItem(active)} onClick={() => setTab(key)}>
                <Icon name={item.icon} size={20} color={active ? C.sage : C.creamMuted} />
                <span style={{ fontSize: 9, fontWeight: active ? 700 : 500 }}>
                  {lang === "es" ? item.es : item.en}
                </span>
              </button>
            );
          })}
          <button style={S.bnItem(false)} onClick={() => setSidebarOpen(true)}>
            <Icon name="menu" size={20} color={C.creamMuted} />
            <span style={{ fontSize: 9, fontWeight: 500 }}>{lang === "es" ? "Más" : "More"}</span>
          </button>
        </nav>
      )}
    </div>
  );
}
