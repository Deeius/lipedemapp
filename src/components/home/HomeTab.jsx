import HealthSummary from "./HealthSummary";
import CycleSummary from "./CycleSummary";
import SupplementsSummary from "./SupplementsSummary";
import DailyPhrase from "./DailyPhrase";
import DailyRecipe from "./DailyRecipe";
import QuickLinks from "./QuickLinks";
import Treatments from "./Treatments";

export default function HomeTab({
  logs,
  cycleData,
  activeSupps,
  allSuppsList,
  profile,
  lang,
  C,
  setTab,
  recipeExpanded,
  setRecipeExpanded,
}) {
  const lastLog = logs[logs.length - 1];

  return (
    <>
      {/* Greeting */}
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: C.cream,
            letterSpacing: "-0.5px",
            marginBottom: 2,
          }}
        >
          {lang === "es"
            ? `Hola${profile.name ? `, ${profile.name}` : ""}`
            : `Hello${profile.name ? `, ${profile.name}` : ""}`}{" "}
          👋
        </h2>
        <div style={{ fontSize: 13, color: C.creamMuted }}>
          {new Date().toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </div>
      </div>

      {/* 1. Health summary */}
      <HealthSummary logs={logs} lang={lang} C={C} setTab={setTab} />

      {/* 2. Cycle summary */}
      <CycleSummary cycleData={cycleData} lang={lang} C={C} setTab={setTab} />

      {/* 3. Supplements */}
      <SupplementsSummary
        activeSupps={activeSupps}
        lastLog={lastLog}
        allSuppsList={allSuppsList}
        lang={lang}
        C={C}
        setTab={setTab}
      />

      {/* 4. Daily phrase + personalized tip */}
      <DailyPhrase profile={profile} lang={lang} C={C} />

      {/* 5. Recipe of the day */}
      <DailyRecipe
        profile={profile}
        lang={lang}
        C={C}
        recipeExpanded={recipeExpanded}
        setRecipeExpanded={setRecipeExpanded}
      />

      {/* 6. Quick links */}
      <QuickLinks lang={lang} C={C} setTab={setTab} />

      {/* 7. Treatments */}
      <Treatments lang={lang} C={C} />
    </>
  );
}
