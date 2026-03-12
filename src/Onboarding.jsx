import { useState } from "react";
import { supabase } from "./lib/supabase";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#f0f5f2",
  bgCard: "#ffffff",
  bgInput: "#f7faf8",
  border: "#d6e5dd",
  sage: "#4d8a6e",
  sageDark: "#3a6e57",
  cream: "#1c2b24",
  creamMuted: "#5a7568",
  creamFaint: "#e4eeea",
  accent: "#8a6c3a",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const STEPS_ES = [
  { id: "name", title: "¿Cómo te llamas?", sub: "Así personalizaremos tu experiencia." },
  { id: "language", title: "¿En qué idioma prefieres la app?", sub: "Puedes cambiarlo en cualquier momento." },
  { id: "location", title: "¿Dónde estás?", sub: "Para mostrarte centros especializados cerca de ti." },
  { id: "stage", title: "¿Conoces tu estadio?", sub: "No te preocupes si aún no tienes diagnóstico." },
  { id: "compression", title: "¿Usas prendas de compresión?", sub: "Medias, manguitos o prendas de presoterapia." },
  { id: "posture", title: "¿Cómo es tu jornada habitual?", sub: "La postura durante el día afecta mucho al lipedema." },
  { id: "lipedema_type", title: "¿Cuál es tu tipo de lipedema?", sub: "Selecciona el que mejor describe tu caso. Lo guardaremos en tu perfil." },
];

const STEPS_EN = [
  { id: "name", title: "What's your name?", sub: "We'll use it to personalise your experience." },
  { id: "language", title: "Which language do you prefer?", sub: "You can change this at any time." },
  { id: "location", title: "Where are you?", sub: "To show you specialist centres near you." },
  { id: "stage", title: "Do you know your stage?", sub: "Don't worry if you don't have a diagnosis yet." },
  { id: "compression", title: "Do you use compression garments?", sub: "Stockings, sleeves or pressotherapy garments." },
  { id: "posture", title: "What does your typical day look like?", sub: "Your daily posture has a big impact on lipedema." },
  { id: "lipedema_type", title: "What type of lipedema do you have?", sub: "Select the one that best describes your case. We'll save it to your profile." },
];

const COUNTRIES_ES = ["España","México","Argentina","Colombia","Chile","Perú","Venezuela","Ecuador","Bolivia","Uruguay","Paraguay","Guatemala","Honduras","El Salvador","Nicaragua","Costa Rica","Panamá","Cuba","Rep. Dominicana","Puerto Rico","Otro"];
const COUNTRIES_EN = ["Spain","Mexico","Argentina","Colombia","Chile","Peru","Venezuela","Ecuador","Bolivia","Uruguay","Paraguay","Guatemala","Honduras","El Salvador","Nicaragua","Costa Rica","Panama","Cuba","Dominican Rep.","Puerto Rico","Other"];

const STAGES_ES = [
  { val: "unknown", label: "No lo sé todavía", desc: "Sin diagnóstico formal aún" },
  { val: "1", label: "Estadio I", desc: "Piel lisa, nódulos pequeños" },
  { val: "2", label: "Estadio II", desc: "Piel irregular, nódulos mayores" },
  { val: "3", label: "Estadio III", desc: "Deformación, pliegues adiposos" },
  { val: "suspected", label: "Sospecha sin confirmar", desc: "Síntomas pero sin diagnóstico oficial" },
];
const STAGES_EN = [
  { val: "unknown", label: "I don't know yet", desc: "No formal diagnosis yet" },
  { val: "1", label: "Stage I", desc: "Smooth skin, small nodules" },
  { val: "2", label: "Stage II", desc: "Irregular skin, larger nodules" },
  { val: "3", label: "Stage III", desc: "Deformity, adipose folds" },
  { val: "suspected", label: "Suspected, unconfirmed", desc: "Symptoms but no official diagnosis" },
];

const LIPEDEMA_TYPES_ES = [
  {
    val: "type1",
    emoji: "🦵",
    label: "Tipo I — Caderas y glúteos",
    desc: "Acumulación en zona de cadera, glúteos y parte superior de muslos. El más frecuente.",
    color: "#f0f9f4",
    border: "#4d8a6e",
  },
  {
    val: "type2",
    emoji: "🦿",
    label: "Tipo II — Muslos y rodillas",
    desc: "Desde caderas hasta rodillas. Puede haber acumulación interna en la rodilla.",
    color: "#f5f0f9",
    border: "#8a6c3a",
  },
  {
    val: "type3",
    emoji: "🦶",
    label: "Tipo III — Caderas hasta tobillos",
    desc: "Afecta toda la pierna desde cadera hasta tobillo. El pie no suele estar afectado.",
    color: "#f9f5f0",
    border: "#8a4d6e",
  },
  {
    val: "type4",
    emoji: "💪",
    label: "Tipo IV — Incluye brazos",
    desc: "Lipedema en brazos (desde hombros hasta muñecas) junto con piernas.",
    color: "#f0f5f9",
    border: "#4d6e8a",
  },
  {
    val: "type5",
    emoji: "🦵🦿",
    label: "Tipo V — Solo pantorrillas y pies",
    desc: "Afectación de la parte inferior de la pierna incluyendo el pie. Menos frecuente.",
    color: "#f9f0f5",
    border: "#6e4d8a",
  },
  {
    val: "unknown",
    emoji: "❓",
    label: "No lo sé todavía",
    desc: "Aún no he recibido información sobre mi tipo específico.",
    color: "#f5f5f5",
    border: "#d6e5dd",
  },
];

const LIPEDEMA_TYPES_EN = [
  {
    val: "type1",
    emoji: "🦵",
    label: "Type I — Hips and buttocks",
    desc: "Accumulation in hips, buttocks and upper thighs. The most common type.",
    color: "#f0f9f4",
    border: "#4d8a6e",
  },
  {
    val: "type2",
    emoji: "🦿",
    label: "Type II — Thighs and knees",
    desc: "From hips to knees. May include inner knee accumulation.",
    color: "#f5f0f9",
    border: "#8a6c3a",
  },
  {
    val: "type3",
    emoji: "🦶",
    label: "Type III — Hips to ankles",
    desc: "Affects the entire leg from hip to ankle. Feet usually unaffected.",
    color: "#f9f5f0",
    border: "#8a4d6e",
  },
  {
    val: "type4",
    emoji: "💪",
    label: "Type IV — Includes arms",
    desc: "Lipedema in arms (shoulder to wrist) along with legs.",
    color: "#f0f5f9",
    border: "#4d6e8a",
  },
  {
    val: "type5",
    emoji: "🦵🦿",
    label: "Type V — Lower legs and feet",
    desc: "Affects lower legs including feet. Less common.",
    color: "#f9f0f5",
    border: "#6e4d8a",
  },
  {
    val: "unknown",
    emoji: "❓",
    label: "I don't know yet",
    desc: "I haven't received information about my specific type.",
    color: "#f5f5f5",
    border: "#d6e5dd",
  },
];

// ─── ICON ─────────────────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = C.sage }) {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const p = { fill: "none", stroke: color, strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    user: <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>,
    globe: <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" /></svg>,
    mappin: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>,
    activity: <svg style={s} viewBox="0 0 24 24" {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    check: <svg style={s} viewBox="0 0 24 24" {...p}><polyline points="20 6 9 17 4 12" /></svg>,
    arrow: <svg style={s} viewBox="0 0 24 24" {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    layers: <svg style={s} viewBox="0 0 24 24" {...p}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
    briefcase: <svg style={s} viewBox="0 0 24 24" {...p}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>,
    mail: <svg style={s} viewBox="0 0 24 24" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" /></svg>,
    sparkles: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>,
  };
  return icons[name] || null;
}

// ─── LOGO ────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" fill="#e4eeea" stroke="#d6e5dd" strokeWidth="1" />
        <path d="M14 6 Q20 10 20 16 Q20 21 14 22 Q8 21 8 16 Q8 10 14 6Z" fill="none" stroke="#4d8a6e" strokeWidth="1.4" strokeLinejoin="round" />
        <line x1="14" y1="6" x2="14" y2="22" stroke="#4d8a6e" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 15, fontWeight: 700, color: C.creamMuted, fontFamily: "'DM Sans',sans-serif" }}>
        lipedema <span style={{ fontWeight: 300 }}>tracker</span>
      </span>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Onboarding({ initialLang = "es", onComplete, loginWithGoogle }) {
  // auth screen state
  const [screen, setScreen] = useState("story");
  const [storySlide, setStorySlide] = useState(0);
  const [email, setEmail] = useState("");
  const [magicSent, setMagicSent] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicError, setMagicError] = useState("");

  // profile steps state
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState(initialLang);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [stage, setStage] = useState("unknown");
  const [compression, setCompression] = useState("");
  const [posture, setPosture] = useState([]);
  const [lipedemaType, setLipedemaType] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [locDetected, setLocDetected] = useState(false);

  const steps = lang === "es" ? STEPS_ES : STEPS_EN;
  const total = steps.length;
  const current = steps[step];
  const countries = lang === "es" ? COUNTRIES_ES : COUNTRIES_EN;
  const stages = lang === "es" ? STAGES_ES : STAGES_EN;
  const lipedemaTypes = lang === "es" ? LIPEDEMA_TYPES_ES : LIPEDEMA_TYPES_EN;

  // ── Location ──
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
          setCountry(addr.country || "");
          setRegion(addr.state || addr.county || "");
          setLocDetected(true);
        } catch {
          /* silent */
        } finally {
          setLocLoading(false);
        }
      },
      () => setLocLoading(false),
      { timeout: 6000 }
    );
  };

  // ── Magic link ──
  const sendMagicLink = async () => {
    if (!email.trim()) return;
    setMagicLoading(true);
    setMagicError("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) {
      setMagicError(lang === "es" ? "Error al enviar el email. Inténtalo de nuevo." : "Error sending email. Please try again.");
    } else {
      setMagicSent(true);
    }
    setMagicLoading(false);
  };

  // ── Navigation ──
  const canAdvance = () => {
    if (current.id === "name") return name.trim().length >= 2;
    if (current.id === "language") return true;
    if (current.id === "location") return true;
    if (current.id === "stage") return true;
    if (current.id === "compression") return compression !== "";
    if (current.id === "posture") return posture.length > 0;
    if (current.id === "lipedema_type") return lipedemaType !== "";
    return true;
  };

  const handleComplete = () => {
    onComplete({ name: name.trim(), lang, country, region, stage, compression, posture, lipedemaType });
  };

  const advance = () => {
    if (step < total - 1) setStep((s) => s + 1);
    else handleComplete();
  };

  const isLast = step === total - 1;

  // ── Styles ──
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
    progress: { display: "flex", gap: 6, marginBottom: 32 },
    dot: (active, done) => ({
      height: 4,
      borderRadius: 4,
      flex: done || active ? 2 : 1,
      background: done ? C.sage : active ? C.sage : C.border,
      opacity: done ? 0.5 : 1,
      transition: "all 0.3s",
    }),
    stepIcon: {
      width: 48, height: 48, borderRadius: 16,
      background: C.creamFaint, border: `1.5px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      marginBottom: 20,
    },
    h1: { fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2 },
    sub: { fontSize: 14, color: C.creamMuted, marginBottom: 28, lineHeight: 1.5 },
    input: {
      width: "100%", padding: "13px 16px", borderRadius: 12,
      border: `1.5px solid ${C.border}`, fontSize: 15,
      fontFamily: "inherit", color: C.cream, background: C.bgInput,
      outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", marginBottom: 8,
    },
    select: {
      width: "100%", padding: "12px 16px", borderRadius: 12,
      border: `1.5px solid ${C.border}`, fontSize: 14,
      fontFamily: "inherit", color: C.cream, background: C.bgInput,
      outline: "none", boxSizing: "border-box", cursor: "pointer", marginBottom: 8,
    },
    btnPrimary: {
      width: "100%", padding: "14px", borderRadius: 12, border: "none",
      background: canAdvance() ? C.sage : C.border,
      color: canAdvance() ? "#fff" : C.creamMuted,
      fontSize: 15, fontWeight: 700,
      cursor: canAdvance() ? "pointer" : "default",
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 8, transition: "background 0.2s", marginTop: 24, fontFamily: "inherit",
    },
    btnSecondary: {
      background: "none", border: "none", color: C.creamMuted,
      fontSize: 13, cursor: "pointer", padding: "8px 0",
      fontFamily: "inherit", fontWeight: 500,
    },
    langBtn: (active) => ({
      flex: 1, padding: "12px", borderRadius: 12,
      border: `2px solid ${active ? C.sage : C.border}`,
      background: active ? C.creamFaint : "white",
      color: active ? C.sage : C.creamMuted,
      fontSize: 14, fontWeight: active ? 800 : 500,
      cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
    }),
    stageCard: (active) => ({
      padding: "12px 14px", borderRadius: 12,
      border: `2px solid ${active ? C.sage : C.border}`,
      background: active ? C.creamFaint : "white",
      cursor: "pointer", transition: "all 0.15s", marginBottom: 8,
      display: "flex", alignItems: "center", gap: 12,
    }),
    locBtn: {
      width: "100%", padding: "11px 16px", borderRadius: 12,
      border: `1.5px solid ${C.border}`, background: "white",
      color: C.sage, fontSize: 13, fontWeight: 700,
      cursor: "pointer", fontFamily: "inherit",
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 8, marginBottom: 12, transition: "border-color 0.2s",
    },
  };

  const stepIcons = {
    name: "user", language: "globe", location: "mappin",
    stage: "activity", compression: "layers", posture: "briefcase", lipedema_type: "sparkles",
  };

  // ────────────────────────────────────────────────────────────────────────────
  // SCREEN: STORY (intro slideshow)
  // ────────────────────────────────────────────────────────────────────────────
  if (screen === "story") {
    const slides_es = [
      {
        emoji: "🔬",
        stat: "Reconocida por la OMS en 2018",
        text: "Durante décadas, el lipedema fue confundido con obesidad o linfedema. Hoy por fin tiene nombre propio.",
      },
      {
        emoji: "👩",
        stat: "Afecta al 11% de las mujeres",
        text: "Es más común de lo que parece, pero pocas reciben un diagnóstico a tiempo. Muchas tardan años en saber qué les pasa.",
      },
      {
        emoji: "💧",
        stat: "Dolor, inflamación, fatiga",
        text: "No es solo estética. El lipedema duele, cansa y afecta a la vida cotidiana de formas que solo quien lo vive entiende de verdad.",
      },
      {
        emoji: "📊",
        stat: "Cada caso es único",
        text: "No existe un lipedema igual a otro. Llevar un seguimiento personalizado es una de las cosas más útiles que puedes hacer.",
      },
      {
        emoji: "🌿",
        stat: "Estás en el lugar correcto",
        text: "Lipedema Tracker nació para ayudarte a entender tu cuerpo, seguir tus síntomas y tomar el control de tu bienestar.",
        cta: true,
      },
    ];
    const slides_en = [
      {
        emoji: "🔬",
        stat: "Recognised by the WHO in 2018",
        text: "For decades, lipedema was confused with obesity or lymphoedema. Today it finally has its own name.",
      },
      {
        emoji: "👩",
        stat: "Affects 11% of women",
        text: "It's more common than it seems, but few receive a timely diagnosis. Many spend years not knowing what's happening to them.",
      },
      {
        emoji: "💧",
        stat: "Pain, inflammation, fatigue",
        text: "It's not just aesthetic. Lipedema hurts, exhausts, and affects daily life in ways only those living it truly understand.",
      },
      {
        emoji: "📊",
        stat: "Every case is unique",
        text: "No two cases of lipedema are the same. Keeping a personalised log is one of the most useful things you can do.",
      },
      {
        emoji: "🌿",
        stat: "You're in the right place",
        text: "Lipedema Tracker was born to help you understand your body, track your symptoms and take control of your wellbeing.",
        cta: true,
      },
    ];

    const slides = lang === "es" ? slides_es : slides_en;
    const slide = slides[storySlide];
    const isLastSlide = storySlide === slides.length - 1;

    return (
      <div style={S.wrap}>
        <div style={{ ...S.card, textAlign: "center", minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <Logo />

            {/* Dots */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 36 }}>
              {slides.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === storySlide ? 20 : 6,
                    height: 6,
                    borderRadius: 6,
                    background: i <= storySlide ? C.sage : C.border,
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => setStorySlide(i)}
                />
              ))}
            </div>

            {/* Content */}
            <div
              key={storySlide}
              style={{
                animation: "fadeIn 0.4s ease",
                padding: "0 4px",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{slide.emoji}</div>
              <div style={{
                display: "inline-block",
                background: C.creamFaint,
                color: C.sage,
                fontSize: 12,
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: 20,
                letterSpacing: "0.3px",
                marginBottom: 16,
                border: `1px solid ${C.border}`,
              }}>
                {slide.stat}
              </div>
              <p style={{
                fontSize: 15,
                color: C.cream,
                lineHeight: 1.65,
                margin: "0 0 28px",
                fontWeight: 400,
              }}>
                {slide.text}
              </p>
            </div>
          </div>

          <div>
            {isLastSlide ? (
              <>
                <button
                  onClick={() => setScreen("welcome")}
                  style={{
                    width: "100%", padding: "14px", borderRadius: 12, border: "none",
                    background: C.sage, color: "#fff",
                    fontSize: 15, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 8, fontFamily: "inherit", marginBottom: 10,
                  }}
                >
                  {lang === "es" ? "Empezar ahora" : "Get started"}
                  <Icon name="arrow" size={16} color="#fff" />
                </button>
                <button onClick={() => onComplete(null)} style={S.btnSecondary}>
                  {lang === "es" ? "Explorar sin cuenta →" : "Explore without account →"}
                </button>
              </>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                {storySlide > 0 && (
                  <button
                    onClick={() => setStorySlide((s) => s - 1)}
                    style={{
                      flex: 1, padding: "13px", borderRadius: 12,
                      border: `1.5px solid ${C.border}`, background: "white",
                      color: C.creamMuted, fontSize: 14, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    ←
                  </button>
                )}
                <button
                  onClick={() => setStorySlide((s) => s + 1)}
                  style={{
                    flex: 4, padding: "13px", borderRadius: 12, border: "none",
                    background: C.sage, color: "#fff",
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    fontFamily: "inherit", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8,
                  }}
                >
                  {lang === "es" ? "Siguiente" : "Next"}
                  <Icon name="arrow" size={15} color="#fff" />
                </button>
              </div>
            )}

            {/* Lang toggle */}
            <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "center" }}>
              <button onClick={() => setLang("es")} style={{ ...S.btnSecondary, fontWeight: lang === "es" ? 800 : 400, color: lang === "es" ? C.sage : C.creamMuted }}>
                🇪🇸 ES
              </button>
              <button onClick={() => setLang("en")} style={{ ...S.btnSecondary, fontWeight: lang === "en" ? 800 : 400, color: lang === "en" ? C.sage : C.creamMuted }}>
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>

        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // SCREEN: WELCOME
  // ────────────────────────────────────────────────────────────────────────────
  if (screen === "welcome") {
    return (
      <div style={S.wrap}>
        <div style={{ ...S.card, textAlign: "center" }}>
          <Logo />

          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.2 }}>
            {lang === "es" ? "Bienvenida 🌿" : "Welcome 🌿"}
          </div>
          <div style={{ fontSize: 14, color: C.creamMuted, marginBottom: 32, lineHeight: 1.6 }}>
            {lang === "es"
              ? "Tu compañera de seguimiento para vivir mejor con lipedema."
              : "Your tracking companion for living better with lipedema."}
          </div>

          {/* Google */}
          <button
            onClick={loginWithGoogle}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 12,
              border: `1.5px solid ${C.border}`, background: "white",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit", color: C.cream,
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, marginBottom: 10, transition: "border-color 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            {lang === "es" ? "Continuar con Google" : "Continue with Google"}
          </button>

          {/* Magic link */}
          <button
            onClick={() => setScreen("magic")}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 12,
              border: `1.5px solid ${C.border}`, background: C.creamFaint,
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit", color: C.sage,
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, marginBottom: 20, transition: "all 0.2s",
            }}
          >
            <Icon name="mail" size={18} color={C.sage} />
            {lang === "es" ? "Continuar con email" : "Continue with email"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ fontSize: 12, color: C.creamMuted }}>{lang === "es" ? "o" : "or"}</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          {/* Guest */}
          <button
            onClick={() => setScreen("lipedema_info")}
            style={S.btnSecondary}
          >
            {lang === "es" ? "Explorar sin cuenta →" : "Explore without account →"}
          </button>

          {/* Lang toggle */}
          <div style={{ display: "flex", gap: 8, marginTop: 28, justifyContent: "center" }}>
            <button onClick={() => setLang("es")} style={{ ...S.btnSecondary, fontWeight: lang === "es" ? 800 : 400, color: lang === "es" ? C.sage : C.creamMuted }}>
              🇪🇸 ES
            </button>
            <button onClick={() => setLang("en")} style={{ ...S.btnSecondary, fontWeight: lang === "en" ? 800 : 400, color: lang === "en" ? C.sage : C.creamMuted }}>
              🇬🇧 EN
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // SCREEN: MAGIC LINK
  // ────────────────────────────────────────────────────────────────────────────
  if (screen === "magic") {
    return (
      <div style={S.wrap}>
        <div style={S.card}>
          <Logo />
          <button onClick={() => setScreen("welcome")} style={{ ...S.btnSecondary, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            ← {lang === "es" ? "Volver" : "Back"}
          </button>

          {!magicSent ? (
            <>
              <div style={S.stepIcon}>
                <Icon name="mail" size={22} color={C.sage} />
              </div>
              <h2 style={S.h1}>{lang === "es" ? "Accede con tu email" : "Sign in with email"}</h2>
              <p style={S.sub}>
                {lang === "es"
                  ? "Te enviaremos un enlace mágico. Sin contraseña, sin complicaciones."
                  : "We'll send you a magic link. No password needed."}
              </p>
              <input
                style={S.input}
                type="email"
                placeholder={lang === "es" ? "tu@email.com" : "your@email.com"}
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMagicLink()}
              />
              {magicError && (
                <div style={{ fontSize: 12, color: "#c06080", marginBottom: 8 }}>{magicError}</div>
              )}
              <button
                onClick={sendMagicLink}
                disabled={!email.trim() || magicLoading}
                style={{
                  ...S.btnPrimary,
                  background: email.trim() && !magicLoading ? C.sage : C.border,
                  color: email.trim() && !magicLoading ? "#fff" : C.creamMuted,
                  cursor: email.trim() && !magicLoading ? "pointer" : "default",
                }}
              >
                {magicLoading
                  ? lang === "es" ? "Enviando…" : "Sending…"
                  : lang === "es" ? "Enviar enlace" : "Send link"}
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
              <h2 style={{ ...S.h1, textAlign: "center" }}>
                {lang === "es" ? "¡Revisa tu email!" : "Check your inbox!"}
              </h2>
              <p style={{ ...S.sub, textAlign: "center" }}>
                {lang === "es"
                  ? `Hemos enviado un enlace a ${email}. Haz clic en él para acceder.`
                  : `We've sent a link to ${email}. Click it to sign in.`}
              </p>
              <div style={{ fontSize: 12, color: C.creamMuted, marginTop: 16 }}>
                {lang === "es" ? "¿No lo ves? Revisa la carpeta de spam." : "Can't find it? Check your spam folder."}
              </div>
              <button onClick={() => { setMagicSent(false); setEmail(""); }} style={{ ...S.btnSecondary, marginTop: 16 }}>
                {lang === "es" ? "Usar otro email" : "Use a different email"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // SCREEN: LIPEDEMA INFO (guest)
  // ────────────────────────────────────────────────────────────────────────────
  if (screen === "lipedema_info") {
    const types = lang === "es" ? LIPEDEMA_TYPES_ES : LIPEDEMA_TYPES_EN;
    return (
      <div style={S.wrap}>
        <div style={{ ...S.card, maxWidth: 480 }}>
          <Logo />

          <div style={S.stepIcon}>
            <Icon name="sparkles" size={22} color={C.sage} />
          </div>

          <h2 style={S.h1}>
            {lang === "es" ? "Tipos de lipedema" : "Types of lipedema"}
          </h2>
          <p style={S.sub}>
            {lang === "es"
              ? "El lipedema se clasifica según las zonas del cuerpo afectadas. Conocerlos puede ayudarte a identificar mejor tu caso."
              : "Lipedema is classified by the body areas affected. Knowing the types can help you better identify your case."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
            {types.filter((t) => t.val !== "unknown").map((t) => (
              <div
                key={t.val}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1.5px solid ${t.border}20`,
                  background: t.color,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{t.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.border }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 2, lineHeight: 1.4 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onComplete(null)}
            style={{ ...S.btnPrimary, background: C.sage, color: "#fff", cursor: "pointer" }}
          >
            {lang === "es" ? "Entrar a la app" : "Enter the app"}
            <Icon name="arrow" size={16} color="#fff" />
          </button>

          <div style={{ textAlign: "center", marginTop: 12 }}>
            <button onClick={() => setScreen("welcome")} style={S.btnSecondary}>
              ← {lang === "es" ? "Volver" : "Back"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // SCREEN: PROFILE STEPS
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div style={S.wrap}>
      <div style={S.card}>
        {/* Progress */}
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

        {/* ── NAME ── */}
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

        {/* ── LANGUAGE ── */}
        {current.id === "language" && (
          <div style={{ display: "flex", gap: 10 }}>
            <button style={S.langBtn(lang === "es")} onClick={() => setLang("es")}>🇪🇸 Español</button>
            <button style={S.langBtn(lang === "en")} onClick={() => setLang("en")}>🇬🇧 English</button>
          </div>
        )}

        {/* ── LOCATION ── */}
        {current.id === "location" && (
          <div>
            {!locDetected ? (
              <button style={S.locBtn} onClick={detectLocation} disabled={locLoading}>
                <Icon name="mappin" size={16} color={C.sage} />
                {locLoading
                  ? lang === "es" ? "Detectando…" : "Detecting…"
                  : lang === "es" ? "Detectar mi ubicación automáticamente" : "Detect my location automatically"}
              </button>
            ) : (
              <div style={{ background: C.creamFaint, borderRadius: 12, padding: "12px 14px", marginBottom: 12, border: `1.5px solid ${C.sage}`, display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="check" size={16} color={C.sage} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.cream }}>{region && `${region}, `}{country}</div>
                  <button style={{ ...S.btnSecondary, padding: 0, fontSize: 11 }} onClick={() => { setLocDetected(false); setCountry(""); setRegion(""); }}>
                    {lang === "es" ? "Cambiar" : "Change"}
                  </button>
                </div>
              </div>
            )}
            {!locDetected && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.creamMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {lang === "es" ? "O elige manualmente" : "Or choose manually"}
                </div>
                <select style={S.select} value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="">{lang === "es" ? "— Selecciona país —" : "— Select country —"}</option>
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {country && (
                  <input
                    style={S.input}
                    placeholder={lang === "es" ? "Provincia o ciudad (opcional)" : "Region or city (optional)"}
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                )}
              </>
            )}
            <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 4 }}>
              {lang === "es" ? "Solo se usa para filtrar centros. No la compartimos con nadie." : "Only used to filter centres. We never share it."}
            </div>
          </div>
        )}

        {/* ── STAGE ── */}
        {current.id === "stage" && (
          <div>
            {stages.map((s) => (
              <div key={s.val} style={S.stageCard(stage === s.val)} onClick={() => setStage(s.val)}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${stage === s.val ? C.sage : C.border}`, background: stage === s.val ? C.sage : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {stage === s.val && <Icon name="check" size={11} color="#fff" />}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: stage === s.val ? C.sage : C.cream }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: C.creamMuted }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── COMPRESSION ── */}
        {current.id === "compression" && (() => {
          const opts = lang === "es"
            ? [
                { val: "none", label: "No uso compresión", desc: "No llevo ninguna prenda compresiva", icon: "🚫" },
                { val: "occasional", label: "Ocasionalmente", desc: "Solo en viajes largos o días de mucho esfuerzo", icon: "🔄" },
                { val: "daily", label: "A diario (por iniciativa propia)", desc: "Me lo pongo habitualmente por mi cuenta", icon: "📅" },
                { val: "prescribed", label: "A diario (pautado por médico)", desc: "Llevo prescripción médica de compresión", icon: "🩺" },
              ]
            : [
                { val: "none", label: "I don't use compression", desc: "I don't wear any compression garment", icon: "🚫" },
                { val: "occasional", label: "Occasionally", desc: "Only on long trips or intense activity", icon: "🔄" },
                { val: "daily", label: "Daily (my own choice)", desc: "I wear it regularly on my own initiative", icon: "📅" },
                { val: "prescribed", label: "Daily (doctor prescribed)", desc: "I have a medical prescription for compression", icon: "🩺" },
              ];
          return (
            <div>
              {opts.map((o) => (
                <div key={o.val} style={S.stageCard(compression === o.val)} onClick={() => setCompression(o.val)}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{o.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: compression === o.val ? C.sage : C.cream }}>{o.label}</div>
                    <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 1 }}>{o.desc}</div>
                  </div>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${compression === o.val ? C.sage : C.border}`, background: compression === o.val ? C.sage : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {compression === o.val && <Icon name="check" size={10} color="#fff" />}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* ── POSTURE ── */}
        {current.id === "posture" && (() => {
          const opts = lang === "es"
            ? [
                { val: "standing", label: "De pie la mayor parte del día", desc: "Trabajas o estudias principalmente en bipedestación", icon: "🧍" },
                { val: "sitting", label: "Sentada la mayor parte del día", desc: "Oficina, estudio, trabajo remoto…", icon: "🪑" },
                { val: "mixed", label: "Combinación de pie y sentada", desc: "Alternas posiciones a lo largo del día", icon: "🔀" },
                { val: "active", label: "Trabajo físicamente activo", desc: "Movimiento constante, carga física, desplazamientos", icon: "🏃" },
                { val: "sedentary", label: "Poco movimiento general", desc: "Paso muchas horas sin levantarme ni caminar", icon: "🛋️" },
              ]
            : [
                { val: "standing", label: "Standing most of the day", desc: "You work or study mainly on your feet", icon: "🧍" },
                { val: "sitting", label: "Sitting most of the day", desc: "Office, study, remote work…", icon: "🪑" },
                { val: "mixed", label: "Mix of standing and sitting", desc: "You alternate positions throughout the day", icon: "🔀" },
                { val: "active", label: "Physically active work", desc: "Constant movement, physical effort, commuting", icon: "🏃" },
                { val: "sedentary", label: "Generally low movement", desc: "I spend many hours without getting up or walking", icon: "🛋️" },
              ];
          const toggle = (val) => setPosture((p) => p.includes(val) ? p.filter((x) => x !== val) : [...p, val]);
          return (
            <div>
              <div style={{ fontSize: 11, color: C.creamMuted, marginBottom: 10, fontStyle: "italic" }}>
                {lang === "es" ? "Puedes seleccionar varias opciones" : "You can select multiple options"}
              </div>
              {opts.map((o) => {
                const active = posture.includes(o.val);
                return (
                  <div key={o.val} style={S.stageCard(active)} onClick={() => toggle(o.val)}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{o.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: active ? C.sage : C.cream }}>{o.label}</div>
                      <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 1 }}>{o.desc}</div>
                    </div>
                    <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${active ? C.sage : C.border}`, background: active ? C.sage : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {active && <Icon name="check" size={10} color="#fff" />}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* ── LIPEDEMA TYPE ── */}
        {current.id === "lipedema_type" && (
          <div>
            {lipedemaTypes.map((t) => (
              <div
                key={t.val}
                onClick={() => setLipedemaType(t.val)}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `2px solid ${lipedemaType === t.val ? t.border : C.border}`,
                  background: lipedemaType === t.val ? t.color : "white",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{t.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: lipedemaType === t.val ? t.border : C.cream }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 1 }}>{t.desc}</div>
                </div>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${lipedemaType === t.val ? t.border : C.border}`, background: lipedemaType === t.val ? t.border : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {lipedemaType === t.val && <Icon name="check" size={10} color="#fff" />}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <button style={S.btnPrimary} onClick={advance} disabled={!canAdvance()}>
          {isLast
            ? lang === "es" ? `Empezar, ${name || ""}` : `Let's go, ${name || ""}`
            : lang === "es" ? "Siguiente" : "Next"}
          {!isLast && <Icon name="arrow" size={16} color={canAdvance() ? "#fff" : C.creamMuted} />}
        </button>

        {current.id === "location" && (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button style={S.btnSecondary} onClick={advance}>
              {lang === "es" ? "Omitir por ahora" : "Skip for now"}
            </button>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: C.creamMuted }}>
          {step + 1} / {total}
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, opacity: 0.5 }}>
        <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" fill="#e4eeea" stroke="#d6e5dd" strokeWidth="1" />
          <path d="M14 6 Q20 10 20 16 Q20 21 14 22 Q8 21 8 16 Q8 10 14 6Z" fill="none" stroke="#4d8a6e" strokeWidth="1.4" strokeLinejoin="round" />
          <line x1="14" y1="6" x2="14" y2="22" stroke="#4d8a6e" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 12, color: C.creamMuted, fontFamily: "'DM Sans',sans-serif" }}>
          lipedema <span style={{ fontWeight: 300 }}>tracker</span>
        </span>
      </div>
    </div>
  );
}
