export interface Booth {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  includes: string[];
  pricing: PricingTier[];
  spaceRequired: string;
  startingPrice: number;
}

export interface PricingTier {
  duration: string;
  price: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "setup" | "technical" | "pricing";
}

export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  rating: number;
  text: string;
  date: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface BookingFormData {
  boothId: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  duration: string;
  location: string;
  addOns: string[];
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  message: string;
}

export interface SiteContent {
  homepage: {
    heroHeadline: string;
    heroSubheadline: string;
    heroCtaText: string;
    statsSection: {
      clients: number;
      googleReviews: number;
      yelpReviews: number;
      yearsInBusiness: number;
    };
    boothSectionTitle: string;
    testimonialSectionTitle: string;
    ctaHeadline: string;
    ctaSubheadline: string;
  };
  about: {
    headline: string;
    founderStory: string;
    mission: string;
    values: string[];
  };
  contact: {
    headline: string;
    subheadline: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
}
