import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CareerPage from "./CareerPage";

// Mock komponen Header, Footer, dan CareerCard biar test fokus ke CareerPage
jest.mock("../components/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("../components/Footer", () => () => <div data-testid="footer">Footer</div>);
jest.mock("../components/CareerCard", () => ({ title }) => (
  <div data-testid="career-card">{title}</div>
));

// Mock fetch agar tidak benar-benar request ke server
global.fetch = jest.fn();

describe("CareerPage Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("Render judul utama dengan benar", () => {
    render(<CareerPage />);
    expect(
      screen.getByText("Lowongan di Kuliner Kita")
    ).toBeInTheDocument();
  });

  test("Render Header dan Footer", () => {
    render(<CareerPage />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("Menampilkan teks jika tidak ada lowongan", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    render(<CareerPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Tidak ada lowongan yang tersedia saat ini.")
      ).toBeInTheDocument();
    });
  });

  test("Fetch dan render CareerCard jika data tersedia", async () => {
    const mockData = [
      {
        id: 1,
        title: "Frontend Developer",
        location: "Jakarta",
        type: "Full-Time",
        excerpt: "Bertanggung jawab mengembangkan UI aplikasi web.",
        qualifications: ["React", "JavaScript"],
      },
      {
        id: 2,
        title: "Backend Developer",
        location: "Bandung",
        type: "Remote",
        excerpt: "Membangun API dan mengelola database.",
        qualifications: ["Node.js", "MongoDB"],
      },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => mockData,
    });

    render(<CareerPage />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("career-card");
      expect(cards).toHaveLength(2);
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
      expect(screen.getByText("Backend Developer")).toBeInTheDocument();
    });
  });
});
