interface Image {
  asset: {
    metadata: {
      lqip: string;
    };
  };
}

interface User {
  name: string;
  titles: string[];
  contactDetails: {
    telephone?: string;
    email?: string;
    sessionLink?: url;
    address?: {
      street: string;
      city: string;
      googleMapsLink: url;
    };
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
  name: { fr: string; en: string };
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  slug: { fr: { current: string }; en: { current: string } };

  seo: Seo;
}
