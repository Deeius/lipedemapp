import "@testing-library/jest-dom/vitest";

// Node 22+ has a built-in localStorage that conflicts with jsdom.
// Provide an in-memory implementation for tests.
const store = {};
const localStorageMock = {
  getItem: (key) => (key in store ? store[key] : null),
  setItem: (key, value) => {
    store[key] = String(value);
  },
  removeItem: (key) => {
    delete store[key];
  },
  clear: () => {
    for (const key of Object.keys(store)) delete store[key];
  },
  get length() {
    return Object.keys(store).length;
  },
  key: (i) => Object.keys(store)[i] ?? null,
};

Object.defineProperty(globalThis, "localStorage", { value: localStorageMock, writable: true });
