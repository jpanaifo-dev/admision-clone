import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { FooterSimple } from "./footer-simple"
import { IMoreApp } from "@/types/more-apps"

interface FooterLinksSectionProps {
    socialLinks: boolean
    aplicationsLinks: IMoreApp[]
}

export const FooterLinksSection = (props: FooterLinksSectionProps) => {

    const { socialLinks, aplicationsLinks } = props

    return (
        <main className="bg-primary-800">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2 p-2">
                    <div>
                        <img src="/brands/escudo-epg.webp" alt="logo epg" className="w-10 h-16" />
                    </div>
                    <div className="flex flex-col justify-start text-xs text-white">
                        <p>ESCUELA DE</p>
                        <p>POSTGRADO UNAP</p>
                    </div>
                </div>
                <div className="flex text-xs text-white gap-4 p-2">
                    {aplicationsLinks.map((app, index) => (
                        <a
                            key={index}
                            href={app.url}
                            className="group transform scale-100 hover:scale-125 transition-transform duration-300"
                        >
                            <p className="group-hover:mx-2 hover:underline">{app.title}</p>
                        </a>
                    ))}
                </div>
                <div className="flex gap-2 p-2">
                    {socialLinks && (
                        <div className="flex gap-2 p-2">
                            <div className="border-1 border-white rounded-full p-2 text-xs hover:stroke-default-500 hover:bg-default-300 w-10 h-10">
                                <Facebook strokeWidth={1.5} className="stroke-white hover:stroke-primary-800" />
                            </div>
                            <div className="border-1 border-white rounded-full p-2 text-xs hover:stroke-default-500 hover:bg-default-300 w-10 h-10">
                                <Youtube strokeWidth={1.5} className="stroke-white hover:stroke-primary-800" />
                            </div>
                            <div className="border-1 border-white rounded-full p-2 text-xs hover:stroke-default-500 hover:bg-default-300 w-10 h-10">
                                <Linkedin strokeWidth={1.5} className="stroke-white hover:stroke-primary-800" />
                            </div>
                            <div className="border-1 border-white rounded-full p-2 text-xs hover:stroke-default-500 hover:bg-default-300 w-10 h-10">
                                <Instagram strokeWidth={1.5} className="stroke-white hover:stroke-primary-800" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FooterSimple />
        </main>
    )
}