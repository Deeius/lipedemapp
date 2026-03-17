import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CycleCalendar from "./CycleCalendar";
import { mockC } from "../../test/helpers";

function renderCalendar(overrides = {}) {
  const props = {
    cycleData: {},
    cycleMonth: "2025-01",
    setCycleMonth: vi.fn(),
    cycleActiveType: null,
    setCycleActiveType: vi.fn(),
    toggleCycleDay: vi.fn(),
    setCycleData: vi.fn(),
    lang: "en",
    C: mockC,
    ...overrides,
  };
  const utils = render(<CycleCalendar {...props} />);
  return { ...utils, ...props };
}

describe("CycleCalendar", () => {
  it("debe renderizar el calendario del mes actual", () => {
    renderCalendar({ cycleMonth: "2025-01" });

    expect(screen.getByText("January 2025")).toBeInTheDocument();
    // Day headers (en)
    expect(screen.getAllByText("M").length).toBeGreaterThanOrEqual(1);
    // Day numbers
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("31")).toBeInTheDocument();
  });

  it("click en tipo Period debe llamar setCycleActiveType", async () => {
    const user = userEvent.setup();
    const { setCycleActiveType } = renderCalendar();

    await user.click(screen.getByRole("button", { name: /Period/ }));

    expect(setCycleActiveType).toHaveBeenCalledOnce();
    // Verify the callback toggles correctly
    const callback = setCycleActiveType.mock.calls[0][0];
    expect(callback(null)).toBe("period");
    expect(callback("period")).toBeNull();
  });

  it("navegación prev mes debe llamar setCycleMonth", async () => {
    const user = userEvent.setup();
    const { setCycleMonth } = renderCalendar({ cycleMonth: "2025-03" });

    // ‹ is the prev button
    await user.click(screen.getByText("‹"));

    expect(setCycleMonth).toHaveBeenCalledOnce();
    // Verify the callback computes previous month
    const callback = setCycleMonth.mock.calls[0][0];
    expect(callback()).toBe("2025-02");
  });

  it("navegación next mes debe llamar setCycleMonth", async () => {
    const user = userEvent.setup();
    const { setCycleMonth } = renderCalendar({ cycleMonth: "2025-03" });

    // › is the next button
    await user.click(screen.getByText("›"));

    expect(setCycleMonth).toHaveBeenCalledOnce();
    const callback = setCycleMonth.mock.calls[0][0];
    expect(callback()).toBe("2025-04");
  });

  it("click en día con tipo activo debe llamar toggleCycleDay", async () => {
    const user = userEvent.setup();
    const { toggleCycleDay } = renderCalendar({ cycleActiveType: "period" });

    await user.click(screen.getByText("15"));

    expect(toggleCycleDay).toHaveBeenCalledWith("2025-01-15", "period");
  });

  it("click en día ya marcado con mismo tipo debe llamar setCycleData", async () => {
    const user = userEvent.setup();
    const { setCycleData } = renderCalendar({
      cycleActiveType: "period",
      cycleData: { "2025-01-15": "period" },
    });

    await user.click(screen.getByText("15"));

    expect(setCycleData).toHaveBeenCalledOnce();
    // Verify the callback removes the date
    const callback = setCycleData.mock.calls[0][0];
    const result = callback({ "2025-01-15": "period", "2025-01-16": "spm" });
    expect(result).toEqual({ "2025-01-16": "spm" });
    expect(result).not.toHaveProperty("2025-01-15");
  });
});
