export default function SupplementsSummary({
  activeSupps,
  lastLog,
  allSuppsList,
  lang,
  C,
  setTab,
}) {
  const recentSupps = activeSupps.slice(0, 4);

  return (
    <div
      style={{
        background: C.bgCard,
        borderRadius: 14,
        padding: "16px 18px",
        marginBottom: 8,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 4px rgba(74,110,87,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: C.creamMuted,
          textTransform: "uppercase",
          letterSpacing: "0.6px",
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{lang === "es" ? "Mis suplementos activos" : "My active supplements"}</span>
        <button
          onClick={() => setTab("supps")}
          style={{
            background: "none",
            border: "none",
            fontSize: 11,
            color: C.sage,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {lang === "es" ? "Gestionar →" : "Manage →"}
        </button>
      </div>

      {recentSupps.length === 0 ? (
        <div style={{ fontSize: 12, color: C.creamMuted, fontStyle: "italic" }}>
          {lang === "es" ? "No tienes suplementos activos aún." : "No active supplements yet."}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {recentSupps.map((a) => {
            const def = allSuppsList.find((s) => s.key === a.key);
            if (!def) return null;
            const takenToday = (lastLog?.suppsTaken || []).includes(a.key);
            return (
              <div
                key={a.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 20,
                  border: `1.5px solid ${takenToday ? C.sage : C.border}`,
                  background: takenToday ? C.creamFaint : "white",
                }}
              >
                <span style={{ fontSize: 14 }}>{def.icon}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: takenToday ? C.sage : C.creamMuted,
                  }}
                >
                  {lang === "es" ? def.es : def.en}
                </span>
                {takenToday && <span style={{ fontSize: 10, color: C.sage }}>✓</span>}
              </div>
            );
          })}
          {activeSupps.length > 4 && (
            <div
              style={{
                padding: "6px 10px",
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                fontSize: 11,
                color: C.creamMuted,
              }}
            >
              +{activeSupps.length - 4} {lang === "es" ? "más" : "more"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
