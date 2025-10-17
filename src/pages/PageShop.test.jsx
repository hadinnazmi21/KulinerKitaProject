import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageShop from "./PageShop";
import { produkAPI } from "../services/produkAPI";

// 🔹 Mock semua komponen eksternal biar tidak render UI sebenarnya
jest.mock("../components/Header", () => () => <div data-testid="header" />);
jest.mock("../components/Footer", () => () => <div data-testid="footer" />);
jest.mock("../components/ProductCard", () => (props) => (
  <div data-testid="product-card">{props.name}</div>
));

// 🔹 Mock API produk
jest.mock("../services/produkAPI", () => ({
  produkAPI: {
    fetchNotes: jest.fn(),
  },
}));

// 🔹 Matikan console.error agar log error test tidak ganggu
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("PageShop", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Render judul halaman dan komponen utama", async () => {
    produkAPI.fetchNotes.mockResolvedValueOnce([]); // data kosong
    render(
      <MemoryRouter>
        <PageShop />
      </MemoryRouter>
    );

    expect(screen.getByText(/semua produk kuliner/i)).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    await waitFor(() => {
      expect(produkAPI.fetchNotes).toHaveBeenCalled();
    });
  });

  test("Menampilkan pesan error jika API gagal", async () => {
    produkAPI.fetchNotes.mockRejectedValueOnce(new Error("Network error"));
    render(
      <MemoryRouter>
        <PageShop />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/gagal mengambil data produk/i)
      ).toBeInTheDocument();
    });
  });

  test("Menampilkan produk ketika data berhasil diambil", async () => {
    produkAPI.fetchNotes.mockResolvedValueOnce([
      { id: 1, nama: "Nasi Goreng", harga: 15000, deskripsi: "Lezat", foto: "/img.jpg" },
      { id: 2, nama: "Mie Ayam", harga: 12000, deskripsi: "Enak", foto: "/img2.jpg" },
    ]);

    render(
      <MemoryRouter>
        <PageShop />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(2);
      expect(screen.getByText(/nasi goreng/i)).toBeInTheDocument();
    });
  });

  test("Filter produk berdasarkan input pencarian", async () => {
    produkAPI.fetchNotes.mockResolvedValueOnce([
      { id: 1, nama: "Nasi Goreng", harga: 15000, deskripsi: "Lezat" },
      { id: 2, nama: "Bakso", harga: 12000, deskripsi: "Kenyal" },
    ]);

    render(
      <MemoryRouter>
        <PageShop />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(2);
    });

    // 🔹 Ketik di input pencarian
    fireEvent.change(screen.getByPlaceholderText(/cari produk/i), {
      target: { value: "nasi" },
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
      expect(screen.getByText(/nasi goreng/i)).toBeInTheDocument();
    });
  });
});
