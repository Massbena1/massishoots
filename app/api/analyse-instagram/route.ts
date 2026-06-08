import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `Expert Instagram Montréal. Réponds UNIQUEMENT en JSON compact valide, zéro markdown.
Invente des chiffres réalistes selon le secteur. Textes courts (max 15 mots par champ texte).

Structure exacte (remplace TOUTES les valeurs vides par des valeurs réelles) :
{"score_global":74,"niveau":"Intermédiaire","accroche":"1 phrase percutante max 12 mots","vue_ensemble":{"abonnes":2400,"croissance_nette":85,"reach_total":48000,"reach_moyen_jour":1600,"interactions_totales":3200,"taux_engagement":2.1},"scores_categories":{"bio_positionnement":60,"qualite_visuelle":75,"strategie_contenu":55,"engagement":65,"consistance":50,"audience":70},"performance_formats":{"reels":{"reach_moyen":2800,"engagement_moyen":3.2,"nb_posts":8},"carousel":{"reach_moyen":1400,"engagement_moyen":2.1,"nb_posts":5},"image":{"reach_moyen":900,"engagement_moyen":1.4,"nb_posts":12}},"audience":{"top_pays":"Canada","genre_dominant":"Femmes 65%","age_dominant":"25-34 ans","coherence_niche":"Bonne cohérence avec la niche"},"problemes":[{"severite":"Critique","titre":"Titre 5 mots","constat":"Constat court","impact":"Impact sur revenus","cause":"Cause principale"},{"severite":"Modéré","titre":"Titre 5 mots","constat":"Constat court","impact":"Impact","cause":"Cause"}],"recommandations":[{"priorite":"Haute","titre":"Titre action","quoi":"Action précise","comment":"Comment faire","impact_attendu":"Résultat chiffré","delai":"Cette semaine"},{"priorite":"Haute","titre":"Titre action","quoi":"Action précise","comment":"Comment faire","impact_attendu":"Résultat chiffré","delai":"Ce mois"},{"priorite":"Moyenne","titre":"Titre action","quoi":"Action précise","comment":"Comment faire","impact_attendu":"Résultat chiffré","delai":"30 jours"}],"plan_7_jours":[{"jour":"Lundi","action":"Action précise courte","duree":"1h"},{"jour":"Mardi","action":"Action précise courte","duree":"30min"},{"jour":"Mercredi","action":"Action précise courte","duree":"45min"},{"jour":"Jeudi","action":"Action précise courte","duree":"1h"},{"jour":"Vendredi","action":"Action précise courte","duree":"2h"}],"meilleur_jour_poster":"Mardi et jeudi 18h-20h","format_prioritaire":"Reels","frequence_ideale":"4x/semaine","verdict_massishoots":"1 phrase personnalisée sur comment Massishoots transforme ce profil.","potentiel_croissance":"Fort"}`;

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
