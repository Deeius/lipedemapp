import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WaterTracker from "./WaterTracker";
import { createMockEntry, mockC, mockT } from "../../test/helpers";

function renderWater(overrides = {}, updateEntry = vi.fn()) {
  const entry = createMockEntry(overrides);
  const utils = render(
    <WaterTracker entry={entry} updateEntry={updateEntry} lang="en" C={mockC} t={mockT} />
  );
  return { ...utils, entry, updateEntry };
}

describe("WaterTracker", () => {
  it("debe renderizar el contador de agua", () => {
    renderWater({ water: 4 });

    expect(screen.getByText(/4 \/ 8/)).toBeInTheDocument();
    expect(screen.getByText("Water")).toBeInTheDocument();
  });

  it("click en + debe incrementar el agua", async () => {
    const user = userEvent.setup();
    const { updateEntry } = renderWater({ water: 4 });

    const plusBtn = screen.getByText("+");
    await user.click(plusBtn);

    expect(updateEntry).toHaveBeenCalledWith("water", 5);
  });

  it("click en − debe decrementar el agua", async () => {
    const user = userEvent.setup();
    const updateEntry = vi.fn();
    renderWater({ water: 4 }, updateEntry);

    // The minus button uses − (U+2212)
    const minusBtn = screen.getByText("−");
    await user.click(minusBtn);

    expect(updateEntry).toHaveBeenCalledWith("water", 3);
  });

  it("no debe bajar de 0", async () => {
    const user = userEvent.setup();
    const updateEntry = vi.fn();
    renderWater({ water: 0 }, updateEntry);

    const minusBtn = screen.getByText("−");
    await user.click(minusBtn);

    expect(updateEntry).toHaveBeenCalledWith("water", 0);
  });

  it("no debe subir de 12", async () => {
    const user = userEvent.setup();
    const updateEntry = vi.fn();
    renderWater({ water: 12 }, updateEntry);

    const plusBtn = screen.getByText("+");
    await user.click(plusBtn);

    expect(updateEntry).toHaveBeenCalledWith("water", 12);
  });

  it("debe mostrar texto extra cuando water > 8", () => {
    renderWater({ water: 10 });

    expect(screen.getByText(/\+2 extra glasses/)).toBeInTheDocument();
  });

  it("no debe mostrar texto extra cuando water <= 8", () => {
    renderWater({ water: 7 });

    expect(screen.queryByText(/extra glasses/)).not.toBeInTheDocument();
  });
});
