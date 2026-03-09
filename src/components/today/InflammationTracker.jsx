export default function InflammationTracker({
  entry,
  updateEntry,
  activeZones,
  lang,
  C,
  S,
  t,
  ZoneCard,
}) {
  return (
    <>
      <div style={S.cardTitle}>{t.today.inflammation}</div>
      {activeZones.length === 0 && (
        <p style={{ color: C.creamMuted, fontSize: 13 }}>
          {lang === "es" ? "Configura tus zonas en el Perfil" : "Set up your zones in Profile"}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {activeZones.map((z) => (
          <ZoneCard
            key={z}
            zone={z}
            zoneName={t.today.zoneNames[z] || z}
            value={entry.inflammationZones?.[z] || 0}
            onChange={(v) =>
              updateEntry("inflammationZones", { ...entry.inflammationZones, [z]: v })
            }
          />
        ))}
      </div>
      <div style={{ marginTop: 14 }}>
        <label style={S.label}>{t.today.inflammationNote}</label>
        <textarea
          style={S.textarea}
          placeholder={t.today.inflammationNotePlaceholder}
          value={entry.inflammationNote}
          onChange={(e) => updateEntry("inflammationNote", e.target.value)}
        />
      </div>
    </>
  );
}
