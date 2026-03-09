export default function CycleSummary({ cycleData, lang, C, setTab }) {
  const today = new Date().toISOString().slice(0, 10);
  const [cy, cm] = today.slice(0, 7).split("-").map(Number);
  const monthPrefix = `${cy}-${String(cm).padStart(2, "0")}`;

  const periodThisMonth = Object.entries(cycleData)
    .filter(([k, v]) => k.startsWith(monthPrefix) && v === "period")
    .map(([k]) => k)
    .sort();

  const spmThisMonth = Object.entries(cycleData).filter(
    ([k, v]) => k.startsWith(monthPrefix) && v === "spm"
  ).length;

  const retentionThisMonth = Object.entries(cycleData).filter(
    ([k, v]) => k.startsWith(monthPrefix) && v === "retention"
  ).length;

  const allPeriodDays = Object.entries(cycleData)
    .filter(([, v]) => v === "period")
    .map(([k]) => k)
    .sort();

  let lastPeriodStart = null;
  for (let i = 0; i < allPeriodDays.length; i++) {
    const prev = i > 0 ? new Date(allPeriodDays[i - 1]) : null;
    if (!prev || new Date(allPeriodDays[i]) - prev > 86400000 * 2)
      lastPeriodStart = allPeriodDays[i];
  }

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
        <span>{lang === "es" ? "Ciclo menstrual" : "Menstrual cycle"}</span>
        <button
          onClick={() => setTab("today")}
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
          {lang === "es" ? "Ver calendario →" : "View calendar →"}
        </button>
      </div>

      {allPeriodDays.length === 0 ? (
        <div style={{ fontSize: 12, color: C.creamMuted, fontStyle: "italic" }}>
          {lang === "es"
            ? "Aún no has marcado ningún día de período."
            : "You haven't marked any period days yet."}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {lastPeriodStart && (
            <div>
              <div style={{ fontSize: 10, color: C.creamMuted }}>
                {lang === "es" ? "Último inicio" : "Last start"}
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#c06080" }}>
                {lastPeriodStart.slice(8)}/{lastPeriodStart.slice(5, 7)}
              </div>
            </div>
          )}
          <div>
            <div style={{ fontSize: 10, color: C.creamMuted }}>
              {lang === "es" ? "Días regla este mes" : "Period days this month"}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#c06080" }}>
              {periodThisMonth.length}
            </div>
          </div>
          {spmThisMonth > 0 && (
            <div>
              <div style={{ fontSize: 10, color: C.creamMuted }}>
                {lang === "es" ? "Días SPM" : "PMS days"}
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.accent }}>{spmThisMonth}</div>
            </div>
          )}
          {retentionThisMonth > 0 && (
            <div>
              <div style={{ fontSize: 10, color: C.creamMuted }}>
                {lang === "es" ? "Días retención" : "Retention days"}
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#5080a0" }}>
                {retentionThisMonth}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
