import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import type { Gallery } from "@/lib/galleries";

const KEY = "galleries";

function auth(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const galleries = (await kv.get<Gallery[]>(KEY)) ?? [];
  return NextResponse.json(galleries);
}

export async function POST(req: NextRequest) {
  const { password, gallery } = await req.json();
  if (!auth(password)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  if (!gallery) return NextResponse.json({ ok: true });

  const galleries = (await kv.get<Gallery[]>(KEY)) ?? [];
  const updated = [gallery, ...galleries];
  await kv.set(KEY, updated);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { password, id } = await req.json();
  if (!auth(password)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const galleries = (await kv.get<Gallery[]>(KEY)) ?? [];
  await kv.set(KEY, galleries.filter(g => g.id !== id));
  return NextResponse.json({ ok: true });
}
