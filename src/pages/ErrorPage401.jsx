import ErrorComponent from "../components/ErrorComponent";

export default function ErrorPage401() {
  return (
    <div>
      <ErrorComponent
        description="Kamu harus login untuk mengakses halaman ini."
        image="/img/Error/401.png"
      />
    </div>
  );
}
