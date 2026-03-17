import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HistoryTab from "./HistoryTab";
import { createMockEntry, mockC, mockS, mockT } from "../../test/helpers";

vi.mock("./LogEntry", () => ({
  default: ({ log, onToggle }) => (
    <div data-testid={`log-${log.date}`} onClick={onToggle}>
      {log.date}
    </div>
  ),
}));

function renderHistory(logs = [], overrides = {}) {
  const props = {
    logs,
    openLog: null,
    setOpenLog: vi.fn(),
    allSuppsList: [],
    profile: {},
    lang: "en",
    C: mockC,
    S: mockS,
    t: mockT,
    ...overrides,
  };
  const utils = render(<HistoryTab {...props} />);
  return { ...utils, ...props };
}

describe("HistoryTab", () => {
  it("estado vacío debe mostrar mensaje t.history.empty", () => {
    renderHistory([]);

    expect(screen.getByText("No entries yet")).toBeInTheDocument();
  });

  it("con logs: debe renderizar LogEntry para cada log en orden inverso", () => {
    const logs = [
      createMockEntry({ date: "2025-01-01" }),
      createMockEntry({ date: "2025-01-02" }),
      createMockEntry({ date: "2025-01-03" }),
    ];
    renderHistory(logs);

    const entries = screen.getAllByTestId(/^log-/);
    expect(entries).toHaveLength(3);
    expect(entries[0]).toHaveTextContent("2025-01-03");
    expect(entries[1]).toHaveTextContent("2025-01-02");
    expect(entries[2]).toHaveTextContent("2025-01-01");
  });

  it("toggle: setOpenLog se llama al hacer click", async () => {
    const user = userEvent.setup();
    const logs = [createMockEntry({ date: "2025-01-01" })];
    const { setOpenLog } = renderHistory(logs);

    await user.click(screen.getByTestId("log-2025-01-01"));

    expect(setOpenLog).toHaveBeenCalledWith("2025-01-01");
  });
});
