export interface BrandingClient {
  slug: string;        // nom du dossier dans /public/portfolio/brand/
  client: string;      // nom affiché
  role: string;
  description: string;
  services: string[];
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

// Un slug vide ou client vide = non affiché publiquement
export const brandingClients: BrandingClient[] = [
  {
    slug: "christine",
    client: "Christine Girouard",
    role: "Entrepreneure & Coach immobilier",
    description: "Transformation complète de l'image Instagram d'une coach immobilière. Photos pro + vidéos face caméra pour un personal branding qui convertit.",
    services: ["Personal Branding", "Photo", "Face Caméra"],
    testimonial: {
      quote: "Massi m'a donné une image qui me ressemble vraiment. Depuis, mes clients me reconnaissent partout. +900 abonnés et 10 contrats en 3 mois.",
      name: "Christine Girouard",
      role: "Entrepreneure & Coach immobilier",
    },
  },
  {
    slug: "Andrea",
    client: "Andrea",
    role: "Entrepreneure",
    description: "",
    services: ["Personal Branding", "Photo"],
    testimonial: null,
  },
  {
    slug: "jessica",
    client: "Jessica",
    role: "Entrepreneuse",
    description: "",
    services: ["Personal Branding", "Photo"],
    testimonial: null,
  },
  {
    slug: "laura",
    client: "Laura",
    role: "Entrepreneuse",
    description: "",
    services: ["Personal Branding", "Photo"],
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
  },
  {
    quote: "Massi m'a donné une image qui me ressemble vraiment. Depuis, mes clients me reconnaissent partout. +900 abonnés et 10 contrats en 3 mois.",
    name: "Christine Girouard",
    role: "Entrepreneure & Coach immobilier",
  },
];
