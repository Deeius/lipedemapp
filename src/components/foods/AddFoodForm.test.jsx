import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddFoodForm from "./AddFoodForm";
import { mockC, mockS, mockT } from "../../test/helpers";

const defaultFood = { name: "", category: "fruits", reaction: "neutral", notes: "" };

function renderForm({ newFood = defaultFood, setNewFood, addFood } = {}) {
  const set = setNewFood || vi.fn();
  const add = addFood || vi.fn();
  const utils = render(
    <AddFoodForm
      newFood={newFood}
      setNewFood={set}
      addFood={add}
      lang="en"
      C={mockC}
      S={mockS}
      t={mockT}
    />
  );
  return { ...utils, setNewFood: set, addFood: add };
}

describe("AddFoodForm", () => {
  it("debe renderizar campos: nombre, categoría, reacción, notas", () => {
    renderForm();

    expect(screen.getByPlaceholderText("Food name...")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Good")).toBeInTheDocument();
    expect(screen.getByText("Bad")).toBeInTheDocument();
    expect(screen.getByText("Neutral")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Notes...")).toBeInTheDocument();
  });

  it("escribir en nombre debe llamar setNewFood con name actualizado", async () => {
    const user = userEvent.setup();
    const setNewFood = vi.fn();
    renderForm({ setNewFood });

    const input = screen.getByPlaceholderText("Food name...");
    await user.type(input, "K");

    expect(setNewFood).toHaveBeenCalledWith({ ...defaultFood, name: "K" });
  });

  it("seleccionar categoría debe llamar setNewFood con category", async () => {
    const user = userEvent.setup();
    const setNewFood = vi.fn();
    renderForm({ setNewFood });

    const select = screen.getByDisplayValue("Fruits");
    await user.selectOptions(select, "vegetables");

    expect(setNewFood).toHaveBeenCalledWith({ ...defaultFood, category: "vegetables" });
  });

  it("click en reacción Good debe llamar setNewFood con reaction", async () => {
    const user = userEvent.setup();
    const setNewFood = vi.fn();
    renderForm({ setNewFood });

    await user.click(screen.getByText("Good"));

    expect(setNewFood).toHaveBeenCalledWith({ ...defaultFood, reaction: "good" });
  });

  it("click en botón submit debe llamar addFood", async () => {
    const user = userEvent.setup();
    const addFood = vi.fn();
    renderForm({ addFood });

    // The submit button has the same text as the title "Add food"
    const buttons = screen.getAllByText("Add food");
    // The button is the last one (first is the card title)
    await user.click(buttons[buttons.length - 1]);

    expect(addFood).toHaveBeenCalledOnce();
  });
});
