import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex flex-col">
      {/* Bisa tambahkan Header di sini jika ada */}

      {/* Konten utama */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Bisa tambahkan Footer di sini jika ada */}
    </div>
  );
}