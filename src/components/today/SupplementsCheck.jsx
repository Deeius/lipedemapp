export default function SupplementsCheck({
  entry,
  updateEntry,
  activeSupps,
  allSuppsList,
  lang,
  C,
  S,
  t,
}) {
  return (
    <>
      <div style={S.cardTitle}>{t.today.todaysSupps}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {activeSupps.map((a) => {
          const def = allSuppsList.find((s) => s.key === a.key);
          if (!def) return null;
          const name = lang === "es" ? def.es : def.en;
          const taken = (entry.suppsTaken || []).includes(a.key);
          return (
            <div
              key={a.key}
              onClick={() => {
                const curr = entry.suppsTaken || [];
                updateEntry(
                  "suppsTaken",
                  taken ? curr.filter((k) => k !== a.key) : [...curr, a.key]
                );
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 20,
                border: `1.5px solid ${taken ? C.sage : C.border}`,
                background: taken ? C.sage : C.bgInput,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 16 }}>{def.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: taken ? "#fff" : C.cream }}>
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
