const TESTIMONIALS = {
  es: [
    {
      text: "Después de 2 años con DLM semanal y compresión, el dolor al caminar ha bajado de un 8 a un 3. No me lo creía posible.",
      stage: "Estadio 2",
      country: "España",
    },
    {
      text: "La cirugía WAL me cambió la vida. Tardé 6 meses en recuperarme bien, pero por fin puedo hacer senderismo.",
      stage: "Estadio 3",
      country: "México",
    },
    {
      text: "Empecé la dieta antiinflamatoria hace 4 meses. No he perdido volumen pero la sensación de pesadez ha mejorado muchísimo.",
      stage: "Estadio 1",
      country: "Argentina",
    },
    {
      text: "Lo más difícil fue encontrar un médico que me tomara en serio. Una vez con el diagnóstico, todo cambió.",
      stage: "Estadio 2",
      country: "Colombia",
    },
  ],
  en: [
    {
      text: "After 2 years of weekly MLD and compression, the pain when walking has gone from an 8 to a 3. I couldn't believe it was possible.",
      stage: "Stage 2",
      country: "Spain",
    },
    {
      text: "WAL surgery changed my life. It took 6 months to recover properly, but I can finally go hiking.",
      stage: "Stage 3",
      country: "Mexico",
    },
    {
      text: "I started the anti-inflammatory diet 4 months ago. I haven't lost volume but the heaviness has improved enormously.",
      stage: "Stage 1",
      country: "Argentina",
    },
    {
      text: "The hardest part was finding a doctor who took me seriously. Once I had the diagnosis, everything changed.",
      stage: "Stage 2",
      country: "Colombia",
    },
  ],
};

export default function Testimonials({ lang, C }) {
  const testimonials = TESTIMONIALS[lang];

  return (
    <div
      style={{
        background: C.bgCard,
        borderRadius: 14,
        marginBottom: 8,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 4px rgba(74,110,87,0.06)",
        padding: "16px 18px",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: C.sage,
          textTransform: "uppercase",
          letterSpacing: "0.6px",
          marginBottom: 12,
        }}
      >
        💬 {lang === "es" ? "Experiencias reales" : "Real experiences"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            style={{
              padding: "12px 14px",
              background: C.bg,
              borderRadius: 10,
              border: `1px solid ${C.border}`,
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: C.cream,
                lineHeight: 1.6,
                fontStyle: "italic",
                margin: "0 0 8px",
              }}
            >
              "{t.text}"
            </p>
            <div style={{ display: "flex", gap: 6 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.sage,
                  background: C.creamFaint,
                  padding: "2px 8px",
                  borderRadius: 20,
                }}
              >
                {t.stage}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.creamMuted,
                  background: C.creamFaint,
                  padding: "2px 8px",
                  borderRadius: 20,
                }}
              >
                {t.country}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
