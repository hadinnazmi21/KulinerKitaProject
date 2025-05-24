import ErrorComponent from "../components/ErrorComponent";

export default function ErrorPage400() {
  return (
    <div>
      <ErrorComponent
        description="Oops! Permintaan Tidak Bisa Diproses."
        image="/img/Error/400.png"
      />
    </div>
  );
}
