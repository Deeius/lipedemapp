import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PillTracker from "./PillTracker";
import { createMockEntry, mockC, mockS } from "../../test/helpers";

function renderPill({ entryOverrides = {}, profile = {}, updateEntry } = {}) {
  const update = updateEntry || vi.fn();
  const entry = createMockEntry(entryOverrides);
  const utils = render(
    <PillTracker
      entry={entry}
      updateEntry={update}
      profile={{ pillBrand: "", ...profile }}
      lang="en"
      C={mockC}
      S={mockS}
    />
  );
  return { ...utils, updateEntry: update, entry };
}

describe("PillTracker", () => {
  it("debe renderizar con pillTaken=false (estado no marcado)", () => {
    renderPill({ entryOverrides: { pillTaken: false } });

    expect(screen.getByText("Tap to mark as taken")).toBeInTheDocument();
    expect(screen.getByText("Pill taken today")).toBeInTheDocument();
  });

  it("click debe llamar updateEntry con pillTaken=true", async () => {
    const user = userEvent.setup();
    const updateEntry = vi.fn();
    renderPill({ entryOverrides: { pillTaken: false }, updateEntry });

    await user.click(screen.getByText("Pill taken today"));

    expect(updateEntry).toHaveBeenCalledWith("pillTaken", true);
  });

  it("click con pillTaken=true debe llamar updateEntry con false", async () => {
    const user = userEvent.setup();
    const updateEntry = vi.fn();
    renderPill({ entryOverrides: { pillTaken: true }, updateEntry });

    await user.click(screen.getByText(/Marked as taken/));

    expect(updateEntry).toHaveBeenCalledWith("pillTaken", false);
  });

  it("debe mostrar pillBrand cuando existe", () => {
    renderPill({
      entryOverrides: { pillTaken: false },
      profile: { pillBrand: "Yasmin" },
    });

    expect(screen.getByText(/Yasmin/)).toBeInTheDocument();
  });
});
