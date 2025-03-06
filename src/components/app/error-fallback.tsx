"use client";

import Image from "next/image";
import { Button } from "../ui/button";

export const ErrorFallback = () => {
  return (
    <section className="flex flex-col gap-2 items-center justify-center text-center">
      <Image src="/images/no-data-bro.png" width={600} height={600} alt="Error" />
      <h1 className="text-xl font-semibold text-gray-800">
        Servicio no disponible
      </h1>
      <p className="text-gray-600 max-w-md">
        Lo sentimos, parece que estamos teniendo problemas con nuestro servicio.
        Por favor, intenta nuevamente más tarde.
      </p>
      <Button onClick={() => window.location.reload()}>Recargar página</Button>
    </section>
  );
};
