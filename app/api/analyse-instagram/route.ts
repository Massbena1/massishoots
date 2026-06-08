import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `Tu es un expert senior en stratégie Instagram et personal branding pour les marques premium. Tu analyses des profils avec une précision chirurgicale en utilisant les données réelles disponibles via les outils MCP Windsor.ai.

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
    "bio_actuelle_probleme": "Ce qui ne fonctionne pas actuellement",
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
      "severite": "Critique"
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

  "potentiel_croissance": "Fort"
}

Règles strictes :
- severite doit être exactement "Critique", "Modéré" ou "Mineur"
- potentiel_croissance doit être exactement "Fort", "Très fort" ou "Explosif"
- niveau doit être exactement "Débutant", "Intermédiaire" ou "Avancé"
- Sois ultra-spécifique et personnalisé — pas de généralités
- Chaque recommandation doit être directement applicable demain matin
- Utilise les données réelles du compte si disponibles via Windsor.ai`;

export async function POST(req: NextRequest) {
  try {
    if (!ANTHROPIC_API_KEY) {
      console.error("❌ ANTHROPIC_API_KEY manquante");
      return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
    }

    const body = await req.json();
    const handle = (body.handle || body.username || "").replace("@", "").trim();
    const { secteur, objectif, email } = body;

    if (!handle || !secteur || !objectif) {
      return NextResponse.json({ error: "Champs manquants : handle, secteur, objectif requis" }, { status: 400 });
    }

    console.log(`🚀 Analyse Instagram @${handle} — secteur: ${secteur} — objectif: ${objectif}`);

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "interleaved-thinking-2025-05-14",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        mcp_servers: [
          {
            type: "url",
            url: "https://mcp.windsor.ai",
            name: "windsor-mcp",
          },
        ],
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Analyse le compte Instagram @${handle} dans le secteur ${secteur} avec l'objectif : ${objectif}. Génère un rapport complet 360° avec toutes les données réelles disponibles. Réponds UNIQUEMENT en JSON valide.`,
          },
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error(`❌ Anthropic API error ${anthropicResponse.status}:`, errorText);

      // Fallback vers claude-3-5-sonnet si le modèle/beta n'est pas disponible
      if (anthropicResponse.status === 400 || anthropicResponse.status === 404) {
        console.log("🔄 Fallback vers claude-3-5-sonnet-20241022...");
        return await fallbackAnalysis(handle, secteur, objectif);
      }

      return NextResponse.json(
        { error: `Erreur API Anthropic: ${anthropicResponse.status}` },
        { status: 502 }
      );
    }

    const data = await anthropicResponse.json();
    console.log(`📡 Anthropic réponse reçue, stop_reason: ${data.stop_reason}`);

    // Extraire le texte — avec interleaved-thinking il peut y avoir plusieurs blocs
    let rawText = "";
    for (const block of data.content ?? []) {
      if (block.type === "text") {
        rawText = block.text;
        break;
      }
    }

    if (!rawText) {
      console.error("❌ Aucun bloc texte dans la réponse:", JSON.stringify(data.content));
      return NextResponse.json({ error: "Réponse vide de l'IA" }, { status: 502 });
    }

    // Nettoyer le JSON si l'IA a ajouté des balises markdown malgré la consigne
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    let analysis: Record<string, unknown>;
    try {
      analysis = JSON.parse(cleaned);
    } catch {
      console.error("❌ JSON parse error. Texte reçu:", cleaned.substring(0, 400));
      return NextResponse.json({ error: "Format de réponse invalide" }, { status: 502 });
    }

    console.log(`✅ Rapport généré pour @${handle} — score: ${analysis.score_global}`);

    // Notif email en arrière-plan (non-bloquant)
    if (email) {
      notifyEmail(handle, secteur, objectif, email, analysis).catch(console.error);
    }

    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("💥 Erreur serveur:", err);
    return NextResponse.json(
      { error: "Erreur serveur", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

// Fallback sans MCP ni beta header
async function fallbackAnalysis(
  handle: string,
  secteur: string,
  objectif: string
): Promise<NextResponse> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyse le compte Instagram @${handle} dans le secteur ${secteur} avec l'objectif : ${objectif}. Sois ultra-spécifique. Réponds UNIQUEMENT en JSON valide.`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Fallback aussi failed:", errText);
    return NextResponse.json({ error: "Tous les modèles ont échoué" }, { status: 502 });
  }

  const data = await res.json();
  const rawText = data.content?.[0]?.text ?? "";
  const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

  try {
    const analysis = JSON.parse(cleaned);
    console.log(`✅ Fallback réussi pour @${handle}`);
    return NextResponse.json({ analysis });
  } catch {
    return NextResponse.json({ error: "Format de réponse invalide (fallback)" }, { status: 502 });
  }
}

async function notifyEmail(
  handle: string,
  secteur: string,
  objectif: string,
  email: string,
  analysis: Record<string, unknown>
) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "noreply@massishoots.com",
    to: "massishoots.ca@gmail.com",
    subject: `🎯 Analyse Instagram — @${handle} — Score ${analysis.score_global}/100`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <div style="border-left:3px solid #C9A84C;padding-left:16px;margin-bottom:24px;">
          <h2 style="color:#C9A84C;margin:0 0 4px;">Nouvelle analyse Instagram</h2>
          <p style="color:rgba(255,255,255,0.4);margin:0;font-size:13px;">${new Date().toLocaleString("fr-CA", { timeZone: "America/Toronto" })}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;width:120px;">Handle</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#C9A84C;font-weight:700;">@${handle}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;">${email}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;">Secteur</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;">${secteur}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;">Objectif</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;">${objectif}</td></tr>
          <tr><td style="padding:10px 0;color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;">Score IA</td><td style="padding:10px 0;color:#C9A84C;font-weight:700;font-size:18px;">${analysis.score_global}/100 — ${analysis.niveau}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:rgba(201,168,76,0.07);border:1px solid rgba(201,168,76,0.2);border-radius:8px;">
          <p style="font-size:13px;color:rgba(255,255,255,0.7);font-style:italic;margin:0;">"${analysis.verdict_massishoots}"</p>
        </div>
        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${email}" style="display:inline-block;background:#C9A84C;color:#0a0a0a;padding:12px 28px;border-radius:9999px;font-weight:700;font-size:13px;text-decoration:none;">Contacter ce lead →</a>
        </div>
      </div>
    `,
  });
}
