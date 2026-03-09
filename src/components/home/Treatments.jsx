import { useState } from "react";

const TREATMENTS = {
  conservative: {
    es: {
      title: "Tratamiento Conservador",
      desc: "El tratamiento conservador no cura el lipedema pero reduce síntomas, mejora la calidad de vida y frena la progresión. Es el primer paso recomendado para todos los estadios.",
      items: [
        { icon: "🧤", name: "Compresión médica", desc: "Medias y mangas de tejido plano (no circular). Reduce la inflamación y el dolor. Debe ser prescrita por un especialista." },
        { icon: "💆‍♀️", name: "Drenaje linfático manual (DLM)", desc: "Masaje especializado que estimula el sistema linfático. Sesiones de 45-60 min, frecuencia según estadio." },
        { icon: "🏊‍♀️", name: "Ejercicio en agua", desc: "Natación, aquagym o simplemente caminar en el agua. La presión hidrostática actúa como compresión natural." },
        { icon: "🥗", name: "Dieta antiinflamatoria", desc: "Sin cura alimentaria, pero reducir azúcar, gluten y ultraprocesados mejora la inflamación sistémica." },
        { icon: "💊", name: "Suplementación", desc: "Omega-3, vitamina D, rutina/diosmina y magnesio son los más respaldados por evidencia en lipedema." },
      ],
      faqs: [
        { q: "¿El tratamiento conservador cura el lipedema?", a: "No. El lipedema no tiene cura actualmente. El tratamiento conservador frena la progresión y mejora los síntomas significativamente, pero no elimina el tejido afectado." },
        { q: "¿Cuánto tiempo hasta notar mejoría?", a: "Con compresión y DLM constantes, muchas pacientes notan reducción del dolor y la hinchazón en 4-8 semanas. La mejora real se evalúa a los 3-6 meses." },
        { q: "¿Tengo que hacerlo de por vida?", a: "Sí. Al dejar la compresión y el DLM, los síntomas reaparecen. Es un manejo crónico, no un tratamiento puntual." },
        { q: "¿La dieta cetogénica funciona?", a: "Hay evidencia preliminar positiva. Algunas pacientes reportan mejora importante. No es la única opción y debe hacerse con supervisión médica." },
      ],
    },
    en: {
      title: "Conservative Treatment",
      desc: "Conservative treatment does not cure lipedema but reduces symptoms, improves quality of life and slows progression. It is the recommended first step for all stages.",
      items: [
        { icon: "🧤", name: "Medical compression", desc: "Flat-knit stockings and sleeves (not circular knit). Reduces inflammation and pain. Must be prescribed by a specialist." },
        { icon: "💆‍♀️", name: "Manual lymphatic drainage (MLD)", desc: "Specialised massage that stimulates the lymphatic system. 45-60 min sessions, frequency depends on stage." },
        { icon: "🏊‍♀️", name: "Water exercise", desc: "Swimming, aqua gym or simply walking in water. Hydrostatic pressure acts as natural compression." },
        { icon: "🥗", name: "Anti-inflammatory diet", desc: "No dietary cure, but reducing sugar, gluten and ultra-processed foods improves systemic inflammation." },
        { icon: "💊", name: "Supplementation", desc: "Omega-3, vitamin D, rutin/diosmin and magnesium have the most evidence-backed support in lipedema." },
      ],
      faqs: [
        { q: "Does conservative treatment cure lipedema?", a: "No. Lipedema currently has no cure. Conservative treatment slows progression and significantly improves symptoms, but does not eliminate affected tissue." },
        { q: "How long until I notice improvement?", a: "With consistent compression and MLD, many patients notice reduced pain and swelling within 4-8 weeks. Real improvement is assessed at 3-6 months." },
        { q: "Do I have to do this for life?", a: "Yes. When compression and MLD are stopped, symptoms return. It is chronic management, not a one-time treatment." },
        { q: "Does the ketogenic diet work?", a: "There is preliminary positive evidence. Some patients report significant improvement. It is not the only option and should be done under medical supervision." },
      ],
    },
  },
  surgical: {
    es: {
      title: "Tratamiento Quirúrgico",
      desc: "La liposucción linfática (WAL, PAL o VASER) es el único tratamiento que elimina el tejido lipedematoso. No es cosmética — es funcional. Se considera cuando el tratamiento conservador no es suficiente.",
      items: [
        { icon: "💉", name: "Liposucción WAL", desc: "Water-Assisted Liposuction. Usa agua a presión para desprender el tejido. Menor trauma, recuperación más rápida. La más usada en Europa." },
        { icon: "💉", name: "Liposucción PAL", desc: "Power-Assisted Liposuction. Cánula vibratoria que reduce el esfuerzo manual. Muy usada en Estados Unidos." },
        { icon: "💉", name: "VASER", desc: "Usa ultrasonidos para licuar el tejido antes de extraerlo. Útil en zonas fibrosas. Requiere más experiencia del cirujano." },
        { icon: "📋", name: "Criterios para cirugía", desc: "Estadio 2-3 con tratamiento conservador insuficiente, dolor crónico, limitación funcional o impacto psicológico severo." },
        { icon: "⏱️", name: "Recuperación", desc: "Compresión obligatoria 6-8 semanas post-op. Resultados visibles a los 3-6 meses. Pueden necesitarse varias sesiones según extensión." },
      ],
      faqs: [
        { q: "¿La cirugía cura el lipedema?", a: "Elimina el tejido afectado de las zonas tratadas, reduciendo dolor y volumen de forma duradera. Pero el lipedema puede progresar en zonas no tratadas si no se mantiene el tratamiento conservador." },
        { q: "¿Está cubierta por la Seguridad Social?", a: "En España no está cubierta. En Alemania y algunos países europeos hay cobertura parcial. El coste en clínicas privadas ronda los 3.000-8.000€ por zona." },
        { q: "¿Cualquier cirujano puede hacerla?", a: "No. Debe ser un cirujano con formación específica en lipedema. La técnica errónea puede dañar el sistema linfático. Busca especialistas certificados." },
        { q: "¿Cuándo es demasiado pronto para operarse?", a: "La mayoría de especialistas recomiendan al menos 6-12 meses de tratamiento conservador constante antes de considerar la cirugía." },
      ],
    },
    en: {
      title: "Surgical Treatment",
      desc: "Lymphatic liposuction (WAL, PAL or VASER) is the only treatment that removes lipedema tissue. It is not cosmetic — it is functional. It is considered when conservative treatment is insufficient.",
      items: [
        { icon: "💉", name: "WAL liposuction", desc: "Water-Assisted Liposuction. Uses pressurised water to detach tissue. Less trauma, faster recovery. Most widely used in Europe." },
        { icon: "💉", name: "PAL liposuction", desc: "Power-Assisted Liposuction. Vibrating cannula that reduces manual effort. Widely used in the United States." },
        { icon: "💉", name: "VASER", desc: "Uses ultrasound to liquefy tissue before extraction. Useful in fibrous areas. Requires more surgical expertise." },
        { icon: "📋", name: "Surgery criteria", desc: "Stage 2-3 with insufficient conservative treatment, chronic pain, functional limitation or severe psychological impact." },
        { icon: "⏱️", name: "Recovery", desc: "Mandatory compression for 6-8 weeks post-op. Visible results at 3-6 months. Multiple sessions may be needed depending on extent." },
      ],
      faqs: [
        { q: "Does surgery cure lipedema?", a: "It removes affected tissue from treated areas, durably reducing pain and volume. But lipedema can progress in untreated areas if conservative treatment is not maintained." },
        { q: "Is it covered by public health insurance?", a: "Coverage varies by country. In Germany and some European countries there is partial coverage. Private clinic costs range from €3,000-8,000 per area." },
        { q: "Can any surgeon perform it?", a: "No. It must be a surgeon with specific lipedema training. Wrong technique can damage the lymphatic system. Look for certified specialists." },
        { q: "When is it too soon to have surgery?", a: "Most specialists recommend at least 6-12 months of consistent conservative treatment before considering surgery." },
      ],
    },
  },
};

export default function Treatments({ lang, C }) {
  const [activeTab, setActiveTab] = useState("conservative");
  const [openFaq, setOpenFaq] = useState(null);

  const current = TREATMENTS[activeTab][lang];

  return (
    <div style={{ background: C.bgCard, borderRadius: 14, marginBottom: 8, border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(74,110,87,0.06)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 18px 0" }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.sage, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>
          📋 {lang === "es" ? "Tratamientos" : "Treatments"}
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {[
            { key: "conservative", label: lang === "es" ? "Conservador" : "Conservative" },
            { key: "surgical", label: lang === "es" ? "Quirúrgico" : "Surgical" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1.5px solid ${activeTab === tab.key ? C.sage : C.border}`, background: activeTab === tab.key ? C.creamFaint : "white", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: activeTab === tab.key ? C.sage : C.creamMuted, transition: "all 0.15s" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 18px 16px" }}>
        <p style={{ fontSize: 12, color: C.creamMuted, lineHeight: 1.6, marginBottom: 14 }}>{current.desc}</p>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {current.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.cream, marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: C.creamMuted, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ fontSize: 11, fontWeight: 800, color: C.creamMuted, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>FAQ</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {current.faqs.map((faq, i) => {
            const key = `${activeTab}-${i}`;
            const isOpen = openFaq === key;
            return (
              <div key={i} style={{ borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                <div onClick={() => setOpenFaq(isOpen ? null : key)}
                  style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: isOpen ? C.creamFaint : "white", userSelect: "none" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.cream, flex: 1, paddingRight: 8 }}>{faq.q}</span>
                  <span style={{ fontSize: 12, color: C.creamMuted, transition: "transform 0.2s", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>▾</span>
                </div>
                {isOpen && (
                  <div style={{ padding: "10px 12px", borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.creamMuted, lineHeight: 1.6, background: "white" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}