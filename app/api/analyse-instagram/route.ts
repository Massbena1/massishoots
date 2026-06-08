import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `Tu es un expert senior en stratégie Instagram pour les marques premium à Montréal. Tu analyses des profils avec une précision chirurgicale et génères des rapports ultra-spécifiques et actionnables.

Réponds UNIQUEMENT en JSON valide, sans markdown, sans texte avant ou après.
Sois ultra-spécifique — pas de généralités. Chaque recommandation doit être applicable demain matin.
Invente des métriques réalistes et cohérentes pour illustrer ton analyse (le client sait que c'est une estimation IA).

Format de réponse EXACT :

{
  "score_global": 74,
  "niveau": "Intermédiaire",
  "accroche": "Phrase personnalisée basée sur les vraies données",

  "vue_ensemble": {
    "abonnes": 0,
    "croissance_nette": 0,
    "reach_total": 0,
    "reach_moyen_jour": 0,
    "interactions_totales": 0,
    "taux_engagement": 0,
    "reach_rate": 0
  },

  "scores_categories": {
    "bio_positionnement": 0,
    "qualite_visuelle": 0,
    "strategie_contenu": 0,
    "engagement": 0,
    "consistance": 0,
    "audience": 0
  },

  "top_posts": [
    {
      "type": "REEL",
      "reach": 0,
      "engagement": 0,
      "permalink": "",
      "pourquoi_ca_marche": ""
    }
  ],

  "performance_formats": {
    "reels": { "reach_moyen": 0, "engagement_moyen": 0, "nb_posts": 0 },
    "carousel": { "reach_moyen": 0, "engagement_moyen": 0, "nb_posts": 0 },
    "image": { "reach_moyen": 0, "engagement_moyen": 0, "nb_posts": 0 }
  },

  "audience": {
    "top_pays": "",
    "genre_dominant": "",
    "age_dominant": "",
    "coherence_niche": ""
  },

  "problemes": [
    { "severite": "Critique", "titre": "", "constat": "", "impact": "", "cause": "" },
    { "severite": "Modéré", "titre": "", "constat": "", "impact": "", "cause": "" },
    { "severite": "Mineur", "titre": "", "constat": "", "impact": "", "cause": "" }
  ],

  "recommandations": [
    { "priorite": "Haute", "titre": "", "quoi": "", "pourquoi": "", "comment": "", "impact_attendu": "", "delai": "" },
    { "priorite": "Haute", "titre": "", "quoi": "", "pourquoi": "", "comment": "", "impact_attendu": "", "delai": "" },
    { "priorite": "Moyenne", "titre": "", "quoi": "", "pourquoi": "", "comment": "", "impact_attendu": "", "delai": "" }
  ],

  "plan_7_jours": [
    { "jour": "Lundi", "action": "", "duree": "30min", "impact": "" },
    { "jour": "Mardi", "action": "", "duree": "1h", "impact": "" },
    { "jour": "Mercredi", "action": "", "duree": "45min", "impact": "" },
    { "jour": "Jeudi", "action": "", "duree": "1h", "impact": "" },
    { "jour": "Vendredi", "action": "", "duree": "30min", "impact": "" },
    { "jour": "Samedi", "action": "", "duree": "2h", "impact": "" },
    { "jour": "Dimanche", "action": "", "duree": "30min", "impact": "" }
  ],

  "meilleur_jour_poster": "",
  "format_prioritaire": "",
  "frequence_ideale": "",

  "verdict_massishoots": "Comment Massishoots peut transformer ce profil spécifiquement",
  "potentiel_croissance": "Fort"
}`;

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
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Analyse le compte Instagram @${handle} dans le secteur ${secteur} avec l'objectif : ${objectif}. Génère un rapport complet 360° ultra-spécifique. Réponds UNIQUEMENT en JSON valide.`,
          },
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error(`❌ Anthropic API error ${anthropicResponse.status}:`, errorText);
      return NextResponse.json(
        { error: `Erreur API Anthropic: ${anthropicResponse.status}` },
        { status: 502 }
      );
    }

    const data = await anthropicResponse.json();
    console.log(`📡 stop_reason: ${data.stop_reason}, usage: ${JSON.stringify(data.usage)}`);

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

    if (data.stop_reason === "max_tokens") {
      console.error("❌ JSON tronqué — max_tokens atteint. Longueur:", cleaned.length);
      return NextResponse.json({ error: "Réponse tronquée — réessaie dans quelques secondes" }, { status: 502 });
    }

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


async function notifyEmail(
  handle: string,
  secteur: string,
  objectif: string,
  email: string,
  analysis: Record<string, unknown>
) {
  const score = analysis.score_global ?? 0;
  const niveau = analysis.niveau ?? "—";
  const potentiel = analysis.potentiel_croissance ?? "—";

  const problemes = analysis.problemes as any[] | undefined;
  const recommandations = analysis.recommandations as any[] | undefined;
  const premierProbleme = problemes?.[0]?.titre ?? "—";
  const premiereReco = recommandations?.[0]?.titre ?? "—";

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "noreply@massishoots.com",
    to: "massishoots.ca@gmail.com",
    subject: `🎯 Nouveau lead Analyse Instagram — @${handle} — Score: ${score}/100`,
    text: `Nouveau lead via l'outil d'analyse Instagram.

Handle : @${handle}
Secteur : ${secteur}
Objectif : ${objectif}
Email : ${email}
Score obtenu : ${score}/100
Niveau : ${niveau}
Potentiel : ${potentiel}

Problème critique #1 : ${premierProbleme}
Recommandation #1 : ${premiereReco}

→ Contacter ce lead rapidement.`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <div style="border-left:3px solid #C9A84C;padding-left:16px;margin-bottom:28px;">
          <h2 style="color:#C9A84C;margin:0 0 6px;font-size:18px;">Nouveau lead — Analyse Instagram</h2>
          <p style="color:rgba(255,255,255,0.35);margin:0;font-size:12px;">${new Date().toLocaleString("fr-CA", { timeZone: "America/Toronto" })}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;width:130px;">Handle</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#C9A84C;font-weight:700;">@${handle}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#fff;">${email}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Secteur</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#fff;">${secteur}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Objectif</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#fff;">${objectif}</td></tr>
          <tr><td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Potentiel</td><td style="padding:10px 0;color:#C9A84C;font-weight:700;">${potentiel}</td></tr>
        </table>

        <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:20px;margin-bottom:16px;text-align:center;">
          <p style="font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.12em;margin:0 0 8px;">Score obtenu</p>
          <p style="font-size:36px;font-weight:700;color:#C9A84C;margin:0;line-height:1;">${score}<span style="font-size:16px;color:rgba(255,255,255,0.3);font-weight:400;">/100</span></p>
          <p style="font-size:13px;color:rgba(255,255,255,0.5);margin:6px 0 0;">Niveau : ${niveau}</p>
        </div>

        <div style="background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:18px;margin-bottom:16px;">
          <p style="font-size:11px;color:#E74C3C;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin:0 0 6px;">⚠ Problème critique #1</p>
          <p style="font-size:14px;color:#fff;margin:0;">${premierProbleme}</p>
        </div>

        <div style="background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:18px;margin-bottom:28px;">
          <p style="font-size:11px;color:#C9A84C;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin:0 0 6px;">→ Recommandation #1</p>
          <p style="font-size:14px;color:#fff;margin:0;">${premiereReco}</p>
        </div>

        <div style="text-align:center;">
          <a href="mailto:${email}" style="display:inline-block;background:#C9A84C;color:#0a0a0a;padding:14px 32px;border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;letter-spacing:0.06em;">
            Contacter ce lead rapidement →
          </a>
        </div>
      </div>
    `,
  });
}
