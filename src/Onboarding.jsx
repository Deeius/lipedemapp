import { useState, useEffect } from "react";

// ─── PALETTE (mirrors App.jsx C) ─────────────────────────────────────────────
const C = {
  bg: "#f0f5f2",
  bgCard: "#ffffff",
  bgInput: "#f7faf8",
  border: "#d6e5dd",
  sage: "#4d8a6e",
  sageDark: "#3a6e57",
  sageLight: "#3a6e57",
  cream: "#1c2b24",
  creamMuted: "#5a7568",
  creamFaint: "#e4eeea",
  accent: "#8a6c3a",
};

const STEPS_ES = [
  { id: "name", title: "¿Cómo te llamas?", sub: "Así personalizaremos tu experiencia." },
  {
    id: "language",
    title: "¿En qué idioma prefieres la app?",
    sub: "Puedes cambiarlo en cualquier momento.",
  },
  {
    id: "location",
    title: "¿Dónde estás?",
    sub: "Para mostrarte centros especializados cerca de ti.",
  },
  {
    id: "stage",
    title: "¿Conoces tu estadio?",
    sub: "No te preocupes si aún no tienes diagnóstico.",
  },
  {
    id: "compression",
    title: "¿Usas prendas de compresión?",
    sub: "Medias, manguitos o prendas de presoterapia.",
  },
  {
    id: "posture",
    title: "¿Cómo es tu jornada habitual?",
    sub: "La postura durante el día afecta mucho al lipedema.",
  },
];

const STEPS_EN = [
  { id: "name", title: "What's your name?", sub: "We'll use it to personalise your experience." },
  {
    id: "language",
    title: "Which language do you prefer?",
    sub: "You can change this at any time.",
  },
  { id: "location", title: "Where are you?", sub: "To show you specialist centres near you." },
  {
    id: "stage",
    title: "Do you know your stage?",
    sub: "Don't worry if you don't have a diagnosis yet.",
  },
  {
    id: "compression",
    title: "Do you use compression garments?",
    sub: "Stockings, sleeves or pressotherapy garments.",
  },
  {
    id: "posture",
    title: "What does your typical day look like?",
    sub: "Your daily posture has a big impact on lipedema.",
  },
];

const COUNTRIES_ES = [
  "Alemania",
  "Argentina",
  "Australia",
  "Austria",
  "Bélgica",
  "Bolivia",
  "Brasil",
  "Canadá",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "España",
  "Estados Unidos",
  "Francia",
  "Guatemala",
  "Honduras",
  "Irlanda",
  "Italia",
  "México",
  "Nicaragua",
  "Nueva Zelanda",
  "Países Bajos",
  "Panamá",
  "Paraguay",
  "Perú",
  "Portugal",
  "Puerto Rico",
  "Rep. Dominicana",
  "Reino Unido",
  "Suecia",
  "Suiza",
  "Uruguay",
  "Venezuela",
  "Otro",
];
const COUNTRIES_EN = [
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Bolivia",
  "Brazil",
  "Canada",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Dominican Rep.",
  "Ecuador",
  "El Salvador",
  "France",
  "Germany",
  "Guatemala",
  "Honduras",
  "Ireland",
  "Italy",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Panama",
  "Paraguay",
  "Peru",
  "Portugal",
  "Puerto Rico",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Venezuela",
  "Other",
];

const STAGES_ES = [
  { val: "unknown", label: "No lo sé todavía", desc: "Sin diagnóstico formal aún" },
  { val: "1", label: "Estadio I", desc: "Piel lisa, nódulos pequeños" },
  { val: "2", label: "Estadio II", desc: "Piel irregular, nódulos mayores" },
  { val: "3", label: "Estadio III", desc: "Deformación, pliegues adiposos" },
  {
    val: "suspected",
    label: "Sospecha sin confirmar",
    desc: "Síntomas pero sin diagnóstico oficial",
  },
];
const STAGES_EN = [
  { val: "unknown", label: "I don't know yet", desc: "No formal diagnosis yet" },
  { val: "1", label: "Stage I", desc: "Smooth skin, small nodules" },
  { val: "2", label: "Stage II", desc: "Irregular skin, larger nodules" },
  { val: "3", label: "Stage III", desc: "Deformity, adipose folds" },
  { val: "suspected", label: "Suspected, unconfirmed", desc: "Symptoms but no official diagnosis" },
];

// ─── ICON ────────────────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = C.sage }) {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const p = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const icons = {
    user: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    globe: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
      </svg>
    ),
    mappin: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    activity: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    check: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    arrow: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    layers: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    briefcase: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="12" strokeWidth="2" />
      </svg>
    ),
  };
  return icons[name] || null;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Onboarding({ initialLang = "es", onComplete }) {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState(initialLang);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [stage, setStage] = useState("unknown");
  const [compression, setCompression] = useState(""); // none | occasional | daily | prescribed
  const [posture, setPosture] = useState([]); // standing | sitting | mixed | active | sedentary
  const [locLoading, setLocLoading] = useState(false);
  const [locDetected, setLocDetected] = useState(false);

  const steps = lang === "es" ? STEPS_ES : STEPS_EN;
  const total = steps.length;
  const current = steps[step];
  const countries = lang === "es" ? COUNTRIES_ES : COUNTRIES_EN;
  const stages = lang === "es" ? STAGES_ES : STAGES_EN;

  // Auto-detect location via browser geolocation + reverse geocode
  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=${lang}`
          );
          const data = await res.json();
          const addr = data.address || {};
          const detectedCountry = addr.country || "";
          const detectedRegion = addr.state || addr.county || "";
          setCountry(detectedCountry);
          setRegion(detectedRegion);
          setLocDetected(true);
        } catch {
          /* silent fail */
        } finally {
          setLocLoading(false);
        }
      },
      () => setLocLoading(false),
      { timeout: 6000 }
    );
  };

  const canAdvance = () => {
    if (current.id === "name") return name.trim().length >= 2;
    if (current.id === "language") return true;
    if (current.id === "location") return true;
    if (current.id === "stage") return true;
    if (current.id === "compression") return compression !== "";
    if (current.id === "posture") return posture.length > 0;
    return true;
  };

  const handleComplete = () => {
    onComplete({ name: name.trim(), lang, country, region, stage, compression, posture });
  };

  const advance = () => {
    if (step < total - 1) setStep((s) => s + 1);
    else handleComplete();
  };

  const isLast = step === total - 1;

  // ── STYLES ────────────────────────────────────────────────────────────────
  const S = {
    wrap: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #eaf2ee 0%, #f0f5f2 60%, #f5f8f4 100%)",
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 20px 40px",
      color: C.cream,
    },
    card: {
      background: C.bgCard,
      borderRadius: 24,
      padding: "36px 32px 32px",
      width: "100%",
      maxWidth: 440,
      boxShadow: "0 4px 32px rgba(58,110,87,0.10)",
      border: `1px solid ${C.border}`,
    },
    progress: {
      display: "flex",
      gap: 6,
      marginBottom: 32,
    },
    dot: (active, done) => ({
      height: 4,
      borderRadius: 4,
      flex: done || active ? 2 : 1,
      background: done ? C.sage : active ? C.sage : C.border,
      opacity: done ? 0.5 : 1,
      transition: "all 0.3s",
    }),
    stepIcon: {
      width: 48,
      height: 48,
      borderRadius: 16,
      background: C.creamFaint,
      border: `1.5px solid ${C.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    h1: {
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: "-0.5px",
      marginBottom: 6,
      lineHeight: 1.2,
    },
    sub: { fontSize: 14, color: C.creamMuted, marginBottom: 28, lineHeight: 1.5 },
    input: {
      width: "100%",
      padding: "13px 16px",
      borderRadius: 12,
      border: `1.5px solid ${C.border}`,
      fontSize: 15,
      fontFamily: "inherit",
      color: C.cream,
      background: C.bgInput,
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.2s",
      marginBottom: 8,
    },
    select: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: 12,
      border: `1.5px solid ${C.border}`,
      fontSize: 14,
      fontFamily: "inherit",
      color: C.cream,
      background: C.bgInput,
      outline: "none",
      boxSizing: "border-box",
      cursor: "pointer",
      marginBottom: 8,
    },
    btnPrimary: {
      width: "100%",
      padding: "14px",
      borderRadius: 12,
      border: "none",
      background: canAdvance() ? C.sage : C.border,
      color: canAdvance() ? "#fff" : C.creamMuted,
      fontSize: 15,
      fontWeight: 700,
      cursor: canAdvance() ? "pointer" : "default",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      transition: "background 0.2s",
      marginTop: 24,
      fontFamily: "inherit",
    },
    btnSecondary: {
      background: "none",
      border: "none",
      color: C.creamMuted,
      fontSize: 13,
      cursor: "pointer",
      padding: "8px 0",
      fontFamily: "inherit",
      fontWeight: 500,
    },
    langBtn: (active) => ({
      flex: 1,
      padding: "12px",
      borderRadius: 12,
      border: `2px solid ${active ? C.sage : C.border}`,
      background: active ? C.creamFaint : "white",
      color: active ? C.sage : C.creamMuted,
      fontSize: 14,
      fontWeight: active ? 800 : 500,
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all 0.15s",
    }),
    stageCard: (active) => ({
      padding: "12px 14px",
      borderRadius: 12,
      border: `2px solid ${active ? C.sage : C.border}`,
      background: active ? C.creamFaint : "white",
      cursor: "pointer",
      transition: "all 0.15s",
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      gap: 12,
    }),
    locBtn: {
      width: "100%",
      padding: "11px 16px",
      borderRadius: 12,
      border: `1.5px solid ${C.border}`,
      background: "white",
      color: C.sage,
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginBottom: 12,
      transition: "border-color 0.2s",
    },
  };

  const stepIcons = {
    name: "user",
    language: "globe",
    location: "mappin",
    stage: "activity",
    compression: "layers",
    posture: "briefcase",
  };

  return (
    <div style={S.wrap}>
      <div style={S.card}>
        {/* Progress bar */}
        <div style={S.progress}>
          {steps.map((_, i) => (
            <div key={i} style={S.dot(i === step, i < step)} />
          ))}
        </div>

        {/* Step icon */}
        <div style={S.stepIcon}>
          <Icon name={stepIcons[current.id]} size={22} color={C.sage} />
        </div>

        <h2 style={S.h1}>{current.title}</h2>
        <p style={S.sub}>{current.sub}</p>

        {/* ── STEP: NAME ── */}
        {current.id === "name" && (
          <div>
            <input
              style={S.input}
              placeholder={lang === "es" ? "Tu nombre o apodo…" : "Your name or nickname…"}
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canAdvance() && advance()}
            />
            <div style={{ fontSize: 11, color: C.creamMuted }}>
              {lang === "es" ? "Mínimo 2 caracteres" : "At least 2 characters"}
            </div>
          </div>
        )}

        {/* ── STEP: LANGUAGE ── */}
        {current.id === "language" && (
          <div style={{ display: "flex", gap: 10 }}>
            <button style={S.langBtn(lang === "es")} onClick={() => setLang("es")}>
              🇪🇸 Español
            </button>
            <button style={S.langBtn(lang === "en")} onClick={() => setLang("en")}>
              🇬🇧 English
            </button>
          </div>
        )}

        {/* ── STEP: LOCATION ── */}
        {current.id === "location" && (
          <div>
            {!locDetected ? (
              <button style={S.locBtn} onClick={detectLocation} disabled={locLoading}>
                <Icon name="mappin" size={16} color={C.sage} />
                {locLoading
                  ? lang === "es"
                    ? "Detectando…"
                    : "Detecting…"
                  : lang === "es"
                    ? "Detectar mi ubicación automáticamente"
                    : "Detect my location automatically"}
              </button>
            ) : (
              <div
                style={{
                  background: C.creamFaint,
                  borderRadius: 12,
                  padding: "12px 14px",
                  marginBottom: 12,
                  border: `1.5px solid ${C.sage}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Icon name="check" size={16} color={C.sage} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.cream }}>
                    {region && `${region}, `}
                    {country}
                  </div>
                  <button
                    style={{ ...S.btnSecondary, padding: 0, fontSize: 11 }}
                    onClick={() => {
                      setLocDetected(false);
                      setCountry("");
                      setRegion("");
                    }}
                  >
                    {lang === "es" ? "Cambiar" : "Change"}
                  </button>
                </div>
              </div>
            )}

            {/* Manual selector */}
            {!locDetected && (
              <>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.creamMuted,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {lang === "es" ? "O elige manualmente" : "Or choose manually"}
                </div>
                <select
                  style={S.select}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">
                    {lang === "es" ? "— Selecciona país —" : "— Select country —"}
                  </option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {country && (
                  <input
                    style={S.input}
                    placeholder={
                      lang === "es" ? "Provincia o ciudad (opcional)" : "Region or city (optional)"
                    }
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                )}
              </>
            )}

            <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 4 }}>
              {lang === "es"
                ? "Solo se usa para filtrar centros. No la compartimos con nadie."
                : "Only used to filter centres. We never share it."}
            </div>
          </div>
        )}

        {/* ── STEP: STAGE ── */}
        {current.id === "stage" && (
          <div>
            {stages.map((s) => (
              <div key={s.val} style={S.stageCard(stage === s.val)} onClick={() => setStage(s.val)}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: `2px solid ${stage === s.val ? C.sage : C.border}`,
                    background: stage === s.val ? C.sage : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {stage === s.val && <Icon name="check" size={11} color="#fff" />}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: stage === s.val ? C.sage : C.cream,
                    }}
                  >
                    {s.label}
                  </div>
                  <div style={{ fontSize: 11, color: C.creamMuted }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── STEP: COMPRESSION ── */}
        {current.id === "compression" &&
          (() => {
            const opts =
              lang === "es"
                ? [
                    {
                      val: "none",
                      label: "No uso compresión",
                      desc: "No llevo ninguna prenda compresiva",
                      icon: "🚫",
                    },
                    {
                      val: "occasional",
                      label: "Ocasionalmente",
                      desc: "Solo en viajes largos o días de mucho esfuerzo",
                      icon: "🔄",
                    },
                    {
                      val: "daily",
                      label: "A diario (por iniciativa propia)",
                      desc: "Me lo pongo habitualmente por mi cuenta",
                      icon: "📅",
                    },
                    {
                      val: "prescribed",
                      label: "A diario (pautado por médico)",
                      desc: "Llevo prescripción médica de compresión",
                      icon: "🩺",
                    },
                  ]
                : [
                    {
                      val: "none",
                      label: "I don't use compression",
                      desc: "I don't wear any compression garment",
                      icon: "🚫",
                    },
                    {
                      val: "occasional",
                      label: "Occasionally",
                      desc: "Only on long trips or intense activity",
                      icon: "🔄",
                    },
                    {
                      val: "daily",
                      label: "Daily (my own choice)",
                      desc: "I wear it regularly on my own initiative",
                      icon: "📅",
                    },
                    {
                      val: "prescribed",
                      label: "Daily (doctor prescribed)",
                      desc: "I have a medical prescription for compression",
                      icon: "🩺",
                    },
                  ];
            return (
              <div>
                {opts.map((o) => (
                  <div
                    key={o.val}
                    style={S.stageCard(compression === o.val)}
                    onClick={() => setCompression(o.val)}
                  >
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{o.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: compression === o.val ? C.sage : C.cream,
                        }}
                      >
                        {o.label}
                      </div>
                      <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 1 }}>
                        {o.desc}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: `2px solid ${compression === o.val ? C.sage : C.border}`,
                        background: compression === o.val ? C.sage : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {compression === o.val && <Icon name="check" size={10} color="#fff" />}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

        {/* ── STEP: POSTURE / ACTIVITY ── */}
        {current.id === "posture" &&
          (() => {
            const opts =
              lang === "es"
                ? [
                    {
                      val: "standing",
                      label: "De pie la mayor parte del día",
                      desc: "Trabajas o estudias principalmente en bipedestación",
                      icon: "🧍",
                    },
                    {
                      val: "sitting",
                      label: "Sentada la mayor parte del día",
                      desc: "Oficina, estudio, trabajo remoto…",
                      icon: "🪑",
                    },
                    {
                      val: "mixed",
                      label: "Combinación de pie y sentada",
                      desc: "Alternas posiciones a lo largo del día",
                      icon: "🔀",
                    },
                    {
                      val: "active",
                      label: "Trabajo físicamente activo",
                      desc: "Movimiento constante, carga física, desplazamientos",
                      icon: "🏃",
                    },
                    {
                      val: "sedentary",
                      label: "Poco movimiento general",
                      desc: "Paso muchas horas sin levantarme ni caminar",
                      icon: "🛋️",
                    },
                  ]
                : [
                    {
                      val: "standing",
                      label: "Standing most of the day",
                      desc: "You work or study mainly on your feet",
                      icon: "🧍",
                    },
                    {
                      val: "sitting",
                      label: "Sitting most of the day",
                      desc: "Office, study, remote work…",
                      icon: "🪑",
                    },
                    {
                      val: "mixed",
                      label: "Mix of standing and sitting",
                      desc: "You alternate positions throughout the day",
                      icon: "🔀",
                    },
                    {
                      val: "active",
                      label: "Physically active work",
                      desc: "Constant movement, physical effort, commuting",
                      icon: "🏃",
                    },
                    {
                      val: "sedentary",
                      label: "Generally low movement",
                      desc: "I spend many hours without getting up or walking",
                      icon: "🛋️",
                    },
                  ];
            const toggle = (val) =>
              setPosture((p) => (p.includes(val) ? p.filter((x) => x !== val) : [...p, val]));
            return (
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.creamMuted,
                    marginBottom: 10,
                    fontStyle: "italic",
                  }}
                >
                  {lang === "es"
                    ? "Puedes seleccionar varias opciones"
                    : "You can select multiple options"}
                </div>
                {opts.map((o) => {
                  const active = posture.includes(o.val);
                  return (
                    <div key={o.val} style={S.stageCard(active)} onClick={() => toggle(o.val)}>
                      <span style={{ fontSize: 22, flexShrink: 0 }}>{o.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: active ? C.sage : C.cream,
                          }}
                        >
                          {o.label}
                        </div>
                        <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 1 }}>
                          {o.desc}
                        </div>
                      </div>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 5,
                          border: `2px solid ${active ? C.sage : C.border}`,
                          background: active ? C.sage : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {active && <Icon name="check" size={10} color="#fff" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

        {/* CTA */}
        <button style={S.btnPrimary} onClick={advance} disabled={!canAdvance()}>
          {isLast
            ? lang === "es"
              ? `Empezar, ${name || ""}`
              : `Let's go, ${name || ""}`
            : lang === "es"
              ? "Siguiente"
              : "Next"}
          {!isLast && <Icon name="arrow" size={16} color={canAdvance() ? "#fff" : C.creamMuted} />}
        </button>

        {/* Skip step (location only) */}
        {current.id === "location" && (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button style={S.btnSecondary} onClick={advance}>
              {lang === "es" ? "Omitir por ahora" : "Skip for now"}
            </button>
          </div>
        )}

        {/* Step counter */}
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: C.creamMuted }}>
          {step + 1} / {total}
        </div>
      </div>

      {/* Branding below card */}
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, opacity: 0.5 }}>
        <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" fill="#e4eeea" stroke="#d6e5dd" strokeWidth="1" />
          <path
            d="M14 6 Q20 10 20 16 Q20 21 14 22 Q8 21 8 16 Q8 10 14 6Z"
            fill="none"
            stroke="#4d8a6e"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <line
            x1="14"
            y1="6"
            x2="14"
            y2="22"
            stroke="#4d8a6e"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </svg>
        <span style={{ fontSize: 12, color: C.creamMuted, fontFamily: "'DM Sans',sans-serif" }}>
          lipedema <span style={{ fontWeight: 300 }}>tracker</span>
        </span>
      </div>
    </div>
  );
}
