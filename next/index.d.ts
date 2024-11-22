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
