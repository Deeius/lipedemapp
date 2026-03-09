import WaterTracker from "./WaterTracker";
import InflammationTracker from "./InflammationTracker";
import SupplementsCheck from "./SupplementsCheck";
import PillTracker from "./PillTracker";
import CycleCalendar from "./CycleCalendar";

export default function TodayTab({
  entry,
  updateEntry,
  activeZones,
  activeSupps,
  allSuppsList,
  profile,
  cycleData,
  cycleMonth,
  setCycleMonth,
  cycleActiveType,
  setCycleActiveType,
  toggleCycleDay,
  setCycleData,
  saveLog,
  savedMsg,
  lang,
  C,
  S,
  t,
  ZoneCard,
  SliderInput,
}) {
  return (
    <>
      {/* Date + weight */}
      <div style={S.card}>
        <div style={S.cardTitle}>{t.today.title}</div>
        <div style={S.row}>
          <div style={S.col}>
            <label style={S.label}>{t.today.date}</label>
            <input
              style={S.input}
              type="date"
              value={entry.date}
              onChange={(e) => updateEntry("date", e.target.value)}
            />
          </div>
          <div style={S.col}>
            <label style={S.label}>{t.today.weight}</label>
            <input
              style={S.input}
              type="number"
              step="0.1"
              placeholder="65.5"
              value={entry.weight}
              onChange={(e) => updateEntry("weight", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Mood */}
      <div style={S.card}>
        <div style={S.cardTitle}>{t.today.mood}</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {t.moodOptions.map((m, i) => (
            <span
              key={i}
              onClick={() => updateEntry("mood", i)}
              style={{
                fontSize: 28,
                cursor: "pointer",
                opacity: entry.mood === i ? 1 : 0.3,
                transform: entry.mood === i ? "scale(1.3)" : "scale(1)",
                transition: "all 0.2s",
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Energy */}
      <div style={S.card}>
        <div style={S.cardTitle}>{t.today.energy}</div>
        <SliderInput
          value={entry.energy}
          onChange={(v) => updateEntry("energy", v)}
          labels={t.energyLabels}
          color="#6366f1"
        />
      </div>

      {/* Pain */}
      <div style={S.card}>
        <div style={S.cardTitle}>{t.today.pain}</div>
        <SliderInput
          value={entry.pain}
          onChange={(v) => updateEntry("pain", v)}
          labels={t.painLabels}
          color="#ef4444"
        />
      </div>

      {/* Water */}
      <div style={S.card}>
        <WaterTracker entry={entry} updateEntry={updateEntry} lang={lang} C={C} t={t} />
      </div>

      {/* Inflammation */}
      <div style={S.card}>
        <InflammationTracker
          entry={entry}
          updateEntry={updateEntry}
          activeZones={activeZones}
          lang={lang}
          C={C}
          S={S}
          t={t}
          ZoneCard={ZoneCard}
        />
      </div>

      {/* Measures */}
      {activeZones.length > 0 && (
        <div style={S.card}>
          <div style={S.cardTitle}>{t.today.measures}</div>
          <div style={S.grid2}>
            {activeZones.map((z) => (
              <div key={z}>
                <label style={S.label}>{t.today.zoneNames[z] || z}</label>
                <input
                  style={S.input}
                  type="number"
                  step="0.5"
                  placeholder="cm"
                  value={entry.measures?.[z] || ""}
                  onChange={(e) =>
                    updateEntry("measures", { ...entry.measures, [z]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Supplements */}
      {activeSupps.length > 0 && (
        <div style={S.card}>
          <SupplementsCheck
            entry={entry}
            updateEntry={updateEntry}
            activeSupps={activeSupps}
            allSuppsList={allSuppsList}
            lang={lang}
            C={C}
            S={S}
            t={t}
          />
        </div>
      )}

      {/* Cycle calendar */}
      <div style={S.card}>
        <CycleCalendar
          cycleData={cycleData}
          cycleMonth={cycleMonth}
          setCycleMonth={setCycleMonth}
          cycleActiveType={cycleActiveType}
          setCycleActiveType={setCycleActiveType}
          toggleCycleDay={toggleCycleDay}
          setCycleData={setCycleData}
          lang={lang}
          C={C}
        />
      </div>

      {/* Pill */}
      {profile.pillActive && (
        <div style={S.card}>
          <PillTracker
            entry={entry}
            updateEntry={updateEntry}
            profile={profile}
            lang={lang}
            C={C}
            S={S}
          />
        </div>
      )}

      <button style={S.btn} onClick={saveLog}>
        {savedMsg || t.today.save}
      </button>
    </>
  );
}
