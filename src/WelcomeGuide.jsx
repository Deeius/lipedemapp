import { useState } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const WC = {
  bg:        "#f0f5f2",   // fondo verde pálido
  bgCard:    "#ffffff",   // tarjetas blanco
  bgInput:   "#f7faf8",   // inputs blanco roto
  border:    "#d6e5dd",   // bordes sage suave
  sage:      "#4d8a6e",   // sage principal
  sageLight: "#3a6e57",   // sage texto
  cream:     "#1c2b24",   // texto principal
  creamMuted:"#5a7568",   // texto secundario
  creamFaint:"#e4eeea",   // superficies sutiles
  accent:    "#8a6c3a",   // dorado tierra
  danger:    "#b84040",   // error
};

// ─── FEMALE BODY OUTLINE SVG ─────────────────────────────────────────────────
// Uses anatomical outline paths. Zones highlighted with a gentle tinted overlay
// using the body's actual regions — not floating ellipses.
//
// Accessibility: body outline always #a8c4b8 (sage-cream, readable on dark bg)
// Affected zones: semi-opaque sage/warm fill + stroke, never saturated neon

function BodyOutline({ zones = [], compact = false }) {
  // Palette: accessible on dark — low saturation, warm tones
  const ZONE_FILL   = "rgba(138, 108, 58, 0.15)";    // warm amber tint — light mode
  const ZONE_STROKE = "rgba(138, 108, 58, 0.55)";    // amber border
  const BODY_FILL   = "rgba(77, 138, 110, 0.07)";    // faint sage fill
  const BODY_STROKE = "rgba(58, 110, 87, 0.45)";     // sage outline
  const HEAD_FILL   = "rgba(77, 138, 110, 0.10)";

  const s = compact ? 0.68 : 1;
  const W = 100 * s, H = 240 * s;

  // Zone clip regions as paths (viewBox 0 0 100 240)
  const zonePaths = {
    // Upper arms (both)
    arms: [
      "M14,52 Q8,54 7,68 Q7,80 12,84 Q17,80 18,68 Q18,54 14,52Z",
      "M86,52 Q92,54 93,68 Q93,80 88,84 Q83,80 82,68 Q82,54 86,52Z",
    ],
    // Hip/pelvis area
    hips: ["M30,108 Q32,100 50,98 Q68,100 70,108 Q72,120 66,126 Q50,130 34,126 Q28,120 30,108Z"],
    buttocks: ["M30,108 Q50,115 70,108 Q72,122 66,130 Q50,134 34,130 Q28,122 30,108Z"],
    // Thighs
    thighs: [
      "M30,126 Q34,124 42,124 Q46,126 46,148 Q46,164 42,168 Q36,166 30,160 Q28,148 30,126Z",
      "M70,126 Q66,124 58,124 Q54,126 54,148 Q54,164 58,168 Q64,166 70,160 Q72,148 70,126Z",
    ],
    // Calves
    calves: [
      "M30,170 Q34,168 42,168 Q44,170 44,188 Q44,200 40,204 Q35,202 30,196 Q28,186 30,170Z",
      "M70,170 Q66,168 58,168 Q56,170 56,188 Q56,200 60,204 Q65,202 70,196 Q72,186 70,170Z",
    ],
    // Ankles
    ankles: [
      "M30,198 Q36,202 42,200 Q44,206 42,212 Q36,214 30,210 Q28,204 30,198Z",
      "M70,198 Q64,202 58,200 Q56,206 58,212 Q64,214 70,210 Q72,204 70,198Z",
    ],
    abdomen: ["M33,88 Q50,84 67,88 Q70,98 68,108 Q50,112 32,108 Q30,98 33,88Z"],
  };

  const activeZones = zones.flatMap(z => zonePaths[z] || []);

  return (
    <svg width={W} height={H} viewBox="0 0 100 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── Body base fill ── */}
      {/* Head */}
      <ellipse cx="50" cy="13" rx="11" ry="12" fill={HEAD_FILL} stroke={BODY_STROKE} strokeWidth="1"/>
      {/* Neck */}
      <rect x="45" y="24" width="10" height="8" rx="2" fill={HEAD_FILL} stroke={BODY_STROKE} strokeWidth="0.8"/>
      {/* Torso */}
      <path d="M32,32 Q50,28 68,32 L70,88 Q50,92 30,88 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="1"/>
      {/* Upper arms */}
      <path d="M14,52 Q8,54 7,68 Q7,80 12,84 Q17,80 18,68 Q18,54 14,52Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.8"/>
      <path d="M86,52 Q92,54 93,68 Q93,80 88,84 Q83,80 82,68 Q82,54 86,52Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.8"/>
      {/* Forearms */}
      <path d="M11,86 Q7,88 6,100 Q6,110 10,112 Q15,110 16,100 Q16,88 11,86Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.7"/>
      <path d="M89,86 Q93,88 94,100 Q94,110 90,112 Q85,110 84,100 Q84,88 89,86Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.7"/>
      {/* Hands */}
      <ellipse cx="10" cy="117" rx="5" ry="6" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.7"/>
      <ellipse cx="90" cy="117" rx="5" ry="6" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.7"/>
      {/* Hip/pelvis block */}
      <path d="M30,88 Q50,92 70,88 L72,126 Q50,132 28,126 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="1"/>
      {/* Thighs */}
      <path d="M28,126 Q34,124 44,124 L44,170 Q36,172 28,168 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.9"/>
      <path d="M72,126 Q66,124 56,124 L56,170 Q64,172 72,168 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.9"/>
      {/* Knees */}
      <ellipse cx="36" cy="172" rx="9" ry="5" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.8"/>
      <ellipse cx="64" cy="172" rx="9" ry="5" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.8"/>
      {/* Calves */}
      <path d="M28,176 Q34,172 44,172 L44,204 Q37,208 28,202 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.9"/>
      <path d="M72,176 Q66,172 56,172 L56,204 Q63,208 72,202 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.9"/>
      {/* Ankles */}
      <path d="M28,202 Q34,206 44,204 L44,214 Q36,216 28,212 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.8"/>
      <path d="M72,202 Q66,206 56,204 L56,214 Q64,216 72,212 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.8"/>
      {/* Feet */}
      <path d="M24,212 Q30,216 44,214 Q46,220 42,222 Q32,222 24,218 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.8"/>
      <path d="M76,212 Q70,216 56,214 Q54,220 58,222 Q68,222 76,218 Z" fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="0.8"/>

      {/* ── Zone highlights — rendered on top ── */}
      {activeZones.map((d, i) => (
        <path key={i} d={d} fill={ZONE_FILL} stroke={ZONE_STROKE} strokeWidth="1.2"/>
      ))}
    </svg>
  );
}

// ─── SYMPTOM ILLUSTRATION SVG ─────────────────────────────────────────────────
// Clean line-art style, monochromatic + one accent color per symptom
// All on transparent bg, readable on dark

function SymptomIllustration({ type, accent = "#c5a97d" }) {
  const stroke = "#4d8a6e";  // body outline color
  const sw = 1.2;

  if (type === "bruising") return (
    <svg width="72" height="56" viewBox="0 0 72 56" fill="none">
      {/* Skin cross-section */}
      <rect x="4" y="4" width="64" height="48" rx="10" fill="rgba(168,196,184,0.07)" stroke={stroke} strokeWidth={sw}/>
      {/* Skin surface layer */}
      <rect x="4" y="4" width="64" height="10" rx="10" fill="rgba(77,138,110,0.1)" stroke="none"/>
      <line x1="4" y1="14" x2="68" y2="14" stroke={stroke} strokeWidth="0.5" strokeDasharray="3 2"/>
      {/* Bruise pools */}
      <ellipse cx="26" cy="32" rx="12" ry="8" fill={`${accent}33`} stroke={`${accent}88`} strokeWidth="1"/>
      <ellipse cx="26" cy="32" rx="6" ry="4" fill={`${accent}55`} stroke="none"/>
      <ellipse cx="50" cy="28" rx="8" ry="5" fill={`${accent}28`} stroke={`${accent}66`} strokeWidth="1"/>
      {/* Label */}
      <text x="36" y="50" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600">hematoma espontáneo</text>
    </svg>
  );

  if (type === "cuffing") return (
    <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
      {/* Leg outline */}
      <path d="M22,4 Q28,4 32,8 L34,54 Q34,62 28,66 Q22,66 18,62 L16,10 Q18,4 22,4Z"
        fill="rgba(168,196,184,0.07)" stroke={stroke} strokeWidth={sw}/>
      {/* Normal calf */}
      <path d="M16,14 Q22,12 34,16 L34,36 Q22,38 16,36Z"
        fill="rgba(168,196,184,0.1)" stroke="none"/>
      {/* Fat cuff accumulation — swollen area just above ankle */}
      <path d="M14,46 Q20,42 36,44 Q38,50 36,56 Q20,58 14,54 Z"
        fill={`${accent}35`} stroke={`${accent}80`} strokeWidth="1.2"/>
      {/* Foot — normal, no swelling */}
      <path d="M14,64 Q18,68 32,66 Q34,70 30,72 Q20,72 14,68Z"
        fill="rgba(168,196,184,0.07)" stroke={stroke} strokeWidth="0.9"/>
      {/* Arrow + label */}
      <line x1="44" y1="50" x2="38" y2="50" stroke={accent} strokeWidth="1.2" markerEnd="none"/>
      <polyline points="44,50 42,48 44,50 42,52" stroke={accent} strokeWidth="1.2" fill="none"/>
      <text x="46" y="46" fontSize="7" fill={accent} fontWeight="700">cuff</text>
      <text x="46" y="55" fontSize="6" fill={stroke}>↑ pie normal</text>
    </svg>
  );

  if (type === "nodules") return (
    <svg width="72" height="56" viewBox="0 0 72 56" fill="none">
      {/* Skin section */}
      <rect x="4" y="4" width="64" height="48" rx="10" fill="rgba(168,196,184,0.07)" stroke={stroke} strokeWidth={sw}/>
      <line x1="4" y1="16" x2="68" y2="16" stroke={stroke} strokeWidth="0.5" strokeDasharray="3 2"/>
      <text x="8" y="12" fontSize="6" fill={stroke}>piel</text>
      {/* Subcutaneous nodules */}
      {[{x:16,y:30,r:5},{x:28,y:26,r:4},{x:40,y:32,r:6},{x:52,y:27,r:4.5},{x:22,y:40,r:4},{x:46,y:42,r:5},{x:60,y:36,r:3.5}].map((n,i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={`${accent}30`} stroke={`${accent}75`} strokeWidth="1"/>
      ))}
      <text x="36" y="51" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600">nódulos subcutáneos</text>
    </svg>
  );

  if (type === "disproportion") return (
    <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
      {/* Torso — normal sized */}
      <rect x="28" y="4" width="24" height="22" rx="8" fill="rgba(168,196,184,0.1)" stroke={stroke} strokeWidth={sw}/>
      <text x="40" y="36" textAnchor="middle" fontSize="6" fill={stroke}>talla S</text>
      {/* Hip/leg area — much larger */}
      <path d="M14,38 Q20,36 40,35 Q60,36 66,38 Q70,50 64,58 Q52,62 40,62 Q28,62 16,58 Q10,50 14,38Z"
        fill={`${accent}22`} stroke={`${accent}70`} strokeWidth="1.2"/>
      <text x="40" y="68" textAnchor="middle" fontSize="6" fill={accent} fontWeight="600">talla XL–XXL</text>
      {/* Size markers */}
      <line x1="8" y1="4" x2="8" y2="26" stroke={stroke} strokeWidth="0.8"/>
      <line x1="4" y1="4" x2="12" y2="4" stroke={stroke} strokeWidth="0.8"/>
      <line x1="4" y1="26" x2="12" y2="26" stroke={stroke} strokeWidth="0.8"/>
      <line x1="4" y1="36" x2="4" y2="62" stroke={accent} strokeWidth="0.8"/>
      <line x1="0" y1="36" x2="8" y2="36" stroke={accent} strokeWidth="0.8"/>
      <line x1="0" y1="62" x2="8" y2="62" stroke={accent} strokeWidth="0.8"/>
    </svg>
  );

  if (type === "edema") return (
    <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
      {/* Leg outline — swollen at bottom */}
      <path d="M20,4 Q26,4 30,8 L34,48 Q36,58 30,64 Q24,68 18,64 Q12,58 12,48 L14,10 Q16,4 20,4Z"
        fill="rgba(168,196,184,0.07)" stroke={stroke} strokeWidth={sw}/>
      {/* Swelling overlay — lower leg */}
      <path d="M10,44 Q14,40 36,42 Q40,52 38,62 Q28,70 16,66 Q8,56 10,44Z"
        fill="rgba(77,138,110,0.12)" stroke="rgba(77,138,110,0.5)" strokeWidth="1"/>
      {/* Pitting fovea dot */}
      <circle cx="24" cy="56" r="3" fill="rgba(168,196,184,0.3)" stroke={stroke} strokeWidth="0.8"/>
      <text x="30" y="58" fontSize="6" fill={stroke}>fóvea</text>
      {/* Water drops */}
      <text x="44" y="34" fontSize="11">💧</text>
      <text x="50" y="46" fontSize="8">💧</text>
      <text x="42" y="52" fontSize="7">💧</text>
    </svg>
  );

  if (type === "pain") return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      {/* Hand pressing — simplified */}
      <path d="M20,20 Q36,16 52,20 Q56,30 54,44 Q36,50 18,44 Q14,30 20,20Z"
        fill="rgba(168,196,184,0.07)" stroke={stroke} strokeWidth={sw}/>
      {/* Pain radiation lines */}
      {[
        [36,32, 36,8],   // up
        [36,32, 58,20],  // top right
        [36,32, 60,36],  // right
        [36,32, 14,20],  // top left
        [36,32, 12,36],  // left
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={`${accent}90`} strokeWidth="1.2" strokeLinecap="round"
          strokeDasharray="2 2"/>
      ))}
      {/* Center pulse */}
      <circle cx="36" cy="32" r="7" fill={`${accent}25`} stroke={`${accent}80`} strokeWidth="1.2"/>
      <circle cx="36" cy="32" r="3" fill={`${accent}55`} stroke="none"/>
      <text x="36" y="62" textAnchor="middle" fontSize="7" fill={accent} fontWeight="600">dolor a la palpación</text>
    </svg>
  );

  return null;
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
            "Estos signos también pueden aparecer en los brazos (Tipo 4)",
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
            "En los brazos, los nódulos se palpan sobre todo en la zona del tríceps",
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
            "En brazos, los pliegues adiposos pueden limitar el movimiento del codo",
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
            "These signs can also appear in the arms (Type 4)",
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
            "In the arms, nodules are most noticeable in the triceps area",
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
            "In the arms, adipose folds may limit elbow movement",
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
      <line x1="50" y1="44" x2="44" y2="44" stroke="#e8e0d0" strokeWidth="1.5" />
      <text x="52" y="47" fontSize="8" fill="#e8e0d0" fontWeight="600">cuff</text>
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
export default function WelcomeGuide({ lang = "es", onEnter, isOverlay = false }) {
  const [section, setSection] = useState(0); // 0=hero, 1=types, 2=stages, 3=symptoms, 4=compare
  const c = CONTENT[lang] || CONTENT.es;
  const sections = ["hero","types","stages","symptoms"];
  const totalSections = sections.length;

  // Light card styles (replaces dark glassmorphism)
  const glass = (alpha = 0.06) => ({
    background: `rgba(77, 138, 110, ${alpha})`,
    border: `1px solid rgba(77, 138, 110, 0.18)`,
    borderRadius: 16,
  });
  const glassStrong = {
    background: "#ffffff",
    border: `1px solid ${WC.border}`,
    borderRadius: 16,
    boxShadow: "0 1px 6px rgba(58,110,87,0.07)",
  };

  const S = {
    wrap: {
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(160deg, #eaf2ee 0%, #f0f5f2 60%, #f5f8f4 100%)",
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

      {/* Hero — clean side-by-side body comparison */}
      <div style={{ ...glassStrong, padding: "20px 16px 16px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, alignItems: "flex-end" }}>
          {/* Left: no lipedema */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <BodyOutline zones={[]} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: WC.creamMuted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 2 }}>
                {lang === "es" ? "Sin lipedema" : "Without lipedema"}
              </div>
              <div style={{ fontSize: 10, color: WC.creamMuted, lineHeight: 1.4 }}>
                {lang === "es" ? "Distribución grasa uniforme" : "Uniform fat distribution"}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 200, background: "rgba(77,138,110,0.12)", alignSelf: "center" }} />

          {/* Right: lipedema */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <BodyOutline zones={["hips","thighs","calves","arms"]} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: WC.accent, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 2 }}>
                {lang === "es" ? "Con lipedema" : "With lipedema"}
              </div>
              <div style={{ fontSize: 10, color: WC.creamMuted, lineHeight: 1.4 }}>
                {lang === "es" ? "Acumulación simétrica en extremidades" : "Symmetrical accumulation in limbs"}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(77,138,110,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 14, height: 8, borderRadius: 3, background: "rgba(77,138,110,0.15)", border: "1px solid rgba(168,196,184,0.5)" }}/>
            <span style={{ fontSize: 10, color: WC.creamMuted }}>{lang === "es" ? "Tejido normal" : "Normal tissue"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 14, height: 8, borderRadius: 3, background: "rgba(138,108,58,0.18)", border: "1px solid rgba(138,108,58,0.6)" }}/>
            <span style={{ fontSize: 10, color: WC.creamMuted }}>{lang === "es" ? "Zona afectada" : "Affected zone"}</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: WC.creamMuted, lineHeight: 1.75, marginBottom: 18 }}>{c.hero.intro}</p>

      {/* Fact pills */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {c.hero.facts.map((f, i) => (
          <div key={i} style={{ ...glassStrong, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
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

      {/* 5 silhouettes — single glass strip, consistent amber highlights */}
      <div style={{ ...glassStrong, padding: "18px 12px 14px", marginBottom: 20, overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", minWidth: 320 }}>
          {c.types.list.map((tp) => (
            <div key={tp.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
              <BodyOutline zones={tp.zones} compact />
              <div style={{ fontSize: 10, fontWeight: 800, color: WC.accent, letterSpacing: "0.4px", textAlign: "center" }}>
                {lang === "es" ? `Tipo ${tp.num}` : `Type ${tp.num}`}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(77,138,110,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 12, height: 8, borderRadius: 2, background: "rgba(77,138,110,0.15)", border: "1px solid rgba(77,138,110,0.35)" }}/>
            <span style={{ fontSize: 10, color: WC.creamMuted }}>{lang === "es" ? "Normal" : "Normal"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 12, height: 8, borderRadius: 2, background: "rgba(138,108,58,0.18)", border: "1px solid rgba(138,108,58,0.6)" }}/>
            <span style={{ fontSize: 10, color: WC.creamMuted }}>{lang === "es" ? "Zona afectada" : "Affected zone"}</span>
          </div>
        </div>
      </div>

      {c.types.list.map((tp) => (
        <div key={tp.num} style={{ ...glassStrong, padding: "14px 16px", marginBottom: 10, borderLeft: "3px solid rgba(138,108,58,0.6)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(138,108,58,0.1)", border: "1.5px solid rgba(196,154,100,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: WC.accent, flexShrink: 0 }}>
              {tp.num}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: WC.cream, marginBottom: 3 }}>{tp.label}</div>
              <div style={{ fontSize: 12, color: WC.creamMuted, lineHeight: 1.5 }}>{tp.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

    const stageAccents = [WC.sage, WC.accent, "#c07070"];
  const renderStages = () => (
    <>
      <div style={S.h1}>{c.stages.title}</div>
      <div style={S.sub}>{c.stages.subtitle}</div>
      {c.stages.list.map((st, i) => (
        <div key={i} style={{
          ...glassStrong,
          marginBottom: 14,
          overflow: "hidden",
          borderTop: `3px solid ${stageAccents[i]}`,
        }}>
          {/* Header bar */}
          <div style={{ background: `${stageAccents[i]}18`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${stageAccents[i]}30`, border: `2px solid ${stageAccents[i]}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: stageAccents[i], flexShrink: 0 }}>
              {st.num}
            </div>
            <div style={{ fontWeight: 800, fontSize: 15, color: WC.cream }}>{st.title}</div>
          </div>
          {/* Body */}
          <div style={{ padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ background: `${stageAccents[i]}12`, border: `1px solid ${stageAccents[i]}30`, borderRadius: 12, padding: "8px 4px", flexShrink: 0 }}>
              <BodyOutline
                zones={i === 0 ? ["hips"] : i === 1 ? ["hips","thighs"] : ["hips","thighs","calves","ankles"]}
                compact
              />
            </div>
            <div style={{ flex: 1 }}>
              {st.bullets.map((b, j) => (
                <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 7 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: stageAccents[i], marginTop: 5, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: WC.cream, lineHeight: 1.55 }}>{b}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, padding: "8px 10px", background: `${stageAccents[i]}18`, border: `1px solid ${stageAccents[i]}30`, borderRadius: 8, fontSize: 11, color: stageAccents[i], fontWeight: 700, lineHeight: 1.4 }}>
                💡 {st.tip}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

    const symptomAccents = [WC.accent, WC.sage, WC.accent, WC.sage, WC.accent, WC.sage];
  const renderSymptoms = () => (
    <>
      <div style={S.h1}>{c.symptoms.title}</div>
      <div style={S.sub}>{c.symptoms.subtitle}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {c.symptoms.list.map((s, i) => (
          <div key={i} style={{
            ...glassStrong,
            display: "flex",
            gap: 14,
            padding: "14px 16px",
            alignItems: "center",
            borderLeft: `3px solid ${symptomAccents[i]}`,
          }}>
            {/* Visual + icon column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <div style={{ background: `${symptomAccents[i]}18`, border: `1px solid ${symptomAccents[i]}40`, borderRadius: 12, padding: "6px 8px" }}>
                <SymptomIllustration type={s.visual} accent={symptomAccents[i]} />
              </div>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: symptomAccents[i], marginBottom: 5, lineHeight: 1.3 }}>
                {s.title}
              </div>
              <div style={{ fontSize: 12, color: WC.creamMuted, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
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
        <button style={S.skipBtn} onClick={onEnter}>{isOverlay ? (lang === "es" ? "← Volver" : "← Back") : c.skip}</button>
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
          {isLast ? (isOverlay ? (lang === "es" ? "← Volver a la app" : "← Back to app") : c.skip) : `Siguiente →`}
        </button>
      </div>
    </div>
  );
}
