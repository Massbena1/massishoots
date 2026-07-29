export interface BrandingProject {
  id: string;
  client: string;
  slug: string;
  description: string;
  cover: string;
  services: string[];
  objectif: string;
  production: string;
  utilisation: string;
  testimonial: { quote: string; name: string; role: string } | null;
}

export interface EventProject {
  id: string;
  event: string;
  slug: string;
  description: string;
  cover: string;
  aftermovie: string | null;
  deliverables: string[];
}

export const brandingProjects: BrandingProject[] = [
  {
    id: "01",
    client: "Christine Girouard",
    slug: "christine-girouard",
    description: "Transformation complète de l'image Instagram d'une coach immobilière. Photos pro + vidéos face caméra pour un personal branding qui convertit.",
    cover: "/portfolio/brand/1.jpg",
    services: ["Personal Branding", "Photo", "Face Caméra"],
    objectif: "Projeter une image professionnelle qui inspire confiance et attire des courtiers qualifiés.",
    production: "10 photos pro + 8 vidéos face caméra en studio, livrés clés en main.",
    utilisation: "Instagram, LinkedIn, site web personnel.",
    testimonial: {
      quote: "Massi m'a donné une image qui me ressemble vraiment. Depuis, mes clients me reconnaissent partout. +900 abonnés et 10 contrats en 3 mois.",
      name: "Christine Girouard",
      role: "Entrepreneure & Coach immobilier",
    },
  },
  {
    id: "02",
    client: "",
    slug: "branding-02",
    description: "",
    cover: "/portfolio/brand/3.jpg",
    services: ["Personal Branding", "Photo", "Reels"],
    objectif: "",
    production: "",
    utilisation: "",
    testimonial: null,
  },
];

export const eventProjects: EventProject[] = [
  {
    id: "01",
    event: "Couverture Événement Corporate",
    slug: "evenement-corporate",
    description: "Gala de 1 000 personnes — 350 photos retouchées livrées en moins de 24h. Vidéo highlight 60 sec pour les réseaux sociaux.",
    cover: "/portfolio/eventt/1.jpg",
    aftermovie: "/portfolio/videos/event-1.mp4",
    deliverables: [
      "Photographie événementielle",
      "Aftermovie cinématique",
      "Reels verticaux 9:16",
      "Contenu réseaux sociaux",
    ],
  },
  {
    id: "02",
    event: "Événement Networking",
    slug: "evenement-networking",
    description: "Couverture photo et vidéo complète d'un événement networking premium à Montréal.",
    cover: "/portfolio/eventt/4.jpg",
    aftermovie: "/portfolio/videos/event-2.mp4",
    deliverables: [
      "Photographie événementielle",
      "Reels verticaux 9:16",
      "Portraits speakers",
      "Contenu réseaux sociaux",
    ],
  },
];

export const testimonials = [
  {
    quote: "On avait 1 000 personnes à gérer ce soir-là. Massi était partout, discret, et le résultat était prêt le lendemain matin. Impressionnant.",
    name: "Directeur Événements",
    role: "Événementiel Corporate, Montréal",
    avatar: null,
  },
  {
    quote: "Massi m'a donné une image qui me ressemble vraiment. Depuis, mes clients me reconnaissent partout. +900 abonnés et 10 contrats en 3 mois.",
    name: "Christine Girouard",
    role: "Entrepreneure & Coach immobilier",
    avatar: null,
  },
];
