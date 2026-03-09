const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TYPE_COLORS = {
  period: { bg: "#f5d0dc", border: "#c06080", text: "#7a1030" },
  spm: { bg: "#f5ecd5", border: "#8a6c3a", text: "#8a6c3a" },
  retention: { bg: "#d0e4f0", border: "#5080a0", text: "#305070" },
};

export default function CycleCalendar({
  cycleData,
  cycleMonth,
  setCycleMonth,
  cycleActiveType,
  setCycleActiveType,
  toggleCycleDay,
  setCycleData,
  lang,
  C,
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [y, mo] = cycleMonth.split("-").map(Number);

  const prevMonth = () =>
    setCycleMonth(() => {
      const d = new Date(y, mo - 2, 1);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    });

  const nextMonth = () =>
    setCycleMonth(() => {
      const d = new Date(y, mo, 1);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    });

  // Build calendar cells
  const firstDay = new Date(y, mo - 1, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(y, mo, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  // Cycle summary
  const periodDays = Object.entries(cycleData)
    .filter(([, v]) => v === "period")
    .map(([k]) => k)
    .sort();

  let lastStart = null,
    lastEnd = null;
  for (let i = 0; i < periodDays.length; i++) {
    const prev = i > 0 ? new Date(periodDays[i - 1]) : null;
    if (!prev || new Date(periodDays[i]) - prev > 86400000 * 2) lastStart = periodDays[i];
    lastEnd = periodDays[i];
  }
  const duration =
    lastStart && lastEnd
      ? Math.round((new Date(lastEnd) - new Date(lastStart)) / 86400000) + 1
      : null;

  return (
    <>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.sage}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 800, color: C.cream, letterSpacing: "-0.3px" }}>
            {lang === "es" ? "Ciclo menstrual" : "Menstrual cycle"}
          </span>
        </div>
      </div>

      {/* Type selector */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.creamMuted,
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {lang === "es" ? "1. Elige qué quieres marcar" : "1. Choose what to mark"}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            {
              key: "period",
              color: "#c06080",
              bg: "#f5d0dc",
              label: lang === "es" ? "Menstruación" : "Period",
              emoji: "🩸",
            },
            { key: "spm", color: "#8a6c3a", bg: "#f5ecd5", label: "SPM / PMS", emoji: "🟡" },
            {
              key: "retention",
              color: "#5080a0",
              bg: "#d0e4f0",
              label: lang === "es" ? "Retención" : "Retention",
              emoji: "💧",
            },
          ].map((ctype) => (
            <button
              key={ctype.key}
              onClick={() => setCycleActiveType((prev) => (prev === ctype.key ? null : ctype.key))}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: 10,
                border: `2px solid ${cycleActiveType === ctype.key ? ctype.color : C.border}`,
                background: cycleActiveType === ctype.key ? ctype.bg : "white",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                color: cycleActiveType === ctype.key ? ctype.color : C.creamMuted,
                transition: "all 0.15s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <span style={{ fontSize: 16 }}>{ctype.emoji}</span>
              <span>{ctype.label}</span>
            </button>
          ))}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            borderRadius: 8,
            padding: "6px 10px",
            background: cycleActiveType ? C.creamFaint : "transparent",
            color: cycleActiveType ? C.sage : C.creamMuted,
            fontStyle: cycleActiveType ? "normal" : "italic",
            border: cycleActiveType ? `1px solid ${C.border}` : "1px solid transparent",
            transition: "all 0.2s",
          }}
        >
          {cycleActiveType
            ? lang === "es"
              ? "2. Toca los días del calendario · toca de nuevo para borrar"
              : "2. Tap days on the calendar · tap again to remove"
            : lang === "es"
              ? "Selecciona un tipo arriba para empezar"
              : "Select a type above to start marking"}
        </div>
      </div>

      {/* Month navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: "none",
            border: `1px solid ${C.border}`,
            borderRadius: 6,
            width: 26,
            height: 26,
            cursor: "pointer",
            color: C.creamMuted,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          &#8249;
        </button>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: C.creamMuted,
            minWidth: 140,
            textAlign: "center",
          }}
        >
          {(lang === "es" ? MONTHS_ES : MONTHS_EN)[mo - 1]} {y}
        </div>
        <button
          onClick={nextMonth}
          style={{
            background: "none",
            border: `1px solid ${C.border}`,
            borderRadius: 6,
            width: 26,
            height: 26,
            cursor: "pointer",
            color: C.creamMuted,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          &#8250;
        </button>
      </div>

      {/* Day headers */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}
      >
        {(lang === "es"
          ? ["L", "M", "X", "J", "V", "S", "D"]
          : ["M", "T", "W", "T", "F", "S", "S"]
        ).map((d, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontSize: 10,
              fontWeight: 700,
              color: C.creamMuted,
              padding: "4px 0",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const dateStr = `${y}-${String(mo).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const type = cycleData[dateStr];
          const col = type ? TYPE_COLORS[type] : null;
          const isToday = dateStr === today;
          return (
            <div
              key={idx}
              onClick={() => {
                if (!cycleActiveType) return;
                if (type === cycleActiveType) {
                  setCycleData((prev) => {
                    const next = { ...prev };
                    delete next[dateStr];
                    try {
                      localStorage.setItem("lt_cycle", JSON.stringify(next));
                    } catch {}
                    return next;
                  });
                } else {
                  toggleCycleDay(dateStr, cycleActiveType);
                }
              }}
              style={{
                aspectRatio: "1",
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: type ? 700 : 500,
                cursor: cycleActiveType ? "pointer" : "default",
                background: col ? col.bg : isToday ? C.creamFaint : "transparent",
                border: `1.5px solid ${col ? col.border : isToday ? C.sage : "transparent"}`,
                color: col ? col.text : isToday ? C.sage : C.cream,
                transition: "all 0.15s",
                userSelect: "none",
                opacity: cycleActiveType || type ? 1 : 0.7,
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginTop: 12,
          paddingTop: 12,
          borderTop: `1px solid ${C.border}`,
        }}
      >
        {[
          { color: "#c06080", bg: "#f5d0dc", label: lang === "es" ? "Menstruación" : "Period" },
          { color: "#8a6c3a", bg: "#f5ecd5", label: "SPM / PMS" },
          { color: "#5080a0", bg: "#d0e4f0", label: lang === "es" ? "Retención" : "Retention" },
        ].map((leg) => (
          <div key={leg.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: leg.bg,
                border: `1.5px solid ${leg.color}`,
              }}
            />
            <span style={{ fontSize: 11, color: C.creamMuted, fontWeight: 600 }}>{leg.label}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      {periodDays.length >= 1 && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 12px",
            background: C.creamFaint,
            borderRadius: 10,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: C.creamMuted,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 6,
            }}
          >
            {lang === "es" ? "Resumen del ciclo" : "Cycle summary"}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {lastStart && (
              <div>
                <div style={{ fontSize: 10, color: C.creamMuted }}>
                  {lang === "es" ? "Último inicio" : "Last start"}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.cream }}>
                  {lastStart.slice(8)}/{lastStart.slice(5, 7)}
                </div>
              </div>
            )}
            {duration && (
              <div>
                <div style={{ fontSize: 10, color: C.creamMuted }}>
                  {lang === "es" ? "Duración" : "Duration"}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.cream }}>
                  {duration} {lang === "es" ? "días" : "days"}
                </div>
              </div>
            )}
            <div>
              <div style={{ fontSize: 10, color: C.creamMuted }}>
                {lang === "es" ? "Días marcados" : "Days marked"}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.cream }}>
                {periodDays.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
