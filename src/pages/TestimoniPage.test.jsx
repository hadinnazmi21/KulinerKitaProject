import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestimoniPage from "./TestimoniPage";

// 🧩 Mock semua komponen non-logika biar test fokus ke behavior
jest.mock("../components/Header", () => () => <div data-testid="header" />);
jest.mock("../components/Footer", () => () => <div data-testid="footer" />);
jest.mock("../components/LoadingSpinner", () => ({ text }) => <div>{text}</div>);
jest.mock("../components/EmptyState", () => ({ text }) => <div>{text}</div>);
jest.mock("../components/TestimoniCard", () => ({ nama, deskripsi }) => (
  <div>{`${nama} - ${deskripsi}`}</div>
));

// 🧩 Mock API
jest.mock("../services/testimoniAPI", () => ({
  notesAPI: {
    fetchNotes: jest.fn(),
  },
}));

const { notesAPI } = require("../services/testimoniAPI");

// 🧪 Test utama
describe("TestimoniPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render TestimoniPage", async () => {
    // Mock data sukses
    notesAPI.fetchNotes.mockResolvedValueOnce([
      { id: 1, nama: "Rina", pesan: "Enak banget!" },
      { id: 2, nama: "Budi", pesan: "Mantap rasanya!" },
    ]);

    render(<TestimoniPage />);

    // Pastikan judul muncul
    expect(screen.getByText(/Testimoni Pelanggan/i)).toBeInTheDocument();

    // Tunggu sampai data tampil
    await waitFor(() => {
      expect(screen.getByText(/Rina - Enak banget!/i)).toBeInTheDocument();
      expect(screen.getByText(/Budi - Mantap rasanya!/i)).toBeInTheDocument();
    });
  });

  test("menampilkan pesan error saat fetch gagal", async () => {
    notesAPI.fetchNotes.mockRejectedValueOnce(new Error("Network error"));

    render(<TestimoniPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Gagal memuat testimoni/i)
      ).toBeInTheDocument();
    });
  });

  test("menampilkan EmptyState saat tidak ada data", async () => {
    notesAPI.fetchNotes.mockResolvedValueOnce([]);

    render(<TestimoniPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Belum ada testimoni/i)
      ).toBeInTheDocument();
    });
  });
});
