const MOOD_EMOJIS = ["😣", "😟", "😐", "🙂", "😊", "😄", "🤩"];

export default function LogEntry({
  log: l,
  isOpen,
  onToggle,
  allSuppsList,
  profile,
  lang,
  C,
  S,
  t,
}) {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
      {/* Row header */}
      <div
        onClick={onToggle}
        style={{
          padding: "12px 4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>{MOOD_EMOJIS[l.mood ?? 2]}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: C.cream }}>{l.date}</div>
            {l.suppsTaken?.length > 0 && (
              <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                {l.suppsTaken.slice(0, 5).map((k) => {
                  const d = allSuppsList.find((s) => s.key === k);
                  return d ? (
                    <span key={k} style={{ fontSize: 12 }}>
                      {d.icon}
                    </span>
                  ) : null;
                })}
                {l.suppsTaken.length > 5 && (
                  <span style={{ fontSize: 10, color: C.creamMuted }}>
                    +{l.suppsTaken.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {l.weight && <span style={S.tag(C.cream)}>{l.weight}kg</span>}
          <span style={S.tag("#ef4444")}>dolor {l.pain}</span>
          <span style={S.tag(C.sage)}>energía {l.energy}</span>
          <span
            style={{
              fontSize: 13,
              color: C.creamMuted,
              marginLeft: 4,
              transition: "transform 0.2s",
              display: "inline-block",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▾
          </span>
        </div>
      </div>

      {/* Expanded detail */}
      {isOpen && (
        <div
          style={{
            background: C.bg,
            borderTop: `1px solid ${C.border}`,
            padding: "14px 12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Stats row */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              {
                label: lang === "es" ? "Peso" : "Weight",
                value: l.weight ? `${l.weight} kg` : "—",
              },
              { label: lang === "es" ? "Dolor" : "Pain", value: `${l.pain} / 6` },
              { label: lang === "es" ? "Energía" : "Energy", value: `${l.energy} / 6` },
              { label: lang === "es" ? "Estado" : "Mood", value: MOOD_EMOJIS[l.mood ?? 2] },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  minWidth: 60,
                  background: "white",
                  borderRadius: 10,
                  padding: "8px 10px",
                  border: `1px solid ${C.border}`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: C.creamMuted,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: 3,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.cream }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Water */}
          {l.water > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                background: "#eaf4fb",
                borderRadius: 8,
                border: "1px solid #a0c4e8",
              }}
            >
              <span style={{ fontSize: 16 }}>💧</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#305070" }}>
                {l.water} {lang === "es" ? "vasos de agua" : "glasses of water"}
                {l.water >= 8 && " ✓"}
              </span>
            </div>
          )}

          {/* Inflammation zones */}
          {l.inflammationZones && Object.keys(l.inflammationZones).length > 0 && (
            <div>
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
                {lang === "es" ? "Inflamación por zonas" : "Inflammation by zone"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {Object.entries(l.inflammationZones).map(([zone, val]) => (
                  <div key={zone} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontSize: 11, color: C.creamMuted, width: 110, flexShrink: 0 }}>
                      {t.today.zoneNames[zone] || zone}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: 6,
                        background: C.border,
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(val / 5) * 100}%`,
                          height: "100%",
                          borderRadius: 4,
                          background: val >= 4 ? "#c06080" : val >= 2 ? C.accent : C.sage,
                          transition: "width 0.3s",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.cream, width: 20 }}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Body measures */}
          {l.measures && Object.values(l.measures).some((v) => v) && (
            <div>
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
                {lang === "es" ? "Medidas" : "Measurements"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Object.entries(l.measures)
                  .filter(([, v]) => v)
                  .map(([zone, val]) => (
                    <div
                      key={zone}
                      style={{
                        background: "white",
                        border: `1px solid ${C.border}`,
                        borderRadius: 8,
                        padding: "5px 10px",
                        fontSize: 11,
                      }}
                    >
                      <span style={{ color: C.creamMuted }}>
                        {t.today.zoneNames[zone] || zone}:{" "}
                      </span>
                      <span style={{ fontWeight: 700, color: C.cream }}>{val} cm</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Supplements taken */}
          {l.suppsTaken?.length > 0 && (
            <div>
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
                {lang === "es" ? "Suplementos tomados" : "Supplements taken"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {l.suppsTaken.map((k) => {
                  const d = allSuppsList.find((s) => s.key === k);
                  return d ? (
                    <span
                      key={k}
                      style={{
                        fontSize: 11,
                        background: C.creamFaint,
                        border: `1px solid ${C.border}`,
                        borderRadius: 20,
                        padding: "3px 9px",
                        color: C.sage,
                        fontWeight: 600,
                      }}
                    >
                      {d.icon} {lang === "es" ? d.es : d.en}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Pill taken */}
          {l.pillTaken && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                background: C.creamFaint,
                borderRadius: 8,
                border: `1px solid ${C.border}`,
              }}
            >
              <span style={{ fontSize: 16 }}>💊</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.sage }}>
                {profile.pillBrand
                  ? lang === "es"
                    ? `${profile.pillBrand} tomada`
                    : `${profile.pillBrand} taken`
                  : lang === "es"
                    ? "Píldora tomada"
                    : "Pill taken"}
              </span>
            </div>
          )}

          {/* Notes */}
          {(l.inflammationNote || l.notes) && (
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.creamMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 4,
                }}
              >
                {lang === "es" ? "Notas" : "Notes"}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.cream,
                  lineHeight: 1.6,
                  background: "white",
                  borderRadius: 8,
                  padding: "8px 10px",
                  border: `1px solid ${C.border}`,
                }}
              >
                {l.inflammationNote || l.notes}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
