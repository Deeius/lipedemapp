import Icon from "../shared/Icon";

export default function QuickLinks({ lang, C, setTab }) {
  const links = [
    { key: "today", label: lang === "es" ? "Registro de hoy" : "Log today", icon: "calendar" },
    { key: "history", label: lang === "es" ? "Historial" : "History", icon: "clipboard" },
    { key: "charts", label: lang === "es" ? "Gráficas" : "Charts", icon: "trending" },
    { key: "foods", label: lang === "es" ? "Alimentos" : "Foods", icon: "utensils" },
  ];

  return (
    <div style={{ marginTop: 4 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: C.creamMuted,
          textTransform: "uppercase",
          letterSpacing: "0.6px",
          marginBottom: 10,
        }}
      >
        {lang === "es" ? "Accesos rápidos" : "Quick links"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {links.map((q) => (
          <button
            key={q.key}
            onClick={() => setTab(q.key)}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              background: "white",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 10,
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <Icon name={q.icon} size={20} color={C.sage} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.cream }}>{q.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
