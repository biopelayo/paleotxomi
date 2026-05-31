import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <LogoMark size={88} animated />
        </div>
        <p className="kicker mb-2">404</p>
        <h1 className="headline">Página no encontrada</h1>
        <div className="h-divider mx-auto" />
        <p className="lead mt-4 mx-auto">
          La página que buscas no existe o ha cambiado de dirección. Vuelve al inicio o usa el menú.
        </p>
        <Link href="/" className="btn btn-primary mt-6 inline-flex">Volver al inicio</Link>
      </div>
    </section>
  );
}
