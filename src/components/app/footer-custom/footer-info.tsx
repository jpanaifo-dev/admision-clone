import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { FooterSimple } from "./footer-simple"
import { IFooterInfo } from "@/types"

interface FooterInfoProps {
    footerInfo: IFooterInfo
}

export const FooterInfo = (props: FooterInfoProps) => {
    const { footerInfo } = props
    return (
        <main className="bg-primary-800 w-full">
            <footer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-6 md:gap-4">
                {/* Sección 1: Logo y Descripción */}
                <section className="flex flex-col gap-3 p-2 items-center md:items-start text-center md:text-left w-full">
                    <div className="flex items-center gap-2">
                        <div>
                            <img src="/brands/escudo-epg.webp" alt="logo epg" className="w-10 h-16" />
                        </div>
                        <div className="text-xs text-white">
                            <p>ESCUELA DE</p>
                            <p>POSTGRADO UNAP</p>
                        </div>
                    </div>
                    <p className="w-full md:w-64 text-xs text-default-400 line-clamp-4">
                        {footerInfo.titleDescription}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <Facebook strokeWidth={1.5} width={18} className="stroke-white hover:stroke-primary-800" />
                        <Youtube strokeWidth={1.5} width={18} className="stroke-white hover:stroke-primary-800" />
                        <Linkedin strokeWidth={1.5} width={18} className="stroke-white hover:stroke-primary-800" />
                        <Instagram strokeWidth={1.5} width={18} className="stroke-white hover:stroke-primary-800" />
                    </div>
                </section>

                {/* Sección 2: Enlaces */}
                <section className="flex flex-wrap justify-center md:justify-between p-2 w-full">
                    {footerInfo.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="flex flex-col gap-2 w-1/2 sm:w-auto">
                            {/* Título de la sección */}
                            <p className="font-semibold text-white text-xs">{section.titleSection}</p>

                            {/* Enlaces de la sección */}
                            {section.links.map((item, index) => (
                                <div key={index} className="text-xs">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        <p className="text-default-400">{item.titleLinks}</p>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ))}
                </section>

                {/* Sección 3: Información de Contacto */}
                <section className="grid grid-cols-1 md:grid-cols-2 p-2 w-full">
                    <div className="md:col-start-2 text-xs w-full">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-white">Contacto</p>
                            {footerInfo.contactsection.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <p>{item.icon}</p>
                                    <p className="text-default-400">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </footer>
            <FooterSimple />
        </main>
    )
}
