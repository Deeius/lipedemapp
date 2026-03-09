export default function FoodsList({ foods, removeFood, C, S, t }) {
  return (
    <div style={S.card}>
      <div style={S.cardTitle}>{t.foods.list}</div>
      {foods.length === 0 ? (
        <p style={{ color: C.creamMuted, fontSize: 13 }}>{t.foods.empty}</p>
      ) : (
        foods.map((f) => (
          <div
            key={f.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "10px 0",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{f.name}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <span style={S.tag(S.reactionColor[f.reaction])}>{t.foods[f.reaction]}</span>
                <span style={S.tag(C.creamMuted)}>{t.foods.categories[f.category]}</span>
              </div>
              {f.notes && (
                <div style={{ fontSize: 12, color: C.creamMuted, marginTop: 4 }}>{f.notes}</div>
              )}
            </div>
            <button
              onClick={() => removeFood(f.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: C.creamMuted, fontSize: 20, padding: "0 4px",
              }}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  );
}
