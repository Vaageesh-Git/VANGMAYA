import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginClient from "../login/loginClient";
import axios from "axios";

jest.mock("axios");

// Create mock functions we can track
const mockPush = jest.fn();
const mockSetIsLoggedIn = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    setIsLoggedIn: mockSetIsLoggedIn,
  }),
}));

describe("LoginClient Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("successful login updates auth and redirects", async () => {
    axios.post.mockResolvedValue({ status: 200 });

    render(<LoginClient />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/auth/login"),
        {
          email: "test@test.com",
          password: "123456",
        },
        { withCredentials: true }
      );
    });

    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
