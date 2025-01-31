interface Image {
  asset: {
    metadata: {
      lqip: string;
    };
  };
}

interface User {
  name: string;
  titles: { fr: string; en: string }[];
  contactDetails: {
    address?: {
      street: string;
      city: string;
      googleMapsLink?: string;
    };
    telephone?: string;
    email?: string;
    sessionLink?: string;
  };
  logo: Image;
}

interface Home {
  title: {
    fr: string;
    en: string;
  };
  subtitle?: {
    fr: string;
    en: string;
  };

  text: {
    fr: any;
    en: any;
  };
  audio: {
    asset: { url: string; size: number };
  };
  audioDescription: any;
  video: {
    asset: {
      url: string;
    };
  };

  image: Image;

  seo: {
    pageTitle: {
      fr: string;
      en: string;
    };
    metaDescription: {
      fr: string;
      en: string;
    };
  };
}

interface Menu {
  _id: string;
  name: { fr: string; en: string };
  slug: { fr: { current: string }; en: { current: string } };
}

interface Menus {
  headerMenu: Menu[];
  footerMenu: Menu[];
}

interface Seo {
  pageTitle: {
    fr: string;
    en: string;
  };
  metaDescription: {
    fr: string;
    en: string;
  };
}

interface Page {
  _id: string;
  name: { fr: string; en: string };
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  slug: { fr: { current: string }; en: { current: string } };
  content: (
    | TextSection
    | LinkButton
    | ImageSection
    | ButtonSection
    | KeyWordsSection
  )[];
  seo: Seo;
}

interface TextSection {
  _type: "textSection";
  _key: string;
  title: { fr: string; en: string };
  isBannered?: boolean;
  text: { fr: any; en: any };
  image: Image;
}

interface ImageSection {
  _type: "imageSection";
  _key: string;
  image: Image;
  alt: { fr: string; en: string };
  legend: { fr: string; en: string };
}

interface ButtonSection {
  _type: "linkButton";
  _key: string;
  title?: { fr: string; en: string };
  buttons?: {
    _key: string;
    label: { fr: string; en: string };
    type: "url" | "email" | "tel";
    href: string;
    level: "primary" | "secondary" | "tertiary";
  }[];
}

interface LinkButton {
  _type: "linkButton";
  _key: string;
  label: { fr: string; en: string };
  type: "url" | "email" | "tel";

  level: "primary" | "secondary" | "tertiary";
  href: string;
}

interface FAQ {
  _id: string;
  question: { fr: string; en: string };
  answer: { fr: any; en: any };
}

interface TypedObject {
  _type: string;
  [key: string]: any;
}

interface KeywordsSection {
  _type: "keywordsSection";
  _key: string;
  title: { fr: string; en: string };
  keywords: { _key: string; fr: string; en: string }[];
}
