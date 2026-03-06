import { useState } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const WC = {
  bg:        "#1a1f1e",
  bgCard:    "#232a28",
  bgInput:   "#1e2523",
  border:    "#2e3a37",
  sage:      "#6aad8f",
  sageLight: "#a8d5bc",
  cream:     "#e8e0d0",
  creamMuted:"#9da89f",
  creamFaint:"#3a4440",
  accent:    "#c5a97d",
  danger:    "#e07070",
};

// ─── FEMALE SILHOUETTE SVG BUILDER ───────────────────────────────────────────
// Zones: hips, thighs, calves, ankles, arms, abdomen
// Each zone can be highlighted with a color

function FemaleSilhouette({ highlighted = [], label = "", compact = false }) {
  const scale = compact ? 0.72 : 1;
  const w = 120 * scale;
  const h = 260 * scale;

  const zoneColors = {
    hips:    "#f97316",
    thighs:  "#ef4444",
    calves:  "#f59e0b",
    ankles:  "#fbbf24",
    arms:    "#a78bfa",
    abdomen: "#fb923c",
    buttocks:"#f97316",
  };

  const getColor = (zone) =>
    highlighted.includes(zone) ? zoneColors[zone] || "#ef4444" : "#2e3a37";

  const getOpacity = (zone) =>
    highlighted.includes(zone) ? 0.85 : 0.5;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width={w} height={h} viewBox="0 0 120 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* HEAD */}
        <ellipse cx="60" cy="14" rx="12" ry="14" fill="#3a4a46" opacity="0.7" />
        {/* NECK */}
        <rect x="55" y="26" width="10" height="10" rx="3" fill="#3a4a46" opacity="0.6" />

        {/* SHOULDERS */}
        <path d="M35 40 Q27 44 24 55 L32 55 Q34 47 40 44 Z" fill="#3a4a46" opacity="0.65" />
        <path d="M85 40 Q93 44 96 55 L88 55 Q86 47 80 44 Z" fill="#3a4a46" opacity="0.65" />

        {/* UPPER ARMS */}
        <ellipse cx="24" cy="66" rx="8" ry="16"
          fill={getColor("arms")} opacity={getOpacity("arms")} />
        <ellipse cx="96" cy="66" rx="8" ry="16"
          fill={getColor("arms")} opacity={getOpacity("arms")} />

        {/* FOREARMS */}
        <ellipse cx="22" cy="96" rx="6" ry="13" fill="#3a4a46" opacity="0.55" />
        <ellipse cx="98" cy="96" rx="6" ry="13" fill="#3a4a46" opacity="0.55" />

        {/* HANDS */}
        <ellipse cx="21" cy="114" rx="5" ry="7" fill="#3a4a46" opacity="0.45" />
        <ellipse cx="99" cy="114" rx="5" ry="7" fill="#3a4a46" opacity="0.45" />

        {/* TORSO / CHEST */}
        <path d="M40 36 Q60 32 80 36 L84 80 Q60 88 36 80 Z"
          fill="#3a4a46" opacity="0.6" />

        {/* ABDOMEN */}
        <ellipse cx="60" cy="92" rx="22" ry="16"
          fill={getColor("abdomen")} opacity={getOpacity("abdomen")} />

        {/* HIPS / PELVIS */}
        <ellipse cx="60" cy="118" rx="28" ry="18"
          fill={getColor("hips")} opacity={getOpacity("hips")} />

        {/* BUTTOCKS extra volume */}
        <ellipse cx="60" cy="126" rx="24" ry="14"
          fill={getColor("buttocks")} opacity={highlighted.includes("buttocks") ? 0.7 : 0} />

        {/* LEFT THIGH */}
        <ellipse cx="48" cy="154" rx="14" ry="24"
          fill={getColor("thighs")} opacity={getOpacity("thighs")} />
        {/* RIGHT THIGH */}
        <ellipse cx="72" cy="154" rx="14" ry="24"
          fill={getColor("thighs")} opacity={getOpacity("thighs")} />

        {/* LEFT CALF */}
        <ellipse cx="46" cy="196" rx="10" ry="18"
          fill={getColor("calves")} opacity={getOpacity("calves")} />
        {/* RIGHT CALF */}
        <ellipse cx="74" cy="196" rx="10" ry="18"
          fill={getColor("calves")} opacity={getOpacity("calves")} />

        {/* LEFT ANKLE cuff */}
        <ellipse cx="44" cy="220" rx="8" ry="7"
          fill={getColor("ankles")} opacity={getOpacity("ankles")} />
        {/* RIGHT ANKLE cuff */}
        <ellipse cx="76" cy="220" rx="8" ry="7"
          fill={getColor("ankles")} opacity={getOpacity("ankles")} />

        {/* FEET */}
        <ellipse cx="42" cy="232" rx="9" ry="5" fill="#3a4a46" opacity="0.5" />
        <ellipse cx="78" cy="232" rx="9" ry="5" fill="#3a4a46" opacity="0.5" />

        {/* OUTLINE subtle */}
        <ellipse cx="60" cy="14" rx="12" ry="14" stroke="#94a3b8" strokeWidth="0.5" fill="none" />
        <path d="M40 36 Q60 32 80 36 L84 80 Q60 88 36 80 Z" stroke="#94a3b8" strokeWidth="0.5" fill="none" />
      </svg>
      {label && (
        <div style={{ fontSize: 11, fontWeight: 700, color: WC.cream, textAlign: "center", lineHeight: 1.3 }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ─── CONTENT DATA ─────────────────────────────────────────────────────────────
const CONTENT = {
  es: {
    skip: "Entrar a la app →",
    hero: {
      title: "¿Qué es el Lipedema?",
      intro: "El lipedema es una enfermedad crónica del tejido graso que afecta casi exclusivamente a mujeres. Se caracteriza por una acumulación anormal y simétrica de grasa en extremidades que no responde a dieta ni ejercicio, acompañada de dolor, inflamación y fragilidad capilar.",
      facts: [
        { icon: "👩", text: "Afecta al 5–11% de las mujeres" },
        { icon: "🧬", text: "Tiene componente genético y hormonal" },
        { icon: "🚫", text: "No mejora solo con dieta ni ejercicio" },
        { icon: "✅", text: "Reconocida por la OMS desde 2018" },
      ],
    },
    types: {
      title: "Tipos según zona afectada",
      subtitle: "Las zonas en naranja/rojo indican dónde se acumula la grasa patológica",
      list: [
        { num: "1", label: "Tipo 1 — Glúteos y caderas", zones: ["hips","buttocks"], desc: "La grasa se acumula en glúteos y caderas. Las piernas y el tronco tienen proporciones normales." },
        { num: "2", label: "Tipo 2 — Caderas y muslos", zones: ["hips","thighs","buttocks"], desc: "Afecta desde la cadera hasta la rodilla, incluyendo cara interna del muslo con pliegues adiposos." },
        { num: "3", label: "Tipo 3 — Caderas hasta tobillos", zones: ["hips","thighs","calves","buttocks"], desc: "La grasa se extiende desde la cadera hasta el tobillo, con mayor volumen en pantorrillas." },
        { num: "4", label: "Tipo 4 — Brazos", zones: ["arms"], desc: "Afecta a los brazos (codo hacia arriba). Puede coexistir con cualquier otro tipo." },
        { num: "5", label: "Tipo 5 — Solo pantorrillas", zones: ["calves","ankles"], desc: "Afectación predominante en pantorrillas. Menos frecuente, puede asociarse a lipolinfedema." },
      ],
    },
    stages: {
      title: "Estadios del lipedema",
      subtitle: "El lipedema progresa en tres estadios según la textura y estructura del tejido",
      list: [
        {
          num: "I",
          color: "#fde68a",
          textColor: "#92400e",
          title: "Estadio I — Piel lisa",
          bullets: [
            "Piel suave al tacto, superficie lisa",
            "Tejido subcutáneo con nódulos pequeños",
            "Hinchazón que desaparece por la mañana",
            "Dolor a la palpación y hematomas fáciles",
          ],
          tip: "La fase más favorable para empezar tratamiento conservador.",
        },
        {
          num: "II",
          color: "#fed7aa",
          textColor: "#7c2d12",
          title: "Estadio II — Piel irregular",
          bullets: [
            "Superficie de la piel irregular y ondulada",
            "Nódulos más grandes, tipo nuez o cereza",
            "Hinchazón más persistente a lo largo del día",
            "Aumento del dolor y sensación de pesadez",
          ],
          tip: "Es habitual que el diagnóstico se produzca en este estadio.",
        },
        {
          num: "III",
          color: "#fca5a5",
          textColor: "#7f1d1d",
          title: "Estadio III — Deformación",
          bullets: [
            "Grandes pliegues adiposos colgantes (pannus)",
            "Deformación visible de rodillas y tobillos",
            "Posible evolución a lipolinfedema",
            "Limitación funcional en movilidad",
          ],
          tip: "La cirugía linfática especializada puede ser la opción más adecuada.",
        },
      ],
    },
    symptoms: {
      title: "Síntomas y señales visuales",
      subtitle: "Reconocer el lipedema a tiempo es clave para frenar su progresión",
      list: [
        {
          icon: "🟣",
          title: "Hematomas espontáneos",
          desc: "Aparecen sin golpe aparente o con mínimo contacto, debido a la fragilidad capilar del tejido lipedematoso.",
          visual: "bruising",
        },
        {
          icon: "🦵",
          title: "Signo del cuffing (manguito)",
          desc: "Acumulación de grasa justo por encima del tobillo formando un 'escalón' o 'manga', mientras el pie permanece normal.",
          visual: "cuffing",
        },
        {
          icon: "🔘",
          title: "Textura nodular",
          desc: "Al palpar la piel se notan pequeños nódulos bajo la superficie, descritos como 'arroz bajo la piel' o 'granulado'.",
          visual: "nodules",
        },
        {
          icon: "📏",
          title: "Desproporción corporal",
          desc: "Cintura y tronco con proporciones normales frente a extremidades notablemente más voluminosas. La ropa de arriba y de abajo difieren varias tallas.",
          visual: "disproportion",
        },
        {
          icon: "💧",
          title: "Edema ortostático",
          desc: "Las piernas se hinchan a lo largo del día con la bipedestación y mejoran parcialmente tras el reposo nocturno, especialmente en estadio inicial.",
          visual: "edema",
        },
        {
          icon: "🤕",
          title: "Dolor a la palpación",
          desc: "Sensibilidad aumentada al tacto en las zonas afectadas. El dolor puede ser espontáneo, con sensación de pesadez y tensión constante.",
          visual: "pain",
        },
      ],
    },
    compare: {
      title: "Lipedema vs Obesidad vs Linfedema",
      headers: ["", "Lipedema", "Obesidad", "Linfedema"],
      rows: [
        ["Afecta a", "Casi solo mujeres", "Cualquier persona", "Cualquier persona"],
        ["Distribución", "Simétrica, extremidades", "Global", "Asimétrica, 1 extremidad"],
        ["Pies/manos", "Respetados", "Pueden estar afectados", "Afectados (fóvea +)"],
        ["Responde a dieta", "No", "Sí", "No aplica"],
        ["Dolor al palpar", "Sí, característico", "Generalmente no", "Variable"],
        ["Hematomas", "Frecuentes y espontáneos", "No habituales", "No habituales"],
      ],
    },
  },
  en: {
    skip: "Enter app →",
    hero: {
      title: "What is Lipedema?",
      intro: "Lipedema is a chronic fat tissue disease that affects almost exclusively women. It is characterized by an abnormal, symmetrical accumulation of fat in the limbs that does not respond to diet or exercise, accompanied by pain, inflammation and capillary fragility.",
      facts: [
        { icon: "👩", text: "Affects 5–11% of women" },
        { icon: "🧬", text: "Has genetic and hormonal components" },
        { icon: "🚫", text: "Does not improve with diet or exercise alone" },
        { icon: "✅", text: "Recognized by the WHO since 2018" },
      ],
    },
    types: {
      title: "Types by affected area",
      subtitle: "Orange/red zones indicate where pathological fat accumulates",
      list: [
        { num: "1", label: "Type 1 — Buttocks & hips", zones: ["hips","buttocks"], desc: "Fat accumulates in the buttocks and hips. Legs and torso have normal proportions." },
        { num: "2", label: "Type 2 — Hips & thighs", zones: ["hips","thighs","buttocks"], desc: "Affects from the hip to the knee, including the inner thigh with adipose folds." },
        { num: "3", label: "Type 3 — Hips to ankles", zones: ["hips","thighs","calves","buttocks"], desc: "Fat extends from the hip to the ankle, with greater volume in the calves." },
        { num: "4", label: "Type 4 — Arms", zones: ["arms"], desc: "Affects the arms (above the elbow). Can coexist with any other type." },
        { num: "5", label: "Type 5 — Calves only", zones: ["calves","ankles"], desc: "Predominantly affects calves. Less common; may be associated with lipolymphedema." },
      ],
    },
    stages: {
      title: "Lipedema Stages",
      subtitle: "Lipedema progresses in three stages based on tissue texture and structure",
      list: [
        {
          num: "I",
          color: "#fde68a",
          textColor: "#92400e",
          title: "Stage I — Smooth skin",
          bullets: [
            "Soft to the touch, smooth surface",
            "Subcutaneous tissue with small nodules",
            "Swelling that disappears in the morning",
            "Pain on palpation and easy bruising",
          ],
          tip: "Most favorable phase to begin conservative treatment.",
        },
        {
          num: "II",
          color: "#fed7aa",
          textColor: "#7c2d12",
          title: "Stage II — Irregular skin",
          bullets: [
            "Irregular, wavy skin surface",
            "Larger nodules, walnut or cherry-sized",
            "More persistent swelling throughout the day",
            "Increased pain and heaviness sensation",
          ],
          tip: "Diagnosis most commonly occurs at this stage.",
        },
        {
          num: "III",
          color: "#fca5a5",
          textColor: "#7f1d1d",
          title: "Stage III — Deformation",
          bullets: [
            "Large hanging adipose folds (pannus)",
            "Visible deformation of knees and ankles",
            "Possible progression to lipolymphedema",
            "Functional limitation in mobility",
          ],
          tip: "Specialized lymphatic surgery may be the most appropriate option.",
        },
      ],
    },
    symptoms: {
      title: "Symptoms & Visual Signs",
      subtitle: "Early recognition of lipedema is key to slowing its progression",
      list: [
        {
          icon: "🟣",
          title: "Spontaneous bruising",
          desc: "Appear without apparent impact or with minimal contact, due to capillary fragility in lipedematous tissue.",
          visual: "bruising",
        },
        {
          icon: "🦵",
          title: "Cuffing sign",
          desc: "Accumulation of fat just above the ankle forming a 'step' or 'cuff', while the foot remains normal.",
          visual: "cuffing",
        },
        {
          icon: "🔘",
          title: "Nodular texture",
          desc: "When palpated, small nodules are felt under the surface, described as 'rice under the skin' or 'granular'.",
          visual: "nodules",
        },
        {
          icon: "📏",
          title: "Body disproportion",
          desc: "Normal waist and torso proportions versus noticeably larger limbs. Upper and lower clothing differ by several sizes.",
          visual: "disproportion",
        },
        {
          icon: "💧",
          title: "Orthostatic edema",
          desc: "Legs swell throughout the day while standing, partially improving after overnight rest, especially in early stages.",
          visual: "edema",
        },
        {
          icon: "🤕",
          title: "Palpation pain",
          desc: "Increased sensitivity to touch in affected areas. Pain may be spontaneous with a constant feeling of heaviness and tension.",
          visual: "pain",
        },
      ],
    },
    compare: {
      title: "Lipedema vs Obesity vs Lymphedema",
      headers: ["", "Lipedema", "Obesity", "Lymphedema"],
      rows: [
        ["Affects", "Almost only women", "Anyone", "Anyone"],
        ["Distribution", "Symmetrical, limbs", "Global", "Asymmetrical, 1 limb"],
        ["Feet/hands", "Spared", "May be affected", "Affected (pitting +)"],
        ["Diet response", "None", "Yes", "N/A"],
        ["Pain on palpation", "Yes, characteristic", "Generally no", "Variable"],
        ["Bruising", "Frequent & spontaneous", "Uncommon", "Uncommon"],
      ],
    },
  },
};

// ─── SYMPTOM VISUAL ───────────────────────────────────────────────────────────
function SymptomVisual({ type }) {
  if (type === "bruising") return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      <ellipse cx="40" cy="30" rx="30" ry="22" fill="#2e3a37" opacity="0.6" />
      <ellipse cx="35" cy="28" rx="12" ry="8" fill="#7c3aed" opacity="0.35" />
      <ellipse cx="50" cy="35" rx="8" ry="5" fill="#6d28d9" opacity="0.25" />
      <ellipse cx="28" cy="38" rx="5" ry="4" fill="#8b5cf6" opacity="0.3" />
    </svg>
  );
  if (type === "cuffing") return (
    <svg width="80" height="70" viewBox="0 0 80 70">
      {/* Leg shape */}
      <path d="M28 5 Q32 5 35 8 L38 52 Q38 58 32 62 Q26 62 22 58 L22 10 Q24 5 28 5Z" fill="#2e3a37" opacity="0.7" />
      {/* Cuff accumulation */}
      <ellipse cx="30" cy="44" rx="11" ry="7" fill="#f97316" opacity="0.6" />
      {/* Arrow indicating cuff */}
      <line x1="50" y1="44" x2="44" y2="44" stroke=WC.cream strokeWidth="1.5" markerEnd="url(#arr)" />
      <text x="52" y="47" fontSize="8" fill=WC.cream fontWeight="600">cuff</text>
      {/* Foot - normal */}
      <ellipse cx="28" cy="62" rx="10" ry="5" fill="#3a4a46" opacity="0.6" />
    </svg>
  );
  if (type === "nodules") return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      <rect x="10" y="10" width="60" height="40" rx="12" fill="#2e3a37" opacity="0.6" />
      {[{x:22,y:22,r:5},{x:35,y:18,r:4},{x:48,y:24,r:6},{x:58,y:18,r:4},{x:28,y:36,r:5},{x:42,y:38,r:4},{x:55,y:35,r:5}].map((c,i) => (
        <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="#4a6060" opacity="0.55" />
      ))}
    </svg>
  );
  if (type === "disproportion") return (
    <svg width="80" height="70" viewBox="0 0 80 70">
      {/* Small torso */}
      <rect x="28" y="4" width="24" height="22" rx="8" fill="#3a4a46" opacity="0.6" />
      {/* Large hips/thighs */}
      <ellipse cx="40" cy="44" rx="26" ry="14" fill="#f97316" opacity="0.55" />
      <ellipse cx="32" cy="58" rx="12" ry="9" fill="#f97316" opacity="0.45" />
      <ellipse cx="48" cy="58" rx="12" ry="9" fill="#f97316" opacity="0.45" />
      {/* Size arrows */}
      <line x1="10" y1="36" x2="10" y2="52" stroke="#ef4444" strokeWidth="1.5" />
      <line x1="6" y1="36" x2="14" y2="36" stroke="#ef4444" strokeWidth="1.5" />
      <line x1="6" y1="52" x2="14" y2="52" stroke="#ef4444" strokeWidth="1.5" />
    </svg>
  );
  if (type === "edema") return (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <path d="M28 5 Q33 5 36 9 L40 55 Q40 62 34 65 Q28 65 24 61 L20 12 Q22 5 28 5Z" fill="#2e3a37" opacity="0.6" />
      {/* Swelling overlay */}
      <path d="M26 38 Q38 35 40 55 Q40 62 34 65 Q28 65 24 61 L22 38 Q24 36 26 38Z" fill="#60a5fa" opacity="0.35" />
      {/* Droplets */}
      <text x="46" y="42" fontSize="14">💧</text>
      <text x="52" y="54" fontSize="10">💧</text>
    </svg>
  );
  if (type === "pain") return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      <ellipse cx="40" cy="30" rx="28" ry="22" fill="#fca5a5" opacity="0.4" />
      {/* Pain sparks */}
      {[{x:18,y:14},{x:55,y:10},{x:62,y:36},{x:14,y:42}].map((p,i) => (
        <g key={i}>
          <line x1={p.x} y1={p.y} x2={p.x+4} y2={p.y-6} stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={p.x} y1={p.y} x2={p.x+7} y2={p.y+2} stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={p.x} y1={p.y} x2={p.x-3} y2={p.y+5} stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      <text x="32" y="34" fontSize="16">⚡</text>
    </svg>
  );
  return null;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WelcomeGuide({ lang = "es", onEnter }) {
  const [section, setSection] = useState(0); // 0=hero, 1=types, 2=stages, 3=symptoms, 4=compare
  const c = CONTENT[lang] || CONTENT.es;
  const sections = ["hero","types","stages","symptoms"];
  const totalSections = sections.length;

  const S = {
    wrap: {
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      minHeight: "100vh",
      background: WC.bg,
      color: WC.cream,
      display: "flex",
      flexDirection: "column",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 20px 0",
    },
    logo: { fontSize: 15, fontWeight: 800, color: WC.sageLight, letterSpacing: "-0.5px" },
    skipBtn: {
      padding: "8px 16px",
      borderRadius: 20,
      border: `1.5px solid ${WC.border}`,
      background: WC.bgCard,
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      color: WC.creamMuted,
    },
    progress: {
      display: "flex",
      gap: 6,
      justifyContent: "center",
      padding: "14px 0 0",
    },
    dot: (active) => ({
      width: active ? 20 : 7,
      height: 7,
      borderRadius: 20,
      background: active ? WC.sage : WC.creamFaint,
      transition: "all 0.3s",
      cursor: "pointer",
    }),
    content: {
      flex: 1,
      overflowY: "auto",
      padding: "0 16px 120px",
      maxWidth: 600,
      margin: "0 auto",
      width: "100%",
    },
    h1: { fontSize: 22, fontWeight: 800, color: WC.cream, letterSpacing: "-0.5px", marginBottom: 10, marginTop: 20 },
    h2: { fontSize: 17, fontWeight: 700, color: WC.cream, letterSpacing: "-0.3px", marginBottom: 6, marginTop: 20 },
    sub: { fontSize: 13, color: WC.creamMuted, marginBottom: 16, lineHeight: 1.5 },
    card: {
      background: WC.bgCard,
      borderRadius: 14,
      padding: 18,
      marginBottom: 12,
      border: `1px solid ${WC.border}`,
    },
    navBar: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: WC.bgCard,
      borderTop: `1px solid ${WC.border}`,
      padding: "12px 20px",
      display: "flex",
      gap: 10,
      maxWidth: 600,
      margin: "0 auto",
    },
    btnPrev: {
      flex: 1,
      padding: "12px",
      borderRadius: 10,
      border: `1.5px solid ${WC.border}`,
      background: WC.bgInput,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
      color: WC.creamMuted,
    },
    btnNext: {
      flex: 2,
      padding: "12px",
      borderRadius: 10,
      border: "none",
      background: WC.sage,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 700,
      color: "#fff",
    },
  };

  const renderHero = () => (
    <>
      <div style={S.h1}>{c.hero.title}</div>
      {/* Hero visual - lipedema silhouette vs normal */}
      <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "10px 0 16px", background: WC.bgInput, borderRadius: 14, marginBottom: 16 }}>
        <div style={{ textAlign: "center" }}>
          <FemaleSilhouette highlighted={[]} />
          <div style={{ fontSize: 11, color: WC.creamMuted, marginTop: 4 }}>Sin lipedema</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <FemaleSilhouette highlighted={["hips","thighs","calves","arms"]} />
          <div style={{ fontSize: 11, color: "#f97316", fontWeight: 700, marginTop: 4 }}>Con lipedema</div>
        </div>
      </div>

      <p style={{ fontSize: 14, color: WC.cream, lineHeight: 1.7, marginBottom: 16 }}>{c.hero.intro}</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {c.hero.facts.map((f, i) => (
          <div key={i} style={{ background: WC.bgCard, borderRadius: 12, padding: "12px 14px", border: "1px solid #e5e7eb", display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 22 }}>{f.icon}</span>
            <span style={{ fontSize: 12, color: WC.cream, fontWeight: 500, lineHeight: 1.4 }}>{f.text}</span>
          </div>
        ))}
      </div>
    </>
  );

  const renderTypes = () => (
    <>
      <div style={S.h1}>{c.types.title}</div>
      <div style={S.sub}>{c.types.subtitle}</div>
      {/* All 5 silhouettes in a row */}
      <div style={{ background: WC.bgCard, borderRadius: 14, padding: "16px 8px", border: "1px solid #e5e7eb", marginBottom: 16, overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", minWidth: 320 }}>
          {c.types.list.map((tp) => (
            <FemaleSilhouette key={tp.num} highlighted={tp.zones} label={`Tipo ${tp.num}`} compact />
          ))}
        </div>
      </div>
      {/* Detail cards */}
      {c.types.list.map((tp) => (
        <div key={tp.num} style={S.card}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: WC.sage, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
              {tp.num}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: WC.cream, marginBottom: 4 }}>{tp.label}</div>
              <div style={{ fontSize: 13, color: WC.creamMuted, lineHeight: 1.5 }}>{tp.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  const renderStages = () => (
    <>
      <div style={S.h1}>{c.stages.title}</div>
      <div style={S.sub}>{c.stages.subtitle}</div>
      {c.stages.list.map((st, i) => (
        <div key={i} style={{ ...S.card, borderLeft: `4px solid ${st.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: st.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: st.textColor, flexShrink: 0 }}>
              {st.num}
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: WC.cream }}>{st.title}</div>
          </div>
          {/* Stage silhouette side by side with bullets */}
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <FemaleSilhouette
              highlighted={i === 0 ? ["hips"] : i === 1 ? ["hips","thighs"] : ["hips","thighs","calves","ankles"]}
              compact
            />
            <div style={{ flex: 1 }}>
              {st.bullets.map((b, j) => (
                <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{ color: st.textColor, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>·</span>
                  <span style={{ fontSize: 12, color: WC.cream, lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 10, padding: "8px 12px", background: st.color + "44", borderRadius: 8, fontSize: 12, color: st.textColor, fontWeight: 600 }}>
            💡 {st.tip}
          </div>
        </div>
      ))}
    </>
  );

  const renderSymptoms = () => (
    <>
      <div style={S.h1}>{c.symptoms.title}</div>
      <div style={S.sub}>{c.symptoms.subtitle}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {c.symptoms.list.map((s, i) => (
          <div key={i} style={{ ...S.card, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <SymptomVisual type={s.visual} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: WC.cream, marginBottom: 4, textAlign: "center" }}>
              {s.icon} {s.title}
            </div>
            <div style={{ fontSize: 11, color: WC.creamMuted, lineHeight: 1.5, textAlign: "center" }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </>
  );

  const renders = [renderHero, renderTypes, renderStages, renderSymptoms];
  const isLast = section === totalSections - 1;

  return (
    <div style={S.wrap}>
      {/* Top bar */}
      <div style={S.topBar}>
        <div style={S.logo}>🌿 Lipedema Tracker</div>
        <button style={S.skipBtn} onClick={onEnter}>{c.skip}</button>
      </div>

      {/* Progress dots */}
      <div style={S.progress}>
        {Array.from({ length: totalSections }).map((_, i) => (
          <div key={i} style={S.dot(i === section)} onClick={() => setSection(i)} />
        ))}
      </div>

      {/* Content */}
      <div style={S.content}>
        {renders[section]?.()}
      </div>

      {/* Bottom nav */}
      <div style={S.navBar}>
        {section > 0 && (
          <button style={S.btnPrev} onClick={() => setSection(s => s - 1)}>← Atrás</button>
        )}
        <button style={S.btnNext} onClick={() => isLast ? onEnter() : setSection(s => s + 1)}>
          {isLast ? c.skip : `Siguiente →`}
        </button>
      </div>
    </div>
  );
}
