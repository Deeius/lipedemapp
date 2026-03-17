import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SuggestionsTab from "./SuggestionsTab";
import { mockC, mockS } from "../../test/helpers";

vi.mock("../../lib/db", () => ({
  insertSuggestion: vi.fn(),
}));

import { insertSuggestion } from "../../lib/db";

function renderSuggestions(overrides = {}) {
  const props = {
    lang: "en",
    C: mockC,
    S: mockS,
    userId: "user-123",
    ...overrides,
  };
  return render(<SuggestionsTab {...props} />);
}

describe("SuggestionsTab", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe renderizar formulario con tipos, textarea, email, botón", () => {
    renderSuggestions();

    expect(screen.getByText("Suggestions")).toBeInTheDocument();
    expect(screen.getByText(/Bug or error/)).toBeInTheDocument();
    expect(screen.getByText(/Improvement/)).toBeInTheDocument();
    expect(screen.getByText(/New idea/)).toBeInTheDocument();
    expect(screen.getByText(/Other/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell us in detail/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/so we can reply/)).toBeInTheDocument();
    expect(screen.getByText("Send suggestion")).toBeInTheDocument();
  });

  it("botón deshabilitado sin tipo seleccionado o descripción < 10 chars", () => {
    renderSuggestions();

    const button = screen.getByText("Send suggestion");
    expect(button).toBeDisabled();
  });

  it("seleccionar tipo + descripción >= 10 chars → botón habilitado", async () => {
    const user = userEvent.setup();
    renderSuggestions();

    await user.click(screen.getByText(/Bug or error/));
    await user.type(
      screen.getByPlaceholderText(/Tell us in detail/),
      "This is a detailed bug report"
    );

    const button = screen.getByText("Send suggestion");
    expect(button).not.toBeDisabled();
  });

  it("submit exitoso debe mostrar pantalla 'Thank you!'", async () => {
    insertSuggestion.mockResolvedValueOnce();
    const user = userEvent.setup();
    renderSuggestions();

    await user.click(screen.getByText(/Bug or error/));
    await user.type(
      screen.getByPlaceholderText(/Tell us in detail/),
      "This is a detailed bug report"
    );
    await user.click(screen.getByText("Send suggestion"));

    await waitFor(() => {
      expect(screen.getByText("Thank you!")).toBeInTheDocument();
    });
    expect(insertSuggestion).toHaveBeenCalledWith({
      user_id: "user-123",
      type: "bug",
      description: "This is a detailed bug report",
      email: null,
    });
  });

  it("submit con error debe mostrar mensaje de error", async () => {
    insertSuggestion.mockRejectedValueOnce(new Error("DB error"));
    const user = userEvent.setup();
    renderSuggestions();

    await user.click(screen.getByText(/Bug or error/));
    await user.type(
      screen.getByPlaceholderText(/Tell us in detail/),
      "This is a detailed bug report"
    );
    await user.click(screen.getByText("Send suggestion"));

    await waitFor(() => {
      expect(screen.getByText("Error sending. Please try again.")).toBeInTheDocument();
    });
  });
});
