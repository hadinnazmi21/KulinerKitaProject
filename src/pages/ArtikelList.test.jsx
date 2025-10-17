import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ArtikelList from "./ArtikelList";

// 🔹 Mock komponen lain agar tidak mengganggu
jest.mock("../components/Header", () => () => <div data-testid="mock-header" />);
jest.mock("../components/Footer", () => () => <div data-testid="mock-footer" />);
jest.mock("../components/ArtikelCard", () => (props) => (
  <div data-testid="mock-artikelcard">{props.title}</div>
));

// 🔹 Mock fetch bawaan browser
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            judul: "Kuliner Viral di 2025",
            excerpt: "Yuk intip tren kuliner terbaru!",
            kategori: "Berita",
            image_url: "/img/artikel1.png",
            tag1: "viral",
            tag2: "kuliner",
          },
          {
            id: 2,
            judul: "Rahasia Makanan Langka",
            excerpt: "Langka tapi laku keras di pasaran!",
            kategori: "Tips",
            image_url: "/img/artikel2.png",
            tag1: "langka",
            tag2: "unik",
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ArtikelList Component", () => {
  test("Render judul utama dengan benar", () => {
    render(<ArtikelList />);
    expect(screen.getByRole("heading", { name: /daftar artikel/i })).toBeInTheDocument();
  });

  test("Render Header dan Footer", () => {
    render(<ArtikelList />);
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });

  test("Fetch dan tampilkan artikel di ArtikelCard", async () => {
    render(<ArtikelList />);

    // Pastikan fetch dipanggil
    expect(global.fetch).toHaveBeenCalledWith("/data/artikel.json");

    // Tunggu hingga data tampil
    await waitFor(() => {
      const cards = screen.getAllByTestId("mock-artikelcard");
      expect(cards).toHaveLength(2);
      expect(screen.getByText(/Kuliner Viral di 2025/i)).toBeInTheDocument();
      expect(screen.getByText(/Rahasia Makanan Langka/i)).toBeInTheDocument();
    });
  });

  test("Render gambar hero", () => {
    render(<ArtikelList />);
    const heroImg = screen.getByAltText(/War Makanan Hero/i);
    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute("src", "/img/hero/Artikel.png");
  });
});
