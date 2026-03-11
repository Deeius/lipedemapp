import { useState, useEffect } from "react";
import { getForumPosts, insertForumPost, updateForumReactions } from "../../lib/db";

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

const STAGES = ["1", "2", "3", "4"];
const REACTIONS = ["💪", "❤️", "🙏"];
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

export default function CommunityForum({ lang, C, profile, userId }) {
  const [posts, setPosts] = useState([]);
  const [myReactions, setMyReactions] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ text: "", stage: "", country: "", treatment: "" });

  const treatmentsMap = TREATMENTS_MAP[lang] || TREATMENTS_MAP.es;

  // Load posts from Supabase
  useEffect(() => {
    getForumPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  // Load my reactions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(REACTIONS_KEY);
      if (stored) setMyReactions(JSON.parse(stored));
    } catch {}
  }, []);

  // Pre-fill from profile
  useEffect(() => {
    if (profile?.country && !form.country) {
      setForm((f) => ({ ...f, country: profile.country }));
    }
    if (profile?.stage && profile.stage !== "unknown" && !form.stage) {
      setForm((f) => ({ ...f, stage: String(profile.stage) }));
    }
  }, [profile]);

  const handleReact = async (post, emoji) => {
    if (!userId) return;
    const key = `${post.id}-${emoji}`;
    const already = myReactions[key];
    const delta = already ? -1 : 1;
    const newCount = Math.max(0, (post.reactions?.[emoji] || 0) + delta);
    const newReactions = { ...post.reactions, [emoji]: newCount };

    // Optimistic update
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, reactions: newReactions } : p)));
    const updatedMyReactions = { ...myReactions, [key]: !already };
    setMyReactions(updatedMyReactions);
    try {
      localStorage.setItem(REACTIONS_KEY, JSON.stringify(updatedMyReactions));
    } catch {}

    await updateForumReactions(post.id, newReactions);
  };

  const handleSubmit = async () => {
    if (!form.text.trim() || !userId) return;
    setSubmitting(true);
    const newPost = await insertForumPost(userId, {
      author_name: profile?.name?.trim() || (lang === "es" ? "Anónima" : "Anonymous"),
      text: form.text.trim(),
      stage: form.stage || null,
      country: form.country.trim() || null,
      treatment: form.treatment || null,
    });
    if (newPost) {
      setPosts((prev) => [newPost, ...prev]);
      setForm({ text: "", stage: form.stage, country: form.country, treatment: "" });
      setShowForm(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
    setSubmitting(false);
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
            {loading
              ? lang === "es"
                ? "Cargando…"
                : "Loading…"
              : lang === "es"
                ? `${posts.length} historias compartidas`
                : `${posts.length} stories shared`}
          </div>
        </div>
        {userId ? (
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
                ? "+ Compartir"
                : "+ Share"}
          </button>
        ) : (
          <div style={{ fontSize: 11, color: C.creamMuted, fontStyle: "italic" }}>
            {lang === "es" ? "Inicia sesión para participar" : "Sign in to participate"}
          </div>
        )}
      </div>

      {/* Success */}
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
          ✓ {lang === "es" ? "¡Gracias por compartir tu historia!" : "Thank you for sharing!"}
        </div>
      )}

      {/* Form */}
      {showForm && userId && (
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
                  ? "Comparte tu experiencia con el diagnóstico, tratamiento o día a día..."
                  : "Share your experience with diagnosis, treatment or daily life..."
              }
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
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
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {lang === "es" ? `Estadio ${s}` : `Stage ${s}`}
                  </option>
                ))}
              </select>
            </div>
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
              {lang === "es" ? "Tema" : "Topic"}
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
            disabled={!form.text.trim() || submitting}
            style={{
              padding: "10px 0",
              borderRadius: 10,
              border: "none",
              background: form.text.trim() && !submitting ? C.sage : C.border,
              color: form.text.trim() && !submitting ? "#fff" : C.creamMuted,
              fontSize: 13,
              fontWeight: 700,
              cursor: form.text.trim() && !submitting ? "pointer" : "default",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {submitting
              ? lang === "es"
                ? "Publicando…"
                : "Posting…"
              : lang === "es"
                ? "Publicar"
                : "Post"}
          </button>
        </div>
      )}

      {/* Posts list */}
      <div style={{ padding: "12px 18px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "20px", color: C.creamMuted, fontSize: 13 }}>
            {lang === "es" ? "Cargando historias…" : "Loading stories…"}
          </div>
        )}
        {!loading && posts.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "30px 20px", color: C.creamMuted, fontSize: 13 }}
          >
            {lang === "es"
              ? "Sé la primera en compartir tu historia 💪"
              : "Be the first to share your story 💪"}
          </div>
        )}
        {posts.map((post) => {
          const reacted = (emoji) => myReactions[`${post.id}-${emoji}`];
          return (
            <div
              key={post.id}
              style={{
                padding: "12px 14px",
                background: C.bg,
                borderRadius: 10,
                border: `1px solid ${C.border}`,
              }}
            >
              {/* Author */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.sage,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span style={{ fontSize: 14 }}>🌸</span>
                {post.author_name || (lang === "es" ? "Anónima" : "Anonymous")}
              </div>

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
                {post.country && (
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
                  {formatDate(post.created_at, lang)}
                </span>
              </div>

              {/* Reactions */}
              <div style={{ display: "flex", gap: 6 }}>
                {REACTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReact(post, emoji)}
                    disabled={!userId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 10px",
                      borderRadius: 20,
                      border: `1.5px solid ${reacted(emoji) ? C.sage : C.border}`,
                      background: reacted(emoji) ? C.creamFaint : "white",
                      fontSize: 12,
                      cursor: userId ? "pointer" : "default",
                      fontFamily: "inherit",
                      color: reacted(emoji) ? C.sage : C.creamMuted,
                      fontWeight: reacted(emoji) ? 700 : 500,
                      transition: "all 0.15s",
                    }}
                  >
                    <span>{emoji}</span>
                    <span style={{ fontSize: 11 }}>{post.reactions?.[emoji] || 0}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
