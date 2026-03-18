import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CentersSection from "./CentersSection";
import { mockC, mockS } from "../../test/helpers";

const pendingSample = [
  {
    id: "pc1",
    name: "New Clinic Madrid",
    address: "C/ Gran Vía 10",
    city: "Madrid",
    type: "Physiotherapy / MLD",
    specialty: "Manual lymphatic drainage",
    mapsUrl: "https://maps.google.com/?q=New+Clinic",
    notes: "Great experience",
    proposedAt: "2025-01-15T10:00:00Z",
  },
];

const defaultCenterForm = {
  name: "",
  city: "",
  address: "",
  mapsUrl: "",
  type: "",
  specialty: "",
  notes: "",
};

function renderCenters(overrides = {}) {
  const props = {
    profile: { country: "Spain", region: "Madrid" },
    userCenters: [],
    pendingCenters: [],
    centerFilter: "all",
    setCenterFilter: vi.fn(),
    centersView: "list",
    setCentersView: vi.fn(),
    centerForm: defaultCenterForm,
    setCenterForm: vi.fn(),
    saveCenterProposal: vi.fn(),
    approveCenter: vi.fn(),
    rejectCenter: vi.fn(),
    setTab: vi.fn(),
    lang: "en",
    C: mockC,
    S: mockS,
    ...overrides,
  };
  return { ...render(<CentersSection {...props} />), props };
}

describe("CentersSection", () => {
  // ── LIST VIEW ──
  describe("vista list", () => {
    it("renderiza header y centros sample", () => {
      renderCenters();

      expect(screen.getByText("Specialist centres")).toBeInTheDocument();
      expect(screen.getByText(/Clínica Linfovascular Madrid/)).toBeInTheDocument();
      expect(screen.getByText(/Fisioterapia Integral Barcelona/)).toBeInTheDocument();
      expect(screen.getByText(/Centro Dermatológico Valencia/)).toBeInTheDocument();
    });

    it("muestra filtros de ciudad All, Madrid, Barcelona, Valencia", () => {
      renderCenters();

      expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Madrid" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Barcelona" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Valencia" })).toBeInTheDocument();
    });

    it("click en filtro ciudad llama setCenterFilter", async () => {
      const user = userEvent.setup();
      const { props } = renderCenters();

      await user.click(screen.getByRole("button", { name: "Barcelona" }));

      expect(props.setCenterFilter).toHaveBeenCalledWith("Barcelona");
    });

    it("click 'Propose centre' llama setCentersView('propose')", async () => {
      const user = userEvent.setup();
      const { props } = renderCenters();

      await user.click(screen.getByText(/Propose centre/));

      expect(props.setCentersView).toHaveBeenCalledWith("propose");
    });
  });

  // ── PROPOSE VIEW ──
  describe("vista propose", () => {
    it("renderiza formulario con campos name, city, address, type, specialty, notes", () => {
      renderCenters({ centersView: "propose" });

      expect(screen.getByText("Propose a centre")).toBeInTheDocument();
      expect(screen.getByText("Centre name *")).toBeInTheDocument();
      expect(screen.getByText("City *")).toBeInTheDocument();
      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText("Specialty type")).toBeInTheDocument();
      expect(screen.getByText("Specialty description")).toBeInTheDocument();
      expect(screen.getByText("Additional notes")).toBeInTheDocument();
      expect(screen.getByText("Submit proposal")).toBeInTheDocument();
    });

    it("click 'Submit proposal' llama saveCenterProposal cuando name y city tienen valor", async () => {
      const user = userEvent.setup();
      const { props } = renderCenters({
        centersView: "propose",
        centerForm: { ...defaultCenterForm, name: "Test Clinic", city: "Madrid" },
      });

      await user.click(screen.getByText("Submit proposal"));

      expect(props.saveCenterProposal).toHaveBeenCalled();
    });
  });

  // ── PENDING VIEW ──
  describe("vista pending", () => {
    it("renderiza centros pendientes con botones Approve/Reject", async () => {
      const user = userEvent.setup();
      const { props } = renderCenters({
        centersView: "pending",
        pendingCenters: pendingSample,
      });

      expect(screen.getByText("New Clinic Madrid")).toBeInTheDocument();
      expect(screen.getByText(/Pending review/)).toBeInTheDocument();

      await user.click(screen.getByText(/Approve/));
      expect(props.approveCenter).toHaveBeenCalledWith("pc1");

      await user.click(screen.getByText(/Reject/));
      expect(props.rejectCenter).toHaveBeenCalledWith("pc1");
    });
  });
});
