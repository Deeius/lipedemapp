import ResourceItem from "./ResourceItem";

export default function InfoTab({
  infoFilter,
  setInfoFilter,
  setShowGuide,
  INFO_RESOURCES,
  lang,
  C,
  S,
  t,
}) {
  return (
    <>
      {/* Visual Guide shortcut */}
      <div
        onClick={() => setShowGuide(true)}
        style={{
          background: "linear-gradient(135deg, #fdf4ff, #f0f9ff)",
          borderRadius: 14,
          padding: "16px 18px",
          marginBottom: 14,
          border: "1.5px solid #e9d5ff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div style={{ fontSize: 36 }}>🩺</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: C.cream, marginBottom: 2 }}>
            {lang === "es" ? "Guía visual del lipedema" : "Visual Lipedema Guide"}
          </div>
          <div style={{ fontSize: 12, color: C.creamMuted }}>
            {lang === "es"
              ? "Tipos, estadios, síntomas visuales explicados con ilustraciones →"
              : "Types, stages, visual symptoms explained with illustrations →"}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          background: "#fefce8",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 16,
          border: "1px solid #fde047",
          fontSize: 12,
          color: "#854d0e",
        }}
      >
        {t.info.disclaimer}
      </div>

      {/* Language filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[
          ["all", t.info.filterAll],
          ["es", t.info.filterEs],
          ["en", t.info.filterEn],
        ].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setInfoFilter(val)}
            style={{
              padding: "7px 14px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              background: infoFilter === val ? C.sage : C.creamFaint,
              color: infoFilter === val ? "#fff" : C.creamMuted,
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sections */}
      {Object.entries(INFO_RESOURCES).map(([sectionKey, sec]) => {
        const sectionName = lang === "es" ? sec.es : sec.en;
        const filtered = sec.items.filter((item) =>
          infoFilter === "all" ? true : item.lang === infoFilter
        );
        if (filtered.length === 0) return null;
        return (
          <div key={sectionKey} style={S.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>{sec.icon}</span>
              <div style={S.cardTitle}>{sectionName}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((item, i) => (
                <ResourceItem key={i} item={item} lang={lang} C={C} t={t} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
