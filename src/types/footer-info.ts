interface IFooterLink {
    titleLinks: string;
    link: string;
}

interface IFooterSection{
    titleSection: string;
    links: IFooterLink[];
}

interface IFooterContactItem{
    title: string
    icon: React.ReactChild
}

export interface IFooterInfo {
    titleDescription: string
    sections: IFooterSection[]
    contactsection: IFooterContactItem[]
}