import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

interface GalleryEntry {
  code: string;
  nom: string;
  url: string;
  date: string;
  actif: boolean;
}

function loadGalleries(): GalleryEntry[] {
  try {
    const filePath = join(process.cwd(), "data", "galleries.json");
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as GalleryEntry[];
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const code: string = (body.code ?? "").toString().trim().toUpperCase();
  const email: string = (body.email ?? "").toString().trim().toLowerCase();

  if (!code) {
    return NextResponse.json({ error: "missing_code" }, { status: 400 });
  }

  const galleries = loadGalleries();
  const match = galleries.find(g => g.code === code && g.actif);

  if (!match) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ url: match.url, nom: match.nom });
}

// Notify route — email quand galerie introuvable
export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email: string = (body.email ?? "").toString().trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "noreply@massishoots.com",
        to: ["massishoots.ca@gmail.com"],
        subject: `📸 Demande galerie — ${email}`,
        text: `Un visiteur cherche sa galerie et n'a pas trouvé son code.\n\nEmail : ${email}\n\n→ Vérifier si une galerie est à publier pour cet invité.`,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
