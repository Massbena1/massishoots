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
  pin?: string;
  location?: string;
  featured?: boolean;
}

export const GALLERIES: Gallery[] = [
  // Ajoute tes galeries ici après les avoir créées sur Pixieset
  // Exemple :
  // {
//  id: "socialitemtl-2026",           // identifiant unique (sans espaces)
//     name: "SocialiteMTL",              // nom affiché
//     date: "2026-06-15",                // date de l'événement
//     type: "Événement",                 // Mariage | Événement | Corporate | Portrait
//     photos: 142,                       // nombre de photos
//     cover: "https://...",              // URL de l'image de couverture
//     pixiesetUrl: "https://massishoots.pixieset.com/socialitemtl/",
//     password: true,                    // true = cadenas affiché
//     // featured: true,                    // optionnel — badge ⭐
  // },
];
