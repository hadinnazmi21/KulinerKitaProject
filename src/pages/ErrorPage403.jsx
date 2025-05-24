import ErrorComponent from "../components/ErrorComponent";

export default function ErrorPage403() {
  return (
    <div>
      <ErrorComponent
        description="Akses ditolak. Halaman ini tidak tersedia untuk akunmu."
        image="/img/Error/400.png"
      />
    </div>
  );
}
