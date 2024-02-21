export interface IHero {
  header: string;
  subheader: string;
  img: IParsedMedia;
}

export interface ICompanyHero {
  header: string;
  content: string;
  img: IParsedMedia;
  showLink: boolean;
}

export interface IClientTestimonial {
  companyName: string;
  personName: string;
  personRole: string;
  content: string;
  logo: IParsedMedia;
}

export interface ICard {
  header: string;
  subHeader: string;
  imgUrl: string | null;
  imgAltText: string | null;
}

export interface IIndustryApplications {
  header: string;
  subHeader: string;
  cards: ICard[];
}

export interface IExtendedTeam {
  header: string;
  showSection: boolean;
  subHeader: string;
  cards: ICard[];
}

export interface IInvestorQuote {
  personName: string;
  personRole: string;
  companyName: string;
  quote: string;
  companyLogo?: IParsedMedia;
}

export interface IInvestors {
  header: string;
  quotes: IInvestorQuote[];
}

export interface IHomeContactUs {
  header: string;
}

export interface ICompanyContactUs {
  header: string;
}
export interface IEnterpriseDesigned {
  header: string;
  subHeader: string;
}

export interface IGenAIEngineItem {
  title: string;
  description: string;
}

export interface IGenAIEngine {
  header: string;
  subHeader: string;
  items: IGenAIEngineItem[];
}

export interface IStrapiMedia {
  data: {
    attributes: {
      url: string;
      alternativeText: string;
    };
  };
}

export interface IVerticalStack {
  title: string;
  subTitle: string;
  stackItems: IStackItem[];
  defaultStackImage: IParsedMedia;
  stackImages: IParsedMedia[];
}

export interface IStackItem {
  name: string;
  desc: string;
}

export interface IParsedMedia {
  url: string | null;
  alternativeText: string | null;
}

export interface IPhilosophy {
  header: string;
  content: string;
  link: string;
  video: IParsedMedia;
  videoThumbnail: IParsedMedia;
}

export interface IFounder {
  header: string;
  content: string;
  img: IParsedMedia;
}

export interface IFooterIcon {
  link: string;
  icon: IParsedMedia;
}

export interface IFooter {
  icons: IFooterIcon[];
  copyrightNotice: string;
}

export interface IHeader {
  companyLogo: IParsedMedia;
  hotzoneText?: string;
  navLinks?: {
    href: string;
    text: string;
  }[];
}

export interface IValueProp {
  header: string;
  subHeader: string;
  cards: ICard[];
}

export interface ITeam {
  header: string;
  content: string;
  img: IParsedMedia;
}
