export default function PillTracker({ entry, updateEntry, profile, lang, C, S }) {
  return (
    <>
      <div style={S.cardTitle}>
        {lang === "es" ? "Anticonceptivo" : "Contraceptive"}
      </div>
      <div
        onClick={() => updateEntry("pillTaken", !entry.pillTaken)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px",
          borderRadius: 12,
          border: `1.5px solid ${entry.pillTaken ? C.sage : C.border}`,
          background: entry.pillTaken ? C.creamFaint : "white",
          cursor: "pointer",
          transition: "all 0.2s",
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: 22 }}>💊</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: entry.pillTaken ? C.sage : C.cream }}>
            {profile.pillBrand
              ? lang === "es"
                ? `${profile.pillBrand} — tomada hoy`
                : `${profile.pillBrand} — taken today`
              : lang === "es"
                ? "Píldora tomada hoy"
                : "Pill taken today"}
          </div>
          <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 1 }}>
            {entry.pillTaken
              ? lang === "es" ? "✓ Marcada como tomada" : "✓ Marked as taken"
              : lang === "es" ? "Toca para marcar como tomada" : "Tap to mark as taken"}
          </div>
        </div>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: `2px solid ${entry.pillTaken ? C.sage : C.border}`,
            background: entry.pillTaken ? C.sage : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {entry.pillTaken && (
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
