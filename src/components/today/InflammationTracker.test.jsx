import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InflammationTracker from "./InflammationTracker";
import { createMockEntry, mockC, mockS, mockT } from "../../test/helpers";

function MockZoneCard({ zone, zoneName, value, onChange }) {
  return (
    <div data-testid={`zone-${zone}`}>
      <span>{zoneName}</span>
      <span data-testid={`zone-value-${zone}`}>{value}</span>
      <button onClick={() => onChange(3)} data-testid={`zone-set-${zone}`}>
        Set 3
      </button>
    </div>
  );
}

function renderTracker({ activeZones = ["legs", "arms"], entryOverrides = {} } = {}) {
  const updateEntry = vi.fn();
  const entry = createMockEntry(entryOverrides);
  const utils = render(
    <InflammationTracker
      entry={entry}
      updateEntry={updateEntry}
      activeZones={activeZones}
      lang="en"
      C={mockC}
      S={mockS}
      t={mockT}
      ZoneCard={MockZoneCard}
    />
  );
  return { ...utils, updateEntry, entry };
}

describe("InflammationTracker", () => {
  it("debe renderizar las zonas activas", () => {
    renderTracker({ activeZones: ["legs", "arms"] });

    expect(screen.getByText("Legs")).toBeInTheDocument();
    expect(screen.getByText("Arms")).toBeInTheDocument();
  });

  it("debe mostrar mensaje cuando no hay zonas", () => {
    renderTracker({ activeZones: [] });

    expect(screen.getByText("Set up your zones in Profile")).toBeInTheDocument();
  });

  it("debe mostrar el título de inflamación", () => {
    renderTracker();

    expect(screen.getByText("Inflammation")).toBeInTheDocument();
  });

  it("debe llamar updateEntry al cambiar valor de zona", async () => {
    const user = userEvent.setup();
    const { updateEntry } = renderTracker({ activeZones: ["legs"] });

    await user.click(screen.getByTestId("zone-set-legs"));

    expect(updateEntry).toHaveBeenCalledWith("inflammationZones", { legs: 3 });
  });

  it("debe mostrar valores existentes de inflamación", () => {
    renderTracker({
      activeZones: ["legs"],
      entryOverrides: { inflammationZones: { legs: 4 } },
    });

    expect(screen.getByTestId("zone-value-legs")).toHaveTextContent("4");
  });

  it("debe permitir escribir nota de inflamación", async () => {
    const user = userEvent.setup();
    const { updateEntry } = renderTracker();

    const textarea = screen.getByPlaceholderText("Any notes...");
    await user.type(textarea, "Dolor en muslos");

    // updateEntry is called per character typed
    expect(updateEntry).toHaveBeenCalledWith("inflammationNote", expect.any(String));
  });
});
