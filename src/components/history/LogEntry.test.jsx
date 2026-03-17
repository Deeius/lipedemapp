import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogEntry from "./LogEntry";
import { createMockEntry, mockC, mockS, mockT } from "../../test/helpers";

function renderEntry(logOverrides = {}, propsOverrides = {}) {
  const log = createMockEntry(logOverrides);
  const props = {
    log,
    isOpen: false,
    onToggle: vi.fn(),
    allSuppsList: [],
    profile: { pillBrand: "" },
    lang: "en",
    C: mockC,
    S: mockS,
    t: mockT,
    ...propsOverrides,
  };
  const utils = render(<LogEntry {...props} />);
  return { ...utils, ...props };
}

describe("LogEntry", () => {
  it("collapsed: debe mostrar fecha, emoji, peso, dolor, energía", () => {
    renderEntry({ date: "2025-01-15", mood: 4, weight: 70, pain: 3, energy: 6 });

    expect(screen.getByText("2025-01-15")).toBeInTheDocument();
    expect(screen.getByText("😊")).toBeInTheDocument();
    expect(screen.getByText("70kg")).toBeInTheDocument();
    expect(screen.getByText("dolor 3")).toBeInTheDocument();
    expect(screen.getByText("energía 6")).toBeInTheDocument();
  });

  it("click en header debe llamar onToggle", async () => {
    const user = userEvent.setup();
    const { onToggle } = renderEntry({ date: "2025-01-15" });

    await user.click(screen.getByText("2025-01-15"));

    expect(onToggle).toHaveBeenCalled();
  });

  it("expanded: debe mostrar secciones de stats (Weight, Pain, Energy, Mood)", () => {
    renderEntry({ weight: 70, pain: 3, energy: 6, mood: 4 }, { isOpen: true });

    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("Pain")).toBeInTheDocument();
    expect(screen.getByText("Energy")).toBeInTheDocument();
    expect(screen.getByText("Mood")).toBeInTheDocument();
    expect(screen.getByText("70 kg")).toBeInTheDocument();
    expect(screen.getByText("3 / 6")).toBeInTheDocument();
    expect(screen.getByText("6 / 6")).toBeInTheDocument();
  });

  it("expanded con agua > 0: debe mostrar sección de agua", () => {
    renderEntry({ water: 5 }, { isOpen: true });

    expect(screen.getByText(/5 glasses of water/)).toBeInTheDocument();
  });

  it("expanded con notas: debe mostrar sección de notas", () => {
    renderEntry({ notes: "Feeling better today" }, { isOpen: true });

    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Feeling better today")).toBeInTheDocument();
  });
});
