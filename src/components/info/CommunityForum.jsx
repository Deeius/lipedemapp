import { useState, useEffect } from "react";

const SEED_POSTS = {
  es: [
    {
      id: "seed-1",
      text: "Después de 2 años con DLM semanal y compresión, el dolor al caminar ha bajado de un 8 a un 3. No me lo creía posible.",
      stage: "2",
      country: "España",
      treatment: "conservative",
      date: "2025-11-03",
      reactions: { "💪": 14, "❤️": 9, "🙏": 5 },
    },
    {
      id: "seed-2",
      text: "La cirugía WAL me cambió la vida. Tardé 6 meses en recuperarme bien, pero por fin puedo hacer senderismo.",
      stage: "3",
      country: "México",
      treatment: "surgical",
      date: "2025-10-18",
      reactions: { "💪": 22, "❤️": 17, "🙏": 8 },
    },
    {
      id: "seed-3",
      text: "Empecé la dieta antiinflamatoria hace 4 meses. No he perdido volumen pero la sensación de pesadez ha mejorado muchísimo.",
      stage: "1",
      country: "Argentina",
      treatment: "diet",
      date: "2025-12-01",
      reactions: { "💪": 10, "❤️": 12, "🙏": 3 },
    },
    {
      id: "seed-4",
      text: "Lo más difícil fue encontrar un médico que me tomara en serio. Una vez con el diagnóstico, todo cambió.",
      stage: "2",
      country: "Colombia",
      treatment: "diagnosis",
      date: "2026-01-14",
      reactions: { "💪": 31, "❤️": 28, "🙏": 19 },
    },
  ],
  en: [
    {
      id: "seed-1",
      text: "After 2 years of weekly MLD and compression, the pain when walking has gone from an 8 to a 3. I couldn't believe it was possible.",
      stage: "2",
      country: "Spain",
      treatment: "conservative",
      date: "2025-11-03",
      reactions: { "💪": 14, "❤️": 9, "🙏": 5 },
    },
    {
      id: "seed-2",
      text: "WAL surgery changed my life. It took 6 months to recover properly, but I can finally go hiking.",
      stage: "3",
      country: "Mexico",
      treatment: "surgical",
      date: "2025-10-18",
      reactions: { "💪": 22, "❤️": 17, "🙏": 8 },
    },
    {
      id: "seed-3",
      text: "I started the anti-inflammatory diet 4 months ago. I haven't lost volume but the heaviness has improved enormously.",
      stage: "1",
      country: "Argentina",
      treatment: "diet",
      date: "2025-12-01",
      reactions: { "💪": 10, "❤️": 12, "🙏": 3 },
    },
    {
      id: "seed-4",
      text: "The hardest part was finding a doctor who took me seriously. Once I had the diagnosis, everything changed.",
      stage: "2",
      country: "Colombia",
      treatment: "diagnosis",
      date: "2026-01-14",
      reactions: { "💪": 31, "❤️": 28, "🙏": 19 },
    },
  ],
};

const TREATMENTS_MAP = {
  es: {
    conservative: "Tratamiento conservador",
    surgical: "Cirugía",
    diet: "Dieta antiinflamatoria",
    diagnosis: "Proceso de diagnóstico",
    other: "Otro",
  },
  en: {
    conservative: "Conservative treatment",
    surgical: "Surgery",
    diet: "Anti-inflammatory diet",
    diagnosis: "Diagnosis journey",
    other: "Other",
  },
};

const STAGES = {
  es: ["1", "2", "3", "4", "No sé"],
  en: ["1", "2", "3", "4", "Unknown"],
};

const REACTIONS = ["💪", "❤️", "🙏"];

const STORAGE_KEY = "lt_forum_posts";
const REACTIONS_KEY = "lt_forum_reactions";

function formatDate(dateStr, lang) {
  try {
    return new Date(dateStr).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function CommunityForum({ lang, C, profile }) {
  const [userPosts, setUserPosts] = useState([]);
  const [myReactions, setMyReactions] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    text: "",
    stage: "",
    country: "",
    treatment: "",
  });

  const seedPosts = SEED_POSTS[lang] || SEED_POSTS.es;
  const treatmentsMap = TREATMENTS_MAP[lang] || TREATMENTS_MAP.es;
  const stages = STAGES[lang] || STAGES.es;

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUserPosts(JSON.parse(stored));
      const reacts = localStorage.getItem(REACTIONS_KEY);
      if (reacts) setMyReactions(JSON.parse(reacts));
    } catch {}
  }, []);

  // Pre-fill country from profile
  useEffect(() => {
    if (profile?.country && !form.country) {
      setForm((f) => ({ ...f, country: profile.country }));
    }
    if (profile?.stage && profile.stage !== "unknown" && !form.stage) {
      setForm((f) => ({ ...f, stage: String(profile.stage) }));
    }
  }, [profile]);

  const allPosts = [
    ...seedPosts.map((p) => ({ ...p, isSeed: true })),
    ...userPosts.map((p) => ({ ...p, isSeed: false })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleReact = (postId, emoji) => {
    const key = `${postId}-${emoji}`;
    const already = myReactions[key];

    // Update local reactions state (for seeds + user posts display)
    setMyReactions((prev) => {
      const updated = { ...prev, [key]: !already };
      try {
        localStorage.setItem(REACTIONS_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // If user post, update the stored count
    setUserPosts((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== postId) return p;
        const delta = already ? -1 : 1;
        return {
          ...p,
          reactions: { ...p.reactions, [emoji]: Math.max(0, (p.reactions[emoji] || 0) + delta) },
        };
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const getReactionCount = (post, emoji) => {
    const base = post.reactions?.[emoji] || 0;
    if (!post.isSeed) return base;
    // For seed posts, adjust count based on my reaction
    const key = `${post.id}-${emoji}`;
    const reacted = myReactions[key];
    return reacted ? base + 1 : base;
  };

  const handleSubmit = () => {
    if (!form.text.trim()) return;
    const newPost = {
      id: `user-${Date.now()}`,
      text: form.text.trim(),
      stage: form.stage || (lang === "es" ? "No sé" : "Unknown"),
      country: form.country.trim() || "—",
      treatment: form.treatment || "other",
      date: new Date().toISOString().split("T")[0],
      reactions: { "💪": 0, "❤️": 0, "🙏": 0 },
    };
    const updated = [...userPosts, newPost];
    setUserPosts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    setForm({ text: "", stage: form.stage, country: form.country, treatment: "" });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      style={{
        background: C.bgCard,
        borderRadius: 14,
        marginBottom: 16,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 4px rgba(74,110,87,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 18px 12px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: C.sage,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              marginBottom: 2,
            }}
          >
            💬 {lang === "es" ? "Experiencias reales" : "Real experiences"}
          </div>
          <div style={{ fontSize: 12, color: C.creamMuted }}>
            {lang === "es"
              ? `${allPosts.length} historias compartidas`
              : `${allPosts.length} stories shared`}
          </div>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            padding: "8px 14px",
            borderRadius: 10,
            border: `1.5px solid ${showForm ? C.border : C.sage}`,
            background: showForm ? C.creamFaint : C.sage,
            color: showForm ? C.creamMuted : "#fff",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
          }}
        >
          {showForm
            ? lang === "es"
              ? "Cancelar"
              : "Cancel"
            : lang === "es"
              ? "+ Compartir mi historia"
              : "+ Share my story"}
        </button>
      </div>

      {/* Success message */}
      {submitted && (
        <div
          style={{
            padding: "10px 18px",
            background: "#f0f9f4",
            borderBottom: `1px solid ${C.border}`,
            fontSize: 12,
            fontWeight: 600,
            color: C.sage,
          }}
        >
          ✓{" "}
          {lang === "es"
            ? "¡Gracias por compartir tu historia!"
            : "Thank you for sharing your story!"}
        </div>
      )}

      {/* New post form */}
      {showForm && (
        <div
          style={{
            padding: "16px 18px",
            background: C.bg,
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.creamMuted,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 5,
              }}
            >
              {lang === "es" ? "Tu historia *" : "Your story *"}
            </div>
            <textarea
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: `1.5px solid ${C.border}`,
                fontSize: 13,
                outline: "none",
                background: "white",
                boxSizing: "border-box",
                resize: "vertical",
                minHeight: 90,
                fontFamily: "inherit",
                color: C.cream,
                lineHeight: 1.5,
              }}
              placeholder={
                lang === "es"
                  ? "Comparte tu experiencia con el diagnóstico, tratamiento o día a día con lipedema..."
                  : "Share your experience with diagnosis, treatment or daily life with lipedema..."
              }
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {/* Stage */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.creamMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 5,
                }}
              >
                {lang === "es" ? "Estadio" : "Stage"}
              </div>
              <select
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: `1.5px solid ${C.border}`,
                  fontSize: 12,
                  fontFamily: "inherit",
                  background: "white",
                  color: C.cream,
                  outline: "none",
                }}
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
              >
                <option value="">{lang === "es" ? "Selecciona…" : "Select…"}</option>
                {stages.map((s) => (
                  <option key={s} value={s}>
                    {lang === "es" ? `Estadio ${s}` : `Stage ${s}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Country */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.creamMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 5,
                }}
              >
                {lang === "es" ? "País" : "Country"}
              </div>
              <input
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: `1.5px solid ${C.border}`,
                  fontSize: 12,
                  fontFamily: "inherit",
                  background: "white",
                  color: C.cream,
                  outline: "none",
                  boxSizing: "border-box",
                }}
                placeholder={lang === "es" ? "España, México…" : "Spain, Mexico…"}
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </div>
          </div>

          {/* Treatment */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.creamMuted,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 5,
              }}
            >
              {lang === "es" ? "Sobre qué trata" : "Topic"}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.entries(treatmentsMap).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setForm({ ...form, treatment: key })}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 20,
                    border: `1.5px solid ${form.treatment === key ? C.sage : C.border}`,
                    background: form.treatment === key ? C.creamFaint : "white",
                    fontSize: 11,
                    fontWeight: 600,
                    color: form.treatment === key ? C.sage : C.creamMuted,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!form.text.trim()}
            style={{
              padding: "10px 0",
              borderRadius: 10,
              border: "none",
              background: form.text.trim() ? C.sage : C.border,
              color: form.text.trim() ? "#fff" : C.creamMuted,
              fontSize: 13,
              fontWeight: 700,
              cursor: form.text.trim() ? "pointer" : "default",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {lang === "es" ? "Publicar" : "Post"}
          </button>
        </div>
      )}

      {/* Posts list */}
      <div style={{ padding: "12px 18px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {allPosts.map((post) => (
          <div
            key={post.id}
            style={{
              padding: "12px 14px",
              background: C.bg,
              borderRadius: 10,
              border: `1px solid ${C.border}`,
            }}
          >
            {/* Text */}
            <p
              style={{
                fontSize: 13,
                color: C.cream,
                lineHeight: 1.6,
                fontStyle: "italic",
                margin: "0 0 10px",
              }}
            >
              "{post.text}"
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
              {post.stage && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.sage,
                    background: C.creamFaint,
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  {lang === "es" ? `Estadio ${post.stage}` : `Stage ${post.stage}`}
                </span>
              )}
              {post.country && post.country !== "—" && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.creamMuted,
                    background: C.creamFaint,
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  {post.country}
                </span>
              )}
              {post.treatment && treatmentsMap[post.treatment] && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.accent,
                    background: `${C.accent}15`,
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  {treatmentsMap[post.treatment]}
                </span>
              )}
              <span
                style={{
                  fontSize: 10,
                  color: C.creamMuted,
                  marginLeft: "auto",
                  alignSelf: "center",
                }}
              >
                {formatDate(post.date, lang)}
              </span>
            </div>

            {/* Reactions */}
            <div style={{ display: "flex", gap: 6 }}>
              {REACTIONS.map((emoji) => {
                const count = getReactionCount(post, emoji);
                const reacted = myReactions[`${post.id}-${emoji}`];
                return (
                  <button
                    key={emoji}
                    onClick={() => handleReact(post.id, emoji)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 10px",
                      borderRadius: 20,
                      border: `1.5px solid ${reacted ? C.sage : C.border}`,
                      background: reacted ? C.creamFaint : "white",
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      color: reacted ? C.sage : C.creamMuted,
                      fontWeight: reacted ? 700 : 500,
                      transition: "all 0.15s",
                    }}
                  >
                    <span>{emoji}</span>
                    <span style={{ fontSize: 11 }}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
