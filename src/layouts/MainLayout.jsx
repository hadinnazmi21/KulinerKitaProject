import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import FooterComponent from "../components/FooterComponent";

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-white min-h-screen flex flex-col">
      {/* Bisa tambahkan Header di sini jika ada */}
<Header/>
      {/* Konten utama */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Bisa tambahkan Footer di sini jika ada */}
      <FooterComponent/>
    </div>
  );
}