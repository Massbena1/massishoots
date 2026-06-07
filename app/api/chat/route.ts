import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Massishoots, un studio photo et vidéo premium basé à Montréal.
Tu t'appelles 'Assistant Massishoots'.
Tu réponds toujours en français, de façon chaleureuse mais professionnelle.
Tu es concis — maximum 3 phrases par réponse.

Ton objectif est de qualifier le lead et de l'amener à réserver un appel avec Massi.

Informations sur les services :
- Contenu mensuel : à partir de 2 500$/mois (photos + Reels + face caméra)
- Couverture événements : à partir de 2 900$ (photo + vidéo, livraison 48h)
- Publicité Meta/Instagram : à partir de 599$
- Mariage : sur devis personnalisé

Contact :
- Téléphone : 438-464-0607
- Email : massishoots.ca@gmail.com
- Calendly : https://calendly.com/massishot-ca/30min

Après 2-3 échanges, propose toujours de réserver un appel gratuit de 30 minutes via Calendly.
Ne donne jamais de prix fermes — dis 'à partir de' et oriente vers l'appel.
Si tu ne sais pas quelque chose, dis que Massi pourra en discuter lors de l'appel.

IMPORTANT — FORMAT DE RÉPONSE :
Réponds UNIQUEMENT avec du JSON valide, sans markdown, sans backticks, exactement comme ceci :
{"message":"ta réponse ici","suggestions":["suggestion 1","suggestion 2"]}

Les suggestions sont 2 boutons courts (max 4 mots) pertinents pour continuer la conversation.
Si une suggestion est "Réserver un appel", elle doit être exactement ce texte.
Exemples de suggestions selon le contexte :
- Événement → ["Quelle date ?", "Réserver un appel"]
- Mariage → ["Voir le portfolio", "Réserver un appel"]
- Contenu mensuel → ["Comment ça fonctionne ?", "Réserver un appel"]
- Publicité → ["Exemples de résultats", "Réserver un appel"]
- Hésitation → ["Voir des exemples", "Parler à Massi"]
- Général → ["En savoir plus", "Réserver un appel"]`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "{}";
    try {
      const parsed = JSON.parse(raw);
      return NextResponse.json({
        message: parsed.message ?? raw,
        suggestions: parsed.suggestions ?? ["En savoir plus", "Réserver un appel"],
      });
    } catch {
      return NextResponse.json({ message: raw, suggestions: ["En savoir plus", "Réserver un appel"] });
    }
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
