import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileTab from "./ProfileTab";
import { mockC, mockS, mockT } from "../../test/helpers";

const ALLERGENS = [
  { key: "gluten", icon: "🌾", es: "Gluten", en: "Gluten" },
  { key: "lactose", icon: "🥛", es: "Lactosa", en: "Lactose" },
];

const ALL_ZONES = ["legs", "arms", "hips"];

function renderProfile(overrides = {}) {
  const props = {
    profile: {
      name: "Ana",
      stage: "2",
      diagnosis: "2023-01-01",
      intolerances: [],
      pillActive: false,
      pillBrand: "",
      country: "",
      region: "",
    },
    setProfile: vi.fn(),
    activeZones: [],
    saveProfile: vi.fn(),
    profileSaved: false,
    ALLERGENS,
    ALL_ZONES,
    lang: "en",
    C: mockC,
    S: mockS,
    t: mockT,
    ...overrides,
  };
  const utils = render(<ProfileTab {...props} />);
  return { ...utils, ...props };
}

describe("ProfileTab", () => {
  it("debe renderizar campos principales: nombre, etapa, diagnóstico", () => {
    renderProfile();

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ana")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2023-01-01")).toBeInTheDocument();
  });

  it("cambiar nombre debe llamar setProfile con name actualizado", async () => {
    const user = userEvent.setup();
    const { setProfile } = renderProfile();

    const nameInput = screen.getByDisplayValue("Ana");
    await user.type(nameInput, "X");

    expect(setProfile).toHaveBeenCalledWith(expect.objectContaining({ name: "AnaX" }));
  });

  it("click en 'Yes, I take it' debe activar pillActive y mostrar campo pillBrand", async () => {
    const user = userEvent.setup();
    const { setProfile } = renderProfile();

    await user.click(screen.getByText("Yes, I take it"));

    expect(setProfile).toHaveBeenCalledWith(expect.objectContaining({ pillActive: true }));
  });

  it("con pillActive true debe mostrar campo de marca", () => {
    renderProfile({
      profile: {
        name: "Ana",
        stage: "2",
        diagnosis: "2023-01-01",
        intolerances: [],
        pillActive: true,
        pillBrand: "",
        country: "",
        region: "",
      },
    });

    expect(screen.getByPlaceholderText(/Yasmin/)).toBeInTheDocument();
  });

  it("toggle intolerance debe llamar setProfile con intolerances actualizado", async () => {
    const user = userEvent.setup();
    const { setProfile } = renderProfile();

    await user.click(screen.getByText(/Gluten/));

    expect(setProfile).toHaveBeenCalledWith(expect.objectContaining({ intolerances: ["gluten"] }));
  });

  it("toggle zona activa debe llamar setProfile con activeZones actualizado", async () => {
    const user = userEvent.setup();
    const { setProfile } = renderProfile();

    await user.click(screen.getByText("Legs"));

    expect(setProfile).toHaveBeenCalledWith(expect.objectContaining({ activeZones: ["legs"] }));
  });

  it("click en botón guardar debe llamar saveProfile", async () => {
    const user = userEvent.setup();
    const { saveProfile } = renderProfile();

    await user.click(screen.getByText("Save"));

    expect(saveProfile).toHaveBeenCalled();
  });
});
