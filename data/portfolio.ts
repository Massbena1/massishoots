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
  featured?: boolean;
  photoFolder?: string; // sous-dossier dans /public/portfolio/eventt/
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
  // ── VEDETTE ────────────────────────────────────────────────────────────────
  {
    id: "01",
    featured: true,
    event: "ESTA 2026",
    slug: "esta-2026",
    description: "L'Entrepreneuriat Sous Tous Ses Angles — couverture complète du Palais des Congrès : conférences, networking et moments forts en photo et vidéo.",
    cover: "/portfolio/eventt/esta/DSC02482.jpg",
    photoFolder: "esta",
    aftermovie: null,
    aftermovieUid: "1fd3e6260746d7ad585dd8079cf9ecca",
    deliverables: [
      "Photographie événementielle",
      "Aftermovie cinématique",
      "Reels verticaux 9:16",
      "Portraits intervenants",
    ],
  },
  {
    id: "02",
    featured: true,
    event: "Gala InfluenceCréation",
    slug: "gala-influencecreation",
    description: "Gala des créateurs de contenu du Québec à Place Bell — couverture photo et vidéo complète, de la montée des marches à la remise des prix.",
    cover: "/portfolio/eventt/gala/DSC08904.jpg",
    photoFolder: "gala",
    aftermovie: null,
    aftermovieUid: "2964c3cd1fdbe5891e526055a2a9411a",
    deliverables: [
      "Photographie événementielle",
      "Aftermovie cinématique",
      "Reels verticaux 9:16",
      "Contenu réseaux sociaux",
    ],
  },
  {
    id: "03",
    featured: true,
    event: "Lancement JPM 2.0",
    slug: "lancement-jpm-2",
    description: "Jean-Paul Mouradian — 30 ans de carrière célébrés à l'Hôtel W. Soirée de lancement prestige avec invités VIP, discours et performances live.",
    cover: "/portfolio/eventt/jp/DSC00085.jpg",
    photoFolder: "jp",
    aftermovie: null,
    aftermovieUid: "347687580f25242c22c564d9ef61d0c5",
    deliverables: [
      "Photographie événementielle",
      "Aftermovie cinématique",
      "Reels verticaux 9:16",
      "Contenu réseaux sociaux",
    ],
  },
  {
    id: "04",
    featured: true,
    event: "Ari Chiasson",
    slug: "ari-chiasson",
    description: "Couverture photo et vidéo d'un événement privé — élégance, détails et atmosphère exclusive.",
    cover: "/portfolio/eventt/ariane/DSC08814.jpg",
    photoFolder: "ariane",
    aftermovie: null,
    aftermovieUid: "341dda698d4fb60a5ccb2d2b8a69bd22",
    deliverables: [
      "Photographie événementielle",
      "Aftermovie cinématique",
      "Reels verticaux 9:16",
      "Contenu réseaux sociaux",
    ],
  },
  // ── AUTRES ─────────────────────────────────────────────────────────────────
  {
    id: "05",
    featured: false,
    event: "Événement Networking",
    slug: "evenement-networking",
    description: "Couverture photo et vidéo complète d'un événement networking premium à Montréal.",
    cover: "/portfolio/eventt/2.jpg",
    aftermovie: null,
    aftermovieUid: "e1d4f7a4c6966b5ed494f888267fe0df",
    deliverables: [
      "Photographie événementielle",
      "Reels verticaux 9:16",
      "Portraits speakers",
    ],
  },
  {
    id: "06",
    featured: false,
    event: "Couverture Événement Corporate",
    slug: "evenement-corporate",
    description: "Gala corporate — photos retouchées et highlights vidéo livrés rapidement.",
    cover: "/portfolio/eventt/3.jpg",
    aftermovie: null,
    aftermovieUid: "8108d921112c9c96888a9ea8bb82cac1",
    deliverables: [
      "Photographie événementielle",
      "Aftermovie cinématique",
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
