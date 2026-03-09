import { useState } from "react";
import Icon from "../shared/Icon";

const SAMPLE_CENTERS = [
  {
    id: "s1",
    name: "Clínica Linfovascular Madrid",
    address: "C/ Velázquez 12, Madrid",
    city: "Madrid",
    verified: true,
    status: "approved",
    mapsUrl: "https://maps.google.com/?q=Clinica+Linfovascular+Madrid",
    notes: "",
    _type: { es: "Cirugía linfática", en: "Lymphatic surgery" },
    _specialty: {
      es: "Cirugía linfática · Liposucción especializada",
      en: "Lymphatic surgery · Specialist liposuction",
    },
  },
  {
    id: "s2",
    name: "Fisioterapia Integral Barcelona",
    address: "Av. Diagonal 200, Barcelona",
    city: "Barcelona",
    verified: true,
    status: "approved",
    mapsUrl: "https://maps.google.com/?q=Fisioterapia+Integral+Barcelona",
    notes: "",
    _type: { es: "Fisioterapia / DLM", en: "Physiotherapy / MLD" },
    _specialty: {
      es: "Drenaje linfático manual · Presoterapia",
      en: "Manual lymphatic drainage · Pressotherapy",
    },
  },
  {
    id: "s3",
    name: "Centro Dermatológico Valencia",
    address: "C/ Colón 5, Valencia",
    city: "Valencia",
    verified: false,
    status: "approved",
    mapsUrl: "https://maps.google.com/?q=Centro+Dermatologico+Valencia",
    notes: "",
    _type: { es: "Diagnóstico", en: "Diagnosis" },
    _specialty: {
      es: "Diagnóstico · Tratamiento conservador",
      en: "Diagnosis · Conservative treatment",
    },
  },
];

const TYPES_ES = [
  "Fisioterapia / DLM",
  "Cirugía linfática",
  "Nutrición",
  "Diagnóstico",
  "Endocrinología",
  "Psicología",
  "Otro",
];
const TYPES_EN = [
  "Physiotherapy / MLD",
  "Lymphatic surgery",
  "Nutrition",
  "Diagnosis",
  "Endocrinology",
  "Psychology",
  "Other",
];

export default function CentersSection({
  profile,
  userCenters,
  pendingCenters,
  centerFilter,
  setCenterFilter,
  centersView,
  setCentersView,
  centerForm,
  setCenterForm,
  saveCenterProposal,
  approveCenter,
  rejectCenter,
  setTab,
  lang,
  C,
  S,
}) {
  const TYPES = lang === "es" ? TYPES_ES : TYPES_EN;

  const allApproved = [
    ...SAMPLE_CENTERS.map((c) => ({
      ...c,
      type: c._type[lang] || c._type.es,
      specialty: c._specialty[lang] || c._specialty.es,
    })),
    ...(userCenters || []).filter((c) => c.status === "approved"),
  ];

  const cities = ["all", ...new Set(allApproved.map((c) => c.city))];
  const filtered =
    centerFilter === "all" ? allApproved : allApproved.filter((c) => c.city === centerFilter);

  // ── LIST VIEW ──
  if (centersView === "list")
    return (
      <>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.cream, letterSpacing: "-0.3px" }}>
              {lang === "es" ? "Centros especializados" : "Specialist centres"}
            </div>
            <div style={{ fontSize: 12, color: C.creamMuted, marginTop: 2 }}>
              {allApproved.length}{" "}
              {lang === "es" ? "centros en el directorio" : "centres in directory"}
              {pendingCenters && pendingCenters.length > 0 && (
                <button
                  onClick={() => setCentersView("pending")}
                  style={{
                    marginLeft: 8,
                    background: "#f5ecd5",
                    border: `1px solid ${C.accent}`,
                    borderRadius: 20,
                    padding: "1px 8px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.accent,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {pendingCenters.length} {lang === "es" ? "pendientes" : "pending"}
                </button>
              )}
            </div>
          </div>
          <button
            onClick={() => setCentersView("propose")}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: `1.5px solid ${C.sage}`,
              background: C.sage,
              color: "white",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>+</span> {lang === "es" ? "Proponer centro" : "Propose centre"}
          </button>
        </div>

        {/* Location pill */}
        {(profile?.country || profile?.region) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 12px",
              background: C.creamFaint,
              borderRadius: 10,
              marginBottom: 14,
              border: `1px solid ${C.border}`,
            }}
          >
            <Icon name="mappin" size={13} color={C.sage} />
            <span style={{ fontSize: 12, color: C.cream, fontWeight: 600 }}>
              {[profile.region, profile.country].filter(Boolean).join(", ")}
            </span>
            <button
              onClick={() => setTab("profile")}
              style={{
                marginLeft: "auto",
                fontSize: 11,
                color: C.creamMuted,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {lang === "es" ? "Cambiar" : "Change"}
            </button>
          </div>
        )}

        {/* City filter */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setCenterFilter(city)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                border: `1.5px solid ${centerFilter === city ? C.sage : C.border}`,
                background: centerFilter === city ? C.creamFaint : "white",
                fontSize: 11,
                fontWeight: 600,
                color: centerFilter === city ? C.sage : C.creamMuted,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {city === "all" ? (lang === "es" ? "Todos" : "All") : city}
            </button>
          ))}
        </div>

        {/* Center cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((c) => (
            <div
              key={c.id}
              style={{
                background: "white",
                borderRadius: 14,
                padding: "14px 16px",
                border: `1px solid ${C.border}`,
                boxShadow: "0 1px 4px rgba(74,110,87,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      flexWrap: "wrap",
                      marginBottom: 3,
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 800, color: C.cream }}>{c.name}</span>
                    {c.verified && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: C.sage,
                          background: C.creamFaint,
                          padding: "2px 6px",
                          borderRadius: 20,
                        }}
                      >
                        ✓ {lang === "es" ? "Verificado" : "Verified"}
                      </span>
                    )}
                  </div>
                  {c.address && (
                    <div style={{ fontSize: 11, color: C.creamMuted, marginBottom: 5 }}>
                      📍 {c.address}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: C.creamMuted, lineHeight: 1.5 }}>
                    {c.specialty}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.sage,
                    background: C.creamFaint,
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  {c.city}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.accent,
                    background: `${C.accent}15`,
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  {c.type}
                </span>
              </div>
              {c.notes && (
                <div
                  style={{
                    fontSize: 11,
                    color: C.creamMuted,
                    fontStyle: "italic",
                    marginBottom: 10,
                  }}
                >
                  {c.notes}
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                {c.mapsUrl && (
                  <a
                    href={c.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: 8,
                      border: `1.5px solid ${C.sage}`,
                      background: C.sage,
                      color: "white",
                      fontSize: 11,
                      fontWeight: 700,
                      textAlign: "center",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                    }}
                  >
                    <Icon name="mappin" size={13} color="white" />
                    {lang === "es" ? "Ver en Google Maps" : "Open in Google Maps"}
                  </a>
                )}
                {c.mapsUrl && (
                  <a
                    href={`${c.mapsUrl}&reviews`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: `1.5px solid ${C.border}`,
                      background: "white",
                      color: C.creamMuted,
                      fontSize: 11,
                      fontWeight: 700,
                      textAlign: "center",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    ⭐ {lang === "es" ? "Reseñas" : "Reviews"}
                  </a>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "30px 20px", color: C.creamMuted, fontSize: 13 }}
            >
              {lang === "es" ? "No hay centros en esta ciudad todavía." : "No centres in this city yet."}
            </div>
          )}
        </div>
      </>
    );

  // ── PROPOSE VIEW ──
  if (centersView === "propose")
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button
            onClick={() => setCentersView("list")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: C.creamMuted,
              fontSize: 18,
              lineHeight: 1,
              fontFamily: "inherit",
            }}
          >
            ←
          </button>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.cream }}>
            {lang === "es" ? "Proponer un centro" : "Propose a centre"}
          </div>
        </div>
        <div
          style={{
            background: "#fffbe6",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 16,
            border: "1px solid #f0d060",
            fontSize: 12,
            color: "#7a6020",
            lineHeight: 1.5,
          }}
        >
          {lang === "es"
            ? "Tu propuesta será revisada antes de aparecer en el directorio. Solo centros con experiencia real en lipedema serán aprobados."
            : "Your proposal will be reviewed before appearing in the directory. Only centres with real lipedema experience will be approved."}
        </div>
        <div style={S.card}>
          <label style={S.label}>{lang === "es" ? "Nombre del centro *" : "Centre name *"}</label>
          <input
            style={{ ...S.input, marginBottom: 12 }}
            placeholder={lang === "es" ? "Clínica / Consulta / Centro…" : "Clinic / Practice / Centre…"}
            value={centerForm.name}
            onChange={(e) => setCenterForm({ ...centerForm, name: e.target.value })}
          />
          <label style={S.label}>{lang === "es" ? "Ciudad *" : "City *"}</label>
          <input
            style={{ ...S.input, marginBottom: 12 }}
            placeholder={lang === "es" ? "Madrid, Barcelona…" : "Madrid, Barcelona…"}
            value={centerForm.city}
            onChange={(e) => setCenterForm({ ...centerForm, city: e.target.value })}
          />
          <label style={S.label}>{lang === "es" ? "Dirección" : "Address"}</label>
          <input
            style={{ ...S.input, marginBottom: 12 }}
            placeholder={lang === "es" ? "Calle, número…" : "Street, number…"}
            value={centerForm.address}
            onChange={(e) => setCenterForm({ ...centerForm, address: e.target.value })}
          />
          <label style={S.label}>{lang === "es" ? "Enlace a Google Maps" : "Google Maps link"}</label>
          <input
            style={{ ...S.input, marginBottom: 4 }}
            placeholder="https://maps.google.com/…"
            value={centerForm.mapsUrl}
            onChange={(e) => setCenterForm({ ...centerForm, mapsUrl: e.target.value })}
          />
          <div style={{ fontSize: 10, color: C.creamMuted, marginBottom: 12 }}>
            {lang === "es"
              ? "Busca el centro en Google Maps y copia el enlace de compartir"
              : "Search the centre in Google Maps and paste the share link"}
          </div>
          <label style={S.label}>{lang === "es" ? "Tipo de especialidad" : "Specialty type"}</label>
          <select
            style={{ ...S.input, marginBottom: 12 }}
            value={centerForm.type}
            onChange={(e) => setCenterForm({ ...centerForm, type: e.target.value })}
          >
            <option value="">{lang === "es" ? "Selecciona…" : "Select…"}</option>
            {TYPES.map((typ) => (
              <option key={typ} value={typ}>
                {typ}
              </option>
            ))}
          </select>
          <label style={S.label}>
            {lang === "es" ? "Descripción de la especialidad" : "Specialty description"}
          </label>
          <input
            style={{ ...S.input, marginBottom: 12 }}
            placeholder={lang === "es" ? "DLM, presoterapia, cirugía…" : "MLD, pressotherapy, surgery…"}
            value={centerForm.specialty}
            onChange={(e) => setCenterForm({ ...centerForm, specialty: e.target.value })}
          />
          <label style={S.label}>{lang === "es" ? "Notas adicionales" : "Additional notes"}</label>
          <textarea
            style={{ ...S.textarea, marginBottom: 20 }}
            placeholder={
              lang === "es"
                ? "Experiencia con lipedema, info de cita, precios orientativos…"
                : "Lipedema experience, booking info, approximate prices…"
            }
            value={centerForm.notes}
            onChange={(e) => setCenterForm({ ...centerForm, notes: e.target.value })}
          />
          <button
            onClick={saveCenterProposal}
            disabled={!centerForm.name.trim() || !centerForm.city.trim()}
            style={{
              ...S.btn,
              opacity: !centerForm.name.trim() || !centerForm.city.trim() ? 0.5 : 1,
            }}
          >
            {lang === "es" ? "Enviar propuesta" : "Submit proposal"}
          </button>
        </div>
      </>
    );

  // ── PENDING VIEW (admin) ──
  if (centersView === "pending")
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button
            onClick={() => setCentersView("list")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: C.creamMuted,
              fontSize: 18,
              lineHeight: 1,
              fontFamily: "inherit",
            }}
          >
            ←
          </button>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.cream }}>
            {lang === "es" ? "Propuestas pendientes" : "Pending proposals"} ({pendingCenters?.length || 0})
          </div>
        </div>
        {!pendingCenters || pendingCenters.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 20px", color: C.creamMuted, fontSize: 13 }}>
            {lang === "es" ? "No hay propuestas pendientes" : "No pending proposals"}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pendingCenters.map((c) => (
              <div
                key={c.id}
                style={{
                  background: "white",
                  borderRadius: 14,
                  padding: "14px 16px",
                  border: `1.5px solid ${C.accent}`,
                  boxShadow: "0 1px 4px rgba(74,110,87,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: 8,
                  }}
                >
                  ⏳ {lang === "es" ? "Pendiente de revisión" : "Pending review"} ·{" "}
                  {new Date(c.proposedAt).toLocaleDateString()}
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.cream, marginBottom: 4 }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 11, color: C.creamMuted, marginBottom: 3 }}>
                  📍 {c.address} — {c.city}
                </div>
                {c.type && (
                  <div style={{ fontSize: 11, color: C.creamMuted, marginBottom: 3 }}>🏥 {c.type}</div>
                )}
                {c.specialty && (
                  <div style={{ fontSize: 11, color: C.creamMuted, marginBottom: 3 }}>{c.specialty}</div>
                )}
                {c.mapsUrl && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.sage,
                      marginBottom: 3,
                      wordBreak: "break-all",
                    }}
                  >
                    🗺 {c.mapsUrl}
                  </div>
                )}
                {c.notes && (
                  <div
                    style={{
                      fontSize: 11,
                      color: C.creamMuted,
                      fontStyle: "italic",
                      marginBottom: 8,
                    }}
                  >
                    {c.notes}
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button
                    onClick={() => approveCenter(c.id)}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: 8,
                      border: "none",
                      background: C.sage,
                      color: "white",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    ✓ {lang === "es" ? "Aprobar" : "Approve"}
                  </button>
                  <button
                    onClick={() => rejectCenter(c.id)}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: 8,
                      border: "1px solid #c06080",
                      background: "white",
                      color: "#c06080",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    ✕ {lang === "es" ? "Rechazar" : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );

  return null;
}
