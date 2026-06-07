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

    const userPrompt = `Analyse le profil Instagram @${cleanUsername} dans le secteur ${secteur} avec l'objectif de ${objectif}. Génère un rapport complet avec score, points forts, problèmes et recommandations.`;

    // Call Anthropic API
    const anthropicResponse = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
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

    if (!anthropicResponse.ok) {
      throw new Error(`Anthropic API error: ${anthropicResponse.status}`);
    }

    const anthropicData = await anthropicResponse.json();
    const analysisText = anthropicData.content[0].text;

    // Parse the JSON response from Claude
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.error("Failed to parse Claude response:", analysisText);
      throw new Error("Invalid JSON response from analysis");
    }

    // Send notification email to team
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
${analysis.recommandations.map((r: any) => `• ${r.action} (${r.priorite})`).join('\n')}

→ Contacter ce lead rapidement — il vient de voir ses failles.`,
    });

    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("Instagram AI analysis error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}