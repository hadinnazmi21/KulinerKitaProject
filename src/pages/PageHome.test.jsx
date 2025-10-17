import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageHome from "./PageHome";


// 🔹 Mock semua komponen lain supaya fokus ke PageHome aja
jest.mock("../components/Header", () => () => <div>Header</div>);
jest.mock("../components/HeroSectionCompont", () => () => <div>Hero Section</div>);
jest.mock("../components/Footer", () => () => <div>Footer</div>);
jest.mock("../components/ProductCard", () => ({ name }) => <div>Produk: {name}</div>);
jest.mock("../components/FeatureCard", () => ({ title }) => <div>Fitur: {title}</div>);
jest.mock("../components/TestimoniCard", () => ({ nama }) => <div>Testimoni: {nama}</div>);

// 🔹 Mock data dari API
jest.mock("../services/produkAPI", () => ({
  produkAPI: {
    fetchNotes: jest.fn().mockResolvedValue([
      { id: 1, nama: "Nasi Goreng", foto: "img.png", harga: 20000, deskripsi: "Pedas" },
    ]),
  },
}));

jest.mock("../services/testimoniAPI", () => ({
  notesAPI: {
    fetchNotes: jest.fn().mockResolvedValue([
      { id: 1, nama: "Ruth", deskripsi: "Enak banget!", foto: "foto1.png" },
    ]),
  },
}));

// 🔹 Jalankan test
test("Render PageHome dengan teks penting", async () => {
  render(<PageHome />);

  // Pastikan teks utama muncul
  expect(screen.getByText(/produk terlaris/i)).toBeInTheDocument();
  expect(screen.getByText(/testimoni pelanggan/i)).toBeInTheDocument();

  // Tunggu sampai data produk dimuat
  await waitFor(() => {
    expect(screen.getByText(/Nasi Goreng/i)).toBeInTheDocument();
  });

  // Tunggu sampai testimoni muncul
  await waitFor(() => {
    expect(screen.getByText(/Ruth/i)).toBeInTheDocument();
  });
});
