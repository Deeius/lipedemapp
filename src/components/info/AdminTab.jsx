import { useState, useEffect } from "react";
import { getSuggestions, updateSuggestionStatus } from "../../lib/db";

const STATUS_COLORS = {
  new: { bg: "#fff8e1", border: "#f0c040", text: "#8a6c3a" },
  read: { bg: "#e8f4fd", border: "#6aade4", text: "#2d6a9f" },
  done: { bg: "#e4eeea", border: "#4d8a6e", text: "#4d8a6e" },
};

const TYPE_LABELS = {
  bug: "🐛 Error",
  mejora: "✨ Mejora",
  idea: "💡 Idea",
  otro: "💬 Otro",
};

export default function AdminTab({ lang, C }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const t = lang === "es";

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    setLoading(true);
    const data = await getSuggestions();
    setSuggestions(data);
    setLoading(false);
  };

  const handleStatus = async (id, newStatus) => {
    await updateSuggestionStatus(id, newStatus);
    setSuggestions((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  const filtered = filter === "all" ? suggestions : suggestions.filter((s) => s.status === filter);
  const counts = {
    all: suggestions.length,
    new: suggestions.filter((s) => s.status === "new").length,
    read: suggestions.filter((s) => s.status === "read").length,
    done: suggestions.filter((s) => s.status === "done").length,
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.cream, marginBottom: 4 }}>
          {t ? "Panel de administración" : "Admin panel"}
        </div>
        <div style={{ fontSize: 13, color: C.creamMuted }}>
          {t ? "Sugerencias de usuarias" : "User suggestions"}
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { key: "all", label: t ? "Todas" : "All" },
          { key: "new", label: t ? "Nuevas" : "New" },
          { key: "read", label: t ? "Leídas" : "Read" },
          { key: "done", label: t ? "Resueltas" : "Done" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "6px 12px",
              borderRadius: 20,
              border: `1.5px solid ${filter === f.key ? C.sage : C.border}`,
              background: filter === f.key ? C.creamFaint : "white",
              color: filter === f.key ? C.sage : C.creamMuted,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {f.label} {counts[f.key] > 0 && `(${counts[f.key]})`}
          </button>
        ))}

        <button
          onClick={loadSuggestions}
          style={{
            marginLeft: "auto",
            padding: "6px 12px",
            borderRadius: 20,
            border: `1.5px solid ${C.border}`,
            background: "white",
            color: C.creamMuted,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          ↻ {t ? "Actualizar" : "Refresh"}
        </button>
      </div>

      {/* Lista */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: C.creamMuted, fontSize: 14 }}>
          {t ? "Cargando…" : "Loading…"}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: C.creamMuted, fontSize: 14 }}>
          {t ? "No hay sugerencias" : "No suggestions yet"}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((s) => {
            const sc = STATUS_COLORS[s.status];
            const isOpen = expanded === s.id;
            return (
              <div
                key={s.id}
                style={{
                  borderRadius: 12,
                  border: `1.5px solid ${C.border}`,
                  background: "white",
                  overflow: "hidden",
                }}
              >
                {/* Row */}
                <div
                  onClick={() => {
                    setExpanded(isOpen ? null : s.id);
                    if (s.status === "new") handleStatus(s.id, "read");
                  }}
                  style={{
                    padding: "12px 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{TYPE_LABELS[s.type]?.split(" ")[0]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.cream, marginBottom: 2 }}>
                      {TYPE_LABELS[s.type]}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: C.creamMuted,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.description}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 4,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 10,
                        background: sc.bg,
                        border: `1px solid ${sc.border}`,
                        color: sc.text,
                      }}
                    >
                      {s.status === "new"
                        ? t
                          ? "Nueva"
                          : "New"
                        : s.status === "read"
                          ? t
                            ? "Leída"
                            : "Read"
                          : t
                            ? "Resuelta"
                            : "Done"}
                    </span>
                    <span style={{ fontSize: 10, color: C.creamMuted }}>
                      {new Date(s.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB")}
                    </span>
                  </div>
                  <span style={{ color: C.creamMuted, fontSize: 12 }}>{isOpen ? "▲" : "▼"}</span>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div
                    style={{
                      padding: "0 14px 14px",
                      borderTop: `1px solid ${C.border}`,
                      paddingTop: 12,
                    }}
                  >
                    <div
                      style={{ fontSize: 13, color: C.cream, lineHeight: 1.6, marginBottom: 12 }}
                    >
                      {s.description}
                    </div>

                    {s.email && (
                      <div style={{ fontSize: 12, color: C.creamMuted, marginBottom: 12 }}>
                        ✉{" "}
                        <a href={`mailto:${s.email}`} style={{ color: C.sage }}>
                          {s.email}
                        </a>
                      </div>
                    )}

                    {/* Acciones */}
                    <div style={{ display: "flex", gap: 8 }}>
                      {s.status !== "read" && (
                        <button
                          onClick={() => handleStatus(s.id, "read")}
                          style={btnStyle(C, false)}
                        >
                          {t ? "Marcar leída" : "Mark read"}
                        </button>
                      )}
                      {s.status !== "done" && (
                        <button
                          onClick={() => handleStatus(s.id, "done")}
                          style={btnStyle(C, true)}
                        >
                          {t ? "Marcar resuelta" : "Mark done"}
                        </button>
                      )}
                      {s.status !== "new" && (
                        <button
                          onClick={() => handleStatus(s.id, "new")}
                          style={btnStyle(C, false)}
                        >
                          {t ? "Reabrir" : "Reopen"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function btnStyle(C, primary) {
  return {
    padding: "6px 12px",
    borderRadius: 8,
    border: "none",
    background: primary ? C.sage : C.creamFaint,
    color: primary ? "#fff" : C.creamMuted,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  };
}
