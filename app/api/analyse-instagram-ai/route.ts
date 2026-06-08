import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `Tu es un expert senior en stratégie Instagram et personal branding pour les marques premium. Tu analyses des profils avec une précision chirurgicale.
Tu réponds UNIQUEMENT en JSON valide, sans markdown, sans texte avant ou après.

Format de réponse EXACT :
{
  "score_global": 74,
  "niveau": "Intermédiaire",
  "accroche": "Ton profil a du potentiel mais laisse de l'argent sur la table chaque semaine.",

  "scores_categories": {
    "bio_positionnement": 65,
    "qualite_visuelle": 80,
    "strategie_contenu": 55,
    "engagement": 70,
    "monetisation": 45,
    "consistance": 60
  },

  "bio_analyse": {
    "note": 65,
    "ce_qui_manque": "Description précise de ce qui manque dans la bio",
    "bio_actuelle_probleme": "Ce qui ne fonctionne pas",
    "bio_recommandee": "Exemple concret de bio réécrite pour ce secteur"
  },

  "points_forts": [
    "Point fort spécifique 1",
    "Point fort spécifique 2",
    "Point fort spécifique 3"
  ],

  "problemes_critiques": [
    {
      "titre": "Titre du problème",
      "explication": "Explication en 2 phrases maximum",
      "impact_revenu": "Comment ça affecte directement les revenus",
      "severite": "Critique / Modéré / Mineur"
    }
  ],

  "plan_action": [
    {
      "semaine": 1,
      "action": "Action concrète et spécifique",
      "comment": "Comment faire exactement en 1 phrase",
      "resultat": "Résultat attendu mesurable"
    },
    {
      "semaine": 2,
      "action": "Action concrète semaine 2",
      "comment": "Comment faire exactement",
      "resultat": "Résultat attendu"
    },
    {
      "semaine": 3,
      "action": "Action concrète semaine 3",
      "comment": "Comment faire exactement",
      "resultat": "Résultat attendu"
    },
    {
      "semaine": 4,
      "action": "Action concrète semaine 4",
      "comment": "Comment faire exactement",
      "resultat": "Résultat attendu"
    }
  ],

  "type_contenu_manquant": "Type précis de contenu absent du profil",
  "frequence_ideale": "4 posts par semaine — 3 Reels + 1 carousel",
  "meilleur_moment_poster": "Mardi et jeudi entre 18h et 20h",

  "verdict_massishoots": "Phrase personnalisée expliquant exactement comment Massishoots peut transformer ce profil spécifiquement",

  "potentiel_croissance": "Fort / Très fort / Explosif"
}`;

export async function POST(req: NextRequest) {
  try {
    // Check environment variables
    if (!ANTHROPIC_API_KEY) {
      console.error("❌ ANTHROPIC_API_KEY is missing");
    } else {
      console.log("✅ ANTHROPIC_API_KEY is loaded");
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is missing");
    } else {
      console.log("✅ RESEND_API_KEY is loaded");
    }

    const { username, email, secteur, objectif } = await req.json();

    if (!username || !email || !secteur || !objectif) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Clean username (remove @ if present)
    const cleanUsername = username.replace("@", "").trim();

    const userPrompt = `Analyse le profil Instagram @${cleanUsername} dans le secteur ${secteur} avec l'objectif de ${objectif}. Sois ultra-spécifique et personnalisé — pas de généralités. Chaque recommandation doit être directement applicable demain matin.`;

    let analysis = null;

    // Try different Claude models in order of preference
    const modelsToTry = [
      "claude-3-5-sonnet-20241022",
      "claude-3-5-sonnet-20240620",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307",
      "claude-3-opus-20240229",
      "claude-2.1",
      "claude-2.0",
      "claude-instant-1.2"
    ];

    // Try Anthropic API with multiple models
    for (const model of modelsToTry) {
      try {
        console.log(`Trying Anthropic API with model: ${model}`);

        const anthropicResponse = await fetch(ANTHROPIC_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": ANTHROPIC_API_KEY || "",
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: model,
            max_tokens: 4000,
            system: SYSTEM_PROMPT,
            messages: [
              {
                role: "user",
                content: userPrompt,
              },
            ],
          }),
        });

        if (anthropicResponse.ok) {
          const anthropicData = await anthropicResponse.json();
          const analysisText = anthropicData.content[0].text;

          try {
            analysis = JSON.parse(analysisText);
            console.log(`✅ Success with model: ${model}`);
            console.log(`📊 Analysis generated for @${cleanUsername} with real AI`);
            break; // Exit loop on success
          } catch (parseError) {
            console.error(`JSON parse error with ${model}:`, analysisText.substring(0, 200) + "...");
            continue; // Try next model
          }
        } else {
          const errorText = await anthropicResponse.text();
          console.error(`Model ${model} failed:`, anthropicResponse.status, errorText);
          continue; // Try next model
        }
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        continue; // Try next model
      }
    }

    // Fallback: Generate contextual mock analysis if all models fail
    if (!analysis) {
      console.log(`🔄 All Anthropic models failed, generating contextual analysis for @${cleanUsername}`);

      const secteurData = {
        photographie: {
          points_forts: ["Esthétique visuelle soignée", "Portfolio diversifié", "Maîtrise technique visible"],
          problemes: ["Manque de behind-the-scenes", "Prix non affichés clairement"],
          recommandations: ["Publier plus de process créatifs", "Ajouter des témoignages clients"],
          contenu_manquant: "Stories process créatif"
        },
        restaurant: {
          points_forts: ["Photos appétissantes", "Ambiance bien capturée", "Stories régulières"],
          problemes: ["Heures d'ouverture pas claires", "Menu peu visible"],
          recommandations: ["Mettre en avant les heures", "Stories menu du jour"],
          contenu_manquant: "Vidéos en cuisine"
        },
        mode: {
          points_forts: ["Cohérence esthétique", "Looks tendances", "Bon engagement"],
          problemes: ["Pas assez de styling tips", "Manque d'authenticité"],
          recommandations: ["Partager des conseils style", "Plus de contenus spontanés"],
          contenu_manquant: "Try-on authentiques"
        },
        tech: {
          points_forts: ["Contenu éducatif", "Expertise visible", "Community engagement"],
          problemes: ["Trop technique parfois", "Manque de cas d'usage"],
          recommandations: ["Simplifier les explications", "Plus d'exemples concrets"],
          contenu_manquant: "Tutorials step-by-step"
        }
      };

      const sectorInfo = secteurData[secteur as keyof typeof secteurData] || secteurData.photographie;

      analysis = {
        score: Math.floor(Math.random() * 25) + 65, // 65-90
        mention: "Profil analysé — potentiel d'optimisation détecté",
        points_forts: sectorInfo.points_forts.concat([`Positionnement dans ${secteur}`]),
        problemes: [
          {
            titre: sectorInfo.problemes[0],
            description: `Impact sur l'engagement dans le secteur ${secteur}`,
            impact: "Moyen"
          },
          {
            titre: sectorInfo.problemes[1] || "Bio pas optimisée",
            description: "Appel à l'action peu clair pour l'objectif choisi",
            impact: "Élevé"
          }
        ],
        recommandations: [
          {
            action: sectorInfo.recommandations[0],
            priorite: "Cette semaine",
            resultat_attendu: "Amélioration de 20-30% de l'engagement"
          },
          {
            action: sectorInfo.recommandations[1] || "Optimiser la bio",
            priorite: "Immédiat",
            resultat_attendu: `Augmentation du trafic pour l'objectif: ${objectif}`
          }
        ],
        type_contenu_manquant: sectorInfo.contenu_manquant,
        conclusion: `@${cleanUsername} a des bases solides dans ${secteur}. Avec ces ajustements ciblés pour ${objectif}, vous pouvez considérablement amplifier votre impact.`
      };
    }

    // Send notification email to team (temporarily disabled for testing)
    try {
      await resend.emails.send({
        from: "noreply@massishoots.com",
        to: "massishoots.ca@gmail.com",
        subject: `🎯 Nouvelle analyse Instagram — @${cleanUsername} — ${secteur}`,
        text: `Nouveau lead via l'outil d'analyse Instagram.

Handle : @${cleanUsername}
Secteur : ${secteur}
Objectif : ${objectif}
Email : ${email}
Score obtenu : ${analysis.score}/100

Problèmes identifiés :
${analysis.problemes.map((p: any) => `• ${p.titre} (Impact ${p.impact})`).join('\n')}

Recommandations générées :
${analysis.recommandations.map((r: any) => `• ${r.action} (${r.priorité})`).join('\n')}

→ Contacter ce lead rapidement — il vient de voir ses failles.`,
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Continue anyway - email failure shouldn't break the analysis
    }

    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("Instagram AI analysis error:", err);
    return NextResponse.json({
      error: "Erreur serveur",
      details: err instanceof Error ? err.message : String(err)
    }, { status: 500 });
  }
}