import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminTab from "./AdminTab";
import { mockC } from "../../test/helpers";

vi.mock("../../lib/db", () => ({
  getSuggestions: vi.fn(),
  updateSuggestionStatus: vi.fn(),
}));

import { getSuggestions, updateSuggestionStatus } from "../../lib/db";

const sampleSuggestions = [
  {
    id: "s1",
    type: "bug",
    description: "The water tracker resets unexpectedly when switching tabs",
    status: "new",
    email: "user@test.com",
    created_at: "2025-01-10T10:00:00Z",
  },
  {
    id: "s2",
    type: "mejora",
    description: "Add dark mode support",
    status: "read",
    email: null,
    created_at: "2025-01-12T10:00:00Z",
  },
  {
    id: "s3",
    type: "idea",
    description: "Integration with Apple Health",
    status: "done",
    email: null,
    created_at: "2025-01-08T10:00:00Z",
  },
];

function renderAdmin(overrides = {}) {
  const props = { lang: "en", C: mockC, ...overrides };
  return render(<AdminTab {...props} />);
}

describe("AdminTab", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getSuggestions.mockResolvedValue([]);
  });

  it("muestra 'Loading…' al montar", () => {
    getSuggestions.mockReturnValue(new Promise(() => {})); // never resolves
    renderAdmin();

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it("muestra 'No suggestions yet' sin sugerencias", async () => {
    getSuggestions.mockResolvedValue([]);
    renderAdmin();

    await waitFor(() => {
      expect(screen.getByText("No suggestions yet")).toBeInTheDocument();
    });
  });

  it("renderiza tipo, descripción y status badge con sugerencias", async () => {
    getSuggestions.mockResolvedValue(sampleSuggestions);
    renderAdmin();

    await waitFor(() => {
      expect(screen.getByText("🐛 Error")).toBeInTheDocument();
    });
    expect(screen.getByText("✨ Mejora")).toBeInTheDocument();
    expect(screen.getByText("💡 Idea")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Read")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("click en filtro 'New' muestra solo sugerencias con status new", async () => {
    getSuggestions.mockResolvedValue(sampleSuggestions);
    const user = userEvent.setup();
    renderAdmin();

    await waitFor(() => {
      expect(screen.getByText("🐛 Error")).toBeInTheDocument();
    });

    // Click the "New" filter button (has count)
    const newFilterBtn = screen.getByRole("button", { name: /^New/ });
    await user.click(newFilterBtn);

    // Only bug (status: new) should remain
    expect(screen.getByText("🐛 Error")).toBeInTheDocument();
    expect(screen.queryByText("✨ Mejora")).not.toBeInTheDocument();
    expect(screen.queryByText("💡 Idea")).not.toBeInTheDocument();
  });

  it("click en sugerencia expande y muestra descripción completa + botones", async () => {
    getSuggestions.mockResolvedValue(sampleSuggestions);
    updateSuggestionStatus.mockResolvedValue();
    const user = userEvent.setup();
    renderAdmin();

    await waitFor(() => {
      expect(screen.getByText("🐛 Error")).toBeInTheDocument();
    });

    // Click on the bug suggestion row to expand it
    const bugRow = screen.getByText("🐛 Error").closest("[style]");
    await user.click(bugRow);

    // Clicking a "new" suggestion auto-marks it as "read"
    expect(updateSuggestionStatus).toHaveBeenCalledWith("s1", "read");

    // Expanded section shows action buttons
    await waitFor(() => {
      expect(screen.getByText("Mark done")).toBeInTheDocument();
    });
  });

  it("click 'Mark done' llama updateSuggestionStatus(id, 'done')", async () => {
    getSuggestions.mockResolvedValue(sampleSuggestions);
    updateSuggestionStatus.mockResolvedValue();
    const user = userEvent.setup();
    renderAdmin();

    await waitFor(() => {
      expect(screen.getByText("🐛 Error")).toBeInTheDocument();
    });

    // Expand the bug suggestion
    const bugRow = screen.getByText("🐛 Error").closest("[style]");
    await user.click(bugRow);

    await waitFor(() => {
      expect(screen.getByText("Mark done")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Mark done"));

    // First call is auto-read, second call is mark done
    expect(updateSuggestionStatus).toHaveBeenCalledWith("s1", "done");
  });
});
