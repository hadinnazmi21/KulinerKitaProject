import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SimulasiWar from "./SimulasiWar";
import { MemoryRouter } from "react-router-dom";

// Mock Header dan Footer
jest.mock("../components/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("../components/Footer", () => () => <div data-testid="footer">Footer</div>);

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SimulasiWar Component", () => {
  test("Render Header, Footer, dan judul produk", () => {
    render(
      <MemoryRouter>
        <SimulasiWar />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("Coklat Dubai")).toBeInTheDocument();
  });

  test("Update quantity dan total harga sesuai input", () => {
    render(
      <MemoryRouter>
        <SimulasiWar />
      </MemoryRouter>
    );

    const quantityInput = screen.getByLabelText("Jumlah");
    fireEvent.change(quantityInput, { target: { value: "2" } });

    expect(quantityInput.value).toBe("2");
    expect(screen.getByText("Total Harga: Rp300.000")).toBeInTheDocument();
  });

  test("Menggunakan voucher DUBAI75 mengurangi harga", () => {
    render(
      <MemoryRouter>
        <SimulasiWar />
      </MemoryRouter>
    );

    const voucherInput = screen.getByLabelText("Kode Voucher");
    fireEvent.change(voucherInput, { target: { value: "DUBAI75" } });

    expect(screen.getByText("Voucher berhasil digunakan! Potongan Rp75.000")).toBeInTheDocument();
    expect(screen.getByText("Total Harga: Rp75.000")).toBeInTheDocument();
  });

  test("Tombol Beli Sekarang memanggil navigate dengan state yang benar", () => {
    render(
      <MemoryRouter>
        <SimulasiWar />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("Nama Pembeli");
    const addressInput = screen.getByLabelText("Alamat Pengiriman");

    fireEvent.change(nameInput, { target: { value: "Ruthiana" } });
    fireEvent.change(addressInput, { target: { value: "Pekanbaru" } });

    const buyButton = screen.getByText("Beli Sekarang");
    fireEvent.click(buyButton);

    expect(mockNavigate).toHaveBeenCalledWith("/CheckoutPage", expect.objectContaining({
      state: expect.objectContaining({
        name: "Ruthiana",
        address: "Pekanbaru",
        product: expect.objectContaining({ name: "Coklat Dubai" }),
      }),
    }));
  });

  test("Countdown timer menampilkan detik awal", () => {
    render(
      <MemoryRouter>
        <SimulasiWar />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Hari/).textContent).toMatch(/\d+/);
    expect(screen.getByLabelText(/Jam/).textContent).toMatch(/\d+/);
    expect(screen.getByLabelText(/Menit/).textContent).toMatch(/\d+/);
    expect(screen.getByLabelText(/Detik/).textContent).toMatch(/\d+/);
  });
});
