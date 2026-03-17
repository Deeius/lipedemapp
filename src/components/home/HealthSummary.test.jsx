import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HealthSummary from "./HealthSummary";
import { createMockEntry, mockC } from "../../test/helpers";

function renderSummary(logs = [], setTab = vi.fn()) {
  const utils = render(<HealthSummary logs={logs} lang="en" C={mockC} setTab={setTab} />);
  return { ...utils, setTab };
}

describe("HealthSummary", () => {
  it("sin logs: debe mostrar mensaje 'No entries yet. Start today!'", () => {
    renderSummary([]);

    expect(screen.getByText("No entries yet. Start today!")).toBeInTheDocument();
  });

  it("con logs: debe calcular avg pain y avg energy correctamente", () => {
    const logs = [
      createMockEntry({ pain: 2, energy: 4, weight: 70 }),
      createMockEntry({ pain: 4, energy: 6, weight: 72 }),
    ];
    renderSummary(logs);

    expect(screen.getByText("3.0")).toBeInTheDocument(); // avg pain
    expect(screen.getByText("5.0")).toBeInTheDocument(); // avg energy
  });

  it("debe mostrar último peso registrado", () => {
    const logs = [
      createMockEntry({ weight: 70 }),
      createMockEntry({ weight: null }),
      createMockEntry({ weight: 68 }),
    ];
    renderSummary(logs);

    expect(screen.getByText("68")).toBeInTheDocument();
  });

  it("click en 'Log today →' debe llamar setTab('today')", async () => {
    const user = userEvent.setup();
    const { setTab } = renderSummary([]);

    await user.click(screen.getByText("Log today →"));

    expect(setTab).toHaveBeenCalledWith("today");
  });
});
