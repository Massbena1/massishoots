import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import type { Gallery } from "@/lib/galleries";

export async function POST(req: NextRequest) {
  const { id, pin } = await req.json();
  if (!id || !pin) return NextResponse.json({ error: "Données manquantes" }, { status: 400 });

  const galleries = ((await kv.get<Gallery[]>("galleries")) ?? []).filter(Boolean);
  const gallery = galleries.find(g => g.id === id);

  if (!gallery) return NextResponse.json({ error: "Galerie introuvable" }, { status: 404 });
  if (!gallery.password) return NextResponse.json({ url: gallery.pixiesetUrl });
  if (gallery.pin !== pin) return NextResponse.json({ error: "PIN incorrect" }, { status: 401 });

  return NextResponse.json({ url: gallery.pixiesetUrl });
}
