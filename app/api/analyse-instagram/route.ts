import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `Tu es un stratège Instagram expert pour marques premium à Montréal.
Tu analyses un compte Instagram basé sur le nom d'utilisateur, le secteur et l'objectif fournis.
Tu fournis une analyse STRATÉGIQUE qualitative — pas de métriques inventées (followers, reach, etc.).
Réponds UNIQUEMENT en JSON valide, zéro markdown, zéro texte avant ou après.
Textes concis et percutants, directement actionnables.

JSON exact :
{"score_global":74,"niveau":"Intermédiaire","accroche":"Phrase courte et percutante sur le profil","scores_categories":{"bio_positionnement":60,"qualite_visuelle":75,"strategie_contenu":55,"engagement":65,"consistance":50,"presence_marque":70},"points_forts":["Point fort concret 1","Point fort concret 2","Point fort concret 3"],"problemes":[{"severite":"Critique","titre":"Titre du problème","explication":"Explication en 1-2 phrases concrètes","impact":"Comment ça bloque la croissance"},{"severite":"Modéré","titre":"Titre du problème","explication":"Explication","impact":"Impact"},{"severite":"Mineur","titre":"Titre du problème","explication":"Explication","impact":"Impact"}],"recommandations":[{"priorite":"Haute","titre":"Titre action","quoi":"Action très concrète applicable demain","pourquoi":"Pourquoi c'est prioritaire","impact_attendu":"Résultat attendu en 30 jours"},{"priorite":"Haute","titre":"Titre","quoi":"Action concrète","pourquoi":"Raison","impact_attendu":"Résultat"},{"priorite":"Moyenne","titre":"Titre","quoi":"Action concrète","pourquoi":"Raison","impact_attendu":"Résultat"}],"plan_action":[{"semaine":1,"focus":"Focus principal","actions":["Action 1","Action 2"]},{"semaine":2,"focus":"Focus principal","actions":["Action 1","Action 2"]},{"semaine":3,"focus":"Focus principal","actions":["Action 1","Action 2"]},{"semaine":4,"focus":"Focus principal","actions":["Action 1","Action 2"]}],"format_prioritaire":"Reels","frequence_ideale":"4x/semaine","meilleur_moment":"Mardi et jeudi 18h-20h","type_contenu_manquant":"Description du contenu manquant","verdict_massishoots":"Phrase personnalisée sur comment Massishoots transforme ce profil spécifiquement.","potentiel_croissance":"Fort"}`;

export async function POST(req: NextRequest) {
  try {
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "Clé API manquante" }, { status: 500 });
    }

    const body = await req.json();
    const handle = ((body.handle || body.username) as string || "").replace("@", "").trim();
    const secteur = (body.secteur as string) || "";
    const objectif = (body.objectif as string) || "";
    const email = (body.email as string) || "";

    if (!handle || !secteur || !objectif) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Analyse @${handle}, secteur ${secteur}, objectif ${objectif}. JSON uniquement.`,
          },
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const err = await anthropicResponse.text();
      console.error(`Anthropic ${anthropicResponse.status}:`, err.slice(0, 200));
      return NextResponse.json({ error: `Erreur API: ${anthropicResponse.status}` }, { status: 502 });
    }

    const data = await anthropicResponse.json() as any;
    const rawText: string = (data.content ?? []).find((b: any) => b.type === "text")?.text ?? "";

    if (!rawText) {
      return NextResponse.json({ error: "Réponse vide" }, { status: 502 });
    }

    if (data.stop_reason === "max_tokens") {
      return NextResponse.json({ error: "Réponse tronquée, réessaie" }, { status: 502 });
    }

    const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

    let analysis: Record<string, unknown>;
    try {
      analysis = JSON.parse(cleaned);
    } catch {
      console.error("JSON parse error:", cleaned.slice(0, 300));
      return NextResponse.json({ error: "Format invalide" }, { status: 502 });
    }

    // Email en arrière-plan (non-bloquant, on ne await pas)
    if (email) {
      notifyEmail(handle, secteur, objectif, email, analysis);
    }

    return NextResponse.json({ analysis });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Erreur serveur:", msg);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

async function notifyEmail(
  handle: string,
  secteur: string,
  objectif: string,
  email: string,
  analysis: Record<string, unknown>
) {
  try {
    const score = analysis.score_global ?? 0;
    const niveau = analysis.niveau ?? "—";
    const potentiel = analysis.potentiel_croissance ?? "—";
    const premierProbleme = (analysis.problemes as any[])?.[0]?.titre ?? "—";
    const premiereReco = (analysis.recommandations as any[])?.[0]?.titre ?? "—";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "noreply@massishoots.com",
        to: ["massishoots.ca@gmail.com"],
        subject: `🎯 Nouveau lead Analyse Instagram — @${handle} — Score: ${score}/100`,
        text: `Nouveau lead via l'outil d'analyse Instagram.\n\nHandle : @${handle}\nSecteur : ${secteur}\nObjectif : ${objectif}\nEmail : ${email}\nScore obtenu : ${score}/100\nNiveau : ${niveau}\nPotentiel : ${potentiel}\n\nProblème critique #1 : ${premierProbleme}\nRecommandation #1 : ${premiereReco}\n\n→ Contacter ce lead rapidement.`,
      }),
    });

    if (!res.ok) console.error("Email failed:", await res.text());
  } catch (e) {
    console.error("Email error:", e);
  }
}
