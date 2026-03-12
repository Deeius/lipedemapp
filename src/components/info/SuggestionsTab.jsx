import { useState } from "react";
import { insertSuggestion } from "../../lib/db";

const TYPES_ES = [
  { val: "bug", label: "🐛 Error o fallo", desc: "Algo no funciona como debería" },
  { val: "mejora", label: "✨ Mejora", desc: "Una función existente podría ser mejor" },
  { val: "idea", label: "💡 Idea nueva", desc: "Algo que te gustaría que existiera" },
  { val: "otro", label: "💬 Otro", desc: "Cualquier otra cosa que quieras contarnos" },
];

const TYPES_EN = [
  { val: "bug", label: "🐛 Bug or error", desc: "Something isn't working as expected" },
  { val: "mejora", label: "✨ Improvement", desc: "An existing feature could be better" },
  { val: "idea", label: "💡 New idea", desc: "Something you'd like to see added" },
  { val: "otro", label: "💬 Other", desc: "Anything else you'd like to tell us" },
];

export default function SuggestionsTab({ lang, C, S, userId }) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const t = lang === "es";
  const types = t ? TYPES_ES : TYPES_EN;

  const canSubmit = type !== "" && description.trim().length >= 10;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("loading");
    try {
      await insertSuggestion({
        user_id: userId || null,
        type,
        description: description.trim(),
        email: email.trim() || null,
      });
      setStatus("success");
      setType("");
      setDescription("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ padding: "32px 0", textAlign: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: C.creamFaint,
            border: `1.5px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: 28,
          }}
        >
          🌿
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: C.cream }}>
          {t ? "¡Gracias!" : "Thank you!"}
        </div>
        <div style={{ fontSize: 14, color: C.creamMuted, lineHeight: 1.6, marginBottom: 24 }}>
          {t
            ? "Hemos recibido tu sugerencia. La revisaremos con cariño."
            : "We've received your suggestion. We'll review it carefully."}
        </div>
        <button
          onClick={() => setStatus("idle")}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: `1.5px solid ${C.border}`,
            background: "white",
            color: C.sage,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {t ? "Enviar otra" : "Send another"}
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.cream, marginBottom: 6 }}>
          {t ? "Sugerencias" : "Suggestions"}
        </div>
        <div style={{ fontSize: 13, color: C.creamMuted, lineHeight: 1.6 }}>
          {t
            ? "¿Tienes una idea, encontraste un error o quieres contarnos algo? Tu opinión nos ayuda a mejorar."
            : "Have an idea, found a bug, or want to tell us something? Your feedback helps us improve."}
        </div>
      </div>

      {/* Tipo */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.creamMuted,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 10,
          }}
        >
          {t ? "Tipo de sugerencia" : "Type"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {types.map((tp) => (
            <div
              key={tp.val}
              onClick={() => setType(tp.val)}
              style={{
                padding: "12px",
                borderRadius: 12,
                border: `2px solid ${type === tp.val ? C.sage : C.border}`,
                background: type === tp.val ? C.creamFaint : "white",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: type === tp.val ? C.sage : C.cream,
                  marginBottom: 2,
                }}
              >
                {tp.label}
              </div>
              <div style={{ fontSize: 11, color: C.creamMuted }}>{tp.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Descripción */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.creamMuted,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 8,
          }}
        >
          {t ? "Descripción" : "Description"}
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            t
              ? "Cuéntanos con detalle lo que quieres transmitirnos…"
              : "Tell us in detail what you'd like to share…"
          }
          rows={5}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            border: `1.5px solid ${C.border}`,
            fontSize: 14,
            fontFamily: "inherit",
            color: C.cream,
            background: "#f7faf8",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
            lineHeight: 1.5,
          }}
        />
        <div style={{ fontSize: 11, color: C.creamMuted, marginTop: 4 }}>
          {description.trim().length} / 10 {t ? "mínimo" : "minimum"}
        </div>
      </div>

      {/* Email opcional */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.creamMuted,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 8,
          }}
        >
          {t ? "Email de contacto (opcional)" : "Contact email (optional)"}
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t ? "para que podamos responderte" : "so we can reply to you"}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            border: `1.5px solid ${C.border}`,
            fontSize: 14,
            fontFamily: "inherit",
            color: C.cream,
            background: "#f7faf8",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <div style={{ fontSize: 13, color: "#b84040", marginBottom: 12 }}>
          {t ? "Error al enviar. Inténtalo de nuevo." : "Error sending. Please try again."}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || status === "loading"}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border: "none",
          background: canSubmit ? C.sage : C.border,
          color: canSubmit ? "#fff" : C.creamMuted,
          fontSize: 15,
          fontWeight: 700,
          cursor: canSubmit ? "pointer" : "default",
          fontFamily: "inherit",
          transition: "background 0.2s",
        }}
      >
        {status === "loading"
          ? t
            ? "Enviando…"
            : "Sending…"
          : t
            ? "Enviar sugerencia"
            : "Send suggestion"}
      </button>

      {!userId && (
        <div style={{ fontSize: 12, color: C.creamMuted, textAlign: "center", marginTop: 10 }}>
          {t
            ? "Puedes enviar sugerencias sin cuenta, pero no podremos responderte."
            : "You can send suggestions without an account, but we won't be able to reply."}
        </div>
      )}
    </div>
  );
}
