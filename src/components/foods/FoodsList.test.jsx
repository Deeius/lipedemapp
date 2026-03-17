import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FoodsList from "./FoodsList";
import { mockC, mockS, mockT } from "../../test/helpers";

function renderList({ foods = [], removeFood } = {}) {
  const remove = removeFood || vi.fn();
  const utils = render(
    <FoodsList foods={foods} removeFood={remove} C={mockC} S={mockS} t={mockT} />
  );
  return { ...utils, removeFood: remove };
}

describe("FoodsList", () => {
  it("debe renderizar lista de alimentos con nombre y reacción", () => {
    renderList({
      foods: [
        { id: "f1", name: "Arándanos", category: "fruits", reaction: "good", notes: "" },
        { id: "f2", name: "Pan blanco", category: "proteins", reaction: "bad", notes: "" },
      ],
    });

    expect(screen.getByText("Arándanos")).toBeInTheDocument();
    expect(screen.getByText("Pan blanco")).toBeInTheDocument();
    expect(screen.getByText("Good")).toBeInTheDocument();
    expect(screen.getByText("Bad")).toBeInTheDocument();
  });

  it("estado vacío debe mostrar mensaje", () => {
    renderList({ foods: [] });

    expect(screen.getByText("No foods added yet")).toBeInTheDocument();
  });

  it("click en botón × debe llamar removeFood con id", async () => {
    const user = userEvent.setup();
    const removeFood = vi.fn();
    renderList({
      foods: [{ id: "f1", name: "Kale", category: "vegetables", reaction: "good", notes: "" }],
      removeFood,
    });

    await user.click(screen.getByText("×"));

    expect(removeFood).toHaveBeenCalledWith("f1");
  });

  it("debe mostrar notas si existen", () => {
    renderList({
      foods: [
        { id: "f1", name: "Kale", category: "vegetables", reaction: "good", notes: "Muy bueno" },
      ],
    });

    expect(screen.getByText("Muy bueno")).toBeInTheDocument();
  });
});
