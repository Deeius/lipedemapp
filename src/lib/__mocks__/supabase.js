import { createQueryBuilder } from "../../test/helpers";

let _fromHandler = () => createQueryBuilder();

export const supabase = {
  from: vi.fn((...args) => _fromHandler(...args)),
  auth: {
    getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } },
    })),
    signInWithOAuth: vi.fn(() => Promise.resolve({ error: null })),
    signOut: vi.fn(() => Promise.resolve({ error: null })),
  },
};

// Helper to configure what `supabase.from()` returns per call
export function __setFromHandler(handler) {
  _fromHandler = handler;
}

// Reset all mocks to defaults
export function __resetMocks() {
  _fromHandler = () => createQueryBuilder();
  supabase.from.mockClear();
  supabase.auth.getSession.mockReset().mockResolvedValue({ data: { session: null } });
  supabase.auth.onAuthStateChange
    .mockReset()
    .mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } });
  supabase.auth.signInWithOAuth.mockReset().mockResolvedValue({ error: null });
  supabase.auth.signOut.mockReset().mockResolvedValue({ error: null });
}
