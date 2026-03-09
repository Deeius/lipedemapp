import Icon from "../shared/Icon";

const PHRASES_ES = [
  "Tu cuerpo merece cuidado, no castigo. Pequeños pasos cuentan.",
  "Registrar es un acto de amor propio. Lo estás haciendo genial.",
  "El lipedema no te define — tu constancia sí.",
  "Cada dato que guardas es un paso más hacia entenderte mejor.",
  "Hoy es un buen día para cuidarte un poco más.",
  "La inflamación fluctúa, tu fuerza no.",
  "Conocer tu cuerpo es el primer paso para aliviarlo.",
];

const PHRASES_EN = [
  "Your body deserves care, not punishment. Small steps count.",
  "Tracking is an act of self-love. You're doing great.",
  "Lipedema doesn't define you — your consistency does.",
  "Every data point is a step toward understanding yourself better.",
  "Today is a great day to take care of yourself a little more.",
  "Inflammation fluctuates, your strength does not.",
  "Knowing your body is the first step to easing it.",
];

const ZONE_TIPS = {
  both: {
    es: [
      "El lipedema en brazos y piernas requiere compresión adaptada a cada zona. Consulta con tu especialista sobre prendas de manga completa.",
      "Si tienes afectación en brazos y piernas, prioriza ejercicios acuáticos: la presión del agua comprime todas las zonas por igual.",
      "El drenaje linfático manual debe cubrir brazos y piernas por separado — no omitas los brazos en tus sesiones.",
      "Registra la inflamación de brazos y piernas por separado: pueden evolucionar de forma diferente.",
    ],
    en: [
      "Lipedema in both arms and legs requires compression tailored to each area. Ask your specialist about full-sleeve garments.",
      "With both arm and leg involvement, prioritise aquatic exercise: water pressure compresses all zones evenly.",
      "Manual lymphatic drainage should cover arms and legs separately — don't skip arms in your sessions.",
      "Track arm and leg inflammation separately: they can progress differently and may need different treatments.",
    ],
  },
  arms: {
    es: [
      "El lipedema en brazos (Tipo 4) se beneficia de mangas de compresión médica, especialmente durante el ejercicio.",
      "Ejercicios suaves de remo y natación fortalecen los brazos sin impacto, ideal para lipedema en miembros superiores.",
      "El cepillado en seco en brazos, siempre hacia el corazón, puede mejorar la circulación linfática.",
      "Los brazos con lipedema son propensos a hematomas: evita cargar peso excesivo y usa protección si es necesario.",
    ],
    en: [
      "Arm lipedema (Type 4) benefits from medical compression sleeves, especially during exercise.",
      "Gentle rowing and swimming strengthen arms without impact — ideal for upper limb lipedema.",
      "Dry brushing on arms, always toward the heart, can improve lymphatic circulation.",
      "Arms with lipedema bruise easily: avoid excessive weight-bearing and use protection if needed.",
    ],
  },
  legs: {
    es: [
      "Caminar 30 minutos al día es uno de los ejercicios más efectivos para el lipedema en piernas.",
      "Eleva las piernas 15 minutos antes de dormir para favorecer el retorno linfático.",
      "Las medias de compresión de tejido plano son las más recomendadas para lipedema en piernas.",
      "Evita estar de pie o sentada más de 1 hora seguida — los descansos activos reducen la hinchazón en piernas.",
    ],
    en: [
      "Walking 30 minutes a day is one of the most effective exercises for leg lipedema.",
      "Elevate your legs for 15 minutes before bed to support lymphatic return.",
      "Flat-knit compression stockings are the most recommended for leg lipedema.",
      "Avoid standing or sitting for more than 1 hour — active breaks reduce leg swelling.",
    ],
  },
};

export default function DailyPhrase({ profile, lang, C }) {
  const dayIdx = new Date().getDay();
  const phrase = lang === "es" ? PHRASES_ES[dayIdx] : PHRASES_EN[dayIdx];

  const hasArms = profile.activeZones?.some((z) => z.includes("Arm"));
  const hasLegs = profile.activeZones?.some((z) =>
    ["leftThigh", "rightThigh", "leftCalf", "rightCalf", "ankles", "hips"].includes(z)
  );
  const zonePattern = hasArms && hasLegs ? "both" : hasArms ? "arms" : hasLegs ? "legs" : null;
  const tips = zonePattern ? ZONE_TIPS[zonePattern][lang] : null;
  const tipText = tips ? tips[dayIdx % tips.length] : null;

  return (
    <>
      {/* Motivational phrase */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.creamFaint}, white)`,
          borderRadius: 14,
          padding: "16px 18px",
          marginBottom: 8,
          border: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: C.sage,
            textTransform: "uppercase",
            letterSpacing: "0.6px",
            marginBottom: 8,
          }}
        >
          <Icon name="sparkles" size={12} color={C.sage} />{" "}
          {lang === "es" ? "Reflexión del día" : "Daily reflection"}
        </div>
        <p
          style={{
            fontSize: 14,
            color: C.cream,
            lineHeight: 1.6,
            fontStyle: "italic",
            margin: 0,
            fontWeight: 500,
          }}
        >
          "{phrase}"
        </p>
      </div>

      {/* Personalized zone tip */}
      {tipText && (
        <div
          style={{
            background: `linear-gradient(135deg, ${C.creamFaint}, white)`,
            borderRadius: 14,
            padding: "16px 18px",
            marginBottom: 8,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: C.sage,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              marginBottom: 8,
            }}
          >
            <Icon name="lightbulb" size={12} color={C.sage} />{" "}
            {lang === "es" ? "Consejo personalizado" : "Personalized tip"}
          </div>
          <p
            style={{
              fontSize: 13,
              color: C.cream,
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 500,
            }}
          >
            {tipText}
          </p>
        </div>
      )}
    </>
  );
}
