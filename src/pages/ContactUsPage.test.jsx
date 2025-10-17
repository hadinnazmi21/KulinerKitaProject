import React from "react";
import { render, screen } from "@testing-library/react";
import ContactUsPage from "./ContactUsPage";

// 🔹 Mock Header & Footer supaya gak ganggu tampilan test
jest.mock("../components/Header", () => () => <div data-testid="header" />);
jest.mock("../components/Footer", () => () => <div data-testid="footer" />);

// 🔇 Matikan console error & warning biar output test bersih
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("ContactUsPage", () => {
  test("Render komponen utama dan teks penting", () => {
    render(<ContactUsPage />);

    // Cek header dan footer
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    // Cek teks utama
expect(screen.getAllByText(/hubungi kami/i)[0]).toBeInTheDocument();
    expect(
      screen.getByText(/punya pertanyaan atau masukan/i)
    ).toBeInTheDocument();
  });

  test("Form input dan tombol kirim muncul", () => {
    render(<ContactUsPage />);

    // Input nama
    expect(screen.getByLabelText(/nama lengkap/i)).toBeInTheDocument();

    // Input email
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // Textarea pesan
    expect(screen.getByLabelText(/pesan/i)).toBeInTheDocument();

    // Tombol kirim
    expect(screen.getByRole("button", { name: /kirim pesan/i })).toBeInTheDocument();
  });
});
