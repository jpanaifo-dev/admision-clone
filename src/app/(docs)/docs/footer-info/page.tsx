import { FooterInfo } from '@/components/app'
import {IFooterInfo} from "@/types"
import { Mail, Phone } from 'lucide-react';

export default function Page() {
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

  return (
    <div>
      <h1>Footer Info</h1>
      <FooterInfo
        footerInfo={footerInfo}
      />
    </div>
  )
}