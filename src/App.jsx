import { useState, useEffect, useCallback } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, Legend,
} from "recharts";
import WelcomeGuide from "./WelcomeGuide";
import Onboarding from "./Onboarding";

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
        desc_es: "Revisión sistemática de más de 100 estudios sobre fisiopatología, diagnóstico y opciones de tratamiento.",
        desc_en: "Systematic review of 100+ studies on pathophysiology, diagnosis and treatment options.",
        url: "https://pubmed.ncbi.nlm.nih.gov/40425048/",
        year: 2025,
        type: "review",
      },
      {
        lang: "en",
        title: "Lipedema: Insights into Morphology, Pathophysiology, and Challenges",
        authors: "Biomedicines — PubMed",
        desc_es: "Análisis en profundidad de las características morfológicas, fibrosis e inflamación del lipedema.",
        desc_en: "In-depth analysis of morphological features, fibrosis and inflammation in lipedema.",
        url: "https://pubmed.ncbi.nlm.nih.gov/36551837/",
        year: 2022,
        type: "review",
      },
      {
        lang: "en",
        title: "S2k Guideline Lipedema (Guía clínica oficial alemana)",
        authors: "DGPL — PubMed",
        desc_es: "Guía oficial con 60 recomendaciones sobre diagnóstico, tratamiento conservador, quirúrgico y autogestión.",
        desc_en: "Official guideline with 60 recommendations on diagnosis, conservative & surgical treatment, and self-management.",
        url: "https://pubmed.ncbi.nlm.nih.gov/39188170/",
        year: 2024,
        type: "guideline",
      },
      {
        lang: "en",
        title: "Proposed Framework for Research Case Definitions of Lipedema",
        authors: "Lipedema Simplified / Harvard — PubMed",
        desc_es: "Marco de referencia para estandarizar el diagnóstico en investigación, con 5 características clave.",
        desc_en: "Framework for standardizing lipedema research diagnosis, with 5 agreed-upon characteristics.",
        url: "https://pubmed.ncbi.nlm.nih.gov/38546398/",
        year: 2024,
        type: "research",
      },
      {
        lang: "en",
        title: "Lipedema and Adipose Tissue: Current Understanding & Future Directions",
        authors: "Frontiers in Cell and Developmental Biology",
        desc_es: "Estado del arte en 2025: macrófagos, fibrosis, dieta cetogénica e IA en el diagnóstico.",
        desc_en: "2025 state of the art: macrophages, fibrosis, ketogenic diet and AI in diagnosis.",
        url: "https://www.frontiersin.org/journals/cell-and-developmental-biology/articles/10.3389/fcell.2025.1691161/full",
        year: 2025,
        type: "review",
      },
      {
        lang: "es",
        title: "¿Qué sabemos del lipedema? Una enfermedad poco conocida",
        authors: "The Conversation — Divulgación científica",
        desc_es: "Artículo divulgativo en español sobre causas, diagnóstico y tratamiento multidisciplinar del lipedema.",
        desc_en: "Scientific outreach article in Spanish on causes, diagnosis and multidisciplinary treatment.",
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
        desc_es: "Guía completa de tratamientos conservadores y quirúrgicos de la organización líder en investigación.",
        desc_en: "Complete guide to conservative and surgical treatments from the leading research organization.",
        url: "https://www.lipedema.org/treating-lipedema",
        year: 2024,
        type: "guide",
      },
      {
        lang: "en",
        title: "Lipedema Treatment & Causes — The Lipedema Project",
        authors: "The Lipedema Project",
        desc_es: "Explicación detallada de la Terapia Descongestiva Completa (CDT), MLD, compresión y liposucción linfática.",
        desc_en: "Detailed explanation of Complete Decongestive Therapy (CDT), MLD, compression and lymphatic liposuction.",
        url: "https://lipedemaproject.org/treatment-for-lipedema/",
        year: 2024,
        type: "guide",
      },
      {
        lang: "en",
        title: "Patient Guide: Treatment of Lipedema and Lipo-Lymphedema",
        authors: "Toronto Physiotherapy",
        desc_es: "Guía para pacientes: qué puede y no puede hacer el MLD, compresión, dispositivos neumáticos y cirugía.",
        desc_en: "Patient guide: what MLD can and cannot do, compression, pneumatic devices and surgery.",
        url: "https://torontophysiotherapy.ca/patient-guide-lipedema-lipolymphedema-treatment/",
        year: 2022,
        type: "guide",
      },
      {
        lang: "en",
        title: "Finding a Lipedema Specialist — Lipedema Foundation",
        authors: "Lipedema Foundation",
        desc_es: "Directorio de especialistas y guía para navegar el sistema de salud con lipedema.",
        desc_en: "Specialist directory and guide to navigating the healthcare system with lipedema.",
        url: "https://www.lipedema.org/findspecialists",
        year: 2024,
        type: "guide",
      },
      {
        lang: "es",
        title: "Qué es el Lipedema — Lipemedical (España)",
        authors: "Lipemedical — Dr. Burgos de la Obra",
        desc_es: "Información clínica en español sobre síntomas, estadios y tratamiento quirúrgico WAL del lipedema.",
        desc_en: "Clinical info in Spanish on symptoms, stages and WAL surgical treatment for lipedema.",
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
        desc_es: "La principal asociación de pacientes con lipedema en España. Foro privado, eventos y apoyo entre pares.",
        desc_en: "Main Spanish lipedema patient association. Private forum, events and peer support.",
        url: "https://www.adalipe.es/",
        year: 2024,
        type: "association",
      },
      {
        lang: "es",
        title: "FEDEAL — Federación Española de Asociaciones de Linfedema y Lipedema",
        authors: "Federación española",
        desc_es: "Punto de encuentro nacional de las asociaciones regionales. Trabaja por el reconocimiento institucional.",
        desc_en: "National federation of regional associations. Works for institutional recognition.",
        url: "https://fedeal.org/",
        year: 2024,
        type: "association",
      },
      {
        lang: "en",
        title: "Lipedema Foundation — Comunidad & Recursos",
        authors: "Lipedema Foundation (USA)",
        desc_es: "La mayor organización financiadora de investigación sobre lipedema. Registro de pacientes y directorio de proveedores.",
        desc_en: "Largest lipedema research funder. Patient registry and provider directory.",
        url: "https://www.lipedema.org/",
        year: 2024,
        type: "association",
      },
      {
        lang: "en",
        title: "r/Lipedema — Reddit Community",
        authors: "Reddit",
        desc_es: "Comunidad activa en inglés con miles de miembros compartiendo experiencias, cirugías y consejos diarios.",
        desc_en: "Active English community with thousands of members sharing experiences, surgeries and daily tips.",
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
        desc_es: "Activista del lipedema y creadora de contenido. Baile, salud mental y visibilidad de la enfermedad.",
        desc_en: "Lipedema activist and content creator. Dance, mental health and disease visibility.",
        url: "https://www.instagram.com/allison.jacobsss/",
        type: "influencer",
      },
      {
        lang: "en",
        platform: "Instagram",
        title: "@sarah.whitlow_ — Sarah Whitlow",
        authors: "182K seguidores · Lipedema Movement & Fitness",
        desc_es: "Fundadora de Lipedema Movement & Fitness. Ejercicio adaptado y comunidad de apoyo.",
        desc_en: "Founder of Lipedema Movement & Fitness. Adapted exercise and support community.",
        url: "https://www.instagram.com/sarah.whitlow_/",
        type: "influencer",
      },
      {
        lang: "en",
        platform: "Instagram",
        title: "@xanthia_efthymiou — Xanthia Efthymiou",
        authors: "339K seguidores · Australia",
        desc_es: "Concienciación sobre lipoedema desde Australia. Transparente sobre su proceso y tratamientos.",
        desc_en: "Lipoedema awareness from Australia. Transparent about her process and treatments.",
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
        desc_es: "Cuenta española que documenta el proceso, la cirugía en Barcelona y la vida diaria con lipedema.",
        desc_en: "Spanish account documenting the process, surgery in Barcelona and daily life with lipedema.",
        url: "https://www.instagram.com/lipedemadiary/",
        type: "influencer",
      },
      {
        lang: "en",
        platform: "Instagram",
        title: "@lipedemafitness — Lipedema Fitness",
        authors: "9K seguidores · Desde 2013",
        desc_es: "Dedicado al ejercicio y actividad física adaptada para personas con lipedema desde 2013.",
        desc_en: "Dedicated to adapted exercise and physical activity for people with lipedema since 2013.",
        url: "https://www.instagram.com/lipedemafitness/",
        type: "influencer",
      },
    ],
  },
};

// ─── SUPPLEMENTS DATA ────────────────────────────────────────────────────────
const SUPPLEMENT_OPTIONS = [
  { key: "omega3",       icon: "🐟", es: "Omega-3",              en: "Omega-3",              note_es: "Antiinflamatorio",             note_en: "Anti-inflammatory" },
  { key: "vitD",         icon: "☀️", es: "Vitamina D3",          en: "Vitamin D3",           note_es: "Inmunidad y huesos",           note_en: "Immunity & bones" },
  { key: "magnesium",    icon: "🪨", es: "Magnesio",             en: "Magnesium",            note_es: "Calambres y sueño",            note_en: "Cramps & sleep" },
  { key: "vitC",         icon: "🍊", es: "Vitamina C",           en: "Vitamin C",            note_es: "Colágeno y antioxidante",      note_en: "Collagen & antioxidant" },
  { key: "rutin",        icon: "🌿", es: "Rutina / Diosmina",    en: "Rutin / Diosmin",      note_es: "Circulación y linfático",      note_en: "Circulation & lymph" },
  { key: "quercetin",    icon: "🍎", es: "Quercetina",           en: "Quercetin",            note_es: "Antiinflamatorio flavonoide",  note_en: "Flavonoid anti-inflammatory" },
  { key: "selenium",     icon: "⚗️", es: "Selenio",              en: "Selenium",             note_es: "Tiroides y antioxidante",      note_en: "Thyroid & antioxidant" },
  { key: "zinc",         icon: "🔩", es: "Zinc",                 en: "Zinc",                 note_es: "Inmunidad y piel",             note_en: "Immunity & skin" },
  { key: "probiotics",   icon: "🦠", es: "Probióticos",          en: "Probiotics",           note_es: "Microbiota intestinal",        note_en: "Gut microbiome" },
  { key: "curcumin",     icon: "🌾", es: "Cúrcuma / Curcumina",  en: "Turmeric / Curcumin",  note_es: "Antiinflamatorio potente",     note_en: "Potent anti-inflammatory" },
  { key: "coq10",        icon: "⚡", es: "Coenzima Q10",         en: "CoQ10",                note_es: "Energía celular",              note_en: "Cellular energy" },
  { key: "ironB12",      icon: "🩸", es: "Hierro + B12",         en: "Iron + B12",           note_es: "Anemia y fatiga",              note_en: "Anemia & fatigue" },
  { key: "collagen",     icon: "🧬", es: "Colágeno",             en: "Collagen",             note_es: "Piel y tejido conjuntivo",     note_en: "Skin & connective tissue" },
  { key: "berberine",    icon: "🌱", es: "Berberina",            en: "Berberine",            note_es: "Glucosa e inflamación",        note_en: "Glucose & inflammation" },
  { key: "lymph",        icon: "💧", es: "Drenaje linfático",    en: "Lymphatic herbs",      note_es: "Árnica, rusco, castaño...",   note_en: "Arnica, butcher's broom..." },
];

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const LANG = {
  es: {
    appTitle: "Lipedema Tracker",
    appSubtitle: "Tu diario de salud personalizado",
    nav: { today: "Hoy", history: "Historial", charts: "Gráficos", foods: "Alimentos", supps: "Suplementos", info: "Info", profile: "Perfil" },
    today: {
      title: "Registro de Hoy",
      date: "Fecha",
      weight: "Peso (kg)",
      energy: "Nivel de Energía",
      pain: "Nivel de Dolor",
      inflammation: "Inflamación por Zonas",
      inflammationNote: "Descripción libre (síntomas, sensaciones...)",
      inflammationNotePlaceholder: "Ej: Piernas muy pesadas al levantarme, tobillos hinchados por la tarde...",
      mood: "Estado Emocional",
      measures: "Medidas (cm)",
      save: "Guardar registro",
      saved: "✓ Guardado",
      todaysSupps: "Suplementos tomados hoy",
      zoneNames: {
        waist: "Cintura", hips: "Caderas", leftThigh: "Muslo Izq.", rightThigh: "Muslo Der.",
        leftCalf: "Pantorrilla Izq.", rightCalf: "Pantorrilla Der.", leftArm: "Brazo Izq.",
        rightArm: "Brazo Der.", abdomen: "Abdomen", ankles: "Tobillos",
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
      categories: { antiinflammatory: "Antiinflamatorio", gluten: "Gluten", dairy: "Lácteos", sugar: "Azúcar", other: "Otro" },
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
        review: "Revisión", guideline: "Guía clínica", research: "Investigación",
        article: "Artículo", guide: "Guía", clinical: "Clínico",
        association: "Asociación", forum: "Foro", influencer: "Perfil", platform: "Plataforma",
      },
      disclaimer: "⚠️ Esta información es educativa. Consulta siempre con tu médico especialista antes de cambiar tu tratamiento.",
      openLink: "Abrir →",
    },
    profile: {
      title: "Mi Perfil",
      name: "Nombre",
      stage: "Estadio Lipedema",
      stages: { "1": "Estadio 1", "2": "Estadio 2", "3": "Estadio 3", "4": "Estadio 4", unknown: "No sé / Sin diagnóstico" },
      diagnosis: "Fecha de diagnóstico",
      activeZones: "Mis zonas afectadas",
      save: "Guardar perfil",
      saved: "✓ Guardado",
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
    nav: { today: "Today", history: "History", charts: "Charts", foods: "Foods", supps: "Supplements", info: "Info", profile: "Profile" },
    today: {
      title: "Today's Log",
      date: "Date",
      weight: "Weight (kg)",
      energy: "Energy Level",
      pain: "Pain Level",
      inflammation: "Inflammation by Zone",
      inflammationNote: "Free description (symptoms, sensations...)",
      inflammationNotePlaceholder: "E.g. Very heavy legs in the morning, swollen ankles in the afternoon...",
      mood: "Emotional State",
      measures: "Measurements (cm)",
      save: "Save log",
      saved: "✓ Saved",
      todaysSupps: "Supplements taken today",
      zoneNames: {
        waist: "Waist", hips: "Hips", leftThigh: "Left Thigh", rightThigh: "Right Thigh",
        leftCalf: "Left Calf", rightCalf: "Right Calf", leftArm: "Left Arm",
        rightArm: "Right Arm", abdomen: "Abdomen", ankles: "Ankles",
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
      categories: { antiinflammatory: "Anti-inflammatory", gluten: "Gluten", dairy: "Dairy", sugar: "Sugar", other: "Other" },
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
        review: "Review", guideline: "Guideline", research: "Research",
        article: "Article", guide: "Guide", clinical: "Clinical",
        association: "Association", forum: "Forum", influencer: "Profile", platform: "Platform",
      },
      disclaimer: "⚠️ This information is educational. Always consult your specialist before changing your treatment.",
      openLink: "Open →",
    },
    profile: {
      title: "My Profile",
      name: "Name",
      stage: "Lipedema Stage",
      stages: { "1": "Stage 1", "2": "Stage 2", "3": "Stage 3", "4": "Stage 4", unknown: "Unknown / Undiagnosed" },
      diagnosis: "Diagnosis date",
      activeZones: "My affected zones",
      save: "Save profile",
      saved: "✓ Saved",
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
      foods: "Foods: Reactions",
      noData: "Log data to see charts",
    },
    energyLabels: ["Exhausted", "Very low", "Low", "Fair", "Good", "Very good", "Excellent"],
    painLabels: ["No pain", "Minimal", "Mild", "Moderate", "Notable", "Intense", "Severe"],
    moodOptions: ["😔", "😕", "😐", "🙂", "😊", "😄"],
  },
};

const ALL_ZONES = ["waist","hips","leftThigh","rightThigh","leftCalf","rightCalf","leftArm","rightArm","abdomen","ankles"];

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
});

const defaultProfile = {
  name: "",
  stage: "unknown",
  diagnosis: "",
  activeZones: ["leftThigh","rightThigh","leftCalf","rightCalf"],
  pillActive: false,   // is she taking the pill?
  pillBrand: "",       // brand name
};

const defaultSupps = { active: [], custom: [] };

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function SliderInput({ value, onChange, max = 6, labels, color = "#6366f1" }) {
  return (
    <div style={{ width: "100%" }}>
      <input
        type="range" min={0} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: color, cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        {labels.map((l, i) => (
          <span key={i} style={{ fontSize: 10, color: i === value ? color : C.creamMuted, fontWeight: i === value ? 700 : 400, transition: "color 0.2s" }}>
            {i === value ? l : "·"}
          </span>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 6, fontSize: 13, fontWeight: 600, color }}>{labels[value]}</div>
    </div>
  );
}

function ZoneCard({ zone, zoneName, value, onChange }) {
  const colors = [C.border, "#8ab89a", "#5a9a72", "#c5a040", C.danger, "#8a2020"];
  const lv = value || 0;
  return (
    <div style={{ background: C.bgInput, borderRadius: 10, padding: "10px 14px", border: `1.5px solid ${lv > 0 ? colors[Math.min(lv,5)] : C.border}`, transition: "border-color 0.3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.cream }}>{zoneName}</span>
        <span style={{ fontSize: 12, color: C.creamMuted }}>{lv}/5</span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[0,1,2,3,4,5].map((v) => (
          <div key={v} onClick={() => onChange(v)}
            style={{ flex: 1, height: 18, borderRadius: 4, background: v <= lv ? colors[lv] : C.border, cursor: "pointer", transition: "background 0.2s", opacity: v <= lv ? 1 : 0.5 }}
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
    <div style={{
      borderRadius: 12,
      border: `1.5px solid ${isActive ? C.sage : C.border}`,
      background: isActive ? "#f2f8f5" : C.bgCard,
      transition: "all 0.2s", overflow: "hidden",
      boxShadow: isActive ? "0 1px 6px rgba(77,138,110,0.1)" : "none",
    }}>
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer" }}>
        <span style={{ fontSize: 22 }}>{supp.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: C.cream }}>{name}</div>
          <div style={{ fontSize: 11, color: C.creamMuted }}>{note}</div>
        </div>
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          border: `2px solid ${isActive ? C.sage : C.border}`,
          background: isActive ? C.sage : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {isActive && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
        </div>
      </div>

      {isActive && (
        <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <label style={labelStyle}>{t.dose}</label>
              <input style={inputStyle} placeholder={t.dosePlaceholder}
                value={suppData?.dose || ""} onChange={(e) => onUpdate({ dose: e.target.value })} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{t.startDate}</label>
                <input type="date" style={inputStyle}
                  value={suppData?.startDate || ""} onChange={(e) => onUpdate({ startDate: e.target.value })} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t.effect}</label>
              <div style={{ display: "flex", gap: 6 }}>
                {Object.entries(t.effectOptions).map(([k, v]) => (
                  <button key={k} onClick={() => onUpdate({ effect: k })}
                    style={{
                      flex: 1, padding: "6px 4px", borderRadius: 7, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 11, fontWeight: 600,
                      background: suppData?.effect === k
                        ? (k === "good" ? C.success : k === "bad" ? C.danger : C.creamMuted)
                        : C.bgInput,
                      color: suppData?.effect === k ? "#fff" : C.creamMuted,
                      transition: "all 0.2s",
                    }}>{v}</button>
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
  bg:         "#f0f5f2",   // fondo principal — verde pálido
  bgCard:     "#ffffff",   // tarjetas — blanco puro
  bgCardHov:  "#f7faf8",   // hover tarjetas
  bgInput:    "#f7faf8",   // inputs — blanco roto muy suave
  border:     "#d6e5dd",   // bordes — sage muy suave
  borderFoc:  "#4d8a6e",   // bordes activos
  sage:       "#4d8a6e",   // verde salvia principal (oscurecido para contraste en claro)
  sageDark:   "#3a6e57",   // sage oscuro (botones hover)
  sageLight:  "#3a6e57",   // sage texto (mismo, contraste ≥4.5:1 sobre blanco)
  cream:      "#1c2b24",   // texto principal — verde muy oscuro casi negro
  creamMuted: "#5a7568",   // texto secundario — sage medio
  creamFaint: "#e4eeea",   // superficies muy sutiles
  accent:     "#8a6c3a",   // dorado/tierra acento (oscurecido para legibilidad)
  danger:     "#b84040",   // error/dolor
  success:    "#4d8a6e",   // éxito/bien
  warn:       "#a07830",   // warning/neutral
};

const labelStyle = {
  fontSize: 11, fontWeight: 700, color: C.creamMuted, marginBottom: 5,
  display: "block", textTransform: "uppercase", letterSpacing: "0.6px",
};
const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8,
  border: `1.5px solid ${C.border}`, fontSize: 13, outline: "none",
  background: C.bgCard, boxSizing: "border-box", fontFamily: "inherit",
  color: C.cream, transition: "border-color 0.2s",
};
const textareaStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8,
  border: `1.5px solid ${C.border}`, fontSize: 13, outline: "none",
  background: C.bgInput, boxSizing: "border-box", resize: "vertical",
  minHeight: 70, fontFamily: "inherit", color: C.cream,
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

// ─── NAV ITEMS & ICONS ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "home",     icon: "home",      es: "Inicio",    en: "Home"        },
  { key: "today",    icon: "calendar",  es: "Hoy",       en: "Today"       },
  { key: "history",  icon: "clock",     es: "Historial", en: "History"     },
  { key: "charts",   icon: "trending",  es: "Gráficas",  en: "Charts"      },
  { key: "foods",    icon: "utensils",  es: "Alimentos", en: "Foods"       },
  { key: "supps",    icon: "pill",      es: "Suplementos",en: "Supplements"},
  { key: "centers",  icon: "mappin",    es: "Centros",   en: "Centers"     },
  { key: "info",     icon: "book",      es: "Información",en: "Info"       },
  { key: "profile",  icon: "user",      es: "Perfil",    en: "Profile"     },
];

// Lucide-style SVG icons — 20×20 viewBox, stroke-based
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75 }) {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const p = { fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    calendar: <svg style={s} viewBox="0 0 24 24" {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="7" y="14" width="3" height="3" rx="0.5" fill={color} stroke="none"/></svg>,
    clock:    <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>,
    trending: <svg style={s} viewBox="0 0 24 24" {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    utensils: <svg style={s} viewBox="0 0 24 24" {...p}><line x1="3" y1="2" x2="3" y2="22"/><path d="M7 2v7a4 4 0 0 1-4 4"/><path d="M21 2v20M21 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4"/></svg>,
    pill:     <svg style={s} viewBox="0 0 24 24" {...p}><path d="M10.5 20H4a2 2 0 0 1-2-2v-2.5a2 2 0 0 1 2-2h6.5"/><path d="M13.5 4H20a2 2 0 0 1 2 2v2.5a2 2 0 0 1-2 2h-6.5"/><circle cx="12" cy="12" r="7"/><path d="M7.5 12h9"/></svg>,
    mappin:   <svg style={s} viewBox="0 0 24 24" {...p}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
    book:     <svg style={s} viewBox="0 0 24 24" {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="12" y1="6" x2="16" y2="6"/><line x1="12" y1="10" x2="16" y2="10"/></svg>,
    user:     <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    menu:     <svg style={s} viewBox="0 0 24 24" {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x:        <svg style={s} viewBox="0 0 24 24" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    home:     <svg style={s} viewBox="0 0 24 24" {...p}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>,
    leaf:     <svg style={s} viewBox="0 0 24 24" {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  };
  return icons[name] || null;
}


export default function App() {
  const [lang, setLang] = useState("es");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
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
  const [cycleMonth, setCycleMonth] = useState(() => { const n = new Date(); return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`; });
  const [cycleActiveType, setCycleActiveType] = useState(null); // "period"|"spm"|"retention"|null
  const [recipeExpanded, setRecipeExpanded] = useState(false);
  const [openLog, setOpenLog] = useState(null);
  const [avatarMenu, setAvatarMenu] = useState(false);
  const [newFood, setNewFood] = useState({ name: "", reaction: "good", notes: "", category: "other" });
  const [customSuppName, setCustomSuppName] = useState("");
  const [infoFilter, setInfoFilter] = useState("all");

  const t = LANG[lang];

  useEffect(() => {
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
      if (sl) setLogs(JSON.parse(sl));
      if (sf) setFoods(JSON.parse(sf));
      if (sp) setProfile({ ...defaultProfile, ...JSON.parse(sp) });
      if (ss) setSupps(JSON.parse(ss));
      if (sl2) setLang(sl2);
      if (sw) setShowWelcome(false);
      // Show onboarding if welcome seen but not yet completed onboarding
      if (sw && !so) setShowOnboarding(true);
    } catch {}
  }, []);

  const handleEnterApp = useCallback(() => {
    try { localStorage.setItem("lt_welcome_seen", "1"); } catch {}
    setShowWelcome(false);
    setShowOnboarding(true);
  }, []);

  const handleOnboardingComplete = useCallback(({ name, lang: newLang, country, region, stage, compression, posture }) => {
    const updatedProfile = { ...defaultProfile, name, stage, country, region, compression, posture };
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
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, []);

  const updateEntry = (field, val) => setEntry((e) => ({ ...e, [field]: val }));

  const handleLogout = () => {
    if (!window.confirm(lang === "es"
      ? "¿Segura que quieres cerrar sesión? Tus datos se mantendrán guardados."
      : "Sure you want to log out? Your data will remain saved.")) return;
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
    setSavedMsg(t.today.saved);
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const saveProfile = () => {
    persist("lt_profile", profile);
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
    const updated = [...foods, { ...newFood, id: Date.now() }];
    setFoods(updated);
    persist("lt_foods", updated);
    setNewFood({ name: "", reaction: "good", notes: "", category: "other" });
  };

  const toggleCycleDay = (dateStr, type) => {
    setCycleData(prev => {
      const next = { ...prev };
      if (next[dateStr] === type) delete next[dateStr];  // tap same → clear
      else next[dateStr] = type;
      try { localStorage.setItem("lt_cycle", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const removeFood = (id) => {
    const updated = foods.filter((f) => f.id !== id);
    setFoods(updated);
    persist("lt_foods", updated);
  };

  const switchLang = (l) => { setLang(l); persist("lt_lang", l); };

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
      active: supps.active.map((a) => a.key === key ? { ...a, ...patch } : a),
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
    ...(supps.custom || []).map((c) => ({ key: c.key, icon: c.icon, es: c.name, en: c.name, note_es: "", note_en: "" })),
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

  const foodReactions = [
    { name: t.foods.good, count: foods.filter((f) => f.reaction === "good").length, fill: "#34d399" },
    { name: t.foods.bad, count: foods.filter((f) => f.reaction === "bad").length, fill: "#f87171" },
    { name: t.foods.neutral, count: foods.filter((f) => f.reaction === "neutral").length, fill: "#94a3b8" },
  ];

  // ─── STYLES ───────────────────────────────────────────────────────────────
  const S = {
    app:       { fontFamily: "'DM Sans','Segoe UI',sans-serif", minHeight: "100vh", background: C.bg, color: C.cream, display: "flex", flexDirection: "column" },
    layout:    { display: "flex", flex: 1 },
    header:    {
      background: C.bgCard, borderBottom: `1px solid ${C.border}`,
      padding: "0 16px", height: 56, display: "flex", alignItems: "center",
      justifyContent: "space-between", position: "sticky", top: 0, zIndex: 200,
      boxShadow: "0 1px 8px rgba(74,110,87,0.07)", flexShrink: 0,
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
      position: "fixed", inset: 0, zIndex: 300,
      background: "rgba(28,43,36,0.35)", backdropFilter: "blur(3px)",
    },
    drawer: {
      position: "fixed", top: 0, left: 0, bottom: 0, width: 248, zIndex: 301,
      background: C.bgCard, borderRight: `1px solid ${C.border}`,
      boxShadow: "6px 0 32px rgba(28,43,36,0.12)",
      display: "flex", flexDirection: "column", overflowY: "auto",
    },
    sbItem: (active) => ({
      display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
      borderRadius: 10, cursor: "pointer", transition: "all 0.15s",
      background: active ? C.creamFaint : "transparent",
      color: active ? C.sage : C.creamMuted,
      fontWeight: active ? 700 : 500, fontSize: 13,
      border: "none", width: "100%", textAlign: "left",
    }),
    sbSection: {
      fontSize: 10, fontWeight: 800, textTransform: "uppercase",
      letterSpacing: "0.7px", color: C.creamMuted, padding: "12px 12px 4px",
    },
    // Bottom nav — mobile only
    bottomNav: {
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
      background: C.bgCard, borderTop: `1px solid ${C.border}`,
      display: "flex", boxShadow: "0 -2px 12px rgba(28,43,36,0.06)",
    },
    bnItem: (active) => ({
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
      gap: 3, padding: "8px 2px 6px", cursor: "pointer",
      border: "none", background: "none",
      color: active ? C.sage : C.creamMuted, transition: "color 0.15s",
    }),
    page:      { flex: 1, overflowY: "auto", padding: "24px 24px 90px", maxWidth: 800, width: "100%", margin: "0 auto" },
    card:      { background: C.bgCard, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(74,110,87,0.06)" },
    cardTitle: { fontSize: 14, fontWeight: 700, color: C.cream, marginBottom: 14, letterSpacing: "-0.3px" },
    label:     labelStyle, input: inputStyle, textarea: textareaStyle,
    btn:       { padding: "12px 24px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, background: C.sage, color: "#fff", width: "100%", transition: "background 0.2s" },
    btnSm:     (col) => ({ padding: "6px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: col || C.creamFaint, color: col ? "#fff" : C.cream }),
    row:       { display: "flex", gap: 12 }, col: { flex: 1 },
    grid2:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    tag:       (color) => ({ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: color + "18", color }),
    reactionColor: { good: C.success, bad: C.danger, neutral: C.creamMuted },
  };

  // Responsive breakpoint
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" && window.innerWidth >= 768);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const BOTTOM_NAV_KEYS = ["home", "today", "history", "charts", "profile"];

  // Nav sections for sidebar grouping
  const NAV_GROUPS = [
    { label: lang === "es" ? "Seguimiento" : "Tracking", keys: ["home","today","history","charts"] },
    { label: lang === "es" ? "Salud"       : "Health",   keys: ["foods","supps"] },
    { label: lang === "es" ? "Recursos"    : "Resources",keys: ["centers","info"] },
    { label: lang === "es" ? "Cuenta"      : "Account",  keys: ["profile"] },
  ];

  // ─── RENDER ───────────────────────────────────────────────────────────────
  if (showWelcome) {
    return <WelcomeGuide lang={lang} onEnter={handleEnterApp} />;
  }

  if (showOnboarding) {
    return <Onboarding initialLang={lang} onComplete={handleOnboardingComplete} />;
  }

  return (
    <div style={S.app}>
      {/* ── HEADER ── */}
      <div style={S.header}>

        {/* Left: hamburger (mobile only) + logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!isDesktop && (
            <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
              <Icon name="menu" size={22} color={C.cream} />
            </button>
          )}
          {/* Logo SVG — leaf + circle mark */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" fill={C.creamFaint} stroke={C.border} strokeWidth="1"/>
            {/* Leaf shape */}
            <path d="M14 6 Q20 10 20 16 Q20 21 14 22 Q8 21 8 16 Q8 10 14 6Z"
              fill="none" stroke={C.sage} strokeWidth="1.4" strokeLinejoin="round"/>
            {/* Vein */}
            <line x1="14" y1="6" x2="14" y2="22" stroke={C.sage} strokeWidth="0.9" strokeLinecap="round"/>
            <line x1="14" y1="13" x2="18" y2="11" stroke={C.sage} strokeWidth="0.7" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="18" y2="14" stroke={C.sage} strokeWidth="0.7" strokeLinecap="round"/>
            <line x1="14" y1="13" x2="10" y2="11" stroke={C.sage} strokeWidth="0.7" strokeLinecap="round"/>
            <line x1="14" y1="16" x2="10" y2="14" stroke={C.sage} strokeWidth="0.7" strokeLinecap="round"/>
          </svg>

          {/* Wordmark */}
          <div>
            <span style={{ fontSize: 15, fontWeight: 800, color: C.cream, letterSpacing: "-0.4px" }}>
              lipedema
            </span>
            <span style={{ fontSize: 15, fontWeight: 300, color: C.sageLight, letterSpacing: "-0.2px" }}>
              {" "}tracker
            </span>
            <span style={{ fontSize: 9, color: C.creamMuted, marginLeft: 4, verticalAlign: "middle" }}>v2.4</span>
          </div>
        </div>

        {/* Right: lang toggle + avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 2, background: C.creamFaint, borderRadius: 8, padding: 2 }}>
            <button style={{ padding: "3px 9px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, background: lang === "es" ? C.bgCard : "transparent", color: lang === "es" ? C.sageLight : C.creamMuted, transition: "all 0.2s" }} onClick={() => switchLang("es")}>ES</button>
            <button style={{ padding: "3px 9px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, background: lang === "en" ? C.bgCard : "transparent", color: lang === "en" ? C.sageLight : C.creamMuted, transition: "all 0.2s" }} onClick={() => switchLang("en")}>EN</button>
          </div>

          {/* Avatar + dropdown */}
          <div style={{ position:"relative" }}>
            <div
              onClick={() => setAvatarMenu(m => !m)}
              title={profile.name || (lang === "es" ? "Mi perfil" : "My profile")}
              style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg, ${C.sage}, ${C.sageDark})`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, border:`2px solid ${avatarMenu ? C.sage : C.creamFaint}`, transition:"border 0.15s" }}
            >
              <span style={{ fontSize:13, fontWeight:800, color:"#fff", lineHeight:1 }}>
                {profile.name ? profile.name.trim()[0].toUpperCase() : "?"}
              </span>
            </div>

            {/* Dropdown */}
            {avatarMenu && (
              <>
                {/* Backdrop — click outside to close */}
                <div onClick={() => setAvatarMenu(false)} style={{ position:"fixed", inset:0, zIndex:299 }} />
                <div style={{ position:"absolute", top:40, right:0, zIndex:300, background:"white", borderRadius:14, border:`1px solid ${C.border}`, boxShadow:"0 8px 32px rgba(74,110,87,0.15)", minWidth:200, overflow:"hidden" }}>
                  {/* User info */}
                  <div style={{ padding:"14px 16px 10px", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg, ${C.sage}, ${C.sageDark})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontSize:15, fontWeight:800, color:"#fff" }}>{profile.name ? profile.name.trim()[0].toUpperCase() : "?"}</span>
                      </div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:800, color:C.cream }}>{profile.name || (lang==="es"?"Sin nombre":"No name")}</div>
                        <div style={{ fontSize:11, color:C.creamMuted }}>{lang==="es" ? `Estadio ${profile.stage === "unknown" ? "—" : profile.stage}` : `Stage ${profile.stage === "unknown" ? "—" : profile.stage}`}</div>
                      </div>
                    </div>
                  </div>
                  {/* Menu items */}
                  <div style={{ padding:"6px 0" }}>
                    <button onClick={() => { setTab("profile"); setAvatarMenu(false); }}
                      style={{ width:"100%", padding:"10px 16px", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:10, fontSize:13, color:C.cream, fontWeight:600, textAlign:"left" }}>
                      <Icon name="user" size={16} color={C.creamMuted} />
                      {lang==="es" ? "Mi perfil" : "My profile"}
                    </button>
                    <button onClick={() => { setTab("home"); setAvatarMenu(false); }}
                      style={{ width:"100%", padding:"10px 16px", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:10, fontSize:13, color:C.cream, fontWeight:600, textAlign:"left" }}>
                      <Icon name="home" size={16} color={C.creamMuted} />
                      {lang==="es" ? "Inicio" : "Home"}
                    </button>
                    <div style={{ margin:"4px 12px", borderTop:`1px solid ${C.border}` }} />
                    <button onClick={handleLogout}
                      style={{ width:"100%", padding:"10px 16px", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#c06080", fontWeight:700, textAlign:"left" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c06080" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      {lang==="es" ? "Cerrar sesión" : "Log out"}
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
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 12px 16px", borderBottom: `1px solid ${C.border}`, marginBottom: 8, cursor: "pointer" }} onClick={() => setTab("home")}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" fill={C.creamFaint} stroke={C.border} strokeWidth="1"/>
              <path d="M14 6 Q20 10 20 16 Q20 21 14 22 Q8 21 8 16 Q8 10 14 6Z" fill="none" stroke={C.sage} strokeWidth="1.4" strokeLinejoin="round"/>
              <line x1="14" y1="6" x2="14" y2="22" stroke={C.sage} strokeWidth="0.9" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.creamMuted, cursor: "pointer" }} onClick={() => setTab("home")}>{lang === "es" ? "Inicio" : "Home"}</span>
          </div>
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <div style={S.sbSection}>{group.label}</div>
              {group.keys.map((key) => {
                const item = NAV_ITEMS.find(n => n.key === key);
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 16px 12px", borderBottom: `1px solid ${C.border}` }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: C.cream }}>lipedema <span style={{ fontWeight: 300, color: C.creamMuted }}>tracker</span></div>
                {profile.name && <div style={{ fontSize: 12, color: C.creamMuted, marginTop: 2 }}>{profile.name}</div>}
              </div>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.creamMuted, padding: 4 }}>
                <Icon name="x" size={18} color={C.creamMuted} />
              </button>
            </div>
            <div style={{ padding: "8px 10px 24px", display: "flex", flexDirection: "column", gap: 2 }}>
              {NAV_GROUPS.map((group) => (
                <div key={group.label}>
                  <div style={S.sbSection}>{group.label}</div>
                  {group.keys.map((key) => {
                    const item = NAV_ITEMS.find(n => n.key === key);
                    if (!item) return null;
                    const active = tab === key;
                    return (
                      <button key={key} style={S.sbItem(active)} onClick={() => { setTab(key); setSidebarOpen(false); }}>
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

        {/* ══ HOME DASHBOARD ══ */}
        {tab === "home" && (() => {
          // ── derived data ──
          const last7 = logs.slice(-7);
          const lastLog = logs[logs.length - 1];
          const avgPain   = last7.length ? (last7.reduce((s,l) => s + l.pain, 0) / last7.length).toFixed(1) : null;
          const avgEnergy = last7.length ? (last7.reduce((s,l) => s + l.energy, 0) / last7.length).toFixed(1) : null;
          const lastWeight = logs.slice().reverse().find(l => l.weight)?.weight || null;

          // cycle summary
          const today = new Date().toISOString().slice(0,10);
          const [cy, cm] = today.slice(0,7).split("-").map(Number);
          const periodThisMonth = Object.entries(cycleData)
            .filter(([k,v]) => k.startsWith(`${cy}-${String(cm).padStart(2,"0")}`) && v === "period")
            .map(([k]) => k).sort();
          const spmThisMonth = Object.entries(cycleData)
            .filter(([k,v]) => k.startsWith(`${cy}-${String(cm).padStart(2,"0")}`) && v === "spm").length;
          const retentionThisMonth = Object.entries(cycleData)
            .filter(([k,v]) => k.startsWith(`${cy}-${String(cm).padStart(2,"0")}`) && v === "retention").length;

          // last period start across all data
          const allPeriodDays = Object.entries(cycleData).filter(([,v]) => v==="period").map(([k])=>k).sort();
          let lastPeriodStart = null;
          for (let i = 0; i < allPeriodDays.length; i++) {
            const prev = i > 0 ? new Date(allPeriodDays[i-1]) : null;
            if (!prev || (new Date(allPeriodDays[i]) - prev) > 86400000*2) lastPeriodStart = allPeriodDays[i];
          }

          // supplements
          const recentSupps = activeSupps.slice(0, 4);

          // motivational phrases
          const phrases_es = [
            "Tu cuerpo merece cuidado, no castigo. Pequeños pasos cuentan.",
            "Registrar es un acto de amor propio. Lo estás haciendo genial.",
            "El lipedema no te define — tu constancia sí.",
            "Cada dato que guardas es un paso más hacia entenderte mejor.",
            "Hoy es un buen día para cuidarte un poco más.",
            "La inflamación fluctúa, tu fuerza no.",
            "Conocer tu cuerpo es el primer paso para aliviarlo.",
          ];
          const phrases_en = [
            "Your body deserves care, not punishment. Small steps count.",
            "Tracking is an act of self-love. You're doing great.",
            "Lipedema doesn't define you — your consistency does.",
            "Every data point is a step toward understanding yourself better.",
            "Today is a great day to take care of yourself a little more.",
            "Inflammation fluctuates, your strength does not.",
            "Knowing your body is the first step to easing it.",
          ];
          const dayIdx = new Date().getDay();
          const phrase = lang === "es" ? phrases_es[dayIdx] : phrases_en[dayIdx];

          // anti-inflammatory recipes
          const recipes = lang === "es" ? [
            {
              name: "Batido antiinflamatorio de cúrcuma",
              time: "5 min", difficulty: "Fácil",
              ingredients: ["1 taza leche vegetal","1 cdta cúrcuma","½ cdta jengibre rallado","1 cdta miel cruda","pizca de pimienta negra"],
              steps: ["Calienta la leche vegetal sin que llegue a hervir.","Añade la cúrcuma, el jengibre y la pimienta negra. Remueve bien.","Endulza con miel y sirve inmediatamente."],
              nutrition: { kcal:120, protein:"2g", carbs:"18g", fat:"4g" },
              tip: "La pimienta negra aumenta la absorción de curcumina hasta un 2000%.",
            },
            {
              name: "Ensalada de salmón y aguacate",
              time: "10 min", difficulty: "Fácil",
              ingredients: ["150g salmón ahumado","1 aguacate maduro","2 puñados espinacas","½ limón","2 cdas AOVE","1 cdta semillas de chía"],
              steps: ["Lava y seca las espinacas, colócalas en un bol.","Corta el aguacate en láminas y el salmón en tiras.","Dispón sobre las espinacas. Aliña con zumo de limón y AOVE.","Espolvorea las semillas de chía por encima."],
              nutrition: { kcal:380, protein:"28g", carbs:"8g", fat:"28g" },
              tip: "Omega-3 del salmón + grasas saludables del aguacate = potente sinergia antiinflamatoria.",
            },
            {
              name: "Sopa de miso con algas",
              time: "15 min", difficulty: "Fácil",
              ingredients: ["2 cdas miso blanco","10g alga wakame seca","150g tofu firme","2 cebollinos","1L agua caliente"],
              steps: ["Hidrata el alga wakame en agua fría 5 minutos. Escurre.","Calienta el agua sin hervir. Disuelve el miso removiendo (no hiervas el miso — destruye los probióticos).","Añade el tofu cortado en cubos y el alga hidratada.","Sirve con cebollino picado por encima."],
              nutrition: { kcal:95, protein:"9g", carbs:"7g", fat:"3g" },
              tip: "Los probióticos del miso apoyan la microbiota intestinal, clave en la modulación inflamatoria.",
            },
            {
              name: "Smoothie de frutos rojos y espinacas",
              time: "5 min", difficulty: "Fácil",
              ingredients: ["1 taza arándanos","½ taza fresas","1 puñado espinacas baby","200ml leche de avena","1 cdta semillas de chía"],
              steps: ["Congela los frutos rojos la noche anterior para textura más cremosa.","Pon todos los ingredientes en la batidora.","Tritura a máxima potencia 60 segundos.","Sirve inmediatamente."],
              nutrition: { kcal:165, protein:"4g", carbs:"30g", fat:"3g" },
              tip: "Los antioxidantes de los arándanos (antocianinas) reducen el estrés oxidativo asociado al lipedema.",
            },
            {
              name: "Té de jengibre y limón",
              time: "5 min", difficulty: "Fácil",
              ingredients: ["2cm raíz de jengibre fresco","½ limón (zumo)","1 cdta miel cruda","500ml agua caliente (no hirviendo)"],
              steps: ["Pela y ralla o lamina el jengibre fresco.","Infusiona en agua a 80–85°C durante 4 minutos.","Cuela, añade el zumo de limón y la miel.","Bebe caliente o deja enfriar para tomar frío."],
              nutrition: { kcal:25, protein:"0g", carbs:"6g", fat:"0g" },
              tip: "El gingerol del jengibre inhibe las ciclooxigenasas (COX), las mismas enzimas que bloquea el ibuprofeno.",
            },
            {
              name: "Bowl de quinoa con verduras asadas",
              time: "25 min", difficulty: "Media",
              ingredients: ["½ taza quinoa","1 calabacín","1 pimiento rojo","½ cebolla morada","2 cdas AOVE","romero y tomillo al gusto"],
              steps: ["Precalienta el horno a 200°C.","Corta las verduras en dados, aliña con AOVE, romero y tomillo. Hornea 20 minutos.","Mientras, cuece la quinoa en el doble de agua con sal (12 min).","Monta el bowl: quinoa de base, verduras asadas encima. Añade un chorrito de limón."],
              nutrition: { kcal:310, protein:"10g", carbs:"42g", fat:"12g" },
              tip: "La quinoa es proteína completa sin gluten; su perfil de aminoácidos favorece la reparación del tejido conectivo.",
            },
            {
              name: "Crema de brócoli y almendras",
              time: "20 min", difficulty: "Media",
              ingredients: ["2 tazas brócoli","½ taza almendras crudas","2 dientes de ajo","750ml caldo vegetal bajo en sodio","nuez moscada al gusto"],
              steps: ["Cuece el brócoli al vapor 8 minutos (no más, para conservar el sulforafano).","Sofríe el ajo laminado en un poco de AOVE 1 minuto.","Tritura el brócoli, el ajo, las almendras y el caldo hasta textura suave.","Calienta suavemente, sirve con nuez moscada rallada."],
              nutrition: { kcal:220, protein:"9g", carbs:"16g", fat:"14g" },
              tip: "El sulforafano del brócoli (mayor concentración si no se supera 70°C al cocinar) activa el factor Nrf2, regulador maestro de la respuesta antioxidante.",
            },
          ] : [
            {
              name: "Anti-inflammatory turmeric smoothie",
              time: "5 min", difficulty: "Easy",
              ingredients: ["1 cup plant milk","1 tsp turmeric","½ tsp fresh grated ginger","1 tsp raw honey","pinch black pepper"],
              steps: ["Warm the plant milk without boiling.","Add turmeric, ginger and black pepper. Stir well.","Sweeten with honey and serve immediately."],
              nutrition: { kcal:120, protein:"2g", carbs:"18g", fat:"4g" },
              tip: "Black pepper increases curcumin absorption by up to 2000% through piperine.",
            },
            {
              name: "Salmon & avocado salad",
              time: "10 min", difficulty: "Easy",
              ingredients: ["150g smoked salmon","1 ripe avocado","2 handfuls spinach","½ lemon","2 tbsp olive oil","1 tsp chia seeds"],
              steps: ["Wash and dry the spinach, place in a bowl.","Slice the avocado and cut salmon into strips.","Arrange over the spinach. Dress with lemon juice and olive oil.","Sprinkle chia seeds on top."],
              nutrition: { kcal:380, protein:"28g", carbs:"8g", fat:"28g" },
              tip: "Salmon omega-3 + avocado healthy fats create a powerful anti-inflammatory synergy.",
            },
            {
              name: "Miso soup with seaweed",
              time: "15 min", difficulty: "Easy",
              ingredients: ["2 tbsp white miso","10g dried wakame seaweed","150g firm tofu","2 spring onions","1L hot water"],
              steps: ["Rehydrate wakame in cold water for 5 minutes. Drain.","Heat water to just below boiling. Dissolve miso by stirring (do not boil — destroys probiotics).","Add tofu cut into cubes and the rehydrated seaweed.","Serve with sliced spring onions on top."],
              nutrition: { kcal:95, protein:"9g", carbs:"7g", fat:"3g" },
              tip: "Miso probiotics support the gut microbiome, a key regulator of the inflammatory response.",
            },
            {
              name: "Red berry & spinach smoothie",
              time: "5 min", difficulty: "Easy",
              ingredients: ["1 cup blueberries","½ cup strawberries","1 handful baby spinach","200ml oat milk","1 tsp chia seeds"],
              steps: ["Freeze the berries the night before for creamier texture.","Put all ingredients in the blender.","Blend at full speed for 60 seconds.","Serve immediately."],
              nutrition: { kcal:165, protein:"4g", carbs:"30g", fat:"3g" },
              tip: "Blueberry anthocyanins reduce the oxidative stress associated with lipedema tissue.",
            },
            {
              name: "Ginger & lemon tea",
              time: "5 min", difficulty: "Easy",
              ingredients: ["2cm fresh ginger root","½ lemon (juice)","1 tsp raw honey","500ml hot water (not boiling)"],
              steps: ["Peel and grate or slice the fresh ginger.","Steep in water at 80–85°C for 4 minutes.","Strain, add lemon juice and honey.","Drink warm or leave to cool and serve cold."],
              nutrition: { kcal:25, protein:"0g", carbs:"6g", fat:"0g" },
              tip: "Gingerol inhibits cyclooxygenases (COX) — the same enzymes blocked by ibuprofen.",
            },
            {
              name: "Quinoa bowl with roasted vegetables",
              time: "25 min", difficulty: "Medium",
              ingredients: ["½ cup quinoa","1 courgette","1 red pepper","½ red onion","2 tbsp olive oil","rosemary and thyme to taste"],
              steps: ["Preheat oven to 200°C / 400°F.","Dice the vegetables, toss with olive oil, rosemary and thyme. Roast 20 minutes.","Meanwhile, cook quinoa in double the water with a pinch of salt (12 min).","Build the bowl: quinoa base, roasted vegetables on top. Finish with a squeeze of lemon."],
              nutrition: { kcal:310, protein:"10g", carbs:"42g", fat:"12g" },
              tip: "Quinoa is a gluten-free complete protein; its amino acid profile supports connective tissue repair.",
            },
            {
              name: "Broccoli & almond cream soup",
              time: "20 min", difficulty: "Medium",
              ingredients: ["2 cups broccoli","½ cup raw almonds","2 garlic cloves","750ml low-sodium vegetable stock","nutmeg to taste"],
              steps: ["Steam broccoli for 8 minutes (not more, to preserve sulforaphane).","Sauté sliced garlic in a little olive oil for 1 minute.","Blend broccoli, garlic, almonds and stock until smooth.","Gently reheat and serve with freshly grated nutmeg."],
              nutrition: { kcal:220, protein:"9g", carbs:"16g", fat:"14g" },
              tip: "Broccoli sulforaphane (highest when not cooked above 70°C) activates Nrf2, the master antioxidant regulator.",
            },
          ];
          const recipe = recipes[new Date().getDate() % recipes.length];

          const statCard = (label, value, unit, color, icon) => (
            <div style={{ flex:1, background:C.bgCard, borderRadius:12, padding:"14px 16px", border:`1px solid ${C.border}`, boxShadow:"0 1px 4px rgba(74,110,87,0.06)" }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:6 }}>{label}</div>
              <div style={{ fontSize:22, fontWeight:800, color: color || C.cream, letterSpacing:"-0.5px" }}>
                {value ?? <span style={{ fontSize:14, color:C.creamMuted, fontWeight:500 }}>{lang==="es"?"Sin datos":"No data"}</span>}
                {value && <span style={{ fontSize:12, fontWeight:500, color:C.creamMuted, marginLeft:3 }}>{unit}</span>}
              </div>
            </div>
          );

          return (
            <>
              {/* Greeting */}
              <div style={{ marginBottom:20 }}>
                <h2 style={{ fontSize:20, fontWeight:800, color:C.cream, letterSpacing:"-0.5px", marginBottom:2 }}>
                  {lang==="es" ? `Hola${profile.name ? `, ${profile.name}` : ""}` : `Hello${profile.name ? `, ${profile.name}` : ""}`} 👋
                </h2>
                <div style={{ fontSize:13, color:C.creamMuted }}>
                  {new Date().toLocaleDateString(lang==="es"?"es-ES":"en-GB", { weekday:"long", day:"numeric", month:"long" })}
                </div>
              </div>

              {/* 1. SALUD RECIENTE */}
              <div style={{ marginBottom:6 }}>
                <div style={{ fontSize:11, fontWeight:800, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span>{lang==="es" ? "Salud — últimos 7 días" : "Health — last 7 days"}</span>
                  <button onClick={() => setTab("today")} style={{ background:"none", border:"none", fontSize:11, color:C.sage, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    {lang==="es" ? "Registrar hoy →" : "Log today →"}
                  </button>
                </div>
                <div style={{ display:"flex", gap:8, marginBottom:8 }}>
                  {statCard(lang==="es"?"Dolor medio":"Avg pain", avgPain, "/6", avgPain >= 4 ? "#c06080" : avgPain >= 2 ? C.accent : C.sage)}
                  {statCard(lang==="es"?"Energía media":"Avg energy", avgEnergy, "/6", avgEnergy >= 4 ? C.sage : avgEnergy >= 2 ? C.accent : "#c06080")}
                  {statCard(lang==="es"?"Último peso":"Last weight", lastWeight, "kg", C.cream)}
                </div>
                {last7.length === 0 && (
                  <div style={{ background:C.creamFaint, borderRadius:10, padding:"12px 14px", border:`1px solid ${C.border}`, fontSize:12, color:C.creamMuted, textAlign:"center" }}>
                    {lang==="es" ? "Aún no hay registros. ¡Empieza hoy!" : "No entries yet. Start today!"}
                  </div>
                )}
                {last7.length > 0 && (
                  <div style={{ display:"flex", gap:4 }}>
                    {last7.map((l,i) => {
                      const painH = Math.round((l.pain/6)*100);
                      const energyH = Math.round((l.energy/6)*100);
                      return (
                        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", gap:2, alignItems:"center" }}>
                          <div style={{ width:"100%", height:48, background:C.creamFaint, borderRadius:4, display:"flex", flexDirection:"column", justifyContent:"flex-end", overflow:"hidden", position:"relative" }}>
                            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:`${painH}%`, background:"#f5d0dc", borderRadius:4 }}/>
                            <div style={{ position:"absolute", bottom:0, left:"30%", right:"30%", height:`${energyH}%`, background:`${C.sage}60`, borderRadius:4 }}/>
                          </div>
                          <div style={{ fontSize:9, color:C.creamMuted }}>{l.date.slice(8)}</div>
                        </div>
                      );
                    })}
                    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:4, paddingLeft:6 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:4 }}><div style={{ width:8, height:8, borderRadius:2, background:"#f5d0dc" }}/><span style={{ fontSize:9, color:C.creamMuted }}>{lang==="es"?"Dolor":"Pain"}</span></div>
                      <div style={{ display:"flex", alignItems:"center", gap:4 }}><div style={{ width:8, height:8, borderRadius:2, background:`${C.sage}60` }}/><span style={{ fontSize:9, color:C.creamMuted }}>{lang==="es"?"Energía":"Energy"}</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. CICLO */}
              <div style={{ background:C.bgCard, borderRadius:14, padding:"16px 18px", marginBottom:8, border:`1px solid ${C.border}`, boxShadow:"0 1px 4px rgba(74,110,87,0.06)" }}>
                <div style={{ fontSize:11, fontWeight:800, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:10, display:"flex", justifyContent:"space-between" }}>
                  <span>{lang==="es" ? "Ciclo menstrual" : "Menstrual cycle"}</span>
                  <button onClick={() => setTab("today")} style={{ background:"none", border:"none", fontSize:11, color:C.sage, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    {lang==="es" ? "Ver calendario →" : "View calendar →"}
                  </button>
                </div>
                {allPeriodDays.length === 0 ? (
                  <div style={{ fontSize:12, color:C.creamMuted, fontStyle:"italic" }}>
                    {lang==="es" ? "Aún no has marcado ningún día de período." : "You haven't marked any period days yet."}
                  </div>
                ) : (
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                    {lastPeriodStart && (
                      <div>
                        <div style={{ fontSize:10, color:C.creamMuted }}>{lang==="es"?"Último inicio":"Last start"}</div>
                        <div style={{ fontSize:15, fontWeight:800, color:"#c06080" }}>{lastPeriodStart.slice(8)}/{lastPeriodStart.slice(5,7)}</div>
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize:10, color:C.creamMuted }}>{lang==="es"?"Días regla este mes":"Period days this month"}</div>
                      <div style={{ fontSize:15, fontWeight:800, color:"#c06080" }}>{periodThisMonth.length}</div>
                    </div>
                    {spmThisMonth > 0 && (
                      <div>
                        <div style={{ fontSize:10, color:C.creamMuted }}>{lang==="es"?"Días SPM":"PMS days"}</div>
                        <div style={{ fontSize:15, fontWeight:800, color:C.accent }}>{spmThisMonth}</div>
                      </div>
                    )}
                    {retentionThisMonth > 0 && (
                      <div>
                        <div style={{ fontSize:10, color:C.creamMuted }}>{lang==="es"?"Días retención":"Retention days"}</div>
                        <div style={{ fontSize:15, fontWeight:800, color:"#5080a0" }}>{retentionThisMonth}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 3. SUPLEMENTOS */}
              <div style={{ background:C.bgCard, borderRadius:14, padding:"16px 18px", marginBottom:8, border:`1px solid ${C.border}`, boxShadow:"0 1px 4px rgba(74,110,87,0.06)" }}>
                <div style={{ fontSize:11, fontWeight:800, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:10, display:"flex", justifyContent:"space-between" }}>
                  <span>{lang==="es" ? "Mis suplementos activos" : "My active supplements"}</span>
                  <button onClick={() => setTab("supps")} style={{ background:"none", border:"none", fontSize:11, color:C.sage, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    {lang==="es" ? "Gestionar →" : "Manage →"}
                  </button>
                </div>
                {recentSupps.length === 0 ? (
                  <div style={{ fontSize:12, color:C.creamMuted, fontStyle:"italic" }}>
                    {lang==="es" ? "No tienes suplementos activos aún." : "No active supplements yet."}
                  </div>
                ) : (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {recentSupps.map(a => {
                      const def = allSuppsList.find(s => s.key === a.key);
                      if (!def) return null;
                      const takenToday = (lastLog?.suppsTaken || []).includes(a.key);
                      return (
                        <div key={a.key} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 10px", borderRadius:20, border:`1.5px solid ${takenToday ? C.sage : C.border}`, background: takenToday ? C.creamFaint : "white" }}>
                          <span style={{ fontSize:14 }}>{def.icon}</span>
                          <span style={{ fontSize:11, fontWeight:600, color: takenToday ? C.sage : C.creamMuted }}>{lang==="es" ? def.es : def.en}</span>
                          {takenToday && <span style={{ fontSize:10, color:C.sage }}>✓</span>}
                        </div>
                      );
                    })}
                    {activeSupps.length > 4 && (
                      <div style={{ padding:"6px 10px", borderRadius:20, border:`1px solid ${C.border}`, fontSize:11, color:C.creamMuted }}>
                        +{activeSupps.length - 4} {lang==="es"?"más":"more"}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 4. FRASE MOTIVACIONAL */}
              <div style={{ background:`linear-gradient(135deg, ${C.creamFaint}, white)`, borderRadius:14, padding:"16px 18px", marginBottom:8, border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:10, fontWeight:800, color:C.sage, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:8 }}>
                  {lang==="es" ? "✨ Reflexión del día" : "✨ Daily reflection"}
                </div>
                <p style={{ fontSize:14, color:C.cream, lineHeight:1.6, fontStyle:"italic", margin:0, fontWeight:500 }}>
                  "{phrase}"
                </p>
              </div>

              {/* 5. RECETA DEL DÍA */}
              {(() => {
                const [recipeOpen, setRecipeOpen] = [tab === "home" ? recipeExpanded : false, setRecipeExpanded];
                const diffColor = recipe.difficulty === "Fácil" || recipe.difficulty === "Easy" ? C.sage : C.accent;
                return (
                  <div style={{ background:C.bgCard, borderRadius:14, marginBottom:8, border:`1px solid ${C.border}`, boxShadow:"0 1px 4px rgba(74,110,87,0.06)", overflow:"hidden" }}>
                    {/* Header — always visible, clickable */}
                    <div onClick={() => setRecipeExpanded(o => !o)}
                      style={{ padding:"16px 18px", cursor:"pointer", userSelect:"none" }}>
                      <div style={{ fontSize:10, fontWeight:800, color:C.sage, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:8 }}>
                        {lang==="es" ? "🥗 Receta antiinflamatoria del día" : "🥗 Anti-inflammatory recipe of the day"}
                      </div>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:10 }}>
                        <div style={{ fontSize:14, fontWeight:800, color:C.cream, letterSpacing:"-0.3px", flex:1 }}>{recipe.name}</div>
                        <div style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"flex-end", flexShrink:0 }}>
                          <div style={{ fontSize:11, fontWeight:700, color:C.creamMuted, background:C.creamFaint, padding:"3px 8px", borderRadius:20 }}>⏱ {recipe.time}</div>
                          <div style={{ fontSize:10, fontWeight:700, color:diffColor, background:`${diffColor}15`, padding:"2px 7px", borderRadius:20 }}>
                            {recipe.difficulty}
                          </div>
                        </div>
                      </div>
                      {/* Nutrition row */}
                      <div style={{ display:"flex", gap:10, marginBottom:10 }}>
                        {Object.entries(recipe.nutrition).map(([k,v]) => (
                          <div key={k} style={{ textAlign:"center" }}>
                            <div style={{ fontSize:12, fontWeight:800, color:C.cream }}>{v}</div>
                            <div style={{ fontSize:9, color:C.creamMuted, textTransform:"uppercase" }}>{k === "kcal" ? "kcal" : k === "protein" ? (lang==="es"?"prot":"prot") : k === "carbs" ? (lang==="es"?"hidr":"carbs") : "grasas"}</div>
                          </div>
                        ))}
                      </div>
                      {/* Ingredients */}
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                        {recipe.ingredients.map((ing,i) => (
                          <span key={i} style={{ fontSize:11, background:C.creamFaint, border:`1px solid ${C.border}`, borderRadius:20, padding:"3px 9px", color:C.cream }}>
                            {ing}
                          </span>
                        ))}
                      </div>
                      {/* Expand hint */}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginTop:10, fontSize:11, color:C.creamMuted }}>
                        <span>{recipeOpen ? (lang==="es"?"Ocultar preparación":"Hide preparation") : (lang==="es"?"Ver preparación paso a paso":"View step-by-step")}</span>
                        <span style={{ transition:"transform 0.2s", display:"inline-block", transform: recipeOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                      </div>
                    </div>

                    {/* Expandable: steps + tip */}
                    {recipeOpen && (
                      <div style={{ borderTop:`1px solid ${C.border}`, padding:"16px 18px", background:C.bg }}>
                        <div style={{ fontSize:11, fontWeight:800, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:10 }}>
                          {lang==="es" ? "Preparación" : "Preparation"}
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
                          {recipe.steps.map((step,i) => (
                            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                              <div style={{ width:22, height:22, borderRadius:"50%", background:C.sage, color:"white", fontSize:11, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                {i+1}
                              </div>
                              <div style={{ fontSize:13, color:C.cream, lineHeight:1.6, paddingTop:2 }}>{step}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ fontSize:11, color:C.sage, lineHeight:1.6, padding:"10px 12px", background:`${C.sage}0d`, borderRadius:8, borderLeft:`3px solid ${C.sage}` }}>
                          💡 {recipe.tip}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* 6. ACCESOS RÁPIDOS */}
              <div style={{ marginTop:4 }}>
                <div style={{ fontSize:11, fontWeight:800, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:10 }}>
                  {lang==="es" ? "Accesos rápidos" : "Quick links"}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {[
                    { key:"today",   label: lang==="es"?"Registro de hoy":"Log today",    emoji:"📅" },
                    { key:"history", label: lang==="es"?"Historial":"History",             emoji:"📋" },
                    { key:"charts",  label: lang==="es"?"Gráficas":"Charts",               emoji:"📊" },
                    { key:"foods",   label: lang==="es"?"Alimentos":"Foods",               emoji:"🍽️" },
                  ].map(q => (
                    <button key={q.key} onClick={() => setTab(q.key)}
                      style={{ padding:"12px 14px", borderRadius:12, border:`1px solid ${C.border}`, background:"white", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:10, textAlign:"left", transition:"all 0.15s" }}>
                      <span style={{ fontSize:20 }}>{q.emoji}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:C.cream }}>{q.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          );
        })()}

        {/* ── TODAY ── */}
        {tab === "today" && (
          <>
            <div style={S.card}>
              <div style={S.cardTitle}>{t.today.title}</div>
              <div style={S.row}>
                <div style={S.col}>
                  <label style={S.label}>{t.today.date}</label>
                  <input style={S.input} type="date" value={entry.date} onChange={(e) => updateEntry("date", e.target.value)} />
                </div>
                <div style={S.col}>
                  <label style={S.label}>{t.today.weight}</label>
                  <input style={S.input} type="number" step="0.1" placeholder="65.5" value={entry.weight} onChange={(e) => updateEntry("weight", e.target.value)} />
                </div>
              </div>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>{t.today.mood}</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {t.moodOptions.map((m, i) => (
                  <span key={i} onClick={() => updateEntry("mood", i)} style={{ fontSize: 28, cursor: "pointer", opacity: entry.mood === i ? 1 : 0.3, transform: entry.mood === i ? "scale(1.3)" : "scale(1)", transition: "all 0.2s" }}>{m}</span>
                ))}
              </div>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>{t.today.energy}</div>
              <SliderInput value={entry.energy} onChange={(v) => updateEntry("energy", v)} labels={t.energyLabels} color="#6366f1" />
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>{t.today.pain}</div>
              <SliderInput value={entry.pain} onChange={(v) => updateEntry("pain", v)} labels={t.painLabels} color="#ef4444" />
            </div>

            {/* Inflammation */}
            <div style={S.card}>
              <div style={S.cardTitle}>{t.today.inflammation}</div>
              {activeZones.length === 0 && (
                <p style={{ color: C.creamMuted, fontSize: 13 }}>{lang === "es" ? "Configura tus zonas en el Perfil" : "Set up your zones in Profile"}</p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {activeZones.map((z) => (
                  <ZoneCard key={z} zone={z} zoneName={t.today.zoneNames[z] || z}
                    value={entry.inflammationZones?.[z] || 0}
                    onChange={(v) => updateEntry("inflammationZones", { ...entry.inflammationZones, [z]: v })}
                  />
                ))}
              </div>
              <div style={{ marginTop: 14 }}>
                <label style={S.label}>{t.today.inflammationNote}</label>
                <textarea style={S.textarea} placeholder={t.today.inflammationNotePlaceholder}
                  value={entry.inflammationNote} onChange={(e) => updateEntry("inflammationNote", e.target.value)} />
              </div>
            </div>

            {/* Measures */}
            {activeZones.length > 0 && (
              <div style={S.card}>
                <div style={S.cardTitle}>{t.today.measures}</div>
                <div style={S.grid2}>
                  {activeZones.map((z) => (
                    <div key={z}>
                      <label style={S.label}>{t.today.zoneNames[z] || z}</label>
                      <input style={S.input} type="number" step="0.5" placeholder="cm"
                        value={entry.measures?.[z] || ""}
                        onChange={(e) => updateEntry("measures", { ...entry.measures, [z]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily supps check */}
            {activeSupps.length > 0 && (
              <div style={S.card}>
                <div style={S.cardTitle}>{t.today.todaysSupps}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {activeSupps.map((a) => {
                    const def = allSuppsList.find((s) => s.key === a.key);
                    if (!def) return null;
                    const name = lang === "es" ? def.es : def.en;
                    const taken = (entry.suppsTaken || []).includes(a.key);
                    return (
                      <div key={a.key} onClick={() => {
                        const curr = entry.suppsTaken || [];
                        updateEntry("suppsTaken", taken ? curr.filter((k) => k !== a.key) : [...curr, a.key]);
                      }}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, border: `1.5px solid ${taken ? C.sage : C.border}`, background: taken ? C.sage : C.bgInput, cursor: "pointer", transition: "all 0.2s" }}>
                        <span style={{ fontSize: 16 }}>{def.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: taken ? "#fff" : C.cream }}>{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}


            {/* ── CICLO MENSTRUAL ── */}
            <div style={S.card}>
              {/* Header */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.sage} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18"/></svg>
                  <span style={{ fontSize:14, fontWeight:800, color:C.cream, letterSpacing:"-0.3px" }}>
                    {lang === "es" ? "Ciclo menstrual" : "Menstrual cycle"}
                  </span>
                </div>
                <div style={{ display:"flex", gap:4 }}>
                  <button onClick={() => setCycleMonth(m => { const [y,mo] = m.split("-").map(Number); const d = new Date(y, mo-2, 1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; })}
                    style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:6, width:26, height:26, cursor:"pointer", color:C.creamMuted, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"inherit" }}>&#8249;</button>
                  <button onClick={() => setCycleMonth(m => { const [y,mo] = m.split("-").map(Number); const d = new Date(y, mo, 1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; })}
                    style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:6, width:26, height:26, cursor:"pointer", color:C.creamMuted, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"inherit" }}>&#8250;</button>
                </div>
              </div>

              {/* Step 1: type selector */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.creamMuted, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.5px" }}>
                  {lang==="es" ? "1. Elige qué quieres marcar" : "1. Choose what to mark"}
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  {[
                    { key:"period",    color:"#c06080", bg:"#f5d0dc", label: lang==="es" ? "Menstruación" : "Period",   emoji:"🩸" },
                    { key:"spm",       color:"#8a6c3a", bg:"#f5ecd5", label: "SPM / PMS",                               emoji:"🟡" },
                    { key:"retention", color:"#5080a0", bg:"#d0e4f0", label: lang==="es" ? "Retención" : "Retention",   emoji:"💧" },
                  ].map(t => (
                    <button key={t.key}
                      onClick={() => setCycleActiveType(prev => prev === t.key ? null : t.key)}
                      style={{
                        flex:1, padding:"8px 4px", borderRadius:10,
                        border:`2px solid ${cycleActiveType === t.key ? t.color : C.border}`,
                        background: cycleActiveType === t.key ? t.bg : "white",
                        fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                        color: cycleActiveType === t.key ? t.color : C.creamMuted,
                        transition:"all 0.15s", display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                      }}>
                      <span style={{ fontSize:16 }}>{t.emoji}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop:8, fontSize:11, borderRadius:8, padding:"6px 10px",
                  background: cycleActiveType ? C.creamFaint : "transparent",
                  color: cycleActiveType ? C.sage : C.creamMuted,
                  fontStyle: cycleActiveType ? "normal" : "italic",
                  border: cycleActiveType ? `1px solid ${C.border}` : "1px solid transparent",
                  transition:"all 0.2s",
                }}>
                  {cycleActiveType
                    ? (lang==="es" ? "2. Toca los días del calendario · toca de nuevo para borrar" : "2. Tap days on the calendar · tap again to remove")
                    : (lang==="es" ? "Selecciona un tipo arriba para empezar" : "Select a type above to start marking")}
                </div>
              </div>

              {/* Month title */}
              <div style={{ fontSize:13, fontWeight:700, color:C.creamMuted, textAlign:"center", marginBottom:10 }}>
                {(() => {
                  const [y,m] = cycleMonth.split("-").map(Number);
                  const months_es = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
                  const months_en = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                  return `${lang === "es" ? months_es[m-1] : months_en[m-1]} ${y}`;
                })()}
              </div>

              {/* Day headers */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:4 }}>
                {(lang === "es" ? ["L","M","X","J","V","S","D"] : ["M","T","W","T","F","S","S"]).map((d,i) => (
                  <div key={i} style={{ textAlign:"center", fontSize:10, fontWeight:700, color:C.creamMuted, padding:"4px 0" }}>{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              {(() => {
                const [y, mo] = cycleMonth.split("-").map(Number);
                const firstDay = new Date(y, mo-1, 1).getDay();
                const offset = firstDay === 0 ? 6 : firstDay - 1;
                const daysInMonth = new Date(y, mo, 0).getDate();
                const cells = [];
                for (let i = 0; i < offset; i++) cells.push(null);
                for (let d = 1; d <= daysInMonth; d++) cells.push(d);
                while (cells.length % 7 !== 0) cells.push(null);
                const typeColors = {
                  period:    { bg:"#f5d0dc", border:"#c06080", text:"#7a1030" },
                  spm:       { bg:"#f5ecd5", border:"#8a6c3a", text:"#8a6c3a" },
                  retention: { bg:"#d0e4f0", border:"#5080a0", text:"#305070" },
                };
                const today = new Date().toISOString().slice(0,10);
                return (
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
                    {cells.map((day, idx) => {
                      if (!day) return <div key={idx} />;
                      const dateStr = `${y}-${String(mo).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                      const type = cycleData[dateStr];
                      const col = type ? typeColors[type] : null;
                      const isToday = dateStr === today;
                      return (
                        <div key={idx}
                          onClick={() => {
                            if (!cycleActiveType) return;
                            if (type === cycleActiveType) {
                              setCycleData(prev => {
                                const next = { ...prev };
                                delete next[dateStr];
                                try { localStorage.setItem("lt_cycle", JSON.stringify(next)); } catch {}
                                return next;
                              });
                            } else {
                              toggleCycleDay(dateStr, cycleActiveType);
                            }
                          }}
                          style={{
                            aspectRatio:"1", borderRadius:7,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:11, fontWeight: type ? 700 : 500,
                            cursor: cycleActiveType ? "pointer" : "default",
                            background: col ? col.bg : isToday ? C.creamFaint : "transparent",
                            border:`1.5px solid ${col ? col.border : isToday ? C.sage : "transparent"}`,
                            color: col ? col.text : isToday ? C.sage : C.cream,
                            transition:"all 0.15s", userSelect:"none",
                            opacity: cycleActiveType || type ? 1 : 0.7,
                          }}
                        >{day}</div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Legend */}
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginTop:12, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
                {[
                  { color:"#c06080", bg:"#f5d0dc", label: lang==="es" ? "Menstruación" : "Period" },
                  { color:"#8a6c3a", bg:"#f5ecd5", label:"SPM / PMS" },
                  { color:"#5080a0", bg:"#d0e4f0", label: lang==="es" ? "Retención" : "Retention" },
                ].map(l => (
                  <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <div style={{ width:12, height:12, borderRadius:3, background:l.bg, border:`1.5px solid ${l.color}` }}/>
                    <span style={{ fontSize:11, color:C.creamMuted, fontWeight:600 }}>{l.label}</span>
                  </div>
                ))}
              </div>

              {/* Summary */}
              {(() => {
                const periodDays = Object.entries(cycleData).filter(([,v]) => v === "period").map(([k]) => k).sort();
                if (periodDays.length < 1) return null;
                let lastStart = null, lastEnd = null;
                for (let i = 0; i < periodDays.length; i++) {
                  const prev = i > 0 ? new Date(periodDays[i-1]) : null;
                  if (!prev || (new Date(periodDays[i]) - prev) > 86400000 * 2) lastStart = periodDays[i];
                  lastEnd = periodDays[i];
                }
                const duration = lastStart && lastEnd ? Math.round((new Date(lastEnd) - new Date(lastStart)) / 86400000) + 1 : null;
                return (
                  <div style={{ marginTop:12, padding:"10px 12px", background:C.creamFaint, borderRadius:10, border:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:11, fontWeight:800, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:6 }}>
                      {lang==="es" ? "Resumen del ciclo" : "Cycle summary"}
                    </div>
                    <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                      {lastStart && <div><div style={{ fontSize:10, color:C.creamMuted }}>{lang==="es" ? "Último inicio" : "Last start"}</div><div style={{ fontSize:13, fontWeight:700, color:C.cream }}>{lastStart.slice(8)}/{lastStart.slice(5,7)}</div></div>}
                      {duration && <div><div style={{ fontSize:10, color:C.creamMuted }}>{lang==="es" ? "Duración" : "Duration"}</div><div style={{ fontSize:13, fontWeight:700, color:C.cream }}>{duration} {lang==="es" ? "días" : "days"}</div></div>}
                      <div><div style={{ fontSize:10, color:C.creamMuted }}>{lang==="es" ? "Días marcados" : "Days marked"}</div><div style={{ fontSize:13, fontWeight:700, color:C.cream }}>{periodDays.length}</div></div>
                    </div>
                  </div>
                );
              })()}
            </div>


            {/* Pill taken today */}
            {profile.pillActive && (
              <div style={S.card}>
                <div style={S.cardTitle}>{lang === "es" ? "Anticonceptivo" : "Contraceptive"}</div>
                <div
                  onClick={() => updateEntry("pillTaken", !entry.pillTaken)}
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:12, border:`1.5px solid ${entry.pillTaken ? C.sage : C.border}`, background: entry.pillTaken ? C.creamFaint : "white", cursor:"pointer", transition:"all 0.2s", userSelect:"none" }}>
                  <span style={{ fontSize:22 }}>💊</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color: entry.pillTaken ? C.sage : C.cream }}>
                      {profile.pillBrand
                        ? (lang==="es" ? `${profile.pillBrand} — tomada hoy` : `${profile.pillBrand} — taken today`)
                        : (lang==="es" ? "Píldora tomada hoy" : "Pill taken today")}
                    </div>
                    <div style={{ fontSize:11, color:C.creamMuted, marginTop:1 }}>
                      {entry.pillTaken
                        ? (lang==="es" ? "✓ Marcada como tomada" : "✓ Marked as taken")
                        : (lang==="es" ? "Toca para marcar como tomada" : "Tap to mark as taken")}
                    </div>
                  </div>
                  <div style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${entry.pillTaken ? C.sage : C.border}`, background: entry.pillTaken ? C.sage : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {entry.pillTaken && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                </div>
              </div>
            )}

                        <button style={S.btn} onClick={saveLog}>{savedMsg || t.today.save}</button>
          </>
        )}

        {/* ── HISTORY ── */}
        {tab === "history" && (() => {
          const moodEmojis = ["😣","😟","😐","🙂","😊","😄","🤩"];
          return (
            <div style={S.card}>
              <div style={S.cardTitle}>{t.history.title}</div>
              {logs.length === 0 ? (
                <p style={{ color: C.creamMuted, fontSize: 14 }}>{t.history.empty}</p>
              ) : (
                [...logs].reverse().map((l, i) => {
                  const isOpen = openLog === l.date;
                  return (
                    <div key={i} style={{ borderBottom: `1px solid ${C.border}`, overflow:"hidden" }}>
                      {/* ── Row header — always visible, clickable ── */}
                      <div onClick={() => setOpenLog(isOpen ? null : l.date)}
                        style={{ padding:"12px 4px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", userSelect:"none" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          {/* Mood emoji */}
                          <span style={{ fontSize:18 }}>{moodEmojis[l.mood ?? 2]}</span>
                          <div>
                            <div style={{ fontWeight:700, fontSize:13, color:C.cream }}>{l.date}</div>
                            {/* Supp icons */}
                            {l.suppsTaken?.length > 0 && (
                              <div style={{ display:"flex", gap:2, marginTop:2 }}>
                                {l.suppsTaken.slice(0,5).map(k => {
                                  const d = allSuppsList.find(s => s.key === k);
                                  return d ? <span key={k} style={{ fontSize:12 }}>{d.icon}</span> : null;
                                })}
                                {l.suppsTaken.length > 5 && <span style={{ fontSize:10, color:C.creamMuted }}>+{l.suppsTaken.length-5}</span>}
                              </div>
                            )}
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                          {l.weight && <span style={S.tag(C.cream)}>{l.weight}kg</span>}
                          <span style={S.tag("#ef4444")}>dolor {l.pain}</span>
                          <span style={S.tag(C.sage)}>energía {l.energy}</span>
                          <span style={{ fontSize:13, color:C.creamMuted, marginLeft:4, transition:"transform 0.2s", display:"inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                        </div>
                      </div>

                      {/* ── Expanded detail ── */}
                      {isOpen && (
                        <div style={{ background:C.bg, borderTop:`1px solid ${C.border}`, padding:"14px 12px 16px", display:"flex", flexDirection:"column", gap:12 }}>

                          {/* Stats row */}
                          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                            {[
                              { label: lang==="es"?"Peso":"Weight",  value: l.weight ? `${l.weight} kg` : "—" },
                              { label: lang==="es"?"Dolor":"Pain",    value: `${l.pain} / 6` },
                              { label: lang==="es"?"Energía":"Energy",value: `${l.energy} / 6` },
                              { label: lang==="es"?"Estado":"Mood",   value: moodEmojis[l.mood ?? 2] },
                            ].map(s => (
                              <div key={s.label} style={{ flex:1, minWidth:60, background:"white", borderRadius:10, padding:"8px 10px", border:`1px solid ${C.border}`, textAlign:"center" }}>
                                <div style={{ fontSize:9, color:C.creamMuted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.4px", marginBottom:3 }}>{s.label}</div>
                                <div style={{ fontSize:14, fontWeight:800, color:C.cream }}>{s.value}</div>
                              </div>
                            ))}
                          </div>

                          {/* Inflammation zones */}
                          {l.inflammationZones && Object.keys(l.inflammationZones).length > 0 && (
                            <div>
                              <div style={{ fontSize:10, fontWeight:700, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:6 }}>
                                {lang==="es"?"Inflamación por zonas":"Inflammation by zone"}
                              </div>
                              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                                {Object.entries(l.inflammationZones).map(([zone, val]) => (
                                  <div key={zone} style={{ display:"flex", alignItems:"center", gap:8 }}>
                                    <div style={{ fontSize:11, color:C.creamMuted, width:110, flexShrink:0 }}>{t.today.zoneNames[zone] || zone}</div>
                                    <div style={{ flex:1, height:6, background:C.border, borderRadius:4, overflow:"hidden" }}>
                                      <div style={{ width:`${(val/5)*100}%`, height:"100%", borderRadius:4, background: val >= 4 ? "#c06080" : val >= 2 ? C.accent : C.sage, transition:"width 0.3s" }}/>
                                    </div>
                                    <div style={{ fontSize:11, fontWeight:700, color:C.cream, width:20 }}>{val}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Body measures */}
                          {l.measures && Object.values(l.measures).some(v => v) && (
                            <div>
                              <div style={{ fontSize:10, fontWeight:700, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:6 }}>
                                {lang==="es"?"Medidas":"Measurements"}
                              </div>
                              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                                {Object.entries(l.measures).filter(([,v]) => v).map(([zone, val]) => (
                                  <div key={zone} style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:8, padding:"5px 10px", fontSize:11 }}>
                                    <span style={{ color:C.creamMuted }}>{t.today.zoneNames[zone] || zone}: </span>
                                    <span style={{ fontWeight:700, color:C.cream }}>{val} cm</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Supplements taken */}
                          {l.suppsTaken?.length > 0 && (
                            <div>
                              <div style={{ fontSize:10, fontWeight:700, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:6 }}>
                                {lang==="es"?"Suplementos tomados":"Supplements taken"}
                              </div>
                              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                                {l.suppsTaken.map(k => {
                                  const d = allSuppsList.find(s => s.key === k);
                                  return d ? (
                                    <span key={k} style={{ fontSize:11, background:C.creamFaint, border:`1px solid ${C.border}`, borderRadius:20, padding:"3px 9px", color:C.sage, fontWeight:600 }}>
                                      {d.icon} {lang==="es" ? d.es : d.en}
                                    </span>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}

                          {/* Pill taken */}
                          {l.pillTaken && (
                            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:C.creamFaint, borderRadius:8, border:`1px solid ${C.border}` }}>
                              <span style={{ fontSize:16 }}>💊</span>
                              <span style={{ fontSize:12, fontWeight:600, color:C.sage }}>
                                {profile.pillBrand
                                  ? (lang==="es" ? `${profile.pillBrand} tomada` : `${profile.pillBrand} taken`)
                                  : (lang==="es" ? "Píldora tomada" : "Pill taken")}
                              </span>
                            </div>
                          )}

                          {/* Notes */}
                          {(l.inflammationNote || l.notes) && (
                            <div>
                              <div style={{ fontSize:10, fontWeight:700, color:C.creamMuted, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:4 }}>
                                {lang==="es"?"Notas":"Notes"}
                              </div>
                              <div style={{ fontSize:12, color:C.cream, lineHeight:1.6, background:"white", borderRadius:8, padding:"8px 10px", border:`1px solid ${C.border}` }}>
                                {l.inflammationNote || l.notes}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          );
        })()}

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
                {chartData.some(d => d.weight) ? (
                  <div style={S.card}>
                    <div style={S.cardTitle}>{t.charts.weight}</div>
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} domain={["auto","auto"]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 5 }} connectNulls />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div style={{ ...S.card, color:C.creamMuted, fontSize:12, textAlign:"center", padding:"18px 16px" }}>
                    {lang==="es" ? "Añade peso en el registro diario para ver esta gráfica" : "Add weight in your daily log to see this chart"}
                  </div>
                )}

                <div style={S.card}>
                  <div style={S.cardTitle}>{t.charts.painEnergy}</div>
                  {logs.length === 1 && (
                    <div style={{ fontSize:11, color:C.creamMuted, marginBottom:8, fontStyle:"italic" }}>
                      {lang==="es" ? "Con más registros verás la evolución en el tiempo" : "Add more entries to see your trend over time"}
                    </div>
                  )}
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[0,6]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pain" stroke="#ef4444" strokeWidth={2} dot={{ r: 5 }} name={t.history.pain} />
                      <Line type="monotone" dataKey="energy" stroke="#22c55e" strokeWidth={2} dot={{ r: 5 }} name={t.history.energy} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {inflammationData.some(d => d.value > 0) && (
                  <div style={S.card}>
                    <div style={S.cardTitle}>{t.charts.inflammation}</div>
                    <ResponsiveContainer width="100%" height={220}>
                      <RadarChart data={inflammationData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="zone" tick={{ fontSize: 11 }} />
                        <Radar dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.35} strokeWidth={2} />
                      </RadarChart>
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
                    <Bar dataKey="count" radius={[0,6,6,0]}
                      fill="#6366f1"
                      label={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}

        {/* ── FOODS ── */}
        {tab === "foods" && (
          <>
            <div style={S.card}>
              <div style={S.cardTitle}>{t.foods.add}</div>
              <label style={S.label}>{t.foods.name}</label>
              <input style={{ ...S.input, marginBottom: 10 }} placeholder={t.foods.namePlaceholder}
                value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} />
              <label style={S.label}>{t.foods.category}</label>
              <select style={{ ...S.input, marginBottom: 10 }} value={newFood.category} onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}>
                {Object.entries(t.foods.categories).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <label style={S.label}>{t.foods.reaction}</label>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {["good","bad","neutral"].map((r) => (
                  <button key={r} style={{ ...S.btnSm(newFood.reaction === r ? S.reactionColor[r] : null), flex: 1 }}
                    onClick={() => setNewFood({ ...newFood, reaction: r })}>
                    {t.foods[r]}
                  </button>
                ))}
              </div>
              <label style={S.label}>{t.foods.notes}</label>
              <textarea style={{ ...S.textarea, marginBottom: 14 }} placeholder={t.foods.notesPlaceholder}
                value={newFood.notes} onChange={(e) => setNewFood({ ...newFood, notes: e.target.value })} />
              <button style={S.btn} onClick={addFood}>{t.foods.add}</button>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>{t.foods.list}</div>
              {foods.length === 0 ? (
                <p style={{ color: C.creamMuted, fontSize: 13 }}>{t.foods.empty}</p>
              ) : (
                foods.map((f) => (
                  <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{f.name}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        <span style={S.tag(S.reactionColor[f.reaction])}>{t.foods[f.reaction]}</span>
                        <span style={S.tag(C.creamMuted)}>{t.foods.categories[f.category]}</span>
                      </div>
                      {f.notes && <div style={{ fontSize: 12, color: C.creamMuted, marginTop: 4 }}>{f.notes}</div>}
                    </div>
                    <button onClick={() => removeFood(f.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.creamMuted, fontSize: 20, padding: "0 4px" }}>×</button>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ── SUPPLEMENTS ── */}
        {tab === "supps" && (
          <>
            <div style={S.card}>
              <div style={S.cardTitle}>{t.supps.title}</div>
              <p style={{ fontSize: 13, color: C.creamMuted, marginBottom: 16 }}>{t.supps.subtitle}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SUPPLEMENT_OPTIONS.map((supp) => {
                  const isActive = activeSupps.some((a) => a.key === supp.key);
                  const suppData = activeSupps.find((a) => a.key === supp.key);
                  return (
                    <SupplementCard key={supp.key} supp={supp} lang={lang} isActive={isActive} suppData={suppData}
                      onToggle={() => toggleSupp(supp.key)}
                      onUpdate={(patch) => updateSuppData(supp.key, patch)}
                    />
                  );
                })}

                {/* Custom supplements */}
                {(supps.custom || []).map((c) => {
                  const supp = { key: c.key, icon: c.icon, es: c.name, en: c.name, note_es: "", note_en: "" };
                  const isActive = activeSupps.some((a) => a.key === c.key);
                  const suppData = activeSupps.find((a) => a.key === c.key);
                  return (
                    <SupplementCard key={c.key} supp={supp} lang={lang} isActive={isActive} suppData={suppData}
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
                <input style={{ ...S.input, flex: 1 }} placeholder={t.supps.customPlaceholder}
                  value={customSuppName} onChange={(e) => setCustomSuppName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomSupp()}
                />
                <button style={{ ...S.btn, width: "auto", padding: "9px 18px" }} onClick={addCustomSupp}>
                  {t.supps.addCustom}
                </button>
              </div>
            </div>

            <button style={S.btn} onClick={saveSupps}>{suppsSaved ? t.supps.saved : t.supps.save}</button>
          </>
        )}

        {/* ── CENTERS ── */}
        {tab === "centers" && (
          <div style={S.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.creamFaint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="mappin" size={20} color={C.sage} />
              </div>
              <div>
                <div style={S.cardTitle}>{lang === "es" ? "Centros especializados" : "Specialized Centers"}</div>
                <div style={{ fontSize: 12, color: C.creamMuted, marginTop: -10 }}>
                  {lang === "es" ? "Próximamente — fisioterapeutas y especialistas en lipedema cerca de ti" : "Coming soon — lipedema physiotherapists and specialists near you"}
                </div>
              </div>
            </div>
            <div style={{ background: C.creamFaint, borderRadius: 10, padding: "16px", textAlign: "center", border: `1px dashed ${C.border}` }}>
              <Icon name="mappin" size={32} color={C.border} />
              <div style={{ fontSize: 13, color: C.creamMuted, marginTop: 10, lineHeight: 1.6 }}>
                {lang === "es"
                  ? "Esta sección mostrará centros de drenaje linfático, fisioterapeutas especializados y cirujanos vasculares según tu ubicación."
                  : "This section will show lymphatic drainage centers, specialized physiotherapists and vascular surgeons based on your location."}
              </div>
            </div>
          </div>
        )}

        {/* ── INFO ── */}
        {tab === "info" && (
          <>
            {/* Visual Guide shortcut */}
            <div
              onClick={() => setShowWelcome(true)}
              style={{ background: "linear-gradient(135deg, #fdf4ff, #f0f9ff)", borderRadius: 14, padding: "16px 18px", marginBottom: 14, border: "1.5px solid #e9d5ff", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
            >
              <div style={{ fontSize: 36 }}>🩺</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: C.cream, marginBottom: 2 }}>
                  {lang === "es" ? "Guía visual del lipedema" : "Visual Lipedema Guide"}
                </div>
                <div style={{ fontSize: 12, color: C.creamMuted }}>
                  {lang === "es" ? "Tipos, estadios, síntomas visuales explicados con ilustraciones →" : "Types, stages, visual symptoms explained with illustrations →"}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{ background: "#fefce8", borderRadius: 10, padding: "10px 14px", marginBottom: 16, border: "1px solid #fde047", fontSize: 12, color: "#854d0e" }}>
              {t.info.disclaimer}
            </div>

            {/* Language filter */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {[["all", t.info.filterAll], ["es", t.info.filterEs], ["en", t.info.filterEn]].map(([val, label]) => (
                <button key={val} onClick={() => setInfoFilter(val)}
                  style={{ padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: infoFilter === val ? C.sage : C.creamFaint, color: infoFilter === val ? "#fff" : C.creamMuted, transition: "all 0.2s" }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Sections */}
            {Object.entries(INFO_RESOURCES).map(([sectionKey, section]) => {
              const sectionName = lang === "es" ? section.es : section.en;
              const filtered = section.items.filter(item =>
                infoFilter === "all" ? true : item.lang === infoFilter
              );
              if (filtered.length === 0) return null;
              return (
                <div key={sectionKey} style={S.card}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span style={{ fontSize: 20 }}>{section.icon}</span>
                    <div style={S.cardTitle}>{sectionName}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {filtered.map((item, i) => {
                      const desc = lang === "es" ? item.desc_es : item.desc_en;
                      const typeLabel = t.info.tagTypes[item.type] || item.type;
                      const langColor = item.lang === "es" ? "#6366f1" : "#0ea5e9";
                      const typeColors = {
                        review: "#8b5cf6", guideline: "#ef4444", research: "#f97316",
                        guide: "#22c55e", clinical: "#14b8a6", association: "#6366f1",
                        forum: "#f59e0b", influencer: "#ec4899", article: "#64748b", platform: "#0ea5e9",
                      };
                      return (
                        <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                          style={{ display: "block", textDecoration: "none", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.bgInput, transition: "border-color 0.2s, background 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.background = C.bgCardHov; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgInput; }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, fontSize: 13, color: C.cream, marginBottom: 3, lineHeight: 1.4 }}>
                                {item.platform && <span style={{ fontSize: 11, color: C.creamMuted, marginRight: 6 }}>{item.platform}</span>}
                                {item.title}
                              </div>
                              <div style={{ fontSize: 11, color: C.creamMuted, marginBottom: 6 }}>{item.authors}{item.year ? ` · ${item.year}` : ""}</div>
                              <div style={{ fontSize: 12, color: C.cream, lineHeight: 1.5 }}>{desc}</div>
                            </div>
                            <span style={{ fontSize: 14, color: C.creamMuted, flexShrink: 0, marginTop: 2 }}>↗</span>
                          </div>
                          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                            <span style={{ padding: "2px 7px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: langColor + "18", color: langColor }}>
                              {item.lang === "es" ? "ES" : "EN"}
                            </span>
                            <span style={{ padding: "2px 7px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: (typeColors[item.type] || C.creamMuted) + "28", color: typeColors[item.type] || C.creamMuted }}>
                              {typeLabel}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* ── CENTERS ── */}
        {tab === "centers" && (
          <>
            <div style={S.card}>
              <div style={S.cardTitle}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="mappin" size={18} color={C.sage} />
                  {lang === "es" ? "Centros especializados en lipedema" : "Lipedema specialist centres"}
                </div>
              </div>

              {/* Location context */}
              {(profile.country || profile.region) ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: C.creamFaint, borderRadius: 10, marginBottom: 16, border: `1px solid ${C.border}` }}>
                  <Icon name="mappin" size={14} color={C.sage} />
                  <span style={{ fontSize: 13, color: C.cream, fontWeight: 600 }}>
                    {[profile.region, profile.country].filter(Boolean).join(", ")}
                  </span>
                  <button onClick={() => setTab("profile")} style={{ marginLeft: "auto", fontSize: 11, color: C.creamMuted, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                    {lang === "es" ? "Cambiar" : "Change"}
                  </button>
                </div>
              ) : (
                <div style={{ padding: "10px 12px", background: "#fffbe6", borderRadius: 10, marginBottom: 16, border: "1px solid #f0d060", fontSize: 12, color: "#7a6020" }}>
                  {lang === "es"
                    ? "💡 Añade tu ubicación en Perfil para ver centros cercanos."
                    : "💡 Add your location in Profile to see nearby centres."}
                </div>
              )}

              <p style={{ fontSize: 13, color: C.creamMuted, lineHeight: 1.65, marginBottom: 16 }}>
                {lang === "es"
                  ? "Directorio de clínicas, fisioterapeutas especializados y cirujanos linfáticos con experiencia en lipedema."
                  : "Directory of clinics, specialist physiotherapists and lymphatic surgeons with lipedema expertise."}
              </p>

              {/* City filter chips */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {["Madrid","Barcelona","Valencia","Sevilla","Bilbao"].map(city => (
                  <button key={city} style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${C.border}`, background: C.bgInput, fontSize: 12, fontWeight: 600, color: C.creamMuted, cursor: "pointer", fontFamily: "inherit" }}>
                    {city}
                  </button>
                ))}
              </div>

              {/* Coming soon */}
              <div style={{ background: C.creamFaint, borderRadius: 12, padding: "20px 18px", border: `1px solid ${C.border}`, textAlign: "center" }}>
                <Icon name="mappin" size={28} color={C.border} />
                <div style={{ fontSize: 14, fontWeight: 700, color: C.cream, margin: "10px 0 4px" }}>
                  {lang === "es" ? "Directorio en construcción" : "Directory coming soon"}
                </div>
                <div style={{ fontSize: 12, color: C.creamMuted, lineHeight: 1.6 }}>
                  {lang === "es"
                    ? "Estamos verificando centros y especialistas. Podrás filtrar por ubicación, tipo de tratamiento y especialidad."
                    : "We're verifying centres and specialists. You'll be able to filter by location, treatment type and specialty."}
                </div>
              </div>
            </div>

            {/* Sample cards */}
            {[
              { name: "Clínica Linfovascular Madrid", specialty: lang === "es" ? "Cirugía linfática · Liposucción especializada" : "Lymphatic surgery · Specialist liposuction", city: "Madrid", type: lang === "es" ? "Cirugía" : "Surgery", verified: true },
              { name: "Fisioterapia Integral Barcelona", specialty: lang === "es" ? "Drenaje linfático manual · Presoterapia" : "Manual lymphatic drainage · Pressotherapy", city: "Barcelona", type: lang === "es" ? "Fisioterapia" : "Physiotherapy", verified: true },
              { name: "Centro Dermatológico Valencia", specialty: lang === "es" ? "Diagnóstico · Tratamiento conservador" : "Diagnosis · Conservative treatment", city: "Valencia", type: lang === "es" ? "Diagnóstico" : "Diagnosis", verified: false },
            ].map((c, i) => (
              <div key={i} style={{ ...S.card, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.cream }}>{c.name}</span>
                      {c.verified && <span style={{ fontSize: 10, fontWeight: 700, color: C.sage, background: C.creamFaint, padding: "2px 6px", borderRadius: 20 }}>✓ {lang === "es" ? "Verificado" : "Verified"}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: C.creamMuted, marginBottom: 6 }}>{c.specialty}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.sageLight, background: C.creamFaint, padding: "2px 8px", borderRadius: 20 }}>📍 {c.city}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.accent, background: `${C.accent}15`, padding: "2px 8px", borderRadius: 20 }}>{c.type}</span>
                    </div>
                  </div>
                  <button style={{ padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: "white", fontSize: 12, fontWeight: 600, color: C.sage, cursor: "pointer", flexShrink: 0, fontFamily: "inherit" }}>
                    {lang === "es" ? "Ver más" : "View"}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── PROFILE ── */}
        {tab === "profile" && (
          <div style={S.card}>
            <div style={S.cardTitle}>{t.profile.title}</div>
            <label style={S.label}>{t.profile.name}</label>
            <input style={{ ...S.input, marginBottom: 12 }} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            <label style={S.label}>{t.profile.stage}</label>
            <select style={{ ...S.input, marginBottom: 12 }} value={profile.stage} onChange={(e) => setProfile({ ...profile, stage: e.target.value })}>
              {Object.entries(t.profile.stages).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <label style={S.label}>{t.profile.diagnosis}</label>
            <input style={{ ...S.input, marginBottom: 16 }} type="date" value={profile.diagnosis} onChange={(e) => setProfile({ ...profile, diagnosis: e.target.value })} />
            <label style={S.label}>{lang === "es" ? "País" : "Country"}</label>
            <input style={{ ...S.input, marginBottom: 8 }} placeholder={lang === "es" ? "España, México…" : "Spain, Mexico…"} value={profile.country || ""} onChange={(e) => setProfile({ ...profile, country: e.target.value })} />
            <label style={S.label}>{lang === "es" ? "Provincia / Ciudad" : "Region / City"}</label>
            <input style={{ ...S.input, marginBottom: 16 }} placeholder={lang === "es" ? "Madrid, Barcelona…" : "Madrid, Barcelona…"} value={profile.region || ""} onChange={(e) => setProfile({ ...profile, region: e.target.value })} />

            {/* Pill / contraceptive */}
            <label style={S.label}>{lang === "es" ? "Anticonceptivo hormonal (píldora)" : "Hormonal contraceptive (pill)"}</label>
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              {[
                { val:true,  label: lang==="es" ? "Sí, la tomo" : "Yes, I take it" },
                { val:false, label: lang==="es" ? "No la tomo"  : "No, I don't"    },
              ].map(o => (
                <button key={String(o.val)}
                  onClick={() => setProfile({ ...profile, pillActive: o.val })}
                  style={{ flex:1, padding:"9px 12px", borderRadius:10, border:`1.5px solid ${profile.pillActive === o.val ? C.sage : C.border}`, background: profile.pillActive === o.val ? C.creamFaint : "white", fontSize:12, fontWeight:700, color: profile.pillActive === o.val ? C.sage : C.creamMuted, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                  {o.label}
                </button>
              ))}
            </div>
            {profile.pillActive && (
              <>
                <label style={S.label}>{lang === "es" ? "Marca o nombre comercial" : "Brand or commercial name"}</label>
                <input style={{ ...S.input, marginBottom: 16 }}
                  placeholder={lang === "es" ? "Ej: Yasmin, Diane 35, Loette…" : "e.g. Yasmin, Microgynon, Cilest…"}
                  value={profile.pillBrand || ""}
                  onChange={(e) => setProfile({ ...profile, pillBrand: e.target.value })} />
              </>
            )}

            <label style={S.label}>{t.profile.activeZones}</label>
            <div style={S.grid2}>
              {ALL_ZONES.map((z) => {
                const active = activeZones.includes(z);
                return (
                  <div key={z} onClick={() => {
                    const updated = active ? activeZones.filter((x) => x !== z) : [...activeZones, z];
                    setProfile({ ...profile, activeZones: updated });
                  }}
                    style={{ padding: "8px 12px", borderRadius: 8, border: `1.5px solid ${active ? C.sage : C.border}`, cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 400, color: active ? C.sageLight : C.creamMuted, background: active ? C.creamFaint : C.bgInput, transition: "all 0.2s" }}>
                    {active ? "✓ " : ""}{t.today.zoneNames[z] || z}
                  </div>
                );
              })}
            </div>
            <button style={{ ...S.btn, marginTop: 20 }} onClick={saveProfile}>
              {profileSaved ? t.profile.saved : t.profile.save}
            </button>
          </div>
        )}

      </div>
      </div>{/* /layout */}

      {/* ── BOTTOM NAV (mobile) ── */}
      {!isDesktop && (
        <nav style={S.bottomNav}>
          {BOTTOM_NAV_KEYS.map((key) => {
            const item = NAV_ITEMS.find(n => n.key === key);
            if (!item) return null;
            const active = tab === key;
            return (
              <button key={key} style={S.bnItem(active)} onClick={() => setTab(key)}>
                <Icon name={item.icon} size={20} color={active ? C.sage : C.creamMuted} />
                <span style={{ fontSize: 9, fontWeight: active ? 700 : 500 }}>{lang === "es" ? item.es : item.en}</span>
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
