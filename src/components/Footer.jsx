import React from "react";
import FooterComponent from "./FooterComponent"; // atau path sesuai struktur folder kamu
// kalau kamu juga punya navbar

export default function Footer({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
     
      <FooterComponent
        links={{
          products: [
            { label: "Makanan Viral", href: "/produk/viral" },
            { label: "War Makanan", href: "/produk/war" },
          ],
          resources: [
            { label: "Cara Pre-Order", href: "/panduan/preorder" },
            { label: "FAQ", href: "/faq" },
          ],
          support: [
            { label: "Kontak", href: "/kontak" },
            { label: "Kebijakan Privasi", href: "/privacy" },
          ],
        }}
      />
    </div>
  );
}