export interface BrandingClient {
  slug: string;
  client: string;
  role: string;
  description: string;
  instagram: string;
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
  aftermovieUid?: string;
  deliverables: string[];
}

// Un slug vide ou client vide = non affiché publiquement
export const brandingClients: BrandingClient[] = [
  {
    slug: "christine",
    client: "Christine Girouard",
    role: "Coach de courtiers immobiliers",
    description: "Entrepreneuse | 10+ ans d'expérience | 441 M$ en transactions | 900+ clients accompagnés en immobilier.",
    instagram: "@christinegirouard777",
    services: ["Personal Branding", "Photo", "Face Caméra"],
    testimonial: {
      quote: "Massi m'a donné une image qui me ressemble vraiment. Depuis, mes clients me reconnaissent partout. +900 abonnés et 10 contrats en 3 mois.",
      name: "Christine Girouard",
      role: "Coach de courtiers immobiliers",
    },
  },
  {
    slug: "Andrea",
    client: "Andrea Soueidan",
    role: "Concierge & Events",
    description: "Altitude Connections — Concierge, événements, mariages & Members Club Services. Canadian Choice Award Winner 2026.",
    instagram: "@altitudeconnections_concierge",
    services: ["Personal Branding", "Face Caméra", "Photo"],
    testimonial: {
      quote: "Massi a parfaitement capté l'image premium qu'on voulait projeter. Nos clients voient maintenant Altitude Connections comme la référence à Montréal.",
      name: "Andrea Soueidan",
      role: "Concierge & Events",
    },
  },
  {
    slug: "jessica",
    client: "Jessica Harnois",
    role: "Sommelière & Entrepreneuse",
    description: "Sommelière, entrepreneuse & figure publique. Fondatrice de @vinsbu et du Club de vins JH. Productions Jessica Harnois.",
    instagram: "@jessica_harnois",
    services: ["Personal Branding", "Photo"],
    testimonial: {
      quote: "Massi comprend l'image d'une personnalité publique. Chaque photo reflète mon univers — le vin, l'élégance, l'authenticité. Exactement ce que je voulais.",
      name: "Jessica Harnois",
      role: "Sommelière & Figure publique",
    },
  },
  {
    slug: "laura",
    client: "Laura Saad",
    role: "Conseillère en sécurité financière",
    description: "B.A.A. | Protections, placements & stratégies avancées. Conseillère chez iA Groupe Financier.",
    instagram: "@_laura.saad",
    services: ["Personal Branding", "Face Caméra", "Photo"],
    testimonial: {
      quote: "Professionnelle, à l'écoute, et un résultat qui dépasse mes attentes. Mes prospects me font confiance avant même qu'on se parle.",
      name: "Laura Saad",
      role: "Conseillère en sécurité financière",
    },
  },
  {
    slug: "stephanie ",
    client: "Stéphanie",
    role: "Entrepreneuse & Fondatrice",
    description: "Fondatrice @ Quantum Lead RE — systèmes de vente, lead gen & scale. $26M+ GCI | 10 ans d'expérience ISA.",
    instagram: "@socialitemtl",
    services: ["Personal Branding", "Face Caméra", "Photo"],
    testimonial: {
      quote: "Le contenu qu'on a créé ensemble a transformé ma présence en ligne. Mes leads qualifiés ont doublé en 60 jours.",
      name: "Stéphanie",
      role: "Fondatrice, Quantum Lead RE",
    },
  },
];

export const eventProjects: EventProject[] = [
  {
    id: "01",
    event: "Couverture Événement Corporate",
    slug: "evenement-corporate",
    description: "Gala de 1 000 personnes — 350 photos retouchées livrées en moins de 24h. Vidéo highlight 60 sec pour les réseaux sociaux.",
    cover: "/portfolio/eventt/1.jpg",
    aftermovie: null,
    aftermovieUid: "63a449c6a64ea4899e6c11b4ae03b4d0",
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
    aftermovie: null,
    aftermovieUid: "1d620937a266de3831fa3bf62e3eb200",
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
