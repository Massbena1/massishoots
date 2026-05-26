export type GalleryType = "Mariage" | "Événement" | "Corporate" | "Portrait" | "Wedding" | "Event";

export interface Gallery {
  id: string;
  name: string;
  date: string;
  type: GalleryType;
  photos: number;
  cover: string;
  pixiesetUrl: string;
  password: boolean;
  featured?: boolean;
}

export const GALLERIES: Gallery[] = [
  // Ajoute tes galeries ici après les avoir créées sur Pixieset
  // Exemple :
  // {
  //   id: "socialitemtl-2026",
  //   name: "SocialiteMTL",
  //   date: "2026-04-20",
  //   type: "Événement",
  //   photos: 142,
  //   cover: "https://massishoots.pixieset.com/...",
  //   pixiesetUrl: "https://massishoots.pixieset.com/socialitemtl/",
  //   password: true,
  //   featured: true,
  // },
];
