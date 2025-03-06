import { IFooterInfo } from "@/types";
import { FooterInfo } from "./footer-custom/footer-info"
import { FooterLinksSection } from "./footer-custom/footer-links-section"
import { FooterSimple } from "./footer-custom/footer-simple"
import { Mail, Phone } from "lucide-react";


interface IFooterDesingprops {
    varaint: 'simple' | 'info' | 'sectionLink'
}

const footerInfo: IFooterInfo = {
    titleDescription: "Descripción de la Escuela de Postgrado UNAP",
    sections: [
        {          
            titleSection: "Redes Sociales",
            links: [
                { titleLinks: "YouTube", link: "https://youtube.com" },
                { titleLinks: "Facebook", link: "https://facebook.com" },
            ],
        },
        {
            titleSection: "Lista",
            links: [
                { titleLinks: "Correo", link: "mailto:info@example.com" },
                { titleLinks: "LinkedIn", link: "https://linkedin.com" },
            ],
        },
        {
          titleSection: "Lista",
            links: [
                { titleLinks: "Correo", link: "mailto:info@example.com" },
                { titleLinks: "LinkedIn", link: "https://linkedin.com" },
            ],
        }
    ],
    contactsection: [
      {
        title: "Correo",
        icon: <Mail strokeWidth={1.5} width={18} className="stroke-default-400 hover:stroke-primary-800"/>
      },
      {
        title: "Telefono",
        icon: <Phone strokeWidth={1.5} width={18} className="stroke-default-400 hover:stroke-primary-800"/>
      }
    ]
};

export const Footer = (props: IFooterDesingprops) => {
    const { varaint } = props
    return (
        <div>
            {varaint === 'simple' && <FooterSimple />}
            {varaint === 'info' && <FooterInfo footerInfo={footerInfo}/>}
            {varaint === 'sectionLink' && <FooterLinksSection
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
            />}
        </div>
    )
}