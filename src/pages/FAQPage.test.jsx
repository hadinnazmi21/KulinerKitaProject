import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import FAQPage from "./FAQPage";
import { faqAPI } from "../services/faqAPI";

// Hilangkan error dan warning biar output bersih
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});


// Mock komponen agar gak render sebenarnya
jest.mock("../components/Header", () => () => <div data-testid="header" />);
jest.mock("../components/Footer", () => () => <div data-testid="footer" />);

// Mock API
jest.mock("../services/faqAPI", () => ({
  faqAPI: {
    fetchNotes: jest.fn(),
  },
}));

describe("FAQPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Render awal menampilkan loading", async () => {
    faqAPI.fetchNotes.mockResolvedValueOnce([]);
    render(<FAQPage />);
    expect(screen.getByText(/memuat pertanyaan/i)).toBeInTheDocument();
  });

  test("Menampilkan data FAQ setelah berhasil diambil", async () => {
    faqAPI.fetchNotes.mockResolvedValueOnce([
      { id: 1, pertanyaan: "Apa itu produk A?", jawaban: "Produk A adalah ..." },
      { id: 2, pertanyaan: "Bagaimana cara pesan?", jawaban: "Anda bisa pesan via..." },
    ]);

    render(<FAQPage />);

    // Pastikan API terpanggil
    await waitFor(() => {
      expect(faqAPI.fetchNotes).toHaveBeenCalled();
    });

    // Pastikan FAQ muncul
    await waitFor(() => {
      expect(screen.getByText(/apa itu produk a/i)).toBeInTheDocument();
      expect(screen.getByText(/bagaimana cara pesan/i)).toBeInTheDocument();
    });
  });

  test("Menampilkan pesan error jika gagal memuat data", async () => {
    faqAPI.fetchNotes.mockRejectedValueOnce(new Error("Network error"));
    render(<FAQPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/gagal memuat pertanyaan/i)
      ).toBeInTheDocument();
    });
  });

  test("Menampilkan pesan jika hasil pencarian kosong", async () => {
    faqAPI.fetchNotes.mockResolvedValueOnce([
      { id: 1, pertanyaan: "Apa itu produk A?", jawaban: "Produk A adalah ..." },
    ]);

    render(<FAQPage />);

    await waitFor(() => {
      expect(screen.getByText(/apa itu produk a/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/ketik pertanyaan anda/i), {
      target: { value: "tidak ada" },
    });

    await waitFor(() => {
      expect(
        screen.getByText(/tidak ada pertanyaan yang cocok/i)
      ).toBeInTheDocument();
    });
  });
});
