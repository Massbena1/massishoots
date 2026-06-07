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
Si tu ne sais pas quelque chose, dis que Massi pourra en discuter lors de l'appel.`;

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

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ message: text });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
