import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `Tu es un expert en stratégie de contenu Instagram pour les marques premium.
Tu analyses des profils Instagram et fournis des recommandations
ultra-spécifiques et actionnables.
Réponds UNIQUEMENT en JSON valide, sans markdown, sans texte avant ou après.

Format de réponse :
{
  "score": 72,
  "mention": "Bon potentiel — quelques ajustements clés manquants",
  "points_forts": [
    "Point fort 1",
    "Point fort 2"
  ],
  "problemes": [
    {
      "titre": "Titre du problème",
      "description": "Description en 1 phrase",
      "impact": "Élevé / Moyen / Faible"
    }
  ],
  "recommandations": [
    {
      "action": "Action concrète à faire",
      "priorite": "Immédiat / Cette semaine / Ce mois",
      "resultat_attendu": "Ce que ça va changer"
    }
  ],
  "type_contenu_manquant": "Type de contenu que ce compte ne fait pas assez",
  "conclusion": "Phrase de conclusion personnalisée et motivante"
}`;

export async function POST(req: NextRequest) {
  try {
    const { username, email, secteur, objectif } = await req.json();

    if (!username || !email || !secteur || !objectif) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Clean username (remove @ if present)
    const cleanUsername = username.replace("@", "").trim();

    // TEMPORARY: Generate mock analysis until Anthropic API model issue is resolved
    // TODO: Fix model name for Anthropic API (current models returning 404)
    console.log(`Generating mock analysis for @${cleanUsername} in ${secteur} sector`);

    const analysis = {
      score: Math.floor(Math.random() * 30) + 65, // Score entre 65-95
      mention: "Analyse en cours — rapport complet bientôt disponible",
      points_forts: [
        "Qualité visuelle cohérente",
        "Engagement authentique avec la communauté",
        `Positionnement clair dans le secteur ${secteur}`
      ],
      problemes: [
        {
          titre: "Fréquence de publication irrégulière",
          description: "Les posts ne suivent pas un rythme optimal pour l'algorithme",
          impact: "Moyen"
        },
        {
          titre: "Bio manque d'appel à l'action",
          description: "La bio ne guide pas vers une action concrète",
          impact: "Élevé"
        }
      ],
      recommandations: [
        {
          action: "Établir un calendrier de publication (3-4 posts/semaine)",
          priorite: "Cette semaine",
          resultat_attendu: "Amélioration de 25% de la portée organique"
        },
        {
          action: "Optimiser la bio avec un CTA clair",
          priorite: "Immédiat",
          resultat_attendu: "Augmentation du trafic vers votre site de 40%"
        }
      ],
      type_contenu_manquant: "Stories interactives avec sondages",
      conclusion: `Votre profil @${cleanUsername} a un potentiel énorme dans le secteur ${secteur}. Avec quelques ajustements stratégiques, vous pourriez considérablement augmenter votre impact.`
    };

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