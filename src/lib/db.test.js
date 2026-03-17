vi.mock("./supabase");

import { supabase, __setFromHandler, __resetMocks } from "./supabase";
import { createQueryBuilder, mockUser } from "../test/helpers";
import {
  getProfile,
  upsertProfile,
  getLogs,
  upsertLog,
  getSupplements,
  upsertSupplement,
  deleteSupplement,
  getFoods,
  upsertFood,
  deleteFood,
  getCycle,
  upsertCycle,
  migrateFromLocalStorage,
  getCenters,
  proposeCenters,
  insertSuggestion,
  getSuggestions,
  updateSuggestionStatus,
  getForumPosts,
  insertForumPost,
  updateForumReactions,
  deleteForumPost,
} from "./db";

const userId = mockUser.id;

beforeEach(() => {
  __resetMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
  localStorage.clear();
});

// ── PROFILE ──────────────────────────────────────────────
describe("getProfile", () => {
  it("debe llamar a profiles con el user_id correcto", async () => {
    const qb = createQueryBuilder({ data: { name: "Ana" }, error: null });
    __setFromHandler(() => qb);

    const result = await getProfile(userId);

    expect(supabase.from).toHaveBeenCalledWith("profiles");
    expect(qb.eq).toHaveBeenCalledWith("user_id", userId);
    expect(qb.single).toHaveBeenCalled();
    expect(result).toEqual({ name: "Ana" });
  });

  it("debe retornar null si no hay datos", async () => {
    const qb = createQueryBuilder({ data: null, error: { code: "PGRST116" } });
    __setFromHandler(() => qb);

    const result = await getProfile(userId);
    expect(result).toBeNull();
  });

  it("debe loguear errores que no sean PGRST116", async () => {
    const qb = createQueryBuilder({ data: null, error: { code: "OTHER", message: "fail" } });
    __setFromHandler(() => qb);

    await getProfile(userId);
    expect(console.error).toHaveBeenCalledWith("getProfile:", expect.any(Object));
  });
});

describe("upsertProfile", () => {
  it("debe hacer upsert con user_id y perfil", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await upsertProfile(userId, { name: "Ana", stage: 2 });

    expect(supabase.from).toHaveBeenCalledWith("profiles");
    expect(qb.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: userId,
        name: "Ana",
        stage: 2,
        updated_at: expect.any(String),
      })
    );
  });
});

// ── LOGS ─────────────────────────────────────────────────
describe("getLogs", () => {
  it("debe retornar los logs ordenados por fecha", async () => {
    const logs = [{ date: "2025-01-01" }, { date: "2025-01-02" }];
    const qb = createQueryBuilder({ data: logs, error: null });
    __setFromHandler(() => qb);

    const result = await getLogs(userId);

    expect(supabase.from).toHaveBeenCalledWith("logs");
    expect(qb.order).toHaveBeenCalledWith("date", { ascending: true });
    expect(result).toEqual(logs);
  });

  it("debe retornar array vacío ante error", async () => {
    const qb = createQueryBuilder({ data: null, error: { message: "fail" } });
    __setFromHandler(() => qb);

    const result = await getLogs(userId);
    expect(result).toEqual([]);
  });
});

describe("upsertLog", () => {
  it("debe hacer upsert con user_id y log", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);
    const log = { date: "2025-01-15", weight: 70, pain: 3 };

    await upsertLog(userId, log);

    expect(supabase.from).toHaveBeenCalledWith("logs");
    expect(qb.upsert).toHaveBeenCalledWith({ user_id: userId, ...log });
  });
});

// ── SUPPLEMENTS ──────────────────────────────────────────
describe("getSupplements", () => {
  it("debe retornar suplementos del usuario", async () => {
    const supps = [{ id: "s1", name: "Diosmina" }];
    const qb = createQueryBuilder({ data: supps, error: null });
    __setFromHandler(() => qb);

    const result = await getSupplements(userId);

    expect(supabase.from).toHaveBeenCalledWith("supplements");
    expect(result).toEqual(supps);
  });
});

describe("upsertSupplement", () => {
  it("debe hacer upsert con user_id y suplemento", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await upsertSupplement(userId, { id: "s1", name: "Diosmina" });

    expect(qb.upsert).toHaveBeenCalledWith({ user_id: userId, id: "s1", name: "Diosmina" });
  });
});

describe("deleteSupplement", () => {
  it("debe eliminar por user_id y suppId", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await deleteSupplement(userId, "s1");

    expect(supabase.from).toHaveBeenCalledWith("supplements");
    expect(qb.delete).toHaveBeenCalled();
    expect(qb.eq).toHaveBeenCalledWith("user_id", userId);
    expect(qb.eq).toHaveBeenCalledWith("id", "s1");
  });
});

// ── FOODS ────────────────────────────────────────────────
describe("getFoods", () => {
  it("debe retornar alimentos del usuario", async () => {
    const foods = [{ id: "f1", name: "Arándanos" }];
    const qb = createQueryBuilder({ data: foods, error: null });
    __setFromHandler(() => qb);

    const result = await getFoods(userId);

    expect(supabase.from).toHaveBeenCalledWith("foods");
    expect(result).toEqual(foods);
  });
});

describe("upsertFood", () => {
  it("debe hacer upsert con user_id y alimento", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await upsertFood(userId, { id: "f1", name: "Arándanos", reaction: "bien" });

    expect(qb.upsert).toHaveBeenCalledWith({
      user_id: userId,
      id: "f1",
      name: "Arándanos",
      reaction: "bien",
    });
  });
});

describe("deleteFood", () => {
  it("debe eliminar por user_id y foodId", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await deleteFood(userId, "f1");

    expect(supabase.from).toHaveBeenCalledWith("foods");
    expect(qb.delete).toHaveBeenCalled();
    expect(qb.eq).toHaveBeenCalledWith("user_id", userId);
    expect(qb.eq).toHaveBeenCalledWith("id", "f1");
  });
});

// ── CYCLE ────────────────────────────────────────────────
describe("getCycle", () => {
  it("debe retornar datos del ciclo", async () => {
    const qb = createQueryBuilder({ data: { data: { lastPeriod: "2025-01-01" } }, error: null });
    __setFromHandler(() => qb);

    const result = await getCycle(userId);

    expect(supabase.from).toHaveBeenCalledWith("cycle");
    expect(result).toEqual({ lastPeriod: "2025-01-01" });
  });

  it("debe retornar objeto vacío si no hay datos", async () => {
    const qb = createQueryBuilder({ data: null, error: { code: "PGRST116" } });
    __setFromHandler(() => qb);

    const result = await getCycle(userId);
    expect(result).toEqual({});
  });
});

describe("upsertCycle", () => {
  it("debe hacer upsert con user_id y datos del ciclo", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);
    const cycleData = { lastPeriod: "2025-01-01" };

    await upsertCycle(userId, cycleData);

    expect(supabase.from).toHaveBeenCalledWith("cycle");
    expect(qb.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: userId, data: cycleData, updated_at: expect.any(String) })
    );
  });
});

// ── MIGRATE ──────────────────────────────────────────────
describe("migrateFromLocalStorage", () => {
  it("debe migrar datos de localStorage a Supabase", async () => {
    localStorage.setItem("lt_profile", JSON.stringify({ name: "Ana" }));
    localStorage.setItem("lt_logs", JSON.stringify([{ date: "2025-01-01", weight: 70 }]));
    localStorage.setItem("lt_supps", JSON.stringify({ active: [{ id: "s1" }], custom: [] }));
    localStorage.setItem("lt_foods", JSON.stringify([{ id: "f1", name: "Kale" }]));
    localStorage.setItem("lt_cycle", JSON.stringify({ lastPeriod: "2025-01-01" }));

    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    const result = await migrateFromLocalStorage(userId);

    expect(result).toBe(true);
    expect(localStorage.getItem("lt_migrated")).toBe("true");
    // profile + 1 log + 1 supp + 1 food + cycle = 5 from() calls
    expect(supabase.from).toHaveBeenCalledWith("profiles");
    expect(supabase.from).toHaveBeenCalledWith("logs");
    expect(supabase.from).toHaveBeenCalledWith("supplements");
    expect(supabase.from).toHaveBeenCalledWith("foods");
    expect(supabase.from).toHaveBeenCalledWith("cycle");
  });

  it("debe retornar false si no hay datos locales", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    const result = await migrateFromLocalStorage(userId);

    expect(result).toBe(false);
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it("debe retornar false ante error", async () => {
    localStorage.setItem("lt_profile", "INVALID_JSON{{{");

    const result = await migrateFromLocalStorage(userId);

    expect(result).toBe(false);
  });
});

// ── CENTERS ─────────────────────────────────────────────
describe("getCenters", () => {
  it("debe filtrar por status approved y ordenar por name", async () => {
    const centers = [{ name: "Centro A" }, { name: "Centro B" }];
    const qb = createQueryBuilder({ data: centers, error: null });
    __setFromHandler(() => qb);

    const result = await getCenters();

    expect(supabase.from).toHaveBeenCalledWith("centers");
    expect(qb.eq).toHaveBeenCalledWith("status", "approved");
    expect(qb.order).toHaveBeenCalledWith("name");
    expect(result).toEqual(centers);
  });

  it("debe retornar array vacío ante error", async () => {
    const qb = createQueryBuilder({ data: null, error: { message: "fail" } });
    __setFromHandler(() => qb);

    const result = await getCenters();
    expect(result).toEqual([]);
  });
});

describe("proposeCenters", () => {
  it("debe insertar con user_id y status pending", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await proposeCenters(userId, { name: "Mi Centro", city: "Madrid" });

    expect(supabase.from).toHaveBeenCalledWith("centers");
    expect(qb.insert).toHaveBeenCalledWith({
      user_id: userId,
      name: "Mi Centro",
      city: "Madrid",
      status: "pending",
    });
  });
});

// ── SUGGESTIONS ─────────────────────────────────────────
describe("insertSuggestion", () => {
  it("debe insertar sugerencia correctamente", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await insertSuggestion({
      user_id: userId,
      type: "feature",
      description: "Añadir modo oscuro",
      email: "test@mail.com",
    });

    expect(supabase.from).toHaveBeenCalledWith("suggestions");
    expect(qb.insert).toHaveBeenCalledWith({
      user_id: userId,
      type: "feature",
      description: "Añadir modo oscuro",
      email: "test@mail.com",
    });
  });

  it("debe lanzar error si falla el insert", async () => {
    const err = { message: "insert failed" };
    const qb = createQueryBuilder({ data: null, error: err });
    __setFromHandler(() => qb);

    await expect(
      insertSuggestion({ user_id: userId, type: "bug", description: "Error", email: "" })
    ).rejects.toEqual(err);
  });
});

describe("getSuggestions", () => {
  it("debe retornar sugerencias ordenadas por created_at desc", async () => {
    const suggestions = [{ id: 1, description: "A" }];
    const qb = createQueryBuilder({ data: suggestions, error: null });
    __setFromHandler(() => qb);

    const result = await getSuggestions();

    expect(supabase.from).toHaveBeenCalledWith("suggestions");
    expect(qb.order).toHaveBeenCalledWith("created_at", { ascending: false });
    expect(result).toEqual(suggestions);
  });
});

describe("updateSuggestionStatus", () => {
  it("debe actualizar status por id", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await updateSuggestionStatus("sug-1", "approved");

    expect(supabase.from).toHaveBeenCalledWith("suggestions");
    expect(qb.update).toHaveBeenCalledWith({ status: "approved" });
    expect(qb.eq).toHaveBeenCalledWith("id", "sug-1");
  });
});

// ── FORUM POSTS ─────────────────────────────────────────
describe("getForumPosts", () => {
  it("debe retornar posts ordenados por created_at desc", async () => {
    const posts = [{ id: 1, text: "Hola" }];
    const qb = createQueryBuilder({ data: posts, error: null });
    __setFromHandler(() => qb);

    const result = await getForumPosts();

    expect(supabase.from).toHaveBeenCalledWith("forum_posts");
    expect(qb.order).toHaveBeenCalledWith("created_at", { ascending: false });
    expect(result).toEqual(posts);
  });
});

describe("insertForumPost", () => {
  it("debe insertar post y retornar data", async () => {
    const post = { id: 1, text: "Mi experiencia" };
    const qb = createQueryBuilder({ data: post, error: null });
    __setFromHandler(() => qb);

    const result = await insertForumPost({
      user_id: userId,
      author_name: "Ana",
      text: "Mi experiencia",
      stage: 2,
      country: "ES",
      treatment: "Compresión",
    });

    expect(supabase.from).toHaveBeenCalledWith("forum_posts");
    expect(qb.insert).toHaveBeenCalledWith({
      user_id: userId,
      author_name: "Ana",
      text: "Mi experiencia",
      stage: 2,
      country: "ES",
      treatment: "Compresión",
    });
    expect(qb.select).toHaveBeenCalled();
    expect(qb.single).toHaveBeenCalled();
    expect(result).toEqual(post);
  });

  it("debe lanzar error si falla el insert", async () => {
    const err = { message: "insert failed" };
    const qb = createQueryBuilder({ data: null, error: err });
    __setFromHandler(() => qb);

    await expect(
      insertForumPost({
        user_id: userId,
        author_name: "Ana",
        text: "Test",
        stage: 1,
        country: "ES",
        treatment: "",
      })
    ).rejects.toEqual(err);
  });
});

describe("updateForumReactions", () => {
  it("debe actualizar reactions por id", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await updateForumReactions("post-1", { "❤️": 3 });

    expect(supabase.from).toHaveBeenCalledWith("forum_posts");
    expect(qb.update).toHaveBeenCalledWith({ reactions: { "❤️": 3 } });
    expect(qb.eq).toHaveBeenCalledWith("id", "post-1");
  });
});

describe("deleteForumPost", () => {
  it("debe eliminar post por id", async () => {
    const qb = createQueryBuilder({ data: null, error: null });
    __setFromHandler(() => qb);

    await deleteForumPost("post-1");

    expect(supabase.from).toHaveBeenCalledWith("forum_posts");
    expect(qb.delete).toHaveBeenCalled();
    expect(qb.eq).toHaveBeenCalledWith("id", "post-1");
  });
});
