import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommunityForum from "./CommunityForum";
import { mockC } from "../../test/helpers";

vi.mock("../../lib/db", () => ({
  getForumPosts: vi.fn(),
  insertForumPost: vi.fn(),
  updateForumReactions: vi.fn(),
}));

import { getForumPosts, insertForumPost, updateForumReactions } from "../../lib/db";

const samplePosts = [
  {
    id: "p1",
    author_name: "María",
    text: "My diagnosis journey was long",
    stage: "2",
    country: "Spain",
    treatment: "conservative",
    reactions: { "💪": 3, "❤️": 1, "🙏": 0 },
    created_at: "2025-01-10T10:00:00Z",
  },
  {
    id: "p2",
    author_name: "Anna",
    text: "Surgery changed my life",
    stage: "3",
    country: "Germany",
    treatment: "surgical",
    reactions: {},
    created_at: "2025-01-12T10:00:00Z",
  },
];

function renderForum(overrides = {}) {
  const props = {
    lang: "en",
    C: mockC,
    profile: { name: "Test User", stage: "2", country: "Spain" },
    userId: "user-123",
    ...overrides,
  };
  return render(<CommunityForum {...props} />);
}

describe("CommunityForum", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getForumPosts.mockResolvedValue([]);
    localStorage.clear();
  });

  it("muestra 'Loading stories…' al montar", () => {
    getForumPosts.mockReturnValue(new Promise(() => {})); // never resolves
    renderForum();

    expect(screen.getByText(/Loading stories/)).toBeInTheDocument();
  });

  it("muestra 'Be the first to share your story' sin posts", async () => {
    getForumPosts.mockResolvedValue([]);
    renderForum();

    await waitFor(() => {
      expect(screen.getByText(/Be the first to share your story/)).toBeInTheDocument();
    });
  });

  it("renderiza autor, texto y tags de cada post", async () => {
    getForumPosts.mockResolvedValue(samplePosts);
    renderForum();

    await waitFor(() => {
      expect(screen.getByText("María")).toBeInTheDocument();
    });
    expect(screen.getByText(/My diagnosis journey was long/)).toBeInTheDocument();
    expect(screen.getByText("Stage 2")).toBeInTheDocument();
    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.getByText("Anna")).toBeInTheDocument();
    expect(screen.getByText(/Surgery changed my life/)).toBeInTheDocument();
  });

  it("sin userId muestra 'Sign in to participate' en vez de botón Share", async () => {
    getForumPosts.mockResolvedValue([]);
    renderForum({ userId: null });

    await waitFor(() => {
      expect(screen.getByText(/Sign in to participate/)).toBeInTheDocument();
    });
    expect(screen.queryByText(/Share/)).not.toBeInTheDocument();
  });

  it("click '+ Share' muestra formulario con textarea, stage, country y topic buttons", async () => {
    getForumPosts.mockResolvedValue([]);
    const user = userEvent.setup();
    renderForum();

    await waitFor(() => {
      expect(screen.getByText("+ Share")).toBeInTheDocument();
    });
    await user.click(screen.getByText("+ Share"));

    expect(screen.getByText("Your story *")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Share your experience with diagnosis/)).toBeInTheDocument();
    expect(screen.getByText("Stage")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Topic")).toBeInTheDocument();
    expect(screen.getByText("Conservative treatment")).toBeInTheDocument();
    expect(screen.getByText("Surgery")).toBeInTheDocument();
  });

  it("botón Post deshabilitado si textarea vacía", async () => {
    getForumPosts.mockResolvedValue([]);
    const user = userEvent.setup();
    renderForum();

    await waitFor(() => {
      expect(screen.getByText("+ Share")).toBeInTheDocument();
    });
    await user.click(screen.getByText("+ Share"));

    const postBtn = screen.getByText("Post");
    expect(postBtn).toBeDisabled();
  });

  it("submit llama insertForumPost y muestra mensaje de éxito", async () => {
    getForumPosts.mockResolvedValue([]);
    insertForumPost.mockResolvedValue({
      id: "new-1",
      author_name: "Test User",
      text: "My story here",
      stage: "2",
      country: "Spain",
      treatment: null,
      reactions: {},
      created_at: new Date().toISOString(),
    });
    const user = userEvent.setup();
    renderForum();

    await waitFor(() => {
      expect(screen.getByText("+ Share")).toBeInTheDocument();
    });
    await user.click(screen.getByText("+ Share"));
    await user.type(screen.getByPlaceholderText(/Share your experience/), "My story here");
    await user.click(screen.getByText("Post"));

    await waitFor(() => {
      expect(screen.getByText(/Thank you for sharing/)).toBeInTheDocument();
    });
    expect(insertForumPost).toHaveBeenCalledWith("user-123", {
      author_name: "Test User",
      text: "My story here",
      stage: "2",
      country: "Spain",
      treatment: null,
    });
  });

  it("click en reacción llama updateForumReactions y actualiza contador", async () => {
    getForumPosts.mockResolvedValue([samplePosts[0]]);
    updateForumReactions.mockResolvedValue();
    const user = userEvent.setup();
    renderForum();

    await waitFor(() => {
      expect(screen.getByText("María")).toBeInTheDocument();
    });

    // Find the 💪 reaction button — it has count 3
    const reactionButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.textContent.includes("💪"));
    await user.click(reactionButtons[0]);

    expect(updateForumReactions).toHaveBeenCalledWith("p1", {
      "💪": 4,
      "❤️": 1,
      "🙏": 0,
    });
  });
});
