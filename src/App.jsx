import { useState, useEffect, useCallback } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, Legend,
} from "recharts";
import WelcomeGuide from "./WelcomeGuide";

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
});

const defaultProfile = {
  name: "",
  stage: "unknown",
  diagnosis: "",
  activeZones: ["leftThigh","rightThigh","leftCalf","rightCalf"],
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
  const colors = [C.creamFaint, "#5a7a4a", "#7aad5a", "#d4a84b", C.danger, "#b03030"];
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
      background: isActive ? C.bgCardHov : C.bgCard,
      transition: "all 0.2s", overflow: "hidden"
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
                      flex: 1, padding: "6px 4px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
                      background: suppData?.effect === k
                        ? (k === "good" ? C.success : k === "bad" ? C.danger : C.creamMuted)
                        : C.creamFaint,
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
  bg:         "#1a1f1e",   // fondo principal dark
  bgCard:     "#232a28",   // tarjetas
  bgCardHov:  "#2a3330",   // hover tarjetas
  bgInput:    "#1e2523",   // inputs
  border:     "#2e3a37",   // bordes suaves
  borderFoc:  "#6aad8f",   // bordes activos
  sage:       "#6aad8f",   // verde salvia principal
  sageDark:   "#4d8a6e",   // sage oscuro (botones)
  sageLight:  "#a8d5bc",   // sage claro (texto acento)
  cream:      "#e8e0d0",   // crema principal (texto)
  creamMuted: "#9da89f",   // crema apagado (secundario)
  creamFaint: "#3a4440",   // superficies muy sutiles
  accent:     "#c5a97d",   // dorado/tierra acento cálido
  danger:     "#e07070",   // error/dolor
  success:    "#6aad8f",   // éxito/bien
  warn:       "#d4a84b",   // warning/neutral
};

const labelStyle = {
  fontSize: 11, fontWeight: 600, color: C.creamMuted, marginBottom: 5,
  display: "block", textTransform: "uppercase", letterSpacing: "0.6px",
};
const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8,
  border: `1.5px solid ${C.border}`, fontSize: 13, outline: "none",
  background: C.bgInput, boxSizing: "border-box", fontFamily: "inherit",
  color: C.cream, transition: "border-color 0.2s",
};
const textareaStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8,
  border: `1.5px solid ${C.border}`, fontSize: 13, outline: "none",
  background: C.bgInput, boxSizing: "border-box", resize: "vertical",
  minHeight: 70, fontFamily: "inherit", color: C.cream,
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState("es");
  const [showWelcome, setShowWelcome] = useState(true);
  const [tab, setTab] = useState("today");
  const [entry, setEntry] = useState(defaultEntry());
  const [logs, setLogs] = useState([]);
  const [foods, setFoods] = useState([]);
  const [profile, setProfile] = useState(defaultProfile);
  const [supps, setSupps] = useState(defaultSupps);
  const [savedMsg, setSavedMsg] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [suppsSaved, setSuppsSaved] = useState(false);
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
      if (sl) setLogs(JSON.parse(sl));
      if (sf) setFoods(JSON.parse(sf));
      if (sp) setProfile(JSON.parse(sp));
      if (ss) setSupps(JSON.parse(ss));
      if (sl2) setLang(sl2);
      if (sw) setShowWelcome(false);
    } catch {}
  }, []);

  const handleEnterApp = useCallback(() => {
    try { localStorage.setItem("lt_welcome_seen", "1"); } catch {}
    setShowWelcome(false);
  }, []);

  const persist = useCallback((key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, []);

  const updateEntry = (field, val) => setEntry((e) => ({ ...e, [field]: val }));

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
    app:       { fontFamily: "'DM Sans','Segoe UI',sans-serif", minHeight: "100vh", background: C.bg, color: C.cream },
    header:    { background: C.bgCard, borderBottom: `1px solid ${C.border}`, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 },
    title:     { fontSize: 18, fontWeight: 800, color: C.sageLight, letterSpacing: "-0.5px" },
    subtitle:  { fontSize: 11, color: C.creamMuted, marginTop: 1 },
    langBtn:   (a) => ({ padding: "4px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: a ? C.sage : C.creamFaint, color: a ? "#fff" : C.creamMuted, transition: "all 0.2s" }),
    nav:       { display: "flex", background: C.bgCard, borderBottom: `1px solid ${C.border}`, overflowX: "auto" },
    navBtn:    (a) => ({ flex: 1, minWidth: 54, padding: "12px 2px", border: "none", borderBottom: a ? `2px solid ${C.sage}` : "2px solid transparent", background: "none", cursor: "pointer", fontSize: 11, fontWeight: a ? 700 : 500, color: a ? C.sageLight : C.creamMuted, transition: "all 0.2s", whiteSpace: "nowrap" }),
    page:      { maxWidth: 600, margin: "0 auto", padding: "20px 16px 100px" },
    card:      { background: C.bgCard, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` },
    cardTitle: { fontSize: 14, fontWeight: 700, color: C.cream, marginBottom: 14, letterSpacing: "-0.3px" },
    label:     labelStyle,
    input:     inputStyle,
    textarea:  textareaStyle,
    btn:       { padding: "12px 24px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, background: C.sage, color: "#fff", width: "100%", transition: "background 0.2s" },
    btnSm:     (col) => ({ padding: "6px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: col || C.creamFaint, color: col ? "#fff" : C.cream }),
    row:       { display: "flex", gap: 12 },
    col:       { flex: 1 },
    grid2:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    tag:       (color) => ({ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: color + "28", color }),
    reactionColor: { good: C.success, bad: C.danger, neutral: C.creamMuted },
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  if (showWelcome) {
    return <WelcomeGuide lang={lang} onEnter={handleEnterApp} />;
  }

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <div style={S.title}>🌿 {t.appTitle}</div>
          <div style={S.subtitle}>{t.appSubtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button style={S.langBtn(lang === "es")} onClick={() => switchLang("es")}>ES</button>
          <button style={S.langBtn(lang === "en")} onClick={() => switchLang("en")}>EN</button>
        </div>
      </div>

      {/* Nav */}
      <nav style={S.nav}>
        {Object.entries(t.nav).map(([key, label]) => (
          <button key={key} style={S.navBtn(tab === key)} onClick={() => setTab(key)}>{label}</button>
        ))}
      </nav>

      <div style={S.page}>

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

            <button style={S.btn} onClick={saveLog}>{savedMsg || t.today.save}</button>
          </>
        )}

        {/* ── HISTORY ── */}
        {tab === "history" && (
          <div style={S.card}>
            <div style={S.cardTitle}>{t.history.title}</div>
            {logs.length === 0 ? (
              <p style={{ color: C.creamMuted, fontSize: 14 }}>{t.history.empty}</p>
            ) : (
              [...logs].reverse().map((l, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{l.date}</div>
                    {l.inflammationNote && <div style={{ fontSize: 12, color: C.creamMuted, marginTop: 3, maxWidth: 260 }}>{l.inflammationNote.slice(0, 80)}{l.inflammationNote.length > 80 ? "…" : ""}</div>}
                    {l.suppsTaken?.length > 0 && (
                      <div style={{ marginTop: 4, display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {l.suppsTaken.map((k) => {
                          const d = allSuppsList.find((s) => s.key === k);
                          return d ? <span key={k} style={{ fontSize: 14 }}>{d.icon}</span> : null;
                        })}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {l.weight && <span style={S.tag("#6366f1")}>{l.weight}kg</span>}
                    <span style={S.tag("#ef4444")}>⚡{l.pain}</span>
                    <span style={S.tag("#22c55e")}>🔋{l.energy}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── CHARTS ── */}
        {tab === "charts" && (
          <>
            {logs.length < 2 ? (
              <div style={{ ...S.card, textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 40 }}>📊</div>
                <div style={{ color: C.creamMuted, marginTop: 8 }}>{t.charts.noData}</div>
              </div>
            ) : (
              <>
                <div style={S.card}>
                  <div style={S.cardTitle}>{t.charts.weight}</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={["auto","auto"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div style={S.card}>
                  <div style={S.cardTitle}>{t.charts.painEnergy}</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[0,6]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pain" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} name={t.history.pain} />
                      <Line type="monotone" dataKey="energy" stroke="#22c55e" strokeWidth={2} dot={{ r: 2 }} name={t.history.energy} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {inflammationData.length > 0 && (
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
    </div>
  );
}
