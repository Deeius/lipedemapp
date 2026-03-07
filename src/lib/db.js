import { supabase } from "./supabase";

// ── PROFILE ──────────────────────────────────────────────
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error && error.code !== "PGRST116") console.error("getProfile:", error);
  return data ?? null;
}

export async function upsertProfile(userId, profile) {
  const { error } = await supabase
    .from("profiles")
    .upsert({ user_id: userId, ...profile, updated_at: new Date().toISOString() });
  if (error) console.error("upsertProfile:", error);
}

// ── LOGS (registros diarios) ──────────────────────────────
export async function getLogs(userId) {
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true });
  if (error) console.error("getLogs:", error);
  return data ?? [];
}

export async function upsertLog(userId, log) {
  const { error } = await supabase
    .from("logs")
    .upsert({ user_id: userId, ...log });
  if (error) console.error("upsertLog:", error);
}

// ── SUPPLEMENTS ───────────────────────────────────────────
export async function getSupplements(userId) {
  const { data, error } = await supabase
    .from("supplements")
    .select("*")
    .eq("user_id", userId);
  if (error) console.error("getSupplements:", error);
  return data ?? [];
}

export async function upsertSupplement(userId, supp) {
  const { error } = await supabase
    .from("supplements")
    .upsert({ user_id: userId, ...supp });
  if (error) console.error("upsertSupplement:", error);
}

export async function deleteSupplement(userId, suppId) {
  const { error } = await supabase
    .from("supplements")
    .delete()
    .eq("user_id", userId)
    .eq("id", suppId);
  if (error) console.error("deleteSupplement:", error);
}

// ── FOODS ─────────────────────────────────────────────────
export async function getFoods(userId) {
  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .eq("user_id", userId);
  if (error) console.error("getFoods:", error);
  return data ?? [];
}

export async function upsertFood(userId, food) {
  const { error } = await supabase
    .from("foods")
    .upsert({ user_id: userId, ...food });
  if (error) console.error("upsertFood:", error);
}

export async function deleteFood(userId, foodId) {
  const { error } = await supabase
    .from("foods")
    .delete()
    .eq("user_id", userId)
    .eq("id", foodId);
  if (error) console.error("deleteFood:", error);
}

// ── CYCLE ─────────────────────────────────────────────────
export async function getCycle(userId) {
  const { data, error } = await supabase
    .from("cycle")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error && error.code !== "PGRST116") console.error("getCycle:", error);
  return data?.data ?? {};
}

export async function upsertCycle(userId, cycleData) {
  const { error } = await supabase
    .from("cycle")
    .upsert({ user_id: userId, data: cycleData, updated_at: new Date().toISOString() });
  if (error) console.error("upsertCycle:", error);
}

// ── CENTERS (propuestas de usuarias) ─────────────────────
export async function getCenters() {
  const { data, error } = await supabase
    .from("centers")
    .select("*")
    .eq("status", "approved")
    .order("name");
  if (error) console.error("getCenters:", error);
  return data ?? [];
}

export async function proposeCenters(userId, center) {
  const { error } = await supabase
    .from("centers")
    .insert({ user_id: userId, ...center, status: "pending" });
  if (error) console.error("proposeCenter:", error);
}

// ── MIGRATE from localStorage ─────────────────────────────
// Llama esto una sola vez al hacer login si hay datos locales
export async function migrateFromLocalStorage(userId) {
  try {
    const profile  = JSON.parse(localStorage.getItem("lt_profile")  || "null");
    const logs     = JSON.parse(localStorage.getItem("lt_logs")     || "[]");
    const supps    = JSON.parse(localStorage.getItem("lt_supps")    || "[]");
    const foods    = JSON.parse(localStorage.getItem("lt_foods")    || "[]");
    const cycle    = JSON.parse(localStorage.getItem("lt_cycle")    || "{}");

    const hasData  = profile || logs.length || supps.length || foods.length;
    if (!hasData) return false;

    if (profile) await upsertProfile(userId, profile);
    for (const log  of logs)  await upsertLog(userId, log);
    for (const supp of supps) await upsertSupplement(userId, supp);
    for (const food of foods) await upsertFood(userId, food);
    if (Object.keys(cycle).length) await upsertCycle(userId, cycle);

    // Marca la migración como hecha para no repetirla
    localStorage.setItem("lt_migrated", "true");
    return true;
  } catch (e) {
    console.error("migrateFromLocalStorage:", e);
    return false;
  }
}