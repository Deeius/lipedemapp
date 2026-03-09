import LogEntry from "./LogEntry";

export default function HistoryTab({
  logs,
  openLog,
  setOpenLog,
  allSuppsList,
  profile,
  lang,
  C,
  S,
  t,
}) {
  return (
    <div style={S.card}>
      <div style={S.cardTitle}>{t.history.title}</div>
      {logs.length === 0 ? (
        <p style={{ color: C.creamMuted, fontSize: 14 }}>{t.history.empty}</p>
      ) : (
        [...logs]
          .reverse()
          .map((l, i) => (
            <LogEntry
              key={i}
              log={l}
              isOpen={openLog === l.date}
              onToggle={() => setOpenLog(openLog === l.date ? null : l.date)}
              allSuppsList={allSuppsList}
              profile={profile}
              lang={lang}
              C={C}
              S={S}
              t={t}
            />
          ))
      )}
    </div>
  );
}
