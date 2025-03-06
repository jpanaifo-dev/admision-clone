import { Footer, TabSection } from '@/components/app'
import { Metadata } from 'next'
import { HeaderSection } from '@/components/app'

export const metadata: Metadata = {
    title: 'Footer',
    description: 'Componente de pie de pagina',
}

export default function Page() {
    return (
        <main>
            <div className='flex flex-col gap-4'>
                <section>
                    <HeaderSection
                        title="Footer - Info"
                        description="Footer para informacion precisa del la institutcion."
                        showAddButton={false}
                        showRefreshButton={false}
                        showExportButton={false}
                    />
                    <TabSection
                        size="4xl"
                        code={`
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
                    `}
                    >
                        <Footer varaint='info' />
                    </TabSection>
                </section>
                <section>
                    <HeaderSection
                        title="Footer - Links Section"
                        description="Footer para rennvio a distintas aplicaciones o direcciones web."
                        showAddButton={false}
                        showRefreshButton={false}
                        showExportButton={false}
                    />
                    <TabSection
                        size='4xl'
                        code={`
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
                        `}
                    >
                        <Footer varaint='sectionLink' />
                    </TabSection>
                </section>
                <section>
                    <HeaderSection
                        title="Footer - Simple"
                        description="Footer simple "
                        showAddButton={false}
                        showRefreshButton={false}
                        showExportButton={false}
                    />
                    <TabSection
                        size='4xl'
                        code={`import { FooterSimple } from '@/components/app'
                    
                    export default function Page() {
                      return (
                        <div>
                            <FooterSimple/>
                        </div>
                      )
                    }`}
                    >
                        <Footer varaint='simple' />
                    </TabSection>
                </section>
            </div>
        </main>
    )
}