export default function WaterTracker({ entry, updateEntry, lang, C, t }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 800, color: C.cream }}>{t.today.water}</div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: entry.water >= 8 ? C.sage : entry.water >= 5 ? C.accent : C.creamMuted,
          }}
        >
          {entry.water} / 8 {lang === "es" ? "vasos" : "glasses"}
        </div>
      </div>

      {/* Glass buttons grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8,1fr)",
          gap: 4,
          marginBottom: 10,
        }}
      >
        {Array.from({ length: 8 }, (_, i) => {
          const filled = i < entry.water;
          return (
            <div
              key={i}
              onClick={() => updateEntry("water", entry.water === i + 1 ? i : i + 1)}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                userSelect: "none",
              }}
            >
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <path
                  d="M5 4 L3 28 Q3 30 5 30 L19 30 Q21 30 21 28 L19 4 Z"
                  fill={filled ? "#a0c4e8" : C.creamFaint}
                  stroke={filled ? "#5080a0" : C.border}
                  strokeWidth="1.5"
                />
                {filled && (
                  <path
                    d="M4.5 20 Q7 17 12 19 Q17 21 19.5 18"
                    stroke="#5080a0"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </div>
          );
        })}
      </div>

      {/* Extra glasses */}
      {entry.water > 8 && (
        <div style={{ fontSize: 11, color: C.sage, fontWeight: 600, marginBottom: 6 }}>
          +{entry.water - 8} {lang === "es" ? "vasos extra 🎉" : "extra glasses 🎉"}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 10, color: C.creamMuted, fontStyle: "italic" }}>
          {t.today.waterGoal}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => updateEntry("water", Math.max(0, entry.water - 1))}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: "white",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 16,
              color: C.creamMuted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            −
          </button>
          <button
            onClick={() => updateEntry("water", Math.min(12, entry.water + 1))}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: `1px solid ${C.sage}`,
              background: C.sage,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 16,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          marginTop: 10,
          height: 5,
          background: C.creamFaint,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(100, (entry.water / 8) * 100)}%`,
            height: "100%",
            borderRadius: 4,
            background: entry.water >= 8 ? C.sage : entry.water >= 5 ? "#a0c4e8" : C.border,
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );
}
