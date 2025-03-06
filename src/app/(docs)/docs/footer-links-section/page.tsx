import { FooterLinksSection } from "@/components/app";

export default function Page() {
  return (
    <div>
      <h1>Footer Links Section</h1>
      <FooterLinksSection
        aplicationsLinks={[
          {
            id: 1,
            title: "Aplicacion 1",
            description: "Descripcion de la aplicacion 1",
            icon: "/brands/logo-1.webp",
            url: "https://www.google.com"
          },
          {
            id: 2,
            title: "Aplicacion 2",
            description: "Descripcion de la aplicacion 2",
            icon: "/brands/logo-2.webp",
            url: "https://www.google.com"
          },
          {
            id: 3,
            title: "Aplicacion 3",
            description: "Descripcion de la aplicacion 3",
            icon: "/brands/logo-3.webp",
            url: "https://www.google.com"
          },
          {
            id: 4,
            title: "Aplicacion 4",
            description: "Descripcion de la aplicacion 4",
            icon: "/brands/logo-4.webp",
            url: "https://www.google.com"
          },
        ]}
        socialLinks={true}
        />
    </div>
  )
}