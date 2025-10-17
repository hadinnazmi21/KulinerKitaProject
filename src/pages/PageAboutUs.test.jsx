import React from "react";
import { render, screen } from "@testing-library/react";
import PageAboutUs from "./PageAboutUs";

// Mock komponen lain biar gak ganggu tampilan
jest.mock("../components/Header", () => () => (
  <div data-testid="mock-header" />
));
jest.mock("../components/Footer", () => () => (
  <div data-testid="mock-footer" />
));
jest.mock("../components/CardAboutUs", () => (props) => (
  <div data-testid="mock-card">
    <span>{props.title}</span>
  </div>
));

describe("PageAboutUs Component", () => {
test("Render judul utama dengan benar", () => {
  render(<PageAboutUs />);
  expect(
    screen.getByRole("heading", { name: /tentang kuliner kita/i })
  ).toBeInTheDocument();
});


  test("Render bagian 'Siapa Kami?'", () => {
    render(<PageAboutUs />);
    expect(screen.getByText(/Siapa Kami/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Kuliner Kita hadir sebagai solusi/i)
    ).toBeInTheDocument();
  });

  test("Render empat kartu keunggulan (CardAboutUs)", () => {
    render(<PageAboutUs />);
    const cards = screen.getAllByTestId("mock-card");
    expect(cards).toHaveLength(4);
  });

  test("Render Header dan Footer", () => {
    render(<PageAboutUs />);
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });
});
