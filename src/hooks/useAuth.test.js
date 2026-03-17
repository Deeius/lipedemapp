vi.mock("../lib/supabase");
vi.mock("../lib/db", () => ({
  migrateFromLocalStorage: vi.fn(() => Promise.resolve(true)),
}));

import { renderHook, act, waitFor } from "@testing-library/react";
import { supabase, __resetMocks } from "../lib/supabase";
import { migrateFromLocalStorage } from "../lib/db";
import { useAuth } from "./useAuth";
import { mockUser } from "../test/helpers";

let authCallback;

beforeEach(() => {
  __resetMocks();
  migrateFromLocalStorage.mockClear();
  localStorage.clear();

  // Capture the onAuthStateChange callback
  supabase.auth.onAuthStateChange.mockImplementation((cb) => {
    authCallback = cb;
    return { data: { subscription: { unsubscribe: vi.fn() } } };
  });
});

describe("useAuth", () => {
  it("debe establecer el usuario si hay sesión existente", async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: { user: mockUser } },
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.user).toEqual(mockUser);
  });

  it("debe tener loading=false tras check de sesión sin usuario", async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.user).toBeNull();
  });

  it("debe migrar localStorage en primer SIGNED_IN", async () => {
    supabase.auth.getSession.mockResolvedValue({ data: { session: null } });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Simulate SIGNED_IN event
    await act(async () => {
      await authCallback("SIGNED_IN", { user: mockUser });
    });

    expect(migrateFromLocalStorage).toHaveBeenCalledWith(mockUser.id);
    expect(result.current.user).toEqual(mockUser);
  });

  it("no debe migrar si lt_migrated ya existe", async () => {
    localStorage.setItem("lt_migrated", "true");
    supabase.auth.getSession.mockResolvedValue({ data: { session: null } });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await authCallback("SIGNED_IN", { user: mockUser });
    });

    expect(migrateFromLocalStorage).not.toHaveBeenCalled();
  });

  it("loginWithGoogle debe llamar a signInWithOAuth", async () => {
    supabase.auth.getSession.mockResolvedValue({ data: { session: null } });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.loginWithGoogle();
    });

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  });

  it("logout debe llamar a signOut", async () => {
    supabase.auth.getSession.mockResolvedValue({ data: { session: null } });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  it("debe hacer unsubscribe al desmontar", async () => {
    const unsubscribe = vi.fn();
    supabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe } },
    });
    supabase.auth.getSession.mockResolvedValue({ data: { session: null } });

    const { unmount } = renderHook(() => useAuth());

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
