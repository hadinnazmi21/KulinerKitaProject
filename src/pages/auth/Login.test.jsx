import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login"; // ⬅️ path ke komponenmu
import { loginAPI } from "../../services/loginAPI";

// Mock API supaya nggak beneran call server
jest.mock("../../services/loginAPI", () => ({
  loginAPI: {
    login: jest.fn(),
  },
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Render form dan elemen utama", () => {
    render(<Login />);

    expect(
      screen.getByRole("heading", { name: /masuk ke akun anda/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kata sandi/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /masuk/i })).toBeInTheDocument();
  });

  test("Isi form dan login berhasil", async () => {
    loginAPI.login.mockResolvedValueOnce({ username: "ruthiana" });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "ruthiana" },
    });
    fireEvent.change(screen.getByLabelText(/kata sandi/i), {
      target: { value: "12345" },
    });
    fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/berhasil login! selamat datang, ruthiana!/i)
      ).toBeInTheDocument()
    );
  });

  test("Menampilkan pesan error jika login gagal", async () => {
    loginAPI.login.mockRejectedValueOnce(
      new Error("Username atau password salah")
    );

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "salah" },
    });
    fireEvent.change(screen.getByLabelText(/kata sandi/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/username atau password salah/i)
      ).toBeInTheDocument()
    );
  });

  test("Tombol berubah jadi 'Memeriksa…' saat loading", async () => {
    loginAPI.login.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ username: "ruth" }), 100))
    );

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "ruth" },
    });
    fireEvent.change(screen.getByLabelText(/kata sandi/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

    // Saat proses loading
    expect(screen.getByRole("button", { name: /memeriksa/i })).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/berhasil login/i)).toBeInTheDocument()
    );
  });
});
