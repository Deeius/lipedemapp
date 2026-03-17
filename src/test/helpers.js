// ── Supabase query builder mock ──────────────────────────
export function createQueryBuilder(resolved = { data: null, error: null }) {
  const builder = {
    select: vi.fn(() => builder),
    insert: vi.fn(() => builder),
    update: vi.fn(() => builder),
    upsert: vi.fn(() => builder),
    delete: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    order: vi.fn(() => builder),
    single: vi.fn(() => Promise.resolve(resolved)),
    then: (resolve) => resolve(resolved),
  };
  return builder;
}

// ── Mock user ────────────────────────────────────────────
export const mockUser = {
  id: "user-123",
  email: "test@example.com",
};

// ── Mock entry (daily log) ───────────────────────────────
export function createMockEntry(overrides = {}) {
  return {
    date: "2025-01-15",
    weight: 70,
    pain: 3,
    energy: 6,
    mood: "😊",
    water: 4,
    inflammationZones: {},
    inflammationNote: "",
    suppsTaken: [],
    pillTaken: false,
    notes: "",
    ...overrides,
  };
}

// ── Mock color palette (C) ───────────────────────────────
export const mockC = {
  cream: "#f5f0e8",
  creamMuted: "#b0a89c",
  creamFaint: "#e8e2d8",
  sage: "#7a9e7e",
  sageLight: "#5a8e5e",
  bg: "#faf7f2",
  bgCard: "#ffffff",
  bgInput: "#f7faf8",
  accent: "#c4956a",
  border: "#d4cdc4",
};

// ── Mock style system (S) ────────────────────────────────
export const mockS = {
  input: { border: "1px solid #ccc", padding: 8 },
  btn: { padding: "8px 16px", cursor: "pointer" },
  label: { fontSize: 12, fontWeight: 600 },
  textarea: { width: "100%", padding: 8 },
  card: { padding: 16, borderRadius: 12 },
  cardTitle: { fontSize: 14, fontWeight: 800 },
  tag: () => ({}),
  btnSm: () => ({}),
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  row: { display: "flex", gap: 8 },
  col: { display: "flex", flexDirection: "column", gap: 8 },
  reactionColor: { good: "#4ade80", bad: "#f87171", neutral: "#fbbf24" },
};

// ── Mock translations (t) ────────────────────────────────
export const mockT = {
  today: {
    water: "Water",
    waterGoal: "Goal: 8 glasses",
    inflammation: "Inflammation",
    inflammationNote: "Notes",
    inflammationNotePlaceholder: "Any notes...",
    todaysSupps: "Today's supplements",
    zoneNames: {
      legs: "Legs",
      arms: "Arms",
      abdomen: "Abdomen",
      hips: "Hips",
    },
  },
  profile: {
    title: "Profile",
    name: "Name",
    stage: "Stage",
    stages: { 1: "Stage 1", 2: "Stage 2", 3: "Stage 3", 4: "Stage 4" },
    diagnosis: "Diagnosis date",
    intolerances: "Intolerances",
    intolerancesHint: "Select all that apply",
    activeZones: "Active zones",
    save: "Save",
    saved: "Saved!",
  },
  history: {
    title: "History",
    empty: "No entries yet",
  },
  foods: {
    add: "Add food",
    name: "Name",
    namePlaceholder: "Food name...",
    category: "Category",
    categories: { fruits: "Fruits", vegetables: "Vegetables", proteins: "Proteins" },
    reaction: "Reaction",
    good: "Good",
    bad: "Bad",
    neutral: "Neutral",
    notes: "Notes",
    notesPlaceholder: "Notes...",
    list: "My foods",
    empty: "No foods added yet",
  },
};
