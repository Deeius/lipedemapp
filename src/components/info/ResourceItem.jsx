const TYPE_COLORS = {
  review: "#8b5cf6",
  guideline: "#ef4444",
  research: "#f97316",
  guide: "#22c55e",
  clinical: "#14b8a6",
  association: "#6366f1",
  forum: "#f59e0b",
  influencer: "#ec4899",
  article: "#64748b",
  platform: "#0ea5e9",
};

export default function ResourceItem({ item, lang, C, t }) {
  const desc = lang === "es" ? item.desc_es : item.desc_en;
  const typeLabel = t.info.tagTypes[item.type] || item.type;
  const langColor = item.lang === "es" ? "#6366f1" : "#0ea5e9";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        textDecoration: "none",
        padding: "12px 14px",
        borderRadius: 10,
        border: `1.5px solid ${C.border}`,
        background: C.bgInput,
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.sage;
        e.currentTarget.style.background = C.bgCardHov;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.background = C.bgInput;
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: C.cream, marginBottom: 3, lineHeight: 1.4 }}>
            {item.platform && (
              <span style={{ fontSize: 11, color: C.creamMuted, marginRight: 6 }}>{item.platform}</span>
            )}
            {item.title}
          </div>
          <div style={{ fontSize: 11, color: C.creamMuted, marginBottom: 6 }}>
            {item.authors}{item.year ? ` · ${item.year}` : ""}
          </div>
          <div style={{ fontSize: 12, color: C.cream, lineHeight: 1.5 }}>{desc}</div>
        </div>
        <span style={{ fontSize: 14, color: C.creamMuted, flexShrink: 0, marginTop: 2 }}>↗</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
        <span style={{ padding: "2px 7px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: langColor + "18", color: langColor }}>
          {item.lang === "es" ? "ES" : "EN"}
        </span>
        <span style={{ padding: "2px 7px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: (TYPE_COLORS[item.type] || C.creamMuted) + "28", color: TYPE_COLORS[item.type] || C.creamMuted }}>
          {typeLabel}
        </span>
      </div>
    </a>
  );
}
