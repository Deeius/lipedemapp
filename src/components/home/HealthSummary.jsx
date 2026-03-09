export default function HealthSummary({ logs, lang, C, setTab }) {
  const last7 = logs.slice(-7);
  const avgPain = last7.length
    ? (last7.reduce((s, l) => s + l.pain, 0) / last7.length).toFixed(1)
    : null;
  const avgEnergy = last7.length
    ? (last7.reduce((s, l) => s + l.energy, 0) / last7.length).toFixed(1)
    : null;
  const lastWeight =
    logs
      .slice()
      .reverse()
      .find((l) => l.weight)?.weight || null;

  const statCard = (label, value, unit, color) => (
    <div
      style={{
        flex: 1,
        background: C.bgCard,
        borderRadius: 12,
        padding: "14px 16px",
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 4px rgba(74,110,87,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: C.creamMuted,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: color || C.cream,
          letterSpacing: "-0.5px",
        }}
      >
        {value ?? (
          <span style={{ fontSize: 14, color: C.creamMuted, fontWeight: 500 }}>
            {lang === "es" ? "Sin datos" : "No data"}
          </span>
        )}
        {value && (
          <span style={{ fontSize: 12, fontWeight: 500, color: C.creamMuted, marginLeft: 3 }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: C.creamMuted,
          textTransform: "uppercase",
          letterSpacing: "0.6px",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{lang === "es" ? "Salud — últimos 7 días" : "Health — last 7 days"}</span>
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
          {lang === "es" ? "Registrar hoy →" : "Log today →"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        {statCard(
          lang === "es" ? "Dolor medio" : "Avg pain",
          avgPain,
          "/6",
          avgPain >= 4 ? "#c06080" : avgPain >= 2 ? C.accent : C.sage
        )}
        {statCard(
          lang === "es" ? "Energía media" : "Avg energy",
          avgEnergy,
          "/6",
          avgEnergy >= 4 ? C.sage : avgEnergy >= 2 ? C.accent : "#c06080"
        )}
        {statCard(lang === "es" ? "Último peso" : "Last weight", lastWeight, "kg", C.cream)}
      </div>

      {last7.length === 0 && (
        <div
          style={{
            background: C.creamFaint,
            borderRadius: 10,
            padding: "12px 14px",
            border: `1px solid ${C.border}`,
            fontSize: 12,
            color: C.creamMuted,
            textAlign: "center",
          }}
        >
          {lang === "es" ? "Aún no hay registros. ¡Empieza hoy!" : "No entries yet. Start today!"}
        </div>
      )}

      {last7.length > 0 && (
        <div style={{ display: "flex", gap: 4 }}>
          {last7.map((l, i) => {
            const painH = Math.round((l.pain / 6) * 100);
            const energyH = Math.round((l.energy / 6) * 100);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 48,
                    background: C.creamFaint,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: `${painH}%`,
                      background: "#f5d0dc",
                      borderRadius: 4,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "30%",
                      right: "30%",
                      height: `${energyH}%`,
                      background: `${C.sage}60`,
                      borderRadius: 4,
                    }}
                  />
                </div>
                <div style={{ fontSize: 9, color: C.creamMuted }}>{l.date.slice(8)}</div>
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
              paddingLeft: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: "#f5d0dc" }} />
              <span style={{ fontSize: 9, color: C.creamMuted }}>
                {lang === "es" ? "Dolor" : "Pain"}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: `${C.sage}60` }} />
              <span style={{ fontSize: 9, color: C.creamMuted }}>
                {lang === "es" ? "Energía" : "Energy"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
