import { NextRequest, NextResponse } from "next/server";

const IDEAS: Record<string, Record<string, string[]>> = {
  restaurant: {
    families:      ["POV : tu prépares notre plat #1 pour 500 familles ce mois-ci — en cuisine en 30 secondes", "On a demandé à 10 clients leur plat préféré — leurs réponses vont te surprendre", "Menu du vendredi VS menu du dimanche — tu votes lequel ?"],
    entrepreneurs: ["Le moment où on a réalisé que notre restaurant était rentable — histoire vraie", "3 erreurs qu'on a faites en ouvrant notre restaurant (pour que tu ne les fasses pas)", "Une journée dans la vie d'un restaurateur à Montréal — de 6h à minuit"],
    young:         ["Notre plat le plus commandé sur Uber Eats — tu l'aurais deviné ?", "On refait notre menu — et on te demande ton avis", "Ambiance vendredi soir au [nom resto] — les coulisses que tu ne vois jamais"],
    b2b:           ["Comment on gère 200 couverts par soir sans perdre la qualité", "Notre système de formation équipe en 60 secondes — la méthode qui a tout changé", "Partenariat restaurant + entreprise : comment ça marche chez nous"],
    women:         ["Notre nouvelle collection de cocktails — testés par nos clientes", "Brunch du dimanche : les 5 plats qui font toujours sold out", "Les coulisses de notre décoration — comment on crée l'ambiance parfaite"],
  },
  mode: {
    women:         ["Tenue de bureau VS tenue de soirée — 1 seule pièce, 2 looks", "Ce que les femmes portent vraiment à Montréal en ce moment — rue Sainte-Catherine", "3 façons de styliser la même veste pour 3 occasions différentes"],
    young:         ["Outfit check : combien ça coûte vraiment ce look ?", "On a testé la tendance [tendance] — verdict honnête", "Get ready with me pour un événement networking à Montréal"],
    entrepreneurs: ["Comment j'habille ma marque personnelle — les 5 pièces essentielles", "Business casual en 2026 — ce qui marche vraiment pour les entrepreneurs", "Investir dans sa garde-robe professionnelle : ROI réel ou mythe ?"],
    families:      ["Looks familiaux coordonnés — sans avoir l'air d'un catalogue", "Back to school Montréal — notre sélection budget moins de 100$", "3 tenues enfants qui durent toute la journée (école + activités + soir)"],
    b2b:           ["Comment votre image vestimentaire impacte vos ventes — étude de cas", "Dress code corporate en 2026 — ce qui a changé depuis le COVID", "Personal branding visuel : pourquoi vos vêtements parlent avant vous"],
  },
  tech: {
    entrepreneurs: ["J'ai automatisé 80% de mes tâches répétitives — voici comment", "L'outil IA que j'aurais voulu connaître en commençant mon business", "De 0 à 10 000$ MRR — les outils tech qu'on a utilisés"],
    b2b:           ["Notre stack tech complète pour gérer 50+ clients sans employé supplémentaire", "Comment on a réduit nos coûts opérationnels de 40% avec ces outils", "API, no-code, IA : ce qu'on utilise vraiment en 2026"],
    young:         ["L'app que tout le monde utilise mais personne ne mentionne", "J'ai testé [outil IA] pendant 30 jours — résultats honnêtes", "Setup de travail minimaliste qui me rend 3x plus productif"],
    women:         ["Les outils tech qui m'ont permis de lancer mon business seule", "Comment j'utilise l'IA pour créer 30 jours de contenu en 2h", "Tech pour entrepreneurs — sans avoir besoin d'être développeuse"],
    families:      ["Les apps familiales qui nous ont changé la vie — testées et approuvées", "Écran temps : comment on gère ça chez nous avec les enfants", "Home automation pour famille occupée — ce qui vaut vraiment la peine"],
  },
  immobilier: {
    b2b:           ["Comment j'ai vendu 3 propriétés en un mois sans publicité payante", "Les 5 erreurs qui font rater une vente — conseils d'un agent qui a vu trop de dossiers", "Marché immobilier Montréal 2026 — ce que les chiffres disent vraiment"],
    entrepreneurs: ["J'ai investi dans mon premier immeuble à revenu — voici ce que j'aurais voulu savoir", "ROI immobilier VS bourse — comparaison honnête pour 2026", "Comment financer un duplex quand on est travailleur autonome"],
    families:      ["Acheter VS louer à Montréal en 2026 — on fait les calculs", "Notre recherche de maison familiale — 6 mois de visites en 60 secondes", "Les quartiers familiaux de Montréal — comparatif honnête"],
    young:         ["Premier achat immobilier à 28 ans — ce que personne ne t'explique", "Comment j'ai économisé ma mise de fonds en 18 mois", "Condo VS plex — lequel choisir quand on commence ?"],
    women:         ["Investir dans l'immobilier seule — mon expérience honnête", "Comment j'ai négocié 20 000$ de moins sur ma première propriété", "Property management au féminin — les réalités que personne ne montre"],
  },
  wellness: {
    women:         ["Ma routine matinale réelle — pas celle que je montre sur Instagram", "J'ai testé [pratique bien-être] pendant 30 jours — résultats vrais", "Burn out à 30 ans — comment j'en suis sorti et ce qui a vraiment aidé"],
    young:         ["Santé mentale et réseaux sociaux — mon bilan honnête", "La seule habitude que j'ai gardée depuis 2 ans — et ce qu'elle a changé", "Budget bien-être mensuel — comment j'optimise sans me ruiner"],
    entrepreneurs: ["Haute performance sans brûler : ma méthode pour entrepreneurs débordés", "Comment j'ai intégré le sport dans un agenda de CEO chargé", "Mental health en business — on en parle enfin ouvertement"],
    families:      ["Repas familiaux sains en moins de 30 minutes — nos recettes du week-end", "Sport en famille à Montréal — nos spots préférés gratuits", "Déconnecter le weekend — notre règle familiale qui a tout changé"],
    b2b:           ["Bien-être au travail : ROI réel pour les entreprises — les chiffres", "Comment on a réduit l'absentéisme de 30% avec un programme bien-être", "Employee wellness en 2026 — ce que vos équipes attendent vraiment"],
  },
  coach: {
    entrepreneurs: ["Le conseil que j'aurais voulu recevoir avant de lancer mon business", "3 croyances limitantes qui m'empêchaient de scaler — et comment je les ai brisées", "De salarié à entrepreneur : la vraie chronologie (pas la version Instagram)"],
    women:         ["Comment j'ai appris à demander ce que je vaux — sans culpabilité", "Leadership féminin en 2026 — ce qui a vraiment changé (et ce qui n'a pas bougé)", "La conversation que j'ai avec toutes mes clientes en session 1"],
    young:         ["À 25 ans, je pensais avoir raté ma vie — voici ce qui a tout changé", "Le framework que j'utilise pour prendre des décisions difficiles en 30 secondes", "Mes 3 plus grosses erreurs de jeune entrepreneur — et ce qu'elles m'ont appris"],
    b2b:           ["Comment coacher une équipe de 50 personnes avec 0 budget formation", "Leadership VS management — la distinction que peu de dirigeants comprennent", "Les 3 questions que je pose à chaque client en session stratégique"],
    families:      ["Parentalité consciente et business — comment j'équilibre les deux", "Élever des enfants entrepreneurs — les valeurs qu'on transmet sans s'en rendre compte", "Famille et ambition : est-ce vraiment compatible ? Mon expérience"],
  },
  evenement: {
    b2b:           ["Les coulisses de notre gala de 500 personnes — de J-90 à J0", "Comment on gère la logistique d'un événement corporate sans stress", "3 détails qui transforment un événement ordinaire en expérience mémorable"],
    entrepreneurs: ["J'ai organisé mon premier événement networking — 150 personnes, voici ce que j'ai appris", "Lancement de produit en 2026 — ce qui fonctionne vraiment pour créer du buzz", "Budget événement serré : comment maximiser l'impact sans maximiser les coûts"],
    young:         ["Backstage de notre soirée du mois — tout ce que vous n'avez pas vu", "Comment on choisit nos DJs et performers — le processus complet", "De l'idée à la salle pleine — notre processus événementiel en 60 secondes"],
    women:         ["Les femmes qui font bouger Montréal — portraits de notre dernier événement", "Networking au féminin — comment créer des connexions authentiques", "Notre soirée de lancement — les coulisses et les moments non filtrés"],
    families:      ["Organiser un événement family-friendly à Montréal — notre checklist", "Les activités qui engagent vraiment les enfants lors d'un événement", "Gestion du bruit, espace enfants, allergies : notre protocole familial"],
  },
  corporate: {
    b2b:           ["Nos 3 métriques de performance non-négociables — et comment on les suit", "Comment on a doublé notre taux de rétention clients en 6 mois", "Culture d'entreprise en 2026 — ce que les talents regardent vraiment"],
    entrepreneurs: ["Ce que j'ai appris en passant de solopreneur à avoir une équipe", "Déléguer sans perdre le contrôle — notre système en 3 étapes", "Pourquoi notre premier employé a failli couler notre business — et ce qu'on a changé"],
    young:         ["Une journée dans notre bureau — la vraie version, pas la version LinkedIn", "Comment on recrute chez nous — ce qu'on cherche vraiment", "Notre politique remote work — ce qui fonctionne et ce qui a planté"],
    women:         ["Leadership féminin dans notre entreprise — chiffres et réalités", "Comment on a créé un environnement de travail inclusif — étapes concrètes", "Nos femmes leaders parlent — portraits et parcours inspirants"],
    families:      ["Conciliation travail-famille chez nous — ce qu'on offre vraiment", "Nos employés parents parlent — flexibilité et performance", "Journée famille à l'entreprise — les coulisses de notre culture"],
  },
};

const TARGET_MAP: Record<string, string> = {
  families: "Familles",
  entrepreneurs: "Entrepreneurs",
  young: "Jeunes adultes 18-30",
  b2b: "Professionnels B2B",
  women: "Femmes 25-45 ans",
};

export async function POST(req: NextRequest) {
  const { secteur, cible } = await req.json();

  const sectorIdeas = IDEAS[secteur];
  if (!sectorIdeas) return NextResponse.json({ error: "Secteur non trouvé" }, { status: 400 });

  const ideas = sectorIdeas[cible] ?? sectorIdeas[Object.keys(sectorIdeas)[0]];

  return NextResponse.json({
    ideas,
    secteurLabel: secteur,
    cibleLabel: TARGET_MAP[cible] ?? cible,
  });
}
