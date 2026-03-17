import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CycleSummary from "./CycleSummary";
import { mockC } from "../../test/helpers";

function renderCycle(cycleData = {}, setTab = vi.fn()) {
  const utils = render(<CycleSummary cycleData={cycleData} lang="en" C={mockC} setTab={setTab} />);
  return { ...utils, setTab };
}

describe("CycleSummary", () => {
  it("sin datos de ciclo: debe mostrar mensaje 'You haven't marked any period days yet.'", () => {
    renderCycle({});

    expect(screen.getByText("You haven't marked any period days yet.")).toBeInTheDocument();
  });

  it("con datos de período: debe mostrar último inicio y días marcados", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-03-15"));

    const cycleData = {
      "2025-03-01": "period",
      "2025-03-02": "period",
      "2025-03-03": "period",
    };
    renderCycle(cycleData);

    expect(screen.getByText("01/03")).toBeInTheDocument(); // lastPeriodStart
    expect(screen.getByText("3")).toBeInTheDocument(); // period days this month

    vi.useRealTimers();
  });

  it("click en 'View calendar →' debe llamar setTab('today')", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date("2025-03-15"));

    const user = userEvent.setup();
    const { setTab } = renderCycle({});

    await user.click(screen.getByText("View calendar →"));

    expect(setTab).toHaveBeenCalledWith("today");

    vi.useRealTimers();
  });
});
