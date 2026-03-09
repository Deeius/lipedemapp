import Icon from "../shared/Icon";

export default function ProfileTab({
  profile,
  setProfile,
  activeZones,
  saveProfile,
  profileSaved,
  ALLERGENS,
  ALL_ZONES,
  lang,
  C,
  S,
  t,
}) {
  return (
    <div style={S.card}>
      <div style={S.cardTitle}>{t.profile.title}</div>

      {/* Name */}
      <label style={S.label}>{t.profile.name}</label>
      <input
        style={{ ...S.input, marginBottom: 12 }}
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />

      {/* Stage */}
      <label style={S.label}>{t.profile.stage}</label>
      <select
        style={{ ...S.input, marginBottom: 12 }}
        value={profile.stage}
        onChange={(e) => setProfile({ ...profile, stage: e.target.value })}
      >
        {Object.entries(t.profile.stages).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>

      {/* Diagnosis date */}
      <label style={S.label}>{t.profile.diagnosis}</label>
      <input
        style={{ ...S.input, marginBottom: 16 }}
        type="date"
        value={profile.diagnosis}
        onChange={(e) => setProfile({ ...profile, diagnosis: e.target.value })}
      />

      {/* Country */}
      <label style={S.label}>{lang === "es" ? "País" : "Country"}</label>
      <input
        style={{ ...S.input, marginBottom: 8 }}
        placeholder={lang === "es" ? "España, México…" : "Spain, Mexico…"}
        value={profile.country || ""}
        onChange={(e) => setProfile({ ...profile, country: e.target.value })}
      />

      {/* Region */}
      <label style={S.label}>{lang === "es" ? "Provincia / Ciudad" : "Region / City"}</label>
      <input
        style={{ ...S.input, marginBottom: 16 }}
        placeholder={lang === "es" ? "Madrid, Barcelona…" : "Madrid, Barcelona…"}
        value={profile.region || ""}
        onChange={(e) => setProfile({ ...profile, region: e.target.value })}
      />

      {/* Pill */}
      <label style={S.label}>
        {lang === "es" ? "Anticonceptivo hormonal (píldora)" : "Hormonal contraceptive (pill)"}
      </label>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {[
          { val: true,  label: lang === "es" ? "Sí, la tomo" : "Yes, I take it" },
          { val: false, label: lang === "es" ? "No la tomo"  : "No, I don't" },
        ].map((o) => (
          <button
            key={String(o.val)}
            onClick={() => setProfile({ ...profile, pillActive: o.val })}
            style={{
              flex: 1, padding: "9px 12px", borderRadius: 10,
              border: `1.5px solid ${profile.pillActive === o.val ? C.sage : C.border}`,
              background: profile.pillActive === o.val ? C.creamFaint : "white",
              fontSize: 12, fontWeight: 700,
              color: profile.pillActive === o.val ? C.sage : C.creamMuted,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
      {profile.pillActive && (
        <>
          <label style={S.label}>
            {lang === "es" ? "Marca o nombre comercial" : "Brand or commercial name"}
          </label>
          <input
            style={{ ...S.input, marginBottom: 16 }}
            placeholder={lang === "es" ? "Ej: Yasmin, Diane 35, Loette…" : "e.g. Yasmin, Microgynon, Cilest…"}
            value={profile.pillBrand || ""}
            onChange={(e) => setProfile({ ...profile, pillBrand: e.target.value })}
          />
        </>
      )}

      {/* Intolerances */}
      <label style={S.label}>{t.profile.intolerances}</label>
      <div style={{ fontSize: 12, color: C.creamMuted, marginBottom: 10 }}>
        {t.profile.intolerancesHint}
      </div>
      <div style={S.grid2}>
        {ALLERGENS.map((a) => {
          const sel = (profile.intolerances || []).includes(a.key);
          return (
            <div
              key={a.key}
              onClick={() => {
                const cur = profile.intolerances || [];
                const updated = sel ? cur.filter((x) => x !== a.key) : [...cur, a.key];
                setProfile({ ...profile, intolerances: updated });
              }}
              style={{
                padding: "8px 12px", borderRadius: 8,
                border: `1.5px solid ${sel ? C.sage : C.border}`,
                cursor: "pointer", fontSize: 13,
                fontWeight: sel ? 700 : 400,
                color: sel ? C.sageLight : C.creamMuted,
                background: sel ? C.creamFaint : C.bgInput,
                transition: "all 0.2s",
              }}
            >
              {a.icon} {sel ? "✓ " : ""}{lang === "es" ? a.es : a.en}
            </div>
          );
        })}
      </div>

      {/* Active zones */}
      <label style={{ ...S.label, marginTop: 16 }}>{t.profile.activeZones}</label>
      <div style={S.grid2}>
        {ALL_ZONES.map((z) => {
          const active = activeZones.includes(z);
          return (
            <div
              key={z}
              onClick={() => {
                const updated = active
                  ? activeZones.filter((x) => x !== z)
                  : [...activeZones, z];
                setProfile({ ...profile, activeZones: updated });
              }}
              style={{
                padding: "8px 12px", borderRadius: 8,
                border: `1.5px solid ${active ? C.sage : C.border}`,
                cursor: "pointer", fontSize: 13,
                fontWeight: active ? 700 : 400,
                color: active ? C.sageLight : C.creamMuted,
                background: active ? C.creamFaint : C.bgInput,
                transition: "all 0.2s",
              }}
            >
              {active ? "✓ " : ""}{t.today.zoneNames[z] || z}
            </div>
          );
        })}
      </div>

      {/* Zone tip */}
      {(() => {
        const hasArms = activeZones.some((z) => z.includes("Arm"));
        const hasLegs = activeZones.some((z) =>
          ["leftThigh", "rightThigh", "leftCalf", "rightCalf", "ankles", "hips"].includes(z)
        );
        if (!hasArms && !hasLegs) return null;
        const msg = hasArms && hasLegs
          ? lang === "es"
            ? "Tipo combinado (Brazos + Piernas) — El lipedema puede afectar extremidades superiores e inferiores simultáneamente. Cada zona puede progresar de forma diferente y requerir compresión y tratamiento específicos."
            : "Combined type (Arms + Legs) — Lipedema can affect upper and lower limbs simultaneously. Each area may progress differently and require specific compression and treatment."
          : lang === "es"
            ? "Tipo 4 (Brazos) — El lipedema en brazos suele afectar del hombro al codo. Puede presentarse solo o junto con afectación en piernas."
            : "Type 4 (Arms) — Arm lipedema typically affects shoulder to elbow. It can occur alone or alongside leg involvement.";
        return (
          <div style={{
            marginTop: 12, padding: "12px 14px", borderRadius: 10,
            background: C.creamFaint, border: `1px solid ${C.border}`,
            fontSize: 12, color: C.cream, lineHeight: 1.5,
            display: "flex", alignItems: "flex-start", gap: 6,
          }}>
            <Icon name="lightbulb" size={14} color={C.sage} />
            <span>{msg}</span>
          </div>
        );
      })()}

      <button style={{ ...S.btn, marginTop: 20 }} onClick={saveProfile}>
        {profileSaved ? t.profile.saved : t.profile.save}
      </button>
    </div>
  );
}
