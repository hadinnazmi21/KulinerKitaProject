import React from "react";
import { render, screen } from "@testing-library/react";
import OurTeamPage from "./OurTeamPage";

// 🔹 Mock framer-motion supaya animasi tidak dijalankan
jest.mock("framer-motion", () => ({
  motion: {
    img: (props) => <img {...props} />, // render biasa saja
  },
}));

// 🔹 Mock Header & Footer supaya tidak ganggu hasil test
jest.mock("../components/Header", () => () => <div data-testid="mock-header" />);
jest.mock("../components/Footer", () => () => <div data-testid="mock-footer" />);

describe("OurTeamPage Component", () => {
  test("Render judul utama dengan benar", () => {
    render(<OurTeamPage />);
    expect(
      screen.getByText(/Tim Developer Kuliner Kita/i)
    ).toBeInTheDocument();
  });

  test("Render deskripsi tim developer", () => {
    render(<OurTeamPage />);
    expect(
      screen.getByText(/Kami adalah dua developer dengan visi/i)
    ).toBeInTheDocument();
  });

  test("Render dua anggota tim", () => {
    render(<OurTeamPage />);
    expect(screen.getByText(/Tengku Muhammad Hadin Nazmi/i)).toBeInTheDocument();
    expect(screen.getByText(/Scott Farquhar/i)).toBeInTheDocument();
  });

  test("Render gambar anggota tim", () => {
    render(<OurTeamPage />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "/img/hadin1.jpg");
    expect(images[1]).toHaveAttribute("src", "/img/kela.jpg");
  });

  test("Render Header dan Footer", () => {
    render(<OurTeamPage />);
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });
});
