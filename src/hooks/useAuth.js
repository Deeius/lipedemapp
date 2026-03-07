import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { migrateFromLocalStorage } from "../lib/db";

export function useAuth() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sesión activa al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escucha cambios (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        setLoading(false);

        // Migración automática en el primer login
        if (event === "SIGNED_IN" && u) {
          const alreadyMigrated = localStorage.getItem("lt_migrated");
          if (!alreadyMigrated) {
            await migrateFromLocalStorage(u.id);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loginWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

  const logout = () => supabase.auth.signOut();

  return { user, loading, loginWithGoogle, logout };
}