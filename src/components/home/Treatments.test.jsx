import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Treatments from "./Treatments";
import { mockC } from "../../test/helpers";

function renderTreatments(lang = "en") {
  return render(<Treatments lang={lang} C={mockC} />);
}

describe("Treatments", () => {
  it("debe renderizar con tab conservador por defecto", () => {
    renderTreatments();

    expect(screen.getByText("Medical compression")).toBeInTheDocument();
    expect(screen.getByText("Anti-inflammatory diet")).toBeInTheDocument();
    expect(screen.getByText(/Does conservative treatment cure lipedema/)).toBeInTheDocument();
  });

  it("click en tab quirúrgico debe cambiar contenido", async () => {
    const user = userEvent.setup();
    renderTreatments();

    await user.click(screen.getByText("Surgical"));

    expect(screen.getByText("WAL liposuction")).toBeInTheDocument();
    expect(screen.getByText("VASER")).toBeInTheDocument();
    expect(screen.getByText(/Does surgery cure lipedema/)).toBeInTheDocument();
  });

  it("click en FAQ debe expandir/colapsar contenido", async () => {
    const user = userEvent.setup();
    renderTreatments();

    const faqQuestion = screen.getByText(/Does conservative treatment cure lipedema/);
    expect(screen.queryByText(/currently has no cure/)).not.toBeInTheDocument();

    await user.click(faqQuestion);

    expect(screen.getByText(/currently has no cure/)).toBeInTheDocument();

    await user.click(faqQuestion);

    expect(screen.queryByText(/currently has no cure/)).not.toBeInTheDocument();
  });
});
