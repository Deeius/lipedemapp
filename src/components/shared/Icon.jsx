export default function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75 }) {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const p = {
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const icons = {
    calendar: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <rect x="7" y="14" width="3" height="3" rx="0.5" fill={color} stroke="none" />
      </svg>
    ),
    clock: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
      </svg>
    ),
    trending: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    utensils: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="3" y1="2" x2="3" y2="22" />
        <path d="M7 2v7a4 4 0 0 1-4 4" />
        <path d="M21 2v20M21 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4" />
      </svg>
    ),
    pill: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M10.5 20H4a2 2 0 0 1-2-2v-2.5a2 2 0 0 1 2-2h6.5" />
        <path d="M13.5 4H20a2 2 0 0 1 2 2v2.5a2 2 0 0 1-2 2h-6.5" />
        <circle cx="12" cy="12" r="7" />
        <path d="M7.5 12h9" />
      </svg>
    ),
    mappin: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    book: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="12" y1="6" x2="16" y2="6" />
        <line x1="12" y1="10" x2="16" y2="10" />
      </svg>
    ),
    user: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    menu: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    x: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    home: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
        <polyline points="9 21 9 12 15 12 15 21" />
      </svg>
    ),
    leaf: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    hand: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M18 11V6a1 1 0 0 0-2 0v5" />
        <path d="M14 10V4a1 1 0 0 0-2 0v6" />
        <path d="M10 10.5V5a1 1 0 0 0-2 0v7" />
        <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.7-2.4L3.4 16a1.5 1.5 0 0 1 2.1-2.1L8 16" />
      </svg>
    ),
    sparkles: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
      </svg>
    ),
    lightbulb: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    clipboard: (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M12 11h4" />
        <path d="M12 16h4" />
        <path d="M8 11h.01" />
        <path d="M8 16h.01" />
      </svg>
    ),
  };
  return icons[name] || null;
}
