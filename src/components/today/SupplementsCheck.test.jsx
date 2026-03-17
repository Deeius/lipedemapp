import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SupplementsCheck from "./SupplementsCheck";
import { createMockEntry, mockC, mockS, mockT } from "../../test/helpers";

const allSuppsList = [
  { key: "diosmina", es: "Diosmina", en: "Diosmin", icon: "💊" },
  { key: "selenio", es: "Selenio", en: "Selenium", icon: "🧪" },
  { key: "unknown", es: "Desconocido", en: "Unknown", icon: "❓" },
];

function renderSupps({ activeSupps = [], entryOverrides = {}, updateEntry } = {}) {
  const update = updateEntry || vi.fn();
  const entry = createMockEntry(entryOverrides);
  const utils = render(
    <SupplementsCheck
      entry={entry}
      updateEntry={update}
      activeSupps={activeSupps}
      allSuppsList={allSuppsList}
      lang="en"
      C={mockC}
      S={mockS}
      t={mockT}
    />
  );
  return { ...utils, updateEntry: update, entry };
}

describe("SupplementsCheck", () => {
  it("debe renderizar suplementos activos con nombre e icono", () => {
    renderSupps({ activeSupps: [{ key: "diosmina" }, { key: "selenio" }] });

    expect(screen.getByText("Diosmin")).toBeInTheDocument();
    expect(screen.getByText("Selenium")).toBeInTheDocument();
    expect(screen.getByText("💊")).toBeInTheDocument();
    expect(screen.getByText("🧪")).toBeInTheDocument();
  });

  it("click en suplemento no tomado debe añadir a suppsTaken", async () => {
    const user = userEvent.setup();
    const updateEntry = vi.fn();
    renderSupps({
      activeSupps: [{ key: "diosmina" }],
      entryOverrides: { suppsTaken: [] },
      updateEntry,
    });

    await user.click(screen.getByText("Diosmin"));

    expect(updateEntry).toHaveBeenCalledWith("suppsTaken", ["diosmina"]);
  });

  it("click en suplemento ya tomado debe quitarlo de suppsTaken", async () => {
    const user = userEvent.setup();
    const updateEntry = vi.fn();
    renderSupps({
      activeSupps: [{ key: "diosmina" }, { key: "selenio" }],
      entryOverrides: { suppsTaken: ["diosmina", "selenio"] },
      updateEntry,
    });

    await user.click(screen.getByText("Diosmin"));

    expect(updateEntry).toHaveBeenCalledWith("suppsTaken", ["selenio"]);
  });

  it("suplemento sin definición en allSuppsList no debe renderizar", () => {
    renderSupps({ activeSupps: [{ key: "noexiste" }] });

    expect(screen.queryByText("noexiste")).not.toBeInTheDocument();
  });

  it("lista vacía de activeSupps no debe mostrar suplementos", () => {
    renderSupps({ activeSupps: [] });

    expect(screen.getByText("Today's supplements")).toBeInTheDocument();
    expect(screen.queryByText("Diosmin")).not.toBeInTheDocument();
  });
});
