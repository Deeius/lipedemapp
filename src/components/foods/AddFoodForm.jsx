export default function AddFoodForm({ newFood, setNewFood, addFood, lang, C, S, t }) {
  return (
    <div style={S.card}>
      <div style={S.cardTitle}>{t.foods.add}</div>

      <label style={S.label}>{t.foods.name}</label>
      <input
        style={{ ...S.input, marginBottom: 10 }}
        placeholder={t.foods.namePlaceholder}
        value={newFood.name}
        onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
      />

      <label style={S.label}>{t.foods.category}</label>
      <select
        style={{ ...S.input, marginBottom: 10 }}
        value={newFood.category}
        onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
      >
        {Object.entries(t.foods.categories).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>

      <label style={S.label}>{t.foods.reaction}</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {["good", "bad", "neutral"].map((r) => (
          <button
            key={r}
            style={{ ...S.btnSm(newFood.reaction === r ? S.reactionColor[r] : null), flex: 1 }}
            onClick={() => setNewFood({ ...newFood, reaction: r })}
          >
            {t.foods[r]}
          </button>
        ))}
      </div>

      <label style={S.label}>{t.foods.notes}</label>
      <textarea
        style={{ ...S.textarea, marginBottom: 14 }}
        placeholder={t.foods.notesPlaceholder}
        value={newFood.notes}
        onChange={(e) => setNewFood({ ...newFood, notes: e.target.value })}
      />

      <button style={S.btn} onClick={addFood}>
        {t.foods.add}
      </button>
    </div>
  );
}
